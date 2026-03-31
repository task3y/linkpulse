"use client";
import { useState } from "react";
import api from "@/lib/api";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/login", form);
      Cookies.set("token", data.token, { expires: 7 });
      router.push("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="bg-gray-900 p-8 rounded-2xl w-full max-w-md shadow-xl">
        <h1 className="text-2xl font-bold text-white mb-6">
          Login to LinkPulse
        </h1>
        {error && <p className="text-red-400 mb-4 text-sm">{error}</p>}
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Login
          </button>
        </div>
        <p className="text-gray-400 text-sm mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-400 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
