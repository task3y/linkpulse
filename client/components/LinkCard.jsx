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
  ExternalLink,
} from "lucide-react";
import { useRouter } from "next/navigation";

const LinkCard = ({ link, onDelete, onToggle }) => {
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
      className={`bg-white/3 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border transition hover:bg-white/5 ${
        link.isActive ? "border-white/8" : "border-red-500/10 opacity-60"
      }`}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-white font-medium truncate">
            {link.title || link.slug}
          </p>
          {!link.isActive && (
            <span className="text-xs bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-full">
              Inactive
            </span>
          )}
        </div>
        <p className="text-indigo-400 text-sm">{shortUrl}</p>
        <p className="text-slate-600 text-xs truncate mt-0.5">
          {link.originalUrl}
        </p>
      </div>

      <div className="flex items-center gap-1">
        <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs text-slate-400 mr-2">
          {link.totalClicks} clicks
        </span>

        {[
          {
            icon: copied ? (
              <Check size={15} className="text-green-400" />
            ) : (
              <Copy size={15} />
            ),
            onClick: handleCopy,
            title: "Copy",
          },
          {
            icon: <ExternalLink size={15} />,
            onClick: () => window.open(link.originalUrl, "_blank"),
            title: "Open",
          },
          {
            icon: <BarChart2 size={15} />,
            onClick: () => router.push(`/analytics/${link.slug}`),
            title: "Analytics",
          },
          {
            icon: link.isActive ? (
              <ToggleRight size={17} className="text-green-400" />
            ) : (
              <ToggleLeft size={17} className="text-red-400" />
            ),
            onClick: handleToggle,
            title: "Toggle",
          },
          {
            icon: <Trash2 size={15} />,
            onClick: handleDelete,
            title: "Delete",
            danger: true,
          },
        ].map((btn, i) => (
          <button
            key={i}
            onClick={btn.onClick}
            title={btn.title}
            className={`p-2 rounded-lg transition text-slate-400 ${
              btn.danger
                ? "hover:text-red-400 hover:bg-red-500/10"
                : "hover:text-white hover:bg-white/10"
            }`}
          >
            {btn.icon}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LinkCard;
