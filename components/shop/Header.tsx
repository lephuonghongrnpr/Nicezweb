"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "lucide-react";
import { MAIN_NAV } from "@/lib/categories";
import { siteConfig } from "@/lib/site";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-[#1a1a1a] bg-black">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-4 px-4 sm:h-16 sm:px-6">
        <Link href="/" className="shrink-0 text-lg font-black tracking-tight text-white">
          {siteConfig.name}
        </Link>

        <nav
          aria-label="เมนูหลัก"
          className="flex flex-1 items-center gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {MAIN_NAV.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.id}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors sm:px-4 sm:text-sm ${
                  active
                    ? "bg-red-600 text-white"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/admin"
          aria-label="Admin"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#333] bg-[#141414] text-white/60 transition-colors hover:border-red-600/50 hover:text-red-400"
        >
          <User className="h-4 w-4" />
        </Link>
      </div>
    </header>
  );
}
