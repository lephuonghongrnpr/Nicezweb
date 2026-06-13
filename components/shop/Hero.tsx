import Link from "next/link";
import { ArrowRight, Gamepad2, Headphones, RefreshCw, Zap } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";
import { siteConfig } from "@/lib/site";

const FEATURE_ICONS = {
  gamepad: Gamepad2,
  zap: Zap,
  refresh: RefreshCw,
  headphones: Headphones,
} as const;

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/5 px-4 py-10 sm:px-6 sm:py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(249,115,22,0.08),transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-400" />
          <span className="text-xs font-medium text-orange-300">XML สำหรับ FiveM Server</span>
        </div>

        <h1 className="mb-3 max-w-xl text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl">
          ร้าน{" "}
          <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
            XML FIVEM
          </span>
          <br />
          คุณภาพ ราคาดี
        </h1>

        <p className="mb-6 max-w-md text-sm leading-relaxed text-white/60 sm:text-base">
          {siteConfig.description}
        </p>

        <div className="mb-8 flex flex-wrap gap-3">
          <Link
            href="/category/recommended"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            ดูสินค้าแนะนำ
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/category/general"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10"
          >
            สินค้าทั้งหมด
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {siteConfig.features.map((feature) => {
            const Icon = FEATURE_ICONS[feature.icon as keyof typeof FEATURE_ICONS];
            return (
              <div
                key={feature.label}
                className="flex items-center gap-2.5 rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2.5"
              >
                <Icon className="h-4 w-4 shrink-0 text-orange-400" />
                <span className="text-xs text-white/70">{feature.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
