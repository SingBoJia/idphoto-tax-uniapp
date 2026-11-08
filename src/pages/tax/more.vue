<template>
  <view class="page">
    <view class="card intro">
      <view class="intro-title">更多税种</view>
      <view class="intro-sub">选择税目后填写收入信息，按现行税率表计算。</view>
    </view>

    <view class="type-list">
      <view v-for="item in types" :key="item.type" class="type-row" @tap="open(item)">
        <view class="type-icon" :style="{ background: item.color }">{{ item.icon }}</view>
        <view class="type-main">
          <view class="type-name">{{ item.name }}</view>
          <view class="type-desc">{{ item.desc }}</view>
        </view>
        <text class="type-arrow">›</text>
      </view>
    </view>

    <view class="note">税率与计算口径来自现行个人所得税法，结果仅供参考。</view>
  </view>
</template>

<script>
import { TAX_TYPES } from '@/data/taxTypes';

export default {
  data() {
    return {
      types: TAX_TYPES.filter((item) => !['/geshui/', '/nzj/', '/lwbc/'].includes(item.type))
    };
  },
  methods: {
    open(item) {
      uni.navigateTo({ url: `/pages/tax/generic?type=${item.type}` });
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
  font-size: 23rpx;
  line-height: 1.6;
  color: #6b7284;
}

.type-list {
  margin-top: 18rpx;
  background: #fff;
  border-radius: 24rpx;
  overflow: hidden;
  box-shadow: 0 8rpx 24rpx rgba(31, 36, 48, 0.05);
}

.type-row {
  display: flex;
  align-items: center;
  padding: 22rpx 24rpx;
  border-bottom: 1rpx solid #f2f4f9;
}

.type-row:last-child {
  border-bottom: 0;
}

.type-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 68rpx;
  height: 68rpx;
  border-radius: 20rpx;
  color: #fff;
  font-size: 26rpx;
  font-weight: 800;
}

.type-main {
  flex: 1;
  margin-left: 18rpx;
}

.type-name {
  font-size: 27rpx;
  font-weight: 600;
}

.type-desc {
  margin-top: 6rpx;
  font-size: 21rpx;
  color: #8a90a2;
}

.type-arrow {
  font-size: 38rpx;
  color: #c3c8d6;
}

.note {
  margin-top: 20rpx;
  font-size: 21rpx;
  line-height: 1.7;
  color: #a0a6b6;
}
</style>
