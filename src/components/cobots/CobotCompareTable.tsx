/**
 * CobotCompareTable - Side-by-side comparison of 2-3 cobots.
 * Can be embedded in MDX articles.
 *
 * Usage:
 *   <CobotCompareTable
 *     cobots={[
 *       { brand: "Universal Robots", model: "UR5e", payload: 5, reach: 850, repeatability: 0.03, dof: 6, speed: 1, priceRange: "$35k–$45k", applications: ["Assembly"] },
 *       { brand: "Universal Robots", model: "UR10e", payload: 12.5, reach: 1300, repeatability: 0.05, dof: 6, speed: 1, priceRange: "$45k–$60k", applications: ["Palletizing"] },
 *     ]}
 *   />
 */

import Link from "next/link";

export interface CobotSpec {
  brand: string;
  model: string;
  payload: number; // kg
  reach: number; // mm
  repeatability: number; // mm
  dof?: number; // degrees of freedom
  speed?: number; // m/s TCP speed
  priceRange?: string;
  applications?: string[];
  href?: string;
}

interface CobotCompareTableProps {
  cobots: CobotSpec[];
  className?: string;
}

type RowDef = {
  label: string;
  key: keyof CobotSpec;
  format?: (v: CobotSpec[keyof CobotSpec]) => string;
};

const rows: RowDef[] = [
  { label: "Payload", key: "payload", format: (v) => `${v} kg` },
  { label: "Reach", key: "reach", format: (v) => `${v} mm` },
  { label: "Repeatability", key: "repeatability", format: (v) => `±${v} mm` },
  { label: "Degrees of Freedom", key: "dof", format: (v) => (v ? `${v} DOF` : "—") },
  { label: "TCP Speed", key: "speed", format: (v) => (v ? `${v} m/s` : "—") },
  { label: "Est. Price", key: "priceRange", format: (v) => (v as string) || "Contact for price" },
];

function getBestIndex(cobots: CobotSpec[], key: keyof CobotSpec): number {
  // For numeric keys, highlight the highest value
  const numericKeys: (keyof CobotSpec)[] = ["payload", "reach", "speed", "dof"];
  if (!numericKeys.includes(key)) return -1;
  let best = -1;
  let bestVal = -Infinity;
  cobots.forEach((c, i) => {
    const v = c[key] as number;
    if (v !== undefined && v > bestVal) {
      bestVal = v;
      best = i;
    }
  });
  return best;
}

export default function CobotCompareTable({ cobots = [], className = "" }: CobotCompareTableProps) {
  if (!cobots || cobots.length === 0) return null;

  return (
    <div className={`overflow-x-auto rounded-2xl border border-gray-200 shadow-sm ${className}`}>
      <table className="w-full text-sm border-collapse" role="table" aria-label="Cobot comparison">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-36">
              Specification
            </th>
            {cobots.map((cobot) => (
              <th
                key={`${cobot.brand}-${cobot.model}`}
                className="px-4 py-3 text-center"
                scope="col"
              >
                <div className="text-xs text-gray-500 font-medium">{cobot.brand}</div>
                <div className="text-base font-bold text-gray-900">
                  {cobot.href ? (
                    <Link href={cobot.href} className="text-blue-600 hover:underline">
                      {cobot.model}
                    </Link>
                  ) : (
                    cobot.model
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => {
            const bestIdx = getBestIndex(cobots, row.key);
            return (
              <tr
                key={row.key}
                className={rowIdx % 2 === 0 ? "bg-white" : "bg-gray-50/50"}
              >
                <td className="px-4 py-3 text-xs font-medium text-gray-500">{row.label}</td>
                {cobots.map((cobot, colIdx) => {
                  const raw = cobot[row.key];
                  const display = raw !== undefined && row.format ? row.format(raw) : (raw as string) || "—";
                  const isBest = colIdx === bestIdx;
                  return (
                    <td
                      key={colIdx}
                      className={`px-4 py-3 text-center font-semibold ${isBest ? "text-blue-600 bg-blue-50" : "text-gray-800"}`}
                    >
                      {display}
                      {isBest && (
                        <span className="ml-1 text-xs text-blue-400" aria-label="highest value">
                          ▲
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}

          {/* Applications row */}
          <tr className="bg-white border-t border-gray-200">
            <td className="px-4 py-3 text-xs font-medium text-gray-500">Applications</td>
            {cobots.map((cobot, i) => (
              <td key={i} className="px-4 py-3 text-center">
                <div className="flex flex-wrap gap-1 justify-center">
                  {(cobot.applications ?? []).map((app) => (
                    <span
                      key={app}
                      className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 text-xs font-medium"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </td>
            ))}
          </tr>
        </tbody>

        {/* CTA footer */}
        <tfoot>
          <tr className="bg-gray-50 border-t border-gray-200">
            <td className="px-4 py-3 text-xs text-gray-400">Learn more</td>
            {cobots.map((cobot, i) => (
              <td key={i} className="px-4 py-3 text-center">
                <Link
                  href="/guides/best-cobot-arms"
                  className="inline-block px-4 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
                >
                  Compare
                </Link>
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
