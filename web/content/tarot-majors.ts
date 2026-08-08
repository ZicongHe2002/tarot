// Rich bilingual content for the 22 Major Arcana cards (Rider–Waite–Smith tradition).
// Tone: reflective, modern, non-deterministic. Copy never predicts fixed outcomes;
// Death / The Devil / The Tower are framed as transformation, attachment, and sudden
// change — explicitly not literal death or disaster.

import type { TarotCardContent } from "./tarot-types";

export const TAROT_MAJORS: TarotCardContent[] = [
  {
    id: 0,
    slug: "the-fool",
    name: { en: "The Fool", zh: "愚者" },
    arcana: "major",
    suit: null,
    number: 0,
    uprightKeywords: {
      en: ["New beginnings", "Spontaneity", "Open-mindedness", "Trust in the journey"],
      zh: ["新的开始", "率性而为", "开放心态", "信任旅程"],
    },
    reversedKeywords: {
      en: ["Hesitation", "Recklessness", "Fear of the unknown", "Holding back"],
      zh: ["犹豫不前", "鲁莽冲动", "畏惧未知", "停滞观望"],
    },
    generalMeaning: {
      en: "The Fool stands at the edge of something new, carrying little more than curiosity. Drawing this card may suggest you are at a threshold — a moment when inexperience could be an asset rather than a flaw. It often invites a beginner's mind: openness, lightness, and a willingness to learn as you go. Consider what becomes possible when you don't need every answer before taking the first step.",
      zh: "愚者站在崭新旅程的起点，行囊很轻，好奇心很满。抽到这张牌，或许意味着你正处在某个门槛前——此刻，“没有经验”未必是短板，反而可能是一种自由。它常常提醒我们保持初学者的心态：开放、轻盈、边走边学。不妨想一想：如果不必等到万事俱备才出发，什么会变得可能？",
    },
    loveMeaning: {
      en: "In relationships, the Fool may point to a fresh openness — approaching love with curiosity instead of a script. If you're partnered, it could suggest bringing playfulness back into familiar routines.",
      zh: "在感情中，愚者可能指向一种新鲜的开放感——带着好奇而非既定剧本去靠近彼此。若你已有伴侣，或许可以试着在熟悉的日常里，重新找回一点玩心。",
    },
    careerMeaning: {
      en: "At work, this card often accompanies new projects, unfamiliar roles, or ideas that haven't been tried before. Consider where a fresh perspective might serve you better than accumulated habit.",
      zh: "在事业上，这张牌常与新项目、陌生领域或未经尝试的想法相伴出现。不妨留意：哪些地方，新视角可能比既有经验更有用？",
    },
    growthMeaning: {
      en: "The Fool invites you to loosen your grip on being the expert. Growth here may come from letting yourself be new at something — and finding that freeing rather than embarrassing.",
      zh: "愚者邀请你放下“必须很在行”的包袱。此刻的成长，可能恰恰来自允许自己重新做个新手——并发现这其实是种解脱，而非难堪。",
    },
    reflectionQuestion: {
      en: "If you trusted yourself a little more, what first step might you take this week?",
      zh: "如果再多信任自己一点，这一周你可能迈出的第一步是什么？",
    },
    actionPrompt: {
      en: "Write down one thing you've been curious to try, and give it thirty unpressured minutes this week.",
      zh: "写下一件你一直想尝试的小事，本周给它三十分钟，不求结果，只管体验。",
    },
    imagePath: "/images/tarot/the-fool.svg",
  },
  {
    id: 1,
    slug: "the-magician",
    name: { en: "The Magician", zh: "魔术师" },
    arcana: "major",
    suit: null,
    number: 1,
    uprightKeywords: {
      en: ["Focused intention", "Resourcefulness", "Skillful action", "Initiative"],
      zh: ["专注意图", "善用资源", "施展才能", "主动开创"],
    },
    reversedKeywords: {
      en: ["Scattered energy", "Self-doubt", "Untapped potential", "Style over substance"],
      zh: ["精力分散", "自我怀疑", "潜力未展", "华而不实"],
    },
    generalMeaning: {
      en: "The Magician gathers all four tools of the tarot on one table, suggesting that what you need may already be within reach. This card often points to a moment of focus, when intention and skill line up. It could be an invitation to move from thinking about a goal to actively shaping it. Consider what you could build with exactly the resources you have now.",
      zh: "魔术师的桌上摆着塔罗的四种象征之物，这个画面在暗示：你需要的资源，可能早已触手可及。这张牌常指向一个凝神聚气的时刻——意图与能力恰好对齐。它或许是在邀请你，把“想做”变成“着手做”。不妨想想：仅凭现在手中的资源，你已经可以开始搭建什么？",
    },
    loveMeaning: {
      en: "In love, the Magician may suggest showing up with intention — saying what you mean and following through. Small, deliberate gestures could carry more weight than grand plans right now.",
      zh: "在感情里，魔术师或许在提示你带着诚意与用心去相处——想说的话认真说，答应的事尽力做。此刻，细小而用心的举动，可能比宏大的计划更能传递心意。",
    },
    careerMeaning: {
      en: "Professionally, this card often marks a window for initiative: pitching the idea, starting the draft, making the call. Your existing skills may be more transferable than you assume.",
      zh: "在工作中，这张牌常意味着一个适合主动出击的窗口：提出那个想法、写下第一稿、拨出那通电话。你已有的能力，或许比你以为的更能派上用场。",
    },
    growthMeaning: {
      en: "Growth with the Magician is about closing the gap between intention and action. Consider practicing follow-through on small commitments, so your word to yourself starts to feel solid.",
      zh: "魔术师所指向的成长，在于缩短“想”与“做”之间的距离。不妨从兑现对自己的小承诺开始练习，让“说到做到”慢慢成为你内在的底气。",
    },
    reflectionQuestion: {
      en: "What do you already have — skills, tools, people — that this goal actually requires?",
      zh: "实现这个目标所需要的能力、工具或人脉，哪些其实你已经拥有？",
    },
    actionPrompt: {
      en: "List the resources you already hold for one current goal, then take the single smallest next step today.",
      zh: "为一个当前的目标列出你已有的资源，然后在今天完成其中最小的一步。",
    },
    imagePath: "/images/tarot/the-magician.svg",
  },
  {
    id: 2,
    slug: "the-high-priestess",
    name: { en: "The High Priestess", zh: "女祭司" },
    arcana: "major",
    suit: null,
    number: 2,
    uprightKeywords: {
      en: ["Intuition", "Inner wisdom", "Stillness", "The unspoken"],
      zh: ["直觉", "内在智慧", "静观", "言外之意"],
    },
    reversedKeywords: {
      en: ["Ignored instincts", "Inner static", "Surface judgments", "Self-disconnection"],
      zh: ["忽视直觉", "内心嘈杂", "流于表面", "自我疏离"],
    },
    generalMeaning: {
      en: "The High Priestess sits between two pillars, keeper of what isn't said aloud. This card may suggest that the answer you're seeking won't come from more research or more opinions, but from a quieter kind of knowing. It often appears when it's worth pausing before acting, letting things reveal themselves. Consider making room for stillness and seeing what surfaces.",
      zh: "女祭司端坐于两根石柱之间，守护着那些无法言说的部分。这张牌可能在提示：你要找的答案，未必来自更多的资料或他人的意见，而来自一种更安静的知晓。它常出现在值得先停一停、让事情自行显现的时刻。不妨为自己留出一段静默，看看会浮现什么。",
    },
    loveMeaning: {
      en: "In relationships, the High Priestess may invite you to listen beneath the words — your own feelings included. Something may need time to surface before it can be discussed.",
      zh: "在感情中，女祭司或许在邀请你去听语言之下的东西，也包括你自己真实的感受。有些心绪需要时间沉淀，才谈得清楚。",
    },
    careerMeaning: {
      en: "At work, this card could suggest observing before committing. Your professional instincts may be picking up on something the data hasn't confirmed yet — note it, even if you don't act on it immediately.",
      zh: "在职场上，这张牌可能建议你先观察、再表态。你的职业直觉或许已捕捉到一些数据尚未证实的信号——即使暂不行动，也不妨先记下来。",
    },
    growthMeaning: {
      en: "Growth here may mean rebuilding trust with your inner voice. The more often you pause and check in with yourself, the clearer that voice tends to become.",
      zh: "此刻的成长，可能在于重建你与内在声音的信任。越是常常停下来问问自己，那个声音往往就越清晰。",
    },
    reflectionQuestion: {
      en: "When you stop asking everyone else, what does your quietest inner voice say?",
      zh: "当你不再四处询问别人，你心里最安静的那个声音在说什么？",
    },
    actionPrompt: {
      en: "Before your next meaningful decision, sit quietly for ten minutes and write down your first unedited instinct.",
      zh: "在下一个重要决定之前，安静地坐十分钟，把未经修饰的第一直觉写下来。",
    },
    imagePath: "/images/tarot/the-high-priestess.svg",
  },
  {
    id: 3,
    slug: "the-empress",
    name: { en: "The Empress", zh: "女皇" },
    arcana: "major",
    suit: null,
    number: 3,
    uprightKeywords: {
      en: ["Nurturing", "Creativity", "Abundance", "Sensory comfort"],
      zh: ["滋养", "创造力", "丰盛", "感官愉悦"],
    },
    reversedKeywords: {
      en: ["Depletion", "Creative block", "Over-giving", "Neglected self-care"],
      zh: ["能量透支", "创意受阻", "过度付出", "疏于自我照顾"],
    },
    generalMeaning: {
      en: "The Empress presides over a landscape in full bloom — creativity, care, and the pleasures of the senses. Drawing her may suggest a season for nurturing something: a project, a relationship, or your own well-being. She often reminds us that growth can't be forced, only tended. Consider what in your life is quietly asking to be fed rather than fixed.",
      zh: "女皇坐在一片丰饶盛开的原野之中，掌管创造、照料与感官的愉悦。抽到她，或许意味着眼下是一个滋养的季节——去培育一个计划、一段关系，或你自己的身心。她常常提醒我们：生长无法强求，只能悉心照料。不妨想想，生活里有什么正在轻声地说：我需要被滋养，而不是被修理。",
    },
    loveMeaning: {
      en: "In love, the Empress may point to warmth, generosity, and comfort in each other's presence. It could be a good moment to express care through the senses — a shared meal, a real embrace, undivided attention.",
      zh: "在感情中，女皇可能指向温暖、慷慨，以及彼此相伴的松弛感。此刻，不妨用可感的方式表达在乎——一顿一起做的饭、一个真实的拥抱、一段不看手机的专注时光。",
    },
    careerMeaning: {
      en: "Professionally, this card often favors cultivation over conquest: developing an idea patiently, mentoring someone, improving the environment you work in. What you tend consistently may grow further than what you push hard.",
      zh: "在事业上，这张牌更偏向“培育”而非“攻占”：耐心打磨一个想法、带一带新人、把工作环境经营得更舒适。持续照料的事物，往往比用力硬推的长得更好。",
    },
    growthMeaning: {
      en: "The Empress asks how well you mother yourself. Growth may look less like discipline right now and more like rest, nourishment, and permission to enjoy things.",
      zh: "女皇在问：你是否也这样善待自己？此刻的成长，或许不像自律，更像休息、好好吃饭，以及允许自己享受生活。",
    },
    reflectionQuestion: {
      en: "Where could you offer yourself the same care you so readily give to others?",
      zh: "你那么擅长照顾别人——同样的关怀，可以分一些给自己吗？",
    },
    actionPrompt: {
      en: "Do one genuinely nourishing thing today — cook something good, tend a plant, or rest without a screen.",
      zh: "今天为自己做一件真正滋养的小事：认真做顿饭、照料一盆植物，或放下手机好好休息一会儿。",
    },
    imagePath: "/images/tarot/the-empress.svg",
  },
  {
    id: 4,
    slug: "the-emperor",
    name: { en: "The Emperor", zh: "皇帝" },
    arcana: "major",
    suit: null,
    number: 4,
    uprightKeywords: {
      en: ["Structure", "Stability", "Leadership", "Healthy boundaries"],
      zh: ["秩序", "稳定", "领导力", "清晰界限"],
    },
    reversedKeywords: {
      en: ["Rigidity", "Over-control", "Authority struggles", "Shaky foundations"],
      zh: ["僵化固执", "过度掌控", "权威角力", "根基不稳"],
    },
    generalMeaning: {
      en: "The Emperor brings order to what the Empress grows — structure, boundaries, and steady leadership. This card may suggest that your next chapter benefits from clearer rules of engagement: with your time, your work, or the people around you. Structure here isn't a cage; it could be the frame that lets things stand. Consider where a firmer foundation would actually give you more freedom.",
      zh: "皇帝为女皇孕育的一切建立秩序——结构、界限，以及沉稳的担当。这张牌可能在说：接下来的阶段，你需要更清晰的规则——关于时间、工作，或与人相处的分寸。结构并非牢笼，它可能恰是让事物立得住的骨架。不妨想想：哪里多一点稳固的地基，反而会带来更多自由？",
    },
    loveMeaning: {
      en: "In relationships, the Emperor may point to reliability and clear expectations — knowing where each of you stands. Steadiness, honestly offered, can be its own form of tenderness.",
      zh: "在感情中，皇帝可能指向可靠与明确——彼此知道对方的位置与边界。坦然给出的稳定感，本身就是一种温柔。",
    },
    careerMeaning: {
      en: "At work, this card often favors planning, systems, and taking responsibility for outcomes. It could be a moment to organize what has grown messy, or to step into a leadership role you've been circling.",
      zh: "在工作中，这张牌通常有利于规划、建立制度与承担结果。或许正是整顿混乱、或正式接过那份你一直在观望的责任的时机。",
    },
    growthMeaning: {
      en: "Growth with the Emperor may mean becoming your own steady authority — setting boundaries you keep, and rules that serve you rather than confine you.",
      zh: "皇帝所指的成长，可能是成为自己稳定的主心骨：立下守得住的界限，定下服务于你、而非束缚你的规则。",
    },
    reflectionQuestion: {
      en: "Where in your life would a little more structure actually set you free?",
      zh: "生活中的哪个角落，多一点秩序反而会让你更自由？",
    },
    actionPrompt: {
      en: "Choose one recurring source of chaos and give it a simple rule or routine this week.",
      zh: "选一个反复让你头疼的混乱之处，本周为它定一条简单的规则或固定流程。",
    },
    imagePath: "/images/tarot/the-emperor.svg",
  },
  {
    id: 5,
    slug: "the-hierophant",
    name: { en: "The Hierophant", zh: "教皇" },
    arcana: "major",
    suit: null,
    number: 5,
    uprightKeywords: {
      en: ["Tradition", "Guidance", "Mentorship", "Shared values"],
      zh: ["传统", "引导", "良师", "共同价值"],
    },
    reversedKeywords: {
      en: ["Questioning convention", "Dogma", "A personal path", "Outgrown rules"],
      zh: ["质疑成规", "教条束缚", "自辟蹊径", "打破惯例"],
    },
    generalMeaning: {
      en: "The Hierophant is the keeper of tradition — teachings, institutions, and wisdom passed down rather than invented alone. This card may suggest there's value in learning from those who've walked this path before you. It can also raise a quieter question: which conventions still serve you, and which you follow out of habit. Consider where guidance would help, and where your own judgment is ready.",
      zh: "教皇是传统的守护者——那些代代相传、而非独自摸索出的教导与智慧。这张牌可能在提示：前人走过的路，值得借鉴。它同时也在轻声发问：哪些惯例仍在滋养你，哪些只是习惯性的沿袭？不妨分辨一下：何处需要引路人，何处你自己的判断已经足够成熟。",
    },
    loveMeaning: {
      en: "In love, the Hierophant may point to shared values, commitment, and the traditions two people build together. It could be worth talking about what 'us' means in the long run.",
      zh: "在感情中，教皇可能关乎共同的价值观、承诺，以及两个人一起建立的小传统。或许值得聊一聊：从长远看，“我们”意味着什么。",
    },
    careerMeaning: {
      en: "Professionally, this card often favors established paths: formal learning, certification, mentorship, or working within a system before reshaping it. A teacher or senior colleague may have more to offer than you expect.",
      zh: "在职业上，这张牌通常指向成熟的路径：系统学习、考取资质、寻求前辈指点，或先融入体系再谈改造。一位良师或资深同事，或许能给你意料之外的帮助。",
    },
    growthMeaning: {
      en: "Growth here may come from engaging with a body of wisdom larger than your own experience — then deciding, consciously, what you keep. Inherited answers deserve examination, not automatic acceptance or rejection.",
      zh: "此刻的成长，可能来自与一套比个人经验更深厚的智慧对话——然后有意识地决定去留。对于承袭而来的答案，值得认真审视，而非照单全收或一概推翻。",
    },
    reflectionQuestion: {
      en: "Which beliefs you've inherited still fit the person you're becoming?",
      zh: "那些从小接受的观念里，哪些仍然适合正在成长的你？",
    },
    actionPrompt: {
      en: "Reach out to someone whose experience you respect and ask them one genuine question.",
      zh: "联系一位你敬重的前辈或朋友，认真向对方请教一个你真正想弄明白的问题。",
    },
    imagePath: "/images/tarot/the-hierophant.svg",
  },
  {
    id: 6,
    slug: "the-lovers",
    name: { en: "The Lovers", zh: "恋人" },
    arcana: "major",
    suit: null,
    number: 6,
    uprightKeywords: {
      en: ["Meaningful connection", "Aligned values", "Conscious choice", "Harmony"],
      zh: ["心意相通", "价值契合", "清醒选择", "和谐"],
    },
    reversedKeywords: {
      en: ["Misalignment", "Indecision", "Inner conflict", "Disharmony"],
      zh: ["价值分歧", "犹豫不决", "内在冲突", "关系失衡"],
    },
    generalMeaning: {
      en: "The Lovers is a card of meaningful connection — and of the choices that define us. It may suggest a moment where alignment matters: between two people, or between your decisions and your values. Beyond romance, it often asks whether your outer commitments match your inner truth. Consider what choosing wholeheartedly would look like here.",
      zh: "恋人牌关乎深刻的联结，也关乎那些定义了我们的选择。它可能指向一个“对齐”的时刻：两个人之间的同频，或你的决定与内心价值的一致。在爱情之外，它也常在追问：你对外的承诺，是否与内在的真实相符？不妨想想，在这件事上，“全心全意的选择”会是什么样子。",
    },
    loveMeaning: {
      en: "In relationships, the Lovers may point to genuine closeness — being seen and choosing each other consciously. If a decision is on the table, it could help to name what you truly want, not just what seems workable.",
      zh: "在感情中，恋人牌可能指向真实的亲密——被看见，也清醒地选择彼此。如果正面临抉择，不妨先说清自己真正想要的，而不只是“看起来可行”的。",
    },
    careerMeaning: {
      en: "At work, this card often marks a values-based decision: a role, partnership, or direction that needs to fit who you are, not just pay the bills. Alignment now may matter more than optimization.",
      zh: "在事业上，这张牌常意味着一个关乎价值观的抉择：一份工作、一次合作或一个方向，需要与你是谁相契，而不仅仅是划算。此刻，“合适”可能比“最优”更重要。",
    },
    growthMeaning: {
      en: "Growth with the Lovers may mean taking full ownership of your choices — including the quiet ones made by default. Choosing consciously, even imperfectly, tends to feel more like yourself.",
      zh: "恋人牌指向的成长，是为自己的选择完全负责——包括那些不知不觉“默认”下来的。有意识地选择，哪怕不完美，也往往更接近真实的你。",
    },
    reflectionQuestion: {
      en: "If this choice had to reflect your deepest values, which option would you take?",
      zh: "如果这个选择必须忠于你最深的价值观，你会选哪一边？",
    },
    actionPrompt: {
      en: "For one decision you're facing, write down the two or three values you most want it to honor.",
      zh: "针对一个正在面临的抉择，写下你最希望它守护的两三个价值。",
    },
    imagePath: "/images/tarot/the-lovers.svg",
  },
  {
    id: 7,
    slug: "the-chariot",
    name: { en: "The Chariot", zh: "战车" },
    arcana: "major",
    suit: null,
    number: 7,
    uprightKeywords: {
      en: ["Determination", "Willpower", "Direction", "Momentum"],
      zh: ["决心", "意志力", "方向感", "前进动能"],
    },
    reversedKeywords: {
      en: ["Lost direction", "Scattered drive", "Forcing outcomes", "Running on empty"],
      zh: ["方向迷失", "动力涣散", "强行推进", "后劲不足"],
    },
    generalMeaning: {
      en: "The Chariot moves forward by holding two opposing forces in balance — will and restraint, drive and direction. This card may suggest momentum is available to you now, if you can keep your hands steady on the reins. It often appears when focus, not force, is what wins the day. Consider what deserves your full drive, and what is merely pulling at it.",
      zh: "战车之所以能前进，是因为驾驭了两股相反的力量——意志与克制、冲劲与方向。这张牌可能在说：此刻动能就在你手中，关键是握稳缰绳。它常出现在“专注胜过蛮力”的时刻。不妨分清：什么值得你全力以赴，什么只是在分散你的力气。",
    },
    loveMeaning: {
      en: "In love, the Chariot may suggest being clear about where you're headed — as a couple, or as someone seeking connection. Steady, honest effort could matter more than grand gestures right now.",
      zh: "在感情中，战车或许在提醒你想清楚这段关系（或这份期待）要驶向哪里。此刻，持续而诚恳的用心，可能比轰轰烈烈的表白更有分量。",
    },
    careerMeaning: {
      en: "Professionally, this card often signals a push phase: a deadline, a launch, a goal within reach if you stay disciplined. Guard your focus — scattered effort may be the main risk.",
      zh: "在工作中，这张牌常对应一个冲刺阶段：截止期、发布日，或一个咬牙可及的目标。请守住你的专注——此刻最大的风险，可能是精力被摊薄。",
    },
    growthMeaning: {
      en: "Growth here may mean learning to steer yourself — noticing when you're driven by intention versus dragged by impulse. Direction is a skill, and it tends to improve with honest practice.",
      zh: "此刻的成长，在于学会驾驭自己：分辨此刻是意图在引领，还是冲动在拖拽。方向感是一种能力，会在诚实的练习中越来越稳。",
    },
    reflectionQuestion: {
      en: "Where are you actually steering right now — and is it where you want to go?",
      zh: "此刻你正驶向哪里——那真的是你想去的方向吗？",
    },
    actionPrompt: {
      en: "Pick your single most important goal this week and remove one specific distraction from its path.",
      zh: "选出本周最重要的一个目标，并从它的路上移走一个具体的干扰源。",
    },
    imagePath: "/images/tarot/the-chariot.svg",
  },
  {
    id: 8,
    slug: "strength",
    name: { en: "Strength", zh: "力量" },
    arcana: "major",
    suit: null,
    number: 8,
    uprightKeywords: {
      en: ["Quiet courage", "Patience", "Compassion", "Inner strength"],
      zh: ["温柔的勇气", "耐心", "悲悯", "内在力量"],
    },
    reversedKeywords: {
      en: ["Self-doubt", "Forcing it", "Depleted courage", "Harsh inner critic"],
      zh: ["自我怀疑", "硬撑逞强", "勇气耗竭", "苛责自己"],
    },
    generalMeaning: {
      en: "Strength shows a figure calming a lion with a gentle hand — power expressed as patience, not domination. This card may suggest that what you're facing responds better to steadiness and compassion than to force. It often points to quiet courage: the kind that endures, soothes, and stays. Consider what might soften if you approached it gently.",
      zh: "力量牌上，一位女子以温柔的手安抚狮子——真正的力量是耐心，而非压制。这张牌可能在说：你眼前的难题，更吃“柔”而不吃“硬”。它常指向一种安静的勇气：能承受、能安抚、能守在原地不走。不妨试试温柔以待，看看什么会随之松动。",
    },
    loveMeaning: {
      en: "In relationships, Strength may invite patience with each other's rough edges — and your own. Gentleness in a hard conversation could achieve what insistence hasn't.",
      zh: "在感情中，力量牌或许在邀请你对彼此的棱角多些耐心——也包括对自己的。一次艰难的对话里，温和有时能抵达坚持抵达不了的地方。",
    },
    careerMeaning: {
      en: "At work, this card often favors composure: handling friction without escalating, holding your ground without hardening. Influence built on steadiness tends to outlast influence built on volume.",
      zh: "在职场上，这张牌看重的是沉得住气：化解摩擦而不升级冲突，守住立场而不咄咄逼人。靠沉稳建立的影响力，往往比靠声量赢来的更持久。",
    },
    growthMeaning: {
      en: "Growth with Strength may mean befriending your own instincts instead of fighting them. The inner critic rarely tames anything; a kinder, firmer voice often can.",
      zh: "力量牌指向的成长，是与自己的本能和解，而不是与之搏斗。苛责很少能驯服什么；温和而坚定的声音，往往可以。",
    },
    reflectionQuestion: {
      en: "What in your life might respond to gentleness where force has failed?",
      zh: "生活中有什么，是用力解决不了、却可能被温柔化解的？",
    },
    actionPrompt: {
      en: "Catch one harsh thing you say to yourself today and restate it the way you'd say it to a friend.",
      zh: "今天留意一句你对自己说的重话，把它改成你会对好朋友说的版本。",
    },
    imagePath: "/images/tarot/strength.svg",
  },
  {
    id: 9,
    slug: "the-hermit",
    name: { en: "The Hermit", zh: "隐士" },
    arcana: "major",
    suit: null,
    number: 9,
    uprightKeywords: {
      en: ["Solitude", "Reflection", "Inner guidance", "Seeking wisdom"],
      zh: ["独处", "内省", "内在指引", "探寻智慧"],
    },
    reversedKeywords: {
      en: ["Isolation", "Withdrawal", "Avoidance", "Time to re-engage"],
      zh: ["过度孤立", "自我封闭", "回避现实", "重返人群的时机"],
    },
    generalMeaning: {
      en: "The Hermit withdraws from the noise to seek a light he can only find alone. This card may suggest that your next answer lives in solitude, reflection, or deliberate quiet. It's rarely about escaping the world — more about stepping back far enough to see it clearly. Consider what question you'd finally hear if things went quiet.",
      zh: "隐士退到喧嚣之外，去寻找一盏只能独自找到的灯。这张牌可能在说：你要的答案，藏在独处、内省或刻意的安静里。它并非要你逃离世界，而是退后一步，把世界看得更清楚。不妨想想：如果周围真的静下来，你会听见自己在问什么？",
    },
    loveMeaning: {
      en: "In love, the Hermit may point to a need for space that isn't rejection — time to understand your own heart. Being honest about needing quiet could prevent misunderstandings later.",
      zh: "在感情中，隐士可能意味着一种并非疏远的空间感——留些时间弄懂自己的心。坦白说出“我需要独处一会儿”，或许能避免日后的误会。",
    },
    careerMeaning: {
      en: "Professionally, this card often favors deep work over visibility: research, review, strategy thought through in private. Stepping back from the daily churn may reveal what busy-ness has been hiding.",
      zh: "在工作上，这张牌更偏向深度工作而非曝光度：调研、复盘、独自想透的战略。从日常的忙碌里抽身片刻，或许能看清忙碌一直遮住的东西。",
    },
    growthMeaning: {
      en: "Growth here may come from befriending solitude — discovering that your own company can be a source of wisdom rather than loneliness. What you find in the quiet, you can carry back to everything else.",
      zh: "此刻的成长，可能来自与独处交朋友——发现一个人的时光可以是智慧的来源，而非孤单的证明。你在安静中寻得的，也会随你带回到生活的其他部分。",
    },
    reflectionQuestion: {
      en: "What question keeps returning whenever your life goes quiet?",
      zh: "每当生活安静下来，总会浮现的那个问题是什么？",
    },
    actionPrompt: {
      en: "Block one unplugged hour this week — no screens, no tasks — and simply notice where your mind goes.",
      zh: "本周留出一小时不插电的时间——没有屏幕、没有任务——只是看看你的思绪会去往哪里。",
    },
    imagePath: "/images/tarot/the-hermit.svg",
  },
  {
    id: 10,
    slug: "wheel-of-fortune",
    name: { en: "Wheel of Fortune", zh: "命运之轮" },
    arcana: "major",
    suit: null,
    number: 10,
    uprightKeywords: {
      en: ["Cycles", "Turning points", "Change", "Timing"],
      zh: ["周期流转", "转折点", "变化", "时机"],
    },
    reversedKeywords: {
      en: ["Resisting change", "Feeling stuck", "External headwinds", "A waiting season"],
      zh: ["抗拒变化", "停滞感", "外部阻力", "静待时机"],
    },
    generalMeaning: {
      en: "The Wheel of Fortune turns through seasons of rising and falling, reminding us that change is the one constant. This card may suggest you're at a turning point — circumstances shifting in ways not entirely in your control. Rather than predicting luck, it invites flexibility: reading the moment and adjusting your grip. Consider what this season is asking of you, and what it may be making room for.",
      zh: "命运之轮不停转动，起与落交替如四季，提醒我们变化才是唯一的不变。这张牌可能意味着你正处在一个转折点上——时势在变，且并不完全由你掌控。它并非预言运气，而是邀请你保持柔韧：读懂当下，调整姿态。不妨想想：这个阶段在向你要求什么，又可能在为什么腾出空间？",
    },
    loveMeaning: {
      en: "In relationships, the Wheel may point to a phase change — a new rhythm, shifting circumstances, a chapter turning. Meeting change together, rather than resisting it separately, could deepen the bond.",
      zh: "在感情中，命运之轮可能对应一个阶段的更替——新的节奏、境遇的变化、一页翻向下一页。与其各自抗拒变化，不如一起面对，这或许反而能加深联结。",
    },
    careerMeaning: {
      en: "At work, this card often accompanies shifting conditions: reorganizations, market turns, opportunities that appear on their own schedule. Staying adaptable and prepared may matter more than trying to time everything perfectly.",
      zh: "在职场上，这张牌常伴随环境的变动：组织调整、行情转向、不按计划出现的机会。保持弹性、做好准备，可能比试图精准踩点更重要。",
    },
    growthMeaning: {
      en: "Growth with the Wheel may mean making peace with what you can't control — and getting very clear about what you can. Your response to circumstance is the part that's always yours.",
      zh: "命运之轮指向的成长，是与不可控之事和解，同时看清哪些是你可控的。无论境遇如何，你的回应方式，永远属于你自己。",
    },
    reflectionQuestion: {
      en: "Which cycle in your life feels like it's turning right now — and how do you want to meet it?",
      zh: "你生活中的哪个周期正在转动——你想以怎样的姿态迎接它？",
    },
    actionPrompt: {
      en: "Write two short lists for this week: what's within your control, and what isn't. Act only on the first.",
      zh: "为这一周列两张小清单：可控之事与不可控之事，然后只在第一张上行动。",
    },
    imagePath: "/images/tarot/wheel-of-fortune.svg",
  },
  {
    id: 11,
    slug: "justice",
    name: { en: "Justice", zh: "正义" },
    arcana: "major",
    suit: null,
    number: 11,
    uprightKeywords: {
      en: ["Fairness", "Truth", "Accountability", "Clear weighing"],
      zh: ["公正", "真相", "承担责任", "明晰权衡"],
    },
    reversedKeywords: {
      en: ["Imbalance", "Avoided truths", "Unfairness", "Self-honesty needed"],
      zh: ["失衡", "回避真相", "有失公允", "需对己诚实"],
    },
    generalMeaning: {
      en: "Justice holds the scales and the sword: clear seeing, fair weighing, and accountability for what follows. This card may suggest a moment for honest assessment — of a situation, a decision, or your own part in things. It often reminds us that actions and consequences are connected, gently but reliably. Consider what the most truthful version of this story sounds like.",
      zh: "正义手持天平与长剑：看得清、称得准，并为结果负责。这张牌可能在提示，此刻适合做一次诚实的评估——审视一个处境、一项决定，或你自己在其中扮演的角色。它温和却可靠地提醒着：行为与结果彼此相连。不妨问问自己：这件事最接近真相的版本，究竟是什么样的？",
    },
    loveMeaning: {
      en: "In relationships, Justice may call for fairness — in how effort, voice, and responsibility are shared. An honest, balanced conversation could clear more air than a passionate one.",
      zh: "在感情中，正义可能在关注公平：付出、话语权与责任是否大致相称。一次坦诚而克制的对话，或许比一场激烈的争论更能澄清心结。",
    },
    careerMeaning: {
      en: "Professionally, this card often touches decisions, agreements, and being answerable for outcomes. It may be worth documenting things clearly and making sure commitments cut both ways.",
      zh: "在工作中，这张牌常涉及决策、协议，以及对结果的担当。把事情落在纸面、确认承诺是双向的，或许正当其时。",
    },
    growthMeaning: {
      en: "Growth with Justice may mean telling yourself the truth without flattery or self-punishment. Owning your part — no more, no less — tends to be where real change starts.",
      zh: "正义指向的成长，是不加美化、也不过度苛责地对自己说实话。承认属于你的那一份——不多也不少——真正的改变往往由此开始。",
    },
    reflectionQuestion: {
      en: "If you looked at this situation without protecting your own image, what would you see?",
      zh: "如果不急着维护自己的形象，再看这件事，你会看到什么？",
    },
    actionPrompt: {
      en: "Take one decision you're weighing and write the facts in one column, your feelings in another.",
      zh: "选一个正在权衡的决定，把“事实”和“感受”分成两栏，各自写下来。",
    },
    imagePath: "/images/tarot/justice.svg",
  },
  {
    id: 12,
    slug: "the-hanged-man",
    name: { en: "The Hanged Man", zh: "倒吊人" },
    arcana: "major",
    suit: null,
    number: 12,
    uprightKeywords: {
      en: ["New perspective", "Pause", "Letting go", "Willing surrender"],
      zh: ["转换视角", "暂停", "放下执念", "顺势而为"],
    },
    reversedKeywords: {
      en: ["Stalling", "Resisting the pause", "Pointless sacrifice", "Restlessness"],
      zh: ["原地空转", "抗拒暂停", "无谓牺牲", "焦躁不安"],
    },
    generalMeaning: {
      en: "The Hanged Man hangs upside down by choice, and from there the world looks entirely different. This card may suggest that progress right now comes not from pushing harder, but from pausing and changing your vantage point. What feels like suspension could actually be incubation. Consider what you might understand if you stopped struggling against the wait.",
      zh: "倒吊人自愿倒悬，于是世界在他眼中呈现出全然不同的样子。这张牌可能在说：此刻的进展，不靠更用力地推，而靠停下来、换个角度看。看似悬置的时光，也许正是酝酿的时光。不妨想想：如果不再与等待较劲，你可能会明白些什么？",
    },
    loveMeaning: {
      en: "In love, the Hanged Man may invite you to release the need to resolve everything right now. Genuinely trying to see the relationship from the other person's angle could shift the whole picture.",
      zh: "在感情中，倒吊人或许在邀请你放下“必须马上解决”的执念。真正试着站到对方的角度看这段关系，整个画面可能都会不一样。",
    },
    careerMeaning: {
      en: "At work, this card often marks a productive pause: a delayed project, a decision that isn't ready, a strategy that needs rethinking rather than re-pushing. The delay itself may be information.",
      zh: "在工作中，这张牌常对应一次富有成效的暂停：延期的项目、尚不成熟的决定、需要重想而非重推的方案。延迟本身，或许就是一种讯息。",
    },
    growthMeaning: {
      en: "Growth here may come from loosening your grip on how things 'should' go. Surrender, in this card, isn't giving up — it's making space for a wiser answer to arrive.",
      zh: "此刻的成长，可能来自松开“事情本该如何”的执念。这张牌里的“放下”不是放弃，而是为更成熟的答案腾出位置。",
    },
    reflectionQuestion: {
      en: "What might you see about this situation if you stopped pushing for a moment?",
      zh: "如果暂时停止用力，你可能会从这件事里看出什么新东西？",
    },
    actionPrompt: {
      en: "Postpone one non-urgent decision by a full day, and note what becomes clearer in the meantime.",
      zh: "把一个不紧急的决定推迟一整天，留意这段时间里，什么变得更清晰了。",
    },
    imagePath: "/images/tarot/the-hanged-man.svg",
  },
  {
    id: 13,
    slug: "death",
    name: { en: "Death", zh: "死神" },
    arcana: "major",
    suit: null,
    number: 13,
    uprightKeywords: {
      en: ["Transformation", "Endings", "Release", "Renewal"],
      zh: ["蜕变", "结束", "放下", "新生"],
    },
    reversedKeywords: {
      en: ["Resisting change", "Holding on", "Delayed transition", "Fear of letting go"],
      zh: ["抗拒改变", "紧抓不放", "转变延迟", "难以放手"],
    },
    generalMeaning: {
      en: "In tarot, Death is not about literal death — it's the card of transformation, of one chapter closing so another can begin. Drawing it may suggest that something in your life has quietly completed its course: a role, a habit, a way of seeing yourself. Endings like these can feel tender, and they also clear ground. Consider what you might be ready to release, and what that release could make possible.",
      zh: "在塔罗中，死神并不指向字面意义的死亡——它是一张关于蜕变的牌：一章落幕，另一章才得以开始。抽到它，或许意味着生活中有些东西已悄然走完了它的历程——一个身份、一种习惯，或一种看待自己的方式。这样的结束难免令人不舍，却也在清理出新的空间。不妨想想：你也许已经准备好放下什么？而放下之后，什么会成为可能？",
    },
    loveMeaning: {
      en: "In relationships, Death may point to an old dynamic ending so something truer can form — within the same bond or beyond it. Letting a pattern go can be an act of care, not abandonment.",
      zh: "在感情中，死神可能意味着一种旧有相处模式的落幕，好让更真实的联结得以生长——无论是在这段关系之内，还是之外。放下一个旧模式，可以是一种珍重，而非辜负。",
    },
    careerMeaning: {
      en: "Professionally, this card often accompanies transitions: outgrowing a role, closing a project, shifting direction. What ends may have taught you exactly what the next phase requires.",
      zh: "在事业上，这张牌常与转型相伴：从一个角色中毕业、为一个项目收尾、调转方向。已经结束的经历，或许恰恰教会了你下一程所需要的东西。",
    },
    growthMeaning: {
      en: "Growth with Death may mean honoring endings instead of rushing past them. Naming what's over — and thanking it — can free real energy for what's beginning.",
      zh: "死神指向的成长，是郑重对待结束，而不是匆匆略过。为已经完结的事物命名、道谢，能为正在开始的一切腾出真正的心力。",
    },
    reflectionQuestion: {
      en: "What chapter of your life feels complete, even if you haven't formally closed it?",
      zh: "生活中的哪一章其实已经完结，只是你还没正式为它画上句点？",
    },
    actionPrompt: {
      en: "Release one small thing you've outgrown today — unsubscribe, archive, or clear a single drawer.",
      zh: "今天放下一件你早已不再需要的小东西：退订一份邮件、归档一个旧项目，或清理一个抽屉。",
    },
    imagePath: "/images/tarot/death.svg",
  },
  {
    id: 14,
    slug: "temperance",
    name: { en: "Temperance", zh: "节制" },
    arcana: "major",
    suit: null,
    number: 14,
    uprightKeywords: {
      en: ["Balance", "Moderation", "Patience", "Blending"],
      zh: ["平衡", "适度", "耐心", "调和"],
    },
    reversedKeywords: {
      en: ["Excess", "Imbalance", "Impatience", "All-or-nothing"],
      zh: ["过度", "失衡", "急于求成", "非此即彼"],
    },
    generalMeaning: {
      en: "Temperance blends two cups into one flowing stream — patience, proportion, and the art of the middle path. This card may suggest that your situation calls for mixing rather than choosing: work and rest, head and heart, saving and savoring. It often appears when gradual adjustment can do what drastic swings cannot. Consider where a little more balance would change how everything feels.",
      zh: "节制将两只杯中的水调和为一道流动的溪流——耐心、分寸，与中道的艺术。这张牌可能在说：眼下需要的是“调和”而非“二选一”——工作与休息、理性与感受、积蓄与享用。它常出现在“渐进的微调胜过剧烈的摇摆”的时刻。不妨想想：哪里多一点平衡，整体的感觉就会不一样？",
    },
    loveMeaning: {
      en: "In relationships, Temperance may invite pacing — letting things find their natural rhythm instead of forcing intensity or distance. Small mutual adjustments could restore an ease that's been missing.",
      zh: "在感情中，节制或许在提醒你注意节奏——让关系找到它自然的律动，而不是刻意升温或降温。彼此各退半步的微调，可能找回久违的自在。",
    },
    careerMeaning: {
      en: "At work, this card often favors sustainable pace over sprint-and-crash. Integrating feedback, moderating workload, and blending different approaches may serve you better than betting everything on one mode.",
      zh: "在工作中，这张牌更认可可持续的节奏，而非猛冲之后的透支。吸收反馈、调配负荷、融合不同的方法，可能比孤注一掷于单一模式更稳妥。",
    },
    growthMeaning: {
      en: "Growth with Temperance is incremental by design: small recalibrations, practiced daily, compound quietly. The middle path isn't bland — it's where staying power lives.",
      zh: "节制指向的成长，本就是渐进式的：每天一点小小的校准，会在不知不觉中积累成变化。中道并不平庸——持久的力量恰恰栖身于此。",
    },
    reflectionQuestion: {
      en: "Where does your life feel out of proportion right now, and what small adjustment might begin to right it?",
      zh: "此刻你的生活哪里失了比例？哪个小小的调整可以先做起来？",
    },
    actionPrompt: {
      en: "Pick one daily habit and adjust it by a notch — twenty minutes earlier to bed, one fewer commitment, one more pause.",
      zh: "选一个日常习惯，微调一格：早睡二十分钟、少排一件事，或多留一次喘息的间隙。",
    },
    imagePath: "/images/tarot/temperance.svg",
  },
  {
    id: 15,
    slug: "the-devil",
    name: { en: "The Devil", zh: "恶魔" },
    arcana: "major",
    suit: null,
    number: 15,
    uprightKeywords: {
      en: ["Attachment", "Limiting patterns", "Temptation", "Shadow awareness"],
      zh: ["执念", "束缚模式", "诱惑", "觉察阴影"],
    },
    reversedKeywords: {
      en: ["Loosening grip", "Reclaimed choice", "Breaking habits", "Release"],
      zh: ["松动束缚", "重获选择", "打破惯性", "释放"],
    },
    generalMeaning: {
      en: "The Devil isn't a prophecy of evil — in tarot it's a mirror for attachment: the habits, comforts, and stories we feel chained to, even when the chains are loose. Drawing this card may invite an honest look at what holds you, and how much of that hold is actually consent. It often points to patterns that once served you and now mostly cost you. Consider what you keep choosing by default, and whether you'd still choose it freely.",
      zh: "恶魔并不是厄运的预告——在塔罗里，它是一面照见“执念”的镜子：那些让我们感觉被捆住的习惯、安逸与心结，尽管锁链其实松松垮垮。抽到这张牌，或许是在邀请你诚实地看看：什么束缚着你？而这份束缚里，有多少其实是你的默许？它常指向那些曾经有用、如今却更多是消耗的模式。不妨想想：哪些事你一直在“默认”地选择——若重新选一次，你还会选它吗？",
    },
    loveMeaning: {
      en: "In relationships, the Devil may highlight dynamics that feel compelling but draining — patterns of dependence, jealousy, or the same argument on repeat. Naming the pattern together, without blame, could be the first loosening.",
      zh: "在感情中，恶魔可能照见那些令人上头却也内耗的相处方式——依赖、患得患失，或一再重演的同一场争执。不带指责地一起说破这个模式，或许就是松动的开始。",
    },
    careerMeaning: {
      en: "At work, this card could point to golden handcuffs, burnout loops, or ambitions pursued past the point of nourishment. It may be worth asking what you're trading for what — and whether the exchange still feels fair.",
      zh: "在职场上，这张牌可能指向“金手铐”式的处境、越忙越空的循环，或早已不再滋养你的执着。不妨算一算：你在用什么换什么——这笔交换，如今还划算吗？",
    },
    growthMeaning: {
      en: "Growth with the Devil begins with awareness, not willpower. Seeing a pattern clearly — without shame — tends to loosen its grip more than fighting it head-on.",
      zh: "面对恶魔，成长始于觉察，而非硬扛。不带羞耻地看清一个模式，往往比与它正面搏斗更能让它松手。",
    },
    reflectionQuestion: {
      en: "What do you keep choosing even though it no longer feels like a choice?",
      zh: "有什么事你一直在选择，却早已感觉不到那是一种选择？",
    },
    actionPrompt: {
      en: "Pick one habit loop that drains you and change a single link in it, just once, this week.",
      zh: "选一个消耗你的习惯回路，本周只改动其中一个环节，先做一次就好。",
    },
    imagePath: "/images/tarot/the-devil.svg",
  },
  {
    id: 16,
    slug: "the-tower",
    name: { en: "The Tower", zh: "高塔" },
    arcana: "major",
    suit: null,
    number: 16,
    uprightKeywords: {
      en: ["Sudden change", "Revelation", "Shaken structures", "Clearing ground"],
      zh: ["骤变", "真相显露", "结构松动", "破而后立"],
    },
    reversedKeywords: {
      en: ["Fear of change", "Averted upheaval", "Delaying the shift", "Inner shake-up"],
      zh: ["恐惧改变", "回避动荡", "拖延调整", "内在松动"],
    },
    generalMeaning: {
      en: "The Tower isn't a forecast of disaster — it's the card of sudden clarity, when something built on shaky assumptions gives way. Drawing it may suggest that a structure in your life — a plan, a belief, an arrangement — is being tested, or is ready to be rebuilt on truer ground. These moments can feel jolting, and they also clear the view. Consider what you'd build differently if you were starting from what you now know.",
      zh: "高塔并不是灾难的预报——它讲的是骤然的清醒：当某样建立在松动地基上的东西终于撑不住时。抽到它，或许意味着你生活中的某个结构——一项计划、一个信念、一种安排——正在经受检验，或已到了换上更实在地基、重新搭建的时候。这样的时刻难免震动，却也让视野豁然开阔。不妨想想：如果带着现在的认知重新来过，你会怎样搭建？",
    },
    loveMeaning: {
      en: "In relationships, the Tower may mark a moment when an unspoken truth surfaces. Disorienting as that can feel, what's real between two people tends to survive honesty — and grow sturdier for it.",
      zh: "在感情中，高塔可能对应某个心照不宣的真相浮出水面的时刻。那一刻或许令人不知所措，但两个人之间真实的部分，往往经得起坦诚——并因此更结实。",
    },
    careerMeaning: {
      en: "Professionally, this card often accompanies sudden shifts: plans upended, assumptions corrected, structures reorganized. What survives the shake-up is usually what was solid all along — a useful thing to learn early.",
      zh: "在工作中，这张牌常伴随突然的变动：计划被打乱、预设被纠正、结构被重组。经得起震荡留下来的，通常正是原本就扎实的部分——早点知道这一点，其实是幸运。",
    },
    growthMeaning: {
      en: "Growth with the Tower may mean welcoming the correction instead of rebuilding the same fragile thing. A cleared foundation, however it got cleared, is still a foundation.",
      zh: "高塔指向的成长，是接受这次“纠偏”，而不是原样重建那个本就脆弱的东西。无论地基是如何空出来的，它终究是一块可以重新开始的地基。",
    },
    reflectionQuestion: {
      en: "Which of your current plans or beliefs might be more fragile than you've been willing to admit?",
      zh: "你目前的哪个计划或信念，可能比你愿意承认的更经不起推敲？",
    },
    actionPrompt: {
      en: "Choose one assumption you're relying on and write three honest lines about what would change if it weren't true.",
      zh: "选一个你正在依赖的假设，诚实地写下三行：如果它不成立，事情会有什么不同。",
    },
    imagePath: "/images/tarot/the-tower.svg",
  },
  {
    id: 17,
    slug: "the-star",
    name: { en: "The Star", zh: "星星" },
    arcana: "major",
    suit: null,
    number: 17,
    uprightKeywords: {
      en: ["Hope", "Healing", "Renewal", "Quiet faith"],
      zh: ["希望", "疗愈", "焕新", "平静的信心"],
    },
    reversedKeywords: {
      en: ["Dimmed hope", "Discouragement", "Running dry", "Needing replenishment"],
      zh: ["希望黯淡", "心灰意冷", "能量枯竭", "亟需滋养"],
    },
    generalMeaning: {
      en: "The Star appears after the Tower's upheaval — a quiet sky, clear water, and hope that doesn't need to shout. This card may suggest a season of healing and replenishment, when faith in the future becomes reasonable again. It's less about wishing on stars than about steady, gentle restoration. Consider what refills you, and whether you've been letting yourself have it.",
      zh: "星星出现在高塔的震荡之后——夜空安静，池水清澈，希望不必声张。这张牌可能预示着一个疗愈与复原的阶段：对未来的信心，重新变得有据可依。它无关许愿，更关乎平静而温柔的修复。不妨想想：什么能让你重新充盈？最近，你允许自己拥有它吗？",
    },
    loveMeaning: {
      en: "In love, the Star may point to renewal — tenderness returning after a hard stretch, or a connection that feels quietly hopeful. Openness without urgency could be exactly the right pace.",
      zh: "在感情中，星星可能指向一种修复与回暖——艰难过后，温柔慢慢回来；或一段让人安心怀有希望的联结。不急不催的敞开，或许正是恰当的节奏。",
    },
    careerMeaning: {
      en: "Professionally, this card often favors long-view thinking: a direction you believe in, pursued patiently. Inspiration may return if you give it space instead of demanding it on deadline.",
      zh: "在事业上，这张牌鼓励放长目光：认定一个你真心相信的方向，耐心走下去。灵感也许会回来——前提是给它留出空间，而不是限期交付。",
    },
    growthMeaning: {
      en: "Growth with the Star may look like recovering your sense of possibility. Small, consistent acts of self-restoration can rebuild an optimism that's earned, not forced.",
      zh: "星星指向的成长，是找回“一切仍有可能”的感觉。一次次小小的自我修复，能重建一种踏实的乐观——它是养出来的，不是逼出来的。",
    },
    reflectionQuestion: {
      en: "After everything that's happened, what still feels genuinely worth believing in?",
      zh: "经历了这一切之后，什么仍然让你觉得值得相信？",
    },
    actionPrompt: {
      en: "Spend ten unhurried minutes with something that restores you — night air, water, music, or an open window.",
      zh: "花十分钟不赶时间地待在能让你恢复的事物旁——夜风、流水、音乐，或一扇打开的窗。",
    },
    imagePath: "/images/tarot/the-star.svg",
  },
  {
    id: 18,
    slug: "the-moon",
    name: { en: "The Moon", zh: "月亮" },
    arcana: "major",
    suit: null,
    number: 18,
    uprightKeywords: {
      en: ["Uncertainty", "Intuition", "Dreams and imagination", "Hidden currents"],
      zh: ["不确定感", "直觉", "梦境与想象", "暗流"],
    },
    reversedKeywords: {
      en: ["Emerging clarity", "Fears easing", "Truth surfacing", "Facing anxieties"],
      zh: ["迷雾渐散", "恐惧缓解", "真相浮现", "直面不安"],
    },
    generalMeaning: {
      en: "The Moon lights a path between two towers, where nothing is quite as it appears. This card may suggest you're navigating uncertainty — incomplete information, mixed signals, or feelings that haven't settled into words. It's often a caution against final judgments made in low light, and an invitation to trust your senses while verifying your fears. Consider which of your worries are observations, and which are projections.",
      zh: "月亮照着一条穿行于两座塔之间的小路，路上的一切都似是而非。这张牌可能意味着你正走在不确定之中——信息不全、讯号混杂，或某些感受尚未找到语言。它常在提醒：不要在光线昏暗时下最终结论；也在邀请你既相信自己的感官，也核实自己的恐惧。不妨分辨一下：你的担忧里，哪些是观察，哪些是想象的投影？",
    },
    loveMeaning: {
      en: "In relationships, the Moon may point to things felt but not yet said — undercurrents worth naming gently. Checking your interpretations before acting on them could spare unnecessary hurt.",
      zh: "在感情中，月亮可能指向那些感觉到了、却还没说出口的东西——值得温和地把暗流摆上台面。在据此行动之前，先核实一下自己的解读，或许能省去不必要的伤害。",
    },
    careerMeaning: {
      en: "At work, this card often suggests an incomplete picture: shifting plans, unclear expectations, or dynamics you can sense but not see. It may be wise to gather facts patiently before making binding moves.",
      zh: "在职场上，这张牌常意味着图景尚不完整：计划摇摆、期待模糊，或那些感觉得到却看不真切的微妙氛围。在做出有约束力的决定之前，耐心把事实收集齐，或许更稳妥。",
    },
    growthMeaning: {
      en: "Growth with the Moon may mean learning to sit with not-knowing, without letting imagination fill every gap with fear. Uncertainty met calmly often resolves into clarity on its own schedule.",
      zh: "月亮指向的成长，是学会与“不知道”安然共处，不让想象用恐惧填满每一处空白。被平静接纳的不确定，往往会按它自己的时间表水落石出。",
    },
    reflectionQuestion: {
      en: "Which of your current fears are based on what you've actually seen, and which on what you've imagined?",
      zh: "你此刻的担忧里，哪些来自你真正看到的，哪些来自你想象出来的？",
    },
    actionPrompt: {
      en: "Write down one worry, then list what you actually know about it versus what you're assuming.",
      zh: "写下一个担忧，然后分两栏列出：关于它，你确切知道的，和你只是假设的。",
    },
    imagePath: "/images/tarot/the-moon.svg",
  },
  {
    id: 19,
    slug: "the-sun",
    name: { en: "The Sun", zh: "太阳" },
    arcana: "major",
    suit: null,
    number: 19,
    uprightKeywords: {
      en: ["Vitality", "Clarity", "Joy", "Confidence"],
      zh: ["活力", "明朗", "喜悦", "自信"],
    },
    reversedKeywords: {
      en: ["Dimmed enthusiasm", "Passing clouds", "Overextension", "Need to recharge"],
      zh: ["热情减退", "暂时的阴霾", "透支", "亟待充电"],
    },
    generalMeaning: {
      en: "The Sun is tarot's clearest yes — warmth, vitality, and things seen in full light. This card may suggest a stretch where energy returns, efforts become visible, and joy needs less justification. It often encourages simplicity: what's working is allowed to just work. Consider letting yourself enjoy what's good here without auditing it for hidden flaws.",
      zh: "太阳是塔罗中最明朗的一张牌——温暖、活力，一切都被照得清清楚楚。这张牌可能预示着一段回暖的日子：精力回来了，努力开始被看见，快乐不再需要理由。它也常常鼓励一种简单：顺利的事，就允许它顺利。不妨让自己好好享受眼前的好，不必急着检查它有没有隐藏的瑕疵。",
    },
    loveMeaning: {
      en: "In love, the Sun may point to warmth that's easy to feel and easy to give — affection out in the open. Sharing simple pleasures together could matter more than resolving anything right now.",
      zh: "在感情中，太阳可能指向一种坦荡的温暖——喜欢就表达，被爱就接住。此刻，一起享受简单的快乐，或许比解决什么问题更重要。",
    },
    careerMeaning: {
      en: "Professionally, this card often marks visible progress: recognition, clarity of purpose, or a project stepping into the light. It could be a good moment to show your work rather than perfect it further.",
      zh: "在事业上，这张牌常对应看得见的进展：被认可、目标清晰，或一个项目终于走到台前。此刻或许适合把成果亮出来，而不是继续闭门打磨。",
    },
    growthMeaning: {
      en: "Growth with the Sun may mean practicing wholeheartedness — letting yourself be visibly glad, proud, or enthusiastic without hedging. Joy, it turns out, is also a skill.",
      zh: "太阳指向的成长，是练习“全然”：允许自己明明白白地开心、自豪、投入，而不必遮掩三分。原来，快乐也是一种可以练习的能力。",
    },
    reflectionQuestion: {
      en: "What has been making you feel most alive lately — and how often do you actually let it in?",
      zh: "最近什么让你感觉最有生命力——你多久才允许自己享受它一次？",
    },
    actionPrompt: {
      en: "Give twenty minutes today to something that reliably lifts you — sunlight, movement, or a person who makes you laugh.",
      zh: "今天留二十分钟给一件确定能点亮你的事——晒晒太阳、动一动身体，或见一个能让你笑出声的人。",
    },
    imagePath: "/images/tarot/the-sun.svg",
  },
  {
    id: 20,
    slug: "judgement",
    name: { en: "Judgement", zh: "审判" },
    arcana: "major",
    suit: null,
    number: 20,
    uprightKeywords: {
      en: ["Awakening", "Honest review", "Second chances", "Inner calling"],
      zh: ["觉醒", "诚实回顾", "重新出发", "内心召唤"],
    },
    reversedKeywords: {
      en: ["Harsh self-judgment", "Avoided reflection", "Ignoring the call", "Stuck in the past"],
      zh: ["苛刻自评", "回避反思", "忽视召唤", "困于过去"],
    },
    generalMeaning: {
      en: "Judgement sounds a call to rise — not a verdict from outside, but an awakening from within. This card may suggest you're being asked to review a chapter honestly, absorb its lessons, and answer a pull toward something truer. It often accompanies second chances and clear-eyed fresh starts. Consider what your life might look like if you finally answered the call you've been hearing.",
      zh: "审判吹响的是一声唤醒的号角——不是来自外界的裁决，而是发自内心的觉醒。这张牌可能在说：是时候诚实地回顾一段历程，消化它的功课，并回应那股指向更真实自己的牵引了。它常与“重新来过的机会”和清醒的新开始相伴。不妨设想：如果终于回应了心里那个一直在响的召唤，你的生活会是什么样子？",
    },
    loveMeaning: {
      en: "In relationships, Judgement may invite an honest reckoning — what this bond has taught you, and what you're ready to do differently. Old patterns reviewed with kindness can genuinely be retired.",
      zh: "在感情中，审判或许在邀请一次坦诚的盘点：这段关系教会了你什么？你准备在哪些地方换一种做法？带着善意复盘过的旧模式，是真的可以退场的。",
    },
    careerMeaning: {
      en: "At work, this card often signals evaluation and renewal: a performance chapter closing, a calling clarifying, a decision about what your work is actually for. Your own track record may be more instructive than any forecast.",
      zh: "在事业上，这张牌常对应评估与更新：一个阶段的收官、一份志向的清晰化，或一次关于“工作究竟为了什么”的抉择。比起任何预测，你一路走来的轨迹，或许更能给你答案。",
    },
    growthMeaning: {
      en: "Growth with Judgement may mean reviewing your past with honesty and compassion at the same time. Keep what served, release what didn't, and let yourself become someone new on purpose.",
      zh: "审判指向的成长，是用诚实与慈悲同时回望来路：留下有用的，放下无用的，然后允许自己有意识地成为一个新的人。",
    },
    reflectionQuestion: {
      en: "If you reviewed this past year kindly but honestly, what would you keep — and what would you release?",
      zh: "如果温和而诚实地回顾这一年，你会留下什么，又会放下什么？",
    },
    actionPrompt: {
      en: "Draw two columns — 'carry forward' and 'leave behind' — and fill in three items each.",
      zh: "画两栏清单：“带走”与“留下”，各写三项。",
    },
    imagePath: "/images/tarot/judgement.svg",
  },
  {
    id: 21,
    slug: "the-world",
    name: { en: "The World", zh: "世界" },
    arcana: "major",
    suit: null,
    number: 21,
    uprightKeywords: {
      en: ["Completion", "Integration", "Wholeness", "Arrival"],
      zh: ["圆满", "整合", "完整", "抵达"],
    },
    reversedKeywords: {
      en: ["Loose ends", "Almost there", "Delayed closure", "Skipped steps"],
      zh: ["未竟之事", "只差一步", "迟来的收尾", "跳过的环节"],
    },
    generalMeaning: {
      en: "The World is the deck's final card: completion, integration, and the quiet satisfaction of a circle closed. Drawing it may suggest that something long in motion is reaching wholeness — or asking for the last few steps that would truly finish it. It often honors how far you've come while hinting that every ending seeds the next beginning. Consider what it would mean to complete this chapter fully, and to actually celebrate it.",
      zh: "世界是整副牌的最后一张：圆满、整合，以及一个循环合拢时那种安静的满足。抽到它，或许意味着一件酝酿已久的事正走向完整——又或者，它正在等你补上真正收尾的最后几步。这张牌致意你一路走来的所有努力，也轻声提示：每个结束里都藏着下一个开始。不妨想想：怎样才算真正为这一章画上句点——并好好庆祝它？",
    },
    loveMeaning: {
      en: "In relationships, the World may point to a sense of arrival — a milestone reached, or a wholeness you bring to the bond rather than seek from it. Acknowledging how far you've come together could be its own celebration.",
      zh: "在感情中，世界牌可能指向一种“抵达感”——一个里程碑的达成，或一种你带入关系、而非向关系索取的完整。认真回顾你们一起走过的路，本身就是一种庆祝。",
    },
    careerMeaning: {
      en: "Professionally, this card often marks the close of a significant cycle: a project delivered, a skill matured, a level completed. Before rushing to the next thing, it may be worth capturing what this one taught you.",
      zh: "在事业上，这张牌常标志一个重要周期的收官：项目交付、技能成熟、一个阶段通关。在奔向下一件事之前，不妨先把这一程的所学好好沉淀下来。",
    },
    growthMeaning: {
      en: "Growth with the World may mean letting yourself feel finished — genuinely done — before starting again. Integration is the step ambition tends to skip, and the one that makes the next cycle wiser.",
      zh: "世界指向的成长，是允许自己真正“完成”——先抵达，再出发。整合是野心最容易跳过的一步，却也是让下一个循环更从容的一步。",
    },
    reflectionQuestion: {
      en: "What would it take to truly close this chapter — and how do you want to mark the moment?",
      zh: "怎样才算真正合上这一章？你想用什么方式纪念这个时刻？",
    },
    actionPrompt: {
      en: "Finish one small lingering task today, then mark the completion somehow — even just a note that says 'done.'",
      zh: "今天完成一件拖了很久的小事，然后用某种方式记下这个“完成”——哪怕只是写一句“搞定了”。",
    },
    imagePath: "/images/tarot/the-world.svg",
  },
];
