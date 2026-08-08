import NextAuth, { type NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { setDevMagicLink } from "@/lib/dev-mailbox";

const providers: NextAuthConfig["providers"] = [];

// Google OAuth is enabled only when credentials are configured (spec §3).
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  );
}

// Resend's HTTPS API works on Render's free service (outbound SMTP ports do
// not). Without a key, local development keeps the console/dev-mailbox flow.
const resendApiKey = process.env.RESEND_API_KEY || "";
const emailProvider = Resend({
  apiKey: resendApiKey || "development-only",
  from: process.env.EMAIL_FROM || "no-reply@localhost",
});
if (!resendApiKey) {
  emailProvider.sendVerificationRequest = async ({ identifier, url }) => {
    if (process.env.NODE_ENV === "production") {
      throw new Error("RESEND_API_KEY is not configured");
    }
    console.log(`\n[dev] Magic sign-in link for ${identifier}:\n${url}\n`);
    setDevMagicLink(identifier, url);
  };
}
providers.push(emailProvider);

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" },
  providers,
  pages: {
    signIn: "/en/account/signin",
    verifyRequest: "/en/account/check-email",
  },
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        (session.user as { id?: string }).id = user.id;
        (session.user as { role?: string }).role = (user as { role?: string }).role ?? "user";
      }
      return session;
    },
  },
});
