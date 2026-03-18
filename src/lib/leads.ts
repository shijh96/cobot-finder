/**
 * Data-access layer for the `leads` table.
 *
 * Leads are write-only from the public internet (anon INSERT only —
 * see RLS policy). Reading leads requires the service-role client
 * and must happen server-side only.
 */

import { supabase } from './supabase';
import type { Lead, LeadInsert } from '../types/database';

// ----------------------------------------------------------------
// Validation
// ----------------------------------------------------------------

export interface LeadValidationError {
  field: string;
  message: string;
}

/**
 * Validate lead fields before attempting a database insert.
 * Returns an array of errors — empty array means valid.
 */
export function validateLead(data: Partial<LeadInsert>): LeadValidationError[] {
  const errors: LeadValidationError[] = [];

  if (!data.company_name?.trim()) {
    errors.push({ field: 'company_name', message: 'Company name is required.' });
  }

  if (!data.contact_name?.trim()) {
    errors.push({ field: 'contact_name', message: 'Contact name is required.' });
  }

  if (!data.email?.trim()) {
    errors.push({ field: 'email', message: 'Email is required.' });
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.push({ field: 'email', message: 'Email address is not valid.' });
  }

  if (data.quantity !== undefined && data.quantity !== null) {
    if (!Number.isInteger(data.quantity) || data.quantity < 1) {
      errors.push({ field: 'quantity', message: 'Quantity must be a positive integer.' });
    }
  }

  if (data.payload_needed_kg !== undefined && data.payload_needed_kg !== null) {
    if (data.payload_needed_kg <= 0 || data.payload_needed_kg > 1000) {
      errors.push({
        field: 'payload_needed_kg',
        message: 'Payload must be between 0.1 and 1000 kg.',
      });
    }
  }

  if (data.reach_needed_mm !== undefined && data.reach_needed_mm !== null) {
    if (data.reach_needed_mm <= 0 || data.reach_needed_mm > 5000) {
      errors.push({
        field: 'reach_needed_mm',
        message: 'Reach must be between 1 and 5000 mm.',
      });
    }
  }

  return errors;
}

// ----------------------------------------------------------------
// Create lead
// ----------------------------------------------------------------

export interface CreateLeadResult {
  success: boolean;
  lead?: Pick<Lead, 'id' | 'created_at'>;
  validationErrors?: LeadValidationError[];
  error?: string;
}

/**
 * Validate and insert a new lead.
 *
 * Usage in a Server Action or Route Handler:
 * ```ts
 * const result = await createLead({
 *   company_name: 'Acme Corp',
 *   contact_name: 'Jane Doe',
 *   email: 'jane@acme.com',
 *   application: 'welding',
 *   quantity: 2,
 *   payload_needed_kg: 10,
 *   reach_needed_mm: 1300,
 *   budget_range: '25k_50k',
 *   timeline: '3_6_months',
 *   source_page: '/cobots/universal-robots-ur10e',
 * });
 * ```
 */
export async function createLead(data: Partial<LeadInsert>): Promise<CreateLeadResult> {
  // 1. Validate
  const validationErrors = validateLead(data);
  if (validationErrors.length > 0) {
    return { success: false, validationErrors };
  }

  // 2. Build the insert payload with safe defaults.
  const insertPayload: LeadInsert = {
    company_name: data.company_name!.trim(),
    contact_name: data.contact_name!.trim(),
    email: data.email!.trim().toLowerCase(),
    phone: data.phone?.trim() ?? null,
    state: data.state?.trim() ?? null,
    country: data.country ?? 'US',
    application: data.application ?? null,
    quantity: data.quantity ?? 1,
    payload_needed_kg: data.payload_needed_kg ?? null,
    reach_needed_mm: data.reach_needed_mm ?? null,
    brand_preference: data.brand_preference ?? [],
    budget_range: data.budget_range ?? null,
    timeline: data.timeline ?? null,
    notes: data.notes?.trim() ?? null,
    source_page: data.source_page ?? null,
    utm_source: data.utm_source ?? null,
    utm_medium: data.utm_medium ?? null,
    status: 'new',
    assigned_to: [],
  };

  // 3. Insert
  const { data: inserted, error } = await supabase
    .from('leads')
    .insert(insertPayload)
    .select('id, created_at')
    .single();

  if (error) {
    // Don't expose raw Postgres errors to the client caller.
    console.error('createLead DB error:', error);
    return {
      success: false,
      error: 'Unable to submit your request at this time. Please try again later.',
    };
  }

  return {
    success: true,
    lead: inserted as Pick<Lead, 'id' | 'created_at'>,
  };
}
