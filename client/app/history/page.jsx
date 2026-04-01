"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import Navbar from "@/components/Navbar";
import LinkCard from "@/components/LinkCard";
import { Search, SlidersHorizontal } from "lucide-react";

export default function HistoryPage() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("");

  const fetchLinks = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (status) params.append("status", status);
      if (sort) params.append("sort", sort);

      const { data } = await api.get(`/links?${params.toString()}`);
      setLinks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on filter change
  useEffect(() => {
    const timeout = setTimeout(fetchLinks, 400); // debounce search
    return () => clearTimeout(timeout);
  }, [search, status, sort]);

  const handleDelete = (id) => setLinks(links.filter((l) => l._id !== id));
  const handleToggle = (updated) =>
    setLinks(links.map((l) => (l._id === updated._id ? updated : l)));

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Link History</h1>
          <p className="text-gray-400 text-sm mt-1">
            All your shortened links in one place
          </p>
        </div>

        {/* Filters */}
        <div className="bg-gray-900 rounded-2xl p-4 mb-6 flex flex-col md:flex-row gap-3">
          {/* Search */}
          <div className="flex-1 flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg">
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search by title, slug or URL..."
              className="bg-transparent text-white text-sm outline-none flex-1"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-gray-400" />
            <select
              className="bg-gray-800 text-white text-sm px-3 py-2 rounded-lg outline-none"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Sort */}
          <select
            className="bg-gray-800 text-white text-sm px-3 py-2 rounded-lg outline-none"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="clicks">Most Clicks</option>
          </select>
        </div>

        {/* Results Count */}
        <p className="text-gray-500 text-sm mb-4">
          {loading
            ? "Loading..."
            : `${links.length} link${links.length !== 1 ? "s" : ""} found`}
        </p>

        {/* Links List */}
        <div className="space-y-3">
          {loading ? (
            <p className="text-gray-500 text-center py-8">Loading...</p>
          ) : links.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No links found</p>
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="text-blue-400 text-sm mt-2 hover:underline"
                >
                  Clear search
                </button>
              )}
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
  );
}
