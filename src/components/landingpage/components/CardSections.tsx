// import React from "react";
// import type { LandingPageData, CardContent } from "../types/landing";

// interface CardSectionsProps {
//   data: LandingPageData;
// }

// const CardSections: React.FC<CardSectionsProps> = ({ data }) => {
//   const { card_sections, color_theme } = data;

//   if (
//     !card_sections ||
//     !card_sections.cards ||
//     card_sections.cards.length === 0
//   )
//     return null;

//   const { heading, cards } = card_sections;
//   const primaryColor = color_theme?.primary_color || "#3B82F6";
//   const accentColor = color_theme?.accent_color || "#10B981";
//   const textColor = color_theme?.text_color || "#1F2937";
//   const neutralColor = color_theme?.neutral_color || "#6B7280";
//   const bgColor = color_theme?.background_color || "#FFFFFF";

//   const renderCard = (card: CardContent, index: number) => {
//     const cardStyles = {
//       basic: "bg-white",
//       feature: "bg-gradient-to-br from-blue-50 to-white",
//       testimonial: "bg-gray-50",
//       pricing: "bg-white border-2",
//       team: "bg-white",
//     };

//     return (
//       <div
//         key={card.id}
//         className={`${
//           cardStyles[card.card_style] || cardStyles.basic
//         } p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group`}
//         style={{
//           animationDelay: `${index * 0.1}s`,
//           borderColor:
//             card.card_style === "pricing" ? `${primaryColor}40` : "transparent",
//         }}
//       >
//         {/* Image */}
//         {card.image && (
//           <div className="mb-6 overflow-hidden rounded-xl">
//             <img
//               src={card.image.url}
//               alt={card.image.title}
//               className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
//             />
//           </div>
//         )}

//         {/* Icon */}
//         {card.icon && !card.image && (
//           <div
//             className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
//             style={{ backgroundColor: `${primaryColor}15` }}
//           >
//             <span className="text-2xl" style={{ color: primaryColor }}>
//               {card.icon}
//             </span>
//           </div>
//         )}

//         {/* Pricing Badge */}
//         {card.card_style === "pricing" && card.price && (
//           <div className="text-center mb-6">
//             <div
//               className="text-4xl sm:text-5xl font-bold mb-2"
//               style={{ color: primaryColor }}
//             >
//               {card.price}
//             </div>
//             {card.price_period && (
//               <div className="text-sm" style={{ color: neutralColor }}>
//                 {card.price_period}
//               </div>
//             )}
//           </div>
//         )}

//         {/* Subtitle */}
//         {card.subtitle && (
//           <p
//             className="text-sm font-semibold uppercase tracking-wider mb-2"
//             style={{ color: accentColor }}
//           >
//             {card.subtitle}
//           </p>
//         )}

//         {/* Title */}
//         <h3
//           className="text-xl sm:text-2xl font-bold mb-4"
//           style={{ color: textColor }}
//         >
//           {card.title}
//         </h3>

//         {/* Description */}
//         {card.description && (
//           <p className="leading-relaxed mb-6" style={{ color: neutralColor }}>
//             {card.description}
//           </p>
//         )}

//         {/* Features List */}
//         {card.features && card.features.length > 0 && (
//           <ul className="space-y-3 mb-6">
//             {card.features.map((feature, idx) => (
//               <li key={idx} className="flex items-start gap-3">
//                 <svg
//                   className="w-5 h-5 mt-0.5 flex-shrink-0"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                   style={{ color: accentColor }}
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//                 <span style={{ color: neutralColor }}>{feature}</span>
//               </li>
//             ))}
//           </ul>
//         )}

//         {/* Rating */}
//         {card.card_style === "testimonial" && card.rating > 0 && (
//           <div className="flex gap-1 mb-4">
//             {[...Array(5)].map((_, idx) => (
//               <svg
//                 key={idx}
//                 className="w-5 h-5"
//                 fill={idx < card.rating ? "currentColor" : "none"}
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 style={{ color: accentColor }}
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
//                 />
//               </svg>
//             ))}
//           </div>
//         )}

