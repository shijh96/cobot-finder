# Cobot Finder — 产品规格与功能设计

## 网站结构

> **核心理念：内容即产品。** `/guides/[slug]` 是主要流量入口和转化页面。
> 每篇文章内嵌可交互组件（CobotCompareTable, CTAQuote, ROICalculatorMini），
> 用户在阅读过程中完成 educate → compare → justify → convert 全链路。

```
cobotfinder.com
│
├── /guides/[slug] (⭐ 核心流量页 — SEO 文章 + 嵌入式工具)
│   ├── MDX 渲染的长文指南 (2500-3000 词)
│   ├── 嵌入 <CobotCompareTable /> 对比组件
│   ├── 嵌入 <CTAQuote /> 获取报价 CTA
│   ├── 嵌入 <ROICalculatorMini /> ROI 计算组件 (Phase 2)
│   ├── JSON-LD 结构化数据 (Article schema)
│   └── 文章底部: 相关文章 + 大 CTA
│
├── /guides (文章列表)
│   ├── 按分类筛选 (fundamentals / manufacturing / welding / palletizing ...)
│   └── 每篇显示: 标题、描述、日期、阅读时间
│
├── / (首页)
│   ├── Hero: "Find the Right Cobot for Your Factory"
│   ├── 搜索框: 按场景/品牌/载荷快速筛选
│   ├── 热门场景卡片: Welding / Palletizing / Assembly / Machine Tending
│   └── 最新文章 + CTA
│
├── /compare (独立对比工具 — 从文章引流)
│   ├── 左侧筛选器
│   ├── 右侧结果列表
│   ├── 并排对比功能
│   └── 每个 cobot 旁边有 "Get Quote" 按钮
│
├── /calculator (ROI Calculator)
│   ├── 步骤式表单
│   ├── 实时结果展示
│   └── CTA: 推荐最合适的 cobot
│
├── /cobots/[brand]/[model] (Cobot 详情页)
│   ├── 参数规格表
│   ├── 价格区间
│   ├── 适用场景
│   ├── 优缺点
│   ├── 用户评价
│   └── CTA: Compare / Get Quote
│
├── /brands/[brand] (品牌页)
│   ├── 品牌介绍
│   ├── 该品牌所有 cobot 列表
│   └── 品牌对比
│
├── /quote (Get Quote 表单页)
│   └── 多步骤表单 → 提交 → 感谢页
│
├── /news (行业新闻聚合)
│
└── /pricing (SaaS 定价页，Phase 2)
```

### 文章内嵌组件说明

MDX 文章中可以直接使用以下 React 组件（通过 next-mdx-remote 渲染）：

| 组件 | 用途 | 示例 |
|------|------|------|
| `<CobotCompareTable cobots={["ur10e", "crx-10ia"]} />` | 对比指定 cobot 的参数 | 文章中间嵌入 |
| `<CobotCard model="UR10e" brand="Universal Robots" />` | 单个 cobot 卡片 | 推荐段落中 |
| `<CTAQuote />` | 大 CTA — 获取报价 | 文章底部 |
| `<CTAQuote variant="inline" />` | 小 CTA — 行内获取报价 | 文章中间 |
| `<ROICalculatorMini />` | 嵌入式 ROI 计算器 (Phase 2) | ROI 相关段落 |

---

## 核心功能 1：Cobot Compare Tool

### 筛选器

```
应用场景 (多选):
  □ Welding         □ Palletizing
  □ Assembly        □ Machine Tending
  □ Pick & Place    □ Polishing/Sanding
  □ Quality Inspection  □ Packaging

品牌 (多选):
  □ Universal Robots  □ Fanuc
  □ ABB              □ KUKA
  □ Doosan           □ Techman
  □ Aubo             □ Kassow
  □ Franka Emika     □ Other

载荷范围:
  [滑块] 1kg -------- 35kg

臂展范围:
  [滑块] 500mm -------- 1800mm

价格范围:
  [滑块] $10,000 -------- $100,000

编程方式:
  □ 示教器 (Teach Pendant)
  □ 图形化编程 (Visual/Blockly)
  □ 代码编程 (Script/Python)
  □ 手拖示教 (Hand Guiding)
```

