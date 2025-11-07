import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import type { LandingPageData } from "../../../types/landing";

interface NavigationItem {
  id: number;
  title: string;
  url: string;
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

  const {
    header_cta_primary,
    header_cta_primary_url,
    color_theme,
    header_config,
  } = data;

  const primaryColor = color_theme?.primary_color || "#3B82F6";

  // Get navigation items from header_config if available
  const navigationItems = header_config?.navigation_items || [];

  // Fallback to default links if no navigation items
  const links: NavigationItem[] =
    navigationItems.length > 0
      ? navigationItems
      : [
          { id: 1, title: "Home", url: "#", link_type: "url", order: 1 },
          {
            id: 2,
            title: "Features",
            url: "#features",
            link_type: "url",
            order: 2,
          },
          {
            id: 3,
            title: "Pricing",
            url: "#pricing",
            link_type: "url",
            order: 3,
          },
          {
            id: 4,
            title: "Contact",
            url: "#contact",
            link_type: "url",
            order: 4,
          },
        ];

  // Get logo information
  const logo = header_config?.logo;
  const siteName = header_config?.site_name || data.title || "Tax Specialist";

  // Get navbar CTA if available
  const navbarCTA = header_config?.navbar_cta;

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Glass container */}
        <div className="backdrop-blur-md bg-white/30 dark:bg-gray-900/30 border border-white/10 dark:border-gray-800/30 rounded-2xl shadow-lg p-2 md:p-3 flex items-center justify-between">
          {/* Left: Brand */}
          <div className="flex items-center gap-3">
            {logo ? (
              <img
                src={logo.url}
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
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M7 12h10"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            )}
            <div className="hidden sm:block text-slate-900 dark:text-white font-semibold text-lg">
              {siteName}
            </div>
          </div>

          {/* Center: Links (desktop) */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <div key={link.id} className="relative">
                {link.children && link.children.length > 0 ? (
                  // Dropdown menu
                  <div
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(link.id)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button className="flex items-center gap-1 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition">
                      {link.title}
                      <ChevronDown size={16} />
                    </button>

                    {activeDropdown === link.id && (
                      <div className="absolute top-full left-0 mt-2 w-48 backdrop-blur-md bg-white/95 dark:bg-gray-900/95 border border-white/10 dark:border-gray-800/30 rounded-xl shadow-lg py-2 z-50">
                        {link.children.map((child) => (
                          <a
                            key={child.id}
                            href={child.url}
                            className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-white/50 dark:hover:bg-gray-800/50 transition"
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
                    href={link.url}
                    className="text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition"
                  >
                    {link.title}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Right: CTA + Mobile button */}
          <div className="flex items-center gap-3">
            {/* Navbar CTA from header_config (priority) */}
            {navbarCTA?.text ? (
              <a
                href={navbarCTA.url || "#"}
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold shadow-md transform transition hover:-translate-y-0.5 hover:shadow-lg"
                style={{
                  backgroundColor: primaryColor,
                }}
              >
                {navbarCTA.text}
              </a>
            ) : header_cta_primary ? (
              // Fallback to header CTA
              <>
                {header_cta_primary_url ? (
                  <a
                    href={header_cta_primary_url}
                    className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold shadow-md transform transition hover:-translate-y-0.5 hover:shadow-lg"
                    style={{
                      backgroundColor: primaryColor,
                    }}
                  >
                    {header_cta_primary}
                  </a>
                ) : (
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
              </>
            ) : null}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setOpen((s) => !s)}
              aria-label="Toggle menu"
              className="p-2 rounded-md md:hidden text-slate-800 dark:text-slate-100"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        <div
          className={`md:hidden mt-3 transition-all duration-300 ${
            open ? "max-h-96 overflow-y-auto" : "max-h-0 overflow-hidden"
          }`}
        >
          <div className="backdrop-blur-md bg-white/30 dark:bg-gray-900/30 border border-white/10 dark:border-gray-800/30 rounded-xl shadow-lg p-4 flex flex-col gap-3">
            {links.map((link) => (
              <div key={link.id}>
                {link.children && link.children.length > 0 ? (
                  // Mobile dropdown
                  <div>
                    <button
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === link.id ? null : link.id
                        )
                      }
                      className="w-full flex items-center justify-between text-base font-medium text-slate-800 dark:text-slate-100 py-2 px-2"
                    >
                      {link.title}
                      <ChevronDown
                        size={16}
                        className={`transform transition-transform ${
                          activeDropdown === link.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {activeDropdown === link.id && (
                      <div className="ml-4 mt-2 space-y-2">
                        {link.children.map((child) => (
                          <a
                            key={child.id}
                            href={child.url}
                            className="block text-sm text-slate-700 dark:text-slate-300 py-2 px-2 rounded hover:bg-white/10 transition"
                            onClick={() => setOpen(false)}
                          >
                            {child.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={link.url}
                    className="block text-base font-medium text-slate-800 dark:text-slate-100 py-2 px-2 rounded hover:bg-white/10 transition"
                    onClick={() => setOpen(false)}
                  >
                    {link.title}
                  </a>
                )}
              </div>
            ))}

            {/* Mobile CTA */}
            {navbarCTA?.text ? (
              <a
                href={navbarCTA.url || "#"}
                className="mt-2 inline-block px-4 py-2 rounded-lg text-white font-semibold text-center shadow-md"
                style={{
                  backgroundColor: primaryColor,
                }}
                onClick={() => setOpen(false)}
              >
                {navbarCTA.text}
              </a>
            ) : header_cta_primary ? (
              <>
                {header_cta_primary_url ? (
                  <a
                    href={header_cta_primary_url}
                    className="mt-2 inline-block px-4 py-2 rounded-lg text-white font-semibold text-center shadow-md"
                    style={{
                      backgroundColor: primaryColor,
                    }}
                    onClick={() => setOpen(false)}
                  >
                    {header_cta_primary}
                  </a>
                ) : (
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
                )}
              </>
            ) : null}
          </div>
        </div>
      </div>

      {/* Decorative gradient and blur under the nav for depth */}
      <div className="pointer-events-none absolute inset-x-0 top-full mt-4 flex justify-center">
        <div
          className="w-56 h-2 rounded-full opacity-30 blur-sm"
          style={{
            backgroundColor: primaryColor,
          }}
        ></div>
      </div>
    </nav>
  );
}

export default GlassNavbar;
