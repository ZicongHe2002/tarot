// Development-only in-memory mailbox so the email sign-in flow (and e2e
// tests) can run without an SMTP server. Never active in production.
const links = new Map<string, string>();

export function setDevMagicLink(email: string, url: string) {
  if (process.env.NODE_ENV === "production") return;
  links.set(email.toLowerCase(), url);
}

export function getDevMagicLink(email: string): string | undefined {
  if (process.env.NODE_ENV === "production") return undefined;
  return links.get(email.toLowerCase());
}
