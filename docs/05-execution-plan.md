# Cobot Finder — 一人公司执行计划

## 每周投入时间：10-15 小时

---

## Phase 1: 建站 + 内容（第 1-4 周）

### Week 1: 项目初始化

**策略调整：内容即产品（Content-First）**
不再先做工具再写博客。每篇 SEO 文章内嵌可交互组件（CobotCompareTable, CTAQuote），
文章本身就是 educate → compare → convert 的完整漏斗。核心流量页是 `/guides/[slug]`。

- [ ] 注册域名（cobotfinder.com 或备选）
- [x] Next.js 16 项目初始化 + Tailwind + Supabase
- [x] TypeScript 类型定义（Cobot, Lead, Distributor）— `src/types/database.ts`
- [x] Supabase client 初始化 — `src/lib/supabase.ts`
- [x] MDX 博客基础设施 — `src/lib/mdx.ts` (gray-matter + reading-time)
- [x] 文章渲染页 — `src/app/guides/[slug]/page.tsx` (next-mdx-remote/rsc + JSON-LD)
- [x] 文章列表页 — `src/app/guides/page.tsx` (分类筛选)
- [x] 嵌入式组件 — CobotCard, CobotCompareTable, CTAQuote
- [x] 写第 1 篇文章: "What is a Cobot? Complete Guide 2026" (~3000 词)
- [x] 写第 2 篇文章: "Cobots in Manufacturing: Benefits, Use Cases & ROI" (~3000 词)
- [ ] 设计首页 + 基础布局（header, footer, nav）
- [ ] 创建 Supabase 数据库表（cobots, leads, distributors）
- [ ] 手动录入前 10 款 cobot 数据（Universal Robots 全系列）

### Week 2: 内容 + 数据

- [ ] 录入 Fanuc CRX 系列 cobot 数据
- [ ] 录入 ABB + KUKA cobot 数据
- [ ] 写第 3 篇文章: "Best Cobots for Welding: Top 7 Compared"
- [ ] 写第 4 篇文章: "Cobot Palletizer: Complete Buyer's Guide"
- [ ] 部署到 Vercel，上线 beta 版
- [ ] 配置 Google Search Console + Google Analytics

### Week 3: 更多内容

- [ ] 录入 Doosan + Techman cobot 数据
- [ ] 写第 5 篇文章: "Advantages of Cobots Over Traditional Robots"
- [ ] 写第 6 篇文章: "Best Cobot Arms for Small Manufacturers"
- [ ] 添加 structured data (JSON-LD: Product, FAQ, Article)
- [ ] 配置 next-sitemap，提交 sitemap 到 Google

### Week 4: 完善基础

- [ ] 录入剩余品牌 cobot 数据（~50 款总计）
- [ ] 写第 7 篇文章: "Robotics as a Service (RaaS) Complete Guide"
- [ ] 写第 8 篇文章: "Robot Fleet Management Software Guide"
- [ ] 基础 SEO 优化（内部链接、canonical、meta tags）
- [ ] 设置 newsletter 收集（用 Supabase 或 Buttondown）

**Phase 1 交付物**:
- 网站上线
- 50 款 cobot 数据库
- 8 篇 SEO 文章
- Google Search Console 已配置

---

## Phase 2: 核心工具（第 3-6 周）

### Week 5: Cobot Compare Tool

- [ ] 实现筛选器 UI（场景、品牌、载荷、臂展、价格）
- [ ] 实现结果列表（卡片式展示）
- [ ] 实现 cobot 详情页 (/cobots/[brand]/[model])
- [ ] 写第 9 篇文章: "Cobot ROI Calculator: Is Automation Worth It?"
- [ ] 写第 10 篇文章: "Top Robotics as a Service Companies 2026"

### Week 6: Compare + ROI Calculator

