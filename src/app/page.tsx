// import Image from "next/image";
import TypingTest from "./TypingTest";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900 flex flex-col items-center justify-center p-2 xs:p-4">
      <TypingTest />
      <footer className="mt-8 xs:mt-12 text-xs xs:text-sm text-zinc-500 dark:text-zinc-400 text-center w-full">
        <p>
          KeyShark &mdash; Inspired by Monkeytype. Made for typists | Hosted on Vercel
        </p>
      </footer>
    </div>
  );
}
