<template>
  <view class="page">
    <view class="intro card">
      <view class="intro-title">证件照制作</view>
      <view class="intro-sub">选择规格，上传照片，换底色、调尺寸，一键保存</view>
      <view class="intro-tags">
        <text class="pill">一寸 / 二寸</text>
        <text class="pill">证件 / 考试</text>
        <text class="pill">自定义尺寸</text>
      </view>
    </view>

    <view class="search-box">
      <text class="search-icon">⌕</text>
      <input
        v-model="keyword"
        class="search-input"
        placeholder="搜索规格名称，如：一寸、学信网"
        placeholder-class="search-placeholder"
        confirm-type="search"
      />
      <text v-if="keyword" class="search-clear" @tap="keyword = ''">×</text>
    </view>

    <scroll-view class="category-scroll" scroll-x :show-scrollbar="false">
      <view class="category-row">
        <view
          v-for="item in categories"
          :key="item"
          class="category-chip"
          :class="{ active: category === item }"
          @tap="category = item"
        >
          {{ item }}
        </view>
      </view>
    </scroll-view>

    <view class="spec-grid">
      <view
        v-for="spec in filteredSpecs"
        :key="spec.id"
        class="spec-card"
        :class="{ hot: spec.hot }"
        @tap="openSpec(spec)"
      >
        <view class="spec-top">
          <text class="spec-name">{{ spec.name }}</text>
          <text v-if="spec.hot" class="spec-hot">热门</text>
        </view>
        <view class="spec-size">{{ spec.id === 'custom' ? '自定义像素 / 毫米' : `${spec.px[0]}×${spec.px[1]} px` }}</view>
        <view class="spec-mm">{{ spec.id === 'custom' ? '宽高比 1:1 ~ 1:2' : `${spec.mm[0]}×${spec.mm[1]} mm` }}</view>
      </view>
    </view>

    <view v-if="!filteredSpecs.length" class="empty">
      <text class="empty-icon">⌕</text>
      <text class="empty-text">没有找到相关规格</text>
    </view>

    <view class="section-title"><text>常用工具</text></view>
    <view class="tool-list">
      <view class="tool-row" @tap="openTool('/pages/idphoto/change-size')">
        <view class="tool-badge blue">KB</view>
        <view class="tool-main">
          <view class="tool-name">修改 KB</view>
          <view class="tool-desc">压缩到指定大小，适配报名系统</view>
        </view>
        <text class="tool-arrow">›</text>
      </view>
      <view class="tool-row" @tap="openTool('/pages/idphoto/change-bg')">
        <view class="tool-badge green">底</view>
        <view class="tool-main">
          <view class="tool-name">换底色</view>
          <view class="tool-desc">蓝底 / 红底 / 白底，一键替换</view>
        </view>
        <text class="tool-arrow">›</text>
      </view>
      <view class="tool-row" @tap="openSpec({ id: 'custom' })">
        <view class="tool-badge orange">尺</view>
        <view class="tool-main">
          <view class="tool-name">自定义尺寸</view>
          <view class="tool-desc">按像素或毫米设置宽高</view>
        </view>
        <text class="tool-arrow">›</text>
      </view>
    </view>
  </view>
</template>

<script>
import { SPECS, SPEC_CATEGORIES } from '@/data/specs';

export default {
  data() {
    return {
      keyword: '',
      category: '全部',
      categories: SPEC_CATEGORIES
    };
  },
  computed: {
    filteredSpecs() {
      const key = this.keyword.trim();
      return SPECS.filter((spec) => {
        const categoryOk = this.category === '全部' || spec.category === this.category;
        const keywordOk =
          !key ||
          spec.name.includes(key) ||
          spec.px.join('x').includes(key) ||
          spec.mm.join('x').includes(key);
        return categoryOk && keywordOk;
      });
    }
  },
  methods: {
    openSpec(spec) {
      uni.navigateTo({ url: `/pages/idphoto/edit?specId=${spec.id}` });
    },
    openTool(url) {
      uni.navigateTo({ url });
    }
  }
};
</script>

