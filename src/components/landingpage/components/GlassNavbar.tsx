import React, { useState } from "react";
import { Menu, X } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
}

interface GlassNavbarProps {
  brand?: React.ReactNode;
  links?: NavLink[];
  primaryCta?: { label: string; href: string } | null;
}

export default function GlassNavbar({
  brand = <span className="font-bold text-xl">Tax Specialist</span>,
  links = [
    { label: "Home", href: "#" },
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "#contact" },
  ],
  primaryCta = { label: "Get Started", href: "#" },
}: GlassNavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Glass container */}
        <div className="backdrop-blur-md bg-white/30 dark:bg-gray-900/30 border border-white/10 dark:border-gray-800/30 rounded-2xl shadow-lg p-2 md:p-3 flex items-center justify-between">
          {/* Left: Brand */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-white/20 dark:bg-gray-800/30 border border-white/10">
              {/* simple logo circle */}
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
            <div className="hidden sm:block text-slate-900 dark:text-slate-100">
              {brand}
            </div>
          </div>

          {/* Center: Links (desktop) */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right: CTA + Mobile button */}
          <div className="flex items-center gap-3">
            {primaryCta && (
              <a
                href={primaryCta.href}
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold shadow-md transform transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                {primaryCta.label}
              </a>
            )}

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
            open ? "max-h-96" : "max-h-0 overflow-hidden"
          }`}
        >
          <div className="backdrop-blur-md bg-white/30 dark:bg-gray-900/30 border border-white/10 dark:border-gray-800/30 rounded-xl shadow-lg p-4 flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-base font-medium text-slate-800 dark:text-slate-100 py-2 px-2 rounded hover:bg-white/10 transition"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}

            {primaryCta && (
              <a
                href={primaryCta.href}
                className="mt-2 inline-block px-4 py-2 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-center shadow-md"
                onClick={() => setOpen(false)}
              >
                {primaryCta.label}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Decorative gradient and blur under the nav for depth */}
      <div className="pointer-events-none absolute inset-x-0 top-full mt-4 flex justify-center">
        <div className="w-56 h-2 rounded-full bg-gradient-to-r from-sky-400 to-indigo-500 opacity-30 blur-sm"></div>
      </div>
    </nav>
  );
}
