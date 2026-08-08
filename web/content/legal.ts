// Bilingual legal documents (template copy — review with counsel before launch).
// Placeholders that MUST be resolved before launch are marked in square brackets.

export interface LegalDoc {
  slug: string;
  title: { en: string; zh: string };
  updated: string; // ISO date
  sections: Array<{ heading: { en: string; zh: string }; body: { en: string; zh: string } }>;
}

const UPDATED = "2026-07-16";
const JURISDICTION =
  process.env.NEXT_PUBLIC_LEGAL_JURISDICTION || "[JURISDICTION — set before launch]";
const CONTACT =
  process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "[SUPPORT EMAIL — set before launch]";

export const LEGAL_DOCS: LegalDoc[] = [
  // ---------------------------------------------------------------- terms
  {
    slug: "terms",
    title: { en: "Terms of Service", zh: "服务条款" },
    updated: UPDATED,
    sections: [
      {
        heading: { en: "1. Acceptance of these terms", zh: "一、条款的接受" },
        body: {
          en: "These Terms of Service (the “Terms”) govern your access to and use of this website and its tarot, astrology, BaZi, daily-guidance, compatibility, and journaling features (together, the “Service”). By creating an account or using the Service, you agree to these Terms and to our Privacy Policy, Cookie Policy, Subscription Terms, and Refund Policy, which are incorporated by reference.\n\nWe may update these Terms from time to time. If a change is material, we will give reasonable advance notice — for example by email or an in-product message — before it takes effect. Continuing to use the Service after a change takes effect means you accept the updated Terms; if you do not accept them, please stop using the Service and, if you wish, delete your account.",
          zh: "本服务条款（下称“本条款”）适用于你对本网站及其塔罗、占星、八字、每日指引、合盘配对与手记等功能（统称“本服务”）的访问与使用。创建账户或使用本服务，即表示你同意本条款，以及经引用纳入本条款的《隐私政策》《Cookie 政策》《订阅条款》与《退款政策》。\n\n我们可能不时更新本条款。若变更属于重大变更，我们会在生效前以合理方式提前通知（例如通过邮件或产品内消息）。变更生效后继续使用本服务，即视为你接受更新后的条款；若你不接受，请停止使用本服务，并可自行注销账户。",
        },
      },
      {
        heading: { en: "2. Eligibility: adults only (18+)", zh: "二、使用资格：仅限成年人（18 周岁及以上）" },
        body: {
          en: "The Service is intended for adults aged 18 or over. By using the Service you confirm that you are at least 18 years old (or the age of majority where you live, if higher). We do not knowingly provide the Service to minors, and we may suspend or close accounts that we reasonably believe belong to someone under 18.\n\nIf you believe a minor is using the Service, please contact us so we can take appropriate action.",
          zh: "本服务仅面向 18 周岁及以上的成年人。使用本服务即表示你确认自己已年满 18 周岁（若你所在地的成年年龄更高，则以该年龄为准）。我们不会在知情的情况下向未成年人提供本服务；对于我们有合理理由认为属于未满 18 周岁人士的账户，我们可能予以暂停或关闭。\n\n如果你发现有未成年人在使用本服务，请与我们联系，以便我们采取适当措施。",
        },
      },
      {
        heading: { en: "3. What the Service is — and is not", zh: "三、本服务是什么——以及不是什么" },
        body: {
          en: "The Service offers tarot readings, astrological charts, BaZi charts, horoscopes, compatibility readings, and related interpretations for entertainment, cultural exploration, and personal reflection. Deterministic software calculates every card draw, chart position, and pillar; AI is used only to express those calculated facts in language. Interpretations are reflective by design and never guarantee any outcome.\n\nThe Service is not a source of medical, psychological, legal, financial, or other professional advice, and it is not an emergency service. Nothing in the Service should be relied on as a substitute for the judgment of a qualified professional, and no decision — about health, money, relationships, work, or anything else — should rest on a reading alone. If you are in crisis or in danger, contact local emergency services or a crisis hotline rather than the Service.",
          zh: "本服务提供塔罗解读、星盘、八字命盘、星座运势、合盘配对及相关解读内容，用途为娱乐、文化探索与个人反思。每一次抽牌、每一个星位、每一柱干支都由确定性的软件计算完成；AI 仅用于把这些既定的计算结果转写为语言。所有解读在设计上均为反思性内容，绝不保证任何结果。\n\n本服务不提供医疗、心理、法律、财务或其他专业建议，也不是紧急救助服务。本服务的任何内容都不应被当作合格专业人士意见的替代品；任何决定——无论关于健康、金钱、关系还是工作——都不应仅凭一次解读作出。如你正处于危机或危险之中，请联系当地的紧急服务或心理援助热线，而不是使用本服务。",
        },
      },
      {
        heading: { en: "4. Your account", zh: "四、你的账户" },
        body: {
          en: "You are responsible for the accuracy of the information in your account, for keeping your sign-in method secure, and for all activity under your account. An account is personal to you: please do not share credentials or let others use your account, and do not impersonate anyone else when registering.\n\nBirth details you enter are used only to perform the calculations you request and to personalize your readings, as described in the Privacy Policy. You may edit or delete your birth profiles, export your data, and delete your account at any time from your account settings.",
          zh: "你应确保账户信息的准确性，妥善保管你的登录方式，并对账户项下的一切活动负责。账户仅限本人使用：请勿共享登录凭据或允许他人使用你的账户，注册时也不得冒充他人。\n\n你填写的出生信息仅按《隐私政策》所述，用于完成你请求的排盘计算与解读个性化。你可以随时在账户设置中编辑或删除出生档案、导出你的数据，以及注销账户。",
        },
      },
      {
        heading: { en: "5. Acceptable use", zh: "五、可接受的使用" },
        body: {
          en: "You agree not to misuse the Service. In particular, you will not: (a) use the Service for any unlawful purpose or to harm, harass, or defraud others; (b) enter another person's birth data or personal information without a lawful basis to do so; (c) attempt to probe, disrupt, overload, or gain unauthorized access to the Service or its systems; (d) scrape, bulk-download, or resell the Service or its content; (e) use the Service to generate content that you then present as professional advice; or (f) circumvent usage limits, credit counts, or payment requirements.\n\nWe may throttle, suspend, or terminate access that we reasonably believe violates this section, with notice where practicable.",
          zh: "你同意不滥用本服务。特别地，你不得：（a）将本服务用于任何非法目的，或用于伤害、骚扰、欺诈他人；（b）在缺乏合法依据的情况下录入他人的出生信息或个人信息；（c）试图探测、干扰、过载本服务或未经授权访问其系统；（d）抓取、批量下载或转售本服务及其内容；（e）利用本服务生成内容后将其包装为专业建议对外提供；（f）规避使用限制、额度计数或付费要求。\n\n对于我们有合理理由认为违反本条的行为，我们可能限制、暂停或终止相关访问，并在可行时给予通知。",
        },
      },
      {
        heading: { en: "6. Content and intellectual property", zh: "六、内容与知识产权" },
        body: {
          en: "The Service — including its software, design, card artwork, explanatory texts, and the structure of its interpretations — is owned by us or our licensors and is protected by intellectual-property laws. We grant you a personal, non-exclusive, non-transferable licence to use the Service for your own non-commercial reflection while these Terms are in effect.\n\nYou keep all rights to the content you create in the Service, such as questions and journal entries. You grant us the limited licence needed to store, process, and display that content back to you — and, only where you explicitly opt in, to use selected journal entries to personalize your interpretations. Interpretations generated for you may be saved, printed, and shared for personal use; please do not present them as professionally authored advice.",
          zh: "本服务——包括其软件、设计、牌面素材、说明文字与解读的结构——归我们或我们的许可方所有，受知识产权法律保护。在本条款有效期内，我们授予你一项个人的、非排他的、不可转让的许可，供你出于自身非商业性的反思目的使用本服务。\n\n你在本服务中创建的内容（如提问与手记）的权利仍归你所有。你授予我们为存储、处理并向你展示这些内容所必需的有限许可——并且仅在你明确选择开启时，我们才会使用你选定的手记内容来个性化你的解读。为你生成的解读可供个人用途保存、打印与分享；请不要将其呈现为出自专业人士的建议。",
        },
      },
      {
        heading: { en: "7. Paid features, subscriptions, and refunds", zh: "七、付费功能、订阅与退款" },
        body: {
          en: "Some features require a paid subscription or a one-time purchase. Prices, renewal, cancellation, credit rules, and grace periods are set out in the Subscription Terms; refund rules are set out in the Refund Policy. Both documents form part of these Terms. Taxes may apply depending on your location and are shown at checkout where required.\n\nWe never charge you silently for a failed generation: if an interpretation you paid for cannot be produced, you are entitled to a regeneration or a full refund of that purchase as described in the Refund Policy.",
          zh: "部分功能需要付费订阅或单次购买。价格、续费、取消、额度规则与宽限期见《订阅条款》；退款规则见《退款政策》。两份文件均构成本条款的一部分。税费视你所在地区可能适用，并在需要时于结算页展示。\n\n我们绝不会让“生成失败”悄悄扣走你的钱：若你付费购买的解读未能生成，你有权按《退款政策》获得重新生成或该笔购买的全额退款。",
        },
      },
      {
        heading: {
          en: "8. Disclaimers, liability, termination, and governing law",
          zh: "八、免责声明、责任限制、终止与适用法律",
        },
        body: {
          en: "The Service is provided “as is” and “as available”. To the fullest extent permitted by law, we disclaim all warranties, express or implied, including fitness for a particular purpose, and we do not warrant that the Service will be uninterrupted or error-free. Symbolic interpretations are inherently subjective; we make no representation that any reading is accurate, complete, or suited to your circumstances.\n\nTo the fullest extent permitted by law, our total liability for any claim arising out of or relating to the Service is limited to the greater of the amount you paid us in the twelve months before the claim arose and USD 50; we are not liable for indirect, incidental, special, consequential, or punitive damages. Nothing in these Terms limits liability that cannot be limited by law, including liability arising from our willful misconduct or gross negligence, and nothing affects statutory consumer rights that cannot be waived.\n\nYou may stop using the Service or delete your account at any time. We may suspend or terminate the Service or your access to it for material breach of these Terms, with notice where practicable, and sections that by their nature should survive (including intellectual property, disclaimers, and liability limits) survive termination. These Terms are governed by the laws of " +
            JURISDICTION +
            ", without regard to conflict-of-law rules, and disputes will be brought in the courts of that jurisdiction unless mandatory law provides otherwise. Questions about these Terms: " +
            CONTACT +
            ".",
          zh: "本服务按“现状”及“可用”状态提供。在法律允许的最大范围内，我们不作任何明示或默示的保证（包括对特定用途适用性的保证），也不保证本服务不中断、无错误。象征体系的解读在本质上是主观的；我们不对任何解读的准确性、完整性或与你处境的契合度作出承诺。\n\n在法律允许的最大范围内，我们就因本服务引起或与之相关的任何请求所承担的责任总额，以你在请求发生前十二个月内向我们支付的金额与 50 美元中较高者为限；我们不对间接、附带、特殊、后果性或惩罚性损失承担责任。本条款不限制依法不得限制的责任（包括因我们的故意不当行为或重大过失产生的责任），亦不影响依法不可放弃的消费者法定权利。\n\n你可以随时停止使用本服务或注销账户。若你严重违反本条款，我们可能暂停或终止本服务或你的访问权限，并在可行时给予通知；依其性质应当存续的条款（包括知识产权、免责声明与责任限制）在终止后继续有效。本条款适用 " +
            JURISDICTION +
            " 法律（不适用其法律冲突规则）；除非强制性法律另有规定，争议应提交该司法辖区的法院解决。有关本条款的问题请联系：" +
            CONTACT +
            "。",
        },
      },
    ],
  },

  // ---------------------------------------------------------------- privacy
  {
    slug: "privacy",
    title: { en: "Privacy Policy", zh: "隐私政策" },
    updated: UPDATED,
    sections: [
      {
        heading: { en: "1. Overview", zh: "一、概述" },
        body: {
          en: "This policy explains what personal data we collect when you use the Service, why we collect it, how we protect it, and the choices you have. The short version: we collect only what the calculations and your account genuinely need, we treat birth data as sensitive, we send an external AI provider the minimum needed to write an interpretation, and you can export or delete your data at any time.\n\nThis policy applies to the website and all features under it. It does not apply to third-party sites we may link to.",
          zh: "本政策说明你在使用本服务时我们收集哪些个人数据、为何收集、如何保护，以及你拥有哪些选择。简而言之：我们只收集排盘计算与账户运行真正需要的数据；我们将出生数据视为敏感信息；发送给外部 AI 服务商的内容以生成解读所需的最小范围为限；你可以随时导出或删除自己的数据。\n\n本政策适用于本网站及其全部功能，不适用于我们可能链接到的第三方网站。",
        },
      },
      {
        heading: { en: "2. What we collect", zh: "二、我们收集的数据" },
        body: {
          en: "Account data: for token accounts, a one-way derived account identifier, sign-in records, language, and display preferences; the raw token is not stored in the application database. If optional email or OAuth sign-in is enabled later, the associated email address is also account data.\n\nBirth data: the birth date, birth time (if known), birth place, and — for BaZi luck pillars — sex at birth that you enter for yourself or for profiles you create (for example, for a compatibility reading). Birth data is provided by you and is never inferred or purchased from elsewhere.\n\nReadings and journal: the questions you type, the readings generated for you, and any journal notes, moods, or tags you save. Payments: if you buy a subscription or report, our payment processor handles your card details — we never see or store full card numbers; we keep order records (item, amount, status) required for accounting. Technical basics: server logs with IP address and user-agent kept briefly for security and abuse prevention.",
          zh: "账户数据：对于 token 账号，我们保存单向派生的账户标识、登录记录、语言与显示偏好；token 明文本身不会存入应用数据库。若日后启用可选的邮箱或 OAuth 登录，相关邮箱地址也属于账户数据。\n\n出生数据：你为自己或为你创建的档案（例如合盘时）录入的出生日期、出生时间（如已知）、出生地点，以及用于八字大运排法的出生性别。出生数据完全由你提供，我们绝不会从别处推断或购买。\n\n解读与手记：你输入的问题、为你生成的解读，以及你保存的手记笔记、心情与标签。支付：若你购买订阅或报告，你的卡片信息由支付处理商处理——我们不会看到或存储完整卡号；我们仅保留会计所需的订单记录（项目、金额、状态）。技术基础数据：包含 IP 地址与浏览器标识的服务器日志，短期保留，用于安全与滥用防范。",
        },
      },
      {
        heading: { en: "3. How we use your data", zh: "三、我们如何使用数据" },
        body: {
          en: "We use your data to: run the calculations you request (charts, pillars, draws) and show you the results; generate interpretations; keep you signed in and the Service secure; process payments and provide receipts; respond to support requests; and meet legal obligations. Where consent is the legal basis — such as using selected journal entries to personalize interpretations — we ask first, and you can withdraw consent at any time.\n\nWe do not sell your personal data, we do not use birth data for advertising, and we do not build advertising profiles.",
          zh: "我们使用你的数据用于：完成你请求的计算（星盘、四柱、抽牌）并向你展示结果；生成解读；维持登录状态与服务安全；处理支付并提供凭证；响应你的支持请求；以及履行法律义务。凡以同意为法律基础的用途——例如使用你选定的手记内容来个性化解读——我们都会先征得你的同意，你也可以随时撤回。\n\n我们不出售你的个人数据，不将出生数据用于广告，也不会构建广告画像。",
        },
      },
      {
        heading: { en: "4. How we protect birth data", zh: "四、我们如何保护出生数据" },
        body: {
          en: "Birth data is the most sensitive thing you give us, and it is handled under specific rules: it never appears in page URLs or query strings; it is never sent to analytics tools; and it never appears on share cards or any content designed to leave your account. Calculations run on our servers, and results are linked to your account rather than embedded in links.\n\nAccess to production data is restricted and logged, data is encrypted in transit, and backups are protected. No system is perfectly secure, but the design principle is simple: the fewer places your birth data exists, the safer it is.",
          zh: "出生数据是你交给我们的最敏感的信息，我们对它执行专门的规则：它绝不出现在页面网址或查询参数中；绝不发送给任何统计分析工具；也绝不出现在分享卡或任何会离开你账户的内容上。计算在我们的服务器上完成，结果关联到你的账户，而不是内嵌在链接里。\n\n对生产数据的访问受到限制并被记录，数据在传输中加密，备份受到保护。没有绝对安全的系统，但我们的设计原则很简单：你的出生数据存在的地方越少，它就越安全。",
        },
      },
      {
        heading: { en: "5. AI processing and international transfer", zh: "五、AI 处理与跨境传输" },
        body: {
          en: "Interpretations are written by an external AI language-model provider — currently DeepSeek. When you request an interpretation, we send that provider a minimized package of reading data: the calculated chart facts (for example, card names and positions, sign placements, pillar characters) and a sanitized version of your question. Before anything is sent, we strip what the AI does not need: your name, email address, exact birth coordinates and place name, and any journal content you have not explicitly opted in to sharing are never included.\n\nThe AI provider may process and store the data it receives on servers located in the People's Republic of China, and its own terms and privacy policy also apply to that processing. Because your question text is sent to the provider, please do not include highly sensitive details (medical records, financial account numbers, government ID numbers) in questions. If we change AI providers, this policy and the provider named on each reading's calculation-details panel will be updated.",
          zh: "解读文字由外部 AI 大语言模型服务商生成——当前为 DeepSeek（深度求索）。当你请求生成解读时，我们向该服务商发送一份经最小化处理的解读数据包：已计算完成的命盘事实（例如牌名与牌位、星座落位、干支字符），以及经过脱敏处理的问题文本。在发送之前，我们会剔除 AI 不需要的信息：你的姓名、邮箱、精确出生坐标与地名，以及任何未经你明确选择共享的手记内容，一律不会包含在内。\n\n该 AI 服务商可能在位于中华人民共和国境内的服务器上处理并存储其接收到的数据，其自身的条款与隐私政策亦适用于该等处理。由于你的问题文本会被发送给服务商，请勿在问题中包含高度敏感的信息（病历、金融账号、证件号码等）。若我们更换 AI 服务商，本政策以及每份解读“计算信息”面板上标注的服务商名称都会同步更新。",
        },
      },
      {
        heading: { en: "6. Cookies", zh: "六、Cookie" },
        body: {
          en: "We use a small set of essential cookies: a session cookie to keep you signed in, a locale cookie to remember your language, and a daily-card cookie so your daily draw stays the same all day. We set no third-party advertising cookies. Details, lifetimes, and your choices are described in the Cookie Policy.",
          zh: "我们只使用少量必要 Cookie：用于保持登录状态的会话 Cookie、用于记住语言的地区 Cookie，以及让“每日一牌”当天保持不变的 Cookie。我们不设置任何第三方广告 Cookie。具体名称、有效期与你的选择详见《Cookie 政策》。",
        },
      },
      {
        heading: { en: "7. Retention and deletion", zh: "七、保留与删除" },
        body: {
          en: "We keep your data while your account is active. Readings and journal entries stay until you delete them or your account. When you delete your account, profiles, readings, journal entries, and personal data are removed; order records that accounting and tax law require us to keep are retained in anonymized form, and short-lived security logs expire on their own schedule. Backup copies are purged in the normal backup rotation.\n\nIf the AI provider retains copies of data previously sent for interpretation, that retention is governed by its policy; our minimization rules exist precisely so that such copies contain as little about you as possible.",
          zh: "在你的账户存续期间我们保留你的数据。解读与手记会一直保存，直到你删除它们或注销账户。注销账户时，档案、解读、手记与个人数据都会被删除；会计与税法要求保留的订单记录将以匿名化形式留存，短期安全日志按其自身周期过期。备份副本会在正常的备份轮换中清除。\n\n若 AI 服务商留存了此前为生成解读而发送的数据副本，该留存受其政策约束；我们的最小化规则正是为了让这类副本中关于你的信息尽可能少。",
        },
      },
      {
        heading: { en: "8. Your rights and contact", zh: "八、你的权利与联系方式" },
        body: {
          en: "Depending on where you live, you may have rights to access, correct, export, restrict, object to, or delete your personal data, and to complain to a supervisory authority. In this Service the two most important rights are built in as buttons: Export my data and Delete account, both in account settings, no email required. For anything else — or if you prefer to exercise rights by email — write to " +
            CONTACT +
            " and we will respond within the time required by applicable law.\n\nIf we ever materially change this policy, we will notify you before the change takes effect.",
          zh: "视你所在地的法律，你可能享有访问、更正、导出、限制处理、反对处理或删除个人数据的权利，以及向监管机构投诉的权利。在本服务中，最重要的两项权利已直接做成按钮：账户设置中的“导出我的数据”与“注销账户”，无需发送邮件。其他请求——或你更希望通过邮件行使权利时——请写信至 " +
            CONTACT +
            "，我们将在适用法律要求的期限内回复。\n\n若本政策发生重大变更，我们会在生效前通知你。",
        },
      },
    ],
  },

  // ---------------------------------------------------------------- cookies
  {
    slug: "cookies",
    title: { en: "Cookie Policy", zh: "Cookie 政策" },
    updated: UPDATED,
    sections: [
      {
        heading: { en: "1. Our approach to cookies", zh: "一、我们对 Cookie 的态度" },
        body: {
          en: "Cookies are small text files a website stores in your browser. Many sites use dozens of them for tracking and advertising; we deliberately do not. The Service sets only the essential cookies it needs to function, described below, and nothing else.",
          zh: "Cookie 是网站存储在你浏览器中的小型文本文件。许多网站会为追踪与广告目的设置几十个 Cookie；我们刻意不这样做。本服务只设置维持运行所必需的少量 Cookie（见下文），除此之外没有别的。",
        },
      },
      {
        heading: { en: "2. Essential cookies we set", zh: "二、我们设置的必要 Cookie" },
        body: {
          en: "Session cookie — keeps you signed in to your account between pages and visits. Set when you sign in; expires when the session ends or you sign out.\n\nLocale cookie — remembers whether you prefer English or Chinese so the Service opens in your language. Set when you pick a language; kept for up to one year.\n\nDaily-card cookie — remembers today's daily draw so the same card greets you all day instead of reshuffling on every visit. Expires at the end of the day. None of these cookies contain birth data, questions, readings, or any personal details beyond what is technically needed for their purpose.",
          zh: "会话 Cookie——在页面之间与多次访问之间保持你的登录状态。登录时设置；会话结束或你退出登录时失效。\n\n语言 Cookie——记住你偏好中文还是英文，让本服务以你的语言打开。选择语言时设置；最长保留一年。\n\n每日一牌 Cookie——记住你今天抽到的牌，让同一张牌陪你一整天，而不是每次访问都重新洗牌。当天结束时失效。以上 Cookie 均不包含出生数据、问题、解读内容，也不包含超出其技术用途所需的任何个人信息。",
        },
      },
      {
        heading: { en: "3. No advertising or third-party cookies", zh: "三、没有广告或第三方 Cookie" },
        body: {
          en: "We set no third-party advertising cookies, no cross-site tracking cookies, and no social-media pixels. Our payment processor may set its own strictly necessary cookies on its checkout pages; those are governed by its policy.",
          zh: "我们不设置任何第三方广告 Cookie、跨站追踪 Cookie 或社交媒体像素。支付处理商可能在其结算页面设置其自身严格必要的 Cookie，该等 Cookie 受其政策约束。",
        },
      },
      {
        heading: { en: "4. Analytics — only if enabled, and never with birth data", zh: "四、统计分析——仅在启用后，且绝不涉及出生数据" },
        body: {
          en: "The Service currently runs without analytics cookies. If we later enable privacy-respecting analytics to understand aggregate usage, we will update this policy first, ask for consent where the law requires it, and follow one absolute rule: birth data, questions, readings, and journal content are never sent to analytics — only anonymous, aggregate usage events would be.",
          zh: "本服务目前不使用任何统计分析 Cookie。若我们将来启用尊重隐私的统计工具来了解整体使用情况，我们会先更新本政策，在法律要求的地区征求你的同意，并遵守一条铁律：出生数据、问题、解读与手记内容永远不会发送给统计工具——只会有匿名的聚合使用事件。",
        },
      },
      {
        heading: { en: "5. Your choices", zh: "五、你的选择" },
        body: {
          en: "You can delete or block cookies in your browser settings at any time. Because every cookie we set is essential, blocking them has direct effects: without the session cookie you cannot stay signed in, and without the locale cookie the Service may not remember your language. Questions about this policy: " +
            CONTACT +
            ".",
          zh: "你可以随时在浏览器设置中删除或屏蔽 Cookie。由于我们设置的每一个 Cookie 都是必要的，屏蔽它们会产生直接影响：没有会话 Cookie 就无法保持登录，没有语言 Cookie 本服务可能记不住你的语言偏好。有关本政策的问题请联系：" +
            CONTACT +
            "。",
        },
      },
    ],
  },

  // ---------------------------------------------------------------- subscriptions
  {
    slug: "subscriptions",
    title: { en: "Subscription Terms", zh: "订阅条款" },
    updated: UPDATED,
    sections: [
      {
        heading: { en: "1. Plans and pricing", zh: "一、方案与价格" },
        body: {
          en: "The free plan includes the daily card, basic charts and pillars, and a small number of sample interpretations. Premium is currently offered at US$8.99 per month or US$59.99 per year; the exact price, currency, and any applicable taxes are always shown at checkout before you pay, and the checkout price is the one that applies. One-time deep reports are priced individually and are covered by the Refund Policy rather than by renewal terms.",
          zh: "免费方案包含每日一牌、基础星盘与命盘，以及少量示例解读。高级会员目前定价为每月 8.99 美元或每年 59.99 美元；确切价格、币种及可能适用的税费都会在付款前的结算页明确展示，并以结算页显示的价格为准。单次深度报告单独定价，适用《退款政策》而非续费条款。",
        },
      },
      {
        heading: { en: "2. Automatic renewal", zh: "二、自动续费" },
        body: {
          en: "Subscriptions renew automatically at the end of each billing period — monthly plans each month, annual plans each year — using your payment method on file, until you cancel. The renewal price is the price of your plan at the time of renewal (see section 6 on price changes). We state this before you subscribe, and your receipt repeats it.",
          zh: "订阅在每个计费周期结束时自动续费——月度方案按月、年度方案按年——从你留存的支付方式中扣款，直至你取消。续费价格为续费时你所在方案的价格（价格调整见第六条）。我们会在你订阅前明确说明这一点，收据中也会再次注明。",
        },
      },
      {
        heading: { en: "3. How to cancel", zh: "三、如何取消" },
        body: {
          en: "You can cancel online at any time from your account's subscription page — no phone call, no chat with an agent, no retention hoops. Cancellation takes effect at the end of the current paid period: you keep full Premium access until that date, and you are simply not charged again. You can also resume an already-cancelled subscription before the period ends if you change your mind.",
          zh: "你可以随时在账户的订阅页面在线取消——不需要打电话，不需要联系客服，也没有任何挽留关卡。取消自当前已付费周期结束时生效：在此之前你继续享有完整的高级会员权益，之后不再产生任何扣费。若你改变主意，也可以在周期结束前恢复已取消的订阅。",
        },
      },
      {
        heading: { en: "4. Failed payments and grace period", zh: "四、扣款失败与宽限期" },
        body: {
          en: "If a renewal charge fails, we retry and email you so you can update your payment method. Your Premium access continues during a grace period of 7 days from the failed charge. If payment still cannot be completed by the end of the grace period, the subscription ends and the account is downgraded to the free plan — your data, readings, and journal are not deleted, and you can resubscribe at any time.",
          zh: "若续费扣款失败，我们会重试并发送邮件提醒你更新支付方式。自扣款失败起 7 天为宽限期，期间你的高级会员权益不受影响。若宽限期结束时仍未能完成支付，订阅即告结束，账户降级为免费方案——你的数据、解读与手记不会被删除，你也可以随时重新订阅。",
        },
      },
      {
        heading: { en: "5. Monthly interpretation credits", zh: "五、每月解读额度" },
        body: {
          en: "Some Premium features are metered by monthly interpretation credits. Credits refresh at the start of each billing period, and unused credits expire at the end of that period — they do not roll over or convert to cash. We disclose this here and on the pricing page so it is never a surprise. Deterministic calculations (charts, pillars, draws) are not metered; credits apply only to AI-written interpretations.",
          zh: "部分高级功能按每月解读额度计量。额度在每个计费周期开始时刷新，当期未用完的额度在周期结束时过期作废——不结转、不折现。我们在此处与价格页均作出披露，确保这一点绝不成为“意外”。确定性计算（排盘、四柱、抽牌）不消耗额度；额度仅用于由 AI 撰写的解读。",
        },
      },
      {
        heading: { en: "6. Price changes", zh: "六、价格调整" },
        body: {
          en: "If we change subscription prices, the new price applies to you only from your next renewal after we have given you at least 30 days' advance notice by email. If you do not agree with a new price, cancel before the renewal date and you will not be charged it. Price changes never apply retroactively to a period you have already paid for.",
          zh: "若我们调整订阅价格，新价格仅在我们通过邮件提前至少 30 天通知你之后的下一次续费时才对你生效。若你不接受新价格，在续费日前取消即可，不会按新价格扣费。价格调整绝不追溯适用于你已付费的周期。",
        },
      },
      {
        heading: { en: "7. Questions", zh: "七、咨询" },
        body: {
          en: "These terms work together with the Terms of Service and the Refund Policy. If anything about billing is unclear, or a charge looks wrong, contact " +
            CONTACT +
            " and we will sort it out.",
          zh: "本条款与《服务条款》《退款政策》共同适用。若你对计费有任何疑问，或发现某笔扣款看起来有误，请联系 " +
            CONTACT +
            "，我们会为你处理。",
        },
      },
    ],
  },

  // ---------------------------------------------------------------- refunds
  {
    slug: "refunds",
    title: { en: "Refund Policy", zh: "退款政策" },
    updated: UPDATED,
    sections: [
      {
        heading: { en: "1. Our approach", zh: "一、基本原则" },
        body: {
          en: "The rule we design by: you should never pay for something you did not receive. Technical failures are our problem, not yours, and are always made right. Because interpretations are symbolic and subjective, disagreement with a reading's content works differently from a technical failure — both cases are set out plainly below.",
          zh: "我们的设计原则是：你绝不应为没有收到的东西付钱。技术故障是我们的问题，不是你的问题，且必定得到弥补。由于解读内容具有象征性与主观性，“不认同解读内容”与“技术故障”适用不同的规则——两种情形都在下文写明。",
        },
      },
      {
        heading: { en: "2. Failed generation: regenerate or full refund", zh: "二、生成失败：重新生成或全额退款" },
        body: {
          en: "If you paid for an interpretation or report and it could not be generated — the request errored, timed out, or produced nothing usable — you may choose either a free regeneration or a full refund of that purchase. The retry itself never costs extra. If regeneration fails again and you prefer the refund, we issue it without further questions.",
          zh: "若你付费购买的解读或报告未能生成——请求出错、超时或未产出可用内容——你可以选择免费重新生成，或就该笔购买获得全额退款。重试本身永不额外收费。若重新生成再次失败而你希望退款，我们将直接退款，不再多问。",
        },
      },
      {
        heading: { en: "3. Duplicate or erroneous charges", zh: "三、重复或错误扣款" },
        body: {
          en: "If you were charged twice for the same item, or charged an amount that does not match the checkout price, tell us and we will refund the duplicate or the difference in full once we confirm it in the payment records — normally within a few business days.",
          zh: "若同一项目被扣款两次，或扣款金额与结算页价格不符，请告知我们；经支付记录核实后，我们将全额退还重复款项或差额，通常在几个工作日内完成。",
        },
      },
      {
        heading: { en: "4. Dissatisfaction with symbolic content", zh: "四、对象征性内容不满意" },
        body: {
          en: "A reading that generated successfully but did not resonate with you is not automatically refundable: interpretations of cards, charts, and pillars are inherently subjective, and the purchase pays for the generation, not for agreement. That said, we review every such request individually — if the output was clearly defective (wrong language, empty sections, content unrelated to your reading data), we treat it as a failed generation under section 2 and refund or regenerate.\n\nSubscription periods already used are generally not refundable, except where section 5 or mandatory local law applies.",
          zh: "解读已成功生成、但内容未能引起你的共鸣，并不自动构成退款理由：对牌面、星盘与四柱的诠释本质上是主观的，付费购买的是“生成”本身，而非“认同”。尽管如此，我们会逐一审阅每一件此类请求——若产出明显存在缺陷（语言错误、章节缺失、内容与你的解读数据无关），我们将按第二条视作生成失败处理，予以退款或重新生成。\n\n已使用的订阅周期原则上不予退款，第五条或当地强制性法律另有规定的除外。",
        },
      },
      {
        heading: { en: "5. EU/UK 14-day right of withdrawal", zh: "五、欧盟/英国的 14 天撤回权" },
        body: {
          en: "If you are in the EU or UK, you normally have a 14-day right of withdrawal for online purchases. For digital content delivered instantly — such as an interpretation generated the moment you buy it — the law allows this right to be waived: at checkout you give express consent to immediate delivery and acknowledge that the right of withdrawal is lost once delivery begins. We record that consent. For subscriptions, you may withdraw within 14 days of first subscribing and receive a refund reduced proportionally by any metered usage already consumed, where required by law.",
          zh: "若你位于欧盟或英国，你通常对线上购买享有 14 天撤回权。对于即时交付的数字内容——例如在你购买当下即生成的解读——法律允许放弃该权利：你会在结算页明确同意立即交付，并确认交付开始后撤回权即告丧失。我们会留存该同意记录。对于订阅，在法律要求的范围内，你可以在首次订阅后 14 天内撤回，退款金额按已消耗的计量使用量作相应扣减。",
        },
      },
      {
        heading: { en: "6. How to request a refund", zh: "六、如何申请退款" },
        body: {
          en: "Write to " +
            CONTACT +
            " from the email on your account, or use the support link in account settings, and include the order reference from your receipt. We confirm receipt of every request, decide within 5 business days, and refunds go back to the original payment method — banks then typically take 5–10 business days to show it. Statutory rights that give you more than this policy always prevail.",
          zh: "请使用账户绑定的邮箱写信至 " +
            CONTACT +
            "，或通过账户设置中的支持入口提交，并附上收据中的订单编号。每一件申请我们都会确认收到，并在 5 个工作日内作出决定；退款将原路退回至原支付方式——银行通常还需 5–10 个工作日入账。若法定权利给予你比本政策更多的保障，以法定权利为准。",
        },
      },
    ],
  },

  // ---------------------------------------------------------------- disclaimer
  {
    slug: "disclaimer",
    title: { en: "Disclaimer", zh: "免责声明" },
    updated: UPDATED,
    sections: [
      {
        heading: { en: "1. General disclaimer", zh: "一、总则" },
        body: {
          en: "Tarot, astrology, BaZi, horoscopes, compatibility readings, and related services are intended for entertainment, cultural exploration, and personal reflection. They are not medical, psychological, legal, financial, or emergency services and do not guarantee future outcomes.\n\nThis wording applies to every reading, interpretation, article, and report in the Service, whether or not it is repeated on a given page.",
          zh: "塔罗、占星、八字、星座运势、合盘及相关服务仅用于娱乐、文化探索与个人反思，不构成医疗、心理、法律、财务或紧急服务，亦不保证任何未来结果。\n\n上述表述适用于本服务中的每一次解读、每一篇文章与每一份报告，无论具体页面是否重复展示。",
        },
      },
      {
        heading: { en: "2. Not professional advice", zh: "二、不构成专业建议" },
        body: {
          en: "Nothing in the Service is medical, psychological, legal, financial, tax, or other professional advice, and nothing here creates a professional–client relationship. Decisions about your health, mental health, money, legal matters, or relationships deserve a qualified human professional who can hear your full situation. A reading may be a good place to gather your thoughts before such a conversation — it is never a substitute for it.",
          zh: "本服务中的任何内容均不构成医疗、心理、法律、财务、税务或其他专业建议，也不建立任何专业服务关系。关于身体、心理、金钱、法律事务或人际关系的决定，值得交给能够完整了解你处境的合格专业人士。一次解读或许适合用来在这样的谈话之前整理思绪——但它永远不能替代那次谈话。",
        },
      },
      {
        heading: { en: "3. Not an emergency service — crisis resources", zh: "三、不是紧急服务——危机资源" },
        body: {
          en: "The Service cannot help in an emergency. If you are in danger, experiencing a medical emergency, or having thoughts of harming yourself or others, please stop and contact local emergency services now. In the US you can call or text 988 (Suicide & Crisis Lifeline); elsewhere, your local emergency number or crisis hotline is the right first call. Talking with someone you trust or a mental-health professional can genuinely help — and it is a different kind of help than any reading can offer.",
          zh: "本服务无法在紧急情况下提供帮助。若你正处于危险之中、遭遇医疗紧急状况，或出现伤害自己或他人的念头，请立即停下并联系当地的紧急服务。在中国大陆可拨打 120（急救）或当地心理援助热线；其他地区请拨打当地紧急电话或危机热线。与你信任的人或心理健康专业人士聊聊会有真正的帮助——那是任何解读都无法提供的另一种帮助。",
        },
      },
      {
        heading: { en: "4. No guaranteed outcomes", zh: "四、不保证任何结果" },
        body: {
          en: "Cards, charts, and pillars are symbolic systems. They can offer language, perspective, and questions worth sitting with; they cannot know or fix the future, and they have no scientific validation as predictive instruments. We intentionally write interpretations in reflective language — may, might, consider — because that honesty is a feature of the Service, not a hedge. Any decision you make after a reading remains your decision.",
          zh: "牌面、星盘与四柱都是象征体系。它们可以提供语言、视角与值得琢磨的问题；它们无法得知或锁定未来，作为预测工具也没有科学验证。我们刻意用反思性的语言撰写解读——“可能”“或许”“不妨”——这份诚实是本服务的特性，而非托辞。你在解读之后作出的任何决定，仍然是你自己的决定。",
        },
      },
      {
        heading: { en: "5. AI-generated content", zh: "五、AI 生成内容" },
        body: {
          en: "Interpretation texts are written by an AI language model from your calculated reading data, as described in the AI Disclosure. AI output can contain mistakes, awkward phrasings, or statements that read more confidently than they deserve. The calculated facts (cards, positions, pillars) are deterministic and verifiable; the prose around them is generated language and should be read as reflection material, not as authority.",
          zh: "解读文字由 AI 语言模型基于你的既定计算数据生成，详见《AI 使用披露》。AI 产出可能包含错误、生硬的措辞，或听起来比实际更笃定的表述。计算事实（牌、星位、四柱）是确定且可验证的；围绕它们的文字则是生成的语言，应当作反思材料来读，而不是权威结论。",
        },
      },
      {
        heading: { en: "6. Your judgment comes first", zh: "六、你的判断始终优先" },
        body: {
          en: "Use the Service as a mirror, not a compass that steers itself. If a reading conflicts with your own good sense, the advice of professionals, or the people who know your situation, trust those first. Questions about this disclaimer: " +
            CONTACT +
            ".",
          zh: "请把本服务当作一面镜子，而不是一只会自己转动的罗盘。若某次解读与你自己的清醒判断、专业人士的意见或了解你处境之人的建议相冲突，请优先相信后者。有关本声明的问题请联系：" +
            CONTACT +
            "。",
        },
      },
    ],
  },

  // ---------------------------------------------------------------- ai-disclosure
  {
    slug: "ai-disclosure",
    title: { en: "AI Disclosure", zh: "AI 使用披露" },
    updated: UPDATED,
    sections: [
      {
        heading: { en: "1. The short version", zh: "一、一句话说明" },
        body: {
          en: "Deterministic software calculates everything; AI only writes. Every card you draw, every degree in your chart, and every pillar in your BaZi is computed by conventional, verifiable engines. An AI language model then turns those already-settled facts into readable prose. The AI never decides what your reading is — only how it is worded.",
          zh: "确定性的软件负责一切计算；AI 只负责写字。你抽到的每一张牌、星盘上的每一度、八字里的每一柱，都由常规且可验证的引擎计算得出。AI 语言模型随后把这些已经落定的事实转写成可读的文字。AI 从不决定你的解读“是什么”——只决定它“怎么说”。",
        },
      },
      {
        heading: { en: "2. What the deterministic engines do", zh: "二、确定性引擎做什么" },
        body: {
          en: "Card draws use a cryptographically secure shuffle: which cards appear, in which positions, upright or reversed, is fixed the moment you draw. Astrological positions are computed astronomically from your birth data, and BaZi pillars are derived from traditional calendar arithmetic with solar-term boundaries. The same inputs always produce the same chart, and the Methodology page documents each engine, version, and rule.",
          zh: "抽牌使用密码学安全的洗牌机制：哪些牌出现、落在哪个牌位、正位还是逆位，在你抽牌的那一刻即已确定。星盘位置依据你的出生数据以天文方法计算；八字四柱由传统历法运算并以节气为界推得。相同的输入永远得到相同的盘；“计算方法”页面记录了每个引擎、版本与规则。",
        },
      },
      {
        heading: { en: "3. What the AI does", zh: "三、AI 做什么" },
        body: {
          en: "After the engines finish, a structured summary of the results — card names and positions, sign placements, pillar characters, plus a sanitized version of your question — is sent to an AI language model, which composes the interpretation you read: the themes, the reflection question, the suggested small action. It is interpretation-only: a writer working strictly from the fact sheet it is handed.",
          zh: "引擎计算完成后，一份结构化的结果摘要——牌名与牌位、星座落位、四柱干支，以及经脱敏处理的问题——会被发送给 AI 语言模型，由它撰写你读到的解读：主题、反思提问、建议的小行动。它只做解读：像一位严格依据手头事实清单写作的作者。",
        },
      },
      {
        heading: { en: "4. What the AI never does", zh: "四、AI 绝不做什么" },
        body: {
          en: "The AI never draws or selects cards, never computes or alters a planetary position, house, or pillar, and never adds placements the engines did not produce. It has no influence over randomness or calculation, and no interpretation can change your underlying reading data. If the engines did not calculate something, the interpretation cannot legitimately mention it.",
          zh: "AI 从不抽牌或选牌；从不计算或改动任何行星位置、宫位或干支；也从不添加引擎没有算出的配置。它对随机性与计算过程没有任何影响，任何解读也无法改变你底层的解读数据。凡引擎没有算出的东西，解读中就不应出现。",
        },
      },
      {
        heading: { en: "5. Accuracy and limitations", zh: "五、准确性与局限" },
        body: {
          en: "AI-written text can contain mistakes: an occasional factual slip, an over-confident sentence, a metaphor that misses. Interpretations are offered for reflection and entertainment, not as authority, and each one carries a disclosure notice. If an interpretation contradicts the calculated data shown alongside it, trust the data — and feel free to regenerate or report the reading.",
          zh: "AI 撰写的文字可能出错：偶尔的事实疏漏、过于笃定的句子、不贴切的比喻。解读仅供反思与娱乐，不构成权威结论，且每份解读都附有披露说明。若解读与旁边展示的计算数据相矛盾，请以数据为准——你也可以重新生成或向我们反馈该次解读。",
        },
      },
      {
        heading: { en: "6. Demo and sample content", zh: "六、演示与示例内容" },
        body: {
          en: "In demo or development modes, or before the AI interpretation service is connected, the Service may show mock or sample interpretations. These are always labeled as sample content on their face — sample text is never passed off as a live AI interpretation, and live AI text is never labeled as a sample.",
          zh: "在演示或开发模式下，或在 AI 解读服务接入之前，本服务可能展示模拟或示例解读。此类内容一律在页面上明确标注为示例——示例文字绝不冒充实时 AI 解读，实时 AI 文字也绝不标注为示例。",
        },
      },
      {
        heading: { en: "7. Which model wrote this, and what it saw", zh: "七、是哪个模型写的、它看到了什么" },
        body: {
          en: "Every AI-written result includes a calculation-details panel that names, at runtime, the actual provider and model that generated it (currently a DeepSeek model), together with the engines and methodology versions used for the calculations. What data is sent to the provider, how it is minimized first, and where it may be processed and stored are described in the Privacy Policy. Questions: " +
            CONTACT +
            ".",
          zh: "每一份由 AI 撰写的结果都带有“计算信息”面板，实时标明生成该结果的实际服务商与模型（当前为 DeepSeek 的模型），以及计算所用的引擎与方法版本。发送给服务商的数据范围、发送前的最小化处理方式，以及数据可能在何处被处理和存储，详见《隐私政策》。如有疑问请联系：" +
            CONTACT +
            "。",
        },
      },
    ],
  },
];

export function getLegalDoc(slug: string): LegalDoc | undefined {
  return LEGAL_DOCS.find((d) => d.slug === slug);
}
