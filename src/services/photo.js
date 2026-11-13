const isH5 = typeof document !== 'undefined' && typeof window !== 'undefined';

export const PHOTO_API = import.meta.env.VITE_PHOTO_CUTOUT_URL || '';

/** 小程序端 2d 离屏画布 + getImageData + canvasToTempFilePath({ canvas }) 需要的最低基础库 */
export const MP_MIN_SDK = '2.16.1';
const MP_CANVAS_UNSUPPORTED = `当前微信版本过低（需基础库 ${MP_MIN_SDK}+），未做图片处理`;

/** 自定义尺寸的像素上限，避免创建超大画布导致卡死 */
export const MAX_SPEC_PX = 2000;
export const MIN_SPEC_PX = 50;

export function choosePhoto({ camera = false } = {}) {
  return new Promise((resolve, reject) => {
    uni.chooseImage({
      count: 1,
      sizeType: ['compressed', 'original'],
      sourceType: camera ? ['camera'] : ['album', 'camera'],
      success: (res) => resolve(res.tempFilePaths[0]),
      fail: (err) => reject(new Error(err.errMsg || '未选择图片'))
    });
  });
}

export function getImageInfo(src) {
  return new Promise((resolve, reject) => {
    uni.getImageInfo({
      src,
      success: resolve,
      fail: (err) => reject(new Error(err.errMsg || '读取图片失败'))
    });
  });
}

export function getFileSize(path) {
  if (isH5) {
    return fetch(path)
      .then((res) => res.blob())
      .then((blob) => blob.size)
      .catch(() => 0);
  }
  return new Promise((resolve) => {
    uni.getFileInfo({
      filePath: path,
      success: (res) => resolve(res.size || 0),
      fail: () => resolve(0)
    });
  });
}

/** 释放 H5 端由本模块创建的 blob URL，避免反复处理时内存持续增长 */
export function releaseImage(path) {
  if (isH5 && typeof path === 'string' && path.startsWith('blob:')) {
    try {
      URL.revokeObjectURL(path);
    } catch (err) {
      // ignore
    }
  }
}

function isRemote(src) {
  return /^https?:\/\//i.test(String(src || ''));
}

function loadH5Image(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    // 远程图片需要跨域许可，否则画布被污染后无法 getImageData / toBlob
    if (isRemote(src)) img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('图片加载失败'));
    img.src = src;
  });
}

function h5Canvas(width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(width));
  canvas.height = Math.max(1, Math.round(height));
  return canvas;
}

function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), type, quality);
  });
}

function blobToDataURL(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('读取图片失败'));
    reader.readAsDataURL(blob);
  });
}

/** JPEG 不支持透明，先铺白底，避免透明 PNG 变成黑底 */
function fillWhite(ctx, width, height) {
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);
}

/** H5：在给定画布上二分查找不超过 target 的最高质量 */
async function searchQualityH5(canvas, type, target) {
  let low = 0.3;
  let high = 0.95;
  let best = null;
  let smallest = null;
  for (let i = 0; i < 8; i += 1) {
    const quality = (low + high) / 2;
    const blob = await canvasToBlob(canvas, type, quality);
    if (!blob) break;
    if (!smallest || blob.size < smallest.blob.size) smallest = { blob, quality };
    if (blob.size <= target) {
      best = { blob, quality };
      low = quality;
    } else {
      high = quality;
    }
  }
  if (!best) {
    const blob = await canvasToBlob(canvas, type, low);
    if (blob && (!smallest || blob.size < smallest.blob.size)) smallest = { blob, quality: low };
    if (blob && blob.size <= target) best = { blob, quality: low };
  }
  return { best, smallest };
}

/**
 * 压缩到目标大小。先降质量；仍超标且 allowResize 时逐级缩小尺寸。
 * 返回 { path, size, quality, width, height, resized, overTarget }
 */
