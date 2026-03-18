// ----------------------------------------------------------------
// Database types — mirrors the Supabase schema exactly.
// Run `supabase gen types typescript` to regenerate from live DB.
// ----------------------------------------------------------------

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

// ----------------------------------------------------------------
// Cobot
// ----------------------------------------------------------------

export interface Cobot {
  id: string;
  brand: string;
  model: string;
  /** URL-safe unique identifier, e.g. "universal-robots-ur10e" */
  slug: string;
  /** Brand-level slug, e.g. "universal-robots", "fanuc" */
  brand_slug: string;

  // --- Core specs ---
  payload_kg: number | null;
  reach_mm: number | null;
  repeatability_mm: number | null;
  max_speed_deg_s: number | null;
  dof: number;
  weight_kg: number | null;

  // --- Pricing ---
  price_min: number | null;
  price_max: number | null;
  price_currency: string;

  // --- Classification ---
  /** e.g. ["assembly", "welding", "pick_and_place"] */
  applications: string[];
  /** e.g. ["hand_guiding", "script", "visual"] */
  programming_methods: string[];
  ip_rating: string | null;
  certifications: string[];

  // --- Content ---
  description: string | null;
  pros: string[];
  cons: string[];
  image_url: string | null;
  official_url: string | null;

  // --- SEO ---
  meta_title: string | null;
  meta_description: string | null;

  // --- Timestamps ---
  created_at: string;
  updated_at: string;
}

/** Fields required when inserting a new cobot row. */
export type CobotInsert = Omit<Cobot, 'id' | 'created_at' | 'updated_at'> & {
  id?: string;
  created_at?: string;
  updated_at?: string;
};

/** All fields optional for partial updates. */
export type CobotUpdate = Partial<CobotInsert>;

// ----------------------------------------------------------------
// Lead
// ----------------------------------------------------------------

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';

export type BudgetRange =
  | 'under_25k'
  | '25k_50k'
  | '50k_100k'
  | '100k_250k'
  | 'over_250k';

export type Timeline =
  | 'immediately'
  | '1_3_months'
  | '3_6_months'
  | '6_12_months'
  | 'over_12_months';

export interface Lead {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string | null;

  // --- Geography ---
  state: string | null;
  country: string;

  // --- Requirements ---
  application: string | null;
  quantity: number;
  payload_needed_kg: number | null;
  reach_needed_mm: number | null;
  brand_preference: string[];
  budget_range: BudgetRange | string | null;
  timeline: Timeline | string | null;
  notes: string | null;

  // --- Attribution ---
  source_page: string | null;
  utm_source: string | null;
  utm_medium: string | null;

  // --- CRM ---
  status: LeadStatus;
  /** UUIDs of distributor rows this lead is assigned to */
  assigned_to: string[];

  created_at: string;
}

export type LeadInsert = Omit<Lead, 'id' | 'created_at'> & {
  id?: string;
  created_at?: string;
};

export type LeadUpdate = Partial<LeadInsert>;

// ----------------------------------------------------------------
// Distributor
// ----------------------------------------------------------------

export interface Distributor {
  id: string;
  company_name: string;
  contact_name: string | null;
  email: string;
  phone: string | null;
  website: string | null;

  /** US state codes or country codes they cover */
  regions: string[];
  /** Brand slugs they carry, e.g. ["universal-robots", "fanuc"] */
  brands: string[];
  /** e.g. ["welding", "palletizing"] */
  specializations: string[];

  /** USD price charged per routed lead */
  lead_price: number | null;
  payment_method: string | null;
  is_active: boolean;

  created_at: string;
}

export type DistributorInsert = Omit<Distributor, 'id' | 'created_at'> & {
  id?: string;
  created_at?: string;
};

export type DistributorUpdate = Partial<DistributorInsert>;

// ----------------------------------------------------------------
// Filter / query helpers
// ----------------------------------------------------------------

export interface CobotFilters {
  application?: string;
  payload_min?: number;
  payload_max?: number;
  reach_min?: number;
  reach_max?: number;
  price_min?: number;
  price_max?: number;
  brand_slug?: string;
  dof?: number;
}
