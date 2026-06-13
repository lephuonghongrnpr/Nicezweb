"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, Settings, Sparkles } from "lucide-react";
import { NAV_ITEMS } from "@/lib/categories";

const ICONS: Record<string, typeof Home> = {
  home: Home,
  general: Package,
  recommended: Sparkles,
  admin: Settings,
};

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function BottomNav() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return (
    <nav
      aria-label="เมนูหลัก"
      className="fixed bottom-0 left-0 right-0 z-30 border-t border-white/5 bg-[#0a0a12]/95 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-lg items-stretch justify-around px-1 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1.5">
        {NAV_ITEMS.map((item) => {
          const Icon = ICONS[item.id] ?? Home;
          const active = isActive(pathname, item.href);

          return (
            <Link
              key={item.id}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-xl px-1 py-1.5 text-[10px] transition-colors sm:text-xs ${
                active
                  ? "text-orange-400"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-xl transition-colors ${
                  active ? "bg-orange-500/15" : ""
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" strokeWidth={active ? 2.5 : 2} />
              </span>
              <span className="truncate">{item.shortLabel}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
