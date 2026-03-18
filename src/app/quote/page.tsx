import type { Metadata } from "next";
import { Suspense } from "react";
import QuoteForm from "./QuoteForm";

export const metadata: Metadata = {
  title: "Get a Free Cobot Quote — Connect with Authorized Distributors",
  description:
    "Tell us about your cobot application and get matched with authorized distributors in your region. Free, no obligation.",
};

export default function QuotePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            Free &amp; No Obligation
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            Get a Free Cobot Quote
          </h1>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            Tell us about your application and we will connect you with authorized distributors in your region for accurate pricing.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Suspense fallback={
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center text-gray-400 text-sm">
            Loading form...
          </div>
        }>
          <QuoteForm />
        </Suspense>

        {/* Trust signals */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          {[
            { icon: "🔒", text: "Your info is private" },
            { icon: "📨", text: "No spam — ever" },
            { icon: "⚡", text: "Response within 24h" },
          ].map((item) => (
            <div key={item.text} className="flex flex-col items-center gap-1">
              <span className="text-2xl">{item.icon}</span>
              <span className="text-xs text-gray-500 font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
