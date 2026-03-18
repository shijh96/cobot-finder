/**
 * CobotCard - Displays a cobot's key specs with action buttons.
 *
 * Usage:
 *   <CobotCard
 *     brand="Universal Robots"
 *     model="UR5e"
 *     payload={5}
 *     reach={850}
 *     repeatability={0.03}
 *     priceRange="$35,000 – $45,000"
 *     applications={["Assembly", "Machine Tending"]}
 *     href="/cobots/universal-robots/ur5e"
 *   />
 */

import Link from "next/link";

export interface CobotCardProps {
  brand: string;
  model: string;
  payload: number; // kg
  reach: number; // mm
  repeatability?: number; // mm
  priceRange?: string;
  applications?: string[];
  href: string;
  className?: string;
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-1.5 border-b border-gray-100 last:border-0">
      <span className="text-xs text-gray-500">{label}</span>
      <span className="text-xs font-semibold text-gray-800">{value}</span>
    </div>
  );
}

export default function CobotCard({
  brand,
  model,
  payload,
  reach,
  repeatability,
  priceRange,
  applications = [],
  href,
  className = "",
}: CobotCardProps) {
  return (
    <article
      className={`bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col ${className}`}
      aria-label={`${brand} ${model} cobot`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-4">
        <p className="text-blue-200 text-xs font-medium uppercase tracking-wider">{brand}</p>
        <h3 className="text-white text-xl font-bold mt-0.5">{model}</h3>
      </div>

      {/* Specs */}
      <div className="px-5 py-4 flex-1">
        <div className="mb-4">
          <SpecRow label="Payload" value={`${payload} kg`} />
          <SpecRow label="Reach" value={`${reach} mm`} />
          {repeatability !== undefined && (
            <SpecRow label="Repeatability" value={`±${repeatability} mm`} />
          )}
          {priceRange && (
            <SpecRow label="Est. Price" value={priceRange} />
          )}
        </div>

        {/* Application tags */}
        {applications.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {applications.map((app) => (
              <span
                key={app}
                className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-xs font-medium"
              >
                {app}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-5 py-4 border-t border-gray-100 flex gap-2">
        <Link
          href={href}
          className="flex-1 text-center py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
        >
          View Details
        </Link>
        <Link
          href={`/quote?model=${encodeURIComponent(model)}&brand=${encodeURIComponent(brand)}`}
          className="flex-1 text-center py-2 rounded-lg border border-orange-400 text-orange-600 text-sm font-semibold hover:bg-orange-50 transition-colors"
        >
          Get Quote
        </Link>
      </div>
    </article>
  );
}
