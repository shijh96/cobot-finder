import type { Metadata } from "next";
import Link from "next/link";
import CobotCompareTable from "@/components/cobots/CobotCompareTable";
import type { CobotSpec } from "@/components/cobots/CobotCompareTable";

export const metadata: Metadata = {
  title: "Compare Cobots — Side-by-Side Spec Comparison",
  description:
    "Compare collaborative robots from Universal Robots, Fanuc, ABB, KUKA, and more. Side-by-side payload, reach, repeatability, and pricing.",
};

// Sample data for demonstration
const sampleCobots: CobotSpec[] = [
  {
    brand: "Universal Robots",
    model: "UR5e",
    payload: 5,
    reach: 850,
    repeatability: 0.03,
    dof: 6,
    speed: 1.0,
    priceRange: "$35k–$45k",
    applications: ["Assembly", "Machine Tending", "Gluing"],
    href: "/cobots/universal-robots/ur5e",
  },
  {
    brand: "Universal Robots",
    model: "UR10e",
    payload: 12.5,
    reach: 1300,
    repeatability: 0.05,
    dof: 6,
    speed: 1.0,
    priceRange: "$45k–$60k",
    applications: ["Palletizing", "Welding", "Assembly"],
    href: "/cobots/universal-robots/ur10e",
  },
  {
    brand: "Doosan Robotics",
    model: "H2017",
    payload: 20,
    reach: 1700,
    repeatability: 0.05,
    dof: 6,
    speed: 1.5,
    priceRange: "$55k–$75k",
    applications: ["Heavy Assembly", "Palletizing", "Welding"],
    href: "/cobots/doosan/h2017",
  },
];

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            Interactive Tool
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            Compare Cobots Side-by-Side
          </h1>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            Select models from top brands to compare payload, reach, repeatability, and pricing in one table.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Sample comparison */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Sample: UR5e vs UR10e vs Doosan H2017
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Here is an example comparison. Full interactive model selection coming soon.
          </p>
          <CobotCompareTable cobots={sampleCobots} />
        </div>

        {/* Coming soon notice */}
        <div className="rounded-2xl bg-blue-50 border border-blue-100 p-10 text-center mt-10">
          <div className="text-4xl mb-4">⚙️</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Interactive Comparison Tool</h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            We are building a full interactive comparison tool that lets you select any 2–4 cobots from our database and compare them instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/guides"
              className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors"
            >
              Browse Buying Guides
            </Link>
            <Link
              href="/quote"
              className="px-6 py-3 rounded-xl bg-orange-500 text-white font-semibold text-sm hover:bg-orange-600 transition-colors"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
