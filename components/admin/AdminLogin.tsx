"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl border border-white/10 bg-neutral-950 p-6"
      >
        <h1 className="mb-1 text-lg font-semibold text-white">Admin</h1>
        <p className="mb-6 text-sm text-white/60">เข้าสู่ระบบเพื่อจัดการรูปภาพ</p>

        <label htmlFor="password" className="mb-1.5 block text-xs text-white/70">
          รหัสผ่าน
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-sm text-white outline-none focus:border-emerald-400/50"
          autoComplete="current-password"
          required
        />

        {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-emerald-500 py-2 text-sm font-medium text-black transition-colors hover:bg-emerald-400 disabled:opacity-50"
        >
          {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
        </button>
      </form>
    </div>
  );
}
