"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormData {
  // Step 1 - Application
  application: string;
  // Step 2 - Requirements
  payload: number;
  reach: number;
  brandPreference: string;
  // Step 3 - Company info
  company: string;
  contactName: string;
  email: string;
  phone: string;
  state: string;
  // Step 4 - Budget & Timeline
  budget: string;
  timeline: string;
  notes: string;
}

const INITIAL_DATA: FormData = {
  application: "",
  payload: 10,
  reach: 1000,
  brandPreference: "",
  company: "",
  contactName: "",
  email: "",
  phone: "",
  state: "",
  budget: "",
  timeline: "",
  notes: "",
};

const APPLICATIONS = [
  { value: "welding", label: "Welding (MIG/TIG/Spot)" },
  { value: "palletizing", label: "Palletizing & Depalletizing" },
  { value: "assembly", label: "Assembly & Fastening" },
  { value: "machine-tending", label: "Machine Tending (CNC, Molding)" },
  { value: "pick-place", label: "Pick & Place" },
  { value: "inspection", label: "Quality Inspection & Vision" },
  { value: "dispensing", label: "Dispensing & Gluing" },
  { value: "other", label: "Other" },
];

const BRANDS = [
  { value: "", label: "No preference / Show all options" },
  { value: "universal-robots", label: "Universal Robots" },
  { value: "fanuc", label: "Fanuc" },
  { value: "abb", label: "ABB" },
  { value: "kuka", label: "KUKA" },
  { value: "doosan", label: "Doosan Robotics" },
  { value: "techman", label: "Techman Robot" },
];

const BUDGETS = [
  { value: "under-30k", label: "Under $30,000" },
  { value: "30k-60k", label: "$30,000 – $60,000" },
  { value: "60k-100k", label: "$60,000 – $100,000" },
  { value: "100k-200k", label: "$100,000 – $200,000" },
  { value: "over-200k", label: "Over $200,000" },
  { value: "unknown", label: "Not sure yet" },
];

const TIMELINES = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-3months", label: "1–3 months" },
  { value: "3-6months", label: "3–6 months" },
  { value: "6-12months", label: "6–12 months" },
  { value: "over-1year", label: "More than 1 year" },
  { value: "exploring", label: "Just exploring / no timeline yet" },
];

const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
  "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire",
  "New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio",
  "Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota",
  "Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia",
  "Wisconsin","Wyoming","Other / International",
];

const STEP_TITLES = [
  "Your Application",
  "Requirements",
  "Your Company",
  "Budget & Timeline",
];

