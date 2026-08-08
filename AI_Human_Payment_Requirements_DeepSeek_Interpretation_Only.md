# AI, Human Advisor, and Payment Requirements
## DeepSeek Interpretation-Only Architecture

**Version:** 1.1  
**Prepared:** July 2026 (v1.1 revised July 16, 2026 — payment-section review incorporated)  
**Primary market:** English-speaking and Chinese-speaking adults (English + Chinese UI at launch; additional languages later)  
**Product:** Tarot, Western Astrology, BaZi, Horoscope, and Personalized Guidance Platform

> **v1.1 changes:** single interpretation model (`deepseek-v4-pro`); new payment-method and market-scope policy for the Chinese-language audience (§7.6); subscription lifecycle policy (§7.7); EU/UK digital-content withdrawal consent (§7.8); unit economics and price floors (§7.9); transfer-reversal flow (§9.6); statement-descriptor and dispute requirements (§11); expanded webhook list (§14); crisis-content escalation path (§6.5); Stripe Tax moved to Phase 1 (§16); acceptance criteria 19–23 (§17).

> **Product rule:** Calculation engines calculate. DeepSeek interprets. Human advisors provide human services. The payment system handles money. These responsibilities must remain separate.

---

## 1. Product Structure

The website has two customer-facing service channels:

### 1.1 AI Readings

AI readings are automatically generated interpretations based on deterministic source data.

Examples:

- AI Tarot interpretation
- AI natal-chart interpretation
- AI BaZi interpretation
- AI compatibility interpretation
- AI daily guidance
- AI annual report

DeepSeek is used **only to interpret structured results**.

DeepSeek must not:

- draw or shuffle Tarot cards;
- select a Tarot spread;
- calculate planetary positions;
- calculate signs, houses, aspects, or transits;
- calculate BaZi pillars;
- calculate Heavenly Stems or Earthly Branches;
- calculate the Day Master, Ten Gods, Five Elements, Luck Pillars, or annual cycles;
- convert dates, timezones, solar time, or solar terms;
- determine product prices;
- charge customers;
- schedule appointments;
- select a human advisor;
- approve refunds;
- release advisor payouts;
- make final safety or moderation decisions;
- alter any supplied calculated value.

### 1.2 Human Advisor Services

Human advisors provide paid services such as:

- written Tarot readings;
- written astrology readings;
- written BaZi reports;
- scheduled text consultation;
- scheduled voice consultation;
- scheduled video consultation;
- human review of an AI-generated report.

A human advisor may review deterministic calculation results and an AI-generated draft, but the customer must be clearly told whether the final service is:

- AI-generated;
- human-written;
- AI-assisted and human-reviewed.

### 1.3 Hybrid Services

A hybrid service combines automated preparation with human judgment.

Example:

```text
Customer purchases a BaZi consultation
→ BaZi engine calculates the chart
→ DeepSeek produces a draft explanation
→ Human advisor reviews and edits the draft
→ Human advisor conducts the consultation
→ Final human-reviewed report is delivered
```

The final page must display:

> This report was prepared with AI assistance and reviewed by a human advisor.

---

## 2. System Architecture

```text
Customer Input
    ↓
Input Validation
    ↓
Location and Historical Timezone Normalization
    ↓
Deterministic Calculation Layer
    ├── Tarot Engine
    ├── Astrology Engine
    └── BaZi Engine
    ↓
Structured Reading Data
    ↓
Privacy Redaction and Data Minimization
    ↓
DeepSeek Interpretation Service
    ↓
Schema Validation
    ↓
Application Safety Layer
    ↓
Customer Result
```

Human services use a parallel workflow:

```text
Customer Booking
    ↓
Payment
    ↓
Advisor Assignment or Selection
    ↓
Deterministic Calculation
    ↓
Optional DeepSeek Draft
    ↓
Human Review or Live Consultation
    ↓
Service Completion
    ↓
Refund Window / Dispute Check
    ↓
Advisor Payout
```

---

## 3. Separation of Responsibilities

