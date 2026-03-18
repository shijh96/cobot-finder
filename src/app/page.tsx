import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "CobotFinder — Find the Right Cobot for Your Factory",
  description:
    "Compare collaborative robots across brands, calculate ROI, and get quotes from authorized distributors. Independent cobot buying guides for welding, palletizing, assembly, and more.",
};

const useCases = [
  {
    title: "Welding",
    icon: "🔧",
    description:
      "Arc and spot welding cobots that improve weld consistency and protect workers from fumes.",
    href: "/guides/cobots-for-welding",
    tags: ["Arc Welding", "MIG/TIG", "Spot Welding"],
  },
  {
    title: "Palletizing",
    icon: "📦",
    description:
      "High-payload cobots for end-of-line palletizing that cut labor costs and reduce back injuries.",
    href: "/guides/cobots-for-palletizing",
    tags: ["High Payload", "End-of-Line", "Stacking"],
  },
  {
    title: "Assembly",
    icon: "⚙️",
    description:
      "Precision assembly cobots for electronics, automotive parts, and consumer goods manufacturing.",
    href: "/guides/cobots-for-assembly",
    tags: ["Precision", "Screw Driving", "Pick & Place"],
  },
  {
    title: "Machine Tending",
    icon: "🏭",
    description:
      "Load and unload CNC machines, injection molders, and presses around the clock.",
    href: "/guides/cobots-for-machine-tending",
    tags: ["CNC", "Injection Molding", "24/7 Operation"],
  },
];

const brands = [
  { name: "Universal Robots", country: "Denmark", share: "#1 Market Share" },
  { name: "Fanuc", country: "Japan", share: "Industry Leader" },
  { name: "ABB", country: "Switzerland", share: "GoFa Series" },
  { name: "KUKA", country: "Germany", share: "LBR Series" },
  { name: "Doosan Robotics", country: "South Korea", share: "H Series" },
  { name: "Techman Robot", country: "Taiwan", share: "Built-in Vision" },
];

const stats = [
  { value: "10", label: "Cobot Models" },
  { value: "6", label: "Major Brands" },
  { value: "2+", label: "In-Depth Guides" },
  { value: "Free", label: "Independent Guidance" },
];

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-orange-50 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            Independent Cobot Buying Guidance
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
            Find the Right Cobot
            <br />
            <span className="text-blue-600">for Your Factory</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Compare collaborative robots across brands, calculate ROI, and get quotes from authorized distributors — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/guides"
              className="px-8 py-4 rounded-xl bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100"
            >
              Browse Guides
            </Link>
            <Link
              href="/compare"
              className="px-8 py-4 rounded-xl bg-white text-gray-800 font-semibold text-lg border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
            >
              Compare Cobots
            </Link>
          </div>

          {/* Stats row */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-blue-600">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Find Cobots by Use Case
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Every application has different payload, reach, and precision requirements. Start with your use case.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase) => (
              <Link
                key={useCase.title}
                href={useCase.href}
                className="group p-6 rounded-2xl border border-gray-200 bg-white hover:border-blue-300 hover:shadow-lg transition-all duration-200"
              >
                <div className="text-4xl mb-4">{useCase.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  Cobots for {useCase.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                  {useCase.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {useCase.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4 text-sm font-medium text-blue-600 group-hover:underline">
                  Read guide &rarr;
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator CTA */}
      <section className="py-16 bg-orange-50 border-y border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              How fast will a cobot pay for itself?
            </h2>
            <p className="text-gray-600 max-w-lg">
              Use our free ROI calculator to estimate payback period and annual savings based on your labor costs and production volume.
            </p>
          </div>
          <Link
            href="/calculator"
            className="shrink-0 px-8 py-4 rounded-xl bg-orange-500 text-white font-semibold text-lg hover:bg-orange-600 transition-colors shadow-lg shadow-orange-100"
          >
            Calculate ROI Free &rarr;
          </Link>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Latest Guides & Articles</h2>
              <p className="text-gray-500">In-depth cobot buying guides, comparisons, and ROI analyses.</p>
            </div>
            <Link href="/guides" className="hidden md:block text-blue-600 font-medium hover:underline">
              View all guides &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/guides/${post.slug}`}
                className="group bg-white rounded-2xl border border-gray-200 p-6 hover:border-blue-200 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                    {post.category}
                  </span>
                  <span className="text-gray-400 text-xs">{post.readingTime}</span>
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{post.description}</p>
                <div className="mt-4 text-sm font-medium text-blue-600 group-hover:underline">
                  Read more &rarr;
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/guides" className="text-blue-600 font-medium hover:underline">
              View all guides &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Trusted Brands Section */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-medium uppercase tracking-widest text-gray-400 mb-2">
              Brands we cover
            </p>
            <h2 className="text-2xl font-bold text-gray-900">
              Compare Top Cobot Manufacturers
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brands.map((brand) => (
              <Link
                key={brand.name}
                href={`/brands/${brand.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="group flex flex-col items-center p-5 rounded-2xl border border-gray-200 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3 text-lg font-bold text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
                  {brand.name.charAt(0)}
                </div>
                <span className="text-sm font-semibold text-gray-800 group-hover:text-blue-700 transition-colors leading-tight">
                  {brand.name}
                </span>
                <span className="text-xs text-gray-400 mt-0.5">{brand.country}</span>
                <span className="text-xs text-blue-600 mt-1 font-medium">{brand.share}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to automate your production line?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
            Tell us about your application and get matched with authorized distributors in your region — free, no obligation.
          </p>
          <Link
            href="/quote"
            className="inline-block px-10 py-4 rounded-xl bg-orange-500 text-white font-bold text-lg hover:bg-orange-400 transition-colors shadow-lg"
          >
            Get a Free Quote
          </Link>
        </div>
      </section>
    </>
  );
}
