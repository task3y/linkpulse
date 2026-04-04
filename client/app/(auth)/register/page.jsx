"use client";
import { useState } from "react";
import api from "@/lib/api";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Link2, Eye, EyeOff } from "lucide-react";

const RegisterPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/register", form);
      Cookies.set("token", data.token, { expires: 7 });
      router.push("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl overflow-hidden flex shadow-xl border border-gray-200">
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Link2 size={16} className="text-white" />
            </div>
            <span className="text-gray-900 font-bold text-lg">LinkPulse</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-1">Sign up</h1>
          <p className="text-gray-400 text-sm mb-8">
            Sign up to enjoy all features of LinkPulse.
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-500 text-sm px-4 py-3 rounded-xl mb-4">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-500 mb-1 block font-medium">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 rounded-xl outline-none focus:border-indigo-400 transition placeholder:text-gray-300"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block font-medium">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 rounded-xl outline-none focus:border-indigo-400 transition placeholder:text-gray-300"
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
              {loading ? "Creating account..." : "Sign up"}
            </button>
          </div>

          <p className="text-gray-400 text-sm mt-6 text-center">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-indigo-500 hover:text-indigo-600 font-medium transition"
            >
              Sign in
            </a>
          </p>
        </div>

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
            <h2 className="text-white text-2xl font-bold mb-2">
              Join LinkPulse
            </h2>
            <p className="text-white/70 text-sm">
              Start shortening links and tracking analytics for free
            </p>
            <div className="mt-8 space-y-3">
              {[
                "✦ Free forever plan",
                "✦ Real-time analytics",
                "✦ Custom short links",
                "✦ Device & location tracking",
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur border border-white/20 rounded-xl px-4 py-3 text-left"
                >
                  <span className="text-white/90 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
