import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import type { ColorTheme } from "../../types/landing";

interface LoginFormProps {
  onToggleMode: () => void;
  colorTheme: ColorTheme;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onToggleMode,
  colorTheme,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");
    const newErrors: { email?: string; password?: string } = {};

    // Basic validation
    if (!email) {
      newErrors.email = "Email is required";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
    } catch (error: any) {
      setApiError(error.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* API Error Display */}
      {apiError && (
        <div
          className="border rounded-lg p-4"
          style={{
            backgroundColor: "#FEF2F2",
            borderColor: "#FCA5A5",
          }}
        >
          <div className="flex items-center">
            <svg
              className="h-5 w-5 flex-shrink-0"
              style={{ color: "#EF4444" }}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <p className="ml-3 text-sm" style={{ color: "#991B1B" }}>
              {apiError}
            </p>
          </div>
        </div>
      )}

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium mb-1"
          style={{ color: colorTheme.text_color }}
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full px-3 py-2.5 rounded-lg border focus:ring-2 focus:outline-none transition"
          style={{
            backgroundColor: "#FFFFFF",
            color: "#000000",
            borderColor: errors.email ? "#EF4444" : colorTheme.neutral_color,
          }}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors({ ...errors, email: undefined });
            if (apiError) setApiError("");
          }}
          disabled={isLoading}
        />
        {errors.email && (
          <p className="mt-1 text-sm" style={{ color: "#EF4444" }}>
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium mb-1"
          style={{ color: colorTheme.text_color }}
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="w-full px-3 py-2.5 rounded-lg border focus:ring-2 focus:outline-none transition"
          style={{
            backgroundColor: "#FFFFFF",
            color: "#000000",
            borderColor: errors.password ? "#EF4444" : colorTheme.neutral_color,
          }}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) setErrors({ ...errors, password: undefined });
            if (apiError) setApiError("");
          }}
          disabled={isLoading}
        />
        {errors.password && (
          <p className="mt-1 text-sm" style={{ color: "#EF4444" }}>
            {errors.password}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full font-semibold py-3 rounded-lg transition transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        style={{
          background: `linear-gradient(135deg, ${colorTheme.primary_color}, ${colorTheme.accent_color})`,
          color: "#FFFFFF",
        }}
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Signing in...</span>
          </>
        ) : (
          <span>Sign In</span>
        )}
      </button>

      <p
        className="text-center text-sm pt-4 border-t"
        style={{
          color: colorTheme.neutral_color,
          borderColor: colorTheme.neutral_color + "30",
        }}
      >
        Don't have an account?{" "}
        <button
          onClick={onToggleMode}
          type="button"
          className="font-medium hover:underline"
          style={{ color: colorTheme.accent_color }}
          disabled={isLoading}
        >
          Sign up
        </button>
      </p>
    </form>
  );
};
