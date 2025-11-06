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
        backgroundImage: `linear-gradient(to bottom right, var(--bg-start), var(--bg-end))`,
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
            style={{ background: "var(--icon-bg)" }}
          >
            <Globe className="w-8 h-8 text-white" />
          </div>

          <h1
            className="text-3xl font-bold mb-2"
            style={{ color: "var(--heading-color)" }}
          >
            Multi-Tenant CMS
          </h1>

          <p style={{ color: "var(--text-muted)" }}>
            Deploy your website in seconds
          </p>
        </div>

        {isLoginMode ? (
          <LoginForm
            onToggleMode={() => setIsLoginMode(false)}
            accentColor="var(--accent-orange)"
          />
        ) : (
          <SignupForm onToggleMode={() => setIsLoginMode(true)} />
        )}
      </div>
    </div>
  );
};