export async function compressToTarget(src, targetKB = 100, { allowResize = true } = {}) {
  const target = Math.max(8, Number(targetKB) || 100) * 1024;
  const type = 'image/jpeg';
  if (isH5) {
    const img = await loadH5Image(src);
    const maxSide = 2400;
    let scale = Math.min(1, maxSide / Math.max(img.width, img.height));
    const originScale = scale;
    let fallback = null;
    for (let step = 0; step < 8; step += 1) {
      const canvas = h5Canvas(img.width * scale, img.height * scale);
      const ctx = canvas.getContext('2d');
      fillWhite(ctx, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const { best, smallest } = await searchQualityH5(canvas, type, target);
      const hit = best || smallest;
      if (hit && (!fallback || hit.blob.size < fallback.blob.size)) {
        fallback = { ...hit, width: canvas.width, height: canvas.height };
      }
      if (best) {
        return {
          path: URL.createObjectURL(best.blob),
          size: best.blob.size,
          quality: best.quality,
          width: canvas.width,
          height: canvas.height,
          resized: scale < originScale,
          overTarget: false
        };
      }
      if (!allowResize || Math.min(canvas.width, canvas.height) <= 120) break;
      scale *= 0.8;
    }
    if (!fallback) throw new Error('压缩失败');
    return {
      path: URL.createObjectURL(fallback.blob),
      size: fallback.blob.size,
      quality: fallback.quality,
      width: fallback.width,
      height: fallback.height,
      resized: fallback.width < Math.round(img.width * originScale),
      overTarget: true
    };
  }

  // 小程序：先用 compressImage 降质量（仅对 JPG 有效）
  const originSize = await getFileSize(src);
  if (originSize > 0 && originSize <= target) {
    return { path: src, size: originSize, quality: 1, resized: false, overTarget: false };
  }
  let last = { path: src, size: originSize, quality: 1 };
  for (let quality = 0.9; quality >= 0.3 - 1e-6; quality -= 0.1) {
    // 部分机型/格式 compressImage 会失败，失败时跳过，交给下面的画布缩放兜底
    const path = await new Promise((resolve) => {
      uni.compressImage({
        src,
        quality: Math.round(quality * 100),
        success: (res) => resolve(res.tempFilePath),
        fail: () => resolve('')
      });
    });
    if (!path) break;
    const size = await getFileSize(path);
    if (size > 0 && (!last.size || size < last.size)) last = { path, size, quality };
    if (size > 0 && size <= target) {
      return { ...last, resized: false, overTarget: false };
    }
  }

  // 仍超标：用离屏画布缩小尺寸（同时把 PNG 转成 JPG）
  if (allowResize) {
    try {
      const info = await getImageInfo(src);
      let scale = Math.min(1, 2400 / Math.max(info.width, info.height));
      for (let step = 0; step < 8; step += 1) {
        const width = Math.max(1, Math.round(info.width * scale));
        const height = Math.max(1, Math.round(info.height * scale));
        const canvas = getMpCanvas(width, height);
        const ctx = canvas.getContext('2d');
        fillWhite(ctx, width, height);
        const img = await loadMpImage(canvas, src);
        ctx.drawImage(img, 0, 0, width, height);
        for (const quality of [0.85, 0.65, 0.45]) {
          const path = await canvasToTempFilePathMp(canvas, quality);
          const size = await getFileSize(path);
          if (size > 0 && (!last.size || size < last.size)) last = { path, size, quality, width, height };
          if (size > 0 && size <= target) {
            return { path, size, quality, width, height, resized: true, overTarget: false };
          }
        }
        if (Math.min(width, height) <= 120) break;
        scale *= 0.8;
      }
    } catch (err) {
      // 不支持离屏画布时返回已压到的最小结果
    }
  }
  return { ...last, resized: !!last.width, overTarget: true };
}

function hexToRgb(hex) {
  const value = String(hex || '#ffffff').replace('#', '');
  const full = value.length === 3 ? value.split('').map((c) => c + c).join('') : value;
  return {
    r: parseInt(full.slice(0, 2), 16) || 0,
    g: parseInt(full.slice(2, 4), 16) || 0,
    b: parseInt(full.slice(4, 6), 16) || 0
  };
}

function median(values) {
  const sorted = values.slice().sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)] || 0;
}

