<template>
  <view class="page">
    <template v-if="config">
      <view class="card head-card">
        <view class="head-title">{{ typeName }}</view>
        <view class="head-sub">填写收入信息后计算，金额单位为元。</view>
      </view>

      <view v-if="types.length > 1" class="seg">
        <view
          v-for="(item, index) in types"
          :key="item.name"
          class="seg-item"
          :class="{ active: activeTab === index }"
          @tap="activeTab = index"
        >
          {{ item.name }}
        </view>
      </view>

      <view class="card form-card">
        <view v-for="field in config.fields" :key="field.inputName" class="field">
          <text class="field-label">{{ labelOf(field) }}</text>

          <view v-if="field.textType === 'input'" class="input-wrap">
            <input
              v-model="values[field.inputName]"
              class="field-input"
              type="digit"
              :placeholder="placeholderOf(field)"
            />
            <text class="unit">元</text>
          </view>

          <picker
            v-else-if="field.textType === 'select'"
            mode="selector"
            :range="field.optionsValue"
            range-key="value"
            :value="selectIndex(field)"
            @change="onSelect(field, $event)"
          >
            <view class="picker-value">{{ selectLabel(field) }}</view>
          </picker>

          <view v-else-if="field.textType === 'subsection'" class="chips">
            <view
              v-for="option in field.optionsValue"
              :key="option.key"
              class="chip"
              :class="{ active: values[field.inputName] === option.key }"
              @tap="values[field.inputName] = option.key"
            >
              {{ option.value }}
            </view>
          </view>

          <template v-if="field.tips">
            <text v-if="typeof field.tips === 'string'" class="field-tip">{{ field.tips }}</text>
            <text
              v-for="(tip, index) in Array.isArray(field.tips) ? field.tips : []"
              :key="index"
              class="field-tip"
            >
              {{ tip.textTitle || tip }}
            </text>
          </template>
        </view>

        <view class="btn btn-primary" @tap="calculate">计算</view>
      </view>

      <view class="note">结果仅供参考，最终以税务部门口径为准。</view>
    </template>

    <view v-else class="empty">
      <view class="empty-icon">税</view>
      <view class="empty-text">该税种暂未配置</view>
      <view class="btn btn-primary empty-btn" @tap="back">返回</view>
    </view>
  </view>
</template>

<script>
import { taxService, taxFieldConfig } from '@/tax';
import { TAX_TYPE_NAMES } from '@/data/taxTypes';

export default {
  data() {
    return {
      type: '',
      config: null,
      types: [],
      activeTab: 0,
      values: {}
    };
  },
  computed: {
    typeName() {
      return TAX_TYPE_NAMES[this.type] || '个税计算';
    }
  },
  onLoad(options) {
    this.type = decodeURIComponent((options && options.type) || '');
    this.config = taxFieldConfig[this.type] || null;
    if (!this.config) return;
    this.types = this.config.calculateTypes || [];
    const values = {};
    this.config.fields.forEach((field) => {
      values[field.inputName] = field.inputValue;
    });
    this.values = values;
  },
  methods: {
    labelOf(field) {
      if (field.textTitle && typeof field.textTitle === 'object') {
        if (this.activeTab === 1 && field.textTitle.backward) return field.textTitle.backward;
        if (this.activeTab === 0 && field.textTitle.forward) return field.textTitle.forward;
        if (field.textTitle.monthly) return this.activeTab === 0 ? field.textTitle.monthly : field.textTitle.annual;
      }
      return field.textTitle;
    },
    placeholderOf(field) {
      if (field.placeholder && typeof field.placeholder === 'object') {
        if (this.activeTab === 1 && field.placeholder.backward) return field.placeholder.backward;
        if (this.activeTab === 0 && field.placeholder.forward) return field.placeholder.forward;
        if (field.placeholder.monthly) {
          return this.activeTab === 0 ? field.placeholder.monthly : field.placeholder.annual;
        }
      }
      return field.placeholder || '请输入';
    },
    selectIndex(field) {
      const index = (field.optionsValue || []).findIndex((x) => x.key === this.values[field.inputName]);
      return index < 0 ? 0 : index;
    },
    selectLabel(field) {
      const item = (field.optionsValue || [])[this.selectIndex(field)];
      return item ? item.value : '请选择';
    },
    onSelect(field, event) {
      const option = field.optionsValue[Number(event.detail.value)];
      if (option) this.values[field.inputName] = option.key;
    },
    calculate() {
      const params = {};
      this.config.fields.forEach((field) => {
        const value = this.values[field.inputName];
        if (field.inputName === 'taxpayerType') {
          params[field.inputName] = value;
        } else if (value !== '' && value !== null && value !== undefined) {
          params[field.inputName] = Number(value) || 0;
        }
      });
      if (!params.inputSalary) {
        uni.showToast({ title: '请输入金额', icon: 'none' });
        return;
      }
      if (this.activeTab === 1) params.isBackward = true;
      try {
        const result = taxService.calculate({ taxType: this.type, params });
        uni.setStorageSync('tax:lastResult', {
          title: this.typeName,
          taxType: this.type,
          params,
          result
        });
        uni.navigateTo({ url: '/pages/tax/result' });
      } catch (err) {
        uni.showToast({ title: err.message || '计算失败', icon: 'none' });
      }
    },
    back() {
      uni.navigateBack({ delta: 1 });
    }
  }
};
</script>

<style scoped lang="scss">
.head-title {
  font-size: 34rpx;
  font-weight: 800;
}

.head-sub {
  margin-top: 8rpx;
  font-size: 23rpx;
  color: #8a90a2;
}

.seg {
  display: flex;
  padding: 6rpx;
  margin-top: 18rpx;
  border-radius: 16rpx;
  background: #fff;
  box-shadow: 0 6rpx 18rpx rgba(31, 36, 48, 0.05);
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
  color: #fff;
  font-weight: 700;
  background: #5c7efc;
}

.form-card {
  margin-top: 18rpx;
}

.field {
  margin-top: 4rpx;
  padding-top: 22rpx;
}

.field:first-child {
  padding-top: 0;
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
  font-size: 27rpx;
}

.chips {
  display: flex;
  gap: 12rpx;
  flex-wrap: wrap;
}

.chip {
  padding: 14rpx 22rpx;
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

.field-tip {
  display: block;
  margin-top: 8rpx;
  font-size: 20rpx;
  line-height: 1.6;
  color: #a0a6b6;
}

.btn-primary {
  margin-top: 28rpx;
}

.note {
  margin-top: 18rpx;
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