### 结果卡片

```
┌─────────────────────────────────────────────┐
│  [图片]  Universal Robots UR10e             │
│                                             │
│  载荷: 12.5kg    臂展: 1300mm               │
│  精度: ±0.05mm   速度: 180°/s               │
│  DOF: 6          编程: 手拖 + 代码           │
│                                             │
│  💰 $35,000 - $45,000 (estimated)           │
│                                             │
│  适用: Welding ✓  Palletizing ✓  Assembly ✓  │
│                                             │
│  [☐ Compare]  [View Details]  [Get Quote]   │
└─────────────────────────────────────────────┘
```

### 并排对比视图

```
                 UR10e          Fanuc CRX-10iA    KUKA LBR iisy
载荷             12.5 kg        10 kg             11 kg
臂展             1300 mm        1249 mm           1300 mm
精度             ±0.05 mm       ±0.04 mm          ±0.02 mm
最大速度         180°/s         250°/s            180°/s
DOF              6              6                 7
IP 等级          IP54           IP67              IP54
价格估算         $35-45K        $30-40K           $40-55K
编程方式         手拖+代码       手拖+图形          手拖+代码
适合焊接         ✅              ✅                ⚠️
适合码垛         ✅              ✅                ✅
易用性评分       ⭐⭐⭐⭐⭐        ⭐⭐⭐⭐           ⭐⭐⭐⭐
                [Get Quote]    [Get Quote]       [Get Quote]
```

---

## 核心功能 2：ROI Calculator

### 输入字段

```
Step 1: 你的应用场景
  ○ Welding  ○ Palletizing  ○ Assembly  ○ Machine Tending  ○ Other

Step 2: 当前人工情况
  - 这个任务目前有几个工人在做？ [___] 人
  - 每个工人时薪多少？ [___] USD/hr
  - 每天工作几班？ ○ 1班(8h)  ○ 2班(16h)  ○ 3班(24h)
  - 每年工作多少天？ [___] 天 (默认 250)

Step 3: 自动化目标
  - 你希望 cobot 替代多少人工？ ○ 25%  ○ 50%  ○ 75%  ○ 100%
  - 预期质量提升？ ○ 0-10%  ○ 10-25%  ○ 25-50%

Step 4: 预算信息（可选）
  - 你的预算范围？ ○ <$20K  ○ $20-50K  ○ $50-100K  ○ >$100K
```

### 输出结果

```
┌─────────────────────────────────────────────┐
│  📊 Your Cobot ROI Analysis                 │
│                                             │
│  Current Annual Labor Cost:    $156,000     │
│  Estimated Cobot Investment:   $45,000      │
│  Annual Savings:               $78,000      │
│  Payback Period:               6.9 months   │
│  5-Year Net Savings:           $345,000     │
│                                             │
│  [📊 漂亮的折线图：投资 vs 收益]              │
│                                             │
│  Recommended Cobots for Your Use Case:      │
│  1. Universal Robots UR10e  [Compare →]     │
│  2. Fanuc CRX-10iA         [Compare →]     │
│  3. Doosan M1013            [Compare →]     │
│                                             │
│  [📄 Download PDF Report]  [💬 Get Quote]   │
└─────────────────────────────────────────────┘
```

---

## 核心功能 3：Get Quote 表单

### 表单字段

```
Step 1: Application
  - What task do you want to automate? [dropdown]
  - How many cobots do you need? [1-10+]

Step 2: Requirements
  - Max payload needed? [kg slider]
  - Reach needed? [mm slider]
  - Any brand preference? [multi-select]

Step 3: Company Info
  - Company name* [___]
  - Your name* [___]
  - Email* [___]
  - Phone [___]
  - State/Region* [dropdown]

Step 4: Budget & Timeline
  - Budget range* [dropdown]
  - When do you need it?* [dropdown]
  - Additional notes [textarea]

[Submit → Get Free Quotes from 2-3 Distributors]
```

### 提交后

```
Thank You! 🎉

We've matched you with [2-3] authorized cobot distributors
in [State/Region]. They will contact you within 24-48 hours
with customized quotes.

While you wait:
→ Compare cobots for [your use case]
→ Read our guide: "How to Choose a Cobot for [use case]"
→ Use our ROI Calculator
```