/**
 * 背景替换：从图片四边出发做连通区域填充（flood fill），只替换与边缘相连、
 * 颜色接近背景的像素；人像内部与背景同色的区域（如白衬衫配白底）不会被误替换。
 * 前景与背景交界处按颜色距离做羽化，透明像素按背景处理。
 */
export function replaceBackground(pixels, w, h, bgColor, { threshold = 58, feather = 34 } = {}) {
  if (!w || !h) return;
  const total = w * h;
  const target = hexToRgb(bgColor);

  // 1. 用边框像素中位数估计背景色（比均值更不易被边缘的头发/肩膀干扰）
  const rs = [];
  const gs = [];
  const bs = [];
  const sample = (x, y) => {
    const i = (y * w + x) * 4;
    if (pixels[i + 3] < 16) return;
    rs.push(pixels[i]);
    gs.push(pixels[i + 1]);
    bs.push(pixels[i + 2]);
  };
  const stepX = Math.max(1, Math.floor(w / 60));
  const stepY = Math.max(1, Math.floor(h / 60));
  for (let x = 0; x < w; x += stepX) {
    sample(x, 0);
    sample(x, h - 1);
  }
  for (let y = 0; y < h; y += stepY) {
    sample(0, y);
    sample(w - 1, y);
  }
  const bg = rs.length ? { r: median(rs), g: median(gs), b: median(bs) } : { r: 255, g: 255, b: 255 };

  const dist = (p) => {
    const i = p * 4;
    if (pixels[i + 3] < 16) return 0;
    const dr = pixels[i] - bg.r;
    const dg = pixels[i + 1] - bg.g;
    const db = pixels[i + 2] - bg.b;
    return Math.sqrt(dr * dr + dg * dg + db * db);
  };

  // 2. 从边框出发 BFS，标记与边缘连通的背景像素
  const mask = new Uint8Array(total); // 1 = 背景
  const queue = new Int32Array(total);
  let head = 0;
  let tail = 0;
  const seed = (p) => {
    if (!mask[p] && dist(p) <= threshold) {
      mask[p] = 1;
      queue[tail++] = p;
    }
  };
  for (let x = 0; x < w; x += 1) {
    seed(x);
    seed((h - 1) * w + x);
  }
  for (let y = 0; y < h; y += 1) {
    seed(y * w);
    seed(y * w + w - 1);
  }
  while (head < tail) {
    const p = queue[head++];
    const x = p % w;
    if (x > 0) seed(p - 1);
    if (x < w - 1) seed(p + 1);
    if (p >= w) seed(p - w);
    if (p < total - w) seed(p + w);
  }

  // 3. 写回：背景替换为目标色；与背景相邻的边缘像素羽化；其余像素铺到目标色上去除透明
  const isBg = (p) => mask[p] === 1;
  for (let p = 0; p < total; p += 1) {
    const i = p * 4;
    if (isBg(p)) {
      pixels[i] = target.r;
      pixels[i + 1] = target.g;
      pixels[i + 2] = target.b;
      pixels[i + 3] = 255;
      continue;
    }
    const x = p % w;
    const nearBg =
      (x > 0 && isBg(p - 1)) ||
      (x < w - 1 && isBg(p + 1)) ||
      (p >= w && isBg(p - w)) ||
      (p < total - w && isBg(p + w));
    let t = 1;
    if (nearBg) {
      const d = dist(p);
      if (d <= threshold + feather) t = Math.max(0, (d - threshold) / feather);
    }
    const alpha = pixels[i + 3] / 255;
    t *= alpha;
    if (t < 1) {
      pixels[i] = Math.round(pixels[i] * t + target.r * (1 - t));
      pixels[i + 1] = Math.round(pixels[i + 1] * t + target.g * (1 - t));
      pixels[i + 2] = Math.round(pixels[i + 2] * t + target.b * (1 - t));
    }
    pixels[i + 3] = 255;
  }
}

