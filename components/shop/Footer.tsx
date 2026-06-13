import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-6xl text-center">
        <p className="mb-1 text-sm font-semibold text-white">{siteConfig.name}</p>
        <p className="mb-4 text-xs text-white/40">{siteConfig.tagline}</p>

        {siteConfig.contactLine && (
          <a
            href={siteConfig.contactLine}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm font-medium text-green-400 transition-colors hover:bg-green-500/20"
          >
            <MessageCircle className="h-4 w-4" />
            ติดต่อสั่งซื้อ
          </a>
        )}

        <p className="mt-6 text-[10px] text-white/25">
          © {new Date().getFullYear()} {siteConfig.name} — XML สำหรับ FiveM
        </p>
      </div>
    </footer>
  );
}
