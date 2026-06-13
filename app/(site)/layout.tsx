import Header from "@/components/shop/Header";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-black">
      <Header />
      <div className="flex-1">{children}</div>
    </div>
  );
}
