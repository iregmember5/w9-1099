import React from "react";
import type { LandingPageData, Benefit } from "../../../types/landing";

interface BenefitsProps {
  data: LandingPageData;
}

const Benefits: React.FC<BenefitsProps> = ({ data }) => {
  const { benefits_head, benefits_introduction, benefits, color_theme } = data;

  // Show section if header/introduction exists OR if there are benefits
  if (
    !benefits_head &&
    !benefits_introduction &&
    (!benefits || benefits.length === 0)
  ) {
    return null;
  }

  const primaryColor = color_theme?.primary_color || "#3B82F6";
  const secondaryColor = color_theme?.secondary_color || "#1E40AF";
  const accentColor = color_theme?.accent_color || "#10B981";
  const textColor = color_theme?.text_color || "#1F2937";
  const neutralColor = color_theme?.neutral_color || "#6B7280";
  const bgColor = color_theme?.background_color || "#FFFFFF";

  // Sample benefits for when the array is empty
  const sampleBenefits = [
    {
      id: 1,
      title: "Save Time & Increase Efficiency",
      description:
        "Automate your tax form processes and reduce manual work by up to 80% with our streamlined platform.",
      stats: "80% Faster",
      icon: "⚡",
      order: 1,
    },
    {
      id: 2,
      title: "Reduce Errors & Ensure Compliance",
      description:
        "Our built-in validation checks ensure IRS compliance and eliminate costly filing errors.",
      stats: "99% Accuracy",
      icon: "🎯",
      order: 2,
    },
    {
      id: 3,
      title: "Cost-Effective Solution",
      description:
        "Save up to 20% annually on tax preparation costs while improving service quality.",
      stats: "20% Savings",
      icon: "💰",
      order: 3,
    },
    {
      id: 4,
      title: "Enhanced Security",
      description:
        "Enterprise-grade security protects your sensitive client data and tax information.",
      stats: "100% Secure",
      icon: "🔒",
      order: 4,
    },
  ];

  const displayBenefits =
    benefits && benefits.length > 0 ? benefits : sampleBenefits;

  return (
    <section
      className="py-16 sm:py-24"
      style={{
        background: `linear-gradient(135deg, ${bgColor} 0%, ${primaryColor}10 100%)`,
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          {benefits_head && (
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
              style={{ color: textColor }}
            >
              {benefits_head}
            </h2>
          )}

          {benefits_introduction && (
            <p
              className="text-lg sm:text-xl leading-relaxed"
              style={{ color: neutralColor }}
            >
              {benefits_introduction}
            </p>
          )}

          {/* Show info message when using sample benefits */}
          {(!benefits || benefits.length === 0) && (
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mt-4"
              style={{
                backgroundColor: `${primaryColor}15`,
                color: primaryColor,
              }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              Discover the benefits of our platform
            </div>
          )}
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {displayBenefits.map((benefit: Benefit, index: number) => (
            <div
              key={benefit.id}
              className="benefit-card relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group"
              style={{
                animationDelay: `${index * 0.15}s`,
              }}
            >
              {/* Background Accent */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{ backgroundColor: accentColor }}
              ></div>

              <div className="relative z-10">
                {/* Icon & Stats Row */}
                <div className="flex items-start justify-between mb-6">
                  {benefit.icon && (
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                      }}
                    >
                      <span className="text-2xl text-white">
                        {benefit.icon}
                      </span>
                    </div>
                  )}

                  {benefit.stats && (
                    <div
                      className="text-right font-bold text-2xl"
                      style={{ color: accentColor }}
                    >
                      {benefit.stats}
                    </div>
                  )}
                </div>

                {/* Title */}
                <h3
                  className="text-xl sm:text-2xl font-bold mb-4"
                  style={{ color: textColor }}
                >
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="leading-relaxed" style={{ color: neutralColor }}>
                  {benefit.description}
                </p>
              </div>

              {/* Bottom Border Animation */}
              <div
                className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-700"
                style={{
                  background: `linear-gradient(90deg, ${primaryColor}, ${accentColor})`,
                }}
              ></div>
            </div>
          ))}
        </div>

        {/* Additional CTA for empty state */}
        {(!benefits || benefits.length === 0) && (
          <div className="text-center mt-12">
            <p className="text-lg mb-6" style={{ color: neutralColor }}>
              Ready to experience these benefits for your business?
            </p>
            <button
              className="px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                backgroundColor: primaryColor,
                color: "#FFFFFF",
              }}
            >
              Start Saving Today
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes benefit-slide-in {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .benefit-card {
          animation: benefit-slide-in 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
};

export default Benefits;
