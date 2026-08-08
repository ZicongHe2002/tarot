import { SectionBackground } from "@/components/section-background";

export default function AstrologyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <SectionBackground kind="astrology" />
      {children}
    </div>
  );
}
