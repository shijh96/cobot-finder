"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

export default function FAQ({ items = [] }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  if (items.length === 0) return null;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="my-8 rounded-xl border border-gray-200 bg-white overflow-hidden">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className={index > 0 ? "border-t border-gray-100" : ""}>
              <button
                type="button"
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-gray-50/50 transition-colors"
                aria-expanded={isOpen}
              >
                <span className="text-sm font-semibold text-gray-900 pr-4">{item.question}</span>
                <span className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-colors ${isOpen ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-400"}`}>
                  <svg
                    className={`h-3 w-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-200 ${isOpen ? "max-h-96" : "max-h-0"}`}
              >
                <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
