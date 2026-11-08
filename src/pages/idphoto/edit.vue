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
      <view class="field-tip">宽高比需在 1:1 ~ 1:2 之间，例如 295×413</view>
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
      <view class="btn btn-ghost" :class="{ 'is-disabled': busy }" @tap="smartCutout">
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
import { choosePhoto, cutoutPhoto, renderToSpec, getFileSize } from '@/services/photo';

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
      bgColor: '#568cd6',
      busy: false,
      colors: [
        { name: '蓝底', value: '#568cd6' },
        { name: '红底', value: '#e93423' },
        { name: '白底', value: '#ffffff' },
        { name: '浅灰', value: '#e9edf5' }
      ]
    };
  },
  computed: {
    effectiveSpec() {
      if (this.spec.id !== 'custom') return this.spec;
      const width = Math.max(1, Math.round(Number(this.customWidth) || 295));
      const height = Math.max(1, Math.round(Number(this.customHeight) || 413));
      return { ...this.spec, px: [width, height], mm: [0, 0] };
    },
    frameRatio() {
      const [w, h] = this.effectiveSpec.px;
      return Math.round((h / w) * 100);
    }
  },
  onLoad(options) {
    this.specId = (options && options.specId) || 'one';
    this.spec = findSpec(this.specId);
  },
  methods: {
    specText,
    async pick(source) {
      try {
        const path = await choosePhoto({ camera: source === 'camera' });
        this.imagePath = path;
        this.preview = path;
        this.cutoutApplied = false;
      } catch (err) {
        uni.showToast({ title: err.message || '选择失败', icon: 'none' });
      }
    },
    reset() {
      this.imagePath = '';
      this.preview = '';
      this.cutoutApplied = false;
    },
    async chooseColor(value) {
      this.bgColor = value;
      if (this.imagePath) await this.smartCutout(true);
    },
    async smartCutout(silent = false) {
      if (!this.imagePath) {
        if (!silent) uni.showToast({ title: '请先上传照片', icon: 'none' });
        return;
      }
      this.busy = true;
      try {
        const result = await cutoutPhoto(this.imagePath, this.bgColor);
        this.preview = result.path;
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
      if (!this.imagePath) {
        uni.showToast({ title: '请先上传照片', icon: 'none' });
        return;
      }
      const [w, h] = this.effectiveSpec.px;
      if (!w || !h) {
        uni.showToast({ title: '尺寸不正确', icon: 'none' });
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
        const payload = {
          path: rendered.path,
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
