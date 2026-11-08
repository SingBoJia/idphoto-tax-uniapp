<template>
  <view class="page">
    <template v-if="data">
      <view class="card result-card">
        <view class="result-head">
          <view>
            <view class="result-title">制作完成</view>
            <view class="result-sub">{{ data.spec.name }} · {{ data.width }}×{{ data.height }} px</view>
          </view>
          <text class="pill">{{ fileSizeText }}</text>
        </view>
        <view class="photo-frame" :style="{ paddingTop: frameRatio + '%' }">
          <image :src="data.path" class="photo-img" mode="aspectFill" />
        </view>
      </view>

      <view class="section-title"><text>照片信息</text></view>
      <view class="card info-card">
        <view class="info-row">
          <text class="info-label">规格</text>
          <text class="info-value">{{ data.spec.name }}</text>
        </view>
        <view class="divider" />
        <view class="info-row">
          <text class="info-label">像素</text>
          <text class="info-value">{{ data.width }} × {{ data.height }} px</text>
        </view>
        <view class="divider" />
        <view class="info-row">
          <text class="info-label">文件大小</text>
          <text class="info-value">{{ fileSizeText }}</text>
        </view>
        <view class="divider" />
        <view class="info-row">
          <text class="info-label">背景色</text>
          <view class="row">
            <view class="bg-dot" :style="{ background: data.bgColor }" />
            <text class="info-value">{{ data.bgColor }}</text>
          </view>
        </view>
      </view>

      <view class="action-stack">
        <view class="btn btn-primary" @tap="save">保存到相册</view>
        <view class="btn btn-ghost" @tap="restart">重新制作</view>
      </view>

      <view v-if="data.demo" class="demo-note">
        当前为演示模式：未进行真实背景替换（可能未点击“智能换底”，或未配置抠图服务）。
      </view>
    </template>

    <view v-else class="empty">
      <view class="empty-icon">照</view>
      <view class="empty-text">还没有制作记录</view>
      <view class="btn btn-primary empty-btn" @tap="goEdit">去制作</view>
    </view>
  </view>
</template>

<script>
import { savePhoto } from '@/services/photo';
import { fileSize } from '@/utils/format';

export default {
  data() {
    return { data: null };
  },
  computed: {
    frameRatio() {
      if (!this.data || !this.data.width) return 140;
      return Math.round((this.data.height / this.data.width) * 100);
    },
    fileSizeText() {
      return fileSize(this.data && this.data.size);
    }
  },
  onShow() {
    const data = uni.getStorageSync('idphoto:last');
    this.data = data || null;
  },
  methods: {
    async save() {
      if (!this.data) return;
      try {
        await savePhoto(this.data.path);
        uni.showToast({ title: '已保存', icon: 'success' });
      } catch (err) {
        uni.showToast({ title: err.message || '保存失败', icon: 'none' });
      }
    },
    restart() {
      uni.navigateBack({ delta: 1 });
    },
    goEdit() {
      uni.redirectTo({ url: '/pages/idphoto/edit?specId=one' });
    }
  }
};
</script>

<style scoped lang="scss">
.result-card {
  padding: 26rpx;
}

.result-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 22rpx;
}

.result-title {
  font-size: 34rpx;
  font-weight: 800;
}

.result-sub {
  margin-top: 8rpx;
  font-size: 23rpx;
  color: #8a90a2;
}

.photo-frame {
  position: relative;
  width: 100%;
  border-radius: 20rpx;
  overflow: hidden;
  background: #f4f6fb;
}

.photo-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.info-card {
  padding: 0 26rpx;
}

.info-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 88rpx;
}

.info-label {
  font-size: 25rpx;
  color: #8a90a2;
}

.info-value {
  font-size: 25rpx;
  color: #333a4d;
}

.bg-dot {
  width: 28rpx;
  height: 28rpx;
  margin-right: 10rpx;
  border-radius: 50%;
  border: 1rpx solid rgba(0, 0, 0, 0.08);
}

.action-stack {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
  margin-top: 28rpx;
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

.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 120rpx;
}

.empty-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120rpx;
  height: 120rpx;
  border-radius: 32rpx;
  background: #eef2ff;
  color: #5c7efc;
  font-size: 48rpx;
  font-weight: 800;
}

.empty-text {
  margin-top: 22rpx;
  font-size: 26rpx;
  color: #8a90a2;
}

.empty-btn {
  margin-top: 30rpx;
  width: 300rpx;
}
</style>
