// import React from "react";
// import type { DynamicContentBlock } from "../types/landing";

// const API_BASE_URL = "https://esign-admin.signmary.com"; // Update with your actual domain

// const extractYouTubeId = (url: string): string => {
//   if (!url) return "";
//   const match = url.match(
//     /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/
//   );
//   return match ? match[1] : "";
// };

// const getFullImageUrl = (url: string): string => {
//   if (!url) return "";
//   if (url.startsWith("http")) return url;
//   return `${API_BASE_URL}${url}`;
// };

// const DynamicContentRenderer: React.FC<{ block: DynamicContentBlock }> = ({
//   block,
// }) => {
//   switch (block.type) {
//     case "rich_text":
//       return (
//         <div
//           className="prose prose-lg max-w-none mb-8 text-gray-700"
//           dangerouslySetInnerHTML={{ __html: block.value }}
//         />
//       );

//     case "blockquote":
//       return (
//         <blockquote className="border-l-4 border-blue-500 pl-6 py-4 italic mb-8 bg-gradient-to-r from-blue-50 to-transparent rounded-r-lg">
//           <p className="text-xl text-gray-700 font-medium leading-relaxed">
//             "{block.value.text}"
//           </p>
//           {block.value.author && (
//             <footer className="text-sm text-gray-600 mt-3 not-italic font-semibold">
//               — {block.value.author}
//               {block.value.source && (
//                 <span className="text-gray-500 font-normal">
//                   {" "}
//                   ({block.value.source})
//                 </span>
//               )}
//             </footer>
//           )}
//         </blockquote>
//       );

//     case "cta":
//       return (
//         <div
//           className="relative p-12 rounded-2xl mb-12 text-white overflow-hidden shadow-2xl"
//           style={{
//             backgroundImage: block.value.background_image
//               ? `url(${getFullImageUrl(block.value.background_image.url)})`
//               : "none",
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             backgroundColor: block.value.background_image
//               ? "transparent"
//               : "#3B82F6",
//           }}
//         >
//           {block.value.background_image && (
//             <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
//           )}
//           <div className="relative z-10 max-w-3xl mx-auto text-center">
//             <h3 className="text-4xl font-bold mb-4 drop-shadow-lg">
//               {block.value.title}
//             </h3>
//             {block.value.description && (
//               <p className="text-xl mb-8 opacity-95 leading-relaxed">
//                 {block.value.description}
//               </p>
//             )}
//             <a
//               href={block.value.button_url}
//               className={`inline-block px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${
//                 block.value.button_style === "primary"
//                   ? "bg-white text-blue-600 hover:bg-gray-100"
//                   : block.value.button_style === "secondary"
//                   ? "bg-blue-600 text-white hover:bg-blue-700"
//                   : "border-3 border-white text-white hover:bg-white hover:text-blue-600"
//               }`}
//             >
//               {block.value.button_text}
//             </a>
//           </div>
//         </div>
//       );

//     case "video":
//       return (
//         <div className="mb-12">
//           <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-100">
//             <iframe
//               src={`https://www.youtube.com/embed/${extractYouTubeId(
//                 block.value.video_url || ""
//               )}?autoplay=${block.value.autoplay === "true" ? 1 : 0}&controls=${
//                 block.value.controls === "true" ? 1 : 0
//               }&loop=${block.value.loop === "true" ? 1 : 0}&mute=${
//                 block.value.muted === "true" ? 1 : 0
//               }`}
//               className="w-full h-full"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//               title="Video content"
//             />
//           </div>
//         </div>
//       );

