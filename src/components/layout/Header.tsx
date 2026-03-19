"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "Guides", href: "/guides" },
  { label: "Compare", href: "/compare" },
  { label: "ROI Calculator", href: "/calculator" },
];

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5 shrink-0">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
              <span className="text-white text-xs font-black">CF</span>
            </div>
            <span className="text-base font-bold tracking-tight text-gray-900">
              Cobot<span className="text-blue-600">Finder</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-0.5" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-1.5 rounded-md text-[13px] font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="w-px h-5 bg-gray-200 mx-2" />
            <Link
              href="/quote"
              className="px-3.5 py-1.5 rounded-md bg-blue-600 text-white text-[13px] font-semibold hover:bg-blue-700 transition-colors"
            >
              Get Quote
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-1.5 rounded-md text-gray-500 hover:bg-gray-100 transition-colors"
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
        <div id="mobile-menu" className="md:hidden border-t border-gray-100 bg-white">
          <nav className="flex flex-col px-4 py-2 gap-0.5" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/quote"
              onClick={() => setMobileOpen(false)}
              className="mt-1 px-3 py-2.5 rounded-md bg-blue-600 text-white text-sm font-semibold text-center hover:bg-blue-700 transition-colors"
            >
              Get Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
