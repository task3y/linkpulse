"use client";
import { useAuth } from "@/context/AuthContext";
import { LogOut, Link2, History, LayoutDashboard, Menu } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard size={15} />,
    },
    { label: "History", href: "/history", icon: <History size={15} /> },
  ];

  return (
    <nav className="bg-[#0f0f1a]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      {/* Logo */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => router.push("/dashboard")}
      >
        <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
          <Link2 size={14} className="text-white" />
        </div>
        <span className="font-bold text-white">LinkPulse</span>
      </div>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-1">
        {navItems.map((item) => (
          <button
            key={item.href}
            onClick={() => router.push(item.href)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition ${
              pathname === item.href
                ? "bg-white/10 text-white"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>

      {/* Right — Pill */}
      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full pl-3 pr-2 py-2 hover:bg-white/10 transition"
        >
          {/* Avatar */}
          <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          {/* Email */}
          <span className="text-white text-sm hidden md:block max-w-[120px] truncate">
            {user?.email}
          </span>

          {/* Plan badge */}
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium hidden md:block ${
              user?.plan === "pro"
                ? "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20"
                : "bg-white/5 text-slate-400 border border-white/10"
            }`}
          >
            {user?.plan?.toUpperCase()}
          </span>

          <div className="w-7 h-7 bg-[#1a1a2e] rounded-full flex items-center justify-center">
            <Menu size={14} className="text-white" />
          </div>
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-[#0f0f1a] border border-white/10 rounded-2xl shadow-xl overflow-hidden z-50">
            <div className="px-4 py-3 border-b border-white/5">
              <p className="text-white text-sm font-medium truncate">
                {user?.name}
              </p>
              <p className="text-slate-500 text-xs truncate">{user?.email}</p>
            </div>
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => {
                  router.push(item.href);
                  setMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-slate-400 hover:text-white hover:bg-white/5 transition text-sm"
              >
                {item.icon}
                {item.label}
              </button>
            ))}
            <div className="border-t border-white/5">
              <button
                onClick={logout}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-red-400 hover:bg-red-500/10 transition text-sm"
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
