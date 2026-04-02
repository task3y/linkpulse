"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import Navbar from "@/components/Navbar";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { AnalyticsSkeleton } from "@/components/Skeleton";
import ProtectedRoute from "@/components/ProtectedRoute";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

const AnalyticsPage = () => {
  const { slug } = useParams();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const { data } = await api.get(`/analytics/${slug}`);
        setData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, [slug]);

  const shortUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/${slug}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gray-950">
        <Navbar />
        <div className="max-w-5xl mx-auto px-4 py-8">
          <AnalyticsSkeleton />
        </div>
      </div>
    );

  if (!data)
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-gray-400">Link not found</p>
      </div>
    );

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-950">
        <Navbar />
        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => router.push("/dashboard")}
              className="text-gray-400 hover:text-white transition"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white">
                {data.link.title || slug}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-blue-400 text-sm">{shortUrl}</p>
                <button
                  onClick={handleCopy}
                  className="text-gray-400 hover:text-white"
                >
                  {copied ? (
                    <Check size={14} className="text-green-400" />
                  ) : (
                    <Copy size={14} />
                  )}
                </button>
              </div>
              <p className="text-gray-500 text-xs mt-1 truncate">
                {data.link.originalUrl}
              </p>
            </div>
            <div className="bg-blue-600/20 text-blue-400 px-4 py-2 rounded-xl text-center">
              <p className="text-2xl font-bold">{data.totalClicks}</p>
              <p className="text-xs">Total Clicks</p>
            </div>
          </div>

          {/* Clicks Over Time */}
          <div className="bg-gray-900 rounded-2xl p-6 mb-6">
            <h2 className="text-white font-semibold mb-4">Clicks Over Time</h2>
            {data.last7Days.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No click data yet
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={data.last7Days}>
                  <defs>
                    <linearGradient
                      id="colorClicks"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis
                    dataKey="date"
                    stroke="#6b7280"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#111827",
                      border: "none",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#fff" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="clicks"
                    stroke="#3b82f6"
                    fill="url(#colorClicks)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Device + Browser Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Device Breakdown */}
            <div className="bg-gray-900 rounded-2xl p-6">
              <h2 className="text-white font-semibold mb-4">Devices</h2>
              {data.devices.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No data yet</p>
              ) : (
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={data.devices}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {data.devices.map((_, index) => (
                        <Cell
                          key={index}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#111827",
                        border: "none",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* Browser Breakdown */}
            <div className="bg-gray-900 rounded-2xl p-6">
              <h2 className="text-white font-semibold mb-4">Browsers</h2>
              {data.browsers.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No data yet</p>
              ) : (
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={data.browsers} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                    <XAxis
                      type="number"
                      stroke="#6b7280"
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis
                      dataKey="name"
                      type="category"
                      stroke="#6b7280"
                      tick={{ fontSize: 12 }}
                      width={80}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#111827",
                        border: "none",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="value" fill="#10b981" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Countries + Referrers Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Top Countries */}
            <div className="bg-gray-900 rounded-2xl p-6">
              <h2 className="text-white font-semibold mb-4">Top Countries</h2>
              {data.countries.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No data yet</p>
              ) : (
                <div className="space-y-3">
                  {data.countries.map((c, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">{c.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-800 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{
                              width: `${(c.value / data.totalClicks) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-gray-400 text-xs w-6">
                          {c.value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Top Referrers */}
            <div className="bg-gray-900 rounded-2xl p-6">
              <h2 className="text-white font-semibold mb-4">Top Referrers</h2>
              {data.referrers.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No data yet</p>
              ) : (
                <div className="space-y-3">
                  {data.referrers.map((r, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm truncate max-w-[60%]">
                        {r.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-800 rounded-full h-2">
                          <div
                            className="bg-purple-500 h-2 rounded-full"
                            style={{
                              width: `${(r.value / data.totalClicks) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-gray-400 text-xs w-6">
                          {r.value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AnalyticsPage;
