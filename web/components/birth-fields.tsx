"use client";

// Shared birth-data fields with full world coverage: country picker (all
// regions, localized) → city typeahead over the 170k-city GeoNames table
// (population-ranked, per-city timezone) → manual coordinates + full IANA
// timezone list as the universal fallback. Values are POSTed in request
// bodies — birth details never enter URLs (spec §8).
import * as React from "react";
import type { Locale } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { Input, Label, Checkbox, FieldError } from "@/components/ui/form";
import { Combobox, type ComboOption } from "@/components/ui/combobox";

export interface BirthValue {
  dateISO: string;
  time?: string;
  timeKnown: boolean;
  country?: string; // ISO-3166 alpha-2 (picker state)
  cityId?: string; // GeoNames id as string
  cityLabel?: string; // display only, e.g. "Foshan, Guangdong, CN"
  lat?: number;
  lon?: number;
  tz?: string;
}

interface CountryOpt {
  code: string;
  en: string;
  zh: string;
}

// Version the URL so browsers/CDNs that saw the empty pre-import database do
// not keep serving that stale response. Successful lists are shared across
// picker instances; empty/error responses are never cached in memory.
const GEO_DATA_VERSION = "20260808";
let countriesCache: CountryOpt[] | null = null;
let countriesRequest: Promise<CountryOpt[]> | null = null;
function loadCountries(): Promise<CountryOpt[]> {
  if (countriesCache) return Promise.resolve(countriesCache);
  if (!countriesRequest) {
    countriesRequest = fetch(`/api/cities?v=${GEO_DATA_VERSION}`, { cache: "no-store" })
      .then(async (r) => {
        if (!r.ok) throw new Error(`Country lookup failed (${r.status})`);
        const j = await r.json();
        const list = Array.isArray(j.countries) ? (j.countries as CountryOpt[]) : [];
        if (list.length === 0) throw new Error("Country lookup returned no countries");
        countriesCache = list;
        return list;
      })
      .finally(() => {
        countriesRequest = null;
      });
  }
  return countriesRequest;
}

