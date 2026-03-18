"use client";

/**
 * ROICalculatorMini - Simplified ROI calculator widget.
 * Embeddable in articles; links to full calculator page.
 *
 * Usage:
 *   <ROICalculatorMini defaultCobotCost={40000} />
 */

import Link from "next/link";
import { useState, useMemo } from "react";

interface ROICalculatorMiniProps {
  defaultCobotCost?: number;
  className?: string;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function ROICalculatorMini({
  defaultCobotCost = 40000,
  className = "",
}: ROICalculatorMiniProps) {
  const [workers, setWorkers] = useState(2);
  const [hourlyWage, setHourlyWage] = useState(22);
  const [cobotCost, setCobotCost] = useState(defaultCobotCost);
  const [hoursPerDay, setHoursPerDay] = useState(16);

  const results = useMemo(() => {
    // Annual labor cost for replaced shifts
    const annualLaborCost = workers * hourlyWage * hoursPerDay * 250;
    // Cobot operating cost estimate: ~$5/hour electricity + maintenance
    const cobotAnnualOpCost = hoursPerDay * 250 * 5;
    const annualSavings = annualLaborCost - cobotAnnualOpCost;
    const paybackMonths = annualSavings > 0 ? (cobotCost / annualSavings) * 12 : Infinity;
    const fiveYearSavings = annualSavings * 5 - cobotCost;

    return {
      annualSavings,
      paybackMonths: Math.round(paybackMonths),
      fiveYearSavings,
      annualLaborCost,
    };
  }, [workers, hourlyWage, cobotCost, hoursPerDay]);

  return (
    <div
      className={`rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 ${className}`}
      aria-label="ROI Calculator"
    >
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <line x1="8" y1="7" x2="16" y2="7" />
            <line x1="8" y1="11" x2="16" y2="11" />
            <line x1="8" y1="15" x2="13" y2="15" />
          </svg>
        </div>
        <h3 className="text-base font-bold text-gray-900">Quick ROI Calculator</h3>
      </div>

      <div className="space-y-4 mb-6">
        {/* Workers replaced */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Workers replaced by cobot
            <span className="ml-2 font-bold text-gray-900">{workers}</span>
          </label>
          <input
            type="range"
            min={1}
            max={6}
            step={1}
            value={workers}
            onChange={(e) => setWorkers(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-600"
            aria-label="Number of workers replaced"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-0.5">
            <span>1</span><span>6</span>
          </div>
        </div>

        {/* Hourly wage */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Average hourly wage (USD)
            <span className="ml-2 font-bold text-gray-900">${hourlyWage}/hr</span>
          </label>
          <input
            type="range"
            min={15}
            max={60}
            step={1}
            value={hourlyWage}
            onChange={(e) => setHourlyWage(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-600"
            aria-label="Average hourly wage"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-0.5">
            <span>$15</span><span>$60</span>
          </div>
        </div>

        {/* Hours per day */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Production hours per day
            <span className="ml-2 font-bold text-gray-900">{hoursPerDay} hrs</span>
          </label>
          <input
            type="range"
            min={8}
            max={24}
            step={4}
            value={hoursPerDay}
            onChange={(e) => setHoursPerDay(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-600"
            aria-label="Production hours per day"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-0.5">
            <span>8 hrs</span><span>24 hrs</span>
          </div>
        </div>

        {/* Cobot cost */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Cobot + integration cost (USD)
            <span className="ml-2 font-bold text-gray-900">{formatCurrency(cobotCost)}</span>
          </label>
          <input
            type="range"
            min={20000}
            max={150000}
            step={5000}
            value={cobotCost}
            onChange={(e) => setCobotCost(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-600"
            aria-label="Cobot and integration cost"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-0.5">
            <span>$20k</span><span>$150k</span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-white rounded-xl border border-gray-200 p-3 text-center">
          <div className="text-lg font-bold text-blue-600">
            {results.paybackMonths === Infinity ? "N/A" : `${results.paybackMonths}mo`}
          </div>
          <div className="text-xs text-gray-500 mt-0.5">Payback period</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-3 text-center">
          <div className="text-lg font-bold text-green-600">
            {formatCurrency(results.annualSavings)}
          </div>
          <div className="text-xs text-gray-500 mt-0.5">Annual savings</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-3 text-center">
          <div className="text-lg font-bold text-orange-500">
            {formatCurrency(results.fiveYearSavings)}
          </div>
          <div className="text-xs text-gray-500 mt-0.5">5-year net gain</div>
        </div>
      </div>

      <p className="text-xs text-gray-400 mb-4">
        * Estimates assume 250 working days/year. Actual results vary by application.
      </p>

      <Link
        href="/calculator"
        className="block w-full text-center py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
      >
        Full ROI Calculator with Detailed Report &rarr;
      </Link>
    </div>
  );
}
