import { SectionBackground } from "@/components/section-background";

// Horoscope is astrology-adjacent — shares the celestial background.
export default function HoroscopeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <SectionBackground kind="astrology" />
      {children}
    </div>
  );
}
