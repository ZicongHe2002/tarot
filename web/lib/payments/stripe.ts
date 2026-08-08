import Stripe from "stripe";
import { env } from "../config";

let client: Stripe | null = null;

export function stripeEnabled(): boolean {
  return !!env.stripeSecretKey();
}

export function getStripe(): Stripe {
  if (!client) {
    const key = env.stripeSecretKey();
    if (!key) throw new Error("STRIPE_SECRET_KEY is not configured");
    client = new Stripe(key);
  }
  return client;
}

/** Stripe Checkout locale for our UI locales. */
export function stripeLocale(locale: "en" | "zh"): Stripe.Checkout.SessionCreateParams.Locale {
  return locale === "zh" ? "zh" : "en";
}
