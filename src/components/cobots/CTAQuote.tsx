/**
 * CTAQuote - "Get a Free Quote" call-to-action.
 *
 * Usage:
 *   // Inline variant (in article body)
 *   <CTAQuote variant="inline" />
 *
 *   // Banner variant (full-width section)
 *   <CTAQuote variant="banner" cobotModel="UR5e" cobotBrand="Universal Robots" />
 */

import Link from "next/link";

interface CTAQuoteProps {
  variant?: "inline" | "banner";
  cobotModel?: string;
  cobotBrand?: string;
  className?: string;
}

export default function CTAQuote({
  variant = "inline",
  cobotModel,
  cobotBrand,
  className = "",
}: CTAQuoteProps) {
  const quoteParams = new URLSearchParams();
  if (cobotModel) quoteParams.set("model", cobotModel);
  if (cobotBrand) quoteParams.set("brand", cobotBrand);
  const quoteHref = `/quote${quoteParams.size > 0 ? `?${quoteParams.toString()}` : ""}`;

  if (variant === "banner") {
    return (
      <section
        className={`bg-gradient-to-r from-blue-700 to-blue-800 py-12 ${className}`}
        aria-labelledby="cta-quote-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <h2 id="cta-quote-heading" className="text-2xl md:text-3xl font-bold text-white mb-2">
              {cobotModel
                ? `Get a Quote for the ${cobotBrand} ${cobotModel}`
                : "Get a Free Cobot Quote"}
            </h2>
            <p className="text-blue-100 text-base max-w-lg">
              Connect with authorized distributors in your region. No spam, no obligation — just accurate pricing for your application.
            </p>
          </div>
          <Link
            href={quoteHref}
            className="shrink-0 px-8 py-4 rounded-xl bg-orange-500 text-white font-bold text-lg hover:bg-orange-400 transition-colors shadow-lg"
          >
            Get Free Quote &rarr;
          </Link>
        </div>
      </section>
    );
  }

  // Inline variant
  return (
    <aside
      className={`rounded-2xl border-l-4 border-orange-400 bg-orange-50 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${className}`}
      aria-label="Get a free quote"
    >
      <div>
        <p className="text-sm font-bold text-gray-900 mb-0.5">
          {cobotModel
            ? `Ready to price the ${cobotBrand} ${cobotModel}?`
            : "Ready to get pricing for your project?"}
        </p>
        <p className="text-sm text-gray-600">
          Get a free, no-obligation quote from authorized distributors in your region.
        </p>
      </div>
      <Link
        href={quoteHref}
        className="shrink-0 px-5 py-2.5 rounded-lg bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors whitespace-nowrap"
      >
        Get Free Quote
      </Link>
    </aside>
  );
}
