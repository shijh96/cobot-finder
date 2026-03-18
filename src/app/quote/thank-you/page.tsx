import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Request Received — CobotFinder",
  description: "Your cobot quote request has been received. We will connect you with authorized distributors shortly.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center bg-white rounded-2xl border border-gray-200 shadow-sm p-10">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6 text-3xl">
          ✓
        </div>
        <h1 className="text-2xl font-extrabold text-gray-900 mb-3">
          Request received!
        </h1>
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          We have received your quote request and will connect you with authorized distributors in your region within <strong>24 hours</strong>.
        </p>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-8 text-sm text-blue-800 text-left space-y-1">
          <p className="font-semibold mb-1">What happens next:</p>
          <p>1. Our team reviews your application requirements</p>
          <p>2. We match you with 1–3 authorized distributors in your state</p>
          <p>3. Distributors reach out with tailored proposals</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/guides"
            className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors"
          >
            Browse Guides
          </Link>
          <Link
            href="/calculator"
            className="flex-1 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            Calculate ROI
          </Link>
        </div>
      </div>
    </div>
  );
}