<style scoped lang="scss">
.intro {
  background: linear-gradient(135deg, #ffffff 0%, #f3f6ff 100%);
}

.intro-title {
  font-size: 38rpx;
  font-weight: 800;
}

.intro-sub {
  margin-top: 10rpx;
  font-size: 24rpx;
  line-height: 1.6;
  color: #6b7284;
}

.intro-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10rpx;
  margin-top: 20rpx;
}

.search-box {
  display: flex;
  align-items: center;
  height: 84rpx;
  margin-top: 22rpx;
  padding: 0 24rpx;
  border-radius: 42rpx;
  background: #fff;
  box-shadow: 0 6rpx 20rpx rgba(31, 36, 48, 0.05);
}

.search-icon {
  font-size: 34rpx;
  color: #aeb4c4;
  margin-right: 12rpx;
}

.search-input {
  flex: 1;
  font-size: 26rpx;
  color: #1f2430;
}

.search-placeholder {
  color: #b0b5c3;
}

.search-clear {
  font-size: 34rpx;
  color: #b0b5c3;
  padding-left: 12rpx;
}

.category-scroll {
  margin-top: 20rpx;
  white-space: nowrap;
}

.category-row {
  display: inline-flex;
  gap: 14rpx;
  padding: 2rpx 0 6rpx;
}

.category-chip {
  padding: 12rpx 26rpx;
  border-radius: 999rpx;
  font-size: 24rpx;
  color: #5b6274;
  background: #fff;
  border: 1rpx solid #e8ebf3;
}

.category-chip.active {
  color: #fff;
  background: #5c7efc;
  border-color: #5c7efc;
  box-shadow: 0 6rpx 16rpx rgba(92, 126, 252, 0.25);
}

.spec-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16rpx;
  margin-top: 22rpx;
}

.spec-card {
  position: relative;
  padding: 24rpx 22rpx;
  border-radius: 22rpx;
  background: #fff;
  border: 1rpx solid #edf0f7;
  box-shadow: 0 6rpx 18rpx rgba(31, 36, 48, 0.04);
}

.spec-card.hot {
  border-color: #dfe6ff;
  background: linear-gradient(180deg, #ffffff 0%, #f7f9ff 100%);
}

.spec-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.spec-name {
  font-size: 29rpx;
  font-weight: 700;
}

.spec-hot {
  padding: 4rpx 10rpx;
  border-radius: 8rpx;
  font-size: 18rpx;
  color: #5c7efc;
  background: #eef2ff;
}

.spec-size {
  margin-top: 14rpx;
  font-size: 23rpx;
  color: #4b5265;
}

.spec-mm {
  margin-top: 6rpx;
  font-size: 21rpx;
  color: #a0a6b6;
}

.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 70rpx 0;
  color: #a0a6b6;
}

.empty-icon {
  font-size: 60rpx;
}

.empty-text {
  margin-top: 14rpx;
  font-size: 24rpx;
}

.tool-list {
  background: #fff;
  border-radius: 24rpx;
  overflow: hidden;
}

.tool-row {
  display: flex;
  align-items: center;
  padding: 24rpx 26rpx;
  border-bottom: 1rpx solid #f0f2f8;
}

.tool-row:last-child {
  border-bottom: 0;
}

.tool-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72rpx;
  height: 72rpx;
  border-radius: 20rpx;
  font-size: 24rpx;
  font-weight: 800;
  color: #fff;
}

.tool-badge.blue {
  background: #5c7efc;
}

.tool-badge.green {
  background: #22c55e;
}

.tool-badge.orange {
  background: #f59e0b;
}

.tool-main {
  flex: 1;
  margin-left: 20rpx;
}

.tool-name {
  font-size: 28rpx;
  font-weight: 600;
}

.tool-desc {
  margin-top: 6rpx;
  font-size: 22rpx;
  color: #8a90a2;
}

.tool-arrow {
  font-size: 40rpx;
  color: #c3c8d6;
}
</style>
