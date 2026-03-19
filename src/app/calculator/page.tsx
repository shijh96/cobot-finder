import type { Metadata } from "next";
import Link from "next/link";
import ROICalculatorMini from "@/components/cobots/ROICalculatorMini";

export const metadata: Metadata = {
  title: "Cobot ROI Calculator — Estimate Payback Period & Annual Savings",
  description:
    "Free cobot ROI calculator. Enter your labor costs, production hours, and cobot price to estimate payback period and 5-year net savings.",
  alternates: { canonical: "/calculator" },
  openGraph: {
    title: "Cobot ROI Calculator — Estimate Payback Period & Annual Savings",
    description: "Free cobot ROI calculator. Estimate payback period and 5-year net savings.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Cobot ROI Calculator
          </h1>
          <p className="text-gray-500 text-sm max-w-xl">
            Estimate payback period, annual savings, and 5-year net gain for your cobot
            investment — in under 60 seconds.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator widget */}
          <div className="lg:col-span-2">
            <ROICalculatorMini className="shadow-sm" />
          </div>

          {/* Sidebar: context */}
          <aside className="space-y-4">
            <div className="rounded-lg bg-white border border-gray-200 p-5">
              <h2 className="font-semibold text-gray-900 mb-3 text-sm">How to use this calculator</h2>
              <ol className="space-y-2 text-sm text-gray-600 list-decimal list-inside">
                <li>Set the number of workers the cobot will replace</li>
                <li>Enter their average hourly wage (including benefits)</li>
                <li>Set daily production hours (cobots can run 24/7)</li>
                <li>Enter your estimated total cobot + integration cost</li>
              </ol>
            </div>

            <div className="rounded-lg bg-white border border-gray-200 p-5">
              <h2 className="font-semibold text-gray-900 mb-3 text-sm">What is included in cobot cost?</h2>
              <ul className="space-y-1.5 text-sm text-gray-600">
                <li className="flex gap-2"><span className="text-blue-500">·</span> Robot hardware (arm + controller)</li>
                <li className="flex gap-2"><span className="text-blue-500">·</span> End-of-arm tooling (gripper, welder)</li>
                <li className="flex gap-2"><span className="text-blue-500">·</span> System integration &amp; programming</li>
                <li className="flex gap-2"><span className="text-blue-500">·</span> Safety assessment &amp; fencing</li>
                <li className="flex gap-2"><span className="text-blue-500">·</span> Training for operators</li>
              </ul>
            </div>

            <div className="rounded-lg bg-orange-50 border border-orange-200 p-5">
              <p className="text-sm font-semibold text-gray-900 mb-1">Need an accurate quote?</p>
              <p className="text-xs text-gray-500 mb-3">
                Get real pricing from authorized distributors based on your specific application.
              </p>
              <Link
                href="/quote"
                className="block text-center py-2 rounded-md bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors"
              >
                Get Free Quote
              </Link>
            </div>
          </aside>
        </div>

        {/* Explainer section */}
        <div className="mt-10 bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Understanding Cobot ROI
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Typical payback periods</h3>
              <p>Most cobot deployments pay back in 12–24 months. High-volume, multi-shift operations often see payback in as little as 8–10 months.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Hidden cost factors</h3>
              <p>Remember to factor in: integration engineering ($5k–$25k), ongoing maintenance contracts (5–8% of hardware cost/year), and operator training time.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Beyond labor savings</h3>
              <p>Cobots also deliver: improved quality consistency, reduced scrap, 24/7 production capacity, and redeployment flexibility across product lines.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