//     case "card_grid":
//       return (
//         <div className="mb-16">
//           {block.value.heading && (
//             <h3 className="text-4xl font-bold mb-4 text-center text-gray-800">
//               {block.value.heading}
//             </h3>
//           )}
//           {block.value.subheading && (
//             <p className="text-gray-600 mb-10 text-center text-xl max-w-3xl mx-auto">
//               {block.value.subheading}
//             </p>
//           )}
//           <div
//             className={`grid gap-8 ${
//               block.value.columns === "1"
//                 ? "grid-cols-1"
//                 : block.value.columns === "2"
//                 ? "grid-cols-1 md:grid-cols-2"
//                 : block.value.columns === "3"
//                 ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
//                 : block.value.columns === "4"
//                 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
//                 : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
//             }`}
//           >
//             {block.value.cards?.map((card: any, idx: number) => (
//               <div
//                 key={idx}
//                 className="group border-2 border-gray-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white hover:border-blue-400"
//               >
//                 <h4 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-blue-600 transition-colors">
//                   {card.custom_title || "Card Title"}
//                 </h4>
//                 <p className="text-gray-600 leading-relaxed text-lg">
//                   {card.custom_description || "Card description"}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       );

//     case "dynamic_list":
//       return (
//         <div className="mb-16">
//           {block.value.heading && (
//             <h3 className="text-4xl font-bold mb-4 text-gray-800">
//               {block.value.heading}
//             </h3>
//           )}
//           {block.value.description && (
//             <p className="text-gray-600 mb-10 text-xl leading-relaxed">
//               {block.value.description}
//             </p>
//           )}
//           <div className="space-y-8">
//             {block.value.items?.map((item: any, idx: number) => (
//               <div
//                 key={idx}
//                 className="border-2 border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 bg-white hover:border-blue-400"
//               >
//                 {item.type === "custom_item" && (
//                   <>
//                     <h4 className="text-3xl font-bold mb-4 text-gray-800">
//                       {item.value.title}
//                     </h4>
//                     <div
//                       className="prose prose-lg max-w-none mb-6 text-gray-700"
//                       dangerouslySetInnerHTML={{ __html: item.value.content }}
//                     />
//                     {item.value.image && (
//                       <img
//                         src={item.value.image.url}
//                         alt={item.value.image.title || "Content image"}
//                         className="mt-6 rounded-xl w-full object-cover max-h-96 shadow-lg"
//                       />
//                     )}
//                   </>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       );

//     default:
//       return null;
//   }
// };

// export default DynamicContentRenderer;

import React from "react";
import type { DynamicContentBlock } from "../types/landing";

const API_BASE_URL = "https://esign-admin.signmary.com";

const extractYouTubeId = (url: string): string => {
  if (!url) return "";
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/
  );
  return match ? match[1] : "";
};

