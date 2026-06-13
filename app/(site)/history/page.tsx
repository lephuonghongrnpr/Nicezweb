import Link from "next/link";
import PageContainer from "@/components/shop/PageContainer";

export const metadata = { title: "เช็คประวัติการซื้อ — XML FIVEM" };

export default function HistoryPage() {
  return (
    <PageContainer className="max-w-[1400px] py-12">
      <h1 className="mb-2 text-2xl font-bold">เช็คประวัติการซื้อ</h1>
      <p className="text-sm text-white/50">ระบบประวัติการซื้อจะเปิดใช้งานเร็วๆ นี้</p>
      <Link href="/" className="mt-6 block text-sm text-white/40 hover:text-red-400">
        ← กลับหน้าแรก
      </Link>
    </PageContainer>
  );
}
