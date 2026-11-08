<template>
  <view class="page">
    <view class="card intro">
      <view class="intro-title">修改 KB</view>
      <view class="intro-sub">压缩照片到指定大小，适合报名系统、考试上传。</view>
    </view>

    <view class="card upload-card">
      <view class="upload-box" @tap="pick">
        <image v-if="imagePath" :src="imagePath" class="upload-img" mode="aspectFit" />
        <view v-else class="upload-empty">
          <view class="upload-icon">＋</view>
          <view class="upload-text">选择一张照片</view>
        </view>
      </view>
      <view class="size-row">
        <text class="size-label">目标大小</text>
        <input v-model="targetKB" class="size-input" type="number" />
        <text class="size-unit">KB</text>
      </view>
      <view class="size-tip">常用：20 KB / 50 KB / 100 KB / 200 KB</view>
    </view>

    <view class="btn btn-primary" :class="{ 'is-disabled': !imagePath || busy }" @tap="compress">
      {{ busy ? '压缩中…' : '开始压缩' }}
    </view>

    <template v-if="result">
      <view class="section-title"><text>压缩结果</text></view>
      <view class="card result-card">
        <view class="result-row">
          <text class="result-label">原图</text>
          <text class="result-value">{{ fileSize(beforeSize) }}</text>
        </view>
        <view class="divider" />
        <view class="result-row">
          <text class="result-label">压缩后</text>
          <text class="result-value strong">{{ fileSize(result.size) }}</text>
        </view>
        <view class="divider" />
        <view class="result-row">
          <text class="result-label">质量</text>
          <text class="result-value">{{ Math.round((result.quality || 1) * 100) }}%</text>
        </view>
      </view>
      <view class="btn btn-ghost" @tap="save">保存压缩图</view>
    </template>
  </view>
</template>

<script>
import { choosePhoto, compressToTarget, getFileSize, savePhoto } from '@/services/photo';
import { fileSize } from '@/utils/format';

export default {
  data() {
    return {
      imagePath: '',
      targetKB: '100',
      beforeSize: 0,
      result: null,
      busy: false
    };
  },
  methods: {
    fileSize,
    async pick() {
      try {
        this.imagePath = await choosePhoto({});
        this.beforeSize = await getFileSize(this.imagePath);
        this.result = null;
      } catch (err) {
        uni.showToast({ title: err.message || '选择失败', icon: 'none' });
      }
    },
    async compress() {
      if (!this.imagePath) return;
      this.busy = true;
      try {
        this.result = await compressToTarget(this.imagePath, Number(this.targetKB) || 100);
        if (this.result.size > (Number(this.targetKB) || 100) * 1024) {
          uni.showToast({ title: '已压到最低质量，仍略大于目标', icon: 'none' });
        } else {
          uni.showToast({ title: '压缩完成', icon: 'success' });
        }
      } catch (err) {
        uni.showToast({ title: err.message || '压缩失败', icon: 'none' });
      } finally {
        this.busy = false;
      }
    },
    async save() {
      if (!this.result) return;
      try {
        await savePhoto(this.result.path);
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

.upload-box {
  width: 100%;
  height: 360rpx;
  border-radius: 20rpx;
  background: #f5f7fc;
  overflow: hidden;
}

.upload-img {
  width: 100%;
  height: 100%;
}

.upload-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
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
  font-size: 25rpx;
  color: #8a90a2;
}

.size-row {
  display: flex;
  align-items: center;
  margin-top: 24rpx;
}

.size-label {
  font-size: 26rpx;
  font-weight: 600;
}

.size-input {
  flex: 1;
  height: 76rpx;
  margin-left: 20rpx;
  padding: 0 20rpx;
  border-radius: 16rpx;
  background: #f5f7fc;
  font-size: 28rpx;
  text-align: right;
}

.size-unit {
  margin-left: 12rpx;
  font-size: 24rpx;
  color: #8a90a2;
}

.size-tip {
  margin-top: 12rpx;
  font-size: 21rpx;
  color: #a0a6b6;
}

.btn-primary {
  margin-top: 26rpx;
}

.result-card {
  padding: 0 26rpx;
}

.result-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 88rpx;
}

.result-label {
  font-size: 25rpx;
  color: #8a90a2;
}

.result-value {
  font-size: 25rpx;
  color: #333a4d;
}

.result-value.strong {
  color: #5c7efc;
  font-weight: 700;
}

.btn-ghost {
  margin-top: 20rpx;
}
</style>
