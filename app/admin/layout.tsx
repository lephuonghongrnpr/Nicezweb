import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-[#1a1a1a] bg-black">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-4 sm:px-6">
          <Link href="/" className="text-lg font-black">
            {siteConfig.name}
          </Link>
          <span className="text-xs text-red-500">Admin</span>
        </div>
      </header>
      {children}
    </div>
  );
}
