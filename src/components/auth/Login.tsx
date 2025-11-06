import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

interface LoginFormProps {
  onToggleMode: () => void;
  accentColor: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onToggleMode,
  accentColor,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email Field */}
      <div>
        <label
          className="block text-sm font-medium mb-2"
          style={{ color: "var(--text-color)" }}
        >
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-lg transition border focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
          style={{
            borderColor: "var(--neutral-color)",
            backgroundColor: "var(--background-color)",
            color: "var(--text-color)",
          }}
          placeholder="you@example.com"
          required
        />
      </div>

      {/* Password Field */}
      <div>
        <label
          className="block text-sm font-medium mb-2"
          style={{ color: "var(--text-color)" }}
        >
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-lg transition border focus:ring-2 focus:border-transparent"
          style={{
            borderColor: "var(--neutral-color)",
            backgroundColor: "var(--background-color)",
            color: "var(--text-color)",
          }}
          placeholder="••••••••"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full font-semibold py-3 rounded-lg transition transform hover:scale-105 shadow-lg"
        style={{ color: accentColor }}
      >
        Sign In
      </button>

      {/* Toggle */}
      <p
        className="text-center text-sm"
        style={{ color: "var(--neutral-color)" }}
      >
        Don’t have an account?{" "}
        <button
          type="button"
          onClick={onToggleMode}
          className="font-medium"
          style={{ color: accentColor }}
        >
          Sign up
        </button>
      </p>
    </form>
  );
};
