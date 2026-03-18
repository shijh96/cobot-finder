"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "Guides", href: "/guides" },
  { label: "Compare", href: "/compare" },
  { label: "Calculator", href: "/calculator" },
  { label: "Get Quote", href: "/quote", highlight: true },
];

function RobotIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <rect x="9" y="7" width="6" height="4" rx="1" />
      <line x1="12" y1="3" x2="12" y2="7" />
      <circle cx="12" cy="3" r="1" />
      <line x1="7" y1="15" x2="7" y2="17" />
      <line x1="17" y1="15" x2="17" y2="17" />
      <line x1="9" y1="15" x2="15" y2="15" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-blue-700 hover:text-blue-800 transition-colors">
            <RobotIcon />
            <span className="text-xl font-bold tracking-tight text-gray-900">
              Cobot<span className="text-blue-600">Finder</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navItems.map((item) =>
              item.highlight ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className="ml-2 px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-gray-200 bg-white">
          <nav className="flex flex-col px-4 py-3 gap-1" aria-label="Mobile navigation">
            {navItems.map((item) =>
              item.highlight ? (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-lg bg-orange-500 text-white text-sm font-semibold text-center hover:bg-orange-600 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
