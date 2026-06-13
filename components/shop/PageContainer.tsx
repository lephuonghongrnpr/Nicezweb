import { cn } from "@/lib/cn";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-[1400px] px-4 sm:px-6", className)}>{children}</div>
  );
}
