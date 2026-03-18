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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

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
      <div className="my-8 divide-y divide-gray-200 rounded-2xl border border-gray-200">
        {items.map((item, index) => (
          <div key={index}>
            <button
              type="button"
              onClick={() => toggle(index)}
              className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
              aria-expanded={openIndex === index}
            >
              <span>{item.question}</span>
              <svg
                className={`h-5 w-5 shrink-0 text-gray-500 transition-transform duration-200 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === index && (
              <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
