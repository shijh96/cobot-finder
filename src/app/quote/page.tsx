import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Suspense } from "react";
import QuoteForm from "./QuoteForm";

export const metadata: Metadata = {
  title: "Get a Free Cobot Quote — Connect with Authorized Distributors",
  description:
    "Tell us about your cobot application and get matched with authorized distributors in your region. Free, no obligation.",
  alternates: { canonical: "/quote" },
  openGraph: {
    title: "Get a Free Cobot Quote — Connect with Authorized Distributors",
    description: "Get matched with authorized cobot distributors in your region. Free, no obligation.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function QuotePage() {
  notFound(); // Not ready — no distributor network yet
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Get a Free Cobot Quote
          </h1>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Tell us about your application and we will connect you with authorized distributors
            in your region for accurate pricing. Free and no obligation.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center text-gray-400 text-sm">
            Loading form...
          </div>
        }>
          <QuoteForm />
        </Suspense>

        {/* Trust signals */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {[
            "Your info is private",
            "No spam — ever",
            "Response within 24h",
          ].map((item) => (
            <span key={item} className="flex items-center gap-1.5 text-xs text-gray-500">
              <svg
                className="h-3.5 w-3.5 shrink-0 text-green-500"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                  clipRule="evenodd"
                />
              </svg>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
