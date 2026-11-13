<template>
  <view class="page">
    <view class="hero">
      <view class="hero-title">个税计算器</view>
      <view class="hero-sub">按累计预扣法本地计算 · 结果仅供参考</view>
      <view class="hero-tags">
        <text class="hero-tag">工资</text>
        <text class="hero-tag">年终奖</text>
        <text class="hero-tag">劳务报酬</text>
        <text class="hero-tag">12 类税目</text>
      </view>
    </view>

    <view class="tabs">
      <view
        v-for="(item, index) in tabs"
        :key="item"
        class="tab"
        :class="{ active: tab === index }"
        @tap="tab = index"
      >
        {{ item }}
      </view>
    </view>

    <template v-if="tab === 0">
      <view class="card form-card">
        <view class="seg">
          <view
            class="seg-item"
            :class="{ active: salary.type === 'monthly' }"
            @tap="setSalaryType('monthly')"
          >
            月度工资
          </view>
          <view
            class="seg-item"
            :class="{ active: salary.type === 'annual' }"
            @tap="setSalaryType('annual')"
          >
            年度工资
          </view>
        </view>

        <view v-if="salary.type === 'monthly'" class="field">
          <text class="field-label">缴纳期数</text>
          <picker
            mode="selector"
            :range="monthLabels"
            :value="salary.month - 1"
            @change="onMonthChange"
          >
            <view class="picker-value">{{ salary.month }} 月</view>
          </picker>
        </view>

        <view class="field">
          <text class="field-label">{{ salary.type === 'monthly' ? '本月工资收入' : '税前月平均工资' }}</text>
          <view class="input-wrap">
            <input v-model="salary.income" class="field-input" type="digit" placeholder="0.00" />
            <text class="unit">元</text>
          </view>
        </view>

        <view class="field">
          <text class="field-label">五险一金</text>
          <view class="input-wrap">
            <input v-model="salary.insurance" class="field-input" type="digit" placeholder="0.00" />
            <text class="unit">元/月</text>
          </view>
        </view>

        <view class="field">
          <text class="field-label">专项附加扣除</text>
          <view class="input-wrap">
            <input v-model="salary.special" class="field-input" type="digit" placeholder="0.00" />
            <text class="unit">元/月</text>
          </view>
          <text class="field-link" @tap="goSpecial">去计算专项扣除 ›</text>
        </view>

        <view class="btn btn-primary" @tap="calcSalary">计算工资个税</view>
      </view>

      <view class="card mini-note">
        <view class="mini-title">累计预扣法</view>
        <view class="mini-line">应纳税所得额 = 累计收入 − 累计五险一金 − 累计专项附加扣除 − 累计减除费用（5000 元/月）。</view>
      </view>
    </template>

    <template v-if="tab === 1">
      <view class="card form-card">
        <view class="seg">
          <view class="seg-item" :class="{ active: bonus.mode === 0 }" @tap="bonus.mode = 0">正推税后</view>
          <view class="seg-item" :class="{ active: bonus.mode === 1 }" @tap="bonus.mode = 1">反推税前</view>
        </view>
        <view class="field">
          <text class="field-label">{{ bonus.mode === 0 ? '应发年终奖' : '税后所得' }}</text>
          <view class="input-wrap">
            <input v-model="bonus.income" class="field-input" type="digit" placeholder="0.00" />
            <text class="unit">元</text>
          </view>
        </view>
        <view class="btn btn-primary" @tap="calcBonus">计算年终奖个税</view>
      </view>
      <view class="card mini-note">
        <view class="mini-title">单独计税</view>
        <view class="mini-line">全年一次性奖金除以 12 个月确定税率与速算扣除数，单独计算纳税。</view>
      </view>
    </template>

    <template v-if="tab === 2">
      <view class="card form-card">
        <view class="seg">
          <view class="seg-item" :class="{ active: labor.mode === 0 }" @tap="labor.mode = 0">正推税后</view>
          <view class="seg-item" :class="{ active: labor.mode === 1 }" @tap="labor.mode = 1">反推税前</view>
        </view>
        <view class="field">
          <text class="field-label">{{ labor.mode === 0 ? '劳务报酬' : '税后所得' }}</text>
          <view class="input-wrap">
            <input v-model="labor.income" class="field-input" type="digit" placeholder="0.00" />
            <text class="unit">元</text>
          </view>
        </view>
        <view class="field">
          <text class="field-label">纳税人类型</text>
          <view class="chips">
            <view
              class="chip"
              :class="{ active: labor.taxpayerType === 'resident' }"
              @tap="labor.taxpayerType = 'resident'"
            >
              居民预扣预缴
            </view>
            <view
              class="chip"
              :class="{ active: labor.taxpayerType === 'non-resident' }"
              @tap="labor.taxpayerType = 'non-resident'"
            >
              非居民扣缴
            </view>
          </view>
        </view>
        <view class="btn btn-primary" @tap="calcLabor">计算劳务报酬个税</view>
      </view>
    </template>

    <template v-if="tab === 3">
      <view class="card more-head">
        <view class="more-title">更多税种</view>
        <view class="more-sub">稿酬、经营所得、财产租赁、偶然所得等</view>
      </view>
      <view class="type-grid">
        <view
          v-for="item in moreTypes"
          :key="item.type"
          class="type-card"
          @tap="goGeneric(item.type)"
        >
          <view class="type-icon" :style="{ background: item.color }">{{ item.icon }}</view>
          <view class="type-main">
            <view class="type-name">{{ item.name }}</view>
            <view class="type-desc">{{ item.desc }}</view>
          </view>
          <text class="type-arrow">›</text>
        </view>
      </view>
    </template>
  </view>