---

## Cobot 数据库 Schema

### cobot 表

```sql
CREATE TABLE cobots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand TEXT NOT NULL,           -- "Universal Robots"
  model TEXT NOT NULL,           -- "UR10e"
  slug TEXT UNIQUE NOT NULL,     -- "universal-robots-ur10e"

  -- 核心参数
  payload_kg DECIMAL,            -- 12.5
  reach_mm INTEGER,              -- 1300
  repeatability_mm DECIMAL,      -- 0.05
  max_speed_deg_s INTEGER,       -- 180
  dof INTEGER,                   -- 6
  weight_kg DECIMAL,             -- 33.5

  -- 价格
  price_min INTEGER,             -- 35000
  price_max INTEGER,             -- 45000
  price_currency TEXT DEFAULT 'USD',

  -- 分类
  applications TEXT[],           -- ["welding", "palletizing", "assembly"]
  programming_methods TEXT[],    -- ["hand_guiding", "script", "visual"]
  ip_rating TEXT,                -- "IP54"
  certifications TEXT[],         -- ["ISO 10218-1", "CE"]

  -- 内容
  description TEXT,
  pros TEXT[],
  cons TEXT[],
  image_url TEXT,
  official_url TEXT,

  -- SEO
  meta_title TEXT,
  meta_description TEXT,

  -- 时间戳
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### leads 表

```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- 联系信息
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  state TEXT,
  country TEXT DEFAULT 'US',

  -- 需求信息
  application TEXT,              -- "welding"
  quantity INTEGER DEFAULT 1,
  payload_needed_kg DECIMAL,
  reach_needed_mm INTEGER,
  brand_preference TEXT[],
  budget_range TEXT,             -- "$20-50K"
  timeline TEXT,                 -- "3-6 months"
  notes TEXT,

  -- 来源追踪
  source_page TEXT,              -- 来自哪个页面
  utm_source TEXT,
  utm_medium TEXT,

  -- 状态
  status TEXT DEFAULT 'new',     -- new / sent / converted / lost
  assigned_to UUID[],            -- 分配给哪些经销商

  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### distributors 表

```sql
CREATE TABLE distributors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  contact_name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  website TEXT,

  -- 覆盖范围
  regions TEXT[],                -- ["California", "Oregon", "Washington"]
  brands TEXT[],                 -- ["Universal Robots", "Fanuc"]
  specializations TEXT[],        -- ["welding", "palletizing"]

  -- 商务
  lead_price DECIMAL,            -- 每条 lead 的价格
  payment_method TEXT,           -- "monthly" / "per_lead"

  -- 状态
  is_active BOOLEAN DEFAULT true,

  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 初始 Cobot 数据库范围

### 必须覆盖的品牌和型号（Phase 1: ~50 款）

| 品牌 | 型号 | 优先级 |
|------|------|--------|
| **Universal Robots** | UR3e, UR5e, UR10e, UR16e, UR20, UR30 | ⭐⭐⭐ |
| **Fanuc** | CRX-5iA, CRX-10iA, CRX-10iA/L, CRX-20iA/L, CRX-25iA | ⭐⭐⭐ |
| **ABB** | GoFa CRB 15000, SWIFTI CRB 1100, YuMi IRB 14000 | ⭐⭐ |
| **KUKA** | LBR iisy 3, 6, 11, 15 | ⭐⭐ |
| **Doosan** | M0609, M0617, M1013, M1509, A0509, A0912, H2017, H2515 | ⭐⭐ |
| **Techman** | TM5-700, TM5-900, TM12, TM14, TM16, TM20 | ⭐⭐ |
| **AUBO** | AUBO-i3, i5, i7, i10, i12, i16, i20 | ⭐ |
| **Kassow** | KR810, KR1018, KR1205, KR1410, KR1805 | ⭐ |
| **Franka Emika** | Franka Production 3 | ⭐ |
| **Omron / Techman** | TM系列 | ⭐ |

### 数据来源

- 各品牌官网 spec sheet（全部公开）
- RobotShop 产品页
- RoboDK 机器人库
- The Robot Report 评测