//         {/* Button */}
//         {card.button_text && card.button_url && (
//           <a
//             href={card.button_url}
//             className="inline-block w-full text-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
//             style={{
//               backgroundColor:
//                 card.card_style === "pricing"
//                   ? primaryColor
//                   : `${primaryColor}15`,
//               color: card.card_style === "pricing" ? "#FFFFFF" : primaryColor,
//             }}
//           >
//             {card.button_text}
//           </a>
//         )}
//       </div>
//     );
//   };

//   return (
//     <section className="py-16 sm:py-24" style={{ backgroundColor: bgColor }}>
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section Header */}
//         {heading && (
//           <div className="text-center mb-16 max-w-3xl mx-auto">
//             <h2
//               className="text-3xl sm:text-4xl lg:text-5xl font-bold"
//               style={{ color: textColor }}
//             >
//               {heading}
//             </h2>
//           </div>
//         )}

//         {/* Cards Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {cards.map((card, index) => renderCard(card, index))}
//         </div>
//       </div>

//       <style>{`
//         @keyframes card-fade-in {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .group {
//           animation: card-fade-in 0.6s ease-out forwards;
//           opacity: 0;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default CardSections;

import React from "react";
import type { LandingPageData, CardContent } from "../../../types/landing";

interface CardSectionsProps {
  data: LandingPageData;
}

const CardSections: React.FC<CardSectionsProps> = ({ data }) => {
  const { card_sections, color_theme } = data;

  if (
    !card_sections ||
    !card_sections.cards ||
    card_sections.cards.length === 0
  )
    return null;

  const { heading, cards } = card_sections;
  const primaryColor = color_theme?.primary_color || "#3B82F6";
  const accentColor = color_theme?.accent_color || "#10B981";
  const textColor = color_theme?.text_color || "#1F2937";
  const neutralColor = color_theme?.neutral_color || "#6B7280";
  const bgColor = color_theme?.background_color || "#FFFFFF";

  const renderCard = (card: CardContent, index: number) => {
    return (
      <div
        key={card.id}
        className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group border border-gray-100"
        style={{
          animationDelay: `${index * 0.1}s`,
        }}
      >
        {/* Icon */}
        {card.icon && (
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
            style={{ backgroundColor: `${primaryColor}15` }}
          >
            <span className="text-3xl" style={{ color: primaryColor }}>
              {card.icon}
            </span>
          </div>
        )}

        {/* Title */}
        <h3
          className="text-xl font-bold mb-4 leading-tight"
          style={{ color: textColor }}
        >
          {card.title}
        </h3>

        {/* Description */}
        {card.description && (
          <p
            className="leading-relaxed mb-6 text-lg"
            style={{ color: neutralColor }}
          >
            {card.description}
          </p>
        )}

        {/* Features List */}
        {card.features && card.features.length > 0 && (
          <ul className="space-y-4">
            {card.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-4">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: `${accentColor}20` }}
                >
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    style={{ color: accentColor }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span
                  className="text-base leading-relaxed"
                  style={{ color: neutralColor }}
                >
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        )}

        {/* Button */}
        {card.button_text && card.button_url && (
          <div className="mt-8 pt-6 border-t border-gray-100">
            <a
              href={card.button_url}
              className="inline-flex items-center gap-2 font-semibold transition-all duration-300 hover:gap-3 group/btn"
              style={{ color: primaryColor }}
            >
              {card.button_text}
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="py-16 sm:py-24" style={{ backgroundColor: bgColor }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        {heading && (
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
              style={{ color: textColor }}
            >
              {heading}
            </h2>
            {/* Optional subtitle can be added here */}
          </div>
        )}

        {/* Cards Grid - 3 columns on large screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {cards.map((card, index) => renderCard(card, index))}
        </div>

        {/* Optional CTA Section */}
        <div className="text-center mt-16">
          <p
            className="text-lg mb-6 max-w-2xl mx-auto"
            style={{ color: neutralColor }}
          >
            Ready to get started with our comprehensive features?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="px-8 py-4 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ backgroundColor: primaryColor }}
            >
              Get Started Today
            </a>
            <a
              href="#learn-more"
              className="px-8 py-4 rounded-lg font-semibold border-2 transition-all duration-300 hover:scale-105"
              style={{
                borderColor: primaryColor,
                color: primaryColor,
                backgroundColor: "transparent",
              }}
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes card-fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .group {
          animation: card-fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
};

export default CardSections;
