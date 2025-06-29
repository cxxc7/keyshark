"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type NavItem = {
  path: string;
  label: string;
  icon: React.ReactElement;
  exact?: boolean;
  className?: string;
};

function SidebarNavButton({
  path,
  label,
  icon,
  currentPath,
  onClick,
  exact = false,
  className = "",
  collapsed = false,
}: NavItem & { currentPath: string; onClick: (path: string) => void; collapsed?: boolean }) {
  const isActive = exact
    ? currentPath === path
    : currentPath.startsWith(path);

  return (
    <button
      onClick={() => onClick(path)}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition hover:bg-blue-50 dark:hover:bg-zinc-800 ${isActive ? "bg-blue-100 dark:bg-zinc-800" : ""} ${className}`}
      style={{
        color: isActive ? "var(--accent-color, #2563eb)" : "",
      }}
      aria-current={isActive ? "page" : undefined}
    >
      {icon}
      {!collapsed && <span>{label}</span>}
    </button>
  );
}

export default function Sidebar() {
  const router = useRouter();
  const [user, setUser] = useState<string | null>(null);
  const [currentPath, setCurrentPath] = useState<string>("");
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUser(localStorage.getItem("user"));
      setCurrentPath(window.location.pathname);
      const saved = localStorage.getItem("sidebarCollapsed");
      if (saved) setCollapsed(saved === "true");
    }
  }, []);

  function handleNav(path: string) {
    router.push(path);
    setCurrentPath(path);
  }

  function handleLogout() {
    localStorage.removeItem("user");
    router.push("/login");
  }

  function toggleSidebar() {
    setCollapsed((prev) => {
      localStorage.setItem("sidebarCollapsed", String(!prev));
      return !prev;
    });
  }

  const navItems: NavItem[] = [
    {
      path: "/",
      label: "Typing Test",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="4" y="6" width="16" height="12" rx="2" />
          <path d="M8 6v12" />
        </svg>
      ),
      exact: true,
    },
    {
      path: "/achievements",
      label: "Achievements",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />
        </svg>
      ),
    },
    {
      path: "/profile",
      label: "Profile",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="8" r="4" />
          <path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
        </svg>
      ),
    },
    {
      path: "/settings",
      label: "Settings",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 8 19.4a1.65 1.65 0 0 0-1.82.33l-.06-.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 5 15.4a1.65 1.65 0 0 0-1.51-1V13a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 5 8.6a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 8 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09A1.65 1.65 0 0 0 16 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 8a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09A1.65 1.65 0 0 0 19.4 15z" />
        </svg>
      ),
    },
  ];

  return (
    <aside
      className={`hidden md:flex flex-col h-full bg-gradient-to-b from-zinc-50 via-white to-zinc-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900 border-r border-zinc-200 dark:border-zinc-800 py-4 sm:py-6 px-2 sm:px-4 gap-4 sm:gap-6 fixed top-0 left-0 z-20 pt-14 sm:pt-16 shadow-lg transition-all duration-300 ${collapsed ? 'w-16 sm:w-20' : 'w-44 sm:w-56'}`}
    >
      <nav className={`flex flex-col gap-2 sm:gap-4 mt-6 sm:mt-8 ${collapsed ? 'items-center' : ''}`}>
        <div className="flex items-center w-full">
          <SidebarNavButton
            key={navItems[0].path}
            {...navItems[0]}
            currentPath={currentPath}
            onClick={handleNav}
            className={collapsed ? 'justify-center px-2 flex-1' : 'flex-1'}
            collapsed={collapsed}
          />
          <button
            className="ml-1 p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 transition flex items-center justify-center"
            onClick={toggleSidebar}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            style={{ zIndex: 30 }}
            type="button"
          >
            {collapsed ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6" /></svg>
            )}
          </button>
        </div>
        {navItems.slice(1).map((item) => (
          <SidebarNavButton
            key={item.path}
            {...item}
            currentPath={currentPath}
            onClick={handleNav}
            className={collapsed ? 'justify-center px-2' : ''}
            collapsed={collapsed}
          />
        ))}
        {user && (
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-zinc-800 transition ${collapsed ? 'justify-center px-2' : ''}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M17 16l4-4m0 0l-4-4m4 4H7" />
              <rect x="3" y="4" width="8" height="16" rx="2" />
            </svg>
            {!collapsed && <span>Logout</span>}
          </button>
        )}
      </nav>
      <div className={`mt-auto text-xs text-zinc-400 dark:text-zinc-600 flex items-center gap-2 justify-center pb-2 ${collapsed ? 'flex-col' : ''}`}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M3 12h18M3 12a9 9 0 1 1 18 0" />
        </svg>
        {!collapsed && <span>&copy; 2025 KeyShark</span>}
      </div>
    </aside>
  );
}
