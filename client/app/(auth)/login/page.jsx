"use client";
import { useState } from "react";
import api from "@/lib/api";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Link2, Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/login", form);
      Cookies.set("token", data.token, { expires: 7 });
      router.push("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-[#0f0f1a] rounded-3xl overflow-hidden flex shadow-2xl border border-white/5">
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <div className="flex items.center gap-2 mb-10">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Link2 size={16} className="text-white" />
            </div>
            <span className="text-white font-bold text-lg">LinkPulse</span>
          </div>

          <h1 className="text-3xl font-bold text-white mb-1">Sign in</h1>
          <p className="text-slate-400 text-sm mb-8">
            Please login to continue to your account.
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="relative">
              <label className="text-xs text-slate-400 mb-1 block">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-xl outline-none focus:border-indigo-500/50 focus:bg-white/8 transition placeholder:text-slate-600"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="relative">
              <label className="text-xs text-slate-400 mb-1 block">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-xl outline-none focus:border-indigo-500/50 transition placeholder:text-slate-600 pr-12"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white py-3 rounded-xl font-semibold transition-all duration-200 mt-2"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>

          <p className="text-slate-500 text-sm mt-6 text-center">
            Need an account?{" "}
            <a
              href="/register"
              className="text-indigo-400 hover:text-indigo-300 transition"
            >
              Create one
            </a>
          </p>
        </div>

        <div className="hidden md:flex w-1/2 relative overflow-hidden bg-gradient-to-br from-indigo-600/20 to-purple-600/20 items-center justify-center">
          <div className="absolute top-[-20%] right-[-20%] w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-[-20%] left-[-20%] w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-[40%] left-[30%] w-48 h-48 bg-cyan-500/20 rounded-full blur-2xl animate-pulse delay-500" />

          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative text-center px-8">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
              <Link2 size={28} className="text-white" />
            </div>
            <h2 className="text-white text-2xl font-bold mb-2">LinkPulse</h2>
            <p className="text-slate-400 text-sm">
              Shorten, share and track your links with powerful analytics
            </p>

            <div className="mt-8 space-y-3">
              {[
                { label: "Links Shortened", value: "10K+" },
                { label: "Clicks Tracked", value: "1M+" },
                { label: "Countries", value: "150+" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white/5 backdrop-blur border border-white/10 rounded-xl px-4 py-3 flex justify-between items-center"
                >
                  <span className="text-slate-400 text-sm">{stat.label}</span>
                  <span className="text-white font-bold">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
