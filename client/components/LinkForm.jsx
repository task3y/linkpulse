"use client";
import { useState } from "react";
import api from "@/lib/api";
import { Plus } from "lucide-react";

export default function LinkForm({ onLinkCreated }) {
  const [form, setForm] = useState({
    originalUrl: "",
    title: "",
    customSlug: "",
    expiresAt: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const payload = { ...form };
      if (!payload.customSlug) delete payload.customSlug;
      if (!payload.expiresAt) delete payload.expiresAt;
      if (!payload.title) delete payload.title;

      const { data } = await api.post("/links", payload);
      onLinkCreated(data);
      setForm({ originalUrl: "", title: "", customSlug: "", expiresAt: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 rounded-2xl p-6 mb-6">
      <h2 className="text-lg font-semibold text-white mb-4">Shorten a URL</h2>
      {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
      <div className="flex gap-3">
        <input
          type="url"
          placeholder="Paste your long URL here..."
          className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg outline-none"
          value={form.originalUrl}
          onChange={(e) => setForm({ ...form, originalUrl: e.target.value })}
        />
        <button
          onClick={handleSubmit}
          disabled={loading || !form.originalUrl}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2"
        >
          <Plus size={18} />
          {loading ? "Creating..." : "Shorten"}
        </button>
      </div>

      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="text-gray-400 hover:text-white text-sm mt-3 transition"
      >
        {showAdvanced ? "− Hide" : "+ Advanced"} options
      </button>

      {showAdvanced && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
          <input
            type="text"
            placeholder="Title (optional)"
            className="bg-gray-800 text-white px-4 py-3 rounded-lg outline-none"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Custom slug (optional)"
            className="bg-gray-800 text-white px-4 py-3 rounded-lg outline-none"
            value={form.customSlug}
            onChange={(e) => setForm({ ...form, customSlug: e.target.value })}
          />
          <input
            type="date"
            className="bg-gray-800 text-white px-4 py-3 rounded-lg outline-none"
            value={form.expiresAt}
            onChange={(e) => setForm({ ...form, expiresAt: e.target.value })}
          />
        </div>
      )}
    </div>
  );
}