// ─── Step Indicator ───────────────────────────────────────────────────────────

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-8" role="progressbar" aria-valuenow={current + 1} aria-valuemax={total} aria-valuetext={`Step ${current + 1} of ${total}: ${STEP_TITLES[current]}`}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
              i < current
                ? "bg-blue-600 text-white"
                : i === current
                ? "bg-blue-600 text-white ring-4 ring-blue-100"
                : "bg-gray-200 text-gray-500"
            }`}
            aria-hidden="true"
          >
            {i < current ? "✓" : i + 1}
          </div>
          {i < total - 1 && (
            <div
              className={`h-0.5 w-8 sm:w-16 transition-colors ${i < current ? "bg-blue-600" : "bg-gray-200"}`}
              aria-hidden="true"
            />
          )}
        </div>
      ))}
      <span className="ml-2 text-sm font-medium text-gray-600">
        {STEP_TITLES[current]}
      </span>
    </div>
  );
}

// ─── Field Components ─────────────────────────────────────────────────────────

function Label({ htmlFor, children, required }: { htmlFor: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-semibold text-gray-700 mb-1.5">
      {children}
      {required && <span className="text-orange-500 ml-1" aria-label="required">*</span>}
    </label>
  );
}

function Select({ id, value, onChange, options, required, placeholder }: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
    >
      {placeholder && <option value="" disabled>{placeholder}</option>}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
}

function Input({ id, type = "text", value, onChange, placeholder, required }: {
  id: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-gray-400"
    />
  );
}

function Slider({ id, label, value, onChange, min, max, step, unit }: {
  id: string;
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  unit: string;
}) {
  return (
    <div>
      <Label htmlFor={id}>
        {label}
        <span className="ml-2 font-bold text-blue-600">{value} {unit}</span>
      </Label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-600 mt-1"
        aria-label={`${label}: ${value} ${unit}`}
      />
      <div className="flex justify-between text-xs text-gray-400 mt-1">
        <span>{min} {unit}</span>
        <span>{max} {unit}</span>
      </div>
    </div>
  );
}

// ─── Main Form Component ──────────────────────────────────────────────────────

export default function QuoteForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [data, setData] = useState<FormData>({
    ...INITIAL_DATA,
    brandPreference: searchParams.get("brand") ?? "",
  });

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  function canAdvance(): boolean {
    if (step === 0) return data.application !== "";
    if (step === 2) return (
      data.company.trim() !== "" &&
      data.contactName.trim() !== "" &&
      data.email.trim() !== "" &&
      data.state !== ""
    );
    if (step === 3) return data.budget !== "" && data.timeline !== "";
    return true;
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, website: honeypot }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error((json as { error?: string }).error ?? "Submission failed. Please try again.");
      }
      router.push("/quote/thank-you");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
      {/* Honeypot field — hidden from real users, bots will fill it */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>
      <StepIndicator current={step} total={4} />

      {/* Step 1 – Application */}
      {step === 0 && (
        <fieldset>
          <legend className="text-lg font-bold text-gray-900 mb-1">What will the cobot be doing?</legend>
          <p className="text-gray-500 text-sm mb-6">
            Choose the primary application. This helps us recommend the right payload range and tooling.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {APPLICATIONS.map((app) => (
              <button
                key={app.value}
                type="button"
                onClick={() => update("application", app.value)}
                className={`text-left px-4 py-3.5 rounded-xl border-2 text-sm font-medium transition-all ${
                  data.application === app.value
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                }`}
                aria-pressed={data.application === app.value}
              >
                {app.label}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {/* Step 2 – Requirements */}
      {step === 1 && (
        <fieldset>
          <legend className="text-lg font-bold text-gray-900 mb-1">What are your requirements?</legend>
          <p className="text-gray-500 text-sm mb-6">
            Approximate values are fine — distributors will confirm exact specs.
          </p>
          <div className="space-y-6">
            <Slider
              id="payload"
              label="Required payload"
              value={data.payload}
              onChange={(v) => update("payload", v)}
              min={1}
              max={35}
              step={1}
              unit="kg"
            />
            <Slider
              id="reach"
              label="Required reach"
              value={data.reach}
              onChange={(v) => update("reach", v)}
              min={400}
              max={1900}
              step={50}
              unit="mm"
            />
            <div>
              <Label htmlFor="brandPreference">Brand preference (optional)</Label>
              <Select
                id="brandPreference"
                value={data.brandPreference}
                onChange={(v) => update("brandPreference", v)}
                options={BRANDS}
              />
            </div>
          </div>
        </fieldset>
      )}

      {/* Step 3 – Company Info */}
      {step === 2 && (
        <fieldset>
          <legend className="text-lg font-bold text-gray-900 mb-1">Your company details</legend>
          <p className="text-gray-500 text-sm mb-6">
            We use this to connect you with distributors in your region.
          </p>
          <div className="space-y-4">
            <div>
              <Label htmlFor="company" required>Company name</Label>
              <Input
                id="company"
                value={data.company}
                onChange={(v) => update("company", v)}
                placeholder="Acme Manufacturing LLC"
                required
              />
            </div>
            <div>
              <Label htmlFor="contactName" required>Your name</Label>
              <Input
                id="contactName"
                value={data.contactName}
                onChange={(v) => update("contactName", v)}
                placeholder="Jane Smith"
                required
              />
            </div>
            <div>
              <Label htmlFor="email" required>Work email</Label>
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={(v) => update("email", v)}
                placeholder="jane@acme.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone (optional)</Label>
              <Input
                id="phone"
                type="tel"
                value={data.phone}
                onChange={(v) => update("phone", v)}
                placeholder="+1 (555) 000-0000"
              />
            </div>
            <div>
              <Label htmlFor="state" required>State / Region</Label>
              <Select
                id="state"
                value={data.state}
                onChange={(v) => update("state", v)}
                placeholder="Select your state..."
                options={US_STATES.map((s) => ({ value: s, label: s }))}
                required
              />
            </div>
          </div>
        </fieldset>
      )}

      {/* Step 4 – Budget & Timeline */}
      {step === 3 && (
        <fieldset>
          <legend className="text-lg font-bold text-gray-900 mb-1">Budget &amp; timeline</legend>
          <p className="text-gray-500 text-sm mb-6">
            This helps distributors prepare the right proposal for you.
          </p>
          <div className="space-y-4">
            <div>
              <Label htmlFor="budget" required>Total budget (hardware + integration)</Label>
              <Select
                id="budget"
                value={data.budget}
                onChange={(v) => update("budget", v)}
                placeholder="Select budget range..."
                options={BUDGETS}
                required
              />
            </div>
            <div>
              <Label htmlFor="timeline" required>When are you looking to deploy?</Label>
              <Select
                id="timeline"
                value={data.timeline}
                onChange={(v) => update("timeline", v)}
                placeholder="Select timeline..."
                options={TIMELINES}
                required
              />
            </div>
            <div>
              <Label htmlFor="notes">Additional notes (optional)</Label>
              <textarea
                id="notes"
                value={data.notes}
                onChange={(e) => update("notes", e.target.value)}
                rows={4}
                placeholder="Tell us more about your production line, throughput requirements, existing equipment, etc."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-gray-400 resize-none"
              />
            </div>
          </div>
        </fieldset>
      )}

      {/* Error message */}
      {error && (
        <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700" role="alert">
          {error}
        </div>
      )}

      {/* Navigation */}
      <div className={`flex mt-8 gap-3 ${step > 0 ? "justify-between" : "justify-end"}`}>
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            disabled={submitting}
            className="px-6 py-3 rounded-xl border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            &larr; Back
          </button>
        )}
        {step < 3 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            disabled={!canAdvance()}
            className="px-8 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next &rarr;
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canAdvance() || submitting}
            className="px-8 py-3 rounded-xl bg-orange-500 text-white text-sm font-bold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Submitting..." : "Submit Request"}
          </button>
        )}
      </div>
    </div>
  );
}
