# 随身工具箱 TRD（证件照 + 个税）

| 项目 | 内容 |
|---|---|
| 版本 | v1.0 |
| 日期 | 2026-11-09 |
| 关联 PRD | `docs/PRD.md` |
| 工程 | `D:\3-Server\projects\idphoto-tax-uniapp` |
| 技术栈 | uni-app 3 + Vue 3 + Vite 5 |

## 1. 目标

在同一 uni-app 工程内合并两个反编译小程序：

- 证件照：规格、选图、换底色、改 KB、按规格裁剪、保存。
- 个税：工资/年终奖/劳务/更多税种、专项扣除、结果与税率表。

约束：

- 不引入后端、不要求登录。
- H5 与微信小程序同代码。
- 主包 ≤ 2 MB。
- 不把第三方 API Key 写入前端。

## 2. 架构

```text
uni-app (Vue 3 + Vite)
├─ pages/home       入口
├─ pages/idphoto    证件照
├─ pages/tax        个税
├─ pages/mine       我的
├─ services/photo   图像处理（Canvas / 离屏 Canvas）
├─ tax/taxEngine    个税计算引擎（ESM bundle）
└─ data/            规格、税目配置
```

无后端。个税计算与证件照处理均在本机完成；可选 `VITE_PHOTO_CUTOUT_URL` 接第三方抠图。

## 3. 页面与路由

| 路由 | 作用 |
|---|---|
| `pages/home/index` | 首页 |
| `pages/idphoto/index` | 规格列表 |
| `pages/idphoto/edit` | 编辑/换底/自定义尺寸 |
| `pages/idphoto/result` | 结果/保存 |
| `pages/idphoto/change-size` | 改 KB |
| `pages/idphoto/change-bg` | 换底色 |
| `pages/tax/index` | 个税首页 |
| `pages/tax/result` | 结果 |
| `pages/tax/detail` | 每月明细 |
| `pages/tax/special` | 专项附加扣除 |
| `pages/tax/more` | 更多税种 |
| `pages/tax/generic` | 通用税种表单 |
| `pages/mine/index` | 我的 |

TabBar：首页 / 证件照 / 个税 / 我的。

## 4. 个税引擎

### 4.1 来源

原始代码：`D:\3-Server\outputs\wxaf35875a3f5dd56f\common`

- `taxService.js`：税目路由、正算/反算、公式、税率表
- `taxFieldConfig.js`：表单字段
- `taxCalculators/*.js`：12 个税目算法
- `utils.js`：数字格式化

### 4.2 打包

`build/tax-src/entry.cjs`：

```js
const { taxService } = require('./common/taxService.js');
const { taxFieldConfig } = require('./common/taxFieldConfig.js');
const { utils } = require('./common/utils.js');
module.exports = { taxService, taxFieldConfig, utils };
```

命令：

```powershell
D:\3-Server\projects\27-poker-bar-uniapp\node_modules\.bin\esbuild.cmd `
  build\tax-src\entry.cjs --bundle --format=esm --platform=neutral `
  --outfile=src\tax\taxEngine.js
```

`src/tax/index.js` 统一导出：

```js
import engine from './taxEngine.js';
export const taxService = engine.taxService;
export const taxFieldConfig = engine.taxFieldConfig;
export const taxUtils = engine.utils;
```

### 4.3 调用

```js
taxService.calculate({ taxType: '/geshui/', params: { inputSalary, insurance, specialDeduction, month, calculateType } });
taxService.calculatePreTax({ taxType: '/lwbc/', params: { inputSalary, taxpayerType } });
taxService.getFormula(taxType, period, params);
taxService.getTaxBrackets(taxType, taxpayerType);
```

支持税目：工资薪金、年终奖、劳务报酬、稿酬、特许权使用费、个体工商户、承包承租、财产租赁、财产转让、利息股息红利、偶然所得、解除劳动合同。

### 4.4 结果字段兼容

不同税目返回字段不完全一致：

- 工资：`preTaxSalary` / `tax` / `netSalary` / `monthlyDetails`（年度）
- 年终奖：`preTaxBonus` / `tax` / `netSalary`
- 劳务：`preTaxIncome` / `tax` / `netSalary`
- 承包承租：`netIncome`
- 其他：`preTaxIncome` / `taxableIncome` / `tax` / `netSalary`