| Component | Allowed responsibilities | Prohibited responsibilities |
|---|---|---|
| Tarot Engine | Secure card draw, orientation, spread positions | Interpretation and customer advice |
| Astrology Engine | Planetary positions, houses, aspects, transits | Narrative interpretation |
| BaZi Engine | Pillars, stems, branches, elements, Ten Gods, cycles | Narrative interpretation |
| DeepSeek | Explain supplied structured facts in natural language | Calculation, card selection, payment, booking |
| Safety Layer | Detect prohibited or high-risk content | Recalculate charts |
| Human Advisor | Human interpretation, consultation, review | Access unrelated private user data |
| Payment Service | Checkout, subscription, refunds, transfers | Interpret readings |
| Application Backend | Authorization, orchestration, storage, audit | Invent missing calculation values |

---

## 4. DeepSeek Integration Requirements

### 4.1 Official API interface

The DeepSeek API currently supports OpenAI-compatible and Anthropic-compatible interfaces. Current official model names include:

```text
deepseek-v4-flash
deepseek-v4-pro
```

Legacy names `deepseek-chat` and `deepseek-reasoner` are scheduled for deprecation on July 24, 2026. Model names must therefore be configured through environment variables rather than hardcoded throughout the application.

Recommended configuration:

```env
DEEPSEEK_API_KEY=
DEEPSEEK_BASE_URL=https://api.deepseek.com
DEEPSEEK_MODEL=deepseek-v4-pro
DEEPSEEK_TIMEOUT_MS=45000
DEEPSEEK_MAX_RETRIES=2
```

### 4.2 Model usage

**Policy (v1.1):** all interpretations use `deepseek-v4-pro` through the single `DEEPSEEK_MODEL` environment variable. AI cost is not a margin driver (see §7.9): a full report of roughly 3,000 input / 2,000 output tokens costs about $0.003 at current v4-pro pricing, so tiering models per use case adds configuration complexity without meaningful savings.

The model name must remain configurable because availability, names, performance, and pricing can change. If AI volume ever makes cost material (for example, cached daily-card interpretations at large scale), `deepseek-v4-flash` can be reintroduced for short-form use cases behind the same interface.

### 4.3 DeepSeek must receive structured facts

Do not send a screenshot of a chart and ask DeepSeek to infer its contents.

Send structured JSON:

```json
{
  "request_id": "rdg_01J...",
  "reading_type": "bazi_general",
  "language": "en",
  "calculation": {
    "day_master": {
      "stem": "Jia",
      "element": "Wood",
      "polarity": "Yang"
    },
    "pillars": {
      "year": {
        "stem": "Xin",
        "branch": "Si"
      },
      "month": {
        "stem": "Bing",
        "branch": "Shen"
      },
      "day": {
        "stem": "Jia",
        "branch": "Zi"
      },
      "hour": null
    },
    "hour_pillar_status": "unknown_birth_time",
    "element_distribution": {
      "wood": 2,
      "fire": 2,
      "earth": 1,
      "metal": 2,
      "water": 3
    },
    "calculation_warnings": [
      "Birth time was not provided. Do not discuss the Hour Pillar."
    ]
  },
  "user_context": {
    "topic": "career",
    "question": "What work patterns should I reflect on?"
  }
}
```

DeepSeek may explain only the supplied facts.

### 4.4 No tool access

The DeepSeek interpretation request must not include tools or function-calling permissions.

Do not allow DeepSeek to call:

- Tarot draw functions;
- astrology calculators;
- BaZi calculators;
- location services;
- payment APIs;
- account APIs;
- appointment APIs;
- refund APIs;
- payout APIs;
- search APIs;
- internal admin tools.

The interpretation service should behave like a stateless transformation:

```text
Validated structured input
→ Natural-language interpretation
```

### 4.5 Structured output

Use JSON Output and validate the response before display.

Expected output:

```json
{
  "title": "A Period for Deliberate Growth",
  "summary": "Your supplied chart factors suggest...",
  "sections": [
    {
      "heading": "Core Pattern",
      "body": "...",
      "source_tags": ["bazi"]
    }
  ],
  "reflection_question": "Where are you expanding faster than your routines can support?",
  "suggested_action": "Choose one work commitment to simplify this week.",
  "limitations": [
    "The Hour Pillar is unavailable because the birth time is unknown.",
    "This interpretation is for reflection and entertainment."
  ],
  "safety_flags": []
}
```

Required server-side checks:

- valid JSON;
- valid schema;
- no missing required fields;
- no invented source facts;
- no unsupported certainty;
- no prohibited advice;
- no leaked system prompt;
- no unexpected HTML or executable code.

### 4.6 Failure handling

If DeepSeek returns:

- empty output;
- invalid JSON;
- timeout;
- rate-limit response;
- server error;
- unsafe output;

