/**
 * Data-access layer for the `cobots` table.
 *
 * All functions are server-safe (no 'use client' directive needed).
 * They use the public anon client — cobots are publicly readable
 * thanks to the RLS policy in the migration.
 */

import { supabase } from './supabase';
import type { Cobot, CobotFilters } from '../types/database';

// ----------------------------------------------------------------
// Single cobot
// ----------------------------------------------------------------

/**
 * Fetch a single cobot by its URL slug.
 * Returns null when the slug does not exist (handle as 404).
 */
export async function getCobot(slug: string): Promise<Cobot | null> {
  const { data, error } = await supabase
    .from('cobots')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    // PostgREST returns PGRST116 when no rows match — treat as 404.
    if (error.code === 'PGRST116') return null;
    throw new Error(`getCobot(${slug}): ${error.message}`);
  }

  return data as Cobot;
}

// ----------------------------------------------------------------
// All cobots
// ----------------------------------------------------------------

/**
 * Return every cobot ordered by brand then model.
 * Suitable for generating static paths at build time.
 */
export async function getCobots(): Promise<Cobot[]> {
  const { data, error } = await supabase
    .from('cobots')
    .select('*')
    .order('brand', { ascending: true })
    .order('model', { ascending: true });

  if (error) throw new Error(`getCobots: ${error.message}`);

  return (data ?? []) as Cobot[];
}

// ----------------------------------------------------------------
// By brand
// ----------------------------------------------------------------

/**
 * Return all cobots for a given brand slug, e.g. "universal-robots".
 * Ordered by payload ascending so lighter models appear first.
 */
export async function getCobotsByBrand(brandSlug: string): Promise<Cobot[]> {
  const { data, error } = await supabase
    .from('cobots')
    .select('*')
    .eq('brand_slug', brandSlug)
    .order('payload_kg', { ascending: true });

  if (error) throw new Error(`getCobotsByBrand(${brandSlug}): ${error.message}`);

  return (data ?? []) as Cobot[];
}

// ----------------------------------------------------------------
// Filtered query
// ----------------------------------------------------------------

/**
 * Flexible filter that powers the /compare and /find search pages.
 *
 * All filters are optional — passing an empty object returns all
 * cobots (equivalent to getCobots but with filter structure).
 *
 * Price filtering uses price_min <= price_max overlap logic:
 *   a cobot matches if its price range overlaps the requested range.
 */
export async function getFilteredCobots(filters: CobotFilters): Promise<Cobot[]> {
  let query = supabase.from('cobots').select('*');

  // --- Application ---
  if (filters.application) {
    // PostgreSQL array containment: cobots whose applications[] includes the value.
    query = query.contains('applications', [filters.application]);
  }

  // --- Payload ---
  if (filters.payload_min !== undefined) {
    query = query.gte('payload_kg', filters.payload_min);
  }
  if (filters.payload_max !== undefined) {
    query = query.lte('payload_kg', filters.payload_max);
  }

  // --- Reach ---
  if (filters.reach_min !== undefined) {
    query = query.gte('reach_mm', filters.reach_min);
  }
  if (filters.reach_max !== undefined) {
    query = query.lte('reach_mm', filters.reach_max);
  }

  // --- Price (overlap logic) ---
  // Cobot is in range when its price_min <= requested max AND price_max >= requested min.
  if (filters.price_min !== undefined) {
    query = query.gte('price_max', filters.price_min);
  }
  if (filters.price_max !== undefined) {
    query = query.lte('price_min', filters.price_max);
  }

  // --- Brand ---
  if (filters.brand_slug) {
    query = query.eq('brand_slug', filters.brand_slug);
  }

  // --- DOF ---
  if (filters.dof !== undefined) {
    query = query.eq('dof', filters.dof);
  }

  query = query.order('payload_kg', { ascending: true });

  const { data, error } = await query;

  if (error) throw new Error(`getFilteredCobots: ${error.message}`);

  return (data ?? []) as Cobot[];
}

// ----------------------------------------------------------------
// Brand list
// ----------------------------------------------------------------

/**
 * Return a deduplicated list of brands with their slugs, ordered
 * alphabetically. Useful for brand filter dropdowns.
 *
 * Example return:
 * [
 *   { brand: "Fanuc",             brand_slug: "fanuc" },
 *   { brand: "Universal Robots",  brand_slug: "universal-robots" },
 * ]
 */
export async function getBrands(): Promise<Array<{ brand: string; brand_slug: string }>> {
  const { data, error } = await supabase
    .from('cobots')
    .select('brand, brand_slug')
    .order('brand', { ascending: true });

  if (error) throw new Error(`getBrands: ${error.message}`);

  // Deduplicate by brand_slug (SQL DISTINCT is not directly supported
  // via the JS client without RPC, so we deduplicate in memory).
  const seen = new Set<string>();
  const brands: Array<{ brand: string; brand_slug: string }> = [];

  for (const row of data ?? []) {
    if (!seen.has(row.brand_slug)) {
      seen.add(row.brand_slug);
      brands.push({ brand: row.brand, brand_slug: row.brand_slug });
    }
  }

  return brands;
}
