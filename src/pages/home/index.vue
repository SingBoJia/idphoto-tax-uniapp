<template>
  <view class="page home">
    <view class="hero">
      <view class="hero-top">
        <text class="hero-badge">TOOLBOX</text>
        <text class="hero-date">{{ today }}</text>
      </view>
      <view class="hero-title">随身工具箱</view>
      <view class="hero-sub">证件照制作 · 个税计算，一站式搞定</view>
      <view class="hero-tags">
        <text class="hero-tag">本地处理</text>
        <text class="hero-tag">无需登录</text>
        <text class="hero-tag">即开即用</text>
      </view>
    </view>

    <view class="feature-list">
      <view class="feature-card photo-card" @tap="go('/pages/idphoto/index')">
        <view class="feature-icon">照</view>
        <view class="feature-main">
          <view class="feature-name">证件照制作</view>
          <view class="feature-desc">一寸 / 二寸 / 签证照，换底色、改 KB</view>
        </view>
        <text class="feature-arrow">›</text>
      </view>
      <view class="feature-card tax-card" @tap="go('/pages/tax/index')">
        <view class="feature-icon">税</view>
        <view class="feature-main">
          <view class="feature-name">个税计算器</view>
          <view class="feature-desc">工资、年终奖、劳务报酬等 13 类</view>
        </view>
        <text class="feature-arrow">›</text>
      </view>
    </view>

    <view class="section-title">
      <text>快捷工具</text>
      <text class="section-more" @tap="go('/pages/tax/more')">全部税种</text>
    </view>
    <view class="tool-grid">
      <view class="tool-item" @tap="go('/pages/idphoto/change-size')">
        <view class="tool-icon blue">KB</view>
        <text class="tool-name">修改 KB</text>
      </view>
      <view class="tool-item" @tap="go('/pages/idphoto/change-bg')">
        <view class="tool-icon green">底</view>
        <text class="tool-name">换底色</text>
      </view>
      <view class="tool-item" @tap="go('/pages/idphoto/edit?specId=custom')">
        <view class="tool-icon orange">尺</view>
        <text class="tool-name">自定义尺寸</text>
      </view>
      <view class="tool-item" @tap="go('/pages/tax/index')">
        <view class="tool-icon purple">税</view>
        <text class="tool-name">个税速算</text>
      </view>
    </view>

    <view class="card tip-card">
      <view class="tip-title">使用说明</view>
      <view class="tip-line">证件照：选择规格 → 上传照片 → 换底色 / 调尺寸 → 保存。</view>
      <view class="tip-line">个税：按现行累计预扣法计算，结果仅供参考，以税务部门为准。</view>
    </view>
  </view>
</template>

<script>
import { todayText } from '@/utils/format';

const TAB_PAGES = ['/pages/home/index', '/pages/idphoto/index', '/pages/tax/index', '/pages/mine/index'];

export default {
  data() {
    return { today: todayText() };
  },
  methods: {
    go(url) {
      const path = url.split('?')[0];
      if (TAB_PAGES.includes(path)) {
        uni.switchTab({ url: path });
        return;
      }
      uni.navigateTo({ url });
    }
  }
};
</script>

<style scoped lang="scss">
.home {
  padding-top: 20rpx;
}

.hero {
  position: relative;
  overflow: hidden;
  border-radius: 32rpx;
  padding: 34rpx 32rpx 38rpx;
  color: #fff;
  background: linear-gradient(135deg, #5c7efc 0%, #7b9bff 55%, #9fb6ff 100%);
  box-shadow: 0 18rpx 40rpx rgba(92, 126, 252, 0.28);
}

.hero::after {
  content: '';
  position: absolute;
  right: -80rpx;
  bottom: -120rpx;
  width: 320rpx;
  height: 320rpx;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.14);
}

.hero-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 1;
}

.hero-badge {
  font-size: 20rpx;
  letter-spacing: 4rpx;
  opacity: 0.9;
}

.hero-date {
  font-size: 22rpx;
  opacity: 0.82;
}

.hero-title {
  position: relative;
  z-index: 1;
  margin-top: 24rpx;
  font-size: 52rpx;
  font-weight: 800;
  letter-spacing: 2rpx;
}

.hero-sub {
  position: relative;
  z-index: 1;
  margin-top: 10rpx;
  font-size: 26rpx;
  opacity: 0.9;
}

.hero-tags {
  position: relative;
  z-index: 1;
  display: flex;
  gap: 12rpx;
  margin-top: 26rpx;
}

.hero-tag {
  padding: 8rpx 18rpx;
  border-radius: 999rpx;
  font-size: 21rpx;
  background: rgba(255, 255, 255, 0.2);
}

.feature-list {
  margin-top: 26rpx;
}

.feature-card {
  display: flex;
  align-items: center;
  padding: 28rpx;
  margin-bottom: 18rpx;
  border-radius: 26rpx;
  background: #fff;
  box-shadow: 0 8rpx 28rpx rgba(31, 36, 48, 0.06);
}

.feature-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 92rpx;
  height: 92rpx;
  border-radius: 26rpx;
  font-size: 38rpx;
  font-weight: 800;
  color: #fff;
}

.photo-card .feature-icon {
  background: linear-gradient(135deg, #5c7efc, #8fa8ff);
}

.tax-card .feature-icon {
  background: linear-gradient(135deg, #f59e0b, #fbbf24);
}

.feature-main {
  flex: 1;
  margin-left: 22rpx;
}

.feature-name {
  font-size: 32rpx;
  font-weight: 700;
}

.feature-desc {
  margin-top: 8rpx;
  font-size: 23rpx;
  color: #8a90a2;
}

.feature-arrow {
  font-size: 44rpx;
  color: #c3c8d6;
  line-height: 1;
}

.section-more {
  font-size: 23rpx;
  font-weight: 400;
  color: #5c7efc;
}

.tool-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14rpx;
}

.tool-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24rpx 8rpx 20rpx;
  border-radius: 22rpx;
  background: #fff;
  box-shadow: 0 6rpx 20rpx rgba(31, 36, 48, 0.05);
}

.tool-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 68rpx;
  height: 68rpx;
  border-radius: 20rpx;
  font-size: 24rpx;
  font-weight: 800;
  color: #fff;
}

.tool-icon.blue {
  background: #5c7efc;
}

.tool-icon.green {
  background: #22c55e;
}

.tool-icon.orange {
  background: #f59e0b;
}

.tool-icon.purple {
  background: #8b5cf6;
}

.tool-name {
  margin-top: 12rpx;
  font-size: 22rpx;
  color: #4b5265;
}

.tip-card {
  margin-top: 30rpx;
  background: linear-gradient(180deg, #ffffff 0%, #f8faff 100%);
}

.tip-title {
  font-size: 27rpx;
  font-weight: 700;
  margin-bottom: 12rpx;
}

.tip-line {
  font-size: 23rpx;
  line-height: 1.7;
  color: #6b7284;
}
</style>
