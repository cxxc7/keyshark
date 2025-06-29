"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "KeyShark | Inspired by Monkeytype",
//   description:
//     "KeyShark is a modern, minimalist typing test app inspired by Monkeytype. Practice your typing speed and accuracy in a clean, accessible interface.",
// };

import { useEffect, useState } from "react";

function AuthGuard({ children }: Readonly<{ children: React.ReactNode }>) {
  const [isAuth, setIsAuth] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Only allow access if user is logged in (except /login and /signup)
    const allowed = ["/login", "/signup"];
    const path = typeof window !== "undefined" ? window.location.pathname : "";
    const user = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (allowed.includes(path)) {
      setIsAuth(true);
      setChecked(true);
      return;
    }
    // Check if user exists in accounts
    const accountsRaw = typeof window !== "undefined" ? localStorage.getItem("accounts") : null;
    const accounts = accountsRaw ? JSON.parse(accountsRaw) : [];
    if (user && accounts.some((acc: any) => acc.username === user)) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
      if (typeof window !== "undefined") window.location.href = "/login";
    }
    setChecked(true);
  }, []);

  if (!checked) return null;
  if (!isAuth) return null;
  return <>{children}</>;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthGuard>{children}</AuthGuard>
      </body>
    </html>
  );
}
