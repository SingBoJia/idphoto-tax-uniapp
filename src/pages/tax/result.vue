<template>
  <view class="page">
    <template v-if="payload">
      <view class="hero">
        <view class="hero-label">{{ payload.title }}</view>
        <view class="hero-tax">
          <text class="hero-currency">¥</text>
          <text class="hero-amount">{{ money(tax) }}</text>
        </view>
        <view class="hero-caption">应纳税额</view>
        <view class="hero-stats">
          <view class="hero-stat">
            <text class="stat-label">{{ preTaxLabel }}</text>
            <text class="stat-value">{{ money(preTax) }}</text>
          </view>
          <view class="hero-stat">
            <text class="stat-label">{{ netLabel }}</text>
            <text class="stat-value">{{ money(net) }}</text>
          </view>
        </view>
      </view>

      <view class="section-title"><text>计算明细</text></view>
      <view class="card info-card">
        <view class="info-row">
          <text class="info-label">{{ taxableLabel }}</text>
          <text class="info-value">{{ money(taxable) }}</text>
        </view>
        <view class="divider" />
        <view class="info-row">
          <text class="info-label">适用税率</text>
          <text class="info-value">{{ percent(rate) }}</text>
        </view>
        <view class="divider" />
        <view class="info-row">
          <text class="info-label">速算扣除数</text>
          <text class="info-value">{{ money(quick) }}</text>
        </view>
        <template v-if="result.annualTax !== undefined">
          <view class="divider" />
          <view class="info-row">
            <text class="info-label">年度个税</text>
            <text class="info-value">{{ money(result.annualTax) }}</text>
          </view>
          <view class="divider" />
          <view class="info-row">
            <text class="info-label">年度税后收入</text>
            <text class="info-value">{{ money(result.annualNetSalary) }}</text>
          </view>
        </template>
      </view>

      <template v-if="monthlyDetails.length">
        <view class="section-title">
          <text>每月明细</text>
          <text class="section-link" @tap="openDetail">查看全部 ›</text>
        </view>
        <view class="card month-card">
          <view v-for="row in monthlyPreview" :key="row.month" class="month-row">
            <text class="month-label">{{ row.month }} 月</text>
            <text class="month-value">税前 {{ money(row.preTaxSalary) }}</text>
            <text class="month-tax">个税 {{ money(row.currentMonthTax) }}</text>
          </view>
        </view>
      </template>

      <view class="section-title"><text>计算说明</text></view>
      <view class="card formula-card">
        <view v-if="formulaText" class="formula-line">{{ formulaText }}</view>
        <view v-for="(tip, index) in tips" :key="index" class="tip-line">{{ tip }}</view>
        <view v-if="!formulaText && !tips.length" class="tip-line">按现行个税法规定计算。</view>
      </view>

      <template v-if="brackets.length">
        <view class="section-title"><text>税率表</text></view>
        <view class="card bracket-card">
          <view class="bracket-head">
            <text class="bracket-range">级距</text>
            <text class="bracket-rate">税率</text>
            <text class="bracket-quick">速算扣除</text>
          </view>
          <view v-for="item in brackets" :key="item.level" class="bracket-row">
            <text class="bracket-range">{{ item.range }}</text>
            <text class="bracket-rate">{{ percent(item.rate) }}</text>
            <text class="bracket-quick">{{ item.quick }}</text>
          </view>
        </view>
      </template>

      <view class="action-stack">
        <view class="btn btn-primary" @tap="again">重新计算</view>
      </view>

      <view class="disclaimer">结果仅供参考，最终以税务部门口径为准。</view>
    </template>

    <view v-else class="empty">
      <view class="empty-icon">税</view>
      <view class="empty-text">暂无计算结果</view>
      <view class="btn btn-primary empty-btn" @tap="again">去计算</view>
    </view>
  </view>
</template>

<script>
import { taxService } from '@/tax';
import { money, percent } from '@/utils/format';

