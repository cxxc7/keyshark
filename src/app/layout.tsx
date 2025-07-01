"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TopBar from "./TopBar";
import { useEffect, useState } from "react";

// Font config
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Define user type
type User = {
  username: string;
  password: string;
  preferences?: Record<string, unknown>;
};

function AuthGuard({ children }: Readonly<{ children: React.ReactNode }>) {
  const [isAuth, setIsAuth] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const allowed = ["/login", "/signup"];
    const path = typeof window !== "undefined" ? window.location.pathname : "";
    const user = typeof window !== "undefined" ? localStorage.getItem("user") : null;

    if (allowed.includes(path)) {
      setIsAuth(true);
      setChecked(true);
      return;
    }

    const accountsRaw = typeof window !== "undefined" ? localStorage.getItem("accounts") : null;
    let accounts: User[] = [];

    try {
      accounts = accountsRaw ? (JSON.parse(accountsRaw) as User[]) : [];
    } catch {
      accounts = [];
    }

    if (user && accounts.some((acc) => acc.username === user)) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
      if (typeof window !== "undefined") window.location.href = "/login";
    }
    setChecked(true);
  }, []);

  if (!checked || !isAuth) return null;
  return <>{children}</>;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Hide TopBar on /login and /signup
  let showTopBar = true;
  if (typeof window !== "undefined") {
    const path = window.location.pathname;
    if (path === "/login" || path === "/signup") showTopBar = false;
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-zinc-900 dark:via-zinc-950 dark:to-blue-900`}
      >
        {showTopBar && <TopBar />}
        <AuthGuard>{children}</AuthGuard>
      </body>
    </html>
  );
}
