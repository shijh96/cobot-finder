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
        className={`bg-gray-900 py-10 rounded-xl ${className}`}
        aria-labelledby="cta-quote-heading"
      >
        <div className="max-w-3xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h2 id="cta-quote-heading" className="text-xl font-bold text-white mb-1.5">
              {cobotModel
                ? `Get a Quote for the ${cobotBrand} ${cobotModel}`
                : "Get a Free Cobot Quote"}
            </h2>
            <p className="text-gray-400 text-sm max-w-md">
              Connect with authorized distributors in your region. No spam, no obligation.
            </p>
          </div>
          <Link
            href={quoteHref}
            className="shrink-0 px-6 py-2.5 rounded-lg bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors"
          >
            Request Quote
          </Link>
        </div>
      </section>
    );
  }

  // Inline variant
  return (
    <aside
      className={`rounded-lg border border-blue-200 bg-blue-50/50 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${className}`}
      aria-label="Get a free quote"
    >
      <div>
        <p className="text-sm font-semibold text-gray-900 mb-0.5">
          {cobotModel
            ? `Ready to price the ${cobotBrand} ${cobotModel}?`
            : "Need pricing for your project?"}
        </p>
        <p className="text-xs text-gray-500">
          Free, no-obligation quotes from authorized distributors.
        </p>
      </div>
      <Link
        href={quoteHref}
        className="shrink-0 px-4 py-2 rounded-md bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap"
      >
        Get Quote
      </Link>
    </aside>
  );
}
