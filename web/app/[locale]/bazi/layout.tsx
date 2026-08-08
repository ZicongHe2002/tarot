import { SectionBackground } from "@/components/section-background";

export default function BaziLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <SectionBackground kind="bazi" />
      {children}
    </div>
  );
}
