<template>
  <view class="page">
    <view class="profile card">
      <view class="avatar">工</view>
      <view class="profile-main">
        <view class="profile-name">随身工具箱</view>
        <view class="profile-sub">证件照 · 个税计算</view>
      </view>
      <text class="pill">v1.0.0</text>
    </view>

    <view class="section-title"><text>应用信息</text></view>
    <view class="card list-card">
      <view class="list-row">
        <text class="list-label">合并来源</text>
        <text class="list-value">证件照 + 个税计算器</text>
      </view>
      <view class="divider" />
      <view class="list-row">
        <text class="list-label">证件照规格</text>
        <text class="list-value">一寸 / 二寸 / 证件 / 考试</text>
      </view>
      <view class="divider" />
      <view class="list-row">
        <text class="list-label">个税税种</text>
        <text class="list-value">13 类</text>
      </view>
      <view class="divider" />
      <view class="list-row">
        <text class="list-label">计算方式</text>
        <text class="list-value">本地计算</text>
      </view>
    </view>

    <view class="section-title"><text>数据与隐私</text></view>
    <view class="card note-card">
      <view class="note-line">个税计算全部在本机完成，不上传收入、扣除等数据。</view>
      <view class="note-line">证件照默认在本机处理；如配置抠图服务，图片会发送到所配置的服务端。</view>
      <view class="note-line">计算结果仅供参考，最终以税务部门口径为准。</view>
    </view>

    <view class="section-title"><text>操作</text></view>
    <view class="card list-card">
      <view class="list-row action" @tap="clearData">
        <text class="list-label">清除本地缓存</text>
        <text class="list-value">›</text>
      </view>
      <view class="divider" />
      <view class="list-row action" @tap="about">
        <text class="list-label">关于</text>
        <text class="list-value">›</text>
      </view>
    </view>

    <view class="footer">工具合集 · 2026</view>
  </view>
</template>

<script>
import { clearSavedPhotos } from '@/services/photo';

export default {
  methods: {
    clearData() {
      uni.showModal({
        title: '清除本地缓存',
        content: '会清除个税结果、专项扣除和证件照设置，不会删除相册里的图片。',
        success: (res) => {
          if (!res.confirm) return;
          uni.clearStorageSync();
          clearSavedPhotos();
          uni.showToast({ title: '已清除', icon: 'none' });
        }
      });
    },
    about() {
      uni.showModal({
        title: '随身工具箱',
        content: '由证件照与个税计算两个小程序合并的 uni-app 工具合集。',
        showCancel: false
      });
    }
  }
};
</script>

<style scoped lang="scss">
.profile {
  display: flex;
  align-items: center;
}

.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 104rpx;
  height: 104rpx;
  border-radius: 30rpx;
  color: #fff;
  font-size: 44rpx;
  font-weight: 800;
  background: linear-gradient(135deg, #5c7efc, #8fa8ff);
}

.profile-main {
  flex: 1;
  margin-left: 22rpx;
}

.profile-name {
  font-size: 34rpx;
  font-weight: 700;
}

.profile-sub {
  margin-top: 6rpx;
  font-size: 23rpx;
  color: #8a90a2;
}

.list-card {
  padding: 0 28rpx;
}

.list-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 92rpx;
}

.list-label {
  font-size: 27rpx;
  color: #333a4d;
}

.list-value {
  font-size: 24rpx;
  color: #8a90a2;
}

.list-row.action .list-value {
  font-size: 36rpx;
  color: #c3c8d6;
}

.note-card {
  background: #f8faff;
}

.note-line {
  font-size: 24rpx;
  line-height: 1.8;
  color: #6b7284;
}

.footer {
  margin-top: 50rpx;
  text-align: center;
  font-size: 21rpx;
  color: #b0b5c3;
}
</style>
