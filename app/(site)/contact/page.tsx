import Link from "next/link";
import PageContainer from "@/components/shop/PageContainer";
import { siteConfig } from "@/lib/site";

export const metadata = { title: "ติดต่อ — XML FIVEM" };

export default function ContactPage() {
  return (
    <PageContainer className="max-w-[1400px] py-12">
      <h1 className="mb-2 text-2xl font-bold">ติดต่อเรา</h1>
      <p className="mb-6 text-sm text-white/50">{siteConfig.tagline}</p>
      <div className="flex flex-wrap gap-3">
        {siteConfig.contactLine && (
          <a
            href={siteConfig.contactLine}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-500"
          >
            Line
          </a>
        )}
        {siteConfig.contactDiscord && (
          <a
            href={siteConfig.contactDiscord}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-[#333] bg-[#141414] px-5 py-2.5 text-sm font-semibold text-white hover:border-red-600/50"
          >
            Discord
          </a>
        )}
      </div>
      <Link href="/" className="mt-6 block text-sm text-white/40 hover:text-red-400">
        ← กลับหน้าแรก
      </Link>
    </PageContainer>
  );
}
