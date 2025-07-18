"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Preferences = {
  name?: string;
  dob?: string;
  pic?: string | null;
  email?: string;
};

type Account = {
  username: string;
  password: string;
  preferences?: Preferences;
};

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Signup failed.");
        return;
      }

      if (typeof window !== "undefined") {
        const accountsRaw = localStorage.getItem("accounts");
        const accounts: Account[] = accountsRaw ? JSON.parse(accountsRaw) : [];

        const exists = accounts.find((acc) => acc.username === username);
        if (!exists) {
          accounts.push({ username, password, preferences: {} });
          localStorage.setItem("accounts", JSON.stringify(accounts));
        }
      }

      localStorage.setItem("user", username);
      setError("");
      router.push("/profile");
    } catch (err) {
      console.error("Signup error:", err);
      setError("Network error. Please try again.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-white to-blue-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-blue-900 p-2 xs:p-4">
      <form
        onSubmit={handleSignup}
        className="bg-white/90 dark:bg-zinc-900/90 p-6 xs:p-10 rounded-3xl shadow-2xl w-full max-w-xs xs:max-w-md flex flex-col gap-5 xs:gap-7 border border-zinc-200 dark:border-zinc-800 backdrop-blur"
      >
        <h1 className="text-2xl xs:text-4xl font-extrabold text-center mb-2 text-blue-700 dark:text-blue-200 tracking-tight drop-shadow">
          Create Account
        </h1>
        <p className="text-center text-zinc-500 dark:text-zinc-400 mb-2 text-sm xs:text-base">
          Sign up to get started
        </p>

        {/* Username input */}
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none">
            <svg width="20" height="20" className="xs:w-[22px] xs:h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 7.5v.008M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 0c-3.038 0-5.5 2.462-5.5 5.5v.25A2.25 2.25 0 0 0 8.75 20h6.5a2.25 2.25 0 0 0 2.25-2.25v-.25c0-3.038-2.462-5.5-5.5-5.5Z" />
            </svg>
          </span>
          <input
            type="text"
            className="p-3 xs:p-4 pl-10 xs:pl-12 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base xs:text-lg font-medium w-full"
            placeholder="Email or Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
        </div>

        {/* Password input */}
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none">
            <svg width="20" height="20" className="xs:w-[22px] xs:h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V7a4.5 4.5 0 0 0-9 0v3.5m-1.5 0A1.5 1.5 0 0 0 4.5 12v6A1.5 1.5 0 0 0 6 19.5h12a1.5 1.5 0 0 0 1.5-1.5v-6a1.5 1.5 0 0 0-1.5-1.5m-13.5 0h15" />
            </svg>
          </span>
          <input
            type={showPassword ? "text" : "password"}
            className="p-3 xs:p-4 pl-10 xs:pl-12 pr-10 xs:pr-12 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base xs:text-lg font-medium w-full"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
          <button
            type="button"
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-blue-500 dark:hover:text-blue-300 focus:outline-none"
            onClick={() => setShowPassword((v) => !v)}
          >
            {showPassword ? (
              <svg width="20" height="20" className="xs:w-[22px] xs:h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M10.477 10.477A3 3 0 0 0 12 15a3 3 0 0 0 2.828-4.243M9.88 9.88A3 3 0 0 1 15 12c0 1.657-1.343 3-3 3a3 3 0 0 1-2.12-.88M21 12c0 4-4.03 7-9 7-1.657 0-3.22-.267-4.5-.732M3 12c0-4 4.03-7 9-7 1.657 0 3.22.267 4.5.732" />
              </svg>
            ) : (
              <svg width="20" height="20" className="xs:w-[22px] xs:h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5c-7 0-9 7-9 7s2 7 9 7 9-7 9-7-2-7-9-7Zm0 0a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z" />
              </svg>
            )}
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="text-red-500 text-sm text-center font-semibold bg-red-50 dark:bg-zinc-800 rounded-lg py-2 px-3">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="mt-2 py-2 xs:py-3 px-4 rounded-xl bg-blue-600 text-white font-bold text-base xs:text-lg hover:bg-blue-700 transition shadow-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          Sign Up
        </button>

        <div className="text-xs xs:text-sm text-center text-zinc-500 mt-2">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 dark:text-blue-400 underline font-semibold"
          >
            Login
          </a>
        </div>
      </form>
    </div>
  );
}
