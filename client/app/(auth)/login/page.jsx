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
    setLoading(true);
    setError("");

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl overflow-hidden flex shadow-xl border border-gray-200">
        {/* Left — Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Link2 size={16} className="text-white" />
            </div>
            <span className="text-gray-900 font-bold text-lg">LinkPulse</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-1">Sign in</h1>
          <p className="text-gray-400 text-sm mb-8">
            Please login to continue to your account.
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-500 text-sm px-4 py-3 rounded-xl mb-4">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-500 mb-1 block font-medium">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 rounded-xl outline-none focus:border-indigo-400 focus:bg-white transition placeholder:text-gray-300"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 rounded-xl outline-none focus:border-indigo-400 transition placeholder:text-gray-300 pr-12"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition"
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

          <p className="text-gray-400 text-sm mt-6 text-center">
            Need an account?{" "}
            <a
              href="/register"
              className="text-indigo-500 hover:text-indigo-600 font-medium transition"
            >
              Create one
            </a>
          </p>
        </div>

        {/* Right — Decorative Panel */}
        <div className="hidden md:flex w-1/2 relative overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 items-center justify-center">
          <div className="absolute top-[-20%] right-[-20%] w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-[-20%] left-[-20%] w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="relative text-center px-8">
            <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Link2 size={28} className="text-white" />
            </div>
            <h2 className="text-white text-2xl font-bold mb-2">LinkPulse</h2>
            <p className="text-white/70 text-sm">
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
                  className="bg-white/10 backdrop-blur border border-white/20 rounded-xl px-4 py-3 flex justify-between items-center"
                >
                  <span className="text-white/70 text-sm">{stat.label}</span>
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
