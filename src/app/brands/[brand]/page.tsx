import type { Metadata } from "next";
import Link from "next/link";
import CTAQuote from "@/components/cobots/CTAQuote";

interface BrandPageProps {
  params: Promise<{ brand: string }>;
}

function formatBrandName(slug: string): string {
  const brandMap: Record<string, string> = {
    "universal-robots": "Universal Robots",
    fanuc: "Fanuc",
    abb: "ABB",
    kuka: "KUKA",
    doosan: "Doosan Robotics",
    techman: "Techman Robot",
  };
  return brandMap[slug] ?? slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

export async function generateMetadata({ params }: BrandPageProps): Promise<Metadata> {
  const { brand } = await params;
  const brandName = formatBrandName(brand);
  return {
    title: `${brandName} Cobots — Full Model Lineup & Specs`,
    description: `Browse all ${brandName} collaborative robots. Compare payload, reach, and pricing to find the right model for your application.`,
  };
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { brand } = await params;
  const brandName = formatBrandName(brand);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/guides" className="hover:text-gray-900 transition-colors">Brands</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{brandName}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mb-6 text-2xl font-bold text-white">
            {brandName.charAt(0)}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            {brandName} Cobots
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            Full lineup of {brandName} collaborative robots — compare payload, reach, repeatability, and pricing to find the right model for your automation project.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Placeholder */}
        <div className="rounded-2xl bg-blue-50 border border-blue-100 p-12 text-center">
          <div className="text-4xl mb-4">📋</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">{brandName} Model Data Coming Soon</h2>
          <p className="text-gray-600 mb-6">
            We are building out the full {brandName} cobot lineup with specs, pricing estimates, and use case fit guides.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/compare"
              className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors"
            >
              Compare Cobots
            </Link>
            <Link
              href="/guides"
              className="px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors"
            >
              Browse Guides
            </Link>
          </div>
        </div>
      </div>

      <CTAQuote variant="banner" />
    </div>
  );
}
