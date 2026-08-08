"use client";

import * as React from "react";
import { Star } from "lucide-react";
import type { Locale } from "@/lib/config";
import { M, t } from "@/lib/i18n/messages";
import { Button } from "@/components/ui/button";
import { Alert, Badge, Card, Spinner } from "@/components/ui/card";
import { Checkbox, FieldError, Input, Label, Select, Textarea } from "@/components/ui/form";

interface Entry {
  id: string;
  kind: string;
  refId: string | null;
  title: string;
  notes: string;
  mood: string | null;
  tagsJson: string;
  favorite: boolean;
  createdAt: string;
}

type KindFilter = "all" | "tarot" | "daily_guidance" | "note";

const MOODS = [
  { value: "calm", en: "Calm", zh: "平静" },
  { value: "happy", en: "Happy", zh: "开心" },
  { value: "anxious", en: "Anxious", zh: "焦虑" },
  { value: "sad", en: "Sad", zh: "低落" },
  { value: "energized", en: "Energized", zh: "元气满满" },
];

function moodLabel(value: string, lo: Locale): string {
  const m = MOODS.find((x) => x.value === value);
  return m ? (lo === "zh" ? m.zh : m.en) : value;
}

function kindLabel(kind: string, lo: Locale): string {
  switch (kind) {
    case "tarot":
      return t(M.navTarot, lo);
    case "astrology":
      return t(M.navAstrology, lo);
    case "bazi":
      return t(M.navBazi, lo);
    case "daily_guidance":
      return t(M.navDaily, lo);
    default:
      return lo === "zh" ? "笔记" : "Note";
  }
}

