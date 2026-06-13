"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/lib/site";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error ?? "เข้าสู่ระบบไม่สำเร็จ");
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl border border-[#222] bg-[#141414] p-6"
      >
        <h1 className="mb-1 text-center text-lg font-black">{siteConfig.name}</h1>
        <p className="mb-6 text-center text-sm text-white/50">เข้าสู่ระบบ Admin</p>

        <label htmlFor="password" className="mb-1.5 block text-xs text-white/70">
          รหัสผ่าน
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full rounded-lg border border-[#333] bg-black px-3 py-2 text-sm text-white outline-none focus:border-red-500"
          autoComplete="current-password"
          required
        />

        {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-red-600 py-2.5 text-sm font-semibold text-white hover:bg-red-500 disabled:opacity-50"
        >
          {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
        </button>

        <Link href="/" className="mt-4 block text-center text-xs text-white/40 hover:text-red-400">
          ← กลับหน้าร้าน
        </Link>
      </form>
    </div>
  );
}
