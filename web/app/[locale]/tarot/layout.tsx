import { SectionBackground } from "@/components/section-background";

export default function TarotLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <SectionBackground kind="tarot" />
      {children}
    </div>
  );
}
