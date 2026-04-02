"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import Navbar from "@/components/Navbar";
import LinkForm from "@/components/LinkForm";
import LinkCard from "@/components/LinkCard";
import { Link2, MousePointerClick, TrendingUp } from "lucide-react";
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

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-950">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          {loading ? (
            <StatsSkeleton />
          ) : (
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-900 rounded-xl p-4 flex items-center gap-3">
                <Link2 className="text-blue-400" size={20} />
                <div>
                  <p className="text-gray-400 text-xs">Total Links</p>
                  <p className="text-white font-bold text-xl">{links.length}</p>
                </div>
              </div>
              <div className="bg-gray-900 rounded-xl p-4 flex items-center gap-3">
                <MousePointerClick className="text-green-400" size={20} />
                <div>
                  <p className="text-gray-400 text-xs">Total Clicks</p>
                  <p className="text-white font-bold text-xl">{totalClicks}</p>
                </div>
              </div>
              <div className="bg-gray-900 rounded-xl p-4 flex items-center gap-3">
                <TrendingUp className="text-purple-400" size={20} />
                <div>
                  <p className="text-gray-400 text-xs">Active Links</p>
                  <p className="text-white font-bold text-xl">
                    {links.filter((l) => l.isActive).length}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Link Form */}
          <LinkForm onLinkCreated={handleLinkCreated} />

          {/* Links List */}
          <div className="space-y-3">
            {loading ? (
              <p className="text-gray-500 text-center py-8">Loading...</p>
            ) : links.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No links yet. Create your first one above!
              </p>
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
