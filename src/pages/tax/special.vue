<template>
  <view class="page">
    <view class="card intro">
      <view class="intro-title">专项附加扣除</view>
      <view class="intro-sub">按月度可扣除金额估算，实际以个税 APP 的专项附加扣除信息为准。</view>
    </view>

    <view class="card form-card">
      <view v-for="item in items" :key="item.key" class="item-row">
        <view class="item-main">
          <view class="item-name">{{ item.name }}</view>
          <view class="item-desc">{{ item.desc }}</view>
        </view>
        <view class="item-input-wrap">
          <input v-model="item.value" class="item-input" type="digit" placeholder="0" />
          <text class="item-unit">元/月</text>
        </view>
      </view>
    </view>

    <view class="card total-card">
      <view class="total-label">每月合计扣除</view>
      <view class="total-value">¥ {{ money(total) }}</view>
      <view class="total-tip">保存后会带回工资个税表单的“专项附加扣除”。</view>
    </view>

    <view class="btn btn-primary" @tap="save">保存并使用</view>
    <view class="btn btn-light" @tap="reset">重置</view>

    <view class="note">
      提示：子女教育、3 岁以下婴幼儿照护按每个子女 2000 元/月；住房贷款利息 1000 元/月；住房租金按城市 1500/1100/800 元/月（与房贷利息二选一）；继续教育学历 400 元/月、职业资格 3600 元/年；赡养老人独生子女 3000 元/月。大病医疗通常在年度汇算时扣除。
    </view>
  </view>
</template>

<script>
import { money } from '@/utils/format';

// max: 单项每月上限（元），null 表示按人数累加不设上限
const DEFAULTS = [
  { key: 'child', name: '子女教育', desc: '每个子女 2000 元/月，父母可各扣 50%', value: '0', max: null },
  { key: 'baby', name: '3 岁以下婴幼儿照护', desc: '每个婴幼儿 2000 元/月，父母可各扣 50%', value: '0', max: null },
  {
    key: 'education',
    name: '继续教育',
    desc: '学历教育 400 元/月；职业资格证书取证当年 3600 元（约 300 元/月）',
    value: '0',
    max: 700
  },
  { key: 'loan', name: '住房贷款利息', desc: '首套房贷 1000 元/月，与住房租金二选一', value: '0', max: 1000 },
  { key: 'rent', name: '住房租金', desc: '按城市 1500 / 1100 / 800 元/月，与房贷利息二选一', value: '0', max: 1500 },
  { key: 'elder', name: '赡养老人', desc: '独生子女 3000 元/月；非独生子女分摊，每人不超过 1500', value: '0', max: 3000 },
  {
    key: 'medical',
    name: '大病医疗',
    desc: '年度汇算扣除，每年最高 80000 元，月度一般填 0',
    value: '0',
    max: Math.floor(80000 / 12)
  },
  { key: 'pension', name: '个人养老金', desc: '每年最高 12000 元，约 1000 元/月', value: '0', max: 1000 }
];

export default {
  data() {
    return { items: DEFAULTS.map((item) => ({ ...item })) };
  },
  computed: {
    total() {
      return this.items.reduce((sum, item) => sum + (Number(item.value) || 0), 0);
    }
  },
  onLoad() {
    const saved = uni.getStorageSync('specialDeductionDetail');
    if (saved && Array.isArray(saved.items)) {
      this.items = this.items.map((item) => {
        const old = saved.items.find((x) => x.key === item.key);
        return old ? { ...item, value: old.value } : item;
      });
    }
  },
  methods: {
    money,
    validate() {
      for (const item of this.items) {
        const raw = String(item.value ?? '').trim();
        if (raw === '') continue;
        const n = Number(raw);
        if (!Number.isFinite(n) || n < 0) return `${item.name}金额不正确`;
        if (item.max !== null && n > item.max) return `${item.name}每月最多 ${item.max} 元`;
      }
      const get = (key) => Number((this.items.find((x) => x.key === key) || {}).value) || 0;
      if (get('loan') > 0 && get('rent') > 0) return '住房贷款利息与住房租金只能选择其中一项';
      return '';
    },
    save() {
      const error = this.validate();
      if (error) {
        uni.showModal({ title: '请检查填写', content: error, showCancel: false });
        return;
      }
      const total = Math.round(this.total * 100) / 100;
      uni.setStorageSync('specialDeduction', total);
      uni.setStorageSync('specialDeductionDetail', {
        items: this.items.map((item) => ({ key: item.key, value: String(item.value ?? '').trim() || '0' })),
        savedAt: Date.now()
      });
      uni.showToast({ title: `已保存 ¥${total}/月`, icon: 'none' });
      setTimeout(() => uni.navigateBack({ delta: 1 }), 600);
    },
    reset() {
      this.items = DEFAULTS.map((item) => ({ ...item }));
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

.form-card {
  margin-top: 18rpx;
  padding: 0 26rpx;
}

.item-row {
  display: flex;
  align-items: center;
  padding: 22rpx 0;
  border-bottom: 1rpx solid #f2f4f9;
}

.item-row:last-child {
  border-bottom: 0;
}

.item-main {
  flex: 1;
  padding-right: 16rpx;
}

.item-name {
  font-size: 27rpx;
  font-weight: 600;
}

.item-desc {
  margin-top: 6rpx;
  font-size: 20rpx;
  color: #a0a6b6;
}

.item-input-wrap {
  display: flex;
  align-items: center;
  width: 210rpx;
  height: 72rpx;
  padding: 0 14rpx;
  border-radius: 14rpx;
  background: #f5f7fc;
}

.item-input {
  flex: 1;
  font-size: 26rpx;
  text-align: right;
}

.item-unit {
  margin-left: 6rpx;
  font-size: 20rpx;
  color: #a0a6b6;
}

.total-card {
  margin-top: 18rpx;
  text-align: center;
  background: linear-gradient(135deg, #ffffff 0%, #f3f6ff 100%);
}

.total-label {
  font-size: 24rpx;
  color: #6b7284;
}

.total-value {
  margin-top: 8rpx;
  font-size: 52rpx;
  font-weight: 800;
  color: #5c7efc;
}

.total-tip {
  margin-top: 8rpx;
  font-size: 21rpx;
  color: #a0a6b6;
}

.btn-primary {
  margin-top: 26rpx;
}

.btn-light {
  margin-top: 14rpx;
}

.note {
  margin-top: 20rpx;
  font-size: 21rpx;
  line-height: 1.7;
  color: #a0a6b6;
}
</style>