结果页按 `preTaxSalary ?? preTaxBonus ?? preTaxIncome`、`netSalary ?? netIncome` 兼容。

## 5. 证件照处理

### 5.1 选图

`uni.chooseImage`，支持相册/拍照；返回临时路径或 data URL。

### 5.2 换底色

本机色键：

1. 画到 Canvas，读取像素。
2. 采样四边/边缘，估计背景色。
3. 计算每个像素与背景色的 RGB 距离。
4. 距离 < 58 替换为目标色；58–92 做羽化混合。
5. 导出 JPEG。

平台：

- H5：`document.createElement('canvas')`。
- 微信小程序：`wx.createOffscreenCanvas({ type: '2d' })` + `canvas.createImage()` + `wx.canvasToTempFilePath({ canvas })`。
- 不支持离屏画布时回退原图并提示。

可选 API：

```text
POST VITE_PHOTO_CUTOUT_URL
{ "image": "base64", "bgColor": "#ffffff" }
→ { "image": "url-or-base64", "width": 295, "height": 413, "size": 12345 }
```

### 5.3 改 KB

- H5：Canvas `toBlob`，质量 0.2–0.95 二分，找到 ≤ 目标大小的最高质量。
- 小程序：`uni.compressImage` 质量 0.9 → 0.2 逐级，配合 `uni.getFileInfo` 检查大小。
- 达不到目标时返回最低质量并提示。

### 5.4 按规格裁剪

- 读取原图宽高。
- 以 `cover` 方式计算缩放，居中裁剪到规格像素。
- H5 用 Canvas；小程序用离屏 Canvas。

### 5.5 保存

- H5：创建 `<a download>` 下载。
- 小程序：`uni.saveImageToPhotosAlbum`，权限失败引导 `uni.openSetting`。

## 6. 数据与存储

| Key | 内容 |
|---|---|
| `idphoto:last` | 最近一次证件照结果 |
| `specialDeduction` | 专项附加扣除月度合计 |
| `specialDeductionDetail` | 专项扣除明细 |
| `tax:lastResult` | 最近一次个税计算结果 |

不存储原始照片、收入以外的个人信息；清除缓存会删除以上 key。

## 7. 构建与部署

```powershell
npm install
npm run dev:h5
npm run build:h5
npm run build:mp-weixin
```

产物：

- H5：`dist/build/h5`
- 微信小程序：`dist/build/mp-weixin`

`src/manifest.json` 的 `mp-weixin.appid` 当前为 `touristappid`，发布前替换。

## 8. 兼容性

| 能力 | H5 | 微信小程序 |
|---|---|---|
| 选图 | 支持 | 支持 |
| Canvas 换底 | 支持 | 离屏 Canvas（2.7.0+） |
| 压缩 | Canvas | `uni.compressImage` |
| 保存 | 下载 | 保存相册 |
| 存储 | localStorage | `uni.setStorageSync` |

## 9. 安全与隐私

- 默认本机处理，不上传照片与收入。
- 不硬编码第三方 API Key；如接抠图服务，通过环境变量配置。
- 结果页明确提示“仅供参考”。
- 清除缓存入口。
- 上线前补充隐私政策与用户协议。

## 10. 测试

已执行：

- `npm run build:h5` 通过。
- `npm run build:mp-weixin` 通过，主包约 290 KB。
- Node 逐项调用 12 类税目，均返回结果。
- H5 实测工资个税、稿酬、专项扣除保存、证件照换白底、295×413 输出、50 KB 压缩。

建议补充：

- 微信真机选图、离屏 Canvas、保存相册。
- 复杂背景/发丝边缘的色键效果。
- 正反算边界值（0、1 元、跨税率档）。
- 不同规格的像素/毫米校验。

## 11. 后续

- 接入 AI 人像分割，替换/增强色键。
- 证件照排版打印（一版多张）。
- 订单/支付/登录（按业务需要）。
- 个税政策配置化与年度更新。
- 结果分享与收藏。