async function chromaKeyH5(src, bgColor) {
  const img = await loadH5Image(src);
  const maxSide = 1600;
  const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
  const canvas = h5Canvas(img.width * scale, img.height * scale);
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
  replaceBackground(data.data, canvas.width, canvas.height, bgColor);
  ctx.putImageData(data, 0, 0);
  const blob = await canvasToBlob(canvas, 'image/jpeg', 0.94);
  if (!blob) throw new Error('导出图片失败');
  return {
    path: URL.createObjectURL(blob),
    size: blob.size,
    width: canvas.width,
    height: canvas.height,
    demo: false,
    source: 'local-chroma-key'
  };
}

function getMpCanvas(width, height) {
  if (typeof wx === 'undefined' || !wx.createOffscreenCanvas) {
    throw new Error(MP_CANVAS_UNSUPPORTED);
  }
  let canvas = null;
  try {
    canvas = wx.createOffscreenCanvas({ type: '2d', width, height });
  } catch (err) {
    canvas = null;
  }
  // 2.16.1 以下只支持 webgl 离屏画布，没有 2d 上下文
  if (!canvas || typeof canvas.getContext !== 'function' || typeof canvas.createImage !== 'function') {
    throw new Error(MP_CANVAS_UNSUPPORTED);
  }
  return canvas;
}

function loadMpImage(canvas, src) {
  return new Promise((resolve, reject) => {
    const img = canvas.createImage();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('图片加载失败'));
    img.src = src;
  });
}

function canvasToTempFilePathMp(canvas, quality = 0.94) {
  return new Promise((resolve, reject) => {
    wx.canvasToTempFilePath({
      canvas,
      fileType: 'jpg',
      quality,
      success: (res) => resolve(res.tempFilePath),
      fail: (err) => reject(new Error(err.errMsg || '导出图片失败'))
    });
  });
}

async function chromaKeyMP(src, bgColor) {
  const info = await getImageInfo(src);
  const maxSide = 1200;
  const scale = Math.min(1, maxSide / Math.max(info.width, info.height));
  const width = Math.max(1, Math.round(info.width * scale));
  const height = Math.max(1, Math.round(info.height * scale));
  const canvas = getMpCanvas(width, height);
  const ctx = canvas.getContext('2d');
  const img = await loadMpImage(canvas, src);
  ctx.drawImage(img, 0, 0, width, height);
  const data = ctx.getImageData(0, 0, width, height);
  replaceBackground(data.data, width, height, bgColor);
  ctx.putImageData(data, 0, 0);
  const path = await canvasToTempFilePathMp(canvas);
  return {
    path,
    size: await getFileSize(path),
    width,
    height,
    demo: false,
    source: 'local-chroma-key'
  };
}

function readBase64(src) {
  if (isH5) {
    return fetch(src)
      .then((res) => res.blob())
      .then(blobToDataURL)
      .then((url) => url.split(',')[1]);
  }
  return new Promise((resolve, reject) => {
    uni.getFileSystemManager().readFile({
      filePath: src,
      encoding: 'base64',
      success: (res) => resolve(res.data),
      fail: () => reject(new Error('读取图片失败'))
    });
  });
}

function writeBase64Mp(base64) {
  return new Promise((resolve, reject) => {
    const filePath = `${wx.env.USER_DATA_PATH}/cutout_${Date.now()}.jpg`;
    uni.getFileSystemManager().writeFile({
      filePath,
      data: base64,
      encoding: 'base64',
      success: () => resolve(filePath),
      fail: (err) => reject(new Error(err.errMsg || '写入图片失败'))
    });
  });
}

