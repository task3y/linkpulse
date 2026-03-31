"use client";
import { useAuth } from "@/context/AuthContext";
import { LogOut, Link2 } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Link2 className="text-blue-400" size={22} />
        <span className="text-xl font-bold text-white">LinkPulse</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-gray-400 text-sm">{user?.email}</span>
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${
            user?.plan === "pro"
              ? "bg-yellow-500/20 text-yellow-400"
              : "bg-gray-700 text-gray-300"
          }`}
        >
          {user?.plan?.toUpperCase()}
        </span>
        <button
          onClick={logout}
          className="flex items-center gap-1 text-gray-400 hover:text-red-400 transition text-sm"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </nav>
  );
}
