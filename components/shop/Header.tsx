import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-[#07070d]/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/20">
            <span className="text-xs font-black text-white">XML</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-sm font-bold tracking-wide text-white sm:text-base">
              {siteConfig.name}
            </span>
            <span className="text-[10px] text-orange-400/80 sm:text-xs">FiveM Store</span>
          </div>
        </Link>

        <div className="hidden items-center gap-1 sm:flex">
          <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-2.5 py-1 text-[10px] font-medium text-orange-400">
            FIVEM
          </span>
          <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-[10px] font-medium text-cyan-400">
            XML
          </span>
        </div>
      </div>
    </header>
  );
}