function downloadMp(url) {
  return new Promise((resolve, reject) => {
    uni.downloadFile({
      url,
      success: (res) =>
        res.statusCode >= 200 && res.statusCode < 300
          ? resolve(res.tempFilePath)
          : reject(new Error('下载抠图结果失败')),
      fail: (err) => reject(new Error(err.errMsg || '下载抠图结果失败（请检查 downloadFile 合法域名）'))
    });
  });
}

/** 把抠图服务返回的 url / data URL / 裸 base64 统一成当前端可直接使用的本地路径 */
async function normalizeApiImage(raw) {
  const value = String(raw);
  if (isRemote(value)) {
    // 小程序端远程图片无法直接画到画布或保存相册，先下载为临时文件
    return isH5 ? value : downloadMp(value);
  }
  const base64 = value.startsWith('data:') ? value.split(',')[1] : value;
  if (isH5) {
    return value.startsWith('data:') ? value : `data:image/jpeg;base64,${base64}`;
  }
  return writeBase64Mp(base64);
}

async function cutoutByApi(src, bgColor) {
  const image = await readBase64(src);
  const res = await new Promise((resolve, reject) => {
    uni.request({
      url: PHOTO_API,
      method: 'POST',
      header: { 'content-type': 'application/json' },
      data: { image, bgColor },
      timeout: 30000,
      success: resolve,
      fail: (err) => reject(new Error(err.errMsg || '抠图服务连接失败'))
    });
  });
  if (res.statusCode < 200 || res.statusCode >= 300 || !res.data) {
    throw new Error((res.data && res.data.message) || '抠图服务返回异常');
  }
  const body = res.data.data || res.data;
  const raw = body.image || body.url;
  if (!raw) throw new Error('抠图服务未返回图片');
  const path = await normalizeApiImage(raw);
  return {
    path,
    size: body.size || (await getFileSize(path)),
    width: body.width || 0,
    height: body.height || 0,
    demo: false,
    source: 'api'
  };
}

export async function cutoutPhoto(src, bgColor = '#438edb') {
  if (PHOTO_API) {
    return cutoutByApi(src, bgColor);
  }
  if (isH5) {
    return chromaKeyH5(src, bgColor);
  }
  try {
    return await chromaKeyMP(src, bgColor);
  } catch (err) {
    return {
      path: src,
      size: await getFileSize(src),
      demo: true,
      source: 'demo',
      message: err && err.message ? err.message : MP_CANVAS_UNSUPPORTED
    };
  }
}

export async function renderToSpec(src, width, height) {
  if (!width || !height) {
    return { path: src, size: await getFileSize(src), demo: true };
  }
  const w = Math.min(MAX_SPEC_PX, Math.max(1, Math.round(width)));
  const h = Math.min(MAX_SPEC_PX, Math.max(1, Math.round(height)));
  if (!isH5) {
    try {
      const info = await getImageInfo(src);
      const canvas = getMpCanvas(w, h);
      const ctx = canvas.getContext('2d');
      fillWhite(ctx, w, h);
      const img = await loadMpImage(canvas, src);
      const scale = Math.max(w / info.width, h / info.height);
      const dw = info.width * scale;
      const dh = info.height * scale;
      ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
      const path = await canvasToTempFilePathMp(canvas);
      return { path, size: await getFileSize(path), width: w, height: h, demo: false };
    } catch (err) {
      return {
        path: src,
        size: await getFileSize(src),
        demo: true,
        message: (err && err.message) || MP_CANVAS_UNSUPPORTED
      };
    }
  }
  const img = await loadH5Image(src);
  const canvas = h5Canvas(w, h);
  const ctx = canvas.getContext('2d');
  fillWhite(ctx, w, h);
  const scale = Math.max(w / img.width, h / img.height);
  const dw = img.width * scale;
  const dh = img.height * scale;
  ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
  const blob = await canvasToBlob(canvas, 'image/jpeg', 0.94);
  if (!blob) throw new Error('导出图片失败');
  return {
    path: URL.createObjectURL(blob),
    size: blob.size,
    width: w,
    height: h,
    demo: false
  };
}

