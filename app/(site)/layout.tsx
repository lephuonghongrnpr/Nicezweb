import BottomNav from "@/components/BottomNav";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-black pb-20">
      {children}
      <BottomNav />
    </div>
  );
}
