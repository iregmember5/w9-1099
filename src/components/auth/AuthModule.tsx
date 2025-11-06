import React, { useState } from "react";
import { Globe } from "lucide-react";
import { LoginForm } from "./Login";
import { SignupForm } from "./SignupForm";

export const AuthModule: React.FC = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: `linear-gradient(to bottom right, var(--primary-color), var(--secondary-color))`,
      }}
    >
      <div
        className="rounded-2xl shadow-2xl w-full max-w-md p-8"
        style={{ backgroundColor: "var(--background-color)" }}
      >
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
            style={{ background: "var(--primary-color)" }}
          >
            <Globe className="w-8 h-8" style={{ color: "white" }} />
          </div>

          <h1
            className="text-3xl font-bold mb-2"
            style={{ color: "var(--text-color)" }}
          >
            Multi-Tenant CMS
          </h1>

          <p style={{ color: "var(--neutral-color)" }}>
            Deploy your website in seconds
          </p>
        </div>

        {isLoginMode ? (
          <LoginForm onToggleMode={() => setIsLoginMode(false)} />
        ) : (
          <SignupForm onToggleMode={() => setIsLoginMode(true)} />
        )}
      </div>
    </div>
  );
};
