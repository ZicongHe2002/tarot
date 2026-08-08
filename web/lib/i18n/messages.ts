import type { Locale } from "../config";

export interface Msg {
  en: string;
  zh: string;
}

export function t(msg: Msg, locale: Locale): string {
  return msg[locale];
}

export const M = {
  // ---------- Common ----------
  skipToContent: { en: "Skip to main content", zh: "跳转到正文" },
  loading: { en: "Loading…", zh: "加载中…" },
  save: { en: "Save", zh: "保存" },
  cancel: { en: "Cancel", zh: "取消" },
  delete: { en: "Delete", zh: "删除" },
  edit: { en: "Edit", zh: "编辑" },
  back: { en: "Back", zh: "返回" },
  next: { en: "Next", zh: "下一步" },
  confirm: { en: "Confirm", zh: "确认" },
  retry: { en: "Try again", zh: "重试" },
  optional: { en: "optional", zh: "可选" },
  signIn: { en: "Sign in", zh: "登录" },
  signOut: { en: "Sign out", zh: "退出登录" },
  errorGeneric: {
    en: "Something went wrong. Nothing was charged. Please try again.",
    zh: "出现了一点问题，未产生任何扣费，请重试。",
  },

  // ---------- Nav ----------
  navTarot: { en: "Tarot", zh: "塔罗" },
  navAstrology: { en: "Astrology", zh: "占星" },
  navBazi: { en: "BaZi", zh: "八字" },
  navDaily: { en: "Daily Guidance", zh: "每日指引" },
  navCompatibility: { en: "Compatibility", zh: "合盘配对" },
  navJournal: { en: "Journal", zh: "手记" },
  navLearn: { en: "Learn", zh: "学习" },
  navPricing: { en: "Pricing", zh: "价格" },
  navAccount: { en: "Account", zh: "账户" },
  themeToggle: { en: "Toggle dark mode", zh: "切换深色模式" },
  localeSwitch: { en: "切换到中文", zh: "Switch to English" },

  // ---------- Home (spec §5) ----------
  heroTitle: {
    en: "Discover Yourself Through Tarot, Astrology, and BaZi",
    zh: "透过塔罗、占星与八字，看见更完整的自己",
  },
  heroSub: {
    en: "Explore your daily themes, relationships, strengths, and life patterns through three complementary traditions.",
    zh: "以三种互补的传统，探索你的每日主题、人际关系、优势与人生节奏。",
  },
  ctaCreateProfile: { en: "Create My Free Profile", zh: "免费创建我的档案" },
  ctaDrawCard: { en: "Draw a Tarot Card", zh: "抽一张塔罗牌" },
  ctaBirthChart: { en: "Calculate My Birth Chart", zh: "排我的本命星盘" },
  ctaExploreBazi: { en: "Explore My BaZi", zh: "查看我的八字" },
  homeToolsTitle: { en: "Three traditions, one place", zh: "三种传统，一处安放" },
  homeTarotCard: {
    en: "Draw with a secure shuffle and sit with what surfaces — daily cards, spreads, and gentle questions.",
    zh: "安全洗牌抽取，与浮现的讯息安静相处——每日一牌、经典牌阵与温和的提问。",
  },
  homeAstroCard: {
    en: "Your chart, calculated astronomically to the degree — signs, houses, aspects, and current transits.",
    zh: "以天文精度逐度计算你的星盘——星座、宫位、相位与当下行运。",
  },
  homeBaziCard: {
    en: "Four Pillars from the traditional calendar — Day Master, elements, and ten-year luck cycles.",
    zh: "依传统历法排出四柱——日主、五行与十年大运。",
  },
  homeProfileTitle: { en: "One profile powers everything", zh: "一份档案，贯通全部" },
  homeProfileBody: {
    en: "Enter your birth details once. Every tool reads from the same verified calculation — nothing re-typed, nothing invented.",
    zh: "只需录入一次出生信息，所有工具共用同一套核验过的计算结果——无需重复填写，也绝不凭空捏造。",
  },
  homeDailyTitle: { en: "Guidance that meets your morning", zh: "在清晨等你的每日指引" },
  homeDailyBody: {
    en: "A short daily synthesis across your chart, your pillars, and a drawn card — with one practical action, never a doom forecast.",
    zh: "结合星盘、命盘与当日抽牌的简短综合指引，附一件可执行的小事——不贩卖焦虑，不预言灾祸。",
  },
  homeWhyBaziTitle: { en: "Why BaZi is different", zh: "八字为何与众不同" },
  homeWhyBaziBody: {
    en: "Western astrology maps the sky at your birth; BaZi maps time itself — your birth moment expressed in the traditional Chinese calendar's stems and branches. One reads planets, the other reads cycles. Together they offer parallax: two angles on the same life.",
    zh: "西方占星描绘你出生时的星空，八字则描绘时间本身——以天干地支表达你的出生时刻。一个读行星，一个读节律。两者相互参照，为同一段人生提供不同的视角。",
  },
  homeCompatTitle: { en: "Compatibility, kindly told", zh: "温和道来的契合度" },
  homeCompatBody: {
    en: "Compare two charts across communication, values, and daily rhythm. No verdicts, no blame — just patterns worth talking about.",
    zh: "从沟通、价值观到生活节奏，比对两张命盘。不下判决、不指责——只呈现值得聊聊的相处模式。",
  },
  homeJournalTitle: { en: "A private journal, by default", zh: "默认私密的个人手记" },
  homeJournalBody: {
    en: "Save readings, add notes and moods, watch themes repeat. Private by default; AI never reads your journal unless you explicitly allow it.",
    zh: "保存解读、记录心情与笔记，观察反复出现的主题。默认完全私密；除非你明确允许，AI 不会读取你的手记。",
  },
  homeMethodTitle: { en: "How we keep it honest", zh: "我们如何保持诚实" },
  homeMethodBody: {
    en: "Deterministic engines calculate every card, degree, and pillar. AI only turns those calculated facts into language — it never draws a card or invents a placement. Every result shows its engine and version.",
    zh: "每一张牌、每一度、每一柱都由确定性引擎计算完成。AI 只负责把这些计算事实转成语言——绝不抽牌，也绝不虚构星位。每份结果都标明所用引擎与版本。",
  },
  homeLearnTitle: { en: "Learn the traditions", zh: "认识这些传统" },
  homePricingTitle: { en: "Simple, honest pricing", zh: "简单诚实的价格" },

  // ---------- Disclaimers & disclosures (md §15, spec §12) ----------
  disclaimerGeneral: {
    en: "Tarot, astrology, BaZi, horoscopes, compatibility readings, and related services are intended for entertainment, cultural exploration, and personal reflection. They are not medical, psychological, legal, financial, or emergency services and do not guarantee future outcomes.",
    zh: "塔罗、占星、八字、星座运势、合盘及相关服务仅用于娱乐、文化探索与个人反思，不构成医疗、心理、法律、财务或紧急服务，亦不保证任何未来结果。",
  },
  disclosureAi: {
    en: "This interpretation was generated by AI from structured reading data. The AI did not calculate the chart or draw the cards. AI output may contain mistakes and is intended for reflection and entertainment.",
    zh: "本解读由 AI 基于结构化数据生成。AI 未参与排盘或抽牌。AI 内容可能存在错误，仅供反思与娱乐参考。",
  },
  disclosureDailySynthesis: {
    en: "This combined guidance is a reflective synthesis of multiple traditions, not a scientific probability or guaranteed prediction.",
    zh: "这份综合指引是对多种传统的反思性整合，不是科学概率，也不是对未来的保证。",
  },
  disclosureDemoCalc: {
    en: "Sample interpretation — connect the AI interpretation service before production.",
    zh: "示例解读——正式上线前请接入 AI 解读服务。",
  },
  aiInputNotice: {
    en: "Your reading will be generated by AI from calculated reading data. Do not include medical records, financial account details, government ID numbers, or other highly sensitive information in your question.",
    zh: "你的解读将由 AI 基于计算数据生成。请勿在问题中包含病历、金融账户、证件号码等高度敏感信息。",
  },
  unknownTimeNotice: {
    en: "Without an exact birth time we do not calculate the Ascendant, houses, or the BaZi Hour Pillar — readings note this instead of guessing.",
    zh: "缺少确切出生时间时，我们不会计算上升点、宫位或八字时柱——解读会如实说明，而不是猜测。",
  },
  crisisNotice: {
    en: "It sounds like you may be going through something serious. A reading is not the right tool for this moment. If you are in danger or thinking about harming yourself, please contact local emergency services, or in the US call or text 988. Speaking with someone you trust or a professional can help.",
    zh: "听起来你可能正在经历一段艰难的时刻。此刻，占卜并不是合适的工具。如果你处于危险之中或有伤害自己的念头，请联系当地的紧急服务，或拨打当地心理援助热线。与信任的人或专业人士聊聊，会有帮助。",
  },

  // ---------- Tarot ----------
  tarotTitle: { en: "Tarot readings", zh: "塔罗解读" },
  tarotIntro: {
    en: "A secure shuffle, a moment of quiet, and a card that gives your thoughts somewhere to land.",
    zh: "一次安全的洗牌，一刻安静，一张让思绪落地的牌。",
  },
  tarotDaily: { en: "Daily Card", zh: "每日一牌" },
  tarotOneCard: { en: "One Card", zh: "单牌解读" },
  tarotThreeCard: { en: "Past · Present · Future", zh: "过去 · 现在 · 未来" },
  tarotYesNo: { en: "Yes / No Reflection", zh: "是否之问" },
  tarotLibrary: { en: "Card Library", zh: "牌意图书馆" },
  tarotTopicLabel: { en: "What area is on your mind?", zh: "你在想哪方面的事？" },
  tarotQuestionLabel: { en: "Your question (optional)", zh: "你的问题（可选）" },
  tarotQuestionPlaceholder: {
    en: "e.g. How should I approach the change I'm considering?",
    zh: "例如：我该如何看待正在考虑的这个改变？",
  },
  tarotCentering: {
    en: "Take one slow breath. Hold your question lightly — curiosity works better than urgency.",
    zh: "深呼吸一次。轻轻地怀着你的问题——好奇比急切更有用。",
  },
  tarotShuffle: { en: "Shuffle & draw", zh: "洗牌抽取" },
  tarotReveal: { en: "Reveal", zh: "翻开" },
  tarotUpright: { en: "Upright", zh: "正位" },
  tarotReversed: { en: "Reversed", zh: "逆位" },
  tarotYesNoNote: {
    en: "A yes/no draw reflects your own situation and mindset. It cannot know or predict what another person will do.",
    zh: "是否之问映照的是你自身的处境与心态，它无法得知或预测他人会怎么做。",
  },
  topicLove: { en: "Love & relationships", zh: "感情与关系" },
  topicCareer: { en: "Career & work", zh: "事业与工作" },
  topicGrowth: { en: "Personal growth", zh: "个人成长" },
  topicGeneral: { en: "General reflection", zh: "综合反思" },
  saveToJournal: { en: "Save to journal", zh: "保存到手记" },
  savedToJournal: { en: "Saved to your journal", zh: "已保存到手记" },
  interpretationHeading: { en: "Interpretation", zh: "解读" },
  reflectionHeading: { en: "A question to sit with", zh: "值得琢磨的问题" },
  actionHeading: { en: "One small action", zh: "一件小事" },
  limitationsHeading: { en: "Limitations", zh: "局限说明" },
  generating: { en: "Interpreting your reading…", zh: "正在生成解读…" },
  generationFailed: {
    en: "The interpretation could not be generated. Your draw is saved — retry below at no extra cost.",
    zh: "解读生成失败。你的抽牌结果已保存，可在下方免费重试。",
  },

  // ---------- Astrology ----------
  astroTitle: { en: "Western astrology", zh: "西方占星" },
  astroIntro: {
    en: "Your birth chart, calculated to the degree with a real astronomical engine — then explained in plain language.",
    zh: "以真实天文引擎逐度计算你的出生星盘，再用平实的语言讲给你听。",
  },
  astroBirthChart: { en: "Birth Chart", zh: "本命星盘" },
  astroTransits: { en: "Current Transits", zh: "当前行运" },
  astroQuickProfile: { en: "Quick Profile", zh: "速览" },
  astroGuided: { en: "Guided Interpretation", zh: "引导式解读" },
  astroFullData: { en: "Full Chart Data", zh: "完整数据" },
  astroWheelAlt: {
    en: "Chart wheel diagram. The same information is available in the table below.",
    zh: "星盘轮图。下方表格提供相同信息。",
  },
  planet: { en: "Planet", zh: "行星" },
  sign: { en: "Sign", zh: "星座" },
  degree: { en: "Degree", zh: "度数" },
  house: { en: "House", zh: "宫位" },
  retrogradeCol: { en: "Retrograde", zh: "逆行" },
  aspects: { en: "Aspects", zh: "相位" },
  ascendant: { en: "Ascendant", zh: "上升点" },
  midheaven: { en: "Midheaven", zh: "天顶" },
  elementBalance: { en: "Element balance", zh: "元素分布" },
  modalityBalance: { en: "Modality balance", zh: "模式分布" },
  calcMetadata: { en: "Calculation details", zh: "计算信息" },
  horoscopeDailyTitle: { en: "Daily horoscope", zh: "每日星座运势" },
  todaySky: { en: "Today's Sky", zh: "今日星象" },
  todaySkyIntro: {
    en: "The real sky right now — the same positions your chart is read against. Free, updated daily, no sign-up.",
    zh: "此刻真实的天象——与解读星盘所用的位置一致。免费，每日更新，无需注册。",
  },
  skyMoonPhase: { en: "Moon phase", zh: "月相" },
  skyRetrogrades: { en: "Retrograde now", zh: "当前逆行" },
  skyNoRetrogrades: { en: "No planets retrograde today.", zh: "今日没有行星逆行。" },
  skyCurrentAspects: { en: "Notable aspects today", zh: "今日重要相位" },
  skyAllPositions: { en: "All positions now", zh: "当前全部行星位置" },
  skyViewFull: { en: "See today's full sky", zh: "查看今日完整星象" },
  bigThreeTitle: { en: "The Big Three", zh: "三大主星" },
  bigThreeIntro: {
    en: "Sun, Moon, and Rising — three quick doorways into any chart. Calculate yours, or browse every sign below.",
    zh: "太阳、月亮与上升——认识一张星盘最快的三个入口。计算你的，或在下方浏览每个星座。",
  },
  bigThreeSun: { en: "Sun · identity", zh: "太阳 · 自我" },
  bigThreeMoon: { en: "Moon · inner world", zh: "月亮 · 内在" },
  bigThreeRising: { en: "Rising · outward style", zh: "上升 · 外在" },

  // ---------- BaZi ----------
  baziTitle: { en: "BaZi · Four Pillars of Destiny", zh: "八字 · 四柱命理" },
  baziIntro: {
    en: "BaZi (八字) expresses your birth moment in the traditional Chinese calendar — four pillars of stems and branches read as a pattern of elements.",
    zh: "八字以传统历法表达你的出生时刻——四柱天干地支，读作一幅五行格局。",
  },
  baziCalculator: { en: "BaZi Calculator", zh: "八字排盘" },
  baziOneMinute: { en: "One-minute summary", zh: "一分钟速览" },
  baziPlain: { en: "Plain-language interpretation", zh: "白话解读" },
  baziFull: { en: "Full practitioner chart", zh: "完整命盘" },
  baziDayMaster: { en: "Day Master 日主", zh: "日主" },
  baziFiveElements: { en: "Five Elements 五行", zh: "五行" },
  baziTenGods: { en: "Ten Gods 十神", zh: "十神" },
  baziLuckPillars: { en: "Luck Pillars 大运", zh: "大运" },
  baziMethodology: { en: "Methodology", zh: "计算方法" },
  baziYearPillar: { en: "Year Pillar", zh: "年柱" },
  baziMonthPillar: { en: "Month Pillar", zh: "月柱" },
  baziDayPillar: { en: "Day Pillar", zh: "日柱" },
  baziHourPillar: { en: "Hour Pillar", zh: "时柱" },
  baziHourUnknown: { en: "Unknown (no birth time)", zh: "未知（缺出生时间）" },
  baziSexLabel: { en: "Sex at birth (traditional luck-pillar rule)", zh: "出生性别（传统大运排法所需）" },
  baziBoundaryWarn: {
    en: "Born near a solar-term boundary — pillar assignment can shift with the exact minute. Treat boundary charts with extra care.",
    zh: "出生时间接近节气交界——精确到分钟的时刻可能改变柱的归属，请谨慎对待交界命盘。",
  },

  // ---------- Daily guidance ----------
  dailyTitle: { en: "Daily guidance", zh: "每日指引" },
  dailyTheme: { en: "Today's Theme", zh: "今日主题" },
  dailyAstroLens: { en: "Astrology Lens", zh: "占星视角" },
  dailyBaziLens: { en: "BaZi Lens", zh: "八字视角" },
  dailyTarotLens: { en: "Tarot Lens", zh: "塔罗视角" },
  dailyNotice: { en: "Areas to Notice", zh: "值得留意" },
  dailyFriction: { en: "Possible Friction", zh: "可能的摩擦" },
  dailyAction: { en: "One Practical Action", zh: "一件可做的事" },
  dailyReflection: { en: "Reflection Question", zh: "反思提问" },
  dailyNeedsProfile: {
    en: "Daily guidance is personalized from your birth profile. Create a free profile to begin.",
    zh: "每日指引基于你的出生档案生成。先免费创建档案即可开始。",
  },

  // ---------- Compatibility ----------
  compatTitle: { en: "Compatibility", zh: "合盘配对" },
  compatIntro: {
    en: "Two charts, side by side — patterns in communication, values, and rhythm. Never verdicts about people.",
    zh: "两张命盘并排细看——沟通、价值观与节奏中的模式。只谈模式，不给人下结论。",
  },
  compatAstro: { en: "Astrology synastry", zh: "占星合盘" },
  compatBazi: { en: "BaZi pairing", zh: "八字合婚" },
  compatCombined: { en: "Combined view", zh: "综合视角" },
  compatPersonA: { en: "Person A", zh: "甲方" },
  compatPersonB: { en: "Person B", zh: "乙方" },
  compatShare: { en: "Create share card", zh: "生成分享卡" },
  compatShareNote: {
    en: "Share cards omit exact birth details and any private questions.",
    zh: "分享卡不包含确切出生信息与私人问题。",
  },
  compatCatCommunication: { en: "Communication", zh: "沟通方式" },
  compatCatEmotional: { en: "Emotional Style", zh: "情感风格" },
  compatCatAffection: { en: "Affection", zh: "亲密表达" },
  compatCatConflict: { en: "Conflict", zh: "冲突处理" },
  compatCatValues: { en: "Shared Values", zh: "共同价值" },
  compatCatRhythm: { en: "Daily Rhythm", zh: "生活节奏" },
  compatCatGrowth: { en: "Long-Term Growth", zh: "长期成长" },
  compatCatPractical: { en: "Practical Suggestions", zh: "实用建议" },

  // ---------- Journal ----------
  journalTitle: { en: "Journal", zh: "手记" },
  journalIntro: {
    en: "Your saved readings and notes — private by default.",
    zh: "你保存的解读与笔记——默认私密。",
  },
  journalEmpty: {
    en: "Nothing saved yet. Save a tarot reading or daily guidance and it will appear here.",
    zh: "还没有保存内容。保存一次塔罗解读或每日指引后会显示在这里。",
  },
  journalMood: { en: "Mood", zh: "心情" },
  journalTags: { en: "Tags", zh: "标签" },
  journalNotes: { en: "Private notes", zh: "私人笔记" },
  journalFavorites: { en: "Favorites", zh: "收藏" },
  journalExport: { en: "Export my journal", zh: "导出手记" },
  journalRepeatCards: { en: "Cards that keep appearing", zh: "反复出现的牌" },
  journalAiOptIn: {
    en: "Use selected journal entries to personalize interpretations.",
    zh: "允许使用选定的手记内容来个性化解读。",
  },
  journalPrivacyNote: {
    en: "Journal text is never sent to the AI unless you turn this on.",
    zh: "除非你开启此项，手记内容永远不会发送给 AI。",
  },

  // ---------- Account / auth ----------
  accountTitle: { en: "Account", zh: "账户" },
  accountProfiles: { en: "Birth profiles", zh: "出生档案" },
  accountSubscription: { en: "Subscription", zh: "订阅" },
  accountPrivacy: { en: "Privacy & data", zh: "隐私与数据" },
  accountDelete: { en: "Delete account", zh: "注销账户" },
  signInTitle: { en: "Sign in or create an account", zh: "登录或创建账户" },
  signInEmailLabel: { en: "Email address", zh: "邮箱地址" },
  signInEmailButton: { en: "Email me a sign-in link", zh: "发送登录链接到邮箱" },
  signInGoogle: { en: "Continue with Google", zh: "使用 Google 继续" },
  checkEmailTitle: { en: "Check your email", zh: "请查收邮件" },
  checkEmailBody: {
    en: "We sent you a sign-in link. It expires in 24 hours.",
    zh: "登录链接已发送至你的邮箱，24 小时内有效。",
  },
  profileNew: { en: "New profile", zh: "新建档案" },
  profileLabel: { en: "Profile name", zh: "档案名称" },
  profileDate: { en: "Date of birth", zh: "出生日期" },
  profileTime: { en: "Exact birth time", zh: "确切出生时间" },
  profileTimeUnknown: { en: "I do not know my exact birth time", zh: "我不知道确切的出生时间" },
  profileCity: { en: "Birth city", zh: "出生城市" },
  profileCityManual: { en: "My city is not listed — enter coordinates", zh: "列表中没有我的城市——手动输入坐标" },
  countryPlaceholder: { en: "Select country / region", zh: "选择国家 / 地区" },
  citySearchPlaceholder: { en: "Type to search cities", zh: "输入以搜索城市（支持拼音）" },
  comboNoResults: {
    en: "No matches — try another spelling, or enter coordinates below",
    zh: "未找到——试试其他拼写，或在下方手动输入坐标",
  },
  comboClear: { en: "Clear selection", zh: "清除选择" },
  tzSearchPlaceholder: { en: "Search timezones", zh: "搜索时区" },
  selectCountryFirst: { en: "Select a country first", zh: "请先选择国家 / 地区" },
  profileCountry: { en: "Birth country / region", zh: "出生国家 / 地区" },
  profileTz: { en: "Timezone", zh: "时区" },
  profileLat: { en: "Latitude", zh: "纬度" },
  profileLon: { en: "Longitude", zh: "经度" },
  profileInterest: { en: "Primary interest", zh: "主要兴趣" },
  profileSex: { en: "Sex at birth (for BaZi luck pillars)", zh: "出生性别（用于八字大运）" },
  profileNormalizeTitle: { en: "Confirm the normalized details", zh: "确认标准化后的信息" },
  profileNormalizeBody: {
    en: "We convert your local birth time using the historical timezone database. Please confirm everything looks right.",
    zh: "我们会依据历史时区数据库换算你的出生时间，请确认以下信息无误。",
  },
  profilePrivacyNote: {
    en: "Birth details stay in your account. They never appear in page URLs, analytics, or share cards.",
    zh: "出生信息只保存在你的账户中，绝不会出现在网址、统计数据或分享卡里。",
  },
  exportData: { en: "Export my data", zh: "导出我的数据" },
  deleteConfirmTitle: { en: "Delete your account?", zh: "确定注销账户？" },
  deleteConfirmBody: {
    en: "This permanently removes your profiles, readings, journal, and personal data. Paid orders records required for accounting are retained in anonymized form. This cannot be undone.",
    zh: "这将永久删除你的档案、解读记录、手记与个人数据。会计所需的订单记录将以匿名形式保留。此操作无法撤销。",
  },
  deleteConfirmWord: { en: "Type DELETE to confirm", zh: "输入 DELETE 以确认" },

  // ---------- Pricing / checkout (md §7) ----------
  pricingTitle: { en: "Pricing", zh: "价格" },
  pricingFree: { en: "Free", zh: "免费" },
  pricingPremium: { en: "Premium", zh: "高级会员" },
  pricingMonthly: { en: "per month", zh: "每月" },
  pricingAnnual: { en: "per year", zh: "每年" },
  pricingReports: { en: "One-time deep reports", zh: "单次深度报告" },
  pricingFreeFeatures: {
    en: "Daily card · basic chart & pillars · 3 sample interpretations",
    zh: "每日一牌 · 基础星盘与命盘 · 3 次示例解读",
  },
  pricingPremiumFeatures: {
    en: "Unlimited interpretations · daily guidance · journal insights · member prices on reports",
    zh: "不限次解读 · 每日指引 · 手记洞察 · 报告会员价",
  },
  checkoutRenewalNote: {
    en: "Renews automatically. Cancel online anytime — access continues to the end of the paid period.",
    zh: "自动续费，可随时在线取消——取消后可继续使用至已付费周期结束。",
  },
  checkoutConsentLabel: {
    en: "I agree to immediate delivery of this digital content and acknowledge that I lose the 14-day right of withdrawal once delivery begins.",
    zh: "我同意立即交付该数字内容，并知悉交付开始后即失去 14 天撤回权。",
  },
  checkoutRefundNote: {
    en: "Refunds: if generation fails, we regenerate or refund in full. See the refund policy for details.",
    zh: "退款说明：若生成失败，我们将重新生成或全额退款。详见退款政策。",
  },
  checkoutPayButton: { en: "Continue to secure payment", zh: "前往安全支付" },
  checkoutDevPay: { en: "Simulate payment (dev only)", zh: "模拟支付（仅开发环境）" },
  subCancelButton: { en: "Cancel subscription", zh: "取消订阅" },
  subCancelScheduled: {
    en: "Your subscription will end on {date}. You keep access until then.",
    zh: "你的订阅将于 {date} 结束，在此之前可继续使用。",
  },
  subResume: { en: "Resume subscription", zh: "恢复订阅" },
  subNone: { en: "You are on the free plan.", zh: "你目前使用免费方案。" },

  // ---------- Legal ----------
  legalTerms: { en: "Terms of Service", zh: "服务条款" },
  legalPrivacy: { en: "Privacy Policy", zh: "隐私政策" },
  legalCookies: { en: "Cookie Policy", zh: "Cookie 政策" },
  legalSubs: { en: "Subscription Terms", zh: "订阅条款" },
  legalRefunds: { en: "Refund Policy", zh: "退款政策" },
  legalDisclaimer: { en: "Disclaimer", zh: "免责声明" },
  legalAi: { en: "AI Disclosure", zh: "AI 使用披露" },
  footerAge: { en: "For adults 18+.", zh: "仅面向 18 岁及以上成年人。" },
} as const;

export type MessageKey = keyof typeof M;