/**
 * 把临时图片转成可跨页面、跨会话保存的路径：
 * - H5：blob URL 刷新即失效，转为 data URL（证件照通常只有几十 KB）
 * - 小程序：tempFilePath 会被系统清理，复制到 USER_DATA_PATH 持久保存，并删除上一份。
 *   注意不用 uni.saveFile：它会“移动”临时文件，原路径随即失效，正在预览的原图会坏掉。
 */
export async function persistImage(path, previous = '') {
  if (!path) return path;
  if (isH5) {
    if (path.startsWith('data:')) return path;
    const blob = await fetch(path).then((res) => res.blob());
    return blobToDataURL(blob);
  }
  if (isRemote(path) || typeof wx === 'undefined' || !wx.env || !wx.env.USER_DATA_PATH) return path;
  const fs = uni.getFileSystemManager();
  const dir = `${wx.env.USER_DATA_PATH}/idphoto`;
  if (path.startsWith(`${dir}/`)) return path;
  const saved = await new Promise((resolve) => {
    const copy = () => {
      const destPath = `${dir}/photo_${Date.now()}.jpg`;
      fs.copyFile({
        srcPath: path,
        destPath,
        success: () => resolve(destPath),
        fail: () => resolve(path)
      });
    };
    fs.access({
      path: dir,
      success: copy,
      fail: () => fs.mkdir({ dirPath: dir, recursive: true, success: copy, fail: () => resolve(path) })
    });
  });
  if (previous && previous !== saved && previous.startsWith(`${dir}/`)) {
    fs.unlink({ filePath: previous, fail: () => {} });
  }
  return saved;
}

function h5NeedsLongPress() {
  const ua = (typeof navigator !== 'undefined' && navigator.userAgent) || '';
  // iOS Safari / 微信内置浏览器 / 多数 App 内 WebView 不支持 <a download>
  return /iPhone|iPad|iPod|MicroMessenger|QQ\/|Weibo|AlipayClient/i.test(ua);
}

/**
 * 保存图片。返回实际保存方式：'download' | 'preview' | 'album'。
 * 'preview' 表示已打开大图，需要用户长按保存。
 */
export function savePhoto(path) {
  if (!path) return Promise.reject(new Error('没有可保存的图片'));
  if (isH5) {
    if (h5NeedsLongPress()) {
      uni.previewImage({ urls: [path], current: path });
      return Promise.resolve('preview');
    }
    const a = document.createElement('a');
    a.href = path;
    a.download = `证件照_${Date.now()}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    return Promise.resolve('download');
  }
  return new Promise((resolve, reject) => {
    uni.saveImageToPhotosAlbum({
      filePath: path,
      success: () => resolve('album'),
      fail: (err) => {
        const msg = String((err && err.errMsg) || '');
        if (/privacy/i.test(msg)) {
          reject(new Error('请先同意隐私保护指引后再保存'));
          return;
        }
        if (/auth|authorize|permission/i.test(msg)) {
          uni.showModal({
            title: '需要相册权限',
            content: '请在设置中允许保存图片到相册',
            success: (res) => {
              if (res.confirm) uni.openSetting({});
            }
          });
        }
        if (/cancel/i.test(msg)) {
          reject(new Error('已取消保存'));
          return;
        }
        reject(new Error(msg || '保存失败'));
      }
    });
  });
}

/** 统一的保存成功提示 */
export function saveToastText(mode) {
  return mode === 'preview' ? '长按图片即可保存' : '已保存';
}

/** 删除小程序端持久化的证件照文件（配合“清除缓存”使用） */
export function clearSavedPhotos() {
  if (isH5 || typeof wx === 'undefined' || !wx.env || !wx.env.USER_DATA_PATH) return;
  uni.getFileSystemManager().rmdir({
    dirPath: `${wx.env.USER_DATA_PATH}/idphoto`,
    recursive: true,
    fail: () => {}
  });
}
