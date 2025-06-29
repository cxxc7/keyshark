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
      <header className="fixed top-0 left-0 w-full z-30 flex flex-col sm:flex-row items-center justify-between px-4 sm:px-10 py-3 bg-white/80 dark:bg-zinc-950/80 backdrop-blur border-b border-zinc-200 dark:border-zinc-800 shadow-sm md:ml-44 sm:ml-56">
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold text-blue-700 dark:text-blue-300 tracking-tight">
            <svg className="w-7 h-7 text-blue-700 dark:text-blue-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M2 12l10-7 10 7-10 7-10-7z"/><path d="M2 12v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-7"/></svg>
            KeyShark
          </Link>
          <span className="hidden xs:inline text-base text-zinc-500 ml-3 font-medium">Profile</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-6 flex-nowrap w-full sm:w-auto justify-end">
          <button
            className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-zinc-800 flex items-center gap-2 transition border border-blue-200 dark:border-zinc-700"
            aria-label="Back to Typing Test"
            onClick={() => router.push("/")}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
            <span className="hidden sm:inline font-semibold">Back</span>
          </button>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center pt-24 pb-10 px-2">
        <section className="w-full max-w-xl bg-white/90 dark:bg-zinc-900/90 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-8 flex flex-col gap-8 mt-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-2 mt-2 text-blue-700 dark:text-blue-200 tracking-tight drop-shadow">Profile <span className="text-base font-normal text-zinc-500">— Your Account</span></h1>
          <div className="flex flex-col items-center gap-6">
            <div className="relative group">
              {picPreview ? (
                <img
                  src={picPreview}
                  alt="Profile pic"
                  className="w-28 h-28 rounded-full object-cover border-4 border-blue-300 dark:border-zinc-700 shadow-lg transition-transform group-hover:scale-105"
                />
              ) : (
                <div className="w-28 h-28 rounded-full flex items-center justify-center bg-blue-200 dark:bg-zinc-700 text-5xl font-extrabold text-blue-700 dark:text-blue-200 border-4 border-blue-300 dark:border-zinc-700 shadow-lg">
                  {email ? email[0].toUpperCase() : "?"}
                </div>
              )}
              <button
                className="absolute bottom-2 right-2 bg-blue-600 text-white rounded-full p-2 shadow-lg hover:bg-blue-700 focus:outline-none border-2 border-white dark:border-zinc-900 transition"
                onClick={() => fileInputRef.current?.click()}
                aria-label="Upload profile picture"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 16v-8M8 12l4-4 4 4"/></svg>
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
          <form className="flex flex-col gap-4 w-full max-w-md mx-auto mt-2">
            <label className="text-base font-semibold">Name
              <input
                type="text"
                className="mt-1 p-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 w-full text-lg font-medium focus:ring-2 focus:ring-blue-400 focus:outline-none"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your name"
                autoComplete="name"
              />
            </label>
            <label className="text-base font-semibold">Date of Birth
              <input
                type="date"
                className="mt-1 p-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 w-full text-lg font-medium focus:ring-2 focus:ring-blue-400 focus:outline-none"
                value={dob}
                onChange={e => setDob(e.target.value)}
                autoComplete="bday"
              />
            </label>
            <label className="text-base font-semibold">Email
              <div className="flex items-center">
                <input
                  type="text"
                  className="mt-1 p-3 rounded-l-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 w-full text-lg font-medium focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  value={getEmailInput()}
                  onChange={e => setEmailWithSuffix(e.target.value)}
                  placeholder="yourname"
                  aria-label="Email username"
                  autoComplete="username"
                />
                <span className="mt-1 p-3 rounded-r-lg border-t border-b border-r border-zinc-300 dark:border-zinc-700 bg-zinc-200 dark:bg-zinc-700 text-zinc-500 select-none text-lg font-medium">@gmail.com</span>
              </div>
            </label>
          </form>
          <div className="flex gap-4 mt-6 w-full max-w-md mx-auto">
            <button
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition text-lg font-bold flex-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              onClick={handleSave}
              type="button"
            >
              Save Profile
            </button>
            <button
              className="px-6 py-3 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 rounded-lg shadow-lg hover:bg-zinc-300 dark:hover:bg-zinc-700 transition text-lg font-bold flex-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
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
