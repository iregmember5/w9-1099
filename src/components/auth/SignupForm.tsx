import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { isValidEmail } from "../../utils/validation";
import type { ColorTheme } from "../../types/landing";

interface SignupFormProps {
  onToggleMode: () => void;
  colorTheme: ColorTheme;
}

interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

interface SignupFormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  acceptTerms?: string;
}

export const SignupForm: React.FC<SignupFormProps> = ({
  onToggleMode,
  colorTheme,
}) => {
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [errors, setErrors] = useState<SignupFormErrors>({});
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name as keyof SignupFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
    if (apiError) setApiError("");
  };

  const validateForm = (): boolean => {
    const newErrors: SignupFormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await signup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        companyName: "",
        phoneNumber: "",
        acceptTerms: formData.acceptTerms,
      });
    } catch (error: any) {
      setApiError(error.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium mb-1"
            style={{ color: colorTheme.text_color }}
          >
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            disabled={isLoading}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none transition"
            style={{
              backgroundColor: "#FFFFFF",
              color: "#000000",
              borderColor: errors.firstName
                ? "#EF4444"
                : colorTheme.neutral_color,
            }}
            placeholder="John"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm" style={{ color: "#EF4444" }}>
              {errors.firstName}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium mb-1"
            style={{ color: colorTheme.text_color }}
          >
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            disabled={isLoading}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none transition"
            style={{
              backgroundColor: "#FFFFFF",
              color: "#000000",
              borderColor: errors.lastName
                ? "#EF4444"
                : colorTheme.neutral_color,
            }}
            placeholder="Doe"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm" style={{ color: "#EF4444" }}>
              {errors.lastName}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium mb-1"
          style={{ color: colorTheme.text_color }}
        >
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none transition"
          style={{
            backgroundColor: "#FFFFFF",
            color: "#000000",
            borderColor: errors.email ? "#EF4444" : colorTheme.neutral_color,
          }}
          placeholder="john@company.com"
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
          Password *
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          disabled={isLoading}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none transition"
          style={{
            backgroundColor: "#FFFFFF",
            color: "#000000",
            borderColor: errors.password ? "#EF4444" : colorTheme.neutral_color,
          }}
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="mt-1 text-sm" style={{ color: "#EF4444" }}>
            {errors.password}
          </p>
        )}
        <p className="mt-1 text-xs" style={{ color: colorTheme.neutral_color }}>
          Must be at least 8 characters with uppercase, lowercase, and number
        </p>
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium mb-1"
          style={{ color: colorTheme.text_color }}
        >
          Confirm Password *
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          disabled={isLoading}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none transition"
          style={{
            backgroundColor: "#FFFFFF",
            color: "#000000",
            borderColor: errors.confirmPassword
              ? "#EF4444"
              : colorTheme.neutral_color,
          }}
          placeholder="••••••••"
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm" style={{ color: "#EF4444" }}>
            {errors.confirmPassword}
          </p>
        )}
      </div>

      <div className="flex items-start space-x-3">
        <input
          type="checkbox"
          id="acceptTerms"
          name="acceptTerms"
          checked={formData.acceptTerms}
          onChange={handleChange}
          disabled={isLoading}
          className="mt-1 w-4 h-4 rounded border focus:ring-2"
          style={{
            accentColor: colorTheme.accent_color,
            borderColor: colorTheme.neutral_color,
          }}
        />
        <label
          htmlFor="acceptTerms"
          className="text-sm"
          style={{ color: colorTheme.text_color }}
        >
          I agree to the{" "}
          <a
            href="#"
            className="font-medium hover:underline"
            style={{ color: colorTheme.accent_color }}
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="font-medium hover:underline"
            style={{ color: colorTheme.accent_color }}
          >
            Privacy Policy
          </a>
          *
        </label>
      </div>
      {errors.acceptTerms && (
        <p className="text-sm" style={{ color: "#EF4444" }}>
          {errors.acceptTerms}
        </p>
      )}

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
            <span>Creating Account...</span>
          </>
        ) : (
          <span>Create Account</span>
        )}
      </button>

      <div
        className="text-center pt-4 border-t"
        style={{ borderColor: colorTheme.neutral_color + "30" }}
      >
        <p className="text-sm" style={{ color: colorTheme.neutral_color }}>
          Already have an account?{" "}
          <button
            type="button"
            onClick={onToggleMode}
            className="font-medium hover:underline"
            style={{ color: colorTheme.accent_color }}
            disabled={isLoading}
          >
            Sign in
          </button>
        </p>
      </div>
    </form>
  );
};