export function BirthFields({
  locale,
  value,
  onChange,
  errors,
  idPrefix = "b",
}: {
  locale: Locale;
  value: BirthValue;
  onChange: (v: BirthValue) => void;
  errors?: { date?: string; place?: string };
  idPrefix?: string;
}) {
  const lo = locale;
  const [manual, setManual] = React.useState(false);
  const [countries, setCountries] = React.useState<CountryOpt[]>([]);
  const [countryLoading, setCountryLoading] = React.useState(true);
  const [countryLoadError, setCountryLoadError] = React.useState(false);
  const [countryReload, setCountryReload] = React.useState(0);
  const [countryQuery, setCountryQuery] = React.useState("");
  const [cityOpts, setCityOpts] = React.useState<ComboOption[]>([]);
  const [cityLoading, setCityLoading] = React.useState(false);
  const [tzQuery, setTzQuery] = React.useState("");
  const debounceRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  // tz per search hit — shown in the normalization preview; the server
  // re-resolves authoritatively from cityId.
  const cityTzRef = React.useRef(new Map<string, string>());

  React.useEffect(() => {
    let active = true;
    setCountryLoading(true);
    setCountryLoadError(false);
    loadCountries()
      .then((list) => {
        if (active) setCountries(list);
      })
      .catch(() => {
        if (active) setCountryLoadError(true);
      })
      .finally(() => {
        if (active) setCountryLoading(false);
      });
    return () => {
      active = false;
    };
  }, [countryReload]);

  const countryOptions: ComboOption[] = React.useMemo(() => {
    const q = countryQuery.trim().toLowerCase();
    return countries
      .filter(
        (c) =>
          !q ||
          c.en.toLowerCase().includes(q) ||
          c.zh.includes(q) ||
          c.code.toLowerCase() === q
      )
      .slice(0, 30)
      .map((c) => ({ value: c.code, label: lo === "zh" ? `${c.zh}（${c.en}）` : c.en, hint: c.code }));
  }, [countries, countryQuery, lo]);

  const selectedCountry = countries.find((c) => c.code === value.country);

  function searchCity(q: string) {
    if (!value.country) return;
    clearTimeout(debounceRef.current);
    setCityLoading(true);
    const country = value.country;
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/cities?country=${country}&q=${encodeURIComponent(q)}&v=${GEO_DATA_VERSION}`,
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error(`City lookup failed (${res.status})`);
        const j = await res.json();
        const cities = Array.isArray(j.cities)
          ? (j.cities as Array<{ id: number; name: string; admin1: string; tz: string }>)
          : [];
        for (const c of cities) cityTzRef.current.set(String(c.id), c.tz);
        setCityOpts(
          cities.map((c) => ({
            value: String(c.id),
            label: c.admin1 ? `${c.name}, ${c.admin1}` : c.name,
            hint: c.tz.split("/").pop()?.replace(/_/g, " "),
          }))
        );
      } catch {
        setCityOpts([]);
      } finally {
        setCityLoading(false);
      }
    }, 200);
  }

  const allTz = React.useMemo(() => Intl.supportedValuesOf("timeZone"), []);
  const tzOptions: ComboOption[] = React.useMemo(() => {
    const q = tzQuery.trim().toLowerCase();
    return allTz
      .filter((z) => !q || z.toLowerCase().includes(q))
      .slice(0, 30)
      .map((z) => ({ value: z, label: z }));
  }, [allTz, tzQuery]);

  return (
    <div className="grid gap-4">
      <div>
        <Label htmlFor={`${idPrefix}-date`}>{t(M.profileDate, lo)}</Label>
        <Input
          id={`${idPrefix}-date`}
          type="date"
          required
          value={value.dateISO}
          min="1900-01-01"
          max="2026-12-31"
          aria-invalid={!!errors?.date}
          aria-describedby={errors?.date ? `${idPrefix}-date-err` : undefined}
          onChange={(e) => onChange({ ...value, dateISO: e.target.value })}
        />
        <FieldError id={`${idPrefix}-date-err`}>{errors?.date}</FieldError>
      </div>

      <div className="flex items-start gap-2.5">
        <Checkbox
          id={`${idPrefix}-unknown`}
          checked={!value.timeKnown}
          onCheckedChange={(c) => onChange({ ...value, timeKnown: c !== true })}
        />
        <label htmlFor={`${idPrefix}-unknown`} className="cursor-pointer text-sm leading-snug">
          {t(M.profileTimeUnknown, lo)}
        </label>
      </div>

      {value.timeKnown ? (
        <div>
          <Label htmlFor={`${idPrefix}-time`}>{t(M.profileTime, lo)}</Label>
          <Input
            id={`${idPrefix}-time`}
            type="time"
            value={value.time ?? ""}
            onChange={(e) => onChange({ ...value, time: e.target.value })}
          />
        </div>
      ) : (
        <p className="text-sm leading-relaxed text-[var(--fg-muted)]">{t(M.unknownTimeNotice, lo)}</p>
      )}

      {!manual ? (
        <>
          <div>
            <Label htmlFor={`${idPrefix}-country`}>{t(M.profileCountry, lo)}</Label>
            <Combobox
              id={`${idPrefix}-country`}
              label={t(M.profileCountry, lo)}
              placeholder={t(M.countryPlaceholder, lo)}
              value={value.country ?? null}
              displayValue={
                selectedCountry ? (lo === "zh" ? selectedCountry.zh : selectedCountry.en) : ""
              }
              onQueryChange={setCountryQuery}
              onSelect={(opt) => {
                setCityOpts([]);
                onChange({
                  ...value,
                  country: opt?.value,
                  cityId: undefined,
                  cityLabel: undefined,
                  lat: undefined,
                  lon: undefined,
                  tz: undefined,
                });
              }}
              options={countryOptions}
              loading={countryLoading}
              emptyText={
                countryLoadError
                  ? lo === "zh"
                    ? "国家列表加载失败，请在下方重试"
                    : "Countries failed to load — retry below"
                  : t(M.comboNoResults, lo)
              }
              clearText={t(M.comboClear, lo)}
            />
            {countryLoadError && (
              <button
                type="button"
                className="mt-1.5 text-sm text-[var(--accent)] underline-offset-4 hover:underline"
                onClick={() => {
                  countriesCache = null;
                  setCountryReload((n) => n + 1);
                }}
              >
                {lo === "zh" ? "重新加载国家列表" : "Retry country list"}
              </button>
            )}
          </div>
          <div>
            <Label htmlFor={`${idPrefix}-city`}>{t(M.profileCity, lo)}</Label>
            <Combobox
              id={`${idPrefix}-city`}
              label={t(M.profileCity, lo)}
              placeholder={value.country ? t(M.citySearchPlaceholder, lo) : t(M.selectCountryFirst, lo)}
              disabled={!value.country}
              value={value.cityId ?? null}
              displayValue={value.cityLabel ?? ""}
              onQueryChange={searchCity}
              onSelect={(opt) =>
                onChange({
                  ...value,
                  cityId: opt?.value,
                  cityLabel: opt ? opt.label : undefined,
                  lat: undefined,
                  lon: undefined,
                  tz: opt ? cityTzRef.current.get(opt.value) : undefined,
                })
              }
              options={cityOpts}
              loading={cityLoading}
              emptyText={t(M.comboNoResults, lo)}
              clearText={t(M.comboClear, lo)}
            />
            <FieldError id={`${idPrefix}-place-err`}>{errors?.place}</FieldError>
            <button
              type="button"
              className="mt-1.5 text-sm text-[var(--accent)] underline-offset-4 hover:underline"
              onClick={() => setManual(true)}
            >
              {t(M.profileCityManual, lo)}
            </button>
          </div>
        </>
      ) : (
        <div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <Label htmlFor={`${idPrefix}-lat`}>{t(M.profileLat, lo)}</Label>
              <Input
                id={`${idPrefix}-lat`}
                type="number"
                step="0.0001"
                min={-90}
                max={90}
                value={value.lat ?? ""}
                onChange={(e) =>
                  onChange({
                    ...value,
                    cityId: undefined,
                    cityLabel: undefined,
                    lat: e.target.value === "" ? undefined : Number(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor={`${idPrefix}-lon`}>{t(M.profileLon, lo)}</Label>
              <Input
                id={`${idPrefix}-lon`}
                type="number"
                step="0.0001"
                min={-180}
                max={180}
                value={value.lon ?? ""}
                onChange={(e) =>
                  onChange({
                    ...value,
                    cityId: undefined,
                    cityLabel: undefined,
                    lon: e.target.value === "" ? undefined : Number(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor={`${idPrefix}-tz`}>{t(M.profileTz, lo)}</Label>
              <Combobox
                id={`${idPrefix}-tz`}
                label={t(M.profileTz, lo)}
                placeholder={t(M.tzSearchPlaceholder, lo)}
                value={value.tz ?? null}
                displayValue={value.tz ?? ""}
                onQueryChange={setTzQuery}
                onSelect={(opt) => onChange({ ...value, cityId: undefined, cityLabel: undefined, tz: opt?.value })}
                options={tzOptions}
                emptyText={t(M.comboNoResults, lo)}
                clearText={t(M.comboClear, lo)}
              />
            </div>
          </div>
          <FieldError id={`${idPrefix}-place-err`}>{errors?.place}</FieldError>
          <button
            type="button"
            className="mt-1.5 text-sm text-[var(--accent)] underline-offset-4 hover:underline"
            onClick={() => setManual(false)}
          >
            {lo === "zh" ? "← 返回城市搜索" : "← Back to city search"}
          </button>
        </div>
      )}
    </div>
  );
}

export function birthPayload(v: BirthValue) {
  return {
    dateISO: v.dateISO,
    time: v.timeKnown && v.time ? v.time : undefined,
    cityId: v.cityId,
    lat: v.lat,
    lon: v.lon,
    tz: v.tz,
  };
}
