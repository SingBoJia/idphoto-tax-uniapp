<template>
  <view class="page">
    <view class="card intro">
      <view class="intro-title">换底色</view>
      <view class="intro-sub">选择照片与目标底色，生成标准证件照底色。</view>
    </view>

    <view class="card upload-card">
      <view class="photo-frame" :style="{ paddingTop: '140%' }">
        <image v-if="preview" :src="preview" class="photo-img" mode="aspectFill" />
        <view v-else class="upload-empty" @tap="pick">
          <view class="upload-icon">＋</view>
          <view class="upload-text">选择一张纯色背景照片</view>
        </view>
      </view>
      <view class="photo-actions">
        <view class="btn btn-ghost small" @tap="pick">相册</view>
        <view v-if="preview" class="btn btn-light small" @tap="reset">重选</view>
      </view>
    </view>

    <view class="section-title"><text>目标底色</text></view>
    <view class="color-row">
      <view
        v-for="color in colors"
        :key="color.value"
        class="color-item"
        :class="{ active: bgColor === color.value }"
        @tap="choose(color.value)"
      >
        <view class="color-dot" :style="{ background: color.value }" />
        <text class="color-name">{{ color.name }}</text>
      </view>
    </view>

    <view class="btn btn-primary" :class="{ 'is-disabled': !imagePath || busy }" @tap="run">
      {{ busy ? '处理中…' : '开始换底' }}
    </view>
    <view class="btn btn-ghost" v-if="preview" @tap="save">保存结果</view>

    <view v-if="demo" class="demo-note">
      当前为演示模式：未配置抠图服务，图片未做真实背景替换。
    </view>
  </view>
</template>

<script>
import { choosePhoto, cutoutPhoto, savePhoto } from '@/services/photo';

export default {
  data() {
    return {
      imagePath: '',
      preview: '',
      bgColor: '#568cd6',
      busy: false,
      demo: false,
      colors: [
        { name: '蓝底', value: '#568cd6' },
        { name: '红底', value: '#e93423' },
        { name: '白底', value: '#ffffff' },
        { name: '浅灰', value: '#e9edf5' }
      ]
    };
  },
  methods: {
    async pick() {
      try {
        this.imagePath = await choosePhoto({});
        this.preview = this.imagePath;
        this.demo = false;
      } catch (err) {
        uni.showToast({ title: err.message || '选择失败', icon: 'none' });
      }
    },
    reset() {
      this.imagePath = '';
      this.preview = '';
      this.demo = false;
    },
    async choose(value) {
      this.bgColor = value;
      if (this.imagePath) await this.run();
    },
    async run() {
      if (!this.imagePath) {
        uni.showToast({ title: '请先选择照片', icon: 'none' });
        return;
      }
      this.busy = true;
      try {
        const result = await cutoutPhoto(this.imagePath, this.bgColor);
        this.preview = result.path;
        this.demo = !!result.demo;
        if (result.demo) {
          uni.showToast({ title: result.message || '当前为演示模式', icon: 'none', duration: 2500 });
        }
      } catch (err) {
        uni.showToast({ title: err.message || '处理失败', icon: 'none' });
      } finally {
        this.busy = false;
      }
    },
    async save() {
      try {
        await savePhoto(this.preview);
        uni.showToast({ title: '已保存', icon: 'success' });
      } catch (err) {
        uni.showToast({ title: err.message || '保存失败', icon: 'none' });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.intro-title {
  font-size: 36rpx;
  font-weight: 800;
}

.intro-sub {
  margin-top: 10rpx;
  font-size: 24rpx;
  line-height: 1.6;
  color: #6b7284;
}

.upload-card {
  margin-top: 18rpx;
}

.photo-frame {
  position: relative;
  width: 100%;
  border-radius: 20rpx;
  overflow: hidden;
  background: #f5f7fc;
}

.photo-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.upload-empty {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.upload-icon {
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

.upload-text {
  margin-top: 16rpx;
  font-size: 24rpx;
  color: #8a90a2;
}

.photo-actions {
  display: flex;
  gap: 14rpx;
  margin-top: 18rpx;
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

.btn-primary {
  margin-top: 28rpx;
}

.btn-ghost {
  margin-top: 16rpx;
}

.demo-note {
  margin-top: 20rpx;
  padding: 18rpx 22rpx;
  border-radius: 16rpx;
  background: #fff8e8;
  color: #a16207;
  font-size: 22rpx;
  line-height: 1.6;
}
</style>
