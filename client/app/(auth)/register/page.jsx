"use client";
import { useState } from "react";
import api from "@/lib/api";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/register", form);
      Cookies.set("token", data.token, { expires: 7 });
      router.push("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="bg-gray-900 p-8 rounded-2xl w-full max-w-md shadow-xl">
        <h1 className="text-2xl font-bold text-white mb-6">
          Create your account
        </h1>
        {error && <p className="text-red-400 mb-4 text-sm">{error}</p>}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
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
            Register
          </button>
        </div>
        <p className="text-gray-400 text-sm mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
