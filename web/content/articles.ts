// Bilingual long-form articles for the learning section.
// Tone: reflective, non-deterministic, culturally accurate. No medical/legal/financial advice.

export interface ArticleContent {
  slug: string;
  title: { en: string; zh: string };
  description: { en: string; zh: string }; // 1-2 sentences, used for SEO meta
  minutes: number; // reading time
  sections: Array<{ heading: { en: string; zh: string }; body: { en: string; zh: string } }>; // 3-5 sections, each body 2-4 paragraphs separated by \n\n
}

export const ARTICLES: ArticleContent[] = [
  {
    slug: "what-is-tarot",
    title: {
      en: "What Is Tarot? A Calm Introduction to the Cards",
      zh: "什么是塔罗？一份平静的入门指南",
    },
    description: {
      en: "A grounded introduction to tarot: where the cards came from, how a deck is structured, and how a reading can support reflection without claiming to predict the future.",
      zh: "一份踏实的塔罗入门：牌从哪里来、一副牌如何构成，以及一次解读如何在不声称预知未来的前提下，陪你把问题想得更清楚。",
    },
    minutes: 8,
    sections: [
      {
        heading: { en: "Where tarot comes from", zh: "塔罗从哪里来" },
        body: {
          en: "Tarot did not begin as a mystical practice. In fifteenth-century Italy, wealthy families commissioned hand-painted decks called carte da trionfi — cards of triumphs — for a trick-taking game not unlike bridge. The imagery came from the culture of the time: emperors and popes, allegories of virtue, the wheel of fortune.\n\nOnly in the late eighteenth century, largely in France, did tarot become associated with divination. Writers and occultists reinterpreted the images as a symbolic language of inner life, and readers began using the cards to sit with questions. The Rider–Waite–Smith deck of 1909, illustrated by Pamela Colman Smith, gave every card a full pictorial scene and still shapes how most modern decks look.\n\nThis history frames what tarot is: a symbolic vocabulary made by people and refined over centuries. The cards carry meaning because generations have thought with them — not because they hold any supernatural authority.",
          zh: "塔罗最初并不是什么神秘学工具，而是一种纸牌游戏。十五世纪的意大利，富裕的家族会定制手绘的“凯旋牌”（carte da trionfi），用来玩一种类似桥牌的吃墩游戏。牌面图案取材于当时的文化：皇帝与教皇、美德的寓言、命运之轮。\n\n直到十八世纪末，主要在法国，塔罗才开始与占卜联系起来。作家与神秘学者把这些图像重新解读为一套关于内心生活的象征语言，解牌人开始借助它们与问题相处。1909 年由帕梅拉·科尔曼·史密斯绘制的韦特塔罗（Rider–Waite–Smith），为每张牌配上了完整的场景，至今仍塑造着大多数现代牌的样貌。\n\n了解这段历史，恰恰说明了塔罗的本质：一套由人创造、历经几个世纪打磨的象征语言。这些牌之所以有意义，是因为一代代人借助它们思考——而不是因为它们拥有什么超自然的权威。",
        },
      },
      {
        heading: { en: "How a deck is put together", zh: "一副牌的构成" },
        body: {
          en: "A standard deck holds 78 cards in two families. The 22 Major Arcana — from The Fool to The World — are often read as one long journey, and tend to speak to larger themes: beginnings, thresholds, loss, integration.\n\nThe remaining 56 cards are the Minor Arcana, arranged in four suits. Wands lean toward fire: action, will, enthusiasm. Cups lean toward water: feeling, relationship, imagination. Swords lean toward air: thought, truth, conflict. Pentacles lean toward earth: work, body, material life. Each suit runs from ace to ten and adds four court cards, which many readers treat as personas or approaches rather than literal people.\n\nA useful shorthand: the Majors read like chapter titles, while the Minors supply the texture of the paragraphs. Most spreads weave the two together — broad strokes and fine grain at once.",
          zh: "一副标准塔罗共 78 张，分为两大部分。22 张大阿卡纳——从“愚人”到“世界”——常被读作一段完整的旅程，对应人生中较大的主题：开始、门槛、失去、整合。\n\n其余 56 张是小阿卡纳，分为四个牌组。权杖偏向火：行动、意志与热情；圣杯偏向水：情感、关系与想象；宝剑偏向风：思维、真相与冲突；星币偏向土：工作、身体与物质生活。每组从一到十，另有四张宫廷牌——许多解牌人把宫廷牌看作性格面向或处事方式，而不是具体的某个人。\n\n一个好用的比喻：大阿卡纳像章节标题，小阿卡纳则是段落里的日常细节。大多数牌阵会把两者编织在一起——粗线条与细纹理同时呈现。",
        },
      },
      {
        heading: { en: "What a reading actually does", zh: "一次解读究竟在做什么" },
        body: {
          en: "A reading is, at heart, a structured act of reflection. You bring a question, draw cards at random, and then use the images as prompts to look at your situation from angles you might not have chosen on your own. In that sense a spread works less like a forecast and more like a poem or a mirror: it does not add new facts to your life, but it can rearrange your attention.\n\nThe cards do not know your future. Meaning happens in the interpretation, where you connect an image to your circumstances. The Tower, for one person, may point to an arrangement that already feels shaky; for another, it might name a long-awaited break from something outgrown. The card invites consideration — it does not announce disaster.\n\nNothing in a spread is fixed. You remain the one weighing choices and making them; tarot offers language and perspective, not verdicts.",
          zh: "一次塔罗解读，本质上是一场有结构的反思。你带着一个问题而来，随机抽出几张牌，然后借助牌面的意象，从一些你自己未必会选择的角度重新审视处境。从这个意义上说，牌阵更像一首诗或一面镜子：它不会为你的生活增添新的事实，却可能重新安排你的注意力。\n\n牌并不知道你的未来。意义发生在解读之中——发生在你把图像与自身处境连接起来的那一刻。同一张“高塔”，对一个人来说，或许指向某个早已摇摇欲坠的安排；对另一个人，也可能命名一场期待已久的破局。牌邀请你思考，而不是宣布灾难。\n\n牌阵里没有什么是注定的。掂量并做出选择的人始终是你；塔罗提供的是语言与视角，而不是裁决。",
        },
      },
      {
        heading: { en: "Approaching your first reading", zh: "如何开始第一次解读" },
        body: {
          en: "How you ask matters. Open questions — “What might I pay attention to in this working relationship?” — tend to be more rewarding than yes-or-no demands, because they give the images somewhere to go. Many people keep a small journal of their draws and return to it later; patterns in your own readings are often more instructive than any guidebook.\n\nWhen a difficult card appears, consider pausing with the discomfort rather than pushing past it: the place it points to is often exactly what deserves thought. Reversed cards can be read gently, as a theme turned inward, delayed, or seen from its other side — not as omens.\n\nAnd a matter of boundaries: tarot suits reflection and exploration. It is not a substitute for medical, legal, financial, or mental-health advice, and no card should override your own judgment or the counsel of a qualified professional.",
          zh: "提问的方式很重要。开放式的问题——“关于这段合作关系，我不妨留意些什么？”——通常比“会不会成”这类是非题更有收获，因为它给了图像可以延展的空间。许多人会用小本子记录每次抽牌，日后回看；你自己解读中反复出现的模式，往往比任何牌义手册更有启发。\n\n遇到看似艰难的牌，不妨先与那份不适感待一会儿，而不是急着翻篇：它指向的地方，常常正是值得思考之处。逆位牌也可以温和地理解——主题转向内在、有所延迟，或呈现出另一面——而不是什么凶兆。\n\n最后是边界：塔罗适合用于反思与探索。它不能替代医疗、法律、财务或心理健康方面的专业意见；任何一张牌，都不应凌驾于你自己的判断或专业人士的建议之上。",
        },
      },
    ],
  },
  {
    slug: "how-birth-charts-work",
    title: {
      en: "How Birth Charts Work: A Map, Not a Verdict",
      zh: "本命星盘如何运作：一张地图，而非判决",
    },
    description: {
      en: "What a birth chart actually is, how planets, signs, houses, and aspects fit together, and how to read the whole map without mistaking it for fate.",
      zh: "本命星盘究竟是什么？行星、星座、宫位与相位如何组合在一起？以及如何把星盘当作一张可以参考的地图来读，而不是一份写死的判决书。",
    },
    minutes: 9,
    sections: [
      {
        heading: { en: "A snapshot of the sky", zh: "一张天空的快照" },
        body: {
          en: "A birth chart — also called a natal chart — is a diagram of the sky at the moment and place you were born: where the Sun, Moon, and planets stood, as seen from that point on Earth. It is astronomy before it is anything else. The positions are computed from ephemeris data, and anyone using sound methods will arrive at the same chart.\n\nBecause the chart depends on both time and place, two people born on the same day in different cities — or a few hours apart — receive different charts, especially in the parts anchored to the local horizon. Astrology is the symbolic layer added on top of this astronomical base.\n\nThat order is worth remembering: first a calculation you can verify, then an interpretation that stays open. The first part is deterministic; the second is a conversation.",
          zh: "本命星盘是一张示意图，记录你出生那一刻、从出生地点望向天空时，太阳、月亮与各大行星所处的位置。它首先是天文学：这些位置由星历数据计算得出，任何人用可靠的方法都会算出同样的结果。\n\n因为星盘同时取决于时间与地点，同一天出生、但城市不同或相隔几个小时的两个人，星盘也会不同——尤其是与当地地平线相关的部分。占星学，是叠加在这层天文事实之上的象征解读。\n\n这个先后顺序值得记住：先有可以验证的计算，再有始终保持开放的诠释。前者是确定的，后者是一场对话。",
        },
      },
      {
        heading: { en: "Planets, signs, and houses", zh: "行星、星座与宫位" },
        body: {
          en: "Three building blocks do most of the work. Planets stand for what: the Sun is often read as core identity and vitality, the Moon as emotional needs, Mercury as thinking and speech, Venus as values and affection, Mars as drive. The slower outer planets are frequently read as themes shared across a generation.\n\nSigns describe how — twelve styles that color a planet's expression. Houses describe where: taking the horizon at your birth moment as an anchor, the chart divides the sky into twelve areas of life — self, resources, communication, home, creativity, work, partnership, and so on.\n\nPut together, a placement reads like a sentence. Mars in Libra in the tenth house: the part of you that acts (Mars) may tend to move diplomatically (Libra) on the stage of career and public life (the tenth house). It describes a leaning, not an outcome.",
          zh: "读盘主要依靠三块积木。行星代表“什么”：太阳常被读作核心自我与生命力，月亮是情绪与需求，水星是思维与表达，金星是价值与亲密，火星是行动力；更慢的外行星，则常被视为一代人共享的时代底色。\n\n星座描述“如何”——十二种风格，为行星的功能上色。宫位描述“在哪里”：以出生时刻的地平线为基准，星盘把天空分成十二个生活领域——自我、财物、沟通、家庭、创造、工作、伴侣关系等等。\n\n三者合起来，就像一句话：火星（想要行动的部分）落在天秤座（或许倾向以协调的方式推进），位于第十宫（在事业与公共生活的舞台上）。它描述的是一种倾向，而不是一个结局。",
        },
      },
      {
        heading: { en: "Aspects: how the chart talks to itself", zh: "相位：星盘内部的对话" },
        body: {
          en: "Aspects are the angles planets make to one another — conjunctions, oppositions, squares, trines, sextiles. Older texts sorted them into fortunate and unfortunate; modern readers more often speak of tension and ease, and treat both as useful.\n\nA square's friction may be precisely what pushes a talent to develop, while a trine's smoothness can be so comfortable it goes unnoticed. Reading the chart as a web of conversations between its parts comes closer to the spirit of the craft than looking up placements one by one.",
          zh: "相位是行星彼此之间的夹角——合相、对分相、四分相、三分相、六分相。古典文本习惯把它们分成吉与凶；现代的读法更常说“张力”与“顺畅”，并认为两者各有其用。\n\n四分相带来的摩擦，可能恰恰是推动才能成形的力量；三分相的顺遂，则或许舒服到容易被视作理所当然。把星盘读成各部分之间的对话之网，比逐条查含义更接近这门手艺的本意。",
        },
      },
      {
        heading: { en: "Reading the whole, holding it lightly", zh: "整体地读，轻轻地拿" },
        body: {
          en: "No single placement defines a person. Patterns matter more than points, and the contradictions inside a chart usually correspond to the genuine complexity of the person holding it. Someone may carry both a cautious placement and a daring one; life is the negotiation between them.\n\nWhat a chart can offer: a vocabulary for self-reflection, a set of themes worth noticing, and — through transits — an occasional prompt about what might deserve attention now. What it cannot offer: scientific proof, decisions made on your behalf, or guarantees about how anything will turn out.\n\nHeld that way — as a map you consult rather than a verdict you serve — a birth chart can be a durable companion for thinking about your own life.",
          zh: "没有任何单一配置能定义一个人。模式比孤立的点更重要，而星盘内部的矛盾，往往正对应着盘主本人真实的复杂：一个人可以同时带着一处谨慎与一处莽勇，生活就是两者之间的谈判。\n\n星盘能提供的：一套自我觉察的语言、一组值得留意的主题，以及（通过行运）一份“此刻不妨想想什么”的偶尔提醒。它不能提供的：科学意义上的证明、替你做出的决定，或对任何结果的保证。\n\n以这样的方式去拿它——当作一张可以查阅的地图，而不是一份必须服从的判决——本命星盘或许能成为你思考自己人生时，一位经久耐用的同伴。",
        },
      },
    ],
  },
  {
    slug: "bazi-beginners-guide",
    title: {
      en: "A Beginner's Guide to BaZi: The Four Pillars",
      zh: "八字入门：认识你的四柱",
    },
    description: {
      en: "BaZi writes your birth moment as four pillars of stems and branches. Learn how the system works, what a Day Master is, and how to read a chart as terrain rather than verdict.",
      zh: "八字把出生时刻写成四组天干地支。这篇入门介绍这套系统如何运作、什么是日主，以及如何把命盘看作一片有坡度有风景的地形，而不是一纸定论。",
    },
    minutes: 10,
    sections: [
      {
        heading: { en: "What BaZi is", zh: "什么是八字" },
        body: {
          en: "BaZi (八字, literally “eight characters”) — also known as the Four Pillars of Destiny — is a Chinese system that describes a person through their moment of birth, written in the traditional calendar. Year, month, day, and hour each form a pillar of two characters: one Heavenly Stem above, one Earthly Branch below. Four pillars, eight characters.\n\nIts foundations are Chinese calendrics and five-element thought. In the Tang dynasty, Li Xuzhong read fate from three pillars — year, month, and day. In the Song dynasty, Xu Ziping added the hour and moved the chart's center of gravity to the day stem, creating the method later generations call Ziping astrology — the ancestor of most BaZi practice today.\n\nBefore it is anything interpretive, then, BaZi is calendar mathematics: precise dates and solar terms first, meaning afterward.",
          zh: "八字，又称四柱，是一套源自中国的命理体系：把一个人出生的年、月、日、时换算成传统历法中的干支。每柱两个字——天干在上，地支在下——四柱共八个字，故称“八字”。\n\n它的根基是中国的历法学与五行思想。唐代的李虚中以年、月、日三柱论命；宋代的徐子平将时辰纳入，并把整张命盘的重心移到日干之上，形成后世所称的“子平术”——也就是今天绝大多数八字方法的源头。\n\n换句话说，在成为任何一种解读之前，八字首先是历法数学：先有精确的日期与节气计算，然后才谈意义。",
        },
      },
      {
        heading: { en: "Stems, branches, and the cycle of sixty", zh: "天干、地支与六十甲子" },
        body: {
          en: "The ten Heavenly Stems (甲乙丙丁戊己庚辛壬癸) express the five elements in yang and yin forms: Jia and Yi are Wood, Bing and Ding are Fire, Wu and Ji are Earth, Geng and Xin are Metal, Ren and Gui are Water. The twelve Earthly Branches (子丑寅卯 and onward) connect to the zodiac animals, to the months of the year, and to the twelve two-hour periods that divide a traditional day.\n\nStems and branches pair off in sequence to form a repeating cycle of sixty — the sexagenary cycle, 六十甲子 — which classical China used to count years, months, days, and hours alike. Your birth moment is a coordinate in that long river: four stem-branch pairs, eight characters.\n\nOne detail often missed: in most schools, the BaZi year and month change at the solar terms rather than at Lunar New Year — the year traditionally begins at Lichun, the Start of Spring, in early February. This is why casting a chart demands careful calendar work.",
          zh: "十个天干（甲乙丙丁戊己庚辛壬癸）表达五行的阴阳两面：甲乙属木，丙丁属火，戊己属土，庚辛属金，壬癸属水。十二地支（子丑寅卯等）则与生肖、月份相连，也对应把一天分成十二段、每段两小时的“时辰”。\n\n天干与地支依次相配，形成六十组一轮的循环，即“六十甲子”。古人用它纪年、纪月、纪日、纪时。你的出生时刻，就是这条长河中的一个坐标：四组干支，八个字。\n\n一个常被忽略的细节：多数流派中，八字的年与月以节气为界，而不是农历正月初一——传统上，一年始于二月初的立春。这正是排盘需要严谨历法计算的原因。",
        },
      },
      {
        heading: { en: "The Day Master: the chart's center", zh: "日主：命盘的中心" },
        body: {
          en: "The stem of the day pillar is called the Day Master (日主) — the character that stands for you. The remaining seven characters are all read in relation to it.\n\nThere are ten possible Day Masters, one for each stem, and each carries a traditional image: Jia Wood the tall tree, Yi Wood the winding vine, Bing Fire the sun, Ding Fire the lantern flame, Wu Earth the mountain, Ji Earth the garden soil, Geng Metal the unforged blade, Xin Metal the polished jewel, Ren Water the open sea, Gui Water the morning dew.\n\nThe relationships between the other characters and the Day Master are grouped into the Ten Gods (十神) — a cast of roles such as resource, output, wealth, influence, and peers — describing how support, expression, ambition, and constraint may interact with the self. This vocabulary forms the skeleton of BaZi reading.",
          zh: "日柱的天干称为“日主”或“日元”——代表命主本人的那个字。其余七个字，都是围绕它来解读的。\n\n日主共有十种可能，对应十天干，每一种都有传统的意象：甲木是参天大树，乙木是缠绕的藤蔓，丙火是太阳，丁火是灯烛之光，戊土是高山，己土是田园沃土，庚金是未淬之剑，辛金是打磨过的珠玉，壬水是江海，癸水是晨间雨露。\n\n其余干支与日主之间的关系，被归纳为“十神”——比劫、食伤、财、官杀、印这样一组角色——描述支持、表达、进取与约束等力量可能如何与“我”互动。这套词汇，构成了八字解读的骨架。",
        },
      },
      {
        heading: { en: "Balance, season, and flow", zh: "平衡、季节与流通" },
        body: {
          en: "Traditional analysis begins with the month branch — the season of birth — to gauge whether the Day Master arrives in a supportive time. Wood born in spring, or fire born in summer, is conventionally considered in season, with the current of the year at its back.\n\nEvery chart leans toward some elements and away from others. Practitioners look for the useful god (用神): the element whose presence might help the whole chart flow. It helps to hold this the way a gardener would — no chart is good or bad; each is a terrain with its own slopes, shade, and water.",
          zh: "传统的分析从月令开始——也就是出生月份的地支——用来判断日主是否生逢其时。生于春天的木、生于夏天的火，通常被认为“得令”，背后有整个季节的水流托着。\n\n每张命盘都会偏向某些五行、疏远另一些。命理师会寻找“用神”：那个或许能让全局更加流通的元素。不妨用园丁的心态来看待这件事——命盘没有好坏之分，只有不同的地形，各有各的坡度、树荫与水源。",
        },
      },
      {
        heading: { en: "Reading BaZi today", zh: "今天我们如何看八字" },
        body: {
          en: "Classical fate texts can sound deterministic; they belong to their era. A more useful modern stance treats BaZi as a vocabulary for noticing your own tendencies and rhythms — which conditions tend to let you thrive, which situations tend to drain you.\n\nBaZi also describes decade-long luck pillars (大运), traditionally read as shifting chapters of life. You might treat them as seasons worth paying attention to, rather than as a timetable of events.\n\nTwo honest notes to close. BaZi has no scientific validation, and nothing in it should replace professional advice — medical, legal, financial, or otherwise. Its value lies elsewhere: a mirror with centuries of thought behind it, in which the person reflected is still, always, you.",
          zh: "古代命书的语气有时是宿命论的，这与它们的时代有关。今天更有益的姿态，是把八字当作一套观察自身倾向与节奏的语言：哪些条件容易让你如鱼得水，哪些情境往往让你格外消耗。\n\n八字中还有以约十年为一段推移的“大运”，传统上被读作人生主题的更替。你不妨把它们当作值得留意的季节，而不是一张写好的时刻表。\n\n最后是两句诚实的话：八字没有科学意义上的验证，其中的任何内容都不应替代医疗、法律、财务等专业建议。它的价值在别处——一面承载了数百年思考的镜子，而镜中照见的，始终是你自己。",
        },
      },
    ],
  },
  {
    slug: "five-elements-in-daily-life",
    title: {
      en: "The Five Elements in Daily Life",
      zh: "日常生活中的五行",
    },
    description: {
      en: "Wood, Fire, Earth, Metal, and Water are less five substances than five ways energy moves. How the two cycles work, and gentle ways to notice the phases in an ordinary week.",
      zh: "木、火、土、金、水，与其说是五种物质，不如说是能量运行的五种方式。本文介绍相生相克两个循环，以及在寻常一周里觉察五行的温和方法。",
    },
    minutes: 8,
    sections: [
      {
        heading: { en: "Five phases, not five substances", zh: "是五种状态，不是五种物质" },
        body: {
          en: "The xing in wuxing (五行) means to move, to go — a hint that “five elements” is a slightly misleading translation. These are less five substances than five phases of movement: Wood is rising and expanding, Fire is flourishing at full expression, Earth is centering and transforming, Metal is contracting and refining, Water is sinking, storing, and resting.\n\nClassical Chinese thought used the five phases as a web of correspondences: the seasons (spring to Wood, summer to Fire, late summer to Earth, autumn to Metal, winter to Water), directions, colors, sounds — and, in traditional medicine, a symbolic map of the body. It is a net of relations, not a periodic table.",
          zh: "“五行”的“行”，是运行的行——这提醒我们，把它译作“五种元素”其实有点误导。五行与其说是五种材料，不如说是五种运动状态：木是生发与伸展，火是升腾与全然的绽放，土是承载与转化，金是收敛与精炼，水是沉潜、蓄养与休息。\n\n古人用这五种状态编织出一张对应之网：季节（春属木、夏属火、长夏属土、秋属金、冬属水）、方位、颜色、声音——在传统医学中，还有一幅对身体的象征性描绘。它是一张关系之网，而不是一张元素周期表。",
        },
      },
      {
        heading: { en: "Two cycles: generating and controlling", zh: "两个循环：相生与相克" },
        body: {
          en: "The generating cycle (相生) describes how each phase feeds the next. Wood feeds Fire, as kindling feeds a flame. Fire produces Earth, as ash settles into soil. Earth bears Metal, as ore forms in the ground. Metal enriches Water — classical observers noted dew condensing on metal. Water nourishes Wood, as rain grows the forest.\n\nThe controlling cycle (相克) describes restraint: Wood breaks Earth, as roots split soil. Earth dams Water. Water quenches Fire. Fire melts Metal. Metal cuts Wood.\n\nNeither cycle is the good one. Generation without control floods; control without generation starves. Balance in this system is dynamic — closer to an ecosystem than to a set of scales at rest.",
          zh: "相生循环描述滋养的次序：木生火，如柴薪助燃；火生土，如灰烬归于泥土；土生金，如矿藏孕于大地；金生水——古人观察到金属表面凝结露水；水生木，如雨水养育森林。\n\n相克循环描述约束的次序：木克土，如根系破土；土克水，如堤坝拦水；水克火，火遇水而熄；火克金，烈火熔金；金克木，斧斤伐木。\n\n两个循环并没有哪个是“好”的。只生不克会泛滥，只克不生会枯竭。五行的平衡是动态的——更像一个生态系统，而不是一架静止的天平。",
        },
      },
      {
        heading: { en: "Noticing the phases in an ordinary week", zh: "在寻常的一周里觉察五行" },
        body: {
          en: "Try reading a single week through this lens. The morning you finally start something new has a Wood feeling. The afternoon you present, perform, or host carries Fire. The routines that steady you — meals, tidying, the commute — sit with Earth. Editing, pruning, and finishing belong to Metal. Rest, solitude, and sleep return you to Water.\n\nYou may notice your days leaning hard toward certain phases: endless starting with little finishing, or so much routine that nothing new gets planted. The noticing itself is the point — there is no correct distribution, only a clearer view of your own weather.\n\nHold it lightly: this is a reflective lens, not a diagnostic tool.",
          zh: "不妨用这副透镜读一读自己的一周。终于动手开始新事的那个早晨，带着木的气息；上台展示、招待客人的午后，是火；让你安稳下来的例行之事——吃饭、收拾、通勤——属于土；删减、修剪、收尾的时刻属于金；休息、独处与睡眠，则把你交还给水。\n\n你或许会发现自己的日子明显偏向某几种状态：总在开始、很少完成，或者日程满是重复、新的种子无处落土。觉察本身就是意义所在——并不存在“正确的配比”，只有对自己天气的更清楚的看见。\n\n轻轻地拿着它：这是一副用来反思的透镜，不是一件诊断的工具。",
        },
      },
      {
        heading: { en: "Gentle ways to tend the balance", zh: "温和地调节平衡" },
        body: {
          en: "If life has been all Fire lately — fast, visible, spending more than it stores — you might borrow from Water: an earlier night, a stretch of quiet with nothing to produce. If you feel buried in Earth, weeks of routine without change, consider a little Wood: one small new thing, started imperfectly on purpose.\n\nSome people also enjoy letting their spaces echo the phases — a plant on the desk, a warmer lamp, one honest round of decluttering. The value of these gestures is that they are pleasant in themselves; the five phases simply give them a more poetic name.\n\nThe five phases also appear in traditional Chinese medicine's picture of the body. That lineage is a deep field of its own, and nothing here is health advice — for anything medical, please consult a qualified professional.",
          zh: "如果近来的生活全是火——节奏快、曝光多、消耗大于积蓄——或许可以向水借一点：早一点睡，留一段什么都不产出的安静。如果感觉被土埋住了，一连几周的日程只有重复，不妨引入一点木：开始一件很小的新事，并且故意允许它开头开得不完美。\n\n有些人也喜欢让环境呼应五行——桌上一盆绿植、一盏更暖的灯、一次认真的断舍离。这些做法的价值在于它们本身就令人愉悦；五行只是给了它们一个更有诗意的名字。\n\n五行也出现在传统中医对身体的描绘里。那是另一门很深的学问，而本文不包含任何健康建议——身体方面的疑问，请咨询专业人士。",
        },
      },
    ],
  },
  {
    slug: "unknown-birth-time",
    title: {
      en: "No Birth Time? What Your Chart Can Still Say",
      zh: "不知道出生时间？命盘依然能告诉你这些",
    },
    description: {
      en: "Without a birth time there is no Ascendant, no houses, and no Hour Pillar — but far from nothing. What still holds in Western astrology and BaZi, and how to work with an honest, incomplete map.",
      zh: "没有出生时间，就没有上升星座、宫位和时柱——但远不等于无盘可读。本文说明西方占星与八字中仍然成立的部分，以及如何用好一张诚实而不完整的地图。",
    },
    minutes: 7,
    sections: [
      {
        heading: { en: "Why the clock matters", zh: "为什么出生时间重要" },
        body: {
          en: "The Earth turns once a day, so the zodiac sign rising over the eastern horizon — the Ascendant — changes roughly every two hours. The house system takes the Ascendant as its starting point and slices the sky into twelve areas of life, which makes the houses just as time-sensitive. Without a reliable birth time, neither can be honestly computed.\n\nBaZi meets the same constraint through a different calendar: the traditional day divides into twelve two-hour periods, and your Hour Pillar depends on which one you were born in. No time, no Hour Pillar.\n\nOur approach is simple: whatever cannot be computed is marked unavailable. We would rather show you a smaller true chart than a complete guessed one.",
          zh: "地球每天自转一周，因此从东方地平线升起的星座——上升星座——大约每两小时更换一次。宫位系统以上升点为起点，把天空切分成十二个生活领域，所以宫位同样对时间高度敏感。没有可靠的出生时间，这两者都无法诚实地算出。\n\n八字遇到的是同一个限制，只是换了一套历法：传统的一天分为十二个时辰，每个时辰两小时，时柱取决于你出生落在哪一个时辰里。没有时间，就没有时柱。\n\n我们的做法很简单：算不出的部分，一律明确标注为不可用。我们宁可给你一张小一些但真实的盘，也不给一张完整却靠猜的盘。",
        },
      },
      {
        heading: { en: "Western astrology without a birth time", zh: "没有出生时间的西方占星" },
        body: {
          en: "A great deal survives. The Sun, Mercury, Venus, Mars, and the slower planets barely change sign within a single day, so their placements almost always hold — and most planet-to-planet aspects hold with them. That is a large share of what a natal reading draws on.\n\nWhat is lost: the Ascendant and Midheaven cannot be fixed, and without them there are no houses — so questions about which area of life a placement lands in have to wait.\n\nThe Moon needs its own note. It moves about twelve to thirteen degrees a day and changes sign every two to three days. On most birthdays the Moon sign is certain anyway; when your birthday happens to straddle a sign change, there are two candidates. The honest move is to read both and notice which feels more like home — not to pretend to a certainty the math cannot support.",
          zh: "保留下来的其实相当多。太阳、水星、金星、火星以及更慢的行星，在一天之内几乎不会更换星座，所以它们的落座位置基本都还成立——行星与行星之间的大多数相位也随之成立。这已经是本命解读所依赖内容中很大的一部分。\n\n失去的部分：上升与天顶无法确定；没有它们，就无法起宫位——于是“这股能量落在哪个生活领域”这类问题，只能暂时搁置。\n\n月亮需要单独说明。它每天移动约十二到十三度，每两三天换一个星座。大多数生日当天，月亮星座本来就是确定的；如果你恰好出生在月亮换座的那一天，就会存在两个候选。诚实的做法，是把两种都读一读，看哪一种更像回到家——而不是假装拥有数学撑不起的确定。",
        },
      },
      {
        heading: { en: "BaZi without the hour", zh: "没有时辰的八字" },
        body: {
          en: "The year, month, and day pillars are untouched by a missing birth time — six of the eight characters remain fully certain. Crucially, that includes the Day Master, the chart's center, and the month branch, which carries great weight in judging the season's support.\n\nWhat is missing is the Hour Pillar. In classical reading it relates to later life and, traditionally, to the palace of children; it also contributes to the overall elemental balance, so judgments about the Day Master's strength deserve an extra margin of humility.\n\nReading from three pillars is a recognized traditional practice. The craft lies in staying clear about what the chart can no longer say.",
          zh: "年柱、月柱与日柱完全不受影响——八个字里有六个依然确定。关键的是，这其中包括命盘的中心“日主”，以及在判断季节助力时分量极重的月令。\n\n缺失的是时柱。在古典读法中，它关联晚年的境况，传统上也对应子女宫；它还参与全盘五行比例的构成，因此对日主强弱的判断，值得多留一分谦逊的余地。\n\n只以三柱论命，在传统上是被认可的做法。功夫在于：对这张盘“不再能说什么”，始终保持清楚。",
        },
      },
      {
        heading: { en: "Working with what you have", zh: "用好你已有的信息" },
        body: {
          en: "A few practical avenues. Birth certificates and hospital records sometimes list a time. Family memory can help, though “it was around dinner” deserves gentle skepticism — remembered times tend to be rounded.\n\nThere are also reconstruction techniques — rectification in astrology, hour-deduction in BaZi — that work backward from life events toward a candidate birth time. They can be an interesting exploration, but their conclusions are hypotheses and are best held that way.\n\nOr simply work with the time-independent layers. An incomplete map can still orient you; what matters is knowing where the blank regions are. We mark them rather than paint over them.",
          zh: "几条实际的路径。出生证明或医院记录上有时会写明时间；家人的记忆也有帮助，不过“大概是吃晚饭的时候吧”值得温和地存疑——被记住的时间往往是取整过的。\n\n此外还有一些“倒推”的技法——占星中的生时校正，八字中的推时——从人生事件反推出一个候选的出生时间。它们可以是一种有趣的探索，但其结论属于假设，最好也一直被当作假设来持有。\n\n或者，坦然使用与时间无关的那些层面。一张不完整的地图，依然可以为你指出方向；重要的是知道空白在哪里。而我们选择把空白标注出来，而不是把它涂掉。",
        },
      },
    ],
  },
  {
    slug: "how-we-use-ai",
    title: {
      en: "How We Use AI: Calculation First, Language Second",
      zh: "我们如何使用 AI：先计算，后语言",
    },
    description: {
      en: "Deterministic engines compute every chart and every draw; AI only turns those calculated facts into language. Why our interpretations are written to be reflective rather than predictive.",
      zh: "每一张命盘与每一次抽牌都由确定性的引擎计算完成，AI 只负责把这些既定事实转写成语言。本文解释我们的解读为何是照见式的，而非预言式的。",
    },
    minutes: 6,
    sections: [
      {
        heading: { en: "Two layers, kept separate", zh: "两层结构，严格分离" },
        body: {
          en: "This platform is built in two layers. The first is a set of deterministic engines: astronomical and calendrical computation for charts, and a shuffling mechanism for card draws. The same birth data always produces the same chart. A draw's randomness comes from the shuffle itself — never from an AI's opinion.\n\nThe second layer is language. An AI model receives the finished calculations and writes them up as readable prose in your language. The boundary between the layers is deliberate, and it opens in one direction only: facts flow from the engines into the writing, never the other way around.",
          zh: "这个平台由两层构成。第一层是一组确定性的引擎：负责星盘与命盘的天文历法运算，以及抽牌的洗牌机制。同样的出生信息，永远得到同样的盘；抽牌的随机性来自洗牌程序本身——从来不来自任何 AI 的“想法”。\n\n第二层才是语言。AI 模型接收已经完成的计算结果，把它写成通顺易读、贴合你语言习惯的文字。两层之间的边界是刻意设计的，而且只朝一个方向打开：事实从引擎流向文字，绝不反向。",
        },
      },
      {
        heading: { en: "What the engines do", zh: "引擎负责什么" },
        body: {
          en: "For astrology, planetary positions come from established astronomical methods — ephemeris calculation — and the Ascendant and houses are derived from your birth time and place. For BaZi, calendar conversion, solar-term boundaries, and the four pillars are produced by calendrical algorithms.\n\nFor tarot, the moment you draw, a random shuffle fixes which cards appear and whether each is upright or reversed. Before any interpretation begins, the facts of your reading are already settled.\n\nAll of this is reproducible. The same inputs yield the same chart every time, and anyone with sound tools can verify the computation.",
          zh: "占星方面：行星位置来自成熟的天文方法——星历计算；上升与宫位由你的出生时间和地点推导。八字方面：公历与干支历的换算、节气边界的判断、四柱的排布，全部由历法算法完成。\n\n塔罗方面：在你抽牌的那一刻，随机洗牌就已确定哪些牌出现、每张是正位还是逆位。在任何解读开始之前，这次占卜的事实已经落定。\n\n所有这些都是可复现的：同样的输入永远得到同样的盘，任何人用可靠的工具都可以验证这些计算。",
        },
      },
      {
        heading: { en: "What the AI does — and never does", zh: "AI 做什么——以及绝不做什么" },
        body: {
          en: "What the AI does: it receives a structured list of computed facts — for example, Day Master: Yi Wood; Sun in Libra; The Star, upright, in the “present” position — and composes an interpretation that is readable, warm, and consistent with those facts, in your language.\n\nWhat it never does: it never selects or reorders cards. It never computes or adjusts a planetary position or a pillar. It never adds placements the engines did not produce, and it never speaks about your future with certainty. If the engines did not calculate it, the AI has nothing to say about it.",
          zh: "AI 做的事：接收一份结构化的事实清单——例如“日主：乙木；太阳在天秤座；‘现状’位置抽到正位的星星”——然后据此写出一段可读、有温度、并且与事实一致的解读，用你的语言。\n\nAI 绝不做的事：它从不选牌，也不改变牌序；从不计算或修改任何行星位置与干支；从不添加引擎没有算出的内容；也从不以确定的口吻谈论你的未来。引擎没有算出的东西，AI 就无从谈起。",
        },
      },
      {
        heading: { en: "Reflective, not predictive", zh: "是照见，不是预言" },
        body: {
          en: "Our interpretations are deliberately written in the language of reflection — may, might, consider — because that is what symbol systems are for. Your future is not fixed by a card or a chart, and a reading is at its best when it helps you think, not when it tells you what will happen.\n\nThere is also a technical honesty here: language models are good at fluent text, not at knowing facts. That is exactly why we keep AI away from the calculations. Facts belong to the engines, wording to the model, judgment to you.\n\nAnd as always: everything here is offered for reflection and exploration. It is not medical, legal, or financial advice, and it is never a substitute for your own good sense.",
          zh: "我们的解读刻意使用反思性的语言——“可能”“或许”“不妨”——因为象征系统的本分就在于此。你的未来不由一张牌或一张盘决定；一次解读最好的样子，是帮你把问题想清楚，而不是告诉你将会发生什么。\n\n这里还有一层技术上的诚实：语言模型擅长的是流畅的文字，而不是“知道”事实。这正是我们让 AI 远离计算环节的另一个原因。事实交给引擎，措辞交给模型，判断留给你。\n\n最后一如既往：这里的一切内容都用于反思与探索，不构成医疗、法律或财务建议，也永远不能替代你自己的清醒判断。",
        },
      },
    ],
  },
];
