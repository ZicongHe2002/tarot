"use client";

import * as React from "react";
import Link from "next/link";
import type { Locale } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { Button } from "@/components/ui/button";
import { Alert, Card, Spinner } from "@/components/ui/card";
import { Label, Textarea, RadioGroup, RadioItem } from "@/components/ui/form";
import { CardBack } from "./card-art";
import { ReadingView } from "@/components/reading/reading-poller";
import type { TarotMode } from "@/lib/readings";

type Phase = "setup" | "centering" | "drawing" | "hidden" | "revealed" | "blocked" | "quota";

const CARD_COUNT: Record<TarotMode, number> = { daily: 1, one_card: 1, three_card: 3, yes_no: 1 };

export function TarotFlow({ mode, locale }: { mode: TarotMode; locale: Locale }) {
  const [phase, setPhase] = React.useState<Phase>(mode === "daily" ? "centering" : "setup");
  const [topic, setTopic] = React.useState("general");
  const [question, setQuestion] = React.useState("");
  const [token, setToken] = React.useState<string | null>(null);
  const [needSignin, setNeedSignin] = React.useState(false);

  async function draw() {
    setPhase("drawing");
    const res = await fetch("/api/tarot/draw", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode, topic, question: question || undefined, locale }),
    });
    if (res.status === 402) {
      const j = await res.json().catch(() => ({}));
      setNeedSignin(!!j.signin);
      setPhase("quota");
      return;
    }
    const j = await res.json().catch(() => null);
    if (!j) {
      setPhase("centering");
      return;
    }
    if (j.blocked) {
      setPhase("blocked");
      return;
    }
    setToken(j.token);
    // Daily card returns the same reading all day — skip the reveal ritual
    // only for repeat visits is not knowable here, so keep the ritual.
    setPhase("hidden");
  }

  if (phase === "blocked") {
    return (
      <Alert tone="info" className="max-w-2xl">
        {t(M.crisisNotice, locale)}
      </Alert>
    );
  }

  if (phase === "quota") {
    return (
      <Alert tone="info" className="max-w-2xl">
        {locale === "zh"
          ? "本月的免费解读次数已用完。升级会员可获得不限次解读。"
          : "You've used this month's free interpretations. Premium includes unlimited interpretations."}
        <div className="mt-3 flex gap-2">
          <Link href={`/${locale}/pricing`}>
            <Button size="sm">{t(M.pricingTitle, locale)}</Button>
          </Link>
          {needSignin && (
            <Link href={`/${locale}/account/signin`}>
              <Button size="sm" variant="outline">
                {t(M.signIn, locale)}
              </Button>
            </Link>
          )}
        </div>
      </Alert>
    );
  }

  if (phase === "setup") {
    const topics = [
      { value: "love", label: t(M.topicLove, locale) },
      { value: "career", label: t(M.topicCareer, locale) },
      { value: "growth", label: t(M.topicGrowth, locale) },
      { value: "general", label: t(M.topicGeneral, locale) },
    ];
    return (
      <Card className="max-w-2xl">
        <fieldset>
          <legend className="mb-2 text-sm font-medium">{t(M.tarotTopicLabel, locale)}</legend>
          <RadioGroup value={topic} onValueChange={setTopic} className="sm:grid-cols-2">
            {topics.map((tp) => (
              <RadioItem key={tp.value} value={tp.value}>
                {tp.label}
              </RadioItem>
            ))}
          </RadioGroup>
        </fieldset>
        <div className="mt-4">
          <Label htmlFor="tarot-q">
            {t(M.tarotQuestionLabel, locale)}
          </Label>
          <Textarea
            id="tarot-q"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={t(M.tarotQuestionPlaceholder, locale)}
            maxLength={2000}
            aria-describedby="tarot-q-note"
          />
          <p id="tarot-q-note" className="mt-1.5 text-xs text-[var(--fg-muted)]">
            {t(M.aiInputNotice, locale)}
          </p>
        </div>
        {mode === "yes_no" && (
          <Alert tone="info" className="mt-4">
            {t(M.tarotYesNoNote, locale)}
          </Alert>
        )}
        <div className="mt-5">
          <Button onClick={() => setPhase("centering")}>{t(M.next, locale)}</Button>
        </div>
      </Card>
    );
  }

  if (phase === "centering" || phase === "drawing") {
    return (
      <Card className="max-w-2xl text-center">
        <p className="font-display text-lg leading-relaxed">{t(M.tarotCentering, locale)}</p>
        <div className="mt-6 flex justify-center gap-3" aria-hidden>
          {Array.from({ length: CARD_COUNT[mode] }).map((_, i) => (
            <CardBack key={i} width={92} />
          ))}
        </div>
        <div className="mt-6">
          {phase === "drawing" ? (
            <Spinner label={t(M.loading, locale)} />
          ) : (
            <Button size="lg" onClick={draw}>
              {t(M.tarotShuffle, locale)}
            </Button>
          )}
        </div>
      </Card>
    );
  }

  if (phase === "hidden" && token) {
    return (
      <Card className="max-w-2xl text-center">
        <div className="mt-2 flex justify-center gap-3" aria-hidden>
          {Array.from({ length: CARD_COUNT[mode] }).map((_, i) => (
            <CardBack key={i} width={92} />
          ))}
        </div>
        <div className="mt-6">
          <Button size="lg" onClick={() => setPhase("revealed")}>
            {t(M.tarotReveal, locale)}
          </Button>
        </div>
      </Card>
    );
  }

  if (phase === "revealed" && token) {
    return <ReadingView token={token} locale={locale} refId={token} enableJournalSave />;
  }

  return null;
}