the application must:

1. retry only within the configured limit;
2. never charge twice;
3. never recreate the Tarot draw or chart calculation;
4. preserve the original calculation;
5. show a recoverable generation state;
6. allow regeneration using the same source data;
7. log the failure without logging unnecessary personal information.

---

## 5. DeepSeek System Prompt

```text
You are the interpretation component of a Tarot, Western astrology, and
Chinese BaZi self-reflection platform.

You do not perform calculations. You do not draw cards. You do not infer
missing chart values. You do not call tools. You interpret only the structured
facts supplied by the application.

Rules:

1. Use only facts explicitly supplied in the input JSON.
2. Never invent a Tarot card, placement, aspect, transit, pillar, stem,
   branch, element, Ten God, Luck Pillar, date, time, or calculation.
3. Preserve every missing-data note and calculation warning.
4. When birth time is unknown, do not discuss the Ascendant, houses, or
   Hour Pillar unless the input explicitly supplies a permitted range.
5. Keep Tarot, astrology, and BaZi as distinct traditions.
6. Do not claim that agreement between traditions scientifically proves
   an outcome.
7. Use reflective language such as "may," "might," "could suggest,"
   "one interpretation is," and "consider."
8. Do not guarantee future events.
9. Do not determine another person's private thoughts, intentions, medical
   state, fidelity, guilt, or future actions as fact.
10. Do not give medical, legal, financial, gambling, emergency, or diagnostic
    advice.
11. Do not predict a specific death, pregnancy outcome, crime, disaster,
    investment return, or reconciliation.
12. Do not claim that a user is cursed or must pay to avoid harm.
13. Provide one practical reflection or low-risk action.
14. Clearly state relevant limitations.
15. Return valid JSON matching the required schema and no additional text.
```

---

## 6. Privacy Requirements for DeepSeek

The platform must treat user questions and birth information as private.

DeepSeek's current privacy materials state that its services are not intended for sensitive personal data, that inputs may be processed to provide and improve services, and that personal data may be stored and processed in the People's Republic of China. The platform operator is responsible for its own downstream privacy policy and lawful processing.

Therefore, the application must minimize and sanitize data before sending it to DeepSeek.

### 6.1 Do not send

Unless strictly necessary and specifically approved:

- legal name;
- email address;
- phone number;
- street address;
- account password;
- payment information;
- government identification;
- exact raw birth location;
- full private journal history;
- another person's identity;
- medical records;
- sexual-health details;
- immigration status;
- criminal-history details;
- precise geolocation;
- support conversations.

### 6.2 Prefer derived data

Send:

```text
Day Master: Yang Wood
Moon: 12° Taurus
Venus trine Jupiter
Tarot card: The Hermit, upright
Topic: career reflection
```

Instead of:

```text
Full legal name
Exact date, time, and hospital of birth
Home address
Partner's name and personal history
```

### 6.3 Question sanitization

Before DeepSeek receives a free-text question:

- remove email addresses;
- remove phone numbers;
- remove street addresses;
- remove payment information;
- remove government IDs;
- replace named third parties with neutral labels;
- flag high-stakes medical, legal, financial, abuse, or crisis content;
- truncate unnecessary history.

Example:

```text
Original:
"Is John Smith at 123 Main Street cheating on me?"

Sanitized:
"Could this reading help me reflect on trust and communication in my relationship?"
```

The system must not pretend the sanitized question proves anything about the third party.

### 6.4 High-stakes content escalation (added v1.1)

Flagging alone (§6.3) is not a policy. When the sanitizer or safety layer flags medical, legal, financial-distress, abuse, self-harm, or crisis content, the application must follow a defined path:

1. **Self-harm or harm-to-others signals:** do not generate an interpretation. Show a supportive message with crisis-resource guidance (localized per market; e.g., 988 in the US, local emergency services elsewhere). Do not charge; auto-refund if already charged. Record a `safety_events` entry.
2. **Medical, legal, or financial-decision questions:** generate only if the question can be reframed as personal reflection; the interpretation must include the §15.4 disclaimer prominently and must not answer the medical/legal/financial question itself.
3. **Abuse or violence directed at the user:** show resource guidance alongside (not instead of) any reflective content; never advise confrontation.
4. All escalations are logged without storing unnecessary sensitive detail.

### 6.5 User disclosure

Before an AI reading, display:

