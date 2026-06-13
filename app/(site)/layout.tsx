import Header from "@/components/shop/Header";
import Footer from "@/components/shop/Footer";
import BottomNav from "@/components/BottomNav";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-[#07070d] pb-20">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
      <BottomNav />
    </div>
  );
}