const getFullImageUrl = (url: string): string => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${API_BASE_URL}${url}`;
};

const DynamicContentRenderer: React.FC<{ block: DynamicContentBlock }> = ({
  block,
}) => {
  switch (block.type) {
    case "rich_text":
      return (
        <div
          className="prose prose-lg max-w-none mb-8 text-gray-700"
          dangerouslySetInnerHTML={{ __html: block.value }}
        />
      );

    case "blockquote":
      return (
        <blockquote className="border-l-4 border-blue-500 pl-6 py-4 italic mb-8 bg-gradient-to-r from-blue-50 to-transparent rounded-r-lg">
          <p className="text-xl text-gray-700 font-medium leading-relaxed">
            "{block.value.text}"
          </p>
          {block.value.author && (
            <footer className="text-sm text-gray-600 mt-3 not-italic font-semibold">
              — {block.value.author}
              {block.value.source && (
                <span className="text-gray-500 font-normal">
                  {" "}
                  ({block.value.source})
                </span>
              )}
            </footer>
          )}
        </blockquote>
      );

    case "cta":
      return (
        <div
          className="relative p-12 rounded-2xl mb-12 text-white overflow-hidden shadow-2xl"
          style={{
            backgroundImage: block.value.background_image
              ? `url(${getFullImageUrl(block.value.background_image.url)})`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: block.value.background_image
              ? "transparent"
              : "#3B82F6",
          }}
        >
          {block.value.background_image && (
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
          )}
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h3 className="text-4xl font-bold mb-4 drop-shadow-lg">
              {block.value.title}
            </h3>
            {block.value.description && (
              <p className="text-xl mb-8 opacity-95 leading-relaxed">
                {block.value.description}
              </p>
            )}
            <a
              href={block.value.button_url}
              className={`inline-block px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                block.value.button_style === "primary"
                  ? "bg-white text-blue-600 hover:bg-gray-100"
                  : block.value.button_style === "secondary"
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "border-3 border-white text-white hover:bg-white hover:text-blue-600"
              }`}
            >
              {block.value.button_text}
            </a>
          </div>
        </div>
      );

    case "video":
      return (
        <div className="mb-12">
          <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-100">
            <iframe
              src={`https://www.youtube.com/embed/${extractYouTubeId(
                block.value.video_url || ""
              )}?autoplay=${block.value.autoplay === "true" ? 1 : 0}&controls=${
                block.value.controls === "true" ? 1 : 0
              }&loop=${block.value.loop === "true" ? 1 : 0}&mute=${
                block.value.muted === "true" ? 1 : 0
              }`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Video content"
            />
          </div>
        </div>
      );

    case "card_grid":
      return (
        <div className="mb-16">
          {block.value.heading && (
            <h3 className="text-4xl font-bold mb-4 text-center text-gray-800">
              {block.value.heading}
            </h3>
          )}
          {block.value.subheading && (
            <p className="text-gray-600 mb-10 text-center text-xl max-w-3xl mx-auto">
              {block.value.subheading}
            </p>
          )}
          <div
            className={`grid gap-8 ${
              block.value.columns === "1"
                ? "grid-cols-1"
                : block.value.columns === "2"
                ? "grid-cols-1 md:grid-cols-2"
                : block.value.columns === "3"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : block.value.columns === "4"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {block.value.cards?.map((card: any, idx: number) => (
              <div
                key={idx}
                className="group bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                {/* Icon */}
                {card.icon && (
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 bg-blue-50">
                    <span className="text-3xl text-blue-600">{card.icon}</span>
                  </div>
                )}

                {/* Title */}
                <h4 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-blue-600 transition-colors">
                  {card.title || card.custom_title || "Card Title"}
                </h4>

                {/* Description */}
                {(card.description || card.custom_description) && (
                  <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                    {card.description || card.custom_description}
                  </p>
                )}

                {/* Features List */}
                {card.features && card.features.length > 0 && (
                  <ul className="space-y-3">
                    {card.features.map(
                      (feature: string, featureIdx: number) => (
                        <li key={featureIdx} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-green-100">
                            <svg
                              className="w-3 h-3 text-green-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <span className="text-gray-700 text-base leading-relaxed">
                            {feature}
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                )}

                {/* Button (Optional) */}
                {card.button_text && card.button_url && (
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <a
                      href={card.button_url}
                      className="inline-flex items-center gap-2 font-semibold text-blue-600 transition-all duration-300 hover:gap-3 group/btn"
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
            ))}
          </div>
        </div>
      );

    case "dynamic_list":
      return (
        <div className="mb-16">
          {block.value.heading && (
            <h3 className="text-4xl font-bold mb-4 text-gray-800">
              {block.value.heading}
            </h3>
          )}
          {block.value.description && (
            <p className="text-gray-600 mb-10 text-xl leading-relaxed">
              {block.value.description}
            </p>
          )}
          <div className="space-y-8">
            {block.value.items?.map((item: any, idx: number) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                {item.type === "custom_item" && (
                  <>
                    {/* Icon for custom items */}
                    {item.value.icon && (
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-blue-50">
                        <span className="text-2xl text-blue-600">
                          {item.value.icon}
                        </span>
                      </div>
                    )}

                    <h4 className="text-3xl font-bold mb-4 text-gray-800">
                      {item.value.title}
                    </h4>
                    <div
                      className="prose prose-lg max-w-none mb-6 text-gray-700"
                      dangerouslySetInnerHTML={{ __html: item.value.content }}
                    />
                    {item.value.image && (
                      <img
                        src={item.value.image.url}
                        alt={item.value.image.title || "Content image"}
                        className="mt-6 rounded-xl w-full object-cover max-h-96 shadow-lg"
                      />
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      );

    default:
      return null;
  }
};

export default DynamicContentRenderer;
