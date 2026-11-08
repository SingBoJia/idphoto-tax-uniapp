export const SPECS = [
  { id: 'one', name: '一寸', px: [295, 413], mm: [25, 35], category: '常用', hot: true },
  { id: 'small-one', name: '小一寸', px: [260, 378], mm: [22, 32], category: '常用' },
  { id: 'large-one', name: '大一寸', px: [390, 567], mm: [33, 48], category: '常用', hot: true },
  { id: 'two', name: '二寸', px: [413, 579], mm: [35, 49], category: '常用', hot: true },
  { id: 'small-two', name: '小二寸', px: [413, 531], mm: [35, 45], category: '常用' },
  { id: 'large-two', name: '大二寸', px: [413, 626], mm: [35, 53], category: '常用' },
  { id: 'idcard', name: '身份证', px: [358, 441], mm: [26, 32], category: '证件' },
  { id: 'driver', name: '驾驶证', px: [260, 378], mm: [22, 32], category: '证件' },
  { id: 'social', name: '社保卡', px: [358, 441], mm: [26, 32], category: '证件' },
  { id: 'xuexin', name: '学信网', px: [480, 640], mm: [41, 54], category: '考试' },
  { id: 'computer', name: '计算机等级', px: [144, 192], mm: [12, 16], category: '考试' },
  { id: 'teacher', name: '教师资格证', px: [180, 240], mm: [15, 20], category: '考试' },
  { id: 'nurse', name: '护士执业资格', px: [120, 160], mm: [10, 14], category: '考试' },
  { id: 'civil', name: '公务员', px: [413, 531], mm: [35, 45], category: '考试' },
  { id: 'custom', name: '自定义尺寸', px: [0, 0], mm: [0, 0], category: '自定义' }
];

export const SPEC_CATEGORIES = ['全部', '常用', '证件', '考试', '自定义'];

export function findSpec(id) {
  return SPECS.find((item) => item.id === id) || SPECS[0];
}

export function specText(spec) {
  if (!spec) return '';
  if (spec.id === 'custom') return '自定义像素 / 毫米';
  return `${spec.px[0]}×${spec.px[1]} px · ${spec.mm[0]}×${spec.mm[1]} mm`;
}
