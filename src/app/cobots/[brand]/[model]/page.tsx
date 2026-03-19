import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import CTAQuote from "@/components/cobots/CTAQuote";

interface CobotPageProps {
  params: Promise<{ brand: string; model: string }>;
}

function formatName(slug: string) {
  return slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

export async function generateMetadata({ params }: CobotPageProps): Promise<Metadata> {
  const { brand, model } = await params;
  const brandName = formatName(brand);
  const modelName = model.toUpperCase();

  return {
    title: `${brandName} ${modelName} Cobot — Specs, Pricing & Review`,
    description: `Full spec sheet, pricing estimate, and use case analysis for the ${brandName} ${modelName} collaborative robot.`,
    alternates: { canonical: `/cobots/${brand}/${model}` },
    robots: { index: false, follow: true },
    openGraph: {
      title: `${brandName} ${modelName} Cobot — Specs, Pricing & Review`,
      description: `Full spec sheet, pricing estimate, and use case analysis for the ${brandName} ${modelName}.`,
      type: 'article',
    },
    twitter: { card: 'summary_large_image' },
  };
}

export default async function CobotPage({ params }: CobotPageProps) {
  notFound(); // Placeholder page — not ready for production
  const { brand, model } = await params;
  const brandName = formatName(brand);
  const modelName = model.toUpperCase();

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
            <span>/</span>
            <Link href={`/brands/${brand}`} className="hover:text-gray-900 transition-colors">{brandName}</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{modelName}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
              {brandName} {modelName}
            </h1>
            <p className="text-gray-500 text-sm mb-6">
              Collaborative Robot · {brandName}
            </p>

            <div className="rounded-2xl bg-blue-50 border border-blue-100 p-8 text-center mb-8">
              <div className="text-4xl mb-4">🤖</div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Product Data Coming Soon</h2>
              <p className="text-gray-600">
                Full specs, pricing, and analysis for the {brandName} {modelName} are being added.
              </p>
            </div>

            <CTAQuote variant="inline" cobotBrand={brandName} cobotModel={modelName} />
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            <div className="rounded-2xl border border-gray-200 p-5">
              <h2 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide">
                Quick Links
              </h2>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/compare" className="text-blue-600 hover:underline">
                    Compare this cobot &rarr;
                  </Link>
                </li>
                <li>
                  <Link href="/calculator" className="text-blue-600 hover:underline">
                    Calculate ROI &rarr;
                  </Link>
                </li>
                <li>
                  <Link href={`/brands/${brand}`} className="text-blue-600 hover:underline">
                    All {brandName} cobots &rarr;
                  </Link>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5">
              <p className="text-sm font-semibold text-gray-900 mb-2">
                Get pricing for your application
              </p>
              <p className="text-xs text-gray-600 mb-3">
                Contact authorized distributors for accurate quotes based on your specific requirements.
              </p>
              <Link
                href={`/quote?brand=${encodeURIComponent(brandName)}&model=${encodeURIComponent(modelName)}`}
                className="block text-center py-2 rounded-lg bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors"
              >
                Get Free Quote
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <CTAQuote variant="banner" cobotBrand={brandName} cobotModel={modelName} />
    </div>
  );
}
