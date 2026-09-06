"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      router.push("/admin/dashboard");
    } catch (err) {
      console.error("Login request error:", err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Panel — Branding */}
        <div className="relative bg-gradient-to-br from-blue-800 to-blue-500 text-white p-10 flex flex-col justify-center overflow-hidden min-h-[320px]">
          {/* Decorative circles */}
          <div className="absolute -top-10 -left-10 w-56 h-56 bg-blue-400/30 rounded-full" />
          <div className="absolute bottom-10 left-16 w-24 h-24 bg-gradient-to-br from-blue-300 to-blue-600 rounded-full shadow-lg" />
          <div className="absolute -bottom-16 -right-10 w-40 h-40 bg-gradient-to-br from-blue-300 to-blue-600 rounded-full shadow-lg" />

          <div className="relative z-10">
            <h2 className="text-sm font-semibold tracking-wide uppercase opacity-90">
              Welcome
            </h2>
            <h1 className="text-3xl font-extrabold mt-1 leading-tight">
              Youth Evolution
              <br />
              Foundation
            </h1>
            <p className="text-blue-100 text-sm mt-4 max-w-xs">
              Admin Panel — manage contacts, volunteers, and donations in one place.
            </p>
          </div>
        </div>

        {/* Right Panel — Login Form */}
        <div className="p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Sign In</h2>

          <form onSubmit={handleLogin} className="space-y-5" autoComplete="off">
            <div>
              <input
                type="email"
                name="admin-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter Email"
                autoComplete="off"
                className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            <div>
              <input
                type="password"
                name="admin-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter Password"
                autoComplete="new-password"
                className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-900 text-white py-3 rounded-md font-semibold tracking-wide hover:bg-blue-800 disabled:opacity-50 transition"
            >
              {loading ? "SIGNING IN..." : "SIGN IN"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}