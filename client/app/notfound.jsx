"use client";
import { useRouter } from "next/navigation";
import { Link2, Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Link2 className="text-blue-400" size={28} />
          <span className="text-2xl font-bold text-white">LinkPulse</span>
        </div>

        <h1 className="text-8xl font-bold text-blue-500 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-white mb-2">Page not found</h2>
        <p className="text-gray-400 mb-8 max-w-sm mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition text-sm"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition text-sm"
          >
            <Home size={16} />
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
