-- ============================================================
-- Migration: 001_initial_schema
-- Creates cobots, leads, and distributors tables with RLS.
-- ============================================================

-- ============================================================
-- cobots
-- ============================================================

CREATE TABLE cobots (
  id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  brand               TEXT        NOT NULL,
  model               TEXT        NOT NULL,
  slug                TEXT        UNIQUE NOT NULL,
  brand_slug          TEXT        NOT NULL,

  -- Core specs
  payload_kg          DECIMAL,
  reach_mm            INTEGER,
  repeatability_mm    DECIMAL,
  max_speed_deg_s     INTEGER,
  dof                 INTEGER     DEFAULT 6,
  weight_kg           DECIMAL,

  -- Pricing (USD unless otherwise noted in price_currency)
  price_min           INTEGER,
  price_max           INTEGER,
  price_currency      TEXT        DEFAULT 'USD',

  -- Classification
  applications        TEXT[]      DEFAULT '{}',
  programming_methods TEXT[]      DEFAULT '{}',
  ip_rating           TEXT,
  certifications      TEXT[]      DEFAULT '{}',

  -- Content
  description         TEXT,
  pros                TEXT[]      DEFAULT '{}',
  cons                TEXT[]      DEFAULT '{}',
  image_url           TEXT,
  official_url        TEXT,

  -- SEO
  meta_title          TEXT,
  meta_description    TEXT,

  -- Timestamps
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common filter queries
CREATE INDEX cobots_brand_slug_idx      ON cobots (brand_slug);
CREATE INDEX cobots_payload_kg_idx      ON cobots (payload_kg);
CREATE INDEX cobots_reach_mm_idx        ON cobots (reach_mm);
CREATE INDEX cobots_price_min_idx       ON cobots (price_min);
CREATE INDEX cobots_price_max_idx       ON cobots (price_max);
-- GIN index on arrays enables efficient containment queries (@>)
CREATE INDEX cobots_applications_gin    ON cobots USING GIN (applications);

-- Auto-update updated_at on every row change
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER cobots_updated_at
  BEFORE UPDATE ON cobots
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ============================================================
-- leads
-- ============================================================

CREATE TABLE leads (
  id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name        TEXT        NOT NULL,
  contact_name        TEXT        NOT NULL,
  email               TEXT        NOT NULL,
  phone               TEXT,

  -- Geography
  state               TEXT,
  country             TEXT        DEFAULT 'US',

  -- Requirements
  application         TEXT,
  quantity            INTEGER     DEFAULT 1,
  payload_needed_kg   DECIMAL,
  reach_needed_mm     INTEGER,
  brand_preference    TEXT[]      DEFAULT '{}',
  budget_range        TEXT,
  timeline            TEXT,
  notes               TEXT,

  -- Attribution
  source_page         TEXT,
  utm_source          TEXT,
  utm_medium          TEXT,

  -- CRM
  status              TEXT        DEFAULT 'new'
                      CHECK (status IN ('new','contacted','qualified','converted','lost')),
  assigned_to         UUID[]      DEFAULT '{}',

  created_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX leads_status_idx      ON leads (status);
CREATE INDEX leads_created_at_idx  ON leads (created_at DESC);
CREATE INDEX leads_email_idx       ON leads (email);

-- ============================================================
-- distributors  (schema only — populated in Phase 3)
-- ============================================================

CREATE TABLE distributors (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name     TEXT        NOT NULL,
  contact_name     TEXT,
  email            TEXT        NOT NULL,
  phone            TEXT,
  website          TEXT,

  regions          TEXT[]      DEFAULT '{}',
  brands           TEXT[]      DEFAULT '{}',
  specializations  TEXT[]      DEFAULT '{}',

  lead_price       DECIMAL,
  payment_method   TEXT,
  is_active        BOOLEAN     DEFAULT true,

  created_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX distributors_brands_gin   ON distributors USING GIN (brands);
CREATE INDEX distributors_regions_gin  ON distributors USING GIN (regions);
CREATE INDEX distributors_is_active_idx ON distributors (is_active);

-- ============================================================
-- Row-Level Security
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE cobots       ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads        ENABLE ROW LEVEL SECURITY;
ALTER TABLE distributors ENABLE ROW LEVEL SECURITY;

-- cobots: anyone (including anonymous visitors) can read
CREATE POLICY "cobots_public_read"
  ON cobots
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- leads: anonymous visitors can insert their own lead, but cannot
-- read, update, or delete any rows (prevents data harvesting).
CREATE POLICY "leads_anon_insert"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- leads: authenticated users (admin dashboard) can read all leads.
CREATE POLICY "leads_authenticated_read"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

-- leads: authenticated users can update leads (CRM status changes).
CREATE POLICY "leads_authenticated_update"
  ON leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- distributors: authenticated users only (admin-managed table).
CREATE POLICY "distributors_authenticated_all"
  ON distributors
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
