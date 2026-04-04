"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import Navbar from "@/components/Navbar";
import LinkForm from "@/components/LinkForm";
import LinkCard from "@/components/LinkCard";
import { Link2, MousePointerClick, TrendingUp, Sparkles } from "lucide-react";
import { LinkCardSkeleton, StatsSkeleton } from "@/components/Skeleton";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardPage() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const { data } = await api.get("/links");
        setLinks(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchLinks();
  }, []);

  const handleLinkCreated = (newLink) => setLinks([newLink, ...links]);

  const handleDelete = (id) => setLinks(links.filter((l) => l._id !== id));

  const handleToggle = (updated) =>
    setLinks(links.map((l) => (l._id === updated._id ? updated : l)));

  const totalClicks = links.reduce((sum, l) => sum + l.totalClicks, 0);

  const stats = [
    {
      label: "Total Links",
      value: links.length,
      icon: <Link2 size={18} />,
      color: "from-indigo-500/20 to-indigo-600/20",
      iconColor: "text-indigo-400",
      border: "border-indigo-500/10",
    },
    {
      label: "Total Clicks",
      value: totalClicks,
      icon: <MousePointerClick size={18} />,
      color: "from-emerald-500/20 to-emerald-600/20",
      iconColor: "text-emerald-400",
      border: "border-emerald-500/10",
    },
    {
      label: "Active Links",
      value: links.filter((l) => l.isActive).length,
      icon: <TrendingUp size={18} />,
      color: "from-purple-500/20 to-purple-600/20",
      iconColor: "text-purple-400",
      border: "border-purple-500/10",
    },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#0a0a0f]">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={16} className="text-indigo-400" />
              <span className="text-indigo-400 text-sm font-medium">
                Dashboard
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white">Your Links</h1>
            <p className="text-slate-500 text-sm mt-1">
              Manage and track all your shortened links
            </p>
          </div>

          {loading ? (
            <StatsSkeleton />
          ) : (
            <div className="grid grid-cols-3 gap-4 mb-8">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className={`bg-gradient-to-br ${stat.color} border ${stat.border} rounded-2xl p-4 flex items-center gap-3`}
                >
                  <div
                    className={`w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center ${stat.iconColor}`}
                  >
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs">{stat.label}</p>
                    <p className="text-white font-bold text-2xl">
                      {stat.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <LinkForm onLinkCreated={handleLinkCreated} />

          <div className="space-y-3">
            {loading ? (
              <>
                <LinkCardSkeleton />
                <LinkCardSkeleton />
                <LinkCardSkeleton />
              </>
            ) : links.length === 0 ? (
              <div className="text-center py-16 border border-white/5 rounded-2xl bg-white/2">
                <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Link2 size={20} className="text-indigo-400" />
                </div>
                <p className="text-white font-medium mb-1">No links yet</p>
                <p className="text-slate-500 text-sm">
                  Create your first short link above!
                </p>
              </div>
            ) : (
              links.map((link) => (
                <LinkCard
                  key={link._id}
                  link={link}
                  onDelete={handleDelete}
                  onToggle={handleToggle}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
