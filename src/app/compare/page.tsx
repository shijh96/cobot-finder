import type { Metadata } from "next";
import Link from "next/link";
import CobotCompareTable from "@/components/cobots/CobotCompareTable";
import type { CobotSpec } from "@/components/cobots/CobotCompareTable";

export const metadata: Metadata = {
  title: "Compare Cobots — Side-by-Side Spec Comparison",
  description:
    "Compare collaborative robots from Universal Robots, Fanuc, ABB, KUKA, and more. Side-by-side payload, reach, repeatability, and pricing.",
  alternates: { canonical: "/compare" },
  openGraph: {
    title: "Compare Cobots — Side-by-Side Spec Comparison",
    description: "Compare collaborative robots from Universal Robots, Fanuc, ABB, KUKA, and more.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Compare Cobots Side-by-Side
          </h1>
          <p className="text-gray-500 text-sm max-w-xl">
            Compare payload, reach, repeatability, and pricing across top cobot brands in one table.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Sample comparison */}
        <div className="mb-6">
          <h2 className="text-base font-semibold text-gray-900 mb-1">
            Sample: UR5e vs UR10e vs Doosan H2017
          </h2>
          <p className="text-gray-400 text-xs mb-5">
            Example comparison — full interactive model selection coming soon.
          </p>
          <CobotCompareTable cobots={sampleCobots} />
        </div>

        {/* Coming soon notice */}
        <p className="mt-8 text-sm text-gray-500 border-t border-gray-200 pt-6">
          Full interactive comparison tool — select any 2–4 cobots from our database — is in
          development.{" "}
          <Link href="/guides" className="text-blue-600 hover:underline">
            Browse buying guides
          </Link>{" "}
          or{" "}
          <Link href="/quote" className="text-blue-600 hover:underline">
            get a quote
          </Link>{" "}
          in the meantime.
        </p>
      </div>
    </div>
  );
}
