import Link from "next/link";
import PageContainer from "@/components/shop/PageContainer";
import { siteConfig } from "@/lib/site";

export const metadata = { title: "เติมเงิน — XML FIVEM" };

export default function TopupPage() {
  return (
    <PageContainer className="max-w-[1400px] py-12">
      <h1 className="mb-2 text-2xl font-bold">เติมเงิน</h1>
      <p className="mb-6 text-sm text-white/50">ติดต่อแอดมินเพื่อเติมเงินเข้าระบบ</p>
      {siteConfig.contactLine ? (
        <a
          href={siteConfig.contactLine}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-500"
        >
          ติดต่อเติมเงิน
        </a>
      ) : (
        <p className="text-sm text-white/40">ตั้งค่า NEXT_PUBLIC_LINE_URL ใน Environment Variables</p>
      )}
      <Link href="/" className="mt-6 block text-sm text-white/40 hover:text-red-400">
        ← กลับหน้าแรก
      </Link>
    </PageContainer>
  );
}
