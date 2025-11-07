// components/landingpage/components/FAQ.tsx
import React, { useState } from "react";
import type { LandingPageData } from "../../../types/landing";

interface FAQProps {
  data: LandingPageData;
}

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category?: string;
  order: number;
  is_active: boolean;
}

const FAQ: React.FC<FAQProps> = ({ data }) => {
  // Extract FAQ data from the landing page data structure
  const faqData = data.sections?.find(
    (section) => section.type === "faq"
  )?.data;

  const heading =
    faqData?.heading ||
    data.faq_section?.heading ||
    "Frequently Asked Questions";
  const introduction =
    faqData?.introduction || data.faq_section?.introduction || "";
  const faqItems: FAQItem[] = faqData?.items || data.faqs || [];

  const [openItems, setOpenItems] = useState<Set<number>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string>("all");

  if (!faqItems || faqItems.length === 0) {
    return null;
  }

  // Extract unique categories
  const categories = [
    "all",
    ...new Set(
      faqItems.map((item) => item.category).filter(Boolean) as string[]
    ),
  ];

  // Filter FAQs by category
  const filteredFaqs =
    activeCategory === "all"
      ? faqItems
      : faqItems.filter((item) => item.category === activeCategory);

  const toggleItem = (id: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const toggleAll = () => {
    if (openItems.size === filteredFaqs.length) {
      setOpenItems(new Set());
    } else {
      setOpenItems(new Set(filteredFaqs.map((item) => item.id)));
    }
  };

  // Get theme colors with fallbacks
  const primaryColor = data.color_theme?.primary_color || "#3b82f6";
  const secondaryColor = data.color_theme?.secondary_color || "#1e40af";
  //   const accentColor = data.color_theme?.accent_color || "#10b981";
  const neutralColor = data.color_theme?.neutral_color || "#6b7280";
  const backgroundColor = data.color_theme?.background_color || "#ffffff";
  const textColor = data.color_theme?.text_color || "#1f2937";

  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundColor: backgroundColor,
        color: textColor,
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4" style={{ color: textColor }}>
            {heading}
          </h2>
          {introduction && (
            <p
              className="text-xl opacity-80 max-w-2xl mx-auto"
              style={{ color: textColor }}
            >
              {introduction}
            </p>
          )}
        </div>

        {/* Category Filter */}
        {categories.length > 2 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === category
                    ? "text-white shadow-lg"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
                style={{
                  backgroundColor:
                    activeCategory === category ? primaryColor : undefined,
                }}
              >
                {category === "all" ? "All Questions" : category}
              </button>
            ))}
          </div>
        )}

        {/* Expand/Collapse All */}
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleAll}
            className="text-sm font-medium hover:underline transition-colors duration-200"
            style={{ color: primaryColor }}
          >
            {openItems.size === filteredFaqs.length
              ? "Collapse All"
              : "Expand All"}
          </button>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => (
            <div
              key={faq.id}
              className="rounded-xl transition-all duration-200 hover:shadow-md"
              style={{
                border: `1px solid ${neutralColor}`,
                backgroundColor: openItems.has(faq.id)
                  ? `${primaryColor}08` // 08 hex for very light opacity
                  : "transparent",
              }}
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full text-left p-6 flex justify-between items-center rounded-xl transition-all duration-200 hover:bg-opacity-5"
                style={{
                  color: textColor,
                  // Dynamic focus styles using your theme
                  outline: "none",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 0 2px ${primaryColor}40`; // 40 hex for opacity
                }}
                onBlur={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${primaryColor}08`;
                }}
                onMouseLeave={(e) => {
                  if (!openItems.has(faq.id)) {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                <h3
                  className="text-lg font-semibold pr-8"
                  style={{ color: textColor }}
                >
                  {faq.question}
                </h3>
                <div
                  className={`flex-shrink-0 w-6 h-6 transition-transform duration-200 ${
                    openItems.has(faq.id) ? "rotate-180" : ""
                  }`}
                  style={{ color: primaryColor }}
                >
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              <div
                className={`px-6 transition-all duration-200 overflow-hidden ${
                  openItems.has(faq.id)
                    ? "pb-6 max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div
                  className="prose prose-lg max-w-none"
                  style={{ color: `${textColor}CC` }} // CC hex for 80% opacity
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />

                {/* Category badge */}
                {faq.category && (
                  <div className="mt-4">
                    <span
                      className="inline-block px-3 py-1 text-xs font-medium rounded-full"
                      style={{
                        backgroundColor: `${primaryColor}20`, // 20 hex for light background
                        color: primaryColor,
                      }}
                    >
                      {faq.category}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* No results message */}
        {filteredFaqs.length === 0 && (
          <div className="text-center py-12">
            <div
              className="w-24 h-24 mx-auto mb-4 opacity-50"
              style={{ color: neutralColor }}
            >
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-lg opacity-70" style={{ color: textColor }}>
              No questions found in this category.
            </p>
          </div>
        )}

        {/* Contact CTA */}
        <div
          className="text-center mt-12 p-8 rounded-2xl"
          style={{
            border: `2px dashed ${neutralColor}`,
          }}
        >
          <h3 className="text-2xl font-bold mb-4" style={{ color: textColor }}>
            Still have questions?
          </h3>
          <p
            className="text-lg mb-6 opacity-80 max-w-md mx-auto"
            style={{ color: textColor }}
          >
            Can't find the answer you're looking for? Please reach out to our
            friendly team.
          </p>
          <button
            className="px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
            style={{
              backgroundColor: primaryColor,
              color: "#ffffff",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = secondaryColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = primaryColor;
            }}
          >
            Contact Support
          </button>
        </div>
      </div>

      {/* Dynamic focus styles for all interactive elements */}
      <style>{`
        .category-filter button:focus {
          outline: none;
          box-shadow: 0 0 0 2px ${primaryColor}40;
        }
        
        .expand-collapse-btn:focus {
          outline: none;
          text-decoration: underline;
        }
        
        .contact-btn:focus {
          outline: none;
          box-shadow: 0 0 0 3px ${primaryColor}40;
        }
      `}</style>
    </section>
  );
};

export default FAQ;
