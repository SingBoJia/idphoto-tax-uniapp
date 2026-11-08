const isH5 = typeof document !== 'undefined' && typeof window !== 'undefined';

export const PHOTO_API = import.meta.env.VITE_PHOTO_CUTOUT_URL || '';

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

function loadH5Image(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
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

export async function compressToTarget(src, targetKB = 100, type = 'image/jpeg') {
  const target = Math.max(8, Number(targetKB) || 100) * 1024;
  if (isH5) {
    const img = await loadH5Image(src);
    const maxSide = 2400;
    const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
    const canvas = h5Canvas(img.width * scale, img.height * scale);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    let low = 0.2;
    let high = 0.95;
    let best = null;
    for (let i = 0; i < 8; i += 1) {
      const quality = (low + high) / 2;
      const blob = await canvasToBlob(canvas, type, quality);
      if (!blob) break;
      if (blob.size <= target) {
        best = { blob, quality };
        low = quality;
      } else {
        high = quality;
      }
    }
    if (!best) {
      const blob = await canvasToBlob(canvas, type, 0.2);
      best = { blob, quality: 0.2 };
    }
    return {
      path: URL.createObjectURL(best.blob),
      size: best.blob.size,
      quality: best.quality,
      width: canvas.width,
      height: canvas.height
    };
  }

  let quality = 0.9;
  let last = { path: src, size: await getFileSize(src), quality: 1 };
  while (quality >= 0.2) {
    const path = await new Promise((resolve, reject) => {
      uni.compressImage({
        src,
        quality: Math.round(quality * 100),
        success: (res) => resolve(res.tempFilePath),
        fail: (err) => reject(new Error(err.errMsg || '压缩失败'))
      });
    });
    const size = await getFileSize(path);
    last = { path, size, quality };
    if (size > 0 && size <= target) break;
    quality -= 0.1;
  }
  return last;
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

function distance(a, b) {
  const dr = a.r - b.r;
  const dg = a.g - b.g;
  const db = a.b - b.b;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

function replaceBackground(pixels, w, h, bgColor) {
  const samples = [];
  const push = (x, y) => {
    const i = (y * w + x) * 4;
    samples.push({ r: pixels[i], g: pixels[i + 1], b: pixels[i + 2] });
  };
  const edge = 4;
  for (let x = 0; x < w; x += Math.max(1, Math.floor(w / 20))) {
    push(x, edge);
    push(x, h - edge - 1);
  }
  for (let y = 0; y < h; y += Math.max(1, Math.floor(h / 20))) {
    push(edge, y);
    push(w - edge - 1, y);
  }
  const bg = samples.reduce(
    (acc, item) => ({ r: acc.r + item.r, g: acc.g + item.g, b: acc.b + item.b }),
    { r: 0, g: 0, b: 0 }
  );
  bg.r /= samples.length;
  bg.g /= samples.length;
  bg.b /= samples.length;

  const target = hexToRgb(bgColor);
  const threshold = 58;
  const feather = 34;
  for (let i = 0; i < pixels.length; i += 4) {
    const px = { r: pixels[i], g: pixels[i + 1], b: pixels[i + 2] };
    const d = distance(px, bg);
    if (d <= threshold) {
      pixels[i] = target.r;
      pixels[i + 1] = target.g;
      pixels[i + 2] = target.b;
      pixels[i + 3] = 255;
    } else if (d <= threshold + feather) {
      const t = (d - threshold) / feather;
      pixels[i] = Math.round(px.r * t + target.r * (1 - t));
      pixels[i + 1] = Math.round(px.g * t + target.g * (1 - t));
      pixels[i + 2] = Math.round(px.b * t + target.b * (1 - t));
    }
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
    throw new Error('当前基础库不支持离屏画布');
  }
  return wx.createOffscreenCanvas({ type: '2d', width, height });
}

function loadMpImage(canvas, src) {
  return new Promise((resolve, reject) => {
    const img = canvas.createImage();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('图片加载失败'));
    img.src = src;
  });
}

function canvasToTempFilePathMp(canvas) {
  return new Promise((resolve, reject) => {
    wx.canvasToTempFilePath({
      canvas,
      fileType: 'jpg',
      quality: 0.94,
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
      .then(
        (blob) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result).split(',')[1]);
            reader.onerror = () => reject(new Error('读取图片失败'));
            reader.readAsDataURL(blob);
          })
      );
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
  const path = body.image || body.url;
  if (!path) throw new Error('抠图服务未返回图片');
  return {
    path,
    size: body.size || 0,
    width: body.width || 0,
    height: body.height || 0,
    demo: false,
    source: 'api'
  };
}

export async function cutoutPhoto(src, bgColor = '#568cd6') {
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
      message: '当前基础库不支持离屏画布，未做背景替换。'
    };
  }
}

export async function renderToSpec(src, width, height) {
  if (!width || !height) {
    return { path: src, size: await getFileSize(src), demo: true };
  }
  if (!isH5) {
    try {
      const info = await getImageInfo(src);
      const canvas = getMpCanvas(width, height);
      const ctx = canvas.getContext('2d');
      const img = await loadMpImage(canvas, src);
      const scale = Math.max(width / info.width, height / info.height);
      const dw = info.width * scale;
      const dh = info.height * scale;
      ctx.drawImage(img, (width - dw) / 2, (height - dh) / 2, dw, dh);
      const path = await canvasToTempFilePathMp(canvas);
      return { path, size: await getFileSize(path), width, height, demo: false };
    } catch (err) {
      return { path: src, size: await getFileSize(src), demo: true };
    }
  }
  const img = await loadH5Image(src);
  const canvas = h5Canvas(width, height);
  const ctx = canvas.getContext('2d');
  const scale = Math.max(width / img.width, height / img.height);
  const dw = img.width * scale;
  const dh = img.height * scale;
  ctx.drawImage(img, (width - dw) / 2, (height - dh) / 2, dw, dh);
  const blob = await canvasToBlob(canvas, 'image/jpeg', 0.94);
  return {
    path: URL.createObjectURL(blob),
    size: blob.size,
    width,
    height,
    demo: false
  };
}

export function savePhoto(path) {
  if (isH5) {
    const a = document.createElement('a');
    a.href = path;
    a.download = `证件照_${Date.now()}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    uni.saveImageToPhotosAlbum({
      filePath: path,
      success: resolve,
      fail: (err) => {
        if (String(err.errMsg || '').includes('auth')) {
          uni.showModal({
            title: '需要相册权限',
            content: '请在设置中允许保存图片到相册',
            success: (res) => {
              if (res.confirm) uni.openSetting({});
            }
          });
        }
        reject(new Error(err.errMsg || '保存失败'));
      }
    });
  });
}
