<template>
  <view class="page">
    <view class="card spec-head">
      <view>
        <view class="spec-name">{{ spec.name }}</view>
        <view class="spec-sub">{{ specText(spec) }}</view>
      </view>
      <text class="pill">{{ spec.id === 'custom' ? '自定义' : spec.category }}</text>
    </view>

    <view v-if="spec.id === 'custom'" class="card custom-card">
      <view class="field-label">像素尺寸</view>
      <view class="field-row">
        <input v-model="customWidth" class="field-input" type="number" placeholder="宽 px" />
        <text class="field-x">×</text>
        <input v-model="customHeight" class="field-input" type="number" placeholder="高 px" />
      </view>
      <view class="field-tip">宽高比需在 1:1 ~ 1:2 之间，单边 {{ minPx }}~{{ maxPx }} px，例如 295×413</view>
    </view>

    <view class="photo-card card">
      <view class="photo-frame" :style="{ paddingTop: frameRatio + '%' }">
        <image v-if="preview" :src="preview" class="photo-img" mode="aspectFill" />
        <view v-else class="photo-placeholder">
          <view class="placeholder-icon">＋</view>
          <view class="placeholder-text">上传一张正面照片</view>
          <view class="placeholder-tip">建议纯色背景、光线均匀</view>
        </view>
      </view>
      <view class="photo-actions">
        <view class="btn btn-ghost small" @tap="pick('album')">相册</view>
        <view class="btn btn-ghost small" @tap="pick('camera')">拍照</view>
        <view v-if="preview" class="btn btn-light small" @tap="reset">重选</view>
      </view>
    </view>

    <view class="section-title"><text>背景颜色</text></view>
    <view class="color-row">
      <view
        v-for="color in colors"
        :key="color.value"
        class="color-item"
        :class="{ active: bgColor === color.value }"
        @tap="chooseColor(color.value)"
      >
        <view class="color-dot" :style="{ background: color.value }" />
        <text class="color-name">{{ color.name }}</text>
      </view>
    </view>

    <view class="action-stack">
      <view class="btn btn-ghost" :class="{ 'is-disabled': !preview || busy }" @tap="smartCutout(false)">
        {{ busy ? '处理中…' : '智能换底（本机/服务）' }}
      </view>
      <view class="btn btn-primary" :class="{ 'is-disabled': !preview || busy }" @tap="generate">
        生成证件照
      </view>
    </view>

    <view class="note">
      <text>默认在本机处理；如配置抠图服务，图片会发送到所配置的服务端。</text>
    </view>
  </view>
</template>

<script>
import { findSpec, specText } from '@/data/specs';
import {
  choosePhoto,
  cutoutPhoto,
  renderToSpec,
  getFileSize,
  persistImage,
  releaseImage,
  MAX_SPEC_PX,
  MIN_SPEC_PX
} from '@/services/photo';
import { BG_COLORS, DEFAULT_BG } from '@/data/colors';

