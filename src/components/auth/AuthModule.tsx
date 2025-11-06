import React, { useState, useEffect } from "react";
import { Globe } from "lucide-react";
import { LoginForm } from "./Login";
import { SignupForm } from "./SignupForm";
import { fetchLandingPageData } from "../../services/waigtail/landing";
import type { ColorTheme } from "../../types/landing";

interface AuthModuleProps {
  colorTheme?: ColorTheme;
}

export const AuthModule: React.FC<AuthModuleProps> = ({
  colorTheme: propColorTheme,
}) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [colorTheme, setColorTheme] = useState<ColorTheme | null>(
    propColorTheme || null
  );
  const [loading, setLoading] = useState(!propColorTheme);

  useEffect(() => {
    // If colorTheme not provided as prop, fetch it from API
    if (!propColorTheme) {
      const loadColorTheme = async () => {
        try {
          const data = await fetchLandingPageData();
          if (data.color_theme) {
            setColorTheme(data.color_theme);
          }
        } catch (error) {
          console.error("Failed to load color theme:", error);
        } finally {
          setLoading(false);
        }
      };
      loadColorTheme();
    } else {
      setColorTheme(propColorTheme);
      setLoading(false);
    }
  }, [propColorTheme]);

  // Default colors if no theme provided
  const theme = colorTheme || {
    id: 0,
    name: "Default",
    primary_color: "#4F46E5",
    secondary_color: "#7C3AED",
    accent_color: "#6366F1",
    neutral_color: "#6B7280",
    background_color: "#FFFFFF",
    text_color: "#1F2937",
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
        }}
      >
        <div className="text-white text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mb-4"></div>
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: `linear-gradient(135deg, ${theme.primary_color} 0%, ${theme.secondary_color} 100%)`,
      }}
    >
      <div
        className="rounded-2xl shadow-2xl w-full max-w-md p-8"
        style={{
          backgroundColor:
            theme.background_color === "#6B7280"
              ? "#FFFFFF"
              : theme.background_color,
        }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${theme.primary_color}, ${theme.accent_color})`,
            }}
          >
            <Globe className="w-8 h-8 text-white" />
          </div>

          <h1
            className="text-3xl font-bold mb-2"
            style={{ color: theme.text_color }}
          >
            Multi-Tenant CMS
          </h1>

          <p className="text-sm" style={{ color: theme.neutral_color }}>
            Deploy your website in seconds
          </p>
        </div>

        {/* Form */}
        {isLoginMode ? (
          <LoginForm
            onToggleMode={() => setIsLoginMode(false)}
            colorTheme={theme}
          />
        ) : (
          <SignupForm
            onToggleMode={() => setIsLoginMode(true)}
            colorTheme={theme}
          />
        )}
      </div>
    </div>
  );
};
