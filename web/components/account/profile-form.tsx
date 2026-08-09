"use client";

import * as React from "react";
import type { Locale } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { Button } from "@/components/ui/button";
import { Alert, Card } from "@/components/ui/card";
import { FieldError, Input, Label, RadioGroup, RadioItem, Select } from "@/components/ui/form";
import { BirthFields, type BirthValue } from "@/components/birth-fields";
import {
  createProfile,
  updateProfile,
  type ProfileFormInput,
} from "@/app/[locale]/account/profiles/actions";

type Interest = "tarot" | "astrology" | "bazi" | "general";

export interface ProfileFormInitial {
  label: string;
  dateISO: string;
  time?: string;
  timeKnown: boolean;
  country?: string;
  cityId?: string;
  cityLabel?: string;
  lat?: number;
  lon?: number;
  tz?: string;
  sex?: string;
  primaryInterest: string;
}

interface Errors {
  label?: string;
  date?: string;
  time?: string;
  place?: string;
}

export function ProfileForm({
  locale,
  profileId,
  initial,
}: {
  locale: Locale;
  profileId?: string;
  initial?: ProfileFormInitial;
}) {
  const lo = locale;
  const [step, setStep] = React.useState<1 | 2>(1);
  const [label, setLabel] = React.useState(initial?.label ?? "");
  const [sex, setSex] = React.useState(initial?.sex ?? "unspecified");
  const [interest, setInterest] = React.useState<string>(initial?.primaryInterest ?? "general");
  const [birth, setBirth] = React.useState<BirthValue>({
    dateISO: initial?.dateISO ?? "",
    time: initial?.time,
    timeKnown: initial?.timeKnown ?? true,
    country: initial?.country,
    cityId: initial?.cityId,
    cityLabel: initial?.cityLabel,
    lat: initial?.lat,
    lon: initial?.lon,
    tz: initial?.tz,
  });
  const [errors, setErrors] = React.useState<Errors>({});
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [pending, startTransition] = React.useTransition();

  const interestOptions = [
    { value: "tarot", label: t(M.navTarot, lo) },
    { value: "astrology", label: t(M.navAstrology, lo) },
    { value: "bazi", label: t(M.navBazi, lo) },
    { value: "general", label: t(M.topicGeneral, lo) },
  ];

  // Normalization preview data from the picker selection (or manual
  // coordinates). Birth data stays in component state — never in the URL.
  // The server re-resolves coordinates/timezone authoritatively from cityId.
  const place = birth.cityId
    ? {
        label: birth.cityLabel ?? birth.cityId,
        tz: birth.tz ?? "—",
        lat: birth.lat,
        lon: birth.lon,
      }
    : birth.lat != null && birth.lon != null && birth.tz
      ? {
          label: lo === "zh" ? "自定义坐标" : "Custom coordinates",
          tz: birth.tz,
          lat: birth.lat,
          lon: birth.lon,
        }
      : null;

  function validate(): boolean {
    const next: Errors = {};
    const trimmed = label.trim();
    if (trimmed.length < 1 || trimmed.length > 60) {
      next.label =
        lo === "zh" ? "请输入 1–60 个字符的档案名称。" : "Enter a name between 1 and 60 characters.";
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(birth.dateISO)) {
      next.date = lo === "zh" ? "请选择出生日期。" : "Please select a date of birth.";
    }
    if (birth.timeKnown && !/^([01]\d|2[0-3]):[0-5]\d$/.test(birth.time ?? "")) {
      next.time =
        lo === "zh"
          ? "请填写出生时间，或勾选“我不知道确切的出生时间”。"
          : "Enter a birth time, or tick the unknown-time box.";
    }
    if (!place) {
      next.place =
        lo === "zh"
          ? "请选择出生城市，或完整填写纬度、经度与时区。"
          : "Select a birth city, or provide latitude, longitude, and timezone.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function toStep2(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);
    if (validate()) setStep(2);
  }

  function errorMessage(code: string): string {
    switch (code) {
      case "unauthenticated":
        return lo === "zh" ? "登录已过期，请重新登录后再试。" : "Your session expired. Please sign in again.";
      case "not_found":
        return lo === "zh" ? "找不到该档案。" : "This profile could not be found.";
      case "invalid_place":
        return lo === "zh"
          ? "出生地点信息不完整，请返回上一步检查。"
          : "The birth place is incomplete. Please go back and check it.";
      default:
        return lo === "zh" ? "保存失败，请检查内容后重试。" : "Could not save. Please check the form and try again.";
    }
  }

  function submit() {
    setServerError(null);
    const data: ProfileFormInput = {
      locale: lo,
      label: label.trim(),
      dateISO: birth.dateISO,
      time: birth.timeKnown && birth.time ? birth.time : undefined,
      sex: sex === "male" || sex === "female" ? sex : undefined,
      primaryInterest: (["tarot", "astrology", "bazi", "general"].includes(interest)
        ? interest
        : "general") as Interest,
      cityId: birth.cityId,
      lat: birth.cityId ? undefined : birth.lat,
      lon: birth.cityId ? undefined : birth.lon,
      tz: birth.cityId ? undefined : birth.tz,
    };
    startTransition(async () => {
      const res = profileId ? await updateProfile(profileId, data) : await createProfile(data);
      if (res && "error" in res) setServerError(errorMessage(res.error));
      // On success the server action redirects to the profiles list.
    });
  }

  if (step === 2) {
    const rows: Array<[string, string]> = [
      [t(M.profileLabel, lo), label.trim()],
      [t(M.profileDate, lo), birth.dateISO],
      [
        t(M.profileTime, lo),
        birth.timeKnown && birth.time ? birth.time : lo === "zh" ? "未知" : "Unknown",
      ],
      [t(M.profileCity, lo), place?.label ?? "—"],
      [t(M.profileTz, lo), place?.tz ?? "—"],
      [t(M.profileLat, lo), place?.lat != null ? place.lat.toFixed(4) : (lo === "zh" ? "由城市数据确定" : "from city record")],
      [t(M.profileLon, lo), place?.lon != null ? place.lon.toFixed(4) : (lo === "zh" ? "由城市数据确定" : "from city record")],
      [
        t(M.profileInterest, lo),
        interestOptions.find((o) => o.value === interest)?.label ?? t(M.topicGeneral, lo),
      ],
    ];
    if (sex === "male" || sex === "female") {
      rows.push([
        t(M.profileSex, lo),
        sex === "male" ? (lo === "zh" ? "男" : "Male") : lo === "zh" ? "女" : "Female",
      ]);
    }
    return (
      <Card className="max-w-2xl">
        <h2 className="font-display text-xl font-semibold">{t(M.profileNormalizeTitle, lo)}</h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)]">
          {t(M.profileNormalizeBody, lo)}
        </p>
        <dl className="mt-5 divide-y divide-[var(--line)] text-sm">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-4 py-2.5">
              <dt className="shrink-0 text-[var(--fg-muted)]">{k}</dt>
              <dd className="text-right font-medium">{v}</dd>
            </div>
          ))}
        </dl>
        {!birth.timeKnown && (
          <Alert tone="info" className="mt-4">
            {t(M.unknownTimeNotice, lo)}
          </Alert>
        )}
        {serverError && (
          <Alert tone="warn" className="mt-4">
            {serverError}
          </Alert>
        )}
        <div className="mt-6 flex flex-wrap gap-3">
          <Button variant="outline" onClick={() => setStep(1)} disabled={pending}>
            {t(M.back, lo)}
          </Button>
          <Button onClick={submit} disabled={pending}>
            {pending ? (lo === "zh" ? "保存中…" : "Saving…") : t(M.confirm, lo)}
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl">
      <form onSubmit={toStep2} noValidate className="grid gap-4">
        <div>
          <Label htmlFor="profile-label">{t(M.profileLabel, lo)}</Label>
          <Input
            id="profile-label"
            value={label}
            maxLength={60}
            required
            placeholder={lo === "zh" ? "例如：我自己" : "e.g. Me"}
            aria-invalid={!!errors.label}
            aria-describedby={errors.label ? "profile-label-err" : undefined}
            onChange={(e) => setLabel(e.target.value)}
          />
          <FieldError id="profile-label-err">{errors.label}</FieldError>
        </div>

        <BirthFields
          locale={lo}
          value={birth}
          onChange={setBirth}
          errors={{ date: errors.date, place: errors.place }}
          idPrefix="profile-b"
        />
        <FieldError id="profile-time-err">{errors.time}</FieldError>

        <fieldset>
          <legend className="mb-1.5 block text-sm font-medium">
            {t(M.profileSex, lo)}{" "}
            <span className="font-normal text-[var(--fg-muted)]">({t(M.optional, lo)})</span>
          </legend>
          <RadioGroup value={sex} onValueChange={setSex} className="sm:grid-cols-3">
            <RadioItem value="male">{lo === "zh" ? "男" : "Male"}</RadioItem>
            <RadioItem value="female">{lo === "zh" ? "女" : "Female"}</RadioItem>
            <RadioItem value="unspecified">{lo === "zh" ? "不填" : "Prefer not to say"}</RadioItem>
          </RadioGroup>
        </fieldset>

        <div>
          <Label htmlFor="profile-interest">{t(M.profileInterest, lo)}</Label>
          <Select
            triggerLabel={t(M.profileInterest, lo)}
            options={interestOptions}
            value={interest}
            onValueChange={setInterest}
          />
        </div>

        <p className="text-xs leading-relaxed text-[var(--fg-muted)]">
          {t(M.profilePrivacyNote, lo)}
        </p>

        <div>
          <Button type="submit">{t(M.next, lo)}</Button>
        </div>
      </form>
    </Card>
  );
}
