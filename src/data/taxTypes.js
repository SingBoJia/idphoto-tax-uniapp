export const TAX_TYPES = [
  { type: '/geshui/', name: '工资薪金', desc: '月度/年度累计预扣', icon: '薪', color: '#5C7EFC' },
  { type: '/nzj/', name: '年终奖', desc: '单独计税，正算/反算', icon: '奖', color: '#F59E0B' },
  { type: '/lwbc/', name: '劳务报酬', desc: '居民/非居民预扣', icon: '劳', color: '#22C55E' },
  { type: '/gcsd/', name: '稿酬所得', desc: '稿酬预扣预缴', icon: '稿', color: '#8B5CF6' },
  { type: '/txq/', name: '特许权使用费', desc: '专利、著作权等', icon: '权', color: '#0EA5E9' },
  { type: '/gtgsh/', name: '个体工商户', desc: '经营所得，五级累进', icon: '商', color: '#F97316' },
  { type: '/cbcz/', name: '承包承租', desc: '承包承租经营所得', icon: '包', color: '#14B8A6' },
  { type: '/cczl/', name: '财产租赁', desc: '房租等租赁所得', icon: '租', color: '#EC4899' },
  { type: '/cczr/', name: '财产转让', desc: '转让收入减去原值', icon: '转', color: '#EF4444' },
  { type: '/lxhl/', name: '利息股息红利', desc: '20% 比例税率', icon: '息', color: '#6366F1' },
  { type: '/orsd/', name: '偶然所得', desc: '中奖、红包等', icon: '偶', color: '#D946EF' },
  { type: '/jcchtax/', name: '解除劳动合同', desc: '一次性补偿收入', icon: '离', color: '#64748B' }
];

export const TAX_TYPE_NAMES = TAX_TYPES.reduce((acc, item) => {
  acc[item.type] = item.name;
  return acc;
}, {});
