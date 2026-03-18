# Cobot Finder — TODOS

## Phase 2 (流量来了之后做)

### 产品页接 Supabase 数据
- **What:** `/cobots/[brand]/[model]` 从 Supabase 加载真实 cobot 数据
- **Why:** 产品页是长尾 SEO 关键词着陆页（"UR10e specs"），但当前显示 "Coming Soon"
- **Effort:** M (human) → S (CC)
- **Priority:** P2
- **Depends on:** Supabase 项目已创建并配置

### 品牌页接 Supabase 数据
- **What:** `/brands/[brand]` 显示该品牌所有 cobot 列表
- **Why:** 品牌名 + cobot 是搜索关键词
- **Effort:** S (human) → S (CC)
- **Priority:** P2
- **Depends on:** 产品页接数据

### 对比工具完善
- **What:** `/compare` 页面的筛选器、排序、并排对比
- **Why:** 核心工具，但需要流量先
- **Effort:** L (human) → M (CC)
- **Priority:** P2

### ROI 计算器完善
- **What:** 完整版 ROI 计算器（步骤式表单、图表、PDF 报告）
- **Why:** 高意向转化工具
- **Effort:** L (human) → M (CC)
- **Priority:** P2

### 测试覆盖
- **What:** MDX 解析测试、Quote API 测试、组件测试
- **Why:** 代码增长后需要回归保护
- **Effort:** M (human) → S (CC)
- **Priority:** P3

### MDX 解析错误友好处理
- **What:** MDX 语法错误时显示友好错误页而非 Next.js 500
- **Why:** 开发体验改善
- **Effort:** S
- **Priority:** P3

### Google Analytics + Search Console
- **What:** 部署后配置 GA4 和 GSC
- **Why:** 需要数据来优化内容策略
- **Effort:** S (手动配置)
- **Priority:** P1 (部署后立刻做)
- **Depends on:** Vercel 部署完成

### 暗色模式清理
- **What:** 删除 MDX 组件中的 `dark:` CSS 类，或者全站支持暗色模式
- **Why:** 当前是死代码，不一致
- **Effort:** S
- **Priority:** P3