- [ ] 实现并排对比功能（最多 3 台）
- [ ] 实现 ROI Calculator（输入表单 + 结果计算 + 图表）
- [ ] 在所有文章底部添加 CTA 到 Compare / Calculator
- [ ] 品牌页面 (/brands/[brand])

### Week 7: Get Quote 表单

- [ ] 实现多步骤 Get Quote 表单
- [ ] 表单提交存入 Supabase leads 表
- [ ] 设置邮件通知（新 lead 通知到自己邮箱）
- [ ] 感谢页面 + 后续引导
- [ ] 在 Compare Tool 和文章中嵌入 Get Quote CTA

### Week 8: 打磨

- [ ] 性能优化（ISR、图片优化、Core Web Vitals）
- [ ] 移动端适配检查
- [ ] 添加 Open Graph / Twitter Card
- [ ] 写 2 篇新文章
- [ ] AB 测试 CTA 按钮位置和文案

**Phase 2 交付物**:
- Cobot Compare Tool 上线
- ROI Calculator 上线
- Get Quote 表单上线
- 12 篇文章
- 开始收集 leads

---

## Phase 3: 变现启动（第 8-12 周）

### Week 9-10: 对接经销商

- [ ] 整理已收集的 leads 数据
- [ ] 制作 "Partner with Us" pitch deck
- [ ] 在 LinkedIn 找 50 个 cobot 经销商/集成商
- [ ] 发送冷邮件（每天 5-10 封）
- [ ] 跟进回复，签首批 3-5 家合作经销商

### Week 11-12: 优化转化

- [ ] 分析 Google Analytics 数据，找出高转化页面
- [ ] 优化 Get Quote 表单转化率
- [ ] 添加 Amazon Affiliate 链接（配件、小型 cobot）
- [ ] 写 4 篇新文章（覆盖长尾关键词）
- [ ] 开始发 newsletter（双周刊）

**Phase 3 交付物**:
- 3-5 家经销商合作协议
- 首批 lead 售出
- 月收入 $500-2,000
- 16 篇文章

---

## Phase 4: 规模化（Month 4-6）

- [ ] 每周写 2 篇新文章
- [ ] 扩展经销商网络到 15-20 家
- [ ] 优化 lead 质量评分系统
- [ ] 开发 PDF 报告导出功能
- [ ] 考虑添加付费功能（Pro 版）
- [ ] 开始 Reddit/社区推广（r/robotics, r/manufacturing）
- [ ] 考虑 Product Hunt launch

---

## 成本预算

| 项目 | 月费用 | 说明 |
|------|--------|------|
| 域名 | $12/年 | Namecheap |
| Vercel | $0 | Hobby plan 够用 |
| Supabase | $0 | Free tier (500MB) |
| 邮件 | $0-9/月 | Buttondown 或 Resend |
| 图片 | $0 | Unsplash + 厂商官方图 |
| **总计** | **~$1/月** | 几乎零成本启动 |

---

## 风险与应对

| 风险 | 概率 | 影响 | 应对 |
|------|------|------|------|
| SEO 排名上不去 | 低 | 高 | KD 都在 20% 以下，只要内容质量够就行 |
| Lead 卖不出去 | 中 | 中 | 先做 affiliate 兜底 |
| 大公司抄 | 低 | 低 | SEO 积累是时间壁垒 |
| Cobot 数据不准 | 中 | 中 | 标注 "estimated"，持续更新 |
| 经销商不配合 | 中 | 中 | 先免费送 5 条 lead 建立信任 |

---

## 每周工作节奏（稳定期）

| 日 | 任务 | 时间 |
|----|------|------|
| 周一 | 写 1 篇 SEO 文章 | 2-3h |
| 周三 | 更新 cobot 数据 + 回复经销商 | 1-2h |
| 周五 | 写 1 篇文章 + 查看 Analytics | 2-3h |
| 周日 | 编辑 newsletter + 社区互动 | 1-2h |
| **总计** | | **6-10h/周** |