export default {
  data() {
    return {
      specId: 'one',
      spec: findSpec('one'),
      customWidth: '295',
      customHeight: '413',
      imagePath: '',
      preview: '',
      cutoutApplied: false,
      bgColor: DEFAULT_BG,
      busy: false,
      minPx: MIN_SPEC_PX,
      maxPx: MAX_SPEC_PX,
      colors: BG_COLORS
    };
  },
  computed: {
    effectiveSpec() {
      if (this.spec.id !== 'custom') return this.spec;
      const width = Math.round(Number(this.customWidth) || 0);
      const height = Math.round(Number(this.customHeight) || 0);
      return { ...this.spec, px: [width, height], mm: [0, 0] };
    },
    frameRatio() {
      const [w, h] = this.effectiveSpec.px;
      if (!w || !h) return 140;
      return Math.min(200, Math.max(100, Math.round((h / w) * 100)));
    }
  },
  onLoad(options) {
    this.specId = (options && options.specId) || 'one';
    this.spec = findSpec(this.specId);
  },
  onUnload() {
    this.setPreview('');
  },
  methods: {
    specText,
    /** 替换预览图，并释放上一张本页生成的临时图 */
    setPreview(path) {
      if (this.preview && this.preview !== this.imagePath && this.preview !== path) {
        releaseImage(this.preview);
      }
      this.preview = path;
    },
    async pick(source) {
      if (this.busy) return;
      try {
        const path = await choosePhoto({ camera: source === 'camera' });
        this.setPreview(path);
        this.imagePath = path;
        this.cutoutApplied = false;
      } catch (err) {
        uni.showToast({ title: err.message || '选择失败', icon: 'none' });
      }
    },
    reset() {
      if (this.busy) return;
      this.setPreview('');
      this.imagePath = '';
      this.cutoutApplied = false;
    },
    async chooseColor(value) {
      if (this.busy) return;
      this.bgColor = value;
      if (this.imagePath) await this.smartCutout(true);
    },
    async smartCutout(silent = false) {
      if (this.busy) return;
      if (!this.imagePath) {
        if (!silent) uni.showToast({ title: '请先上传照片', icon: 'none' });
        return;
      }
      this.busy = true;
      try {
        const result = await cutoutPhoto(this.imagePath, this.bgColor);
        this.setPreview(result.path);
        this.cutoutApplied = !result.demo;
        if (result.demo && !silent) {
          uni.showToast({ title: result.message || '当前为演示模式', icon: 'none', duration: 2500 });
        }
      } catch (err) {
        uni.showToast({ title: err.message || '处理失败', icon: 'none' });
      } finally {
        this.busy = false;
      }
    },
    async generate() {
      if (this.busy) return;
      if (!this.imagePath) {
        uni.showToast({ title: '请先上传照片', icon: 'none' });
        return;
      }
      const [w, h] = this.effectiveSpec.px;
      if (!w || !h || w < MIN_SPEC_PX || h < MIN_SPEC_PX || w > MAX_SPEC_PX || h > MAX_SPEC_PX) {
        uni.showToast({ title: `宽高需在 ${MIN_SPEC_PX}~${MAX_SPEC_PX} px 之间`, icon: 'none' });
        return;
      }
      const ratio = h / w;
      if (this.spec.id === 'custom' && (ratio < 1 || ratio > 2)) {
        uni.showToast({ title: '宽高比需在 1:1 ~ 1:2 之间', icon: 'none' });
        return;
      }
      this.busy = true;
      try {
        const base = this.preview || this.imagePath;
        const rendered = await renderToSpec(base, w, h);
        const size = rendered.size || (await getFileSize(rendered.path));
        // 临时路径（blob / tempFilePath）刷新或过期后会失效，先转为持久路径再存储
        const previous = uni.getStorageSync('idphoto:last');
        const path = await persistImage(rendered.path, previous && previous.path);
        if (path !== rendered.path && rendered.path !== base) releaseImage(rendered.path);
        const payload = {
          path,
          size,
          width: w,
          height: h,
          spec: { ...this.spec, px: [w, h] },
          bgColor: this.bgColor,
          demo: !this.cutoutApplied || !!rendered.demo
        };
        uni.setStorageSync('idphoto:last', payload);
        uni.navigateTo({ url: '/pages/idphoto/result' });
      } catch (err) {
        uni.showToast({ title: err.message || '生成失败', icon: 'none' });
      } finally {
        this.busy = false;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.spec-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.spec-name {
  font-size: 34rpx;
  font-weight: 700;
}

.spec-sub {
  margin-top: 8rpx;
  font-size: 23rpx;
  color: #8a90a2;
}

.custom-card {
  margin-top: 18rpx;
}

.field-label {
  font-size: 26rpx;
  font-weight: 600;
}

.field-row {
  display: flex;
  align-items: center;
  gap: 14rpx;
  margin-top: 16rpx;
}

.field-input {
  flex: 1;
  height: 76rpx;
  padding: 0 20rpx;
  border-radius: 16rpx;
  background: #f5f7fc;
  font-size: 26rpx;
  text-align: center;
}

.field-x {
  color: #b0b5c3;
}

.field-tip {
  margin-top: 12rpx;
  font-size: 21rpx;
  color: #a0a6b6;
}

.photo-card {
  margin-top: 18rpx;
}

.photo-frame {
  position: relative;
  width: 100%;
  border-radius: 20rpx;
  overflow: hidden;
  background: repeating-linear-gradient(
    45deg,
    #f4f6fb,
    #f4f6fb 12rpx,
    #eef1f8 12rpx,
    #eef1f8 24rpx
  );
}

.photo-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.photo-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.placeholder-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 92rpx;
  height: 92rpx;
  border-radius: 50%;
  background: #e8edfb;
  color: #5c7efc;
  font-size: 44rpx;
}

.placeholder-text {
  margin-top: 18rpx;
  font-size: 27rpx;
  font-weight: 600;
}

.placeholder-tip {
  margin-top: 8rpx;
  font-size: 22rpx;
  color: #a0a6b6;
}

.photo-actions {
  display: flex;
  gap: 14rpx;
  margin-top: 20rpx;
}

.btn.small {
  flex: 1;
  height: 72rpx;
  font-size: 25rpx;
}

.color-row {
  display: flex;
  gap: 14rpx;
}

.color-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 18rpx 8rpx;
  border-radius: 18rpx;
  background: #fff;
  border: 2rpx solid transparent;
}

.color-item.active {
  border-color: #5c7efc;
  background: #f7f9ff;
}

.color-dot {
  width: 56rpx;
  height: 56rpx;
  border-radius: 50%;
  border: 1rpx solid rgba(0, 0, 0, 0.06);
}

.color-name {
  margin-top: 10rpx;
  font-size: 21rpx;
  color: #5b6274;
}

.action-stack {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
  margin-top: 30rpx;
}

.note {
  margin-top: 22rpx;
  text-align: center;
  font-size: 21rpx;
  line-height: 1.7;
  color: #a0a6b6;
}
</style>
