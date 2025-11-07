import React from "react";
import type { LandingPageData } from "../../../types/landing";

interface HeaderProps {
  data: LandingPageData;
  onShowLogin?: () => void;
}

const Header: React.FC<HeaderProps> = ({ data, onShowLogin }) => {
  const {
    header_title,
    header_subtitle,
    header_description,
    header_cta_primary,
    header_cta_primary_url,
    header_cta_secondary,
    header_cta_secondary_url,
    header_section_image, // New prop for the right side image
    color_theme,
  } = data;

  const primaryColor = color_theme?.primary_color || "#3B82F6";
  const textColor = color_theme?.text_color || "#1F2937";

  const backendBaseUrl = "https://esign-admin.signmary.com";

  const backgroundImageUrl = data.header_background_image?.url
    ? data.header_background_image.url.startsWith("http")
      ? data.header_background_image.url
      : `${backendBaseUrl}${data.header_background_image.url}`
    : null;

  // Use header_image for the right side section
  const rightImageUrl = header_section_image?.url?.startsWith("http")
    ? header_section_image.url
    : header_section_image?.url
    ? `${backendBaseUrl}${header_section_image.url}`
    : null;

  return (
    <header
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: color_theme?.background_color || "#FFFFFF",
        backgroundImage: backgroundImageUrl
          ? `url(${backgroundImageUrl})`
          : "none",
      }}
    >
      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Text Content - Left Side */}
          <div className="lg:w-1/2 text-center lg:text-left animate-slide-up">
            <div className="max-w-2xl">
              {/* Subtitle */}
              {header_subtitle && (
                <p
                  className="text-sm sm:text-base font-semibold uppercase tracking-wider mb-4 animate-fade-in"
                  style={{
                    color: primaryColor,
                  }}
                >
                  {header_subtitle}
                </p>
              )}

              {/* Main Title */}
              {header_title && (
                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                  style={{
                    color: textColor,
                  }}
                >
                  {header_title}
                </h1>
              )}

              {/* Description */}
              {header_description && (
                <p
                  className="text-lg sm:text-xl lg:text-xl mb-8 leading-relaxed animate-slide-up animation-delay-200"
                  style={{
                    color: color_theme?.neutral_color || "#6B7280",
                  }}
                >
                  {header_description}
                </p>
              )}

              {/* CTAs */}

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up animation-delay-400">
                {header_cta_primary && (
                  <>
                    {header_cta_primary_url ? (
                      <a
                        href={header_cta_primary_url}
                        className="px-8 py-4 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl transform cursor-pointer text-center"
                        style={{
                          backgroundColor: primaryColor,
                        }}
                      >
                        {header_cta_primary}
                      </a>
                    ) : (
                      <button
                        onClick={onShowLogin}
                        className="px-8 py-4 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl transform cursor-pointer text-center"
                        style={{
                          backgroundColor: primaryColor,
                        }}
                      >
                        {header_cta_primary}
                      </button>
                    )}
                  </>
                )}

                {header_cta_secondary && (
                  <>
                    {header_cta_secondary_url &&
                    header_cta_secondary_url !== "#login" ? (
                      <a
                        href={header_cta_secondary_url}
                        className="px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 border-2 cursor-pointer text-center"
                        style={{
                          borderColor: primaryColor,
                          color: primaryColor,
                          backgroundColor: "transparent",
                        }}
                      >
                        {header_cta_secondary}
                      </a>
                    ) : (
                      <button
                        onClick={() => {
                          if (onShowLogin) {
                            onShowLogin();
                          }
                        }}
                        className="px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 border-2 cursor-pointer text-center"
                        style={{
                          borderColor: primaryColor,
                          color: primaryColor,
                          backgroundColor: "transparent",
                        }}
                      >
                        {header_cta_secondary}
                      </button>
                    )}
                  </>
                )}
              </div>

              {/* Additional Info/Stats */}
              <div className="mt-12 flex flex-wrap gap-8 justify-center lg:justify-start animate-slide-up animation-delay-600">
                <div className="text-center lg:text-left">
                  <div
                    className="text-2xl font-bold"
                    style={{ color: primaryColor }}
                  >
                    99%
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: color_theme?.neutral_color || "#6B7280" }}
                  >
                    Success Rate
                  </div>
                </div>
                <div className="text-center lg:text-left">
                  <div
                    className="text-2xl font-bold"
                    style={{ color: primaryColor }}
                  >
                    24/7
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: color_theme?.neutral_color || "#6B7280" }}
                  >
                    Support
                  </div>
                </div>
                <div className="text-center lg:text-left">
                  <div
                    className="text-2xl font-bold"
                    style={{ color: primaryColor }}
                  >
                    1000+
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: color_theme?.neutral_color || "#6B7280" }}
                  >
                    Happy Clients
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image Section - Right Side */}
          <div className="lg:w-1/2 flex items-center justify-center animate-slide-up animation-delay-300">
            <div className="relative w-full max-w-2xl">
              {rightImageUrl ? (
                // Show the dedicated right side image
                <div className="relative">
                  <div
                    className="rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500"
                    style={{
                      boxShadow: `0 25px 50px -12px ${primaryColor}20`,
                    }}
                  >
                    <img
                      src={rightImageUrl}
                      alt="Header Visual"
                      className="w-full h-auto object-cover"
                    />
                  </div>

                  {/* Floating elements */}
                  <div
                    className="absolute -top-4 -left-4 w-24 h-24 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <span className="text-white font-bold text-sm text-center">
                      Easy to Use
                    </span>
                  </div>

                  <div
                    className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300"
                    style={{
                      backgroundColor: color_theme?.accent_color || "#10B981",
                    }}
                  >
                    <span className="text-white font-bold text-xs text-center">
                      Fast & Secure
                    </span>
                  </div>
                </div>
              ) : (
                // Fallback placeholder when no image is provided
                <div
                  className="w-full h-80 lg:h-96 rounded-3xl flex flex-col items-center justify-center shadow-2xl p-8 text-center"
                  style={{
                    backgroundColor: `${primaryColor}08`,
                    border: `2px dashed ${primaryColor}30`,
                  }}
                >
                  <svg
                    className="w-24 h-24 mb-4 opacity-30"
                    fill="none"
                    stroke={primaryColor}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p style={{ color: primaryColor, opacity: 0.7 }}>
                    Add an image to showcase your product
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke={textColor}
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
      `}</style>
    </header>
  );
};

export default Header;
