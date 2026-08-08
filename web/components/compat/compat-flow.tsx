"use client";

// Compatibility flow: two birth-detail blocks → POST /api/compatibility →
// fetch the stored report → calc facts + AI interpretation + share card.
// Birth details travel only in the request body, never in URLs (spec §8/§13).
import * as React from "react";
import Link from "next/link";
import { Copy } from "lucide-react";
import type { Locale } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import type { InterpretationResult } from "@/lib/providers/types";
import { Alert, Badge, Card, Spinner } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label, RadioGroup, RadioItem } from "@/components/ui/form";
import { BirthFields, birthPayload, type BirthValue } from "@/components/birth-fields";
import { InterpretationView, type VersionsInfo } from "@/components/reading/interpretation-view";

type Mode = "astrology" | "bazi" | "combined";
type Sex = "male" | "female";

const EL_ZH: Record<string, string> = { Wood: "木", Fire: "火", Earth: "土", Metal: "金", Water: "水" };

const MODE_LABEL: Record<Mode, { en: string; zh: string }> = {
  astrology: M.compatAstro,
  bazi: M.compatBazi,
  combined: M.compatCombined,
};

interface Placement {
  planet: string;
  sign: string;
  sign_zh: string;
}

interface DayMaster {
  stem: string;
  stem_zh: string;
  element: string;
  polarity: string;
}

interface CompatCalc {
  astrology?: {
    a: { label: string; placements: Placement[] };
    b: { label: string; placements: Placement[] };
    inter_aspects: Array<{ from_a: string; to_b: string; aspect: string; aspect_zh: string; orb: number }>;
  };
  bazi?: {
    a: { label: string; day_master: DayMaster };
    b: { label: string; day_master: DayMaster };
    day_master_relation: string;
    year_branch_relation: string;
    day_branch_relation: string;
  };
}

interface CompatReport {
  mode: Mode;
  status: string;
  calc: CompatCalc;
  interpretation: InterpretationResult | null;
  isMock: boolean;
  versions: VersionsInfo;
  shareToken: string | null;
}

interface PersonErrors {
  date?: string;
  place?: string;
}