> Your reading will be generated by AI from calculated or selected reading data. AI interpretations can be inaccurate. Do not include medical records, financial account information, government identification, or other highly sensitive personal information in your question.

The privacy policy must disclose the use of DeepSeek or describe the external AI processor in legally appropriate terms.

---

## 7. AI Reading Products and Payment

AI products are sold directly by the platform.

### 7.1 Product types

**Free**

- daily Tarot card;
- basic daily horoscope;
- basic BaZi summary;
- limited AI interpretations.

**One-time purchase**

- full Tarot reading;
- full natal-chart interpretation;
- full BaZi interpretation;
- compatibility report;
- annual report.

**Subscription**

- daily personalized guidance;
- a monthly allowance of premium interpretations;
- weekly and monthly summaries;
- journal history;
- member pricing for human services.

### 7.2 Recommended payment architecture

Use Stripe Checkout or Stripe Elements for one-time AI purchases and Stripe Billing for subscriptions, subject to payment-provider approval.

AI payment flow:

```text
Customer selects AI product
→ Checkout Session is created
→ Customer pays
→ Stripe webhook confirms payment
→ Order becomes paid
→ Existing deterministic calculation is loaded
→ DeepSeek interpretation is generated
→ Result is stored
→ Customer receives access and receipt
```

Do not generate the paid report based only on a browser redirect. Use a verified payment webhook.

### 7.3 AI order statuses

```text
created
payment_pending
paid
generation_pending
generating
completed
generation_failed
refund_pending
partially_refunded
refunded
disputed
```

### 7.4 Idempotency

The system must prevent:

- duplicate charges;
- duplicate reports;
- double use of a report credit;
- multiple refunds;
- repeated webhook processing.

Use:

- Stripe idempotency keys;
- unique checkout/order references;
- webhook event deduplication;
- database transactions;
- unique constraints.

### 7.5 AI refund policy

Suggested operational policy:

| Situation | Recommended response |
|---|---|
| Payment succeeded but report was never generated | Regenerate or refund |
| DeepSeek outage delayed generation | Keep order pending, allow refund after stated threshold |
| Duplicate charge | Refund duplicate |
| Report contains a technical calculation error | Correct and regenerate; refund when correction is not possible |
| User simply dislikes the symbolic interpretation | Review under published digital-content policy |
| Safety filter blocks generation | Do not charge, or automatically refund if already charged |

The final policy requires legal review for the target markets.

### 7.6 Payment methods and market scope (added v1.1)

Chinese-language UI does **not** mean the mainland-China market. These are separate decisions with different payment consequences:

1. **Mainland China is out of scope as a payment market.** Fortune-telling services are legally restricted there, and the domestic rails (Alipay, WeChat Pay) maintain restricted-category lists covering fortune-telling/superstition merchants. Do not enable Alipay or WeChat Pay as Stripe payment methods without written category approval; plan on not having them.
2. **The Chinese-speaking target audience is the diaspora** — Hong Kong, Taiwan, Singapore, Malaysia, and Chinese speakers in the US, Canada, Australia, and the UK. They pay with cards and wallets.
3. **Launch payment methods: cards, Apple Pay, Google Pay, Link — nothing else.** All confirm synchronously, which keeps the fulfillment webhook story simple (no `async_payment_*` dependencies).
4. **Launch currency: USD only.** Store Stripe Price IDs in configuration per currency so HKD/TWD/SGD can be added later without refactoring.
5. **Checkout localization:** pass the user's locale to Stripe Checkout (`zh`, `zh-HK`, `zh-TW`, `en` are supported) rather than building a custom payment UI. Stripe localizes the payment page and receipts.
6. **Chinese legal wording:** the funds-holding language rule in §9.2 applies to translations. Avoid 托管 / 担保交易 phrasing (regulated escrow/guarantee meanings). Use neutral wording such as 平台在服务完成后与顾问结算.

### 7.7 Subscription lifecycle (added v1.1)

Selling subscriptions requires explicit lifecycle policy, not just webhook handling:

| Event | Policy |
|---|---|
| Renewal payment fails | Stripe Billing smart retries for up to 7 days; entitlements remain active during retries (grace period) |
| Retries exhausted | Subscription marked `past_due` → entitlements revoked; customer notified in their language |
| Customer cancels | Access continues to end of the paid period; no automatic proration refund |
| Plan upgrade | Prorated immediately via Stripe Billing |
| Plan downgrade | Applied at next renewal |
| Unused monthly interpretation credits | Expire at the end of each billing period; do **not** roll over. Expiry must be disclosed at purchase (unused credits can be treated as stored value in some jurisdictions) |
| Subscription refund requests | Follow published policy; first-period refunds within the withdrawal window per §7.8 |

