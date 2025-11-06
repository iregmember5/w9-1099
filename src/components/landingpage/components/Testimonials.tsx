import React, { useState } from "react";
import type { LandingPageData } from "../../../types/landing";

interface TestimonialsProps {
  data: LandingPageData;
}

const Testimonials: React.FC<TestimonialsProps> = ({ data }) => {
  const {
    testimonials_head,
    testimonials_introduction,
    testimonials,
    color_theme,
  } = data;
  const [activeIndex, setActiveIndex] = useState(0);

  // Only hide if there's absolutely no content
  if (
    !testimonials_head &&
    !testimonials_introduction &&
    (!testimonials || testimonials.length === 0)
  ) {
    return null;
  }

  const primaryColor = color_theme?.primary_color || "#3B82F6";
  const accentColor = color_theme?.accent_color || "#10B981";
  const textColor = color_theme?.text_color || "#1F2937";
  const neutralColor = color_theme?.neutral_color || "#6B7280";
  const bgColor = color_theme?.background_color || "#FFFFFF";

  const handleNext = () => {
    if (testimonials && testimonials.length > 0) {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }
  };

  const handlePrev = () => {
    if (testimonials && testimonials.length > 0) {
      setActiveIndex(
        (prev) => (prev - 1 + testimonials.length) % testimonials.length
      );
    }
  };

  // Sample testimonials for when the array is empty
  const sampleTestimonials = [
    {
      id: 1,
      quote:
        "This platform has completely transformed how we handle tax forms. The efficiency and accuracy are unmatched!",
      name: "Sarah Johnson",
      title: "Tax Manager",
      company: "Financial Solutions Inc.",
      photo: null,
      order: 1,
    },
    {
      id: 2,
      quote:
        "As a tax professional, I appreciate the attention to detail and IRS compliance features. It saves us hours of work each week.",
      name: "Michael Chen",
      title: "CPA",
      company: "Chen & Associates",
      photo: null,
      order: 2,
    },
    {
      id: 3,
      quote:
        "The user-friendly interface combined with powerful features makes this the best tax form solution we've ever used.",
      name: "Emily Rodriguez",
      title: "Tax Consultant",
      company: "QuickTax Pro",
      photo: null,
      order: 3,
    },
  ];

  const displayTestimonials =
    testimonials && testimonials.length > 0 ? testimonials : sampleTestimonials;

  return (
    <section className="py-16 sm:py-24" style={{ backgroundColor: bgColor }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          {testimonials_head && (
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
              style={{ color: textColor }}
            >
              {testimonials_head}
            </h2>
          )}

          {testimonials_introduction && (
            <p
              className="text-lg sm:text-xl leading-relaxed"
              style={{ color: neutralColor }}
            >
              {testimonials_introduction}
            </p>
          )}

          {/* Show info message when using sample testimonials */}
          {(!testimonials || testimonials.length === 0) && (
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
              Showing sample testimonials
            </div>
          )}
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto relative">
          {/* Main Testimonial Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 relative overflow-hidden">
            {/* Quote Icon */}
            <div
              className="absolute top-8 left-8 text-6xl opacity-10 font-serif"
              style={{ color: primaryColor }}
            >
              "
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* Quote */}
              <blockquote
                className="text-xl sm:text-2xl leading-relaxed mb-8 italic"
                style={{ color: textColor }}
              >
                "{displayTestimonials[activeIndex].quote}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center gap-6">
                {/* Photo Placeholder */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: primaryColor }}
                >
                  {displayTestimonials[activeIndex].name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </div>

                {/* Details */}
                <div>
                  <p className="font-bold text-lg" style={{ color: textColor }}>
                    {displayTestimonials[activeIndex].name}
                  </p>
                  <p className="text-sm" style={{ color: neutralColor }}>
                    {displayTestimonials[activeIndex].title}
                  </p>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: accentColor }}
                  >
                    {displayTestimonials[activeIndex].company}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          {displayTestimonials.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-16 w-12 h-12 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center"
                style={{ backgroundColor: primaryColor }}
                aria-label="Previous testimonial"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-16 w-12 h-12 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center"
                style={{ backgroundColor: primaryColor }}
                aria-label="Next testimonial"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}

          {/* Dots Navigation */}
          {displayTestimonials.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {displayTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className="w-3 h-3 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor:
                      index === activeIndex
                        ? primaryColor
                        : `${neutralColor}40`,
                    transform:
                      index === activeIndex ? "scale(1.2)" : "scale(1)",
                  }}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Call to add testimonials */}
        {(!testimonials || testimonials.length === 0) && (
          <div className="text-center mt-12">
            <p className="text-lg mb-6" style={{ color: neutralColor }}>
              Have experience with our platform? We'd love to hear from you!
            </p>
            <button
              className="px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: primaryColor,
                color: "#FFFFFF",
              }}
            >
              Share Your Experience
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
