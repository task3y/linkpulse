"use client";
import { useState } from "react";
import api from "@/lib/api";
import { Plus, ChevronDown, ChevronUp } from "lucide-react";

const LinkForm = ({ onLinkCreated }) => {
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
    <div className="bg-white/3 border border-white/8 rounded-2xl p-6 mb-6">
      <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
        Shorten a URL
      </h2>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-2 rounded-xl mb-4">
          {error}
        </div>
      )}

      <div className="flex gap-3 items-center gap-2 bg-white/5 border border-white/10 rounded-2xl p-2">
        <input
          type="url"
          placeholder="Enter long link here..."
          className="flex-1 bg-transparent text-white px-4 py-3 outline-none placeholder:text-slate-600"
          value={form.originalUrl}
          onChange={(e) => setForm({ ...form, originalUrl: e.target.value })}
        />
        <button
          onClick={handleSubmit}
          disabled={loading || !form.originalUrl}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-semibold transition flex items-center gap-2 whitespace-nowrap"
        >
          <Plus size={16} />
          {loading ? "Creating..." : "Shorten"}
        </button>
      </div>

      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="flex items-center gap-1 text-slate-500 hover:text-slate-300 text-sm mt-3 transition"
      >
        {showAdvanced ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        {showAdvanced ? "Hide" : "Advanced"} options
      </button>

      {showAdvanced && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
          {[
            { placeholder: "Title (optional)", key: "title", type: "text" },
            {
              placeholder: "Custom slug (optional)",
              key: "customSlug",
              type: "text",
            },
            { placeholder: "Expiry date", key: "expiresAt", type: "date" },
          ].map((f) => (
            <input
              key={f.key}
              type={f.type}
              placeholder={f.placeholder}
              className="bg-white/5 border border-white/10 text-white px-4 py-3 rounded-xl outline-none focus:border-indigo-500/50 transition placeholder:text-slate-600"
              value={form[f.key]}
              onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LinkForm;
