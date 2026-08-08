// Bilingual content for the ten BaZi Day Masters (Heavenly Stems), in traditional order 甲乙丙丁戊己庚辛壬癸.
// Tone: reflective, non-deterministic, kind. Traditional imagery preserved.

export interface DayMasterContent {
  slug: string; // "jia-wood" etc.
  stem: string; // pinyin: Jia
  stem_zh: string; // 甲
  element: string; // Wood
  polarity: "Yang" | "Yin";
  title: { en: string; zh: string }; // e.g. "Jia Wood 甲木 — The Tall Tree"
  essence: { en: string; zh: string }; // 2-3 sentences on the archetype
  strengths: { en: string; zh: string }; // 2-3 sentences
  watchouts: { en: string; zh: string }; // 2-3 sentences, kind tone
  reflection: { en: string; zh: string }; // one question
}

export const DAY_MASTERS: DayMasterContent[] = [
  {
    slug: "jia-wood",
    stem: "Jia",
    stem_zh: "甲",
    element: "Wood",
    polarity: "Yang",
    title: {
      en: "Jia Wood 甲木 — The Tall Tree",
      zh: "甲木——参天大树",
    },
    essence: {
      en: "In BaZi imagery, Jia Wood is the tall tree — a pine or oak growing steadily toward the light. It suggests a nature that is upright, principled, and quietly ambitious, preferring to grow in a straight line rather than around obstacles. A tree takes time to root, but once settled it becomes something others can lean on.",
      zh: "在八字的意象里，甲木是参天的大树——像松柏一样，沉着地朝光的方向生长。它或许意味着一种正直、有原则、静静怀着抱负的天性：宁愿笔直地长，也不愿绕着障碍走。大树扎根需要时间，可一旦立稳，便会成为他人可以倚靠的存在。",
    },
    strengths: {
      en: "People with a Jia Wood Day Master often bring integrity, persistence, and a long view. They may be natural stewards — offering shade, steadying a team, keeping a promise across years the way a tree keeps its ring lines.",
      zh: "日主甲木的人往往带来正直、坚持与长远的眼光。他们可能是天生的守护者——为人遮荫，替团队定住阵脚，像树守着年轮一样，把一个承诺守过许多年。",
    },
    watchouts: {
      en: "A tall tree bends less easily than grass. You might notice yourself standing firm when a little flexibility would serve better, or treating a change of course as a defeat. Consider that even the oldest trees lean with the prevailing wind — adjusting is not the same as breaking.",
      zh: "大树不像草那样容易弯。你或许会发现自己在稍作变通更有利的时刻依然站得笔直，或者把改变方向当成认输。不妨想想：最老的树也会顺着常年的风微微倾斜——调整并不等于折断。",
    },
    reflection: {
      en: "Where in your life might bending be a form of strength rather than a loss of principle?",
      zh: "在生活的哪个地方，弯一弯或许是一种力量，而不是原则的失守？",
    },
  },
  {
    slug: "yi-wood",
    stem: "Yi",
    stem_zh: "乙",
    element: "Wood",
    polarity: "Yin",
    title: {
      en: "Yi Wood 乙木 — The Winding Vine",
      zh: "乙木——藤蔓花草",
    },
    essence: {
      en: "Yi Wood is the vine, the orchid, the meadow grass — life that flourishes by winding, weaving, and adapting. It suggests a gentle yet remarkably persistent nature: soft in manner, tenacious in growth. Where the tall tree pushes upward, the vine finds a way around.",
      zh: "乙木是藤蔓、兰草与原野上的花草——靠缠绕、编织与顺势而活的生命。它或许意味着一种温和却极有韧性的天性：姿态柔软，长势顽强。大树向上顶，藤蔓则总能找到绕过去的路。",
    },
    strengths: {
      en: "Those with a Yi Wood Day Master are often perceptive, diplomatic, and resourceful, able to thrive in conditions that would stall others. Their gentleness is easily underestimated — grass stands back up after storms that fell trees.",
      zh: "日主乙木的人常常细腻、机敏、善于周旋，能在让别人止步的环境里活出生机。这份柔软很容易被低估——风暴折断大树之后，草还会重新站起来。",
    },
    watchouts: {
      en: "Leaning is natural to a vine, yet you may sometimes rely too much on outside support, or shape yourself a little too closely to others' expectations. Indirectness, extended too far, can drift into avoidance. Consider naming what you want plainly, once in a while.",
      zh: "攀缘本是藤的天性，但你或许偶尔会过于依赖外部的支撑，或者把自己弯成别人期待的形状。迂回走得太远，也可能悄悄变成回避。不妨偶尔把想要的东西，直接说出口。",
    },
    reflection: {
      en: "What might change if you asked directly for the support you usually gather in quiet, roundabout ways?",
      zh: "如果把平时悄悄绕着弯争取的支持直接开口去要，事情可能会有什么不同？",
    },
  },
  {
    slug: "bing-fire",
    stem: "Bing",
    stem_zh: "丙",
    element: "Fire",
    polarity: "Yang",
    title: {
      en: "Bing Fire 丙火 — The Sun",
      zh: "丙火——普照之日",
    },
    essence: {
      en: "Bing Fire is the sun at midday — radiant, warm, impossible to overlook. It suggests a generous, expressive nature that shines on everyone without keeping accounts. Like sunlight, it can lift a whole room simply by arriving.",
      zh: "丙火是正午的太阳——明亮、温暖、令人无法忽视。它或许意味着一种慷慨而外放的天性：光照到每一个人，从不记账。像阳光一样，只要出现，就能点亮整个房间。",
    },
    strengths: {
      en: "Warmth, optimism, and a natural visibility often mark this Day Master. Bing Fire people may inspire and energize those around them, quick with encouragement and slow to be petty — the sun does not compete with the lamps.",
      zh: "温暖、乐观、天生醒目，常常是这个日主的标志。丙火的人可能很会鼓舞和点燃身边的人：夸赞来得快，计较来得慢——太阳并不需要和灯比亮。",
    },
    watchouts: {
      en: "Shining constantly is the sun's job description, and it is an exhausting one for a person. You might feel obliged to stay bright on your dim days, or notice your intensity overwhelming quieter souls. Consider that dusk, too, belongs to the sun's rhythm.",
      zh: "“永远发光”是太阳的职责说明书，对一个人来说却实在太累。你可能会在自己也黯淡的日子里勉强亮着，或者发现自己的热度让安静的人有些吃不消。不妨记得：黄昏，也是太阳节律的一部分。",
    },
    reflection: {
      en: "Who are you on the days when no one needs your light?",
      zh: "在没有人需要你的光的日子里，你是谁？",
    },
  },
  {
    slug: "ding-fire",
    stem: "Ding",
    stem_zh: "丁",
    element: "Fire",
    polarity: "Yin",
    title: {
      en: "Ding Fire 丁火 — The Lantern Flame",
      zh: "丁火——一盏灯火",
    },
    essence: {
      en: "Ding Fire is the candle, the lantern, the hearth — a focused light that makes its small circle of the world visible and warm. It suggests a thoughtful, attentive nature that illuminates precisely rather than broadly. A candle is soft, yet in a dark room it changes everything.",
      zh: "丁火是烛火、灯笼与炉膛——一小圈专注的光，把身边的世界照得清楚而温暖。它或许意味着一种细致、体贴的天性：不求普照，只求照准。烛光虽然柔弱，在黑暗的房间里却能改变一切。",
    },
    strengths: {
      en: "Ding Fire people often offer warmth in close quarters: insight, devotion to people and craft, and a knack for noticing what others miss. Theirs is a mentor's kind of fire — light handed to exactly where it is needed.",
      zh: "日主丁火的人常常在亲近的距离里给出暖意：有洞察，对人与技艺专注，还总能看见别人忽略的细节。那是一种良师式的火——把光恰好递到需要的地方。",
    },
    watchouts: {
      en: "A flame this fine feels every draft. You may absorb the moods around you, or quietly burn yourself down to keep others lit. Consider tending your own wick as part of the work — shielding a flame is not selfishness.",
      zh: "这样细的火苗，感受得到每一丝穿堂风。你可能会吸收周围的情绪，或者为了照亮别人而悄悄燃烧自己。不妨把照看自己的灯芯也当作正事——护住火苗，并不是自私。",
    },
    reflection: {
      en: "What would it look like to keep a little of your light for yourself?",
      zh: "为自己留一点光，会是什么样子？",
    },
  },
  {
    slug: "wu-earth",
    stem: "Wu",
    stem_zh: "戊",
    element: "Earth",
    polarity: "Yang",
    title: {
      en: "Wu Earth 戊土 — The Mountain",
      zh: "戊土——巍然高山",
    },
    essence: {
      en: "Wu Earth is the mountain, the city wall, the high plateau — mass that does not move for weather. It suggests a steady, protective, self-contained nature that others instinctively trust in a storm. Mountains do not chase; they endure, and things gather around them.",
      zh: "戊土是高山、城墙与高原——不为天气所动的厚重。它或许意味着一种沉稳、有守护感、自成一体的天性：风雨来时，人们会本能地信任山。山不追逐什么，它只是立在那里，而万物自然向它聚拢。",
    },
    strengths: {
      en: "Reliability, calm under pressure, and the ability to hold both boundaries and confidences often mark Wu Earth. In a crisis, they may be the still point the whole room steadies itself against.",
      zh: "可靠、临危不乱、既守得住边界也守得住秘密，常常是戊土的标志。危机之中，他们可能就是整个房间赖以稳住的那个定点。",
    },
    watchouts: {
      en: "What makes you steady can also make you slow to move. You might hold on to positions, habits, or old hurts past their season. Consider that even mountains are gently reshaped by water and time — and remain mountains.",
      zh: "让你稳的东西，也可能让你迟缓。你或许会把立场、习惯甚至旧日的委屈，握到超过了它们的季节。不妨想想：再高的山，也在被水与时间温柔地重塑——而山依然是山。",
    },
    reflection: {
      en: "Is there something you are still holding mainly because you have held it for so long?",
      zh: "有没有什么东西，你至今还握着，主要只是因为已经握了太久？",
    },
  },
  {
    slug: "ji-earth",
    stem: "Ji",
    stem_zh: "己",
    element: "Earth",
    polarity: "Yin",
    title: {
      en: "Ji Earth 己土 — The Garden Soil",
      zh: "己土——田园沃土",
    },
    essence: {
      en: "Ji Earth is the garden soil, the tilled field, the potter's clay — earth that receives seeds and turns them into harvests. It suggests a nurturing, adaptable, quietly capable nature that helps everything around it grow. Soil rarely gets credit for the flowers, and rarely seems to mind.",
      zh: "己土是田园的沃土、翻整过的农田、可塑的陶泥——接住种子、把它们养成收成的土地。它或许意味着一种滋养、随和、静水深流式的能干：让身边的一切更好地生长。土壤很少因为花开而被记住，也似乎并不在意。",
    },
    strengths: {
      en: "Patience, tolerance, and a gift for cultivation often belong to Ji Earth — of people, projects, and places. They may be the ones who make the talent around them productive, accepting many kinds of seeds without judgment.",
      zh: "耐心、包容、善于栽培，常常属于己土——栽培人、栽培事、栽培一方水土。他们可能正是让周围才华结出果实的人，对形形色色的“种子”都不轻易评判。",
    },
    watchouts: {
      en: "Soil absorbs whatever falls on it — rain and runoff alike. You may take in others' burdens and expectations until you are quietly depleted, or say yes out of long habit. Consider that a good field is also given fallow seasons.",
      zh: "土壤照单全收——落下来的是雨水还是浊流，它都吸进去。你可能会把别人的负担与期待一并收下，直到自己悄悄耗空，或者出于多年的习惯而开口就是“好”。不妨记得：一块好田，也会被安排休耕的季节。",
    },
    reflection: {
      en: "What are you growing for yourself — not only for others?",
      zh: "你在为自己种些什么——而不只是为别人？",
    },
  },
  {
    slug: "geng-metal",
    stem: "Geng",
    stem_zh: "庚",
    element: "Metal",
    polarity: "Yang",
    title: {
      en: "Geng Metal 庚金 — The Unforged Blade",
      zh: "庚金——未淬之剑",
    },
    essence: {
      en: "Geng Metal is ore and raw steel — the axe, the sword before its final polish. It suggests a direct, decisive, justice-minded nature that would rather cut cleanly than let things fester. In classical imagery, Geng welcomes the forge: pressure and fire are what turn it into a fine instrument.",
      zh: "庚金是矿石与生铁——是斧钺，是尚未最终开锋的剑。它或许意味着一种直接、果断、重公道的天性：宁可干脆地切开，也不愿让事情烂在原处。在传统意象里，庚金是欢迎熔炉的——压力与火候，正是把它锻成大器的东西。",
    },
    strengths: {
      en: "Decisiveness, candor, and a sworn kind of loyalty often mark Geng Metal. They may be willing to take on the hard, thankless task, and to stand up for people who cannot easily stand up for themselves.",
      zh: "果断、坦率、一诺千金式的忠诚，常常是庚金的标志。他们可能愿意去做吃力不讨好的硬事，也愿意为那些不便为自己出头的人出头。",
    },
    watchouts: {
      en: "A blade's directness can land as bluntness, and cutting through a problem may sometimes nick the people near it. You might also demand more of yourself than any forge would. Consider that timing and warmth are part of a clean cut, too.",
      zh: "刀锋的直接，落在人身上可能就成了生硬；切开问题的时候，偶尔也会碰伤旁边的人。而你对自己的严苛，或许早已超过任何一座熔炉的要求。不妨想想：火候与温度，同样是干净利落的一部分。",
    },
    reflection: {
      en: "Where might softness accomplish what force has not?",
      zh: "有哪些地方，柔软或许能做到强硬一直没能做到的事？",
    },
  },
  {
    slug: "xin-metal",
    stem: "Xin",
    stem_zh: "辛",
    element: "Metal",
    polarity: "Yin",
    title: {
      en: "Xin Metal 辛金 — The Polished Jewel",
      zh: "辛金——珠玉之金",
    },
    essence: {
      en: "Xin Metal is refined metal — jewelry, the needle, the finished blade. It suggests a precise, discerning nature with a quiet pride and an instinct for quality and beauty. Like a gem, it is small, hard, and made to catch the light.",
      zh: "辛金是精炼过的金属——首饰、绣针、已然开锋的薄刃。它或许意味着一种精确、挑剔、带着安静骄傲的天性，对品质与美有着近乎本能的感觉。像一枚宝石：小、硬，生来会接住光。",
    },
    strengths: {
      en: "Taste, precision, and devotion to detail often belong to Xin Metal. They may excel at refinement — of work, spaces, language — and value what is earned through polish. A needle is small, yet it reaches where an axe cannot.",
      zh: "品味、精准、对细节的忠诚，常常属于辛金。他们可能格外擅长打磨——打磨作品、空间与语言——也珍视经由打磨挣来的东西。绣针虽小，却能到达斧头到不了的地方。",
    },
    watchouts: {
      en: "High standards can turn inward as perfectionism, or outward as sharpness over small flaws. Criticism may cut you more deeply than you let on. Consider that unpolished is not the same as unworthy — for your work, and for you.",
      zh: "过高的标准，向内会变成对自己的苛责，向外会变成对小瑕疵的锋利。批评落在你身上的深度，或许远超你表现出来的样子。不妨记得：尚未打磨，并不等于没有价值——你的作品如此，你本人也如此。",
    },
    reflection: {
      en: "What in your life is already good enough, exactly as it is?",
      zh: "你的生活里，有什么此刻原原本本就已经足够好？",
    },
  },
  {
    slug: "ren-water",
    stem: "Ren",
    stem_zh: "壬",
    element: "Water",
    polarity: "Yang",
    title: {
      en: "Ren Water 壬水 — The Open Sea",
      zh: "壬水——江海奔流",
    },
    essence: {
      en: "Ren Water is the great river and the open sea — water moving at scale. It suggests an expansive, resourceful, freedom-loving nature that thinks in currents rather than fences. Big water connects distant shores; so, often, do the people who carry it.",
      zh: "壬水是大江与海洋——成势的、流动着的水。它或许意味着一种开阔、机变、热爱自由的天性：思考的单位是水流，而不是围栏。大水连接遥远的两岸；带着这股水的人，也常常如此。",
    },
    strengths: {
      en: "Adaptability with momentum, breadth of vision, and ease among change and many kinds of people often mark Ren Water. They may be good at carrying others along — toward somewhere genuinely new.",
      zh: "带着势能的适应力、开阔的视野、在变化与形形色色的人之间的自在，常常是壬水的标志。他们或许很会带着大家一起流动——流向真正新的地方。",
    },
    watchouts: {
      en: "Rivers resist containers, and you may resist routine, commitment, or the finishing of things — always sensing another sea beyond. Momentum at this scale can also sweep quieter voices along unnoticed. Consider which banks would turn your force into irrigation rather than flood.",
      zh: "江河天然不喜欢容器，你或许也同样抗拒日常、承诺，或事情的收尾——因为总感觉前方还有另一片海。这样规模的势能，也可能在不经意间裹挟了更安静的声音。不妨想想：什么样的河岸，能让你的力量成为灌溉，而不是漫溢？",
    },
    reflection: {
      en: "Of all your currents, which one truly deserves your depth?",
      zh: "在你众多的水流里，哪一条真正值得你的深度？",
    },
  },
  {
    slug: "gui-water",
    stem: "Gui",
    stem_zh: "癸",
    element: "Water",
    polarity: "Yin",
    title: {
      en: "Gui Water 癸水 — The Morning Dew",
      zh: "癸水——雨露甘霖",
    },
    essence: {
      en: "Gui Water is rain, mist, and morning dew — the gentlest water, which nonetheless reaches everywhere. It suggests a subtle, intuitive, quietly penetrating nature that senses what goes unspoken. Dew never announces itself; things are simply greener where it has been.",
      zh: "癸水是细雨、薄雾与清晨的露水——最轻柔的水，却无处不至。它或许意味着一种细腻、直觉、悄悄渗透的天性：听得见没有说出口的话。露水从不宣告自己的到来，只是它经过的地方，草木更绿。",
    },
    strengths: {
      en: "Intuition, empathy, and imagination often belong to Gui Water. They may nourish people in ways so quiet the help is only recognized later, and perceive undercurrents that others walk straight past.",
      zh: "直觉、共情与想象力，常常属于癸水。他们滋养他人的方式可能安静到事后才被察觉，也总能感知那些被别人径直走过的暗流。",
    },
    watchouts: {
      en: "So much sensitivity can pool into overthinking, or into carrying moods that were never yours. You may also stay invisible past the point of kindness to yourself. Consider that even rain is allowed to be seen falling.",
      zh: "过盛的敏感，容易积成想不完的心事，或让你背起本不属于你的情绪。你也可能把自己藏得太久，久到对自己都算不上温柔。不妨记得：雨，也可以被看见地落下。",
    },
    reflection: {
      en: "What have you been quietly sensing lately that you have not yet said out loud?",
      zh: "最近你隐约感觉到、却还没有说出口的，是什么？",
    },
  },
];