export default {
  data() {
    return { payload: null };
  },
  computed: {
    result() {
      return (this.payload && this.payload.result) || {};
    },
    params() {
      return (this.payload && this.payload.params) || {};
    },
    preTax() {
      const r = this.result;
      return r.preTaxSalary ?? r.preTaxBonus ?? r.preTaxIncome ?? r.preTax ?? this.params.inputSalary ?? 0;
    },
    tax() {
      const r = this.result;
      return r.tax ?? r.annualTax ?? 0;
    },
    net() {
      const r = this.result;
      return r.netSalary ?? r.netIncome ?? r.annualNetSalary ?? 0;
    },
    taxable() {
      const r = this.result;
      return r.taxableIncome ?? r.taxableBonus ?? 0;
    },
    rate() {
      return this.result.taxRate;
    },
    quick() {
      return this.result.quickDeduction;
    },
    monthlyDetails() {
      return Array.isArray(this.result.monthlyDetails) ? this.result.monthlyDetails : [];
    },
    monthlyPreview() {
      return this.monthlyDetails.slice(-3).reverse();
    },
    isMonthly() {
      return this.result.calculateType === 'monthly' && Number(this.result.month) > 1;
    },
    preTaxLabel() {
      return this.isMonthly ? '本月税前收入' : '税前收入';
    },
    netLabel() {
      return this.isMonthly ? '本月税后收入' : '税后收入';
    },
    taxableLabel() {
      return this.isMonthly ? '累计应纳税所得额' : '应纳税所得额';
    },
    formulaMeta() {
      if (!this.payload) return null;
      const period =
        this.payload.taxType === '/geshui/' && this.result.calculateType === 'annual'
          ? 'annual'
          : this.payload.taxType === '/geshui/'
            ? 'monthly'
            : 'annual';
      try {
        return taxService.getFormula(this.payload.taxType, period, {
          ...this.params,
          preTaxIncome: this.preTax
        });
      } catch (err) {
        return null;
      }
    },
    formulaText() {
      if (this.formulaMeta && Array.isArray(this.formulaMeta.formula)) {
        return this.formulaMeta.formula
          .map((item) => `${item.unit || ''}${item.content || ''}`)
          .join('');
      }
      const formula = (this.formulaMeta && this.formulaMeta.formula) || this.result.formula;
      if (!Array.isArray(formula) || !formula.length) return '';
      return formula
        .map((item) => {
          if (typeof item === 'number') return money(item);
          if (item && typeof item === 'object') return `${item.unit || ''}${item.content || ''}`;
          return String(item);
        })
        .join(' ');
    },
    tips() {
      return (this.formulaMeta && this.formulaMeta.tipsList) || [];
    },
    brackets() {
      if (!this.payload) return [];
      try {
        return taxService.getTaxBrackets(
          this.payload.taxType,
          this.params.taxpayerType || 'resident'
        );
      } catch (err) {
        return [];
      }
    }
  },
  onShow() {
    this.payload = uni.getStorageSync('tax:lastResult') || null;
  },
  methods: {
    money,
    percent,
    openDetail() {
      uni.navigateTo({ url: '/pages/tax/detail' });
    },
    again() {
      uni.navigateBack({ delta: 1 });
    }
  }
};
</script>

<style scoped lang="scss">
.hero {
  padding: 32rpx 30rpx 30rpx;
  border-radius: 30rpx;
  color: #fff;
  background: linear-gradient(135deg, #5c7efc 0%, #7b9bff 60%, #a8bcff 100%);
  box-shadow: 0 16rpx 36rpx rgba(92, 126, 252, 0.26);
}

.hero-label {
  font-size: 24rpx;
  opacity: 0.9;
}

.hero-tax {
  display: flex;
  align-items: baseline;
  margin-top: 12rpx;
}

.hero-currency {
  font-size: 32rpx;
  margin-right: 4rpx;
}

.hero-amount {
  font-size: 68rpx;
  font-weight: 800;
  letter-spacing: 1rpx;
}

.hero-caption {
  margin-top: 4rpx;
  font-size: 22rpx;
  opacity: 0.8;
}

.hero-stats {
  display: flex;
  gap: 16rpx;
  margin-top: 26rpx;
}

.hero-stat {
  flex: 1;
  padding: 18rpx 20rpx;
  border-radius: 18rpx;
  background: rgba(255, 255, 255, 0.16);
}

.stat-label {
  display: block;
  font-size: 21rpx;
  opacity: 0.82;
}

.stat-value {
  display: block;
  margin-top: 6rpx;
  font-size: 30rpx;
  font-weight: 700;
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
  font-size: 27rpx;
  font-weight: 600;
  color: #333a4d;
}

.section-link {
  font-size: 23rpx;
  font-weight: 400;
  color: #5c7efc;
}

.month-card {
  padding: 8rpx 26rpx;
}

.month-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 76rpx;
  border-bottom: 1rpx solid #f3f5fa;
}

.month-row:last-child {
  border-bottom: 0;
}

.month-label {
  width: 90rpx;
  font-size: 24rpx;
  font-weight: 600;
}

.month-value {
  flex: 1;
  font-size: 22rpx;
  color: #6b7284;
}

.month-tax {
  font-size: 22rpx;
  color: #5c7efc;
}

.formula-card {
  background: #f8faff;
}

.formula-line {
  padding: 16rpx 18rpx;
  border-radius: 14rpx;
  background: #fff;
  font-size: 23rpx;
  line-height: 1.6;
  color: #3f5fe0;
}

.tip-line {
  margin-top: 12rpx;
  font-size: 22rpx;
  line-height: 1.75;
  color: #6b7284;
}

.bracket-card {
  padding: 0 22rpx;
}

.bracket-head,
.bracket-row {
  display: flex;
  align-items: center;
  min-height: 68rpx;
  font-size: 21rpx;
}

.bracket-head {
  color: #8a90a2;
  font-weight: 600;
  border-bottom: 1rpx solid #f0f2f8;
}

.bracket-row {
  color: #4b5265;
  border-bottom: 1rpx solid #f7f8fc;
}

.bracket-row:last-child {
  border-bottom: 0;
}

.bracket-range {
  flex: 1;
}

.bracket-rate {
  width: 110rpx;
  text-align: right;
}

.bracket-quick {
  width: 130rpx;
  text-align: right;
}

.action-stack {
  margin-top: 30rpx;
}

.disclaimer {
  margin-top: 20rpx;
  text-align: center;
  font-size: 21rpx;
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
