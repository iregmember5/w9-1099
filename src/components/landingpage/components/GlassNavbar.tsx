import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import type { LandingPageData } from "../../../types/landing";

interface NavigationItem {
  id: number;
  title: string;
  url: string | null;
  link_type: "page" | "url" | "dropdown";
  order: number;
  children?: NavigationItem[];
}

interface GlassNavbarProps {
  data: LandingPageData;
  onShowLogin?: () => void;
}

function GlassNavbar({ data, onShowLogin }: GlassNavbarProps) {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  // Get header config from both possible locations
  const headerConfig =
    data.header_config ||
    data.sections?.find((section) => section.type === "header")?.data?.config;

  const { header_cta_primary, color_theme } = data;

  const primaryColor = color_theme?.primary_color || "#3B82F6";
  const textColor = color_theme?.text_color || "#1F2937";

  // Get navigation items from header_config - handle both array structures with proper typing
  const rawNavigationItems = headerConfig?.navigation_items || [];

  // Process navigation items with proper type casting and URL handling
  const processedLinks: NavigationItem[] = rawNavigationItems.map(
    (item: any) => ({
      ...item,
      link_type: (item.link_type as "page" | "url" | "dropdown") || "url", // Type assertion with fallback
      url: getNavigationItemUrl(item),
      children: item.children || [], // Ensure children is always an array
    })
  );

  // Fallback to default links if no navigation items
  const links: NavigationItem[] =
    processedLinks.length > 0
      ? processedLinks
      : [
          {
            id: 1,
            title: "Home",
            url: "#",
            link_type: "url" as const,
            order: 1,
            children: [],
          },
          {
            id: 2,
            title: "Features",
            url: "#features",
            link_type: "url" as const,
            order: 2,
            children: [],
          },
          {
            id: 3,
            title: "Pricing",
            url: "#pricing",
            link_type: "url" as const,
            order: 3,
            children: [],
          },
          {
            id: 4,
            title: "Contact",
            url: "#contact",
            link_type: "url" as const,
            order: 4,
            children: [],
          },
        ].sort((a, b) => a.order - b.order);

  const getFullImageUrl = (url: string) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `https://esign-admin.signmary.com${url}`; // <-- your backend domain
  };

  // Get logo information - handle both possible locations
  const logo = headerConfig?.logo;
  const siteName = headerConfig?.site_name || data.title || "W9";

  // Get navbar CTA if available
  const navbarCTA = headerConfig?.navbar_cta;

  // Get navbar style and behavior
  const navbarStyle = headerConfig?.navbar_style || "default";
  const stickyNavbar = headerConfig?.sticky_navbar !== false; // default to true
  const transparentOnHome = headerConfig?.transparent_on_home || false;

  // Helper function to get proper URL for navigation items
  function getNavigationItemUrl(item: any): string {
    if (item.link_type === "page" && !item.url) {
      // For page links without URL, use hash as fallback
      return "#";
    }
    return item.url || "#";
  }

  // Helper function to check if item has dropdown children
  function hasDropdownChildren(item: NavigationItem): boolean {
    return (
      item.link_type === "dropdown" ||
      Boolean(item.children && item.children.length > 0)
    );
  }

  // Apply navbar style classes
  const getNavbarStyleClass = () => {
    switch (navbarStyle) {
      case "centered":
        return "justify-center";
      case "with_cta":
        return "justify-between";
      case "transparent":
        return "bg-transparent border-transparent shadow-none";
      default:
        return "justify-between";
    }
  };

  return (
    <nav
      className={`${
        stickyNavbar ? "fixed" : "absolute"
      } top-0 left-0 right-0 z-50 transition-all duration-300 ${
        transparentOnHome
          ? "bg-transparent"
          : "backdrop-blur-md bg-white/30 dark:bg-gray-900/30"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Glass container */}
        <div
          className={`flex items-center ${getNavbarStyleClass()} py-3 ${
            !transparentOnHome &&
            "border-b border-white/10 dark:border-gray-800/30"
          }`}
        >
          {/* Brand/Logo Section */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {logo ? (
              <img
                src={getFullImageUrl(logo.url)}
                alt={logo.title || siteName}
                style={{
                  width: logo.width ? `${logo.width}px` : "auto",
                  height: logo.height ? `${logo.height}px` : "40px",
                  maxHeight: "40px",
                }}
                className="object-contain"
              />
            ) : (
              <div
                className="h-10 w-10 flex items-center justify-center rounded-lg text-white"
                style={{ backgroundColor: primaryColor }}
              >
                <span className="font-bold text-sm">{siteName.charAt(0)}</span>
              </div>
            )}
            <div
              className="hidden sm:block font-semibold text-lg"
              style={{ color: textColor }}
            >
              {siteName}
            </div>
          </div>
          {/* Center: Navigation Links (desktop) */}
          {navbarStyle !== "centered" && (
            <div className="hidden md:flex items-center gap-6 mx-8 flex-1 justify-center">
              {links
                .sort((a, b) => a.order - b.order)
                .map((link) => (
                  <div key={link.id} className="relative">
                    {hasDropdownChildren(link) ? (
                      // Dropdown menu
                      <div
                        className="relative"
                        onMouseEnter={() => setActiveDropdown(link.id)}
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        <button
                          className="flex items-center gap-1 text-sm font-medium transition"
                          style={{
                            color: textColor,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = primaryColor;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = textColor;
                          }}
                        >
                          {link.title}
                          <ChevronDown size={16} />
                        </button>

                        {activeDropdown === link.id &&
                          link.children &&
                          link.children.length > 0 && (
                            <div
                              className="absolute top-full left-0 mt-2 w-48 backdrop-blur-md bg-white/95 dark:bg-gray-900/95 border border-white/10 dark:border-gray-800/30 rounded-xl shadow-lg py-2 z-50"
                              style={{
                                backgroundColor: color_theme?.background_color
                                  ? `${color_theme.background_color}95`
                                  : undefined,
                              }}
                            >
                              {link.children.map((child) => (
                                <a
                                  key={child.id}
                                  href={getNavigationItemUrl(child)}
                                  className="block px-4 py-2 text-sm transition hover:bg-white/50 dark:hover:bg-gray-800/50"
                                  style={{
                                    color: textColor,
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.color = primaryColor;
                                    e.currentTarget.style.backgroundColor = `${primaryColor}20`;
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.color = textColor;
                                    e.currentTarget.style.backgroundColor = "";
                                  }}
                                >
                                  {child.title}
                                </a>
                              ))}
                            </div>
                          )}
                      </div>
                    ) : (
                      // Regular link
                      <a
                        href={getNavigationItemUrl(link)}
                        className="text-sm font-medium transition"
                        style={{
                          color: textColor,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = primaryColor;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = textColor;
                        }}
                      >
                        {link.title}
                      </a>
                    )}
                  </div>
                ))}
            </div>
          )}
          {/* Right: CTA + Mobile button */}

          <div className="flex items-center gap-3">
            {/* Navbar CTA from header_config (priority) */}
            {navbarCTA?.text && (
              <button
                onClick={onShowLogin}
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold shadow-md transform transition hover:-translate-y-0.5 hover:shadow-lg"
                style={{
                  backgroundColor: primaryColor,
                }}
              >
                {navbarCTA.text}
              </button>
            )}

            {/* Fallback to header CTA if no navbar CTA */}
            {!navbarCTA?.text && header_cta_primary && (
              <button
                onClick={onShowLogin}
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold shadow-md transform transition hover:-translate-y-0.5 hover:shadow-lg"
                style={{
                  backgroundColor: primaryColor,
                }}
              >
                {header_cta_primary}
              </button>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setOpen((s) => !s)}
              aria-label="Toggle menu"
              className="p-2 rounded-md md:hidden"
              style={{ color: textColor }}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Centered navigation for centered style */}
        {navbarStyle === "centered" && (
          <div className="hidden md:flex items-center justify-center gap-6 py-3 border-t border-white/10 dark:border-gray-800/30">
            {links
              .sort((a, b) => a.order - b.order)
              .map((link) => (
                <div key={link.id} className="relative">
                  {hasDropdownChildren(link) ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setActiveDropdown(link.id)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <button
                        className="flex items-center gap-1 text-sm font-medium transition"
                        style={{
                          color: textColor,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = primaryColor;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = textColor;
                        }}
                      >
                        {link.title}
                        <ChevronDown size={16} />
                      </button>

                      {activeDropdown === link.id &&
                        link.children &&
                        link.children.length > 0 && (
                          <div
                            className="absolute top-full left-0 mt-2 w-48 backdrop-blur-md bg-white/95 dark:bg-gray-900/95 border border-white/10 dark:border-gray-800/30 rounded-xl shadow-lg py-2 z-50"
                            style={{
                              backgroundColor: color_theme?.background_color
                                ? `${color_theme.background_color}95`
                                : undefined,
                            }}
                          >
                            {link.children.map((child) => (
                              <a
                                key={child.id}
                                href={getNavigationItemUrl(child)}
                                className="block px-4 py-2 text-sm transition hover:bg-white/50 dark:hover:bg-gray-800/50"
                                style={{
                                  color: textColor,
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.color = primaryColor;
                                  e.currentTarget.style.backgroundColor = `${primaryColor}20`;
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.color = textColor;
                                  e.currentTarget.style.backgroundColor = "";
                                }}
                              >
                                {child.title}
                              </a>
                            ))}
                          </div>
                        )}
                    </div>
                  ) : (
                    <a
                      href={getNavigationItemUrl(link)}
                      className="text-sm font-medium transition"
                      style={{
                        color: textColor,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = primaryColor;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = textColor;
                      }}
                    >
                      {link.title}
                    </a>
                  )}
                </div>
              ))}
          </div>
        )}

        {/* Mobile menu panel */}
        <div
          className={`md:hidden transition-all duration-300 ${
            open ? "max-h-96 overflow-y-auto" : "max-h-0 overflow-hidden"
          }`}
        >
          <div
            className="backdrop-blur-md border border-white/10 dark:border-gray-800/30 rounded-xl shadow-lg p-4 flex flex-col gap-3 mt-2"
            style={{
              backgroundColor: color_theme?.background_color
                ? `${color_theme.background_color}95`
                : "rgba(255, 255, 255, 0.95)",
            }}
          >
            {links
              .sort((a, b) => a.order - b.order)
              .map((link) => (
                <div key={link.id}>
                  {hasDropdownChildren(link) ? (
                    // Mobile dropdown
                    <div>
                      <button
                        onClick={() =>
                          setActiveDropdown(
                            activeDropdown === link.id ? null : link.id
                          )
                        }
                        className="w-full flex items-center justify-between text-base font-medium py-2 px-2"
                        style={{ color: textColor }}
                      >
                        {link.title}
                        <ChevronDown
                          size={16}
                          className={`transform transition-transform ${
                            activeDropdown === link.id ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {activeDropdown === link.id &&
                        link.children &&
                        link.children.length > 0 && (
                          <div className="ml-4 mt-2 space-y-2">
                            {link.children.map((child) => (
                              <a
                                key={child.id}
                                href={getNavigationItemUrl(child)}
                                className="block text-sm py-2 px-2 rounded transition"
                                style={{
                                  color: textColor,
                                }}
                                onClick={() => setOpen(false)}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.color = primaryColor;
                                  e.currentTarget.style.backgroundColor = `${primaryColor}20`;
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.color = textColor;
                                  e.currentTarget.style.backgroundColor = "";
                                }}
                              >
                                {child.title}
                              </a>
                            ))}
                          </div>
                        )}
                    </div>
                  ) : (
                    <a
                      href={getNavigationItemUrl(link)}
                      className="block text-base font-medium py-2 px-2 rounded transition"
                      style={{
                        color: textColor,
                      }}
                      onClick={() => setOpen(false)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = primaryColor;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = textColor;
                      }}
                    >
                      {link.title}
                    </a>
                  )}
                </div>
              ))}

            {/* Mobile CTA */}
            {navbarCTA?.text ? (
              <button
                onClick={() => {
                  if (onShowLogin) {
                    onShowLogin();
                    setOpen(false);
                  }
                }}
                className="mt-2 w-full px-4 py-2 rounded-lg text-white font-semibold text-center shadow-md"
                style={{
                  backgroundColor: primaryColor,
                }}
              >
                {navbarCTA.text}
              </button>
            ) : header_cta_primary ? (
              <button
                onClick={() => {
                  if (onShowLogin) {
                    onShowLogin();
                    setOpen(false);
                  }
                }}
                className="mt-2 w-full px-4 py-2 rounded-lg text-white font-semibold text-center shadow-md"
                style={{
                  backgroundColor: primaryColor,
                }}
              >
                {header_cta_primary}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default GlassNavbar;
