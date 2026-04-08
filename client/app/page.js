"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Link2, ArrowRight, BarChart2, Shield, Zap } from "lucide-react";

const LandingPage = () => {
  const router = useRouter();
  const [url, setUrl] = useState("");

  const handleShorten = () => {
    if (url) router.push(`/register`);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Link2 size={16} className="text-white" />
          </div>
          <span className="font-bold text-lg">LinkPulse</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/login")}
            className="px-4 py-2 text-sm text-slate-300 hover:text-white border border-white/10 rounded-full transition"
          >
            Log In
          </button>
          <button
            onClick={() => router.push("/register")}
            className="px-4 py-2 text-sm bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-full font-medium transition"
          >
            Sign Up
          </button>
        </div>
      </nav>

      <div className="flex flex-col items-center justify-center text-center px-4 pt-24 pb-16 relative">
        {/* Background blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm text-slate-400 mb-8">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Quick. Clean. Shareable.
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Create{" "}
          <span className="relative">
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Shortest URLs
            </span>
          </span>
        </h1>

        <p className="text-slate-400 text-lg max-w-xl mb-12">
          The world's easiest and smartest link shortener to instantly track,
          customize, and share your URLs with style.
        </p>

        <div className="w-full max-w-2xl flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl p-2">
          <input
            type="url"
            placeholder="Enter long link here..."
            className="flex-1 bg-transparent text-white px-4 py-3 outline-none placeholder:text-slate-600"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            onClick={handleShorten}
            className="flex items-center gap-1 text-slate-500 hover:text-slate-300 text-sm mt-3 transition"
          >
            Shorten URL
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-24 w-full max-w-3xl">
          {[
            {
              icon: <Zap size={20} />,
              title: "Lightning Fast",
              desc: "Redis-powered redirects in under 1ms",
            },
            {
              icon: <BarChart2 size={20} />,
              title: "Deep Analytics",
              desc: "Track clicks, devices, locations and more",
            },
            {
              icon: <Shield size={20} />,
              title: "Secure & Reliable",
              desc: "JWT auth with link expiry support",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-white/3 border border-white/8 rounded-2xl p-6 text-left hover:bg-white/5 transition"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400 mb-4">
                {f.icon}
              </div>
              <h3 className="text-white font-semibold mb-1">{f.title}</h3>
              <p className="text-slate-500 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