### 7.8 Consumer withdrawal rights — EU/UK (added v1.1)

Instantly delivered digital content is exempt from the EU/UK 14-day withdrawal right **only if** the customer, at checkout:

1. expressly consents to immediate delivery, and
2. acknowledges losing the right of withdrawal.

Checkout must therefore include a required consent checkbox (in the customer's language) before payment for any instantly generated AI reading, and the consent must be stored in `consent_records` with timestamp and wording version. This consent is also the legal backbone for the "customer dislikes the interpretation" row in §7.5. Without it, EU/UK customers can demand a 14-day refund on any delivered reading.

### 7.9 Unit economics and price floors (added v1.1)

At current pricing, a full `deepseek-v4-pro` report (~3k input / 2k output tokens) costs about **$0.003**. AI cost is a rounding error; the margin lever is the payment provider's **fixed** fee (~$0.30 + 2.9% on Stripe):

| Price point | Stripe fee | Fee share of revenue |
|---|---|---|
| $1.99 | ~$0.36 | ~18% |
| $9.99 | ~$0.59 | ~6% |
| $19.99 | ~$0.88 | ~4.4% |

Rules:

1. One-time purchases are priced at **$9.99 or above**.
2. Low-priced items (daily guidance, single-card pulls) are sold only through the subscription or multi-use credit packs, never as individual sub-$5 charges.
3. Free-tier daily interpretations are cached per card/orientation/locale/day to bound AI spend.

---

## 8. Human Advisor Marketplace

Human services require marketplace infrastructure.

### 8.1 Advisor types

```text
Tarot Reader
Astrologer
BaZi Consultant
Combined-Practice Advisor
```

### 8.2 Service formats

Start with:

1. asynchronous written reading;
2. scheduled text session;
3. scheduled voice session.

Add video only after the core booking, moderation, refund, and payout system is stable.

### 8.3 Advisor onboarding

Collect:

- legal identity through the payment provider;
- public display name;
- country;
- supported languages;
- specialties;
- experience;
- sample reading;
- pricing;
- availability;
- tax information;
- payout details;
- acceptance of the advisor agreement;
- acceptance of safety and off-platform-payment rules.

### 8.4 Advisor dashboard

Required functions:

- create services;
- set available times;
- accept or decline requests;
- see sanitized customer context;
- view deterministic charts;
- request an optional AI draft;
- deliver written work;
- join scheduled sessions;
- mark service complete;
- see earnings;
- see payout status;
- respond to disputes;
- manage profile and credentials.

Advisors must not see unrelated birth profiles, journal entries, or other customer readings.

---

## 9. Human-Service Payment Architecture

### 9.1 Recommended system

Use Stripe Connect for advisor onboarding and payouts, subject to Stripe's approval of the business model and jurisdictions.

The platform must accurately disclose that it offers:

- AI-generated Tarot, astrology, and BaZi interpretations;
- paid human readings or consultations;
- advisor marketplace services;
- platform commissions;
- customer refunds;
- advisor payouts.

Do not disguise the business as therapy, financial advice, or another category.

### 9.2 Charge model

For a single advisor and immediate transfer, destination charges can be suitable.

For this product, **separate charges and transfers** are generally the better starting design because the platform may need to wait until a written report or consultation is delivered before transferring earnings to the advisor.

Stripe's marketplace documentation states that separate charges and transfers can be used when the platform needs to hold funds before transferring them after delivery.

Recommended flow:

```text
Customer pays platform
→ Payment is confirmed
→ Advisor completes the service
→ Platform marks service complete
→ Refund/dispute checks run
→ Platform calculates commission
→ Platform transfers advisor earnings
→ Advisor payout follows the connected-account schedule
```

Do not market this as legal escrow unless the business has the required legal and regulatory structure. This rule applies to every language the UI ships in — in Chinese, avoid 托管 / 担保交易 wording (see §7.6).

Before recruiting advisors in any country, verify that Stripe supports transfers from the platform's country to connected accounts in that country (separate charges and transfers has cross-border restrictions). Do not sign advisors the platform cannot pay.

### 9.3 Commission

Make commission configurable:

```text
Default platform commission: 25%
Minimum: configurable
Maximum: configurable
Payment-processing allocation: configurable
Taxes: separately recorded
```

Example:

```text
Customer payment:        $60.00
Platform commission:     $15.00
Advisor gross share:     $45.00
Payment/Connect fees:    recorded separately
Tax:                     calculated separately
Refund reserve:          optional platform policy
```

Do not calculate commission through DeepSeek.

### 9.4 Human order statuses

```text
created
payment_pending
paid
advisor_pending
advisor_confirmed
scheduled
in_progress
delivery_pending
delivered
customer_review_period
completed
transfer_pending
transferred
payout_pending
paid_out
cancelled
refund_pending
partially_refunded
refunded
disputed
chargeback_lost
```

Keep these dimensions separate:

```text
payment_status
service_status
refund_status
transfer_status
payout_status
dispute_status
```

### 9.6 Refunds after transfer — reversal flow (added v1.1)

§10 allows refunds for misconduct or disputes discovered **after** advisor earnings have been transferred. The flow must be defined, not improvised:

```text
Refund approved after transfer
→ Create transfer reversal for the advisor share
→ Refund the customer in full
→ If the advisor balance goes negative, recover from future earnings
→ Record audit entries for the refund and the reversal
```

Loss allocation:

| Case | Who absorbs the loss |
|---|---|
| Advisor misconduct confirmed | Advisor (transfer reversal; negative balance recovered from future earnings) |
| Platform error (wrong chart input, failed delivery infrastructure) | Platform |
| `chargeback_lost` after payout | Advisor share reversed where permitted; remainder is a platform loss reserve item |

The advisor agreement must state the reversal right, the negative-balance recovery mechanism, and the payout-release delay.

### 9.5 Required payment records

```text
order_id
customer_id
advisor_id
service_id
appointment_id
currency
gross_amount
discount_amount
tax_amount
platform_fee
advisor_amount
processing_fee
refund_amount
payment_provider
payment_intent_id
checkout_session_id
connected_account_id
transfer_id
payout_reference
payment_status
service_status
transfer_status
created_at
paid_at
completed_at
transferred_at
```

---

## 10. Cancellation, Refund, and Payout Policy

### 10.1 Scheduled sessions

Suggested starting policy:

| Event | Suggested treatment |
|---|---|
| Advisor cancels | Full refund or free reschedule |
| Advisor does not attend | Full refund |
| Customer cancels more than 24 hours before | Full refund |
| Customer cancels 6–24 hours before | Partial refund or service credit |
| Customer cancels less than 6 hours before | Normally non-refundable |
| Customer does not attend | Normally non-refundable |
| Platform failure prevents service | Refund or free reschedule |
| Serious advisor misconduct | Refund and investigation |

### 10.2 Written readings

| Event | Suggested treatment |
|---|---|
| Advisor misses delivery deadline | Refund or reassignment |
| Advisor submits empty or unrelated content | Refund after review |
| Advisor copies prohibited content | Refund and advisor review |
| Customer dislikes the conclusion | Not automatically refundable |
| Technical chart input was wrong due to platform error | Correct and redeliver or refund |

### 10.3 Payout release

Do not transfer advisor funds before the platform has confirmed:

- payment succeeded;
- advisor completed the service;
- no automatic refund condition applies;
- no active high-risk dispute exists;
- advisor account is eligible for transfer.

The payout-release delay must be stated in the advisor agreement.

---

## 11. Payment-Provider Risk

Fortune-telling and psychic-service treatment varies by jurisdiction and payment provider.

Stripe's current restricted-business documentation explicitly prohibits psychic services and fortune tellers in some jurisdictions, including Japan, Mexico, and Thailand. Its support materials also state that restricted businesses may require additional review and explicit approval.

Requirements:

1. determine the platform company's legal country;
2. determine target customer countries;
3. determine advisor countries;
4. submit the full product description to Stripe;
5. obtain approval before relying on Stripe for launch;
6. keep a backup payment-provider evaluation;
7. never process undisclosed merchants or services;
8. monitor policy changes.

The website must use reflective and entertainment-oriented positioning, but it must not misrepresent the actual service to the payment provider.

Additional risk controls (added v1.1):

1. **Statement descriptor:** card descriptors are ASCII/Latin only. Choose a recognizable, discreet-but-accurate descriptor now; unrecognizable descriptors are a top chargeback cause, and this category already carries elevated dispute risk. Chinese-speaking customers will see the same Latin descriptor.
2. **Dispute evidence** must be submitted to card networks in English. Store order, consent, and delivery evidence in English or bilingually regardless of the customer's language.
3. **Radar / fraud posture:** enable 3-D Secure for high-risk signals; on `radar.early_fraud_warning.created`, refund proactively rather than waiting for the chargeback.
4. **Refund-first posture:** in a high-dispute category, a fast refund is almost always cheaper than a lost dispute plus the dispute fee.

---

## 12. Database Additions

Add or update these entities:

```text
ai_interpretation_requests
ai_interpretation_results
ai_provider_events
reading_orders
products
prices
subscriptions
subscription_entitlements
usage_credits
advisors
advisor_profiles
advisor_services
advisor_availability
appointments
written_deliveries
connected_accounts
payment_transactions
refunds
transfers
payout_records
disputes
webhook_events
safety_events
consent_records
audit_events
```

### 12.1 AI interpretation request

```text
id
user_id
reading_id
reading_type
calculation_version
prompt_version
model_name
sanitized_input_json
input_hash
response_json
response_status
safety_status
token_usage
provider_request_id
created_at
completed_at
```

Do not store raw sensitive prompts unless required and disclosed.

---

## 13. API Boundaries

### 13.1 Interpretation service

```ts
interface InterpretationService {
  interpret(
    input: SanitizedInterpretationInput
  ): Promise<ValidatedInterpretationResult>;
}
```

This interface must not expose:

- payment client;
- calculation engine;
- appointment client;
- advisor selection;
- admin access.

### 13.2 Payment service

```ts
interface PaymentService {
  createAiCheckout(input: AiCheckoutInput): Promise<CheckoutResult>;
  createHumanServiceCheckout(
    input: HumanCheckoutInput
  ): Promise<CheckoutResult>;
  refund(input: RefundInput): Promise<RefundResult>;
}
```

### 13.3 Marketplace transfer service

```ts
interface AdvisorTransferService {
  createConnectedAccount(
    input: AdvisorOnboardingInput
  ): Promise<ConnectedAccountResult>;

  releaseEarnings(
    input: ReleaseEarningsInput
  ): Promise<TransferResult>;
}
```

DeepSeek must never have access to either payment interface.

---

## 14. Webhook Requirements

Handle and verify relevant events such as:

```text
checkout.session.completed
checkout.session.expired
checkout.session.async_payment_succeeded   (only if a delayed method is ever enabled)
checkout.session.async_payment_failed      (only if a delayed method is ever enabled)
payment_intent.succeeded
payment_intent.payment_failed
charge.refunded
charge.refund.updated                      (refunds can fail after creation)
charge.dispute.created
charge.dispute.closed
radar.early_fraud_warning.created
customer.subscription.created
customer.subscription.updated
customer.subscription.deleted
invoice.paid
invoice.payment_failed
account.updated
transfer.created
transfer.reversed
transfer.failed
payout.paid
payout.failed
```

Requirements:

- verify webhook signatures;
- deduplicate events;
- store provider event IDs;
- process asynchronously where appropriate;
- return quickly to the provider;
- retry safely;
- never trust client-submitted payment status;
- create audit entries for refunds and transfers.

---

## 15. Customer-Facing Disclosures

### 15.1 AI result disclosure

> This interpretation was generated by AI from structured Tarot, astrology, or BaZi data. The AI did not calculate the chart or draw the cards. AI output may contain mistakes and is intended for entertainment, cultural exploration, and personal reflection.

### 15.2 Human result disclosure

> This service is provided by an independent human advisor through the platform. The advisor's interpretation reflects their professional or personal practice and does not guarantee future outcomes.

### 15.3 Hybrid result disclosure

> Deterministic tools produced the underlying chart or card data. AI assisted with the initial explanation, and a human advisor reviewed or expanded the final service.

### 15.4 General disclaimer

> Tarot, astrology, BaZi, horoscopes, compatibility readings, and related services are intended for entertainment, cultural exploration, and personal reflection. They are not medical, psychological, legal, financial, or emergency services and do not guarantee future outcomes.

---

## 16. MVP Recommendation

### Phase 1

Launch:

- deterministic Tarot drawing;
- basic astrology calculation;
- basic BaZi calculation;
- DeepSeek interpretation-only service;
- one-time AI purchases (guest checkout with tokenized result access);
- payment webhooks;
- **Stripe Tax on Checkout** (EU/UK VAT applies from the first digital sale; US digital-goods tax varies by state — this cannot wait for Phase 4);
- **withdrawal-right consent checkbox** at checkout (§7.8);
- English and Chinese UI, locale-aware Stripe Checkout;
- privacy and safety controls, including the §6.4 escalation path.

AI subscriptions and saved reading history move to **Phase 1.5**, because they require customer accounts; ship one-time purchases first (they are the revenue core per §7.9 pricing rules).

### Phase 2

Add:

- written human readings;
- Stripe Connect onboarding;
- advisor dashboard;
- separate charges and transfers;
- delivery deadlines;
- refund and dispute workflows;
- advisor ratings after completed orders.

### Phase 3

Add:

- scheduled text sessions;
- voice sessions;
- calendar availability;
- rescheduling;
- advisor payout automation;
- hybrid AI-plus-human products.

### Phase 4

Consider:

- video;
- international advisors;
- multiple presentment currencies (HKD/TWD/SGD price points; tax itself is Phase 1);
- additional languages (traditional-character Chinese variants, then others);
- mobile applications;
- additional payment providers.

---

## 17. Acceptance Criteria

The implementation is acceptable only when:

1. DeepSeek receives structured, sanitized reading data.
2. DeepSeek has no calculation, payment, booking, or tool access.
3. Tarot cards cannot be changed by DeepSeek.
4. Astrology and BaZi values cannot be generated by DeepSeek.
5. Missing birth time remains missing.
6. DeepSeek responses are schema-validated.
7. Invalid AI output is blocked before display.
8. AI generation failure cannot create a duplicate charge.
9. A payment redirect alone cannot mark an order as paid.
10. Payment status is confirmed by verified webhooks.
11. AI and human products use separate operational workflows.
12. Human-service funds are not transferred before completion.
13. Customer refunds and advisor transfers are auditable.
14. Exact private birth data is not sent to DeepSeek unless strictly required.
15. The user is told when content is AI-generated, human-generated, or hybrid.
16. The payment provider has been given an accurate description of the business.
17. The platform does not describe delayed transfers as legal escrow, in any UI language.
18. Every result displays the appropriate disclaimer, in the user's language.
19. Checkout collects and stores the EU/UK immediate-delivery consent before payment for instantly delivered digital content.
20. Tax collection is active on Checkout from the first sale.
21. Only synchronous payment methods (cards and wallets) are enabled; Alipay/WeChat Pay remain disabled absent written category approval.
22. Crisis-flagged questions follow the §6.4 escalation path and are never charged.
23. One-time products are priced at or above the §7.9 floor; sub-$5 items are sold only via subscription or credit packs.

---

## 18. Official References

### DeepSeek

- [DeepSeek API — First API Call and Current Model Names](https://api-docs.deepseek.com/)
- [DeepSeek API — JSON Output](https://api-docs.deepseek.com/guides/json_mode/)
- [DeepSeek Open Platform Terms of Service](https://cdn.deepseek.com/policies/en-US/deepseek-open-platform-terms-of-service.html)
- [DeepSeek Privacy Policy](https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html)

### Stripe

- [Stripe Connect — Build a Marketplace](https://docs.stripe.com/connect/marketplace)
- [Stripe Connect — Accept a Marketplace Payment](https://docs.stripe.com/connect/marketplace/tasks/accept-payment)
- [Stripe Connect — Separate Charges and Transfers](https://docs.stripe.com/connect/separate-charges-and-transfers)
- [Stripe — Prohibited and Restricted Businesses](https://stripe.com/legal/restricted-businesses)
- [Stripe Support — Restricted Business Review](https://support.stripe.com/questions/prohibited-and-restricted-businesses-list-faqs)

---

## 19. Final Architecture Statement

The implementation must follow this exact separation:

```text
Tarot / Astrology / BaZi engines:
Produce facts.

DeepSeek:
Explains supplied facts.

Human advisors:
Provide human judgment and consultation.

Payment infrastructure:
Collects customer payments, manages subscriptions, refunds, commissions,
transfers, and payouts.

Application backend:
Coordinates these components and enforces privacy, authorization, safety,
versioning, and auditability.
```
