# Cobot Finder — 项目概览

## 一句话定位

**Content-First Cobot Decision Platform** — 用高质量 SEO 内容吸引流量，内容本身就是转化漏斗

### 核心策略：内容即产品

传统做法：先做工具 → 再写博客引流 → 慢慢 SEO
我们的做法：**每篇文章本身就是完整的转化漏斗**

```
文章 (educate) → 嵌入对比表 (compare) → ROI 计算 (justify) → 获取报价 (convert)
```

核心页面是 `/guides/[slug]`，每篇指南内嵌可交互组件（CobotCompareTable, ROICalculatorMini, CTAQuote），
用户在阅读文章的过程中完成从"了解"到"购买决策"的全流程。

### 网站核心结构

```
/guides/[slug]     — 核心流量页，SEO 文章 + 嵌入式工具组件
/guides            — 文章列表，分类筛选
/compare           — 独立对比工具（从文章中引流过来）
/calculator        — 独立 ROI 计算器
/cobots/[brand]/[model] — Cobot 详情页
/quote             — Get Quote 表单
```

## 项目背景

### 为什么做这个？

2026 年智能机器人行业正处于爆发拐点：
- 硬件快速商品化（宇树 R1 降到 $4,900）
- 软件层严重缺失
- 机器人软件市场 $200亿 (2024) → $1500亿 (2034)，CAGR 22.4%
- 协作机器人 (Cobot) 是增长最快的细分市场之一，CAGR 11.8%

Semrush 关键词调研发现 **"cobot" 集群是最大的 SEO 蓝海**：
- 3,491 个关键词
- 月搜索总量 44,200
- 平均 KD 仅 18%（极低竞争）
- 高 CPC（$4-11），说明商业意图强

### 目标市场

美国市场为主（US database），主要面向：

| 用户群 | 搜什么 | 真实需求 | 付费意愿 |
|--------|--------|---------|---------|
| 制造业工厂经理 | "cobot palletizer", "cobot welding" | 想买 cobot，不知道买哪个 | 极高（一台 $25K-50K） |
| 自动化工程师 | "cobot programming", "robot simulation" | 技术选型、编程学习 | 中等 |
| 老板/决策者 | "cobot ROI", "advantages of cobots" | 需要数据说服董事会 | 高 |
| 采购经理 | "cobot manufacturers", "best cobot for..." | 对比厂商、要报价 | 极高 |

### 核心洞察

这些人最终要花 $25K-500K 买机器人。我们不需要卖 cobot，只需要帮他们做购买决策，然后从中赚钱。

目前没有一个网站能让用户 **跨品牌对比 cobot + 算 ROI + 一键获取报价**。

## 竞品分析

| 竞品 | 做了什么 | 没做的（我们的机会） |
|------|---------|---------------------|
| Cobot Intel | 新闻博客 | 没有对比工具、没有 ROI 计算器 |
| Universal Robots 官网 | 只卖自家产品 | 不跨品牌对比 |
| RobotShop | 电商平台 | 没有选型指导、没有 ROI |
| The Robot Report | 行业新闻 | 不帮用户做购买决策 |
| G2 / Capterra | SaaS 对比 | 不覆盖硬件机器人 |

## 技术栈

复用现有经验：
- **前端**: Next.js 15 + Tailwind CSS
- **数据库**: Supabase (PostgreSQL)
- **支付**: Stripe（未来付费功能）
- **部署**: Vercel
- **博客**: MDX
- **SEO**: next-sitemap, structured data (JSON-LD)

## 项目时间线

| 阶段 | 时间 | 交付物 |
|------|------|--------|
| Phase 1: 建站 + 内容 | 第 1-4 周 | 网站上线、10 篇 SEO 文章、Cobot 数据库 |
| Phase 2: 核心工具 | 第 3-6 周 | Compare Tool + ROI Calculator |
| Phase 3: 变现启动 | 第 6-8 周 | Get Quote 表单、对接经销商 |
| Phase 4: 规模化 | 第 8-16 周 | 更多内容、SaaS 功能、付费用户 |
