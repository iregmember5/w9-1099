import React from "react";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import type { LandingPageData } from "../../../types/landing";

interface FooterProps {
  data: LandingPageData;
}

function Footer({ data }: FooterProps) {
  const footerConfig = data.footer_config;

  if (!footerConfig) {
    return null;
  }

  const primaryColor = data.color_theme?.primary_color || "#3B82F6";
  //   const textColor = data.color_theme?.text_color || "#1F2937";

  // Social media links configuration
  const socialLinks = [
    {
      icon: Facebook,
      url: footerConfig.social_links?.facebook,
      label: "Facebook",
    },
    {
      icon: Twitter,
      url: footerConfig.social_links?.twitter,
      label: "Twitter",
    },
    {
      icon: Linkedin,
      url: footerConfig.social_links?.linkedin,
      label: "LinkedIn",
    },
    {
      icon: Instagram,
      url: footerConfig.social_links?.instagram,
      label: "Instagram",
    },
    {
      icon: Youtube,
      url: footerConfig.social_links?.youtube,
      label: "YouTube",
    },
  ].filter((link) => link.url);

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info Section */}
          <div className="space-y-4">
            {footerConfig.company_info?.logo ? (
              <img
                src={footerConfig.company_info.logo.url}
                alt={footerConfig.company_info.logo.title || "Company Logo"}
                className="h-12 w-auto"
              />
            ) : (
              <div
                className="h-12 w-12 rounded-lg flex items-center justify-center text-white font-bold text-xl"
                style={{ backgroundColor: primaryColor }}
              >
                {data.title?.charAt(0) || "L"}
              </div>
            )}

            {footerConfig.company_info?.description && (
              <p className="text-sm leading-relaxed">
                {footerConfig.company_info.description}
              </p>
            )}

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex gap-3 mt-4">
                {socialLinks.map((social, idx) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
                      style={
                        {
                          "--hover-color": primaryColor,
                        } as React.CSSProperties
                      }
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = primaryColor;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "";
                      }}
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Links Section */}
          {footerConfig.sections?.quick_links && (
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#home"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#features"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#benefits"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Benefits
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Testimonials
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    className="text-sm hover:text-white transition-colors"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          )}

          {/* Services Section */}
          {footerConfig.sections?.services && (
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">
                Services
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#services"
                    className="text-sm hover:text-white transition-colors"
                  >
                    All Services
                  </a>
                </li>
                <li>
                  <a
                    href="#consultation"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Consultation
                  </a>
                </li>
                <li>
                  <a
                    href="#support"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Support
                  </a>
                </li>
                <li>
                  <a
                    href="#resources"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Resources
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="text-sm hover:text-white transition-colors"
                  >
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
          )}

          {/* Contact Section */}
          {footerConfig.sections?.contact && (
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">
                Contact Us
              </h3>
              <ul className="space-y-3">
                {footerConfig.contact_info?.address && (
                  <li className="flex items-start gap-3">
                    <MapPin
                      size={18}
                      className="mt-0.5 flex-shrink-0"
                      style={{ color: primaryColor }}
                    />
                    <span className="text-sm">
                      {footerConfig.contact_info.address}
                    </span>
                  </li>
                )}
                {footerConfig.contact_info?.phone && (
                  <li className="flex items-center gap-3">
                    <Phone
                      size={18}
                      className="flex-shrink-0"
                      style={{ color: primaryColor }}
                    />
                    <a
                      href={`tel:${footerConfig.contact_info.phone}`}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {footerConfig.contact_info.phone}
                    </a>
                  </li>
                )}
                {footerConfig.contact_info?.email && (
                  <li className="flex items-center gap-3">
                    <Mail
                      size={18}
                      className="flex-shrink-0"
                      style={{ color: primaryColor }}
                    />
                    <a
                      href={`mailto:${footerConfig.contact_info.email}`}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {footerConfig.contact_info.email}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-400 text-center md:text-left">
              {footerConfig.copyright_text ||
                `© ${new Date().getFullYear()} ${
                  data.title
                }. All rights reserved.`}
            </p>

            <div className="flex gap-6 text-sm">
              <a
                href="#privacy"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#terms"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#cookies"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
