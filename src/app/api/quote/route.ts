import { NextRequest, NextResponse } from "next/server";

// Lazy import to avoid Supabase initialization at module load time when
// env vars are not set (e.g. during static analysis / cold start without .env.local)
async function getCreateLead() {
  const { createLead } = await import("@/lib/leads");
  return createLead;
}

interface QuotePayload {
  application: string;
  payload: number;
  reach: number;
  brandPreference: string;
  company: string;
  contactName: string;
  email: string;
  phone?: string;
  state: string;
  budget: string;
  timeline: string;
  notes?: string;
}

function isValidPayload(body: unknown): body is QuotePayload {
  if (typeof body !== "object" || body === null) return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.application === "string" &&
    b.application.length > 0 &&
    typeof b.company === "string" &&
    b.company.length > 0 &&
    typeof b.contactName === "string" &&
    b.contactName.length > 0 &&
    typeof b.email === "string" &&
    b.email.includes("@") &&
    typeof b.state === "string" &&
    b.state.length > 0 &&
    typeof b.budget === "string" &&
    b.budget.length > 0 &&
    typeof b.timeline === "string" &&
    b.timeline.length > 0
  );
}

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json();

    // Honeypot: if the hidden "website" field is filled, it's a bot
    if (
      typeof body === "object" &&
      body !== null &&
      "website" in body &&
      typeof (body as Record<string, unknown>).website === "string" &&
      ((body as Record<string, unknown>).website as string).length > 0
    ) {
      return NextResponse.json({ success: true });
    }

    if (!isValidPayload(body)) {
      return NextResponse.json(
        { error: "Missing or invalid required fields." },
        { status: 400 }
      );
    }

    // If Supabase is not configured, log and return success (dev mode)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!supabaseUrl || supabaseUrl.startsWith("MISSING_")) {
      console.log("[quote/api] Supabase not configured (dev mode). Lead:", {
        company: body.company,
        email: body.email,
        application: body.application,
      });
      return NextResponse.json({ success: true, dev: true });
    }

    const createLead = await getCreateLead();

    const result = await createLead({
      company_name: body.company,
      contact_name: body.contactName,
      email: body.email,
      phone: body.phone || null,
      state: body.state,
      application: body.application,
      payload_needed_kg: body.payload,
      reach_needed_mm: body.reach,
      brand_preference: body.brandPreference ? [body.brandPreference] : [],
      budget_range: body.budget,
      timeline: body.timeline,
      notes: body.notes || null,
      source_page: "/quote",
    });

    if (!result.success) {
      if (result.validationErrors) {
        return NextResponse.json(
          { error: result.validationErrors[0]?.message ?? "Validation failed." },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { error: result.error ?? "Failed to save your request." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: result.lead?.id });
  } catch (err) {
    console.error("[quote/api] Unexpected error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