export function CompatFlow({ mode, locale }: { mode: Mode; locale: Locale }) {
  const lo = locale;
  const needsSex = mode === "bazi" || mode === "combined";

  const [a, setA] = React.useState<BirthValue>({ dateISO: "", timeKnown: true });
  const [b, setB] = React.useState<BirthValue>({ dateISO: "", timeKnown: true });
  const [sexA, setSexA] = React.useState<Sex | undefined>(undefined);
  const [sexB, setSexB] = React.useState<Sex | undefined>(undefined);
  const [errA, setErrA] = React.useState<PersonErrors>({});
  const [errB, setErrB] = React.useState<PersonErrors>({});
  const [busy, setBusy] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  const [quota, setQuota] = React.useState<{ signin: boolean } | null>(null);
  const [token, setToken] = React.useState<string | null>(null);
  const [report, setReport] = React.useState<CompatReport | null>(null);

  function validate(v: BirthValue): PersonErrors {
    const e: PersonErrors = {};
    if (!v.dateISO) e.date = lo === "zh" ? "请填写出生日期。" : "Please enter a date of birth.";
    if (!v.cityId && !(v.lat !== undefined && v.lon !== undefined && v.tz)) {
      e.place = lo === "zh" ? "请选择城市，或填写完整坐标与时区。" : "Choose a city, or enter full coordinates and timezone.";
    }
    return e;
  }

  async function submit(e?: React.FormEvent) {
    e?.preventDefault();
    const ea = validate(a);
    const eb = validate(b);
    setErrA(ea);
    setErrB(eb);
    if (Object.keys(ea).length || Object.keys(eb).length) return;

    setBusy(true);
    setFailed(false);
    setReport(null);
    setToken(null);
    try {
      const res = await fetch("/api/compatibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          locale: lo,
          a: { ...birthPayload(a), sex: needsSex ? sexA ?? null : null },
          b: { ...birthPayload(b), sex: needsSex ? sexB ?? null : null },
        }),
      });
      if (res.status === 402) {
        const j = (await res.json().catch(() => null)) as { signin?: boolean } | null;
        setQuota({ signin: !!j?.signin });
        return;
      }
      const j = (await res.json().catch(() => null)) as { token?: string } | null;
      if (!res.ok || !j?.token) {
        setFailed(true);
        return;
      }
      setToken(j.token);
      const rres = await fetch(`/api/compatibility/${j.token}`, { cache: "no-store" });
      const rjson = (await rres.json().catch(() => null)) as CompatReport | null;
      if (!rres.ok || !rjson) {
        setFailed(true);
        return;
      }
      setReport(rjson);
    } catch {
      setFailed(true);
    } finally {
      setBusy(false);
    }
  }

  if (quota) {
    return (
      <Alert tone="info" className="max-w-2xl">
        {lo === "zh"
          ? "本月的免费解读次数已用完。计算不限次，但 AI 解读需要会员。"
          : "You've used this month's free interpretations. Calculation stays free; interpretations need Premium."}
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <Link href={`/${lo}/pricing`}>
            <Button size="sm">{t(M.pricingTitle, lo)}</Button>
          </Link>
          {quota.signin && (
            <Link
              href={`/${lo}/account/signin`}
              className="text-sm font-medium text-[var(--accent)] underline-offset-4 hover:underline"
            >
              {t(M.signIn, lo)}
            </Link>
          )}
        </div>
      </Alert>
    );
  }

  if (busy) {
    return (
      <div className="rounded-2xl border border-[var(--line)] bg-[var(--bg-raised)] p-10 text-center">
        <Spinner label={t(M.generating, lo)} />
      </div>
    );
  }

  if (report) {
    return <CompatResult report={report} token={token!} locale={lo} onRetry={() => submit()} />;
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-5">
      {failed && (
        <Alert tone="warn">
          {t(M.errorGeneric, lo)}
          <div className="mt-2">
            <Button variant="outline" size="sm" onClick={() => submit()}>
              {t(M.retry, lo)}
            </Button>
          </div>
        </Alert>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        <PersonCard
          heading={t(M.compatPersonA, lo)}
          locale={lo}
          idPrefix="a"
          value={a}
          onChange={setA}
          errors={errA}
          sex={needsSex ? sexA : undefined}
          onSexChange={needsSex ? setSexA : undefined}
        />
        <PersonCard
          heading={t(M.compatPersonB, lo)}
          locale={lo}
          idPrefix="b"
          value={b}
          onChange={setB}
          errors={errB}
          sex={needsSex ? sexB : undefined}
          onSexChange={needsSex ? setSexB : undefined}
        />
      </div>

      <p className="text-xs leading-relaxed text-[var(--fg-muted)]">{t(M.profilePrivacyNote, lo)}</p>

      <div>
        <Button type="submit" disabled={busy}>
          {lo === "zh" ? "生成合盘报告" : "Generate compatibility report"}
        </Button>
      </div>
    </form>
  );
}

function PersonCard({
  heading,
  locale,
  idPrefix,
  value,
  onChange,
  errors,
  sex,
  onSexChange,
}: {
  heading: string;
  locale: Locale;
  idPrefix: string;
  value: BirthValue;
  onChange: (v: BirthValue) => void;
  errors: PersonErrors;
  sex?: Sex;
  onSexChange?: (s: Sex) => void;
}) {
  const lo = locale;
  return (
    <Card>
      <h2 className="font-display text-xl font-semibold">{heading}</h2>
      <div className="mt-4">
        <BirthFields locale={lo} value={value} onChange={onChange} errors={errors} idPrefix={idPrefix} />
      </div>
      {onSexChange && (
        <div className="mt-4">
          <Label>
            {lo === "zh"
              ? `${t(M.profileSex, lo)}（${t(M.optional, lo)}）`
              : `${t(M.profileSex, lo)} (${t(M.optional, lo)})`}
          </Label>
          <RadioGroup
            value={sex ?? ""}
            onValueChange={(v) => onSexChange(v as Sex)}
            className="grid-cols-2"
            aria-label={t(M.profileSex, lo)}
          >
            <RadioItem value="male">{lo === "zh" ? "男" : "Male"}</RadioItem>
            <RadioItem value="female">{lo === "zh" ? "女" : "Female"}</RadioItem>
          </RadioGroup>
        </div>
      )}
    </Card>
  );
}

function CompatResult({
  report,
  token,
  locale,
  onRetry,
}: {
  report: CompatReport;
  token: string;
  locale: Locale;
  onRetry: () => void;
}) {
  const lo = locale;
  const astro = report.calc.astrology;
  const bazi = report.calc.bazi;
  const sunA = astro?.a.placements.find((p) => p.planet === "Sun");
  const sunB = astro?.b.placements.find((p) => p.planet === "Sun");

  return (
    <div className="grid gap-6">
      <div>
        <Badge tone="gold">{t(MODE_LABEL[report.mode] ?? M.compatCombined, lo)}</Badge>
      </div>

      {astro && (
        <Card>
          <h2 className="font-display text-lg font-semibold">{t(M.compatAstro, lo)}</h2>
          <ul className="mt-3 space-y-1.5 text-sm leading-relaxed">
            {sunA && (
              <li>
                {lo === "zh"
                  ? `${t(M.compatPersonA, lo)}：太阳 ${sunA.sign_zh}`
                  : `${t(M.compatPersonA, lo)}: Sun in ${sunA.sign}`}
              </li>
            )}
            {sunB && (
              <li>
                {lo === "zh"
                  ? `${t(M.compatPersonB, lo)}：太阳 ${sunB.sign_zh}`
                  : `${t(M.compatPersonB, lo)}: Sun in ${sunB.sign}`}
              </li>
            )}
          </ul>
          {astro.inter_aspects.length > 0 && (
            <>
              <h3 className="mt-4 text-sm font-semibold text-[var(--fg-muted)]">
                {lo === "zh" ? "跨盘相位（甲方 → 乙方）" : `Inter-chart aspects (${t(M.compatPersonA, lo)} → ${t(M.compatPersonB, lo)})`}
              </h3>
              <ul className="mt-2 grid gap-1.5 text-sm leading-relaxed sm:grid-cols-2">
                {astro.inter_aspects.map((x, i) => (
                  <li key={i}>
                    {lo === "zh"
                      ? `${x.from_a} ${x.aspect_zh} ${x.to_b}（${x.orb.toFixed(1)}°）`
                      : `${x.from_a} ${x.aspect} ${x.to_b} (${x.orb.toFixed(1)}°)`}
                  </li>
                ))}
              </ul>
            </>
          )}
        </Card>
      )}

      {bazi && (
        <Card>
          <h2 className="font-display text-lg font-semibold">{t(M.compatBazi, lo)}</h2>
          <ul className="mt-3 space-y-1.5 text-sm leading-relaxed">
            <li>
              {lo === "zh"
                ? `${t(M.compatPersonA, lo)}日主：${bazi.a.day_master.stem_zh}（${bazi.a.day_master.polarity === "Yang" ? "阳" : "阴"}${EL_ZH[bazi.a.day_master.element] ?? bazi.a.day_master.element}）`
                : `${t(M.compatPersonA, lo)} Day Master: ${bazi.a.day_master.stem_zh} ${bazi.a.day_master.stem} · ${bazi.a.day_master.polarity} ${bazi.a.day_master.element}`}
            </li>
            <li>
              {lo === "zh"
                ? `${t(M.compatPersonB, lo)}日主：${bazi.b.day_master.stem_zh}（${bazi.b.day_master.polarity === "Yang" ? "阳" : "阴"}${EL_ZH[bazi.b.day_master.element] ?? bazi.b.day_master.element}）`
                : `${t(M.compatPersonB, lo)} Day Master: ${bazi.b.day_master.stem_zh} ${bazi.b.day_master.stem} · ${bazi.b.day_master.polarity} ${bazi.b.day_master.element}`}
            </li>
            <li>
              {lo === "zh" ? "日主关系：" : "Day Master relation: "}
              {bazi.day_master_relation}
            </li>
            <li>
              {lo === "zh" ? "年支关系：" : "Year Branch relation: "}
              {bazi.year_branch_relation}
            </li>
            <li>
              {lo === "zh" ? "日支关系：" : "Day Branch relation: "}
              {bazi.day_branch_relation}
            </li>
          </ul>
        </Card>
      )}

      {report.status === "completed" && report.interpretation ? (
        <>
          <InterpretationView
            interpretation={report.interpretation}
            isMock={report.isMock}
            locale={lo}
            versions={report.versions}
          />
          <ShareSection token={token} locale={lo} existingShareToken={report.shareToken} />
        </>
      ) : (
        <Alert tone="warn">
          {t(M.errorGeneric, lo)}
          <div className="mt-2">
            <Button variant="outline" size="sm" onClick={onRetry}>
              {t(M.retry, lo)}
            </Button>
          </div>
        </Alert>
      )}
    </div>
  );
}

function ShareSection({
  token,
  locale,
  existingShareToken,
}: {
  token: string;
  locale: Locale;
  existingShareToken: string | null;
}) {
  const lo = locale;
  const [shareUrl, setShareUrl] = React.useState<string | null>(
    existingShareToken ? shareLink(lo, existingShareToken) : null
  );
  const [busy, setBusy] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [error, setError] = React.useState(false);

  function shareLink(l: Locale, st: string) {
    return typeof window !== "undefined" ? `${window.location.origin}/${l}/share/${st}` : `/${l}/share/${st}`;
  }

  async function createShare() {
    setBusy(true);
    setError(false);
    try {
      const res = await fetch(`/api/compatibility/${token}`, { method: "POST" });
      const j = (await res.json().catch(() => null)) as { shareToken?: string } | null;
      if (!res.ok || !j?.shareToken) {
        setError(true);
        return;
      }
      setShareUrl(shareLink(lo, j.shareToken));
    } catch {
      setError(true);
    } finally {
      setBusy(false);
    }
  }

  async function copy() {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — the link stays selectable in the input
    }
  }

  return (
    <Card>
      <h2 className="font-display text-lg font-semibold">{t(M.compatShare, lo)}</h2>
      {!shareUrl ? (
        <div className="mt-3">
          <Button variant="secondary" onClick={createShare} disabled={busy}>
            {busy ? t(M.loading, lo) : t(M.compatShare, lo)}
          </Button>
        </div>
      ) : (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Input
            readOnly
            value={shareUrl}
            aria-label={t(M.compatShare, lo)}
            className="max-w-md flex-1"
            onFocus={(e) => e.currentTarget.select()}
          />
          <Button variant="outline" size="sm" onClick={copy}>
            <Copy className="h-4 w-4" aria-hidden />
            {copied ? (lo === "zh" ? "已复制" : "Copied") : lo === "zh" ? "复制链接" : "Copy link"}
          </Button>
        </div>
      )}
      {error && (
        <p role="alert" className="mt-2 text-sm text-el-fire">
          {t(M.errorGeneric, lo)}
        </p>
      )}
      <p className="mt-3 text-xs leading-relaxed text-[var(--fg-muted)]">{t(M.compatShareNote, lo)}</p>
    </Card>
  );
}
