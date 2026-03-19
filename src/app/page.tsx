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
    label: "Welding",
    color: "bg-orange-500",
    description:
      "Arc and spot welding cobots that improve weld consistency and protect workers from fumes.",
    href: "/guides/cobots-for-welding",
    tags: ["Arc Welding", "MIG/TIG", "Spot Welding"],
  },
  {
    label: "Palletizing",
    color: "bg-blue-500",
    description:
      "High-payload cobots for end-of-line palletizing that cut labor costs and reduce back injuries.",
    href: "/guides/cobots-for-palletizing",
    tags: ["High Payload", "End-of-Line", "Stacking"],
  },
  {
    label: "Assembly",
    color: "bg-green-500",
    description:
      "Precision assembly cobots for electronics, automotive parts, and consumer goods manufacturing.",
    href: "/guides/cobots-for-assembly",
    tags: ["Precision", "Screw Driving", "Pick & Place"],
  },
  {
    label: "Machine Tending",
    color: "bg-purple-500",
    description:
      "Load and unload CNC machines, injection molders, and presses around the clock.",
    href: "/guides/cobots-for-machine-tending",
    tags: ["CNC", "Injection Molding", "24/7 Operation"],
  },
];

const brands = [
  { name: "Universal Robots", country: "Denmark" },
  { name: "Fanuc", country: "Japan" },
  { name: "ABB", country: "Switzerland" },
  { name: "KUKA", country: "Germany" },
  { name: "Doosan Robotics", country: "South Korea" },
  { name: "Techman Robot", country: "Taiwan" },
];

const stats = [
  { value: "10", label: "Cobot Models" },
  { value: "6", label: "Major Brands" },
  { value: "10+", label: "In-Depth Guides" },
  { value: "Free", label: "Independent Guidance" },
];

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <>
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
              Independent Cobot Buying Guidance
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-3 leading-tight">
              Find the Right Cobot for Your Factory
            </h1>
            <p className="text-base text-gray-500 mb-6">
              Compare collaborative robots by payload, reach, and price — with independent guides from industry experts.
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="/guides"
                className="px-4 py-2 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Browse Guides
              </Link>
              <Link
                href="/calculator"
                className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                ROI Calculator
              </Link>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className="bg-gray-50 border border-gray-200 rounded-lg grid grid-cols-2 md:grid-cols-4 md:divide-x divide-gray-200">
            {stats.map((stat) => (
              <div key={stat.label} className="px-6 py-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Browse by Application</h2>
            <p className="text-sm text-gray-500">
              Payload, reach, and IP rating requirements vary by use case. Start with your application.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {useCases.map((useCase) => (
              <Link
                key={useCase.label}
                href={useCase.href}
                className="group p-5 rounded-lg border border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className={`w-2 h-2 rounded-full ${useCase.color}`} />
                  <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    Cobots for {useCase.label}
                  </h3>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">
                  {useCase.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {useCase.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-3 text-xs font-medium text-blue-600 group-hover:underline">
                  Read guide &rarr;
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="py-14 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">Guides & Articles</h2>
              <p className="text-sm text-gray-500">
                In-depth cobot buying guides, comparisons, and ROI analyses.
              </p>
            </div>
            <Link
              href="/guides"
              className="hidden md:block text-sm text-blue-600 font-medium hover:underline py-1 px-2 -mr-2"
            >
              View all &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/guides/${post.slug}`}
                className="group bg-white rounded-lg border border-gray-200 p-5 hover:border-blue-200 hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-xs font-medium border border-blue-100">
                    {post.category}
                  </span>
                  <span className="text-gray-400 text-xs">{post.readingTime}</span>
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-1.5 group-hover:text-blue-600 transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                  {post.description}
                </p>
                <div className="mt-3 text-xs font-medium text-blue-600 group-hover:underline">
                  Read more &rarr;
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 text-center md:hidden">
            <Link href="/guides" className="text-sm text-blue-600 font-medium hover:underline">
              View all guides &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6 text-center">
            Brands we cover
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {brands.map((brand) => (
              <div
                key={brand.name}
                className="flex flex-col items-center gap-0.5"
              >
                <span className="text-sm font-semibold text-gray-700">
                  {brand.name}
                </span>
                <span className="text-xs text-gray-400">{brand.country}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-14 bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Ready to automate your production line?
          </h2>
          <p className="text-gray-400 text-sm mb-6 max-w-lg mx-auto">
            Explore our in-depth guides, calculate your ROI, and find the right cobot for your application.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              href="/guides"
              className="px-5 py-2.5 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition-colors"
            >
              Browse Guides
            </Link>
            <Link
              href="/guides"
              className="px-5 py-2.5 rounded-md border border-gray-600 text-gray-300 text-sm font-medium hover:border-gray-400 hover:text-white transition-colors"
            >
              Browse Guides
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
