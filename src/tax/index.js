import engine from './taxEngine.js';

export const taxService = engine.taxService;
export const taxFieldConfig = engine.taxFieldConfig;
export const taxUtils = engine.utils;

/**
 * taxService.calculate 出错时不会抛异常，而是返回 { error: true, message }。
 * 这里统一转成异常，避免页面把错误结果当成正常结果展示（全是 0）。
 */
export function calculateTax(options) {
  const result = taxService.calculate(options);
  if (!result || result.error) {
    throw new Error((result && result.message) || '计算失败');
  }
  return result;
}
