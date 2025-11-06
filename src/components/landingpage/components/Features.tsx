import React from "react";
import type { LandingPageData, Feature } from "../../../types/landing";

interface FeaturesProps {
  data: LandingPageData;
}

const Features: React.FC<FeaturesProps> = ({ data }) => {
  const { features_head, features_introduction, features, color_theme } = data;

  // Only hide if there's absolutely no content
  if (
    !features_head &&
    !features_introduction &&
    (!features || features.length === 0)
  ) {
    return null;
  }

  const primaryColor = color_theme?.primary_color || "#3B82F6";
  const accentColor = color_theme?.accent_color || "#10B981";
  const textColor = color_theme?.text_color || "#1F2937";
  const neutralColor = color_theme?.neutral_color || "#6B7280";

  return (
    <section
      className="py-16 sm:py-24"
      style={{ backgroundColor: color_theme?.background_color || "#FFFFFF" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          {features_head && (
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
              style={{ color: textColor }}
            >
              {features_head}
            </h2>
          )}

          {features_introduction && (
            <p
              className="text-lg sm:text-xl leading-relaxed"
              style={{ color: neutralColor }}
            >
              {features_introduction}
            </p>
          )}
        </div>

        {/* Features Grid - Show even if empty with a message */}
        {features && features.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature: Feature, index: number) => (
              <div
                key={feature.id}
                className="group p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-white"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {/* Icon */}
                {feature.icon && (
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${primaryColor}15` }}
                  >
                    <span className="text-3xl" style={{ color: primaryColor }}>
                      {feature.icon}
                    </span>
                  </div>
                )}

                {/* Title */}
                <h3
                  className="text-xl sm:text-2xl font-bold mb-4"
                  style={{ color: textColor }}
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="leading-relaxed" style={{ color: neutralColor }}>
                  {feature.description}
                </p>

                {/* Accent Line */}
                <div
                  className="h-1 w-0 group-hover:w-full transition-all duration-500 mt-6 rounded"
                  style={{ backgroundColor: accentColor }}
                ></div>
              </div>
            ))}
          </div>
        ) : (
          // Show a message when no features are available
          <div className="text-center py-12">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: `${primaryColor}15` }}
            >
              <svg
                className="w-12 h-12"
                fill="none"
                stroke={primaryColor}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3
              className="text-2xl font-bold mb-4"
              style={{ color: textColor }}
            >
              Features Coming Soon
            </h3>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: neutralColor }}
            >
              We're working on adding amazing features to enhance your
              experience. Check back soon for updates!
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes feature-fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .group {
          animation: feature-fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
};

export default Features;
