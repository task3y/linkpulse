"use client";
import { useState } from "react";
import api from "@/lib/api";
import {
  Copy,
  Trash2,
  BarChart2,
  ToggleLeft,
  ToggleRight,
  Check,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function LinkCard({ link, onDelete, onToggle }) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const shortUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/${link.slug}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = async () => {
    if (!confirm("Delete this link?")) return;
    await api.delete(`/links/${link._id}`);
    onDelete(link._id);
  };

  const handleToggle = async () => {
    const { data } = await api.patch(`/links/${link._id}/toggle`);
    onToggle(data);
  };

  return (
    <div
      className={`bg-gray-900 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border ${
        link.isActive ? "border-gray-800" : "border-red-900/40 opacity-60"
      }`}
    >
      <div className="flex-1 min-w-0">
        <p className="text-white font-medium truncate">
          {link.title || link.slug}
        </p>
        <p className="text-blue-400 text-sm">{shortUrl}</p>
        <p className="text-gray-500 text-xs truncate mt-1">
          {link.originalUrl}
        </p>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-400">
        <span className="bg-gray-800 px-3 py-1 rounded-full text-xs">
          {link.totalClicks} clicks
        </span>
        <button
          onClick={handleCopy}
          className="p-2 hover:text-white transition"
        >
          {copied ? (
            <Check size={16} className="text-green-400" />
          ) : (
            <Copy size={16} />
          )}
        </button>
        <button
          onClick={() => router.push(`/analytics/${link.slug}`)}
          className="p-2 hover:text-white transition"
        >
          <BarChart2 size={16} />
        </button>
        <button
          onClick={handleToggle}
          className="p-2 hover:text-white transition"
        >
          {link.isActive ? (
            <ToggleRight size={18} className="text-green-400" />
          ) : (
            <ToggleLeft size={18} className="text-red-400" />
          )}
        </button>
        <button
          onClick={handleDelete}
          className="p-2 hover:text-red-400 transition"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
