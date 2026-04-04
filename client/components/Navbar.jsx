"use client";
import { useAuth } from "@/context/AuthContext";
import { LogOut, Link2, History, LayoutDashboard } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

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
      <div className="flex items-center gap-6">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => router.push("/dashboard")}
        >
          <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Link2 size={14} className="text-white" />
          </div>
          <span className="font-bold text-white">LinkPulse</span>
        </div>

        <div className="flex items-center gap-1">
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
      </div>

      <div className="flex items-center gap-3">
        <span className="text-slate-500 text-sm hidden md:block">
          {user?.email}
        </span>
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-medium ${
            user?.plan === "pro"
              ? "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20"
              : "bg-white/5 text-slate-400 border border-white/10"
          }`}
        >
          {user?.plan?.toUpperCase()}
        </span>
        <button
          onClick={logout}
          className="flex items-center gap-1.5 text-slate-400 hover:text-red-400 transition text-sm px-3 py-1.5 rounded-lg hover:bg-red-500/10"
        >
          <LogOut size={14} />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