</template>

<script>
import { calculateTax } from '@/tax';
import { TAX_TYPES } from '@/data/taxTypes';

const number = (value) => Number(value) || 0;

export default {
  data() {
    const month = new Date().getMonth() + 1;
    return {
      tab: 0,
      tabs: ['工资个税', '年终奖', '劳务报酬', '更多'],
      monthLabels: Array.from({ length: 12 }, (_, i) => `${i + 1} 月`),
      salary: {
        type: 'monthly',
        month,
        income: '',
        insurance: '',
        special: ''
      },
      specialAppliedAt: null,
      bonus: { mode: 0, income: '' },
      labor: { mode: 0, income: '', taxpayerType: 'resident' }
    };
  },
  computed: {
    moreTypes() {
      return TAX_TYPES.filter((item) => !['/geshui/', '/nzj/', '/lwbc/'].includes(item.type));
    }
  },
  onShow() {
    // 只在首次进入或专项扣除页重新保存后带回，避免覆盖用户手动修改的值
    const special = uni.getStorageSync('specialDeduction');
    const detail = uni.getStorageSync('specialDeductionDetail');
    const savedAt = (detail && detail.savedAt) || 0;
    if (special === '' || special === null || special === undefined) return;
    if (this.specialAppliedAt === null || savedAt > this.specialAppliedAt) {
      this.salary.special = String(special);
      this.specialAppliedAt = savedAt;
    }
  },
  methods: {
    setSalaryType(type) {
      this.salary.type = type;
      if (type === 'annual') this.salary.month = 12;
      else if (this.salary.month === 12) this.salary.month = new Date().getMonth() + 1;
    },
    onMonthChange(e) {
      this.salary.month = Number(e.detail.value) + 1;
    },
    goSpecial() {
      uni.navigateTo({ url: '/pages/tax/special' });
    },
    goGeneric(type) {
      uni.navigateTo({ url: `/pages/tax/generic?type=${type}` });
    },
    validate(income, extras = {}) {
      if (number(income) <= 0) {
        uni.showToast({ title: '请输入金额', icon: 'none' });
        return false;
      }
      for (const [label, value] of Object.entries(extras)) {
        if (number(value) < 0) {
          uni.showToast({ title: `${label}不能为负数`, icon: 'none' });
          return false;
        }
      }
      return true;
    },
    openResult(title, taxType, params, result) {
      uni.setStorageSync('tax:lastResult', { title, taxType, params, result });
      uni.navigateTo({ url: '/pages/tax/result' });
    },
    calcSalary() {
      if (!this.validate(this.salary.income, { 五险一金: this.salary.insurance, 专项附加扣除: this.salary.special })) {
        return;
      }
      const params = {
        inputSalary: number(this.salary.income),
        insurance: number(this.salary.insurance),
        specialDeduction: number(this.salary.special),
        month: this.salary.type === 'annual' ? 12 : Number(this.salary.month),
        calculateType: this.salary.type
      };
      try {
        const result = calculateTax({ taxType: '/geshui/', params });
        this.openResult(this.salary.type === 'annual' ? '年度工资个税' : '工资个税', '/geshui/', params, result);
      } catch (err) {
        uni.showToast({ title: err.message || '计算失败', icon: 'none' });
      }
    },
    calcBonus() {
      if (!this.validate(this.bonus.income)) return;
      const params = { inputSalary: number(this.bonus.income), isBackward: this.bonus.mode === 1 };
      try {
        const result = calculateTax({ taxType: '/nzj/', params });
        this.openResult('年终奖个税', '/nzj/', params, result);
      } catch (err) {
        uni.showToast({ title: err.message || '计算失败', icon: 'none' });
      }
    },
    calcLabor() {
      if (!this.validate(this.labor.income)) return;
      const params = {
        inputSalary: number(this.labor.income),
        taxpayerType: this.labor.taxpayerType,
        isBackward: this.labor.mode === 1
      };
      try {
        const result = calculateTax({ taxType: '/lwbc/', params });
        this.openResult('劳务报酬个税', '/lwbc/', params, result);
      } catch (err) {
        uni.showToast({ title: err.message || '计算失败', icon: 'none' });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.hero {
  padding: 30rpx 30rpx 34rpx;
  border-radius: 30rpx;
  color: #fff;
  background: linear-gradient(135deg, #5c7efc 0%, #7b9bff 60%, #a8bcff 100%);
  box-shadow: 0 16rpx 36rpx rgba(92, 126, 252, 0.26);
}

.hero-title {
  font-size: 44rpx;
  font-weight: 800;
}

.hero-sub {
  margin-top: 10rpx;
  font-size: 23rpx;
  opacity: 0.9;
}

.hero-tags {
  display: flex;
  gap: 10rpx;
  margin-top: 22rpx;
}

.hero-tag {
  padding: 7rpx 16rpx;
  border-radius: 999rpx;
  font-size: 20rpx;
  background: rgba(255, 255, 255, 0.2);
}

.tabs {
  display: flex;
  padding: 8rpx;
  margin-top: 20rpx;
  border-radius: 20rpx;
  background: #fff;
  box-shadow: 0 6rpx 20rpx rgba(31, 36, 48, 0.05);
}

.tab {
  flex: 1;
  text-align: center;
  padding: 16rpx 0;
  border-radius: 14rpx;
  font-size: 24rpx;
  color: #6b7284;
}

.tab.active {
  color: #fff;
  font-weight: 700;
  background: #5c7efc;
}

.form-card {
  margin-top: 18rpx;
}

.seg {
  display: flex;
  padding: 6rpx;
  border-radius: 16rpx;
  background: #f4f6fb;
}

.seg-item {
  flex: 1;
  text-align: center;
  padding: 14rpx 0;
  border-radius: 12rpx;
  font-size: 24rpx;
  color: #6b7284;
}

.seg-item.active {
  color: #5c7efc;
  font-weight: 700;
  background: #fff;
  box-shadow: 0 4rpx 12rpx rgba(31, 36, 48, 0.08);
}

.field {
  margin-top: 24rpx;
}

.field-label {
  display: block;
  font-size: 24rpx;
  color: #5b6274;
  margin-bottom: 10rpx;
}

.input-wrap {
  display: flex;
  align-items: center;
  height: 84rpx;
  padding: 0 20rpx;
  border-radius: 16rpx;
  background: #f5f7fc;
}

.field-input {
  flex: 1;
  font-size: 30rpx;
  color: #1f2430;
}

.unit {
  font-size: 22rpx;
  color: #a0a6b6;
}

.picker-value {
  height: 84rpx;
  line-height: 84rpx;
  padding: 0 20rpx;
  border-radius: 16rpx;
  background: #f5f7fc;
  font-size: 28rpx;
}

.field-link {
  display: inline-block;
  margin-top: 10rpx;
  font-size: 22rpx;
  color: #5c7efc;
}

.btn-primary {
  margin-top: 30rpx;
}

.mini-note {
  margin-top: 18rpx;
  background: #f8faff;
}

.mini-title {
  font-size: 26rpx;
  font-weight: 700;
}

.mini-line {
  margin-top: 10rpx;
  font-size: 22rpx;
  line-height: 1.7;
  color: #6b7284;
}

.chips {
  display: flex;
  gap: 12rpx;
}

.chip {
  padding: 14rpx 24rpx;
  border-radius: 999rpx;
  font-size: 23rpx;
  color: #5b6274;
  background: #f5f7fc;
  border: 1rpx solid #e8ebf3;
}

.chip.active {
  color: #5c7efc;
  background: #eef2ff;
  border-color: #b9c8ff;
}

.more-head {
  margin-top: 18rpx;
}

.more-title {
  font-size: 30rpx;
  font-weight: 700;
}

.more-sub {
  margin-top: 8rpx;
  font-size: 23rpx;
  color: #8a90a2;
}

.type-grid {
  margin-top: 16rpx;
  background: #fff;
  border-radius: 24rpx;
  overflow: hidden;
  box-shadow: 0 8rpx 24rpx rgba(31, 36, 48, 0.05);
}

.type-card {
  display: flex;
  align-items: center;
  padding: 22rpx 24rpx;
  border-bottom: 1rpx solid #f0f2f8;
}

.type-card:last-child {
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
</style>
