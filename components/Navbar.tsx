import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { profile } from "@/lib/data";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-white/5 bg-black px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <Image
          src="/logo.svg"
          alt="XML Update logo"
          width={28}
          height={28}
          className="h-7 w-7"
        />
        <span className="text-sm font-bold tracking-wider text-white sm:text-base">
          XML UPDATE
        </span>
      </div>

      <div className="flex items-center gap-2 pr-1">
        <CheckCircle2 className="h-4 w-4 text-emerald-400" strokeWidth={2.5} aria-hidden />
        <span className="text-xs text-white/80 sm:text-sm">{profile.status}</span>
        <div className="ml-2 hidden h-6 w-0.5 bg-emerald-400 sm:block" />
      </div>
    </header>
  );
}