function formatDate(iso: string, lo: Locale): string {
  try {
    return new Date(iso).toLocaleDateString(lo === "zh" ? "zh-CN" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso.slice(0, 10);
  }
}

export function JournalList({ locale }: { locale: Locale }) {
  const lo = locale;
  const [entries, setEntries] = React.useState<Entry[]>([]);
  const [status, setStatus] = React.useState<"loading" | "ready" | "error">("loading");
  const [kind, setKind] = React.useState<KindFilter>("all");
  const [favOnly, setFavOnly] = React.useState(false);
  const [repeats, setRepeats] = React.useState<Array<{ title: string; count: number }>>([]);

  // ---- data loading -------------------------------------------------------

  const load = React.useCallback(async () => {
    setStatus("loading");
    try {
      const qp = new URLSearchParams();
      if (kind !== "all") qp.set("kind", kind);
      if (favOnly) qp.set("favorite", "1");
      const qs = qp.toString();
      const res = await fetch(`/api/journal${qs ? `?${qs}` : ""}`);
      if (!res.ok) throw new Error(String(res.status));
      const j = (await res.json()) as { entries: Entry[] };
      setEntries(j.entries);
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }, [kind, favOnly]);

  // "Cards that keep appearing" — counted from saved tarot entry titles.
  const loadRepeats = React.useCallback(async () => {
    try {
      const res = await fetch("/api/journal?kind=tarot");
      if (!res.ok) return;
      const j = (await res.json()) as { entries: Entry[] };
      const counts = new Map<string, number>();
      for (const e of j.entries) counts.set(e.title, (counts.get(e.title) ?? 0) + 1);
      setRepeats(
        [...counts.entries()]
          .filter(([, c]) => c >= 2)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([title, count]) => ({ title, count }))
      );
    } catch {
      // Non-critical section — fail silently.
    }
  }, []);

  React.useEffect(() => {
    void load();
  }, [load]);

  React.useEffect(() => {
    void loadRepeats();
  }, [loadRepeats]);

  function handleChanged(updated: Entry) {
    setEntries((es) =>
      favOnly && !updated.favorite
        ? es.filter((e) => e.id !== updated.id)
        : es.map((e) => (e.id === updated.id ? updated : e))
    );
  }

  function handleDeleted(id: string) {
    setEntries((es) => es.filter((e) => e.id !== id));
    void loadRepeats();
  }

  // ---- AI opt-in consent --------------------------------------------------

  const [aiOptIn, setAiOptIn] = React.useState<boolean | null>(null);
  const [consentBusy, setConsentBusy] = React.useState(false);
  const [consentError, setConsentError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/journal/consent");
        if (!res.ok) throw new Error();
        const j = (await res.json()) as { enabled: boolean };
        if (alive) setAiOptIn(j.enabled);
      } catch {
        if (alive) setAiOptIn(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  async function toggleConsent(next: boolean) {
    const prev = aiOptIn;
    setConsentError(null);
    setConsentBusy(true);
    setAiOptIn(next);
    try {
      const res = await fetch("/api/journal/consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: next, locale: lo }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setAiOptIn(prev);
      setConsentError(
        lo === "zh" ? "设置保存失败，请重试。" : "The setting could not be saved. Please try again."
      );
    } finally {
      setConsentBusy(false);
    }
  }

  // ---- add-note form ------------------------------------------------------

  const [noteTitle, setNoteTitle] = React.useState("");
  const [noteText, setNoteText] = React.useState("");
  const [noteMood, setNoteMood] = React.useState<string | undefined>(undefined);
  const [noteTags, setNoteTags] = React.useState("");
  const [noteError, setNoteError] = React.useState<string | null>(null);
  const [noteSubmitError, setNoteSubmitError] = React.useState<string | null>(null);
  const [noteSaving, setNoteSaving] = React.useState(false);

  async function addNote(e: React.FormEvent) {
    e.preventDefault();
    setNoteSubmitError(null);
    const title = noteTitle.trim();
    if (!title) {
      setNoteError(lo === "zh" ? "请输入标题。" : "Please enter a title.");
      return;
    }
    setNoteError(null);
    setNoteSaving(true);
    const tags = noteTags
      .split(/[,，]/)
      .map((s) => s.trim().slice(0, 30))
      .filter(Boolean)
      .slice(0, 10);
    try {
      const res = await fetch("/api/journal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "note",
          title,
          notes: noteText || undefined,
          mood: noteMood || undefined,
          tags: tags.length ? tags : undefined,
        }),
      });
      if (!res.ok) throw new Error();
      setNoteTitle("");
      setNoteText("");
      setNoteMood(undefined);
      setNoteTags("");
      await load();
    } catch {
      setNoteSubmitError(lo === "zh" ? "保存失败，请重试。" : "Could not save. Please try again.");
    } finally {
      setNoteSaving(false);
    }
  }

  // ---- render -------------------------------------------------------------

  const filters: Array<{ value: KindFilter; label: string }> = [
    { value: "all", label: lo === "zh" ? "全部" : "All" },
    { value: "tarot", label: t(M.navTarot, lo) },
    { value: "daily_guidance", label: t(M.navDaily, lo) },
    { value: "note", label: lo === "zh" ? "笔记" : "Notes" },
  ];

  return (
    <div className="grid gap-6">
      {/* Add a note */}
      <Card>
        <h2 className="font-display text-lg font-semibold">
          {lo === "zh" ? "写一条笔记" : "Add a note"}
        </h2>
        <form onSubmit={addNote} noValidate className="mt-4 grid gap-4">
          <div>
            <Label htmlFor="jn-title">{lo === "zh" ? "标题" : "Title"}</Label>
            <Input
              id="jn-title"
              value={noteTitle}
              maxLength={200}
              required
              aria-invalid={!!noteError}
              aria-describedby={noteError ? "jn-title-err" : undefined}
              onChange={(e) => setNoteTitle(e.target.value)}
              placeholder={lo === "zh" ? "今天想记下什么？" : "What do you want to remember?"}
            />
            <FieldError id="jn-title-err">{noteError}</FieldError>
          </div>
          <div>
            <Label htmlFor="jn-notes">{t(M.journalNotes, lo)}</Label>
            <Textarea
              id="jn-notes"
              value={noteText}
              maxLength={8000}
              onChange={(e) => setNoteText(e.target.value)}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="jn-mood">
                {t(M.journalMood, lo)}{" "}
                <span className="font-normal text-[var(--fg-muted)]">({t(M.optional, lo)})</span>
              </Label>
              <Select
                triggerLabel={t(M.journalMood, lo)}
                placeholder={lo === "zh" ? "选择心情" : "Select a mood"}
                options={MOODS.map((m) => ({ value: m.value, label: lo === "zh" ? m.zh : m.en }))}
                value={noteMood}
                onValueChange={setNoteMood}
              />
            </div>
            <div>
              <Label htmlFor="jn-tags">
                {t(M.journalTags, lo)}{" "}
                <span className="font-normal text-[var(--fg-muted)]">({t(M.optional, lo)})</span>
              </Label>
              <Input
                id="jn-tags"
                value={noteTags}
                onChange={(e) => setNoteTags(e.target.value)}
                placeholder={lo === "zh" ? "用逗号分隔，如：工作, 感情" : "Comma separated, e.g. work, love"}
              />
            </div>
          </div>
          {noteSubmitError && <Alert tone="warn">{noteSubmitError}</Alert>}
          <div>
            <Button type="submit" disabled={noteSaving}>
              {noteSaving ? (lo === "zh" ? "保存中…" : "Saving…") : t(M.save, lo)}
            </Button>
          </div>
        </form>
      </Card>

      {/* Privacy & export */}
      <Card>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 max-w-xl">
            <div className="flex items-start gap-3">
              <Checkbox
                id="journal-ai-optin"
                checked={aiOptIn === true}
                disabled={aiOptIn === null || consentBusy}
                onCheckedChange={(c) => void toggleConsent(c === true)}
              />
              <label htmlFor="journal-ai-optin" className="cursor-pointer text-sm leading-relaxed">
                {t(M.journalAiOptIn, lo)}
                <span className="mt-1 block text-xs text-[var(--fg-muted)]">
                  {t(M.journalPrivacyNote, lo)}
                </span>
              </label>
            </div>
            {aiOptIn === null && (
              <div className="mt-2">
                <Spinner label={t(M.loading, lo)} />
              </div>
            )}
            {consentError && (
              <p role="alert" className="mt-2 text-sm text-el-fire">
                {consentError}
              </p>
            )}
          </div>
          <a href="/api/journal/export" download className="shrink-0">
            <Button variant="outline">{t(M.journalExport, lo)}</Button>
          </a>
        </div>
      </Card>

      {/* Repeated cards */}
      {repeats.length > 0 && (
        <Card>
          <h2 className="font-display text-lg font-semibold">{t(M.journalRepeatCards, lo)}</h2>
          <ul className="mt-3 grid gap-2">
            {repeats.map((r) => (
              <li key={r.title} className="flex items-center justify-between gap-4 text-sm">
                <span className="min-w-0 truncate">{r.title}</span>
                <Badge tone="gold">×{r.count}</Badge>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label={lo === "zh" ? "筛选" : "Filters"}>
        {filters.map((f) => (
          <Button
            key={f.value}
            size="sm"
            variant={kind === f.value ? "primary" : "outline"}
            aria-pressed={kind === f.value}
            onClick={() => setKind(f.value)}
          >
            {f.label}
          </Button>
        ))}
        <Button
          size="sm"
          variant={favOnly ? "secondary" : "outline"}
          aria-pressed={favOnly}
          onClick={() => setFavOnly((v) => !v)}
        >
          <Star className="h-4 w-4" aria-hidden />
          {t(M.journalFavorites, lo)}
        </Button>
      </div>

      {/* List */}
      {status === "loading" ? (
        <div className="py-10 text-center">
          <Spinner label={t(M.loading, lo)} />
        </div>
      ) : status === "error" ? (
        <Alert tone="warn">
          {lo === "zh" ? "手记加载失败。" : "Your journal could not be loaded."}{" "}
          <Button size="sm" variant="outline" className="ml-2" onClick={() => void load()}>
            {t(M.retry, lo)}
          </Button>
        </Alert>
      ) : entries.length === 0 ? (
        <Card className="text-center text-[var(--fg-muted)]">{t(M.journalEmpty, lo)}</Card>
      ) : (
        <ul className="grid gap-4">
          {entries.map((e) => (
            <li key={e.id}>
              <EntryCard entry={e} locale={lo} onChanged={handleChanged} onDeleted={handleDeleted} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------

function EntryCard({
  entry,
  locale,
  onChanged,
  onDeleted,
}: {
  entry: Entry;
  locale: Locale;
  onChanged: (e: Entry) => void;
  onDeleted: (id: string) => void;
}) {
  const lo = locale;
  const [editing, setEditing] = React.useState(false);
  const [notesDraft, setNotesDraft] = React.useState(entry.notes);
  const [confirming, setConfirming] = React.useState(false);
  const [busy, setBusy] = React.useState<null | "fav" | "notes" | "delete">(null);
  const [error, setError] = React.useState<string | null>(null);

  const tags = React.useMemo<string[]>(() => {
    try {
      const a = JSON.parse(entry.tagsJson);
      return Array.isArray(a) ? a.filter((x): x is string => typeof x === "string") : [];
    } catch {
      return [];
    }
  }, [entry.tagsJson]);

  async function patch(body: Record<string, unknown>): Promise<boolean> {
    const res = await fetch(`/api/journal/${entry.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return res.ok;
  }

  async function toggleFavorite() {
    setError(null);
    setBusy("fav");
    const ok = await patch({ favorite: !entry.favorite }).catch(() => false);
    setBusy(null);
    if (ok) onChanged({ ...entry, favorite: !entry.favorite });
    else setError(lo === "zh" ? "操作失败，请重试。" : "That did not work. Please try again.");
  }

  async function saveNotes() {
    setError(null);
    setBusy("notes");
    const ok = await patch({ notes: notesDraft }).catch(() => false);
    setBusy(null);
    if (ok) {
      onChanged({ ...entry, notes: notesDraft });
      setEditing(false);
    } else {
      setError(lo === "zh" ? "笔记保存失败，请重试。" : "The notes could not be saved. Please try again.");
    }
  }

  async function remove() {
    setError(null);
    setBusy("delete");
    try {
      const res = await fetch(`/api/journal/${entry.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      onDeleted(entry.id);
    } catch {
      setBusy(null);
      setConfirming(false);
      setError(lo === "zh" ? "删除失败，请重试。" : "Could not delete. Please try again.");
    }
  }

  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-base font-semibold">{entry.title}</h3>
            <Badge tone="info">{kindLabel(entry.kind, lo)}</Badge>
            {entry.mood && <Badge>{`${t(M.journalMood, lo)}: ${moodLabel(entry.mood, lo)}`}</Badge>}
          </div>
          <p className="mt-1 text-xs text-[var(--fg-muted)]">{formatDate(entry.createdAt, lo)}</p>
        </div>
        <button
          type="button"
          onClick={() => void toggleFavorite()}
          disabled={busy === "fav"}
          aria-pressed={entry.favorite}
          aria-label={
            entry.favorite
              ? lo === "zh"
                ? "取消收藏"
                : "Remove from favorites"
              : lo === "zh"
                ? "收藏"
                : "Add to favorites"
          }
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full hover:bg-[var(--bg)] disabled:opacity-50"
        >
          <Star
            className={
              entry.favorite ? "h-5 w-5 fill-gold text-gold" : "h-5 w-5 text-[var(--fg-muted)]"
            }
            aria-hidden
          />
        </button>
      </div>

      {tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      )}

      <div className="mt-3">
        {editing ? (
          <div>
            <Label htmlFor={`notes-${entry.id}`}>{t(M.journalNotes, lo)}</Label>
            <Textarea
              id={`notes-${entry.id}`}
              value={notesDraft}
              maxLength={8000}
              onChange={(e) => setNotesDraft(e.target.value)}
            />
            <div className="mt-2 flex gap-2">
              <Button size="sm" disabled={busy === "notes"} onClick={() => void saveNotes()}>
                {busy === "notes" ? (lo === "zh" ? "保存中…" : "Saving…") : t(M.save, lo)}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                disabled={busy === "notes"}
                onClick={() => {
                  setNotesDraft(entry.notes);
                  setEditing(false);
                }}
              >
                {t(M.cancel, lo)}
              </Button>
            </div>
          </div>
        ) : entry.notes ? (
          <p className="whitespace-pre-wrap text-sm leading-relaxed">{entry.notes}</p>
        ) : (
          <p className="text-sm italic text-[var(--fg-muted)]">
            {lo === "zh" ? "还没有笔记。" : "No notes yet."}
          </p>
        )}
      </div>

      {error && (
        <p role="alert" className="mt-3 text-sm text-el-fire">
          {error}
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-[var(--line)] pt-3">
        {!editing && (
          <Button size="sm" variant="outline" onClick={() => setEditing(true)}>
            {t(M.edit, lo)} · {t(M.journalNotes, lo)}
          </Button>
        )}
        {!confirming ? (
          <Button size="sm" variant="ghost" onClick={() => setConfirming(true)}>
            {t(M.delete, lo)}
          </Button>
        ) : (
          <span className="inline-flex flex-wrap items-center gap-2">
            <span className="text-sm text-[var(--fg-muted)]">
              {lo === "zh" ? "确定删除这条记录？" : "Delete this entry?"}
            </span>
            <Button size="sm" variant="danger" disabled={busy === "delete"} onClick={() => void remove()}>
              {busy === "delete" ? (lo === "zh" ? "删除中…" : "Deleting…") : t(M.confirm, lo)}
            </Button>
            <Button size="sm" variant="ghost" disabled={busy === "delete"} onClick={() => setConfirming(false)}>
              {t(M.cancel, lo)}
            </Button>
          </span>
        )}
      </div>
    </Card>
  );
}
