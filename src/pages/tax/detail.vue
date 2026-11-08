<template>
  <view class="page">
    <template v-if="rows.length">
      <view class="card head-card">
        <view class="head-title">{{ title }}</view>
        <view class="head-sub">共 {{ rows.length }} 个月 · 左右滑动查看完整表格</view>
      </view>
      <scroll-view class="table-scroll" scroll-x>
        <view class="table">
          <view class="tr th">
            <text class="td w1">月份</text>
            <text class="td w2">税前</text>
            <text class="td w2">五险一金</text>
            <text class="td w2">专项附加</text>
            <text class="td w2">应纳税所得</text>
            <text class="td w1">税率</text>
            <text class="td w2">速算扣除</text>
            <text class="td w2">当月个税</text>
            <text class="td w2">税后</text>
          </view>
          <view v-for="row in rows" :key="row.month" class="tr">
            <text class="td w1">{{ row.month }}</text>
            <text class="td w2">{{ money(row.preTaxSalary) }}</text>
            <text class="td w2">{{ money(row.insurance) }}</text>
            <text class="td w2">{{ money(row.specialDeduction) }}</text>
            <text class="td w2">{{ money(row.taxableIncome) }}</text>
            <text class="td w1">{{ percent(row.taxRate) }}</text>
            <text class="td w2">{{ money(row.quickDeduction) }}</text>
            <text class="td w2 strong">{{ money(row.currentMonthTax) }}</text>
            <text class="td w2">{{ money(row.netSalary) }}</text>
          </view>
        </view>
      </scroll-view>
      <view class="note">累计预扣法下，税率可能随累计所得跨档，因此每月个税不完全相同。</view>
    </template>

    <view v-else class="empty">
      <view class="empty-icon">月</view>
      <view class="empty-text">当前结果没有每月明细</view>
      <view class="btn btn-primary empty-btn" @tap="back">返回</view>
    </view>
  </view>
</template>

<script>
import { money, percent } from '@/utils/format';

export default {
  data() {
    return { title: '每月收入明细', rows: [] };
  },
  onLoad() {
    const payload = uni.getStorageSync('tax:lastResult');
    if (payload) {
      this.title = payload.title || '每月收入明细';
      this.rows = (payload.result && payload.result.monthlyDetails) || [];
    }
  },
  methods: {
    money,
    percent,
    back() {
      uni.navigateBack({ delta: 1 });
    }
  }
};
</script>

<style scoped lang="scss">
.head-card {
  background: linear-gradient(135deg, #ffffff 0%, #f3f6ff 100%);
}

.head-title {
  font-size: 32rpx;
  font-weight: 700;
}

.head-sub {
  margin-top: 8rpx;
  font-size: 22rpx;
  color: #8a90a2;
}

.table-scroll {
  margin-top: 18rpx;
  background: #fff;
  border-radius: 20rpx;
  box-shadow: 0 8rpx 24rpx rgba(31, 36, 48, 0.05);
}

.table {
  min-width: 1500rpx;
}

.tr {
  display: flex;
  align-items: center;
  min-height: 76rpx;
  border-bottom: 1rpx solid #f3f5fa;
}

.tr:last-child {
  border-bottom: 0;
}

.th {
  background: #f8faff;
  color: #6b7284;
  font-weight: 600;
}

.td {
  padding: 0 12rpx;
  font-size: 21rpx;
  color: #4b5265;
  text-align: right;
}

.td:first-child {
  text-align: center;
}

.w1 {
  width: 90rpx;
}

.w2 {
  width: 170rpx;
}

.td.strong {
  color: #5c7efc;
  font-weight: 700;
}

.note {
  margin-top: 18rpx;
  font-size: 21rpx;
  line-height: 1.6;
  color: #a0a6b6;
}

.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 140rpx;
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
