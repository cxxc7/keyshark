"use client";
import { useEffect, useRef, useState } from "react";
import Sidebar from "../Sidebar";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  // Only store the part before @gmail.com
  const getEmailInput = () => {
    if (email.endsWith("@gmail.com")) {
      return email.slice(0, -10);
    }
    return email;
  };
  const setEmailWithSuffix = (val: string) => {
    setEmail(val.endsWith("@gmail.com") ? val : val + "@gmail.com");
  };
  const [pic, setPic] = useState<string | null>(null);
  const [picPreview, setPicPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // If not logged in, redirect to login
      const user = localStorage.getItem("user");
      const accountsRaw = localStorage.getItem("accounts");
      const accounts = accountsRaw ? JSON.parse(accountsRaw) : [];
      const account = accounts.find((acc: any) => acc.username === user);
      if (!user || !account) {
        router.push("/login");
        return;
      }
      setEmail(user);
      // If no name is set, use the username (before @) as default
      let defaultName = account?.preferences?.name;
      if (!defaultName || defaultName.trim() === "") {
        if (account?.username) {
          defaultName = account.username.split("@")[0];
        } else if (user) {
          defaultName = user.split("@")[0];
        } else {
          defaultName = "";
        }
      }
      setName(defaultName);
      setDob(account?.preferences?.dob ?? "");
      setPic(account?.preferences?.pic ?? null);
      setPicPreview(account?.preferences?.pic ?? null);
    }
  }, [router]);

  function handlePicChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPic(reader.result as string);
        setPicPreview(reader.result as string);
        localStorage.setItem("profilePic", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleSave() {
    // Save preferences to the correct user in accounts
    const user = localStorage.getItem("user");
    if (user) {
      const accountsRaw = localStorage.getItem("accounts");
      let accounts = accountsRaw ? JSON.parse(accountsRaw) : [];
      const idx = accounts.findIndex((acc: any) => acc.username === user);
      if (idx !== -1) {
        // Save the email as username and in preferences
        accounts[idx].username = email.endsWith("@gmail.com") ? email : email + "@gmail.com";
        accounts[idx].preferences = { name, dob, pic, email: accounts[idx].username };
        localStorage.setItem("accounts", JSON.stringify(accounts));
        localStorage.setItem("user", accounts[idx].username);
      }
    }
    // Redirect to typing test page after save
    router.push("/");
  }

  function handleLogout() {
    localStorage.removeItem("user");
    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-zinc-900 dark:via-zinc-950 dark:to-blue-900 flex flex-col">
      <Sidebar />
      {/* Removed custom top bar, only global top bar will show */}
      <main className="flex-1 flex flex-col items-center justify-center pt-16 xs:pt-20 pb-6 xs:pb-10 px-2 xs:px-4">
        <section className="w-full max-w-sm xs:max-w-lg sm:max-w-2xl bg-white/90 dark:bg-zinc-900/90 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-4 xs:p-6 sm:p-8 flex flex-col gap-6 xs:gap-8 mt-4">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl font-extrabold text-center mb-2 mt-2 text-blue-700 dark:text-blue-200 tracking-tight drop-shadow">Profile <span className="text-xs xs:text-base font-normal text-zinc-500"> Your Account</span></h1>
          <div className="flex flex-col items-center gap-4 xs:gap-6">
            <div className="relative group flex items-center justify-center">
              {picPreview ? (
                <img
                  src={picPreview}
                  alt="Profile pic"
                  className="w-24 xs:w-32 h-24 xs:h-32 rounded-full object-cover border-4 border-blue-300 dark:border-zinc-700 shadow-lg transition-transform group-hover:scale-105"
                />
              ) : (
                <div className="w-24 xs:w-32 h-24 xs:h-32 rounded-full flex items-center justify-center bg-blue-200 dark:bg-zinc-700 text-4xl xs:text-6xl font-extrabold text-blue-700 dark:text-blue-200 border-4 border-blue-300 dark:border-zinc-700 shadow-lg">
                  {email ? email[0].toUpperCase() : "?"}
                </div>
              )}
              <button
                className="absolute bottom-3 right-3 bg-blue-600 text-white rounded-full p-2 shadow-lg hover:bg-blue-700 focus:outline-none border-2 border-white dark:border-zinc-900 transition flex items-center justify-center w-9 h-9 xs:w-11 xs:h-11"
                style={{transform: 'translate(25%, 25%)'}} // visually overlap corner
                onClick={() => fileInputRef.current?.click()}
                aria-label="Upload profile picture"
              >
                <svg className="w-5 h-5 xs:w-6 xs:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 16v-8M8 12l4-4 4 4"/></svg>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePicChange}
              />
            </div>
            <span className="text-xs text-zinc-500">Click the icon to upload a new picture</span>
          </div>
          <form className="flex flex-col gap-3 xs:gap-4 w-full max-w-xs xs:max-w-md mx-auto mt-2">
            <label className="text-sm xs:text-base font-semibold">Name
              <input
                type="text"
                className="mt-1 p-2 xs:p-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 w-full text-base xs:text-lg font-medium focus:ring-2 focus:ring-blue-400 focus:outline-none"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your name"
                autoComplete="name"
              />
            </label>
            <label className="text-sm xs:text-base font-semibold">Date of Birth
              <input
                type="date"
                className="mt-1 p-2 xs:p-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 w-full text-base xs:text-lg font-medium focus:ring-2 focus:ring-blue-400 focus:outline-none"
                value={dob}
                onChange={e => setDob(e.target.value)}
                autoComplete="bday"
              />
            </label>
            <label className="text-sm xs:text-base font-semibold">Email
              <div className="flex items-center">
                <input
                  type="text"
                  className="mt-1 p-2 xs:p-3 rounded-l-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 w-full text-base xs:text-lg font-medium focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  value={getEmailInput()}
                  onChange={e => setEmailWithSuffix(e.target.value)}
                  placeholder="yourname"
                  aria-label="Email username"
                  autoComplete="username"
                />
                <span className="mt-1 p-2 xs:p-3 rounded-r-lg border-t border-b border-r border-zinc-300 dark:border-zinc-700 bg-zinc-200 dark:bg-zinc-700 text-zinc-500 select-none text-base xs:text-lg font-medium">@gmail.com</span>
              </div>
            </label>
          </form>
          <div className="flex flex-col xs:flex-row gap-3 xs:gap-4 mt-6 w-full max-w-xs xs:max-w-md mx-auto">
            <button
              className="px-4 xs:px-6 py-2 xs:py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition text-base xs:text-lg font-bold flex-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              onClick={handleSave}
              type="button"
            >
              Save Profile
            </button>
            <button
              className="px-4 xs:px-6 py-2 xs:py-3 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 rounded-lg shadow-lg hover:bg-zinc-300 dark:hover:bg-zinc-700 transition text-base xs:text-lg font-bold flex-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              onClick={handleLogout}
              type="button"
            >
              Logout
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
