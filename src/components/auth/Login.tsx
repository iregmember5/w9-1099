import React, { useState } from "react";

interface LoginFormProps {
  onToggleMode: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onToggleMode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form className="space-y-6">
      <div>
        <label style={{ color: "var(--text-color)" }} className="block mb-1">
          Email
        </label>
        <input
          type="email"
          className="w-full p-3 rounded-lg border"
          style={{
            background: "white",
            color: "black",
            borderColor: "var(--neutral-color)",
          }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label style={{ color: "var(--text-color)" }} className="block mb-1">
          Password
        </label>
        <input
          type="password"
          className="w-full p-3 rounded-lg border"
          style={{
            background: "white",
            color: "black",
            borderColor: "var(--neutral-color)",
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="w-full font-semibold py-3 rounded-lg transition transform hover:scale-105 shadow-lg"
        style={{
          background: "var(--accent-color)",
          color: "white",
        }}
      >
        Sign In
      </button>

      <p className="text-center" style={{ color: "var(--neutral-color)" }}>
        Don't have an account?{" "}
        <button
          onClick={onToggleMode}
          type="button"
          style={{ color: "var(--accent-color)" }}
          className="font-medium"
        >
          Sign up
        </button>
      </p>
    </form>
  );
};
