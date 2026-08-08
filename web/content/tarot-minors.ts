// Rich bilingual content for the 56 Minor Arcana cards (Rider–Waite–Smith tradition).
// Tone: reflective, modern, non-deterministic. Copy never predicts fixed outcomes;
// difficult cards (Ten of Swords, Five of Cups, Three of Swords…) are framed as
// endings, grief, and transition — never as doom.
// Order: ids 22–77, suits wands → cups → swords → pentacles, ranks Ace → King.

import type { TarotCardContent } from "./tarot-types";

export const TAROT_MINORS: TarotCardContent[] = [
  // ───────────────────────── Wands 权杖 ─────────────────────────
  {
    id: 22,
    slug: "ace-of-wands",
    name: { en: "Ace of Wands", zh: "权杖王牌" },
    arcana: "minor",
    suit: "wands",
    number: 1,
    uprightKeywords: {
      en: ["Inspiration", "New beginnings", "Creative spark", "Raw potential"],
      zh: ["灵感迸发", "新的开始", "创造力", "蓄势待发"],
    },
    reversedKeywords: {
      en: ["Delays", "Scattered energy", "Hesitation", "Creative block"],
      zh: ["计划延迟", "能量分散", "犹豫不决", "灵感受阻"],
    },
    generalMeaning: {
      en: "The Ace of Wands often signals a spark of inspiration or the first stirring of a new venture. It may suggest that creative energy is available to you now, waiting for a direction. What you do with the spark could matter more than the spark itself.",
      zh: "权杖王牌常常象征灵感的火花，或一段新旅程最初的悸动。它可能提示，此刻你身上正涌动着一股创造性的能量，等待被赋予方向。如何运用这份火花，或许比火花本身更重要。",
    },
    loveMeaning: {
      en: "A fresh surge of warmth or attraction may be stirring. This card could invite you to bring more spontaneity into how you connect.",
      zh: "一股新鲜的热情或心动也许正在萌芽。这张牌或许在邀请你，为关系注入更多主动与温度。",
    },
    careerMeaning: {
      en: "A new project, role, or idea may be calling for your energy. Early enthusiasm could be worth channeling into one concrete first step.",
      zh: "一个新项目、新角色或新想法，可能正等待你投入热情。不妨把这份初始的兴奋，落实为一个具体的第一步。",
    },
    growthMeaning: {
      en: "Consider what genuinely excites you right now, before obligation has a say. Following that thread, even briefly, may reveal where your energy wants to go.",
      zh: "试着觉察：抛开“应该”，此刻真正让你兴奋的是什么？哪怕只是短暂地顺着这条线索走，也可能看清能量想去的方向。",
    },
    reflectionQuestion: {
      en: "What idea keeps returning to you, asking to be started?",
      zh: "哪个想法一再回到你心里，等着被开启？",
    },
    actionPrompt: {
      en: "Spend fifteen minutes today sketching or noting the first small step of an idea you care about.",
      zh: "今天花十五分钟，为一个你在意的想法写下或画出第一小步。",
    },
    imagePath: "/images/tarot/ace-of-wands.svg",
  },
  {
    id: 23,
    slug: "two-of-wands",
    name: { en: "Two of Wands", zh: "权杖二" },
    arcana: "minor",
    suit: "wands",
    number: 2,
    uprightKeywords: {
      en: ["Planning", "Future vision", "Decisions", "Widening horizons"],
      zh: ["规划未来", "远见", "抉择", "视野开阔"],
    },
    reversedKeywords: {
      en: ["Playing it safe", "Fear of change", "Vague plans", "Restlessness"],
      zh: ["求稳观望", "害怕改变", "计划模糊", "心神不定"],
    },
    generalMeaning: {
      en: "The Two of Wands often depicts the moment between vision and action, when the world seems open but a choice is required. It may suggest you are weighing a bolder path against familiar ground. Clarifying what you truly want could make the next step easier to see.",
      zh: "权杖二常常描绘愿景与行动之间的时刻：世界看似敞开，却需要做出选择。它可能意味着你正在更大胆的道路与熟悉的现状之间权衡。想清楚自己真正想要什么，下一步或许会更清晰。",
    },
    loveMeaning: {
      en: "You may be considering what you want a relationship to become, not just what it is today. Gentle honesty about your longer-term hopes could bring clarity.",
      zh: "你或许正在思考，感情除了当下的模样，还可以走向哪里。温和而诚实地面对自己的长远期待，可能带来更多清晰。",
    },
    careerMeaning: {
      en: "A plan may be forming that asks you to look beyond your current role or field. Researching options before committing could serve you well.",
      zh: "一个需要你望向现有角色或领域之外的计划，也许正在成形。行动之前先做些功课，或许更稳妥。",
    },
    growthMeaning: {
      en: "Consider whether comfort has quietly become confinement. Naming one horizon you would like to reach may reawaken your sense of direction.",
      zh: "想一想，舒适是否已悄悄变成一种束缚。写下一个你想抵达的“远方”，也许能重新唤起方向感。",
    },
    reflectionQuestion: {
      en: "If you trusted your vision fully, what would you begin planning today?",
      zh: "如果你完全信任自己的愿景，今天会开始筹划什么？",
    },
    actionPrompt: {
      en: "Write down one long-term goal and two small routes that could lead toward it.",
      zh: "写下一个长期目标，再列出两条可能通往它的小路径。",
    },
    imagePath: "/images/tarot/two-of-wands.svg",
  },
  {
    id: 24,
    slug: "three-of-wands",
    name: { en: "Three of Wands", zh: "权杖三" },
    arcana: "minor",
    suit: "wands",
    number: 3,
    uprightKeywords: {
      en: ["Expansion", "Foresight", "Momentum", "Opportunities ahead"],
      zh: ["拓展", "远见", "稳步推进", "机会在望"],
    },
    reversedKeywords: {
      en: ["Delays", "Limited vision", "Obstacles", "Impatience"],
      zh: ["进展延迟", "目光受限", "阻碍", "急于求成"],
    },
    generalMeaning: {
      en: "The Three of Wands often speaks of plans set in motion and horizons beginning to open. It may suggest that earlier efforts are gathering momentum, even if results are still arriving. Staying patient while keeping your gaze forward could help you meet what comes.",
      zh: "权杖三常常述说计划已经启动、天地正在打开的阶段。它可能提示，先前的努力正在积聚势能，即使成果尚在路上。保持耐心、目光向前，或许能让你更从容地迎接将至之事。",
    },
    loveMeaning: {
      en: "Something you have invested in emotionally may be slowly unfolding. Allowing the relationship room to develop, without forcing a pace, could feel steadier.",
      zh: "你在感情中投入的心力，也许正在慢慢显现。给关系留出生长的空间，不急于催促节奏，可能会更安稳。",
    },
    careerMeaning: {
      en: "Projects may be expanding beyond their original scope, inviting collaboration or new territory. Keeping one eye on the long view could guide near-term choices.",
      zh: "手头的事情可能正在超出最初的设想，带来合作或新领域的可能。兼顾长远视角，或许有助于当下的取舍。",
    },
    growthMeaning: {
      en: "Notice where you have already traveled from, not only where you have yet to go. Acknowledging progress may renew your patience.",
      zh: "留意你已经走了多远，而不只是还有多远。承认自己的进展，也许能让耐心重新生长。",
    },
    reflectionQuestion: {
      en: "Which of your efforts is quietly gathering momentum right now?",
      zh: "你付出的哪一份努力，此刻正在悄悄积聚力量？",
    },
    actionPrompt: {
      en: "List three signs of progress on something you started, however small.",
      zh: "为你已开始的一件事，找出三个哪怕微小的进展迹象。",
    },
    imagePath: "/images/tarot/three-of-wands.svg",
  },
  {
    id: 25,
    slug: "four-of-wands",
    name: { en: "Four of Wands", zh: "权杖四" },
    arcana: "minor",
    suit: "wands",
    number: 4,
    uprightKeywords: {
      en: ["Celebration", "Harmony", "Milestones", "Belonging"],
      zh: ["庆祝", "和谐", "阶段成果", "归属感"],
    },
    reversedKeywords: {
      en: ["Transition", "Unsettled home", "Postponed joy", "Shaky foundations"],
      zh: ["过渡期", "家宅未安", "庆祝延后", "根基未稳"],
    },
    generalMeaning: {
      en: "The Four of Wands often marks a moment of celebration, homecoming, or a milestone worth honoring. It may suggest that something you have built has reached a stable point. Pausing to enjoy it with others could be part of the work, not a break from it.",
      zh: "权杖四常常标志着值得庆祝的时刻——回归、团聚，或一个阶段性的里程碑。它可能意味着你所经营的事物已趋于稳固。停下来与人分享喜悦，或许本身就是这段旅程的一部分。",
    },
    loveMeaning: {
      en: "A relationship may be entering a steadier, warmer chapter. Marking the moment together, however simply, could deepen the sense of home.",
      zh: "感情或许正走入更安稳温暖的一章。哪怕用很简单的方式一起纪念当下，也可能加深彼此的归属感。",
    },
    careerMeaning: {
      en: "A phase of work may be wrapping up in a way worth acknowledging. Celebrating with the people involved could strengthen future collaboration.",
      zh: "一个工作阶段也许正圆满收尾，值得被认可。与参与其中的人一起庆祝，或许能为未来的合作蓄力。",
    },
    growthMeaning: {
      en: "Consider what stability means to you beyond routine. Honoring small completions may make longer journeys feel sustainable.",
      zh: "想一想，除了按部就班，“安稳”对你还意味着什么。为小小的完成感到欣喜，长路或许会更好走。",
    },
    reflectionQuestion: {
      en: "What have you built that deserves a moment of celebration?",
      zh: "你所建立的事物中，哪一件值得好好庆祝一下？",
    },
    actionPrompt: {
      en: "Plan one small gathering or ritual to mark a recent milestone.",
      zh: "为最近的一个小里程碑，安排一次简单的聚会或小仪式。",
    },
    imagePath: "/images/tarot/four-of-wands.svg",
  },
  {
    id: 26,
    slug: "five-of-wands",
    name: { en: "Five of Wands", zh: "权杖五" },
    arcana: "minor",
    suit: "wands",
    number: 5,
    uprightKeywords: {
      en: ["Competition", "Friction", "Differing views", "Testing ground"],
      zh: ["竞争", "摩擦", "意见分歧", "磨合"],
    },
    reversedKeywords: {
      en: ["Avoiding conflict", "Seeking common ground", "Inner tension", "Pressure easing"],
      zh: ["回避冲突", "寻求共识", "内在紧绷", "压力缓解"],
    },
    generalMeaning: {
      en: "The Five of Wands often depicts the noise of competing voices and clashing approaches. It may suggest friction around you — or within you — that is less about winning and more about testing ideas. Treating disagreement as practice rather than battle could change its character.",
      zh: "权杖五常常呈现众声喧哗、各执一词的场面。它可能提示你周围或内心存在摩擦，而这份摩擦与其说关乎输赢，不如说是想法之间的碰撞与切磋。把分歧当作演练而非战斗，气氛或许会随之改变。",
    },
    loveMeaning: {
      en: "Small clashes may be surfacing differences that were always there. Curiosity about each other's views, rather than scorekeeping, could ease the tension.",
      zh: "小小的争执，也许只是让一直存在的差异浮上水面。带着好奇去了解彼此的想法，而不是计较对错，紧张感可能会缓和一些。",
    },
    careerMeaning: {
      en: "Competing priorities or opinions may be creating noise at work. Clarifying shared goals could turn rivalry into useful debate.",
      zh: "工作中相互竞争的目标或意见，可能正带来不小的嘈杂。厘清共同的方向，或许能让较劲变成有益的讨论。",
    },
    growthMeaning: {
      en: "Notice how you respond when challenged — do you harden, withdraw, or engage? Experimenting with a different stance may reveal something new.",
      zh: "留意被质疑时你的第一反应：是强硬、回避，还是投入交流？试着换一种姿态，也许会有新的发现。",
    },
    reflectionQuestion: {
      en: "Where in your life might friction actually be a sign of growth?",
      zh: "生活中哪一处摩擦，其实可能是成长的信号？",
    },
    actionPrompt: {
      en: "In your next disagreement, ask one genuine question before stating your view.",
      zh: "下次与人意见不合时，先真诚地问一个问题，再表达自己的看法。",
    },
    imagePath: "/images/tarot/five-of-wands.svg",
  },
  {
    id: 27,
    slug: "six-of-wands",
    name: { en: "Six of Wands", zh: "权杖六" },
    arcana: "minor",
    suit: "wands",
    number: 6,
    uprightKeywords: {
      en: ["Recognition", "Achievement", "Confidence", "Support of others"],
      zh: ["获得认可", "成就", "自信", "众人支持"],
    },
    reversedKeywords: {
      en: ["Self-doubt", "Unnoticed effort", "Fear of failure", "Ego check"],
      zh: ["自我怀疑", "努力未被看见", "害怕失败", "反思自满"],
    },
    generalMeaning: {
      en: "The Six of Wands often carries the feeling of a hard-won moment being seen and applauded. It may suggest that recognition, from others or from yourself, is within reach. Receiving it gracefully — without inflating or dismissing it — could be its own quiet skill.",
      zh: "权杖六常常带着一种“努力终于被看见”的氛围。它可能意味着来自他人或自己的认可正在靠近。坦然地接住这份肯定——既不夸大，也不轻慢——本身或许就是一种修养。",
    },
    loveMeaning: {
      en: "You may feel more confident in showing up as yourself. Sharing a recent success with someone close could invite warmth rather than distance.",
      zh: "你或许正更有底气地做自己。与亲近的人分享最近的一点成就，带来的可能是靠近，而非疏远。",
    },
    careerMeaning: {
      en: "Your efforts may be gaining visibility, or a win may be near enough to name. Crediting those who helped could make the moment stronger.",
      zh: "你的努力可能正在被更多人看到，或者一份成果已近在眼前。记得感谢一路帮助过你的人，这份时刻会更有分量。",
    },
    growthMeaning: {
      en: "Consider your relationship with being seen. Practicing how to accept praise honestly may be as valuable as earning it.",
      zh: "想一想你与“被看见”的关系。练习诚实地接受赞美，或许与赢得赞美同样重要。",
    },
    reflectionQuestion: {
      en: "How do you usually respond when your work is acknowledged?",
      zh: "当你的付出被认可时，你通常如何回应？",
    },
    actionPrompt: {
      en: "Write down one recent win and tell one person about it without downplaying it.",
      zh: "写下最近的一个小成就，并向一个人如实分享，不要轻描淡写。",
    },
    imagePath: "/images/tarot/six-of-wands.svg",
  },
  {
    id: 28,
    slug: "seven-of-wands",
    name: { en: "Seven of Wands", zh: "权杖七" },
    arcana: "minor",
    suit: "wands",
    number: 7,
    uprightKeywords: {
      en: ["Standing your ground", "Perseverance", "Conviction", "Defending what matters"],
      zh: ["坚守立场", "毅力", "信念", "捍卫所重"],
    },
    reversedKeywords: {
      en: ["Feeling overwhelmed", "Exhaustion", "Giving ground", "Over-defensiveness"],
      zh: ["不堪重负", "疲惫", "节节退让", "过度防御"],
    },
    generalMeaning: {
      en: "The Seven of Wands often shows the effort of holding a position while challenges press in. It may suggest that something you value is being tested and that your conviction still has strength in it. Choosing which battles genuinely matter could preserve your energy.",
      zh: "权杖七常常描绘一边承受压力、一边坚守阵地的状态。它可能提示，你所珍视的东西正在经受考验，而你的信念仍有力量。分辨哪些“战斗”真正值得，或许能帮你留住元气。",
    },
    loveMeaning: {
      en: "You may feel the need to protect your boundaries or your way of loving. Stating your needs steadily, without armor, could be enough.",
      zh: "你也许感到需要守住自己的边界，或自己爱人的方式。平稳地说出需求，不必披上盔甲，或许已经足够。",
    },
    careerMeaning: {
      en: "Your position or ideas may be facing pushback. Preparing your reasoning calmly could matter more than reacting quickly.",
      zh: "你的立场或想法可能正遇到质疑。沉着地整理好自己的依据，或许比急着回应更重要。",
    },
    growthMeaning: {
      en: "Notice the difference between defending your values and defending your habits. One may deserve the effort; the other may not.",
      zh: "分辨一下：你在捍卫的是价值观，还是习惯？前者也许值得坚持，后者未必。",
    },
    reflectionQuestion: {
      en: "What is truly worth standing firm for in your life right now?",
      zh: "此刻你的生活中，什么真正值得你坚定守护？",
    },
    actionPrompt: {
      en: "Identify one commitment to keep defending and one struggle you can set down.",
      zh: "找出一件值得继续坚守的事，同时放下一场可以不打的“仗”。",
    },
    imagePath: "/images/tarot/seven-of-wands.svg",
  },
  {
    id: 29,
    slug: "eight-of-wands",
    name: { en: "Eight of Wands", zh: "权杖八" },
    arcana: "minor",
    suit: "wands",
    number: 8,
    uprightKeywords: {
      en: ["Momentum", "Swift progress", "News arriving", "Alignment"],
      zh: ["势头正劲", "快速进展", "消息将至", "顺流而行"],
    },
    reversedKeywords: {
      en: ["Delays", "Scattered focus", "Resisting the pace", "Plans stalling"],
      zh: ["延误", "焦点分散", "抗拒节奏", "计划受阻"],
    },
    generalMeaning: {
      en: "The Eight of Wands often signals a quickening — events, messages, or decisions moving faster than before. It may suggest that momentum is on your side if you stay focused. Clearing small obstacles now could let things land where you intend.",
      zh: "权杖八常常预示节奏的加快——事件、消息或决定都在提速。它可能意味着只要保持专注，势头就站在你这边。趁现在清除一些小障碍，事情或许更容易落在你期望的位置。",
    },
    loveMeaning: {
      en: "Communication may pick up speed or intensity. Responding with presence, rather than urgency, could keep the connection grounded.",
      zh: "感情中的交流可能变得更频繁或更热烈。带着专注去回应，而非被催促感推着走，关系或许更踏实。",
    },
    careerMeaning: {
      en: "Multiple threads may be moving at once, asking for quick but clear decisions. Prioritizing firmly for a short stretch could pay off.",
      zh: "多条线索可能同时推进，需要你迅速而清晰地做决定。短期内果断排出优先级，或许会带来回报。",
    },
    growthMeaning: {
      en: "Consider how you behave when life speeds up. Building one small steadying habit may help you move fast without losing yourself.",
      zh: "观察一下生活提速时的自己。建立一个小小的“定心”习惯，或许能让你快而不乱。",
    },
    reflectionQuestion: {
      en: "Where is momentum building in your life, and are you ready to move with it?",
      zh: "你的生活中哪里正在积聚势头？你准备好顺势而行了吗？",
    },
    actionPrompt: {
      en: "Answer one message or decision you have been sitting on for days.",
      zh: "处理一条你搁置多日的消息或决定，今天就给出回应。",
    },
    imagePath: "/images/tarot/eight-of-wands.svg",
  },
  {
    id: 30,
    slug: "nine-of-wands",
    name: { en: "Nine of Wands", zh: "权杖九" },
    arcana: "minor",
    suit: "wands",
    number: 9,
    uprightKeywords: {
      en: ["Resilience", "Persistence", "Boundaries", "Almost there"],
      zh: ["韧性", "坚持", "守住边界", "接近终点"],
    },
    reversedKeywords: {
      en: ["Burnout", "Defensiveness", "Worn down", "Needing support"],
      zh: ["身心俱疲", "过度戒备", "消耗殆尽", "需要支援"],
    },
    generalMeaning: {
      en: "The Nine of Wands often portrays someone weary but still standing, close to the end of a long effort. It may suggest that your resilience has carried you far and that rest, not surrender, is what the moment asks. Guarding your energy could be the wisest strategy now.",
      zh: "权杖九常常刻画一个疲惫却依然挺立的身影，长途跋涉已近终点。它可能提示，是韧性把你带到了这里，而此刻需要的是休整，不是放弃。守护好自己的能量，或许是当下最明智的策略。",
    },
    loveMeaning: {
      en: "Past hurts may make it tempting to keep your guard high. Noticing when protection turns into distance could open a gentler path.",
      zh: "过往的伤痕，也许让你习惯性地竖起防备。觉察“自我保护”何时变成了“拒人千里”，或许能走出一条更柔软的路。",
    },
    careerMeaning: {
      en: "A demanding stretch may be nearly complete. Pacing yourself through the final phase could matter more than one last sprint.",
      zh: "一段高强度的时期可能已接近尾声。在最后阶段调配好体力，或许比孤注一掷的冲刺更重要。",
    },
    growthMeaning: {
      en: "Honor what you have endured without letting it harden you. Asking for support before you are depleted may be a form of strength.",
      zh: "肯定自己一路的承受，但别让它把你变得坚硬。在耗尽之前开口求助，也是一种力量。",
    },
    reflectionQuestion: {
      en: "What has your persistence protected, and what has it cost?",
      zh: "你的坚持守护了什么？又让你付出了什么？",
    },
    actionPrompt: {
      en: "Schedule one hour of genuine rest before returning to the task at hand.",
      zh: "在继续手头的事之前，先给自己安排一小时真正的休息。",
    },
    imagePath: "/images/tarot/nine-of-wands.svg",
  },
  {
    id: 31,
    slug: "ten-of-wands",
    name: { en: "Ten of Wands", zh: "权杖十" },
    arcana: "minor",
    suit: "wands",
    number: 10,
    uprightKeywords: {
      en: ["Heavy load", "Responsibility", "Final push", "Carrying too much"],
      zh: ["负重前行", "责任在肩", "最后冲刺", "承担过多"],
    },
    reversedKeywords: {
      en: ["Letting go", "Delegation", "Release", "Reassessing burdens"],
      zh: ["放下重担", "学会分担", "释放", "重估责任"],
    },
    generalMeaning: {
      en: "The Ten of Wands often shows the weight of success — commitments gathered until they bend the back. It may suggest that you are carrying more than one person needs to. Sorting what is truly yours from what you merely picked up could lighten the road.",
      zh: "权杖十常常呈现“成功之重”：一路揽下的责任，最终压弯了脊背。它可能提示你正背负着超出一人所需的分量。分清哪些真正属于你、哪些只是顺手接下的，路途或许会轻一些。",
    },
    loveMeaning: {
      en: "One side of a relationship may be shouldering most of the practical or emotional load. Naming it kindly and redistributing a little could restore balance.",
      zh: "感情中，或许有一方承担了大部分事务或情绪劳动。温和地把这一点说出来，稍作调整，也许能找回平衡。",
    },
    careerMeaning: {
      en: "Your workload may have crept past sustainable. Delegating or declining one thing this week could protect the quality of the rest.",
      zh: "你的工作量可能已悄悄越过可持续的界线。这周试着移交或婉拒一件事，或许能保住其余事情的质量。",
    },
    growthMeaning: {
      en: "Consider why putting things down feels harder than picking them up. Practicing small releases may build trust that the world holds.",
      zh: "想一想，为什么“放下”比“拿起”更难。练习一点一点地卸载，或许会慢慢相信：天不会塌。",
    },
    reflectionQuestion: {
      en: "Which burden are you carrying that was never really yours?",
      zh: "你背负的担子里，哪一件其实从来不属于你？",
    },
    actionPrompt: {
      en: "Write your current commitments in a list and cross out or hand off one.",
      zh: "列出你目前承担的所有事务，划掉或转交其中一件。",
    },
    imagePath: "/images/tarot/ten-of-wands.svg",
  },
  {
    id: 32,
    slug: "page-of-wands",
    name: { en: "Page of Wands", zh: "权杖侍者" },
    arcana: "minor",
    suit: "wands",
    number: 11,
    uprightKeywords: {
      en: ["Curiosity", "Enthusiasm", "Exploration", "Fresh ideas"],
      zh: ["好奇心", "跃跃欲试", "探索", "新点子"],
    },
    reversedKeywords: {
      en: ["Restlessness", "Scattered ideas", "Hesitation", "Unfinished starts"],
      zh: ["浮躁", "想法零散", "踌躇", "有始无终"],
    },
    generalMeaning: {
      en: "The Page of Wands often embodies a curious, eager spirit at the start of something promising. It may suggest that a new interest deserves playful exploration before serious commitment. Letting yourself be a beginner could be exactly the point.",
      zh: "权杖侍者常常化身为一个跃跃欲试的探索者，站在某段可能性的起点。它可能提示，一个新的兴趣值得先轻松地玩一玩，再谈认真投入。允许自己做个新手，也许正是关键所在。",
    },
    loveMeaning: {
      en: "A playful, curious energy may be entering your connections. Approaching someone — or your partner — with fresh eyes could spark warmth.",
      zh: "一种轻快、好奇的气息，或许正走进你的关系。带着新鲜的眼光看待心仪的人或伴侣，可能擦出温暖的火花。",
    },
    careerMeaning: {
      en: "A new idea or field may be tugging at your attention. A small experiment could tell you more than long deliberation.",
      zh: "某个新想法或新领域可能正吸引着你。与其反复思量，不如先做个小实验，也许更能说明问题。",
    },
    growthMeaning: {
      en: "Notice where you have stopped asking questions. Reviving curiosity in one area may reopen doors you thought were closed.",
      zh: "留意你在哪些方面已经不再提问。在其中一处重新唤起好奇，或许能推开你以为早已关上的门。",
    },
    reflectionQuestion: {
      en: "What would you try this month if you allowed yourself to be a beginner?",
      zh: "如果允许自己从零开始，这个月你想尝试什么？",
    },
    actionPrompt: {
      en: "Spend thirty minutes exploring a topic that intrigues you, with no goal attached.",
      zh: "花三十分钟，不带任何目的地了解一个让你感兴趣的话题。",
    },
    imagePath: "/images/tarot/page-of-wands.svg",
  },
  {
    id: 33,
    slug: "knight-of-wands",
    name: { en: "Knight of Wands", zh: "权杖骑士" },
    arcana: "minor",
    suit: "wands",
    number: 12,
    uprightKeywords: {
      en: ["Bold action", "Passion", "Adventure", "Charisma"],
      zh: ["果敢行动", "热情", "冒险精神", "感染力"],
    },
    reversedKeywords: {
      en: ["Haste", "Impulsiveness", "Fizzling enthusiasm", "Scattered energy"],
      zh: ["操之过急", "冲动行事", "三分钟热度", "后劲不足"],
    },
    generalMeaning: {
      en: "The Knight of Wands often charges in with passion, confidence, and a taste for adventure. It may suggest a season for bold moves — or a reminder to check where all that fire is pointed. Pairing enthusiasm with a touch of follow-through could make the difference.",
      zh: "权杖骑士常常带着热情、自信和冒险的兴致疾驰而来。它可能预示一个适合大胆行动的时节，也可能提醒你看看这团火焰究竟指向何方。让热情配上一点执行的后劲，效果或许大不相同。",
    },
    loveMeaning: {
      en: "Intensity and excitement may color your romantic life now. Enjoying the spark while staying honest about your intentions could keep things kind.",
      zh: "此刻你的感情生活，或许带着几分炽热与心跳。享受火花的同时，对自己的心意保持诚实，这份体验会更善意。",
    },
    careerMeaning: {
      en: "You may feel ready to leap at an opportunity. Channeling the surge into one well-chosen move, rather than five, could serve you better.",
      zh: "面对机会，你也许已经跃跃欲试。把这股冲劲集中在一个精心选择的行动上，而不是同时铺开五件事，或许更有成效。",
    },
    growthMeaning: {
      en: "Consider how you finish, not just how you start. Practicing completion on one small project may steady your fire.",
      zh: "除了如何开始，也想想如何收尾。挑一件小事练习“善始善终”，或许能让你的热情烧得更稳。",
    },
    reflectionQuestion: {
      en: "Where might boldness serve you — and where might patience serve you better?",
      zh: "哪里需要你的果敢？哪里其实更需要耐心？",
    },
    actionPrompt: {
      en: "Pick one exciting idea and take a single decisive step on it today, then pause.",
      zh: "选一个让你兴奋的想法，今天果断走出一步，然后停下来观察。",
    },
    imagePath: "/images/tarot/knight-of-wands.svg",
  },
  {
    id: 34,
    slug: "queen-of-wands",
    name: { en: "Queen of Wands", zh: "权杖王后" },
    arcana: "minor",
    suit: "wands",
    number: 13,
    uprightKeywords: {
      en: ["Confidence", "Warmth", "Vitality", "Magnetism"],
      zh: ["自信", "热情洋溢", "生命力", "个人魅力"],
    },
    reversedKeywords: {
      en: ["Self-doubt", "Depleted energy", "Comparison", "Hidden insecurity"],
      zh: ["自我怀疑", "能量透支", "陷入比较", "隐藏的不安"],
    },
    generalMeaning: {
      en: "The Queen of Wands often radiates warm confidence — someone at home in their own energy who lifts the room. It may suggest a time to lead with authenticity and let your natural vitality show. Owning your presence need not mean dimming anyone else's.",
      zh: "权杖王后常常散发着温暖笃定的光——安住在自己的能量里，也照亮周围的人。它可能提示，现在正适合以真实的姿态站出来，让天然的生命力自然流露。活出自己的光彩，并不需要以遮蔽他人为代价。",
    },
    loveMeaning: {
      en: "Bringing your full, warm self into a relationship may deepen it. Confidence expressed as generosity could feel magnetic.",
      zh: "把完整而温暖的自己带进感情，或许能让关系更深厚。以慷慨表现出来的自信，往往格外动人。",
    },
    careerMeaning: {
      en: "Your presence may carry more influence than you realize. Mentoring, coordinating, or speaking up could suit this season.",
      zh: "你的存在感也许比你以为的更有分量。带新人、组织协调或公开表达，可能都很适合当下这个阶段。",
    },
    growthMeaning: {
      en: "Notice what feeds your vitality and what quietly drains it. Tending that fire deliberately may be the deepest self-care.",
      zh: "留意什么滋养你的活力，什么在悄悄消耗它。有意识地照看这团火，或许才是最深的自我关怀。",
    },
    reflectionQuestion: {
      en: "When do you feel most at home in your own energy?",
      zh: "什么时候的你，最安然地待在自己的能量里？",
    },
    actionPrompt: {
      en: "Do one thing today that reliably makes you feel alive, and notice its effect.",
      zh: "今天做一件总能让你感到有活力的事，并留意它带来的变化。",
    },
    imagePath: "/images/tarot/queen-of-wands.svg",
  },
  {
    id: 35,
    slug: "king-of-wands",
    name: { en: "King of Wands", zh: "权杖国王" },
    arcana: "minor",
    suit: "wands",
    number: 14,
    uprightKeywords: {
      en: ["Vision", "Leadership", "Boldness", "Inspiring others"],
      zh: ["远见", "领导力", "魄力", "鼓舞他人"],
    },
    reversedKeywords: {
      en: ["Impatience", "Overbearing tendencies", "Unfocused ambition", "Running on empty"],
      zh: ["急躁", "过于强势", "野心失焦", "热情透支"],
    },
    generalMeaning: {
      en: "The King of Wands often represents vision matured into leadership — fire that has learned direction. It may suggest stepping into fuller ownership of a goal and inviting others along. Leading by example could carry further than instruction.",
      zh: "权杖国王常常象征愿景沉淀为领导力——一团学会了方向的火。它可能提示你更完整地担起某个目标，并邀请他人同行。以身作则的带动，或许比言语的指令传得更远。",
    },
    loveMeaning: {
      en: "Steadiness of intent may matter now: knowing what you want and saying so with warmth. Passion guided by care could deepen trust.",
      zh: "此刻，心意的笃定也许很重要：清楚自己想要什么，并温暖地表达出来。带着体贴的热情，可能让信任更进一步。",
    },
    careerMeaning: {
      en: "You may be asked — or ready — to set direction rather than follow it. Sharing the vision clearly could rally the support you need.",
      zh: "你或许正被期待、或已准备好去制定方向，而不只是跟随。把愿景讲清楚，可能会为你凝聚所需的支持。",
    },
    growthMeaning: {
      en: "Consider the difference between driving others and drawing them. Leading from inspiration may ask you to master your own impatience first.",
      zh: "体会“推动他人”与“感召他人”的区别。以感染力去引领，或许先要修炼自己的急躁。",
    },
    reflectionQuestion: {
      en: "What vision are you ready to take fuller responsibility for?",
      zh: "哪个愿景，你已准备好更完整地为它负责？",
    },
    actionPrompt: {
      en: "Share one goal with someone it affects and invite their honest input.",
      zh: "向一位相关的人讲述你的一个目标，并诚恳邀请对方提意见。",
    },
    imagePath: "/images/tarot/king-of-wands.svg",
  },
  // ───────────────────────── Cups 圣杯 ─────────────────────────
  {
    id: 36,
    slug: "ace-of-cups",
    name: { en: "Ace of Cups", zh: "圣杯王牌" },
    arcana: "minor",
    suit: "cups",
    number: 1,
    uprightKeywords: {
      en: ["Emotional beginnings", "Open heart", "Compassion", "Intuition stirring"],
      zh: ["情感萌动", "敞开心扉", "慈悲", "直觉苏醒"],
    },
    reversedKeywords: {
      en: ["Blocked feelings", "Emptiness", "Holding back", "Self-neglect"],
      zh: ["情感受阻", "内心空落", "压抑感受", "忽略自己"],
    },
    generalMeaning: {
      en: "The Ace of Cups often signals an opening of the heart — new feelings, compassion, or creative tenderness rising up. It may suggest that emotional renewal is available if you let yourself receive it. What overflows here is meant to be shared, not hoarded.",
      zh: "圣杯王牌常常预示心门的开启——新的情感、柔软的慈悲或创作的灵思正在涌起。它可能提示，只要愿意接纳，情感的更新就在眼前。杯中满溢之物，宜于分享，而非独藏。",
    },
    loveMeaning: {
      en: "A new depth of feeling may be surfacing, in a new bond or a familiar one. Letting yourself be moved could be the invitation here.",
      zh: "无论新缘还是旧情，一种更深的感受也许正在浮现。允许自己被触动，或许正是这张牌的邀请。",
    },
    careerMeaning: {
      en: "Work may benefit from more heart — empathy with colleagues or genuine care for what you make. Emotional honesty could refresh a stale routine.",
      zh: "工作中或许可以多一点“心”的成分——对同事的体谅，或对作品真切的在意。情感上的真诚，可能让乏味的日常重新有了温度。",
    },
    growthMeaning: {
      en: "Consider what your heart has been waiting to feel or express. Making space for it, without judgment, may be quietly transformative.",
      zh: "想一想，你的内心一直在等待感受或表达什么。不加评判地为它腾出空间，改变或许就悄然发生。",
    },
    reflectionQuestion: {
      en: "What feeling have you been holding at arm's length?",
      zh: "哪一种感受，你一直把它挡在一臂之外？",
    },
    actionPrompt: {
      en: "Express one genuine feeling today — in words, writing, or a small gesture.",
      zh: "今天表达一份真实的感受，可以是话语、文字，或一个小小的举动。",
    },
    imagePath: "/images/tarot/ace-of-cups.svg",
  },
  {
    id: 37,
    slug: "two-of-cups",
    name: { en: "Two of Cups", zh: "圣杯二" },
    arcana: "minor",
    suit: "cups",
    number: 2,
    uprightKeywords: {
      en: ["Mutual connection", "Partnership", "Attraction", "Reciprocity"],
      zh: ["心意相通", "伙伴关系", "相互吸引", "有来有往"],
    },
    reversedKeywords: {
      en: ["Imbalance", "Miscommunication", "Distance", "Reconnecting with yourself"],
      zh: ["关系失衡", "沟通不畅", "疏离", "先与自己和好"],
    },
    generalMeaning: {
      en: "The Two of Cups often speaks of two people meeting as equals — attraction, alliance, or deep mutual regard. It may suggest that a bond in your life is ready to grow through honest exchange. What is offered and received in balance tends to endure.",
      zh: "圣杯二常常述说两个人以平等之姿相遇——吸引、结盟，或深深的相互欣赏。它可能提示，你生命中的某段联结，正待通过坦诚的往来而生长。给予与接受平衡的关系，往往更能长久。",
    },
    loveMeaning: {
      en: "Mutuality may be the theme: seeing and being seen. Small acts of reciprocity could strengthen the thread between you.",
      zh: "此刻的主题或许是“相互”：看见对方，也被对方看见。一来一往的小小心意，可能让你们之间的联结更牢固。",
    },
    careerMeaning: {
      en: "A partnership or working alliance may hold real promise. Clarifying what each side brings and needs could set it on solid ground.",
      zh: "一段合作关系也许颇具潜力。讲清楚彼此能付出什么、需要什么，或许能让合作走得更稳。",
    },
    growthMeaning: {
      en: "Notice how you show up in one-to-one connections. Practicing balanced give-and-take may begin with the relationship you have with yourself.",
      zh: "观察自己在一对一关系中的状态。练习平衡的给予与接受，或许要从与自己的关系开始。",
    },
    reflectionQuestion: {
      en: "In which relationship do you feel most truly met?",
      zh: "在哪段关系里，你感到自己被真正地看见和回应？",
    },
    actionPrompt: {
      en: "Reach out to someone who matters and offer a small, genuine exchange.",
      zh: "联系一位重要的人，主动送上一份小小的真诚往来。",
    },
    imagePath: "/images/tarot/two-of-cups.svg",
  },
  {
    id: 38,
    slug: "three-of-cups",
    name: { en: "Three of Cups", zh: "圣杯三" },
    arcana: "minor",
    suit: "cups",
    number: 3,
    uprightKeywords: {
      en: ["Friendship", "Celebration", "Community", "Shared joy"],
      zh: ["友谊", "欢庆", "群体", "共享喜悦"],
    },
    reversedKeywords: {
      en: ["Social fatigue", "Feeling left out", "Surface connections", "Overindulgence"],
      zh: ["社交疲惫", "被排除在外", "浮于表面", "过度放纵"],
    },
    generalMeaning: {
      en: "The Three of Cups often celebrates friendship, community, and joy that multiplies when shared. It may suggest leaning into your circle — for support, laughter, or simple company. Connection of this kind could be less a luxury than a nutrient.",
      zh: "圣杯三常常礼赞友谊、群体，以及因分享而加倍的欢乐。它可能提示你多向自己的圈子靠一靠——寻求支持、笑声，或只是简单的陪伴。这样的联结与其说是奢侈品，不如说是养分。",
    },
    loveMeaning: {
      en: "Your relationship may be nourished by friendship — within it and around it. Letting joy be witnessed by others could feel affirming.",
      zh: "感情或许正被友谊滋养——既在关系之内，也在关系周围。让喜悦被朋友们见证，可能带来一种被祝福的踏实感。",
    },
    careerMeaning: {
      en: "Team spirit or a supportive network may be an asset now. Celebrating group wins could bind the team for harder seasons.",
      zh: "团队的凝聚力或人际网络，此刻可能是你的助力。为集体的成果庆祝，或许能为更艰难的阶段积蓄情谊。",
    },
    growthMeaning: {
      en: "Consider who genuinely celebrates you. Investing in those friendships may return more than the time it takes.",
      zh: "想想谁会真心为你高兴。经营这些友谊所花的时间，或许会以更丰厚的方式回到你身上。",
    },
    reflectionQuestion: {
      en: "Who are the people with whom your joy feels safest?",
      zh: "和哪些人在一起时，你的快乐最无需设防？",
    },
    actionPrompt: {
      en: "Arrange a simple get-together with friends you have not seen in a while.",
      zh: "约上许久未见的朋友，安排一次简单的小聚。",
    },
    imagePath: "/images/tarot/three-of-cups.svg",
  },
  {
    id: 39,
    slug: "four-of-cups",
    name: { en: "Four of Cups", zh: "圣杯四" },
    arcana: "minor",
    suit: "cups",
    number: 4,
    uprightKeywords: {
      en: ["Apathy", "Re-evaluation", "Contemplation", "Overlooked offers"],
      zh: ["意兴阑珊", "重新审视", "沉思", "忽略眼前的机会"],
    },
    reversedKeywords: {
      en: ["Renewed interest", "Emerging from withdrawal", "Acceptance", "New openness"],
      zh: ["兴趣回归", "走出低潮", "接纳", "重新敞开"],
    },
    generalMeaning: {
      en: "The Four of Cups often portrays a mood of discontent or emotional flatness, where offers nearby go unnoticed. It may suggest a season of inward review — useful, so long as it does not harden into refusal. Looking again at what is being offered could shift the scene.",
      zh: "圣杯四常常描绘一种意兴阑珊的心境：情绪平淡，身边递来的杯盏也无心留意。它可能意味着一段向内梳理的时期——这本是有益的，只要别让它固化成一概拒绝。重新看一眼眼前的给予，画面或许就会不同。",
    },
    loveMeaning: {
      en: "A certain flatness may have settled over your romantic life. Turning attention to what is actually present, rather than what is missing, could rekindle something.",
      zh: "感情生活或许蒙上了一层倦意。把注意力从“缺少什么”转向“眼前有什么”，也许能重新点燃一些东西。",
    },
    careerMeaning: {
      en: "Work may feel uninspiring even if nothing is wrong. Asking what would re-engage you, and looking for a version of it nearby, could help.",
      zh: "工作也许没什么不好，却提不起劲。问问自己什么能重新点燃投入感，再看看身边有没有它的影子，或许会有帮助。",
    },
    growthMeaning: {
      en: "Notice whether contemplation is restoring you or isolating you. A short, honest check-in with yourself may reveal which.",
      zh: "觉察一下：这份沉思是在滋养你，还是在孤立你？和自己做一次简短诚实的对话，也许就能分辨。",
    },
    reflectionQuestion: {
      en: "What might you be declining without having really looked at it?",
      zh: "有什么东西，你还没认真看一眼，就已经摆手拒绝了？",
    },
    actionPrompt: {
      en: "Revisit one recent offer or invitation and give it a genuine second look.",
      zh: "找出最近收到的一个提议或邀请，认真地重新考虑一次。",
    },
    imagePath: "/images/tarot/four-of-cups.svg",
  },
  {
    id: 40,
    slug: "five-of-cups",
    name: { en: "Five of Cups", zh: "圣杯五" },
    arcana: "minor",
    suit: "cups",
    number: 5,
    uprightKeywords: {
      en: ["Grief", "Loss", "Regret", "What still remains"],
      zh: ["哀伤", "失去", "遗憾", "尚存的美好"],
    },
    reversedKeywords: {
      en: ["Acceptance", "Moving through grief", "Forgiveness", "Turning around"],
      zh: ["接纳", "走过哀伤", "宽恕", "转身向前"],
    },
    generalMeaning: {
      en: "The Five of Cups often honors grief — attention drawn to what has spilled, while other cups still stand behind. It may suggest that mourning a loss is legitimate work, and also that it will not be the whole story. When you are ready, turning slightly may bring what remains into view.",
      zh: "圣杯五常常是对哀伤的致意：目光落在倾洒的杯盏上，而身后仍有杯盏立着。它可能提示，为失去而哀悼是正当且必要的，但这不会是故事的全部。当你准备好时，稍稍转身，或许就能看见留存下来的东西。",
    },
    loveMeaning: {
      en: "A disappointment or ending may still be asking to be felt. Giving grief its time, without deciding it is permanent, could be the kindest pace.",
      zh: "一段失望或结束，也许仍需要被好好感受。给哀伤应有的时间，同时不认定它会永远停留，或许是对自己最温柔的节奏。",
    },
    careerMeaning: {
      en: "A setback may loom larger than the options still open. Once the sting is acknowledged, an honest inventory of what remains could reorient you.",
      zh: "一次挫折，可能显得比仍然敞开的选项更庞大。先承认那份刺痛，再诚实盘点手中还有什么，方向感或许会慢慢回来。",
    },
    growthMeaning: {
      en: "Consider what this loss has shown you about what you value. Grief and gratitude may be able to share the same room.",
      zh: "想一想，这次失去让你看清了自己珍视什么。哀伤与感激，或许可以同处一室。",
    },
    reflectionQuestion: {
      en: "What still stands in your life, even after what was lost?",
      zh: "在失去之后，你的生活里还有什么依然立着？",
    },
    actionPrompt: {
      en: "Write down two things that remain steady for you, alongside what you are grieving.",
      zh: "在写下所哀伤之事的同时，也写下两件依然稳稳存在的事物。",
    },
    imagePath: "/images/tarot/five-of-cups.svg",
  },
  {
    id: 41,
    slug: "six-of-cups",
    name: { en: "Six of Cups", zh: "圣杯六" },
    arcana: "minor",
    suit: "cups",
    number: 6,
    uprightKeywords: {
      en: ["Nostalgia", "Innocence", "Kindness", "Reconnection"],
      zh: ["怀旧", "纯真", "善意", "重逢"],
    },
    reversedKeywords: {
      en: ["Living in the past", "Rose-tinted memory", "Moving forward", "Inner-child healing"],
      zh: ["沉湎过去", "记忆滤镜", "着眼当下", "疗愈内在小孩"],
    },
    generalMeaning: {
      en: "The Six of Cups often carries the sweetness of memory — childhood, old friends, simpler exchanges of kindness. It may suggest that revisiting the past can be nourishing, offering gifts to bring back rather than a place to stay. Simple generosity could be its most practical message.",
      zh: "圣杯六常常带着记忆的甜味——童年、旧友、单纯的善意往来。它可能提示，回望过去可以是一种滋养：从中带回礼物，而不是长住其中。而它最落地的讯息，或许就是简单的善意本身。",
    },
    loveMeaning: {
      en: "Warm history — or someone from it — may color your feelings now. Asking what the memory offers your present could keep you clear-eyed.",
      zh: "温暖的往事，或往事中的某个人，也许正影响着你此刻的心绪。问问这段记忆能为现在带来什么，或许能让你看得更清。",
    },
    careerMeaning: {
      en: "An old skill, contact, or interest may hold new relevance. Revisiting past work with today's eyes could surface something useful.",
      zh: "一项旧技能、一位旧相识或一个旧爱好，可能正焕发新的价值。用今天的眼光重看过去的积累，或许会有意外收获。",
    },
    growthMeaning: {
      en: "Consider what your younger self loved that you have set aside. Reclaiming a piece of it may restore a missing kind of joy.",
      zh: "想想年少的自己曾热爱、如今却被搁置的事物。把其中一小块找回来，也许能补上一种久违的快乐。",
    },
    reflectionQuestion: {
      en: "What gift from your past deserves a place in your present?",
      zh: "过去馈赠给你的东西里，哪一件值得在当下拥有一席之地？",
    },
    actionPrompt: {
      en: "Reconnect with an old friend or revisit a childhood pleasure this week.",
      zh: "这周联系一位老朋友，或重温一件童年喜爱的小事。",
    },
    imagePath: "/images/tarot/six-of-cups.svg",
  },
  {
    id: 42,
    slug: "seven-of-cups",
    name: { en: "Seven of Cups", zh: "圣杯七" },
    arcana: "minor",
    suit: "cups",
    number: 7,
    uprightKeywords: {
      en: ["Many options", "Imagination", "Daydreams", "Choice needed"],
      zh: ["选择纷繁", "想象力", "白日梦", "需要取舍"],
    },
    reversedKeywords: {
      en: ["Clarity emerging", "Commitment", "Cutting through illusion", "Grounded choices"],
      zh: ["渐趋清晰", "做出承诺", "看破幻象", "脚踏实地的选择"],
    },
    generalMeaning: {
      en: "The Seven of Cups often shows a sky full of options, each shimmering, not all substantial. It may suggest that imagination is generous right now while discernment is the scarce resource. Testing one dream against reality could tell you more than admiring seven.",
      zh: "圣杯七常常呈现漫天的选项，个个闪光，却未必都有分量。它可能提示，此刻想象力慷慨盛放，稀缺的反而是分辨力。把一个梦想放到现实里试一试，或许胜过对着七个梦想出神。",
    },
    loveMeaning: {
      en: "Fantasies about how love should look may be crowding out what it is. Grounding your hopes in real conversations could bring welcome clarity.",
      zh: "关于爱情“应该”是什么样的想象，也许正遮住它实际的样子。把期待落到真实的交流里，或许能换来难得的清晰。",
    },
    careerMeaning: {
      en: "Multiple paths may glitter at once. Choosing one to explore concretely, even briefly, could turn confusion into information.",
      zh: "眼前可能同时闪烁着好几条路。选定一条做点具体的小尝试，哪怕浅尝辄止，也能把迷茫变成有用的信息。",
    },
    growthMeaning: {
      en: "Notice which dreams you keep only as dreams. Asking what you truly want beneath them may simplify the field.",
      zh: "留意哪些梦想被你一直只当作梦想。追问它们底下你真正渴望的是什么，选项或许会自然变少。",
    },
    reflectionQuestion: {
      en: "Which of your options would you still choose after a week of honest thought?",
      zh: "冷静想上一周之后，哪个选项你依然会选？",
    },
    actionPrompt: {
      en: "Pick one appealing option and outline its first real step by tonight.",
      zh: "挑出一个吸引你的选项，今晚之前写下它真实的第一步。",
    },
    imagePath: "/images/tarot/seven-of-cups.svg",
  },
  {
    id: 43,
    slug: "eight-of-cups",
    name: { en: "Eight of Cups", zh: "圣杯八" },
    arcana: "minor",
    suit: "cups",
    number: 8,
    uprightKeywords: {
      en: ["Walking away", "Seeking deeper meaning", "Transition", "Brave departure"],
      zh: ["转身离开", "追寻更深的意义", "过渡", "勇敢启程"],
    },
    reversedKeywords: {
      en: ["Fear of leaving", "One more try", "Avoidance", "Unclear direction"],
      zh: ["不敢离开", "再试一次", "回避", "方向未明"],
    },
    generalMeaning: {
      en: "The Eight of Cups often depicts a quiet departure from something that once mattered but no longer feeds the soul. It may suggest that walking away can be an act of respect — for the past and for what you still seek. The path onward may be uphill, and still worth it.",
      zh: "圣杯八常常描绘一次安静的离开：告别曾经重要、如今却不再滋养内心的事物。它可能提示，转身离开也可以是一种敬意——既敬过往，也敬你仍在追寻的东西。前路或许上坡，却可能值得。",
    },
    loveMeaning: {
      en: "You may be sensing that something needs to change — in a bond or in what you seek from it. Honoring that inner signal, gently and honestly, could be the work now.",
      zh: "你或许隐约感到有些东西需要改变——可能是关系本身，也可能是你对关系的期待。温和而诚实地对待这份内心讯号，也许正是当下的功课。",
    },
    careerMeaning: {
      en: "A role or path may have quietly emptied of meaning. Exploring what more would look like for you, before any leap, could clarify the timing.",
      zh: "某个职位或方向，也许已在不知不觉间失去了意义。在做任何跳跃之前，先弄清你想要的“更多”具体是什么，时机或许会更明朗。",
    },
    growthMeaning: {
      en: "Consider what you have outgrown. Leaving well — with gratitude rather than resentment — may shape what you find next.",
      zh: "想一想自己已经从哪里“毕业”了。好好地离开——带着感激而非怨怼——或许会影响你接下来遇见什么。",
    },
    reflectionQuestion: {
      en: "What might you need to leave behind in order to grow?",
      zh: "为了继续成长，你或许需要放下什么？",
    },
    actionPrompt: {
      en: "Name one pursuit that no longer nourishes you and reduce its space by one notch.",
      zh: "指出一件不再滋养你的事，把它占据的空间调小一格。",
    },
    imagePath: "/images/tarot/eight-of-cups.svg",
  },
  {
    id: 44,
    slug: "nine-of-cups",
    name: { en: "Nine of Cups", zh: "圣杯九" },
    arcana: "minor",
    suit: "cups",
    number: 9,
    uprightKeywords: {
      en: ["Contentment", "Satisfaction", "Wishes ripening", "Gratitude"],
      zh: ["心满意足", "满足感", "愿望将近", "感恩"],
    },
    reversedKeywords: {
      en: ["Surface satisfaction", "Wanting more", "Misplaced wishes", "Overindulgence"],
      zh: ["表面的满足", "欲求不满", "许错了愿", "耽于享乐"],
    },
    generalMeaning: {
      en: "The Nine of Cups often carries the glow of satisfaction — wishes ripening, comfort earned. It may suggest a moment to actually enjoy what you have wanted and worked for. Savoring, it turns out, may be a skill of its own.",
      zh: "圣杯九常常带着满足的光泽——愿望渐熟，安逸有据。它可能提示，是时候真正享受你曾渴望并为之努力的东西了。细细品味，原来也是一门需要练习的功夫。",
    },
    loveMeaning: {
      en: "There may be real sweetness available in your emotional life now. Letting yourself enjoy it, without bracing for loss, could deepen it.",
      zh: "此刻你的情感生活里，或许有实实在在的甜。允许自己安心享受，而不是随时防备失去，这份甜也许会更醇厚。",
    },
    careerMeaning: {
      en: "A goal may be close to fulfilled, or already quietly achieved. Pausing to register the win could restore motivation for what follows.",
      zh: "某个目标可能已近达成，或其实早已悄悄实现。停下来确认这份成果，或许能为接下来的路补充动力。",
    },
    growthMeaning: {
      en: "Consider the difference between pleasure and fulfillment. Knowing which one you are seeking may refine your next wish.",
      zh: "体会“快乐”与“满足”的不同。分清自己此刻在追求哪一个，下一个愿望或许会许得更准。",
    },
    reflectionQuestion: {
      en: "What wish, already granted, have you not yet fully enjoyed?",
      zh: "哪个已经实现的愿望，你还没有好好享受过？",
    },
    actionPrompt: {
      en: "Choose one comfort you already have and savor it deliberately today.",
      zh: "选一样你已经拥有的美好，今天专心地享受它一次。",
    },
    imagePath: "/images/tarot/nine-of-cups.svg",
  },
  {
    id: 45,
    slug: "ten-of-cups",
    name: { en: "Ten of Cups", zh: "圣杯十" },
    arcana: "minor",
    suit: "cups",
    number: 10,
    uprightKeywords: {
      en: ["Emotional fulfillment", "Family harmony", "Lasting bonds", "Shared happiness"],
      zh: ["情感圆满", "家庭和睦", "长久的联结", "共同的幸福"],
    },
    reversedKeywords: {
      en: ["Strained harmony", "Unmet ideals", "Disconnection", "Redefining belonging"],
      zh: ["和谐承压", "理想落差", "疏离", "重新定义归属"],
    },
    generalMeaning: {
      en: "The Ten of Cups often paints the fullness of emotional life — love that extends into family, chosen or given, and a sense of belonging. It may suggest that lasting happiness grows from tending everyday bonds. The rainbow tends to appear over ordinary houses.",
      zh: "圣杯十常常描绘情感生活的圆满——爱延伸为家庭（无论血缘还是自选），延伸为归属感。它可能提示，长久的幸福生长自对日常关系的经营。彩虹，往往正悬在寻常人家的屋顶上。",
    },
    loveMeaning: {
      en: "A deep, settled happiness may be available or forming. Investing in shared rituals and everyday kindness could be what sustains it.",
      zh: "一种深沉安定的幸福，或许已在眼前，或正在成形。共同的小仪式与日常的体贴，可能正是维系它的方式。",
    },
    careerMeaning: {
      en: "Work-life harmony may deserve attention now. Aligning career choices with the life you want at home could bring quieter satisfaction.",
      zh: "工作与生活的平衡，此刻或许值得关注。让职业选择与你期望的家庭生活同向而行，可能带来更安静的满足。",
    },
    growthMeaning: {
      en: "Consider what belonging means to you and who belongs in it. Tending your closest circle may be the most rewarding project.",
      zh: "想一想“归属”对你意味着什么，谁在其中。用心经营最亲近的小圈子，或许是回报最深的一项事业。",
    },
    reflectionQuestion: {
      en: "What does your version of a full, happy life actually look like?",
      zh: "属于你自己的圆满生活，究竟是什么模样？",
    },
    actionPrompt: {
      en: "Create one small shared moment with the people closest to you today.",
      zh: "今天为最亲近的人创造一个小小的共处时刻。",
    },
    imagePath: "/images/tarot/ten-of-cups.svg",
  },
  {
    id: 46,
    slug: "page-of-cups",
    name: { en: "Page of Cups", zh: "圣杯侍者" },
    arcana: "minor",
    suit: "cups",
    number: 11,
    uprightKeywords: {
      en: ["Creative openings", "Gentle curiosity", "Intuitive nudges", "Playfulness"],
      zh: ["创意萌芽", "温柔的好奇", "直觉的提示", "童心"],
    },
    reversedKeywords: {
      en: ["Emotional immaturity", "Moodiness", "Ignored intuition", "Creative doubt"],
      zh: ["情绪化", "心绪起伏", "忽视直觉", "怀疑灵感"],
    },
    generalMeaning: {
      en: "The Page of Cups often arrives with a small surprise from the heart — a feeling, a fancy, an intuitive nudge as odd as a fish in a cup. It may suggest staying open to messages that do not arrive by logic. Play and tenderness could be doors, not distractions.",
      zh: "圣杯侍者常常带来一份来自内心的小惊喜——一种感受、一个奇想、一次直觉的轻推，就像杯中探出的那尾鱼。它可能提示你，对不循逻辑而来的讯息保持敞开。玩心与柔软，或许是门，而不是干扰。",
    },
    loveMeaning: {
      en: "Tender, slightly shy feelings may be surfacing. Expressing them lightly, without demanding an outcome, could be a sweet experiment.",
      zh: "一些柔软而略带羞涩的心意，也许正在冒头。轻轻表达出来，不强求结果，或许是一场温柔的尝试。",
    },
    careerMeaning: {
      en: "A creative or unconventional idea may deserve a hearing, including your own. Capturing it before judging it could preserve its value.",
      zh: "一个有创意、不那么常规的想法，或许值得被听见——包括你自己的。先记下它，再去评判，价值才不会流失。",
    },
    growthMeaning: {
      en: "Notice the quiet signals of your intuition this week. Recording them, without acting yet, may teach you their language.",
      zh: "这一周，留意直觉发出的细微信号。先记录，不急着行动，或许能慢慢读懂它的语言。",
    },
    reflectionQuestion: {
      en: "What is your intuition trying to say just beneath the noise?",
      zh: "在喧闹之下，你的直觉正想对你说什么？",
    },
    actionPrompt: {
      en: "Note one intuitive impression each day for three days and review them after.",
      zh: "连续三天，每天记下一个直觉印象，之后再回头看看。",
    },
    imagePath: "/images/tarot/page-of-cups.svg",
  },
  {
    id: 47,
    slug: "knight-of-cups",
    name: { en: "Knight of Cups", zh: "圣杯骑士" },
    arcana: "minor",
    suit: "cups",
    number: 12,
    uprightKeywords: {
      en: ["Romantic gestures", "Following the heart", "Charm", "Invitations"],
      zh: ["浪漫的表达", "追随内心", "风度", "邀约将至"],
    },
    reversedKeywords: {
      en: ["Unrealistic promises", "Moodiness", "Escaping into fantasy", "Mixed signals"],
      zh: ["承诺失实", "情绪多变", "以幻想避世", "信号不明"],
    },
    generalMeaning: {
      en: "The Knight of Cups often rides in led by the heart — romantic, idealistic, bearing an offer or an invitation. It may suggest a time to act on feeling with grace, or to receive such a gesture thoughtfully. Beauty of intent may still want a check for substance.",
      zh: "圣杯骑士常常由心引路而来——浪漫、理想主义，手捧一份提议或邀请。它可能预示一个适合优雅地为情感行动的时机，也提醒你审慎地接住这样一份心意。动人的初衷，或许仍需掂一掂它的分量。",
    },
    loveMeaning: {
      en: "Romance may take on a poetic quality now — gestures, invitations, sweet attention. Enjoying it while weighing actions over words could serve your heart.",
      zh: "感情此刻或许带上了几分诗意——心意的表示、邀约、温柔的关注。享受它的同时，多看行动、少信空话，或许更能护住自己的心。",
    },
    careerMeaning: {
      en: "An appealing offer or collaboration may arrive attractively dressed. Appreciating the vision while verifying the details could be wise.",
      zh: "一个包装动人的机会或合作也许会出现。欣赏它的愿景之余，核实细节，或许才是稳妥之道。",
    },
    growthMeaning: {
      en: "Consider how you balance idealism and follow-through. Choosing one heartfelt intention and completing it may unite the two.",
      zh: "想想你如何平衡“理想”与“落实”。选一个发自内心的念头并把它完成，或许能让两者合一。",
    },
    reflectionQuestion: {
      en: "Where is your heart inviting you, and what would graceful action look like?",
      zh: "你的心正邀你去往哪里？优雅的行动会是什么样子？",
    },
    actionPrompt: {
      en: "Make one sincere, beautiful gesture toward someone or something you love.",
      zh: "为你所爱的人或事物，做一个真诚而美好的表示。",
    },
    imagePath: "/images/tarot/knight-of-cups.svg",
  },
  {
    id: 48,
    slug: "queen-of-cups",
    name: { en: "Queen of Cups", zh: "圣杯王后" },
    arcana: "minor",
    suit: "cups",
    number: 13,
    uprightKeywords: {
      en: ["Compassion", "Emotional depth", "Intuition", "Holding space"],
      zh: ["慈悲", "情感深度", "直觉敏锐", "涵容"],
    },
    reversedKeywords: {
      en: ["Emotional overwhelm", "Blurred boundaries", "Self-neglect", "Absorbing others' moods"],
      zh: ["情绪泛滥", "边界模糊", "忽略自己", "吸收他人情绪"],
    },
    generalMeaning: {
      en: "The Queen of Cups often embodies compassion with composure — deep feeling held in a steady vessel. It may suggest offering a listening, non-judging presence to someone, perhaps including yourself. Gentle boundaries could be what keep such empathy sustainable.",
      zh: "圣杯王后常常体现一种沉静的慈悲——深厚的情感，被稳稳地盛在杯中。它可能提示你为某个人提供一份倾听而不评判的陪伴，这个人也许正是你自己。温和的边界，或许正是让这份共情得以长久的东西。",
    },
    loveMeaning: {
      en: "Emotional attunement may deepen a bond now. Listening beneath the words, while staying anchored in yourself, could be the gift.",
      zh: "情感上的细腻感知，此刻或许能让关系更深。听见言语之下的心声，同时稳住自己，这本身就是一份礼物。",
    },
    careerMeaning: {
      en: "Empathy may be your quiet strength at work — in care, mediation, or team morale. Protecting your own reserves lets it keep flowing.",
      zh: "共情力可能是你在职场上安静的优势——体现在关怀、调解或团队氛围中。守住自己的能量储备，这份力量才能持续流动。",
    },
    growthMeaning: {
      en: "Notice whose emotions you tend to carry home. Learning to feel with others, without carrying it all for them, may be this season's practice.",
      zh: "留意你习惯把谁的情绪背回家。学着与他人“共感”而不全然“代受”，或许是这个阶段的修习。",
    },
    reflectionQuestion: {
      en: "Where do your feelings end and someone else's begin?",
      zh: "你的感受与他人的感受，边界在哪里？",
    },
    actionPrompt: {
      en: "Offer someone ten minutes of undivided, judgment-free listening today.",
      zh: "今天送给某个人十分钟不受打扰、不加评判的倾听。",
    },
    imagePath: "/images/tarot/queen-of-cups.svg",
  },
  {
    id: 49,
    slug: "king-of-cups",
    name: { en: "King of Cups", zh: "圣杯国王" },
    arcana: "minor",
    suit: "cups",
    number: 14,
    uprightKeywords: {
      en: ["Emotional balance", "Calm under pressure", "Wise counsel", "Steady care"],
      zh: ["情绪稳健", "临危不乱", "睿智的开导", "沉稳的关怀"],
    },
    reversedKeywords: {
      en: ["Repressed emotion", "Inner turbulence", "Detachment", "Passive responses"],
      zh: ["压抑情绪", "表面平静内心翻涌", "情感疏离", "消极应对"],
    },
    generalMeaning: {
      en: "The King of Cups often models emotional maturity — not the absence of feeling, but feeling navigated with steadiness. It may suggest responding to charged situations as the calm in the room. Composure that includes your emotions, rather than burying them, could be the aim.",
      zh: "圣杯国王常常示范何为情绪的成熟——不是没有感受，而是带着感受依然稳步前行。它可能提示你在波澜之中扮演那份沉着。真正的从容是容纳情绪，而不是掩埋情绪。",
    },
    loveMeaning: {
      en: "Steadiness may be what a relationship needs from you now — or what you deserve to receive. Speaking about feelings calmly could deepen trust.",
      zh: "此刻的感情，或许需要你给出安稳，或者你也值得被这样对待。心平气和地谈论感受，可能让信任更深一层。",
    },
    careerMeaning: {
      en: "You may be looked to for calm judgment amid tension. Balancing diplomacy with honesty could raise the quality of decisions around you.",
      zh: "在紧张的局面里，大家或许期待你的冷静判断。在圆融与坦诚之间拿捏平衡，可能提升周遭决策的质量。",
    },
    growthMeaning: {
      en: "Consider what your calm is made of — regulation or suppression. Letting one trusted person see beneath the surface may ease the difference.",
      zh: "看一看你的平静由什么构成：是调节，还是压抑？让一位信得过的人看见水面之下的你，或许能让这两者的差别变轻。",
    },
    reflectionQuestion: {
      en: "When pressure rises, what happens to your feelings — and where do they go?",
      zh: "压力升高时，你的情绪去了哪里？",
    },
    actionPrompt: {
      en: "The next time emotion surges, pause for three breaths before responding.",
      zh: "下次情绪涌上来时，先深呼吸三次，再做回应。",
    },
    imagePath: "/images/tarot/king-of-cups.svg",
  },
  // ───────────────────────── Swords 宝剑 ─────────────────────────
  {
    id: 50,
    slug: "ace-of-swords",
    name: { en: "Ace of Swords", zh: "宝剑王牌" },
    arcana: "minor",
    suit: "swords",
    number: 1,
    uprightKeywords: {
      en: ["Clarity", "Breakthrough", "Truth", "New ideas"],
      zh: ["清晰", "突破", "真相", "新思路"],
    },
    reversedKeywords: {
      en: ["Confusion", "Clouded judgment", "Harsh words", "Information overload"],
      zh: ["思绪混乱", "判断模糊", "言语伤人", "信息过载"],
    },
    generalMeaning: {
      en: "The Ace of Swords often marks a cut-through moment — a truth named, an idea crystallizing, fog lifting. It may suggest that clarity is available if you are willing to see plainly. A sharp mind serves best when guided by honest intent.",
      zh: "宝剑王牌常常标记一个“劈开迷雾”的时刻——一句道破的真话、一个成形的想法、一阵散去的雾气。它可能提示，只要愿意直视，清晰就触手可及。锋利的头脑，最好由诚实的初心来执掌。",
    },
    loveMeaning: {
      en: "Honest conversation may be the doorway now. Naming things clearly, with care, could release long-held tension.",
      zh: "坦诚的对话，或许正是当下的那扇门。清楚而体贴地把话说开，长期的郁结可能随之松动。",
    },
    careerMeaning: {
      en: "A new insight or strategy may cut through a stuck problem. Writing the idea down in one clear sentence could test its strength.",
      zh: "一个新的洞见或思路，也许能切开僵持已久的难题。试着用一句清晰的话写下它，就能掂出它的分量。",
    },
    growthMeaning: {
      en: "Consider where you have been avoiding a plain truth. Saying it to yourself first, simply and kindly, may be the breakthrough.",
      zh: "想想你在哪里一直回避一个明摆着的事实。先对自己简单而温和地说出它，突破也许就从这里开始。",
    },
    reflectionQuestion: {
      en: "What truth becomes obvious when you stop softening it?",
      zh: "如果不再回避粉饰，哪个事实会立刻变得清楚？",
    },
    actionPrompt: {
      en: "Write one honest sentence about a situation you have been circling.",
      zh: "为一件你一直绕着走的事，写下一句诚实的话。",
    },
    imagePath: "/images/tarot/ace-of-swords.svg",
  },
  {
    id: 51,
    slug: "two-of-swords",
    name: { en: "Two of Swords", zh: "宝剑二" },
    arcana: "minor",
    suit: "swords",
    number: 2,
    uprightKeywords: {
      en: ["Difficult choice", "Stalemate", "Weighing options", "Guarded heart"],
      zh: ["两难抉择", "僵持", "反复权衡", "封闭内心"],
    },
    reversedKeywords: {
      en: ["Decision surfacing", "Removing the blindfold", "Tension releasing", "Facts revealed"],
      zh: ["抉择浮现", "摘下眼罩", "僵局松动", "真相显露"],
    },
    generalMeaning: {
      en: "The Two of Swords often shows a decision postponed — eyes covered, options held at equal arm's length. It may suggest that not choosing has quietly become its own choice. Letting in a little more information, or a little more feeling, could tip the balance.",
      zh: "宝剑二常常呈现一个被搁置的决定：蒙住双眼，把两个选项举在同样远的地方。它可能提示，“不选择”其实已悄悄成为一种选择。多接收一点信息，或多允许一点感受，天平或许就会倾斜。",
    },
    loveMeaning: {
      en: "You may be keeping your heart carefully neutral to avoid a hard call. Asking what you are protecting yourself from could loosen the standoff.",
      zh: "为了回避一个艰难的决定，你也许正让心保持小心翼翼的中立。问问自己在防备什么，僵局或许会松动。",
    },
    careerMeaning: {
      en: "Two paths may look equally weighted because key information is missing. Seeking one concrete data point could break the tie.",
      zh: "两条路看起来难分高下，也许是因为缺了关键信息。去补上一个具体的事实依据，答案或许立现。",
    },
    growthMeaning: {
      en: "Notice how indecision feels in your body. Practicing quick choices on low-stakes matters may rebuild trust in your judgment.",
      zh: "感受一下“悬而未决”留在身体里的滋味。在无关紧要的小事上练习快速决定，或许能重建对自己判断力的信任。",
    },
    reflectionQuestion: {
      en: "What decision are you deferring, and what is the delay costing?",
      zh: "你在拖延哪个决定？这份拖延正让你付出什么？",
    },
    actionPrompt: {
      en: "For one pending choice, list what you already know and the one thing you still need to learn.",
      zh: "针对一个悬着的选择，写下你已知的部分，以及唯一还需要弄清的事。",
    },
    imagePath: "/images/tarot/two-of-swords.svg",
  },
  {
    id: 52,
    slug: "three-of-swords",
    name: { en: "Three of Swords", zh: "宝剑三" },
    arcana: "minor",
    suit: "swords",
    number: 3,
    uprightKeywords: {
      en: ["Heartache", "Painful truth", "Grief", "Necessary release"],
      zh: ["心痛", "刺痛的真相", "悲伤", "必要的释放"],
    },
    reversedKeywords: {
      en: ["Healing", "Forgiveness", "Pain easing", "Letting the wound close"],
      zh: ["疗愈", "宽恕", "伤痛缓解", "让伤口愈合"],
    },
    generalMeaning: {
      en: "The Three of Swords often names heartache directly — a truth or loss that pierces. It may suggest that the pain you feel is real and deserves acknowledgment rather than argument. Storms on this card pass; what is learned about your own heart tends to stay.",
      zh: "宝剑三常常直言心痛——一个刺入心口的真相或失去。它可能提示，你感受到的疼是真实的，值得被承认，而不是被辩驳。牌面上的风雨会过去；而你对自己内心的了解，往往会留下来。",
    },
    loveMeaning: {
      en: "A hurt may need to be felt before it can soften. Naming the pain honestly, to yourself or a trusted person, could begin the mending.",
      zh: "有些伤，需要先被好好感受，才会慢慢变软。向自己或信任的人如实说出这份疼，修复或许就此开始。",
    },
    careerMeaning: {
      en: "Difficult feedback or a disappointment may sting sharply. Once the first wave passes, extracting the one useful truth could turn pain into material.",
      zh: "尖锐的反馈或一次失望，可能确实很刺痛。等第一波情绪过去，从中提炼出那一条有用的实话，疼痛或许就能变成养分。",
    },
    growthMeaning: {
      en: "Consider how you usually treat your own pain — rushing it, judging it, or letting it speak. Simply allowing it room may change its shape.",
      zh: "看看你平时如何对待自己的痛：催促它、评判它，还是听它说话？单是给它空间，它的形状或许就会改变。",
    },
    reflectionQuestion: {
      en: "What truth, though painful, might be trying to free you?",
      zh: "哪个虽然刺痛、却可能正在解放你的真相？",
    },
    actionPrompt: {
      en: "Give a current hurt fifteen unhurried minutes — write about it without fixing it.",
      zh: "给眼下的一处伤心十五分钟：只书写，不急着修复。",
    },
    imagePath: "/images/tarot/three-of-swords.svg",
  },
  {
    id: 53,
    slug: "four-of-swords",
    name: { en: "Four of Swords", zh: "宝剑四" },
    arcana: "minor",
    suit: "swords",
    number: 4,
    uprightKeywords: {
      en: ["Rest", "Recovery", "Quiet mind", "Deliberate pause"],
      zh: ["休息", "复原", "静心", "主动暂停"],
    },
    reversedKeywords: {
      en: ["Restlessness", "Forced pause", "Burnout warning", "Returning to action"],
      zh: ["无法安宁", "被迫停下", "透支预警", "重返行动"],
    },
    generalMeaning: {
      en: "The Four of Swords often prescribes stillness — a deliberate retreat where the mind can set down its weapons. It may suggest that rest is not a reward for finishing but part of how anything gets finished. Even a brief, true pause could restore more than you expect.",
      zh: "宝剑四常常开出一张“静”的处方：一次有意的退隐，让头脑得以放下刀剑。它可能提示，休息不是完工后的奖赏，而是完成任何事的一部分。哪怕只是短暂而真正的停顿，恢复的程度也许超出想象。",
    },
    loveMeaning: {
      en: "A relationship may benefit from calm rather than more processing. Gentle, undemanding time together — or apart — could reset the tone.",
      zh: "感情此刻需要的或许是平静，而不是更多的“深谈”。一段温和、不带要求的相处或独处，可能让气氛重新归位。",
    },
    careerMeaning: {
      en: "Pushing harder may be yielding less. Building genuine recovery into your schedule could be the most productive decision available.",
      zh: "再用力，产出反而可能在下降。把真正的休整排进日程，或许是眼下最有效率的决定。",
    },
    growthMeaning: {
      en: "Notice your relationship with stopping. If rest feels like guilt, exploring why may free a great deal of energy.",
      zh: "观察你和“停下来”的关系。如果休息让你内疚，探究一下缘由，或许能释放出很大一部分能量。",
    },
    reflectionQuestion: {
      en: "What would truly restful look like for you this week?",
      zh: "对现在的你来说，真正的休息是什么样子？",
    },
    actionPrompt: {
      en: "Block out one screen-free hour of rest today and protect it.",
      zh: "今天留出一小时不看屏幕的休息时间，并守住它。",
    },
    imagePath: "/images/tarot/four-of-swords.svg",
  },
  {
    id: 54,
    slug: "five-of-swords",
    name: { en: "Five of Swords", zh: "宝剑五" },
    arcana: "minor",
    suit: "swords",
    number: 5,
    uprightKeywords: {
      en: ["Hollow victory", "Conflict costs", "Discord", "Win-lose thinking"],
      zh: ["得不偿失的胜利", "冲突的代价", "不和", "输赢思维"],
    },
    reversedKeywords: {
      en: ["Making amends", "Releasing grudges", "Lessons from conflict", "Choosing peace"],
      zh: ["修复关系", "放下芥蒂", "冲突的教训", "选择和解"],
    },
    generalMeaning: {
      en: "The Five of Swords often asks what winning actually won — the field is cleared, but at a cost to connection. It may suggest examining a conflict for its true price. Sometimes the strong move could be stepping back from a fight that has no good ending.",
      zh: "宝剑五常常追问：赢，究竟赢来了什么——战场清空了，情谊却付了账。它可能提示你核算一场冲突的真实成本。有时更有力量的一步，或许是从一场没有好结局的争斗中退出来。",
    },
    loveMeaning: {
      en: "Being right may have started to cost more than it gives. Choosing repair over victory, where it feels safe, could change the pattern.",
      zh: "“争个对错”的代价，也许已经大过它带来的东西。在感到安全的前提下，把“修复”放在“赢”前面，模式或许会开始改变。",
    },
    careerMeaning: {
      en: "Workplace friction may tempt you toward battles of ego. Weighing each conflict against your actual goals could save real energy.",
      zh: "职场摩擦可能诱使你卷入意气之争。把每场冲突放到真正的目标前掂一掂，或许能省下不少心力。",
    },
    growthMeaning: {
      en: "Consider a recent conflict from the other side of the field. What you notice may soften the story you have been telling.",
      zh: "试着站到战场的另一边，回看最近的一次冲突。你注意到的东西，也许会让你讲给自己的版本柔和一些。",
    },
    reflectionQuestion: {
      en: "Which battle in your life may not be worth its price?",
      zh: "生活中的哪场“战斗”，可能并不值得它的代价？",
    },
    actionPrompt: {
      en: "Identify one dispute to release, and mark it closed in your own mind.",
      zh: "选一桩可以放下的争执，在心里为它郑重画上句号。",
    },
    imagePath: "/images/tarot/five-of-swords.svg",
  },
  {
    id: 55,
    slug: "six-of-swords",
    name: { en: "Six of Swords", zh: "宝剑六" },
    arcana: "minor",
    suit: "swords",
    number: 6,
    uprightKeywords: {
      en: ["Transition", "Moving on", "Calmer waters ahead", "Carrying what matters"],
      zh: ["过渡", "启程离开", "驶向平静", "带上紧要之物"],
    },
    reversedKeywords: {
      en: ["Resisting change", "Unfinished business", "Rough crossing", "Lingering too long"],
      zh: ["抗拒改变", "未了之事", "颠簸的过渡", "迟迟未走"],
    },
    generalMeaning: {
      en: "The Six of Swords often shows a quiet crossing — leaving turbulent waters for something calmer, with what matters carried aboard. It may suggest that a transition underway, though somber, is heading somewhere gentler. Progress here may feel less like triumph and more like relief.",
      zh: "宝剑六常常呈现一场安静的摆渡：离开波涛，驶向更平静的水域，紧要之物随船同行。它可能提示，一段正在进行的过渡虽显沉静，方向却更温和。这里的前进，感觉或许不像凯旋，更像松了口气。",
    },
    loveMeaning: {
      en: "You may be moving out of a rocky emotional stretch. Letting the crossing take its time, without reopening old arguments, could steady the passage.",
      zh: "你也许正走出一段情感上的颠簸。让这段过渡按自己的节奏完成，不去重启旧日的争执，船行或许更稳。",
    },
    careerMeaning: {
      en: "A change of role, team, or approach may be carrying you toward workable ground. Bringing lessons but not grievances could lighten the load.",
      zh: "角色、团队或方法的转变，可能正把你带向更可行的位置。带上经验、放下积怨，行囊会轻很多。",
    },
    growthMeaning: {
      en: "Consider what you are ready to leave on the far shore. Transitions may complete faster when you stop checking behind you.",
      zh: "想想哪些东西可以留在对岸。当你不再频频回头，过渡也许会完成得更快。",
    },
    reflectionQuestion: {
      en: "What calmer place are you slowly moving toward?",
      zh: "你正在缓缓驶向的那片平静水域，是什么？",
    },
    actionPrompt: {
      en: "Do one practical thing today that moves a difficult transition forward.",
      zh: "今天做一件实际的小事，让一段艰难的过渡再前进一点。",
    },
    imagePath: "/images/tarot/six-of-swords.svg",
  },
  {
    id: 56,
    slug: "seven-of-swords",
    name: { en: "Seven of Swords", zh: "宝剑七" },
    arcana: "minor",
    suit: "swords",
    number: 7,
    uprightKeywords: {
      en: ["Strategy", "Acting alone", "Discretion", "Unspoken plans"],
      zh: ["谋略", "独自行动", "谨慎行事", "未言明的打算"],
    },
    reversedKeywords: {
      en: ["Coming clean", "Conscience speaking", "Making amends", "Plans exposed"],
      zh: ["坦白", "良心的声音", "弥补", "计划败露"],
    },
    generalMeaning: {
      en: "The Seven of Swords often raises questions of strategy and candor — moving quietly, holding cards close, perhaps taking shortcuts. It may suggest checking whether discretion has drifted toward avoidance or concealment, in yourself or a situation. Cleverness tends to serve best when it can survive daylight.",
      zh: "宝剑七常常抛出关于策略与坦诚的问题——悄然行动、深藏底牌，或许还抄了近路。它可能提示你检视：无论在自己身上还是在局势之中，“谨慎”是否已滑向“回避”或“隐瞒”。经得起阳光的聪明，往往才最有用。",
    },
    loveMeaning: {
      en: "Something unsaid may be shaping the connection. Choosing honest disclosure at a kind moment could relieve more than it risks.",
      zh: "一些没有说出口的东西，也许正影响着这段关系。挑一个温和的时机坦诚相告，卸下的或许比冒险的更多。",
    },
    careerMeaning: {
      en: "Strategy and timing may matter now — not every plan needs an audience. Staying strategic while keeping your integrity intact could be the line to walk.",
      zh: "此刻讲究策略与时机——并非每个计划都需要公之于众。在保持谋略的同时守住诚信，或许正是要走的那条线。",
    },
    growthMeaning: {
      en: "Notice where you act indirectly because directness feels unsafe. Understanding that fear may open more honest options.",
      zh: "留意你在哪些地方绕着弯行事，只因直接令你不安。看懂这份不安，更坦率的选项或许会随之出现。",
    },
    reflectionQuestion: {
      en: "Where might you be avoiding directness, and what would honesty free up?",
      zh: "你在哪里回避着直接？坦诚又会为你释放什么？",
    },
    actionPrompt: {
      en: "Choose one small thing you have been indirect about and address it plainly.",
      zh: "挑一件你一直拐弯处理的小事，直截了当地把它说清。",
    },
    imagePath: "/images/tarot/seven-of-swords.svg",
  },
  {
    id: 57,
    slug: "eight-of-swords",
    name: { en: "Eight of Swords", zh: "宝剑八" },
    arcana: "minor",
    suit: "swords",
    number: 8,
    uprightKeywords: {
      en: ["Feeling trapped", "Self-imposed limits", "Restricted thinking", "Fear's narrative"],
      zh: ["受困感", "自我设限", "思维束缚", "被恐惧叙事"],
    },
    reversedKeywords: {
      en: ["Freeing yourself", "New perspective", "Questioning beliefs", "First step out"],
      zh: ["自我松绑", "换个视角", "质疑既有信念", "迈出第一步"],
    },
    generalMeaning: {
      en: "The Eight of Swords often depicts restriction that is looser than it looks — bindings held in place more by thought than by circumstance. It may suggest that a stuck situation contains more room to move than fear allows you to see. Testing one assumption could loosen the whole arrangement.",
      zh: "宝剑八常常描绘一种“看似严实、实则松动”的束缚——捆住人的与其说是处境，不如说是想法。它可能提示，让你动弹不得的局面里，其实存在比恐惧所允许的更多的活动空间。检验其中一个假设，整个困局或许都会松动。",
    },
    loveMeaning: {
      en: "Beliefs like it cannot change may be doing the confining. Asking what you would try if you felt free could reveal a real option.",
      zh: "“反正改变不了”这类信念，也许才是真正的绳索。问问自己：如果感到自由，你会尝试什么？答案里可能藏着真实的选项。",
    },
    careerMeaning: {
      en: "You may feel stuck in a role or dynamic with no exit. Listing your actual constraints versus assumed ones could redraw the map.",
      zh: "你或许觉得被困在某个职位或格局里，无路可走。把“真实的限制”和“想象的限制”分开列出来，地图也许会重新展开。",
    },
    growthMeaning: {
      en: "Notice the phrases you use about what you cannot do. Rewriting one of them as a question may be the first loosened knot.",
      zh: "留意你描述“我做不到”时的惯用句式。把其中一句改写成疑问句，或许就是解开的第一个绳结。",
    },
    reflectionQuestion: {
      en: "Which of your limits are real, and which are stories you have practiced?",
      zh: "你的种种限制中，哪些是事实，哪些只是练熟了的故事？",
    },
    actionPrompt: {
      en: "Take one small step that assumes you have slightly more freedom than you feel.",
      zh: "假设自己比感觉中稍微自由一点，据此走出一小步。",
    },
    imagePath: "/images/tarot/eight-of-swords.svg",
  },
  {
    id: 58,
    slug: "nine-of-swords",
    name: { en: "Nine of Swords", zh: "宝剑九" },
    arcana: "minor",
    suit: "swords",
    number: 9,
    uprightKeywords: {
      en: ["Anxiety", "Sleepless worry", "Rumination", "Fears magnified"],
      zh: ["焦虑", "夜不能寐", "反复思虑", "恐惧被放大"],
    },
    reversedKeywords: {
      en: ["Dawn after a hard night", "Perspective returning", "Reaching out", "Worry easing"],
      zh: ["长夜将尽", "视角回归", "开口求助", "焦虑缓解"],
    },
    generalMeaning: {
      en: "The Nine of Swords often captures the three-a.m. mind, where worries swell in the dark. It may suggest that your fears, while pointing to real concerns, could be drawn larger than life right now. Bringing them into daylight — onto paper, or into a trusted conversation — may return them to their true size.",
      zh: "宝剑九常常刻画凌晨三点的头脑：忧虑在黑暗中不断膨胀。它可能提示，你的恐惧虽然指向真实的牵挂，此刻却或许被画得比实物更大。把它们带到日光下——写在纸上，或说给信任的人听——它们也许就会缩回原本的尺寸。",
    },
    loveMeaning: {
      en: "Worry may be writing scripts about the relationship that reality has not confirmed. Gently checking one fear against the facts could quiet the loop.",
      zh: "担忧也许正替这段感情编写着现实并未证实的剧本。温和地拿一个担忧去对照事实，循环的思绪或许会安静下来。",
    },
    careerMeaning: {
      en: "Work anxieties may loom largest away from your desk. Turning one vague dread into a concrete, checkable question could shrink it.",
      zh: "工作的焦虑，往往在离开办公桌后显得最庞大。把一团模糊的不安换成一个具体、可查证的问题，它也许就会缩小。",
    },
    growthMeaning: {
      en: "Consider how you tend yourself on hard nights. Building one small ritual of comfort may matter more than solving everything tonight.",
      zh: "想想难熬的夜里，你如何照顾自己。建立一个小小的安抚仪式，或许比今晚就解决一切更重要。",
    },
    reflectionQuestion: {
      en: "Which of your night-time worries would survive being written down in daylight?",
      zh: "夜里的种种担忧，哪一个能在白天的纸面上站得住脚？",
    },
    actionPrompt: {
      en: "Write your top three worries down and note one small step for the most real one.",
      zh: "写下最困扰你的三件事，并为其中最真实的一件想出一小步对策。",
    },
    imagePath: "/images/tarot/nine-of-swords.svg",
  },
  {
    id: 59,
    slug: "ten-of-swords",
    name: { en: "Ten of Swords", zh: "宝剑十" },
    arcana: "minor",
    suit: "swords",
    number: 10,
    uprightKeywords: {
      en: ["Painful ending", "Cycle complete", "Release", "Dawn approaching"],
      zh: ["痛的终章", "周期完成", "释怀", "黎明将至"],
    },
    reversedKeywords: {
      en: ["Slow recovery", "Rising again", "Lessons settling", "Resisting closure"],
      zh: ["缓慢复原", "重新站起", "沉淀教训", "抗拒收尾"],
    },
    generalMeaning: {
      en: "The Ten of Swords often marks a definite ending — something has run its full course, and pretending otherwise no longer works. It may suggest that acknowledging the completion, however hard, is what lets recovery begin. On the card's horizon, notably, the sun is rising.",
      zh: "宝剑十常常标记一个明确的终点：某件事已走完全程，再假装如常已无意义。它可能提示，承认“结束”虽难，却正是复原得以开始的地方。值得留意的是，牌面的地平线上，太阳正在升起。",
    },
    loveMeaning: {
      en: "A chapter may have genuinely closed, and grieving it is allowed. Naming the ending clearly, when you are ready, could be the first act of healing.",
      zh: "一段章节或许真的已经合上，为它难过是被允许的。当你准备好时，清楚地承认这个结束，也许就是疗愈的第一步。",
    },
    careerMeaning: {
      en: "A project, role, or approach may have reached its natural end. Conducting an honest retrospective could turn the loss into groundwork.",
      zh: "一个项目、职位或方法，也许已走到它自然的终点。做一次诚实的复盘，损失或许就能化为下一程的地基。",
    },
    growthMeaning: {
      en: "Consider what this ending definitively teaches. Endings honored fully may leave cleaner ground than endings denied.",
      zh: "想想这次结束确凿地教会了你什么。被完整送别的结束，往往比被否认的结束，留下更干净的土壤。",
    },
    reflectionQuestion: {
      en: "What has ended that you are ready to stop reviving?",
      zh: "哪件已经结束的事，你准备好不再反复唤醒它了？",
    },
    actionPrompt: {
      en: "Write a short closing note to something that has ended, and put it away.",
      zh: "为一件已经结束的事写几句告别的话，然后把它收好。",
    },
    imagePath: "/images/tarot/ten-of-swords.svg",
  },
  {
    id: 60,
    slug: "page-of-swords",
    name: { en: "Page of Swords", zh: "宝剑侍者" },
    arcana: "minor",
    suit: "swords",
    number: 11,
    uprightKeywords: {
      en: ["Curiosity", "Mental agility", "Vigilance", "New information"],
      zh: ["求知欲", "思维敏捷", "警觉", "新讯息"],
    },
    reversedKeywords: {
      en: ["Gossip", "Scattered thinking", "Hasty words", "All talk, little action"],
      zh: ["流言", "思绪散乱", "言语仓促", "光说不练"],
    },
    generalMeaning: {
      en: "The Page of Swords often brings restless mental energy — questions, observations, news, a mind that wants to know. It may suggest a good season for learning and honest inquiry. Aiming that sharp curiosity carefully, before it becomes chatter, could multiply its value.",
      zh: "宝剑侍者常常带来跃动的思维能量——提问、观察、新消息，一颗渴望弄明白的头脑。它可能预示一个适合学习与坦诚探究的时期。在锋利的好奇变成闲谈之前给它一个准星，价值或许会成倍增长。",
    },
    loveMeaning: {
      en: "Questions about a connection may deserve direct, kind asking rather than detective work. Curiosity aimed at understanding could open doors.",
      zh: "关于感情的疑问，或许值得直接而友善地问出口，而不是暗自侦查。以理解为目的的好奇，可能会打开门。",
    },
    careerMeaning: {
      en: "New information or a learning opportunity may be worth pursuing now. Verifying facts before passing them on could protect your credibility.",
      zh: "一条新信息或一个学习机会，此刻或许值得追进一步。转述之前先核实，可能守护你的可信度。",
    },
    growthMeaning: {
      en: "Notice where your mental energy scatters. Choosing one question to pursue deeply this week may sharpen everything else.",
      zh: "留意你的思维能量散落在哪里。这一周选定一个问题深入追究，其余的思考或许也会随之变得锋利。",
    },
    reflectionQuestion: {
      en: "What question, honestly pursued, could change how you see your situation?",
      zh: "哪个问题一旦认真追究，可能改变你看待处境的方式？",
    },
    actionPrompt: {
      en: "Pick one open question in your life and spend twenty minutes researching it properly.",
      zh: "选一个悬而未解的问题，花二十分钟认真查证和了解它。",
    },
    imagePath: "/images/tarot/page-of-swords.svg",
  },
  {
    id: 61,
    slug: "knight-of-swords",
    name: { en: "Knight of Swords", zh: "宝剑骑士" },
    arcana: "minor",
    suit: "swords",
    number: 12,
    uprightKeywords: {
      en: ["Decisive action", "Directness", "Sharp focus", "Driving ambition"],
      zh: ["雷厉风行", "直截了当", "高度专注", "进取心"],
    },
    reversedKeywords: {
      en: ["Recklessness", "Rushed decisions", "Blunt words", "Charging blindly"],
      zh: ["鲁莽", "仓促决定", "言辞过锐", "横冲直撞"],
    },
    generalMeaning: {
      en: "The Knight of Swords often charges toward a goal with speed and conviction, cutting through hesitation. It may suggest that swift, focused action suits the moment — provided the direction has been checked. Slowing for one breath before the charge could save a costly detour.",
      zh: "宝剑骑士常常带着速度与决心直取目标，斩断犹疑。它可能提示，当下适合迅速而专注的行动——前提是方向已经核对。冲锋之前留一口气确认路线，或许能省去昂贵的弯路。",
    },
    loveMeaning: {
      en: "Directness may clear the air, though delivery matters. Saying what you mean with warmth, not just speed, could help it land well.",
      zh: "有话直说也许能让空气清爽，但表达方式很关键。把真心话说得既明确又带着温度，效果或许更好。",
    },
    careerMeaning: {
      en: "Momentum may favor bold, fast moves now. Pairing your speed with one round of scrutiny could keep boldness from becoming haste.",
      zh: "眼下的势头或许有利于果断快攻。在提速的同时加一道审视，果敢才不至于变成莽撞。",
    },
    growthMeaning: {
      en: "Consider what your urgency is really about. Learning when speed serves you, and when it spends you, may be this knight's lesson.",
      zh: "想想你的急切究竟从何而来。分清速度何时成就你、何时消耗你，或许正是这位骑士的功课。",
    },
    reflectionQuestion: {
      en: "Where would decisive action genuinely help — and where might it flatten something delicate?",
      zh: "哪里真正需要你当机立断？哪里又可能被这股冲劲碾过？",
    },
    actionPrompt: {
      en: "Choose one stalled matter and move it today with one clear, direct communication.",
      zh: "挑一件停滞的事，今天用一次清晰直接的沟通推动它。",
    },
    imagePath: "/images/tarot/knight-of-swords.svg",
  },
  {
    id: 62,
    slug: "queen-of-swords",
    name: { en: "Queen of Swords", zh: "宝剑王后" },
    arcana: "minor",
    suit: "swords",
    number: 13,
    uprightKeywords: {
      en: ["Clear judgment", "Honest communication", "Independence", "Boundaried kindness"],
      zh: ["明断", "坦诚沟通", "独立", "有边界的善意"],
    },
    reversedKeywords: {
      en: ["Coldness", "Sharp words", "Isolation", "Old wounds hardening"],
      zh: ["冷淡", "言语尖刻", "自我孤立", "旧伤化作苛刻"],
    },
    generalMeaning: {
      en: "The Queen of Swords often embodies clarity seasoned by experience — direct speech, clean boundaries, warmth that does not cloud judgment. It may suggest meeting your situation with honest eyes and honest words. Truth delivered with respect could be the tool this moment asks for.",
      zh: "宝剑王后常常体现历练后的清明——直率的言语、清爽的边界，以及不遮蔽判断的温度。它可能提示你用诚实的眼睛和诚实的话语面对眼前的局面。带着尊重说出的真话，或许正是此刻需要的工具。",
    },
    loveMeaning: {
      en: "Clear-eyed honesty may serve the relationship better than tactful fog. Saying what is true for you, kindly and without apology, could deepen respect.",
      zh: "清醒的坦诚，也许比含糊的客气更能滋养关系。友善而不必抱歉地说出你的真实想法，可能赢得更深的尊重。",
    },
    careerMeaning: {
      en: "Your ability to see and say things plainly may be needed now. Offering analysis without malice could make you the trusted voice in the room.",
      zh: "你把事情看清、说明的能力，此刻或许正被需要。就事论事、不带恶意的分析，可能让你成为场合中被信任的声音。",
    },
    growthMeaning: {
      en: "Consider where past hurts may have sharpened your edges. Keeping the clarity while releasing the armor may be the finer skill.",
      zh: "想想过往的伤，是否磨利了你的棱角。留住清明、卸下铠甲，或许是更精细的功夫。",
    },
    reflectionQuestion: {
      en: "Where do you need to be more honest — with others, or with yourself?",
      zh: "你更需要对谁诚实一些：他人，还是自己？",
    },
    actionPrompt: {
      en: "Offer one piece of honest, constructive feedback with care today.",
      zh: "今天用心地送出一条诚实而有建设性的反馈。",
    },
    imagePath: "/images/tarot/queen-of-swords.svg",
  },
  {
    id: 63,
    slug: "king-of-swords",
    name: { en: "King of Swords", zh: "宝剑国王" },
    arcana: "minor",
    suit: "swords",
    number: 14,
    uprightKeywords: {
      en: ["Intellectual clarity", "Fairness", "Strategic thinking", "Principled decisions"],
      zh: ["理性清明", "公正", "战略思维", "有原则的决断"],
    },
    reversedKeywords: {
      en: ["Rigid logic", "Cold detachment", "Misused authority", "Rules over people"],
      zh: ["理性僵化", "冷漠疏离", "滥用权威", "重规则轻人情"],
    },
    generalMeaning: {
      en: "The King of Swords often stands for principled clarity — decisions made on reason, ethics, and evidence rather than mood. It may suggest a time to think structurally and judge fairly, including toward yourself. Logic tempered with humanity tends to rule best.",
      zh: "宝剑国王常常代表有原则的清明：以理性、道义和事实为据做决定，而非凭一时情绪。它可能提示，现在适合结构化地思考、公允地评判——对自己也一样。以人情调和的逻辑，往往治理得最好。",
    },
    loveMeaning: {
      en: "Fairness and clear agreements may be what the relationship needs. Balancing analysis with tenderness could keep truth from turning clinical.",
      zh: "公平与清楚的约定，或许正是这段关系需要的。在分析之外保留柔软，真话才不至于变得冰冷。",
    },
    careerMeaning: {
      en: "Strategic, dispassionate thinking may be your strongest asset now. Writing out criteria before deciding could keep the process clean and defensible.",
      zh: "冷静的战略思考，此刻可能是你最大的资产。决定之前先写下评判标准，过程会更清爽，也更站得住脚。",
    },
    growthMeaning: {
      en: "Consider where you rule yourself too strictly. Applying your fairness inward may be the growth this card points to.",
      zh: "看看你在哪些地方对自己过于严苛。把你的公正也用在自己身上，或许正是这张牌指向的成长。",
    },
    reflectionQuestion: {
      en: "What decision would you make if you trusted both your reason and your values?",
      zh: "如果同时信任你的理性与价值观，你会做出什么决定？",
    },
    actionPrompt: {
      en: "For one pending decision, write three objective criteria and apply them.",
      zh: "为一个待定的决定写下三条客观标准，并照此评估。",
    },
    imagePath: "/images/tarot/king-of-swords.svg",
  },
  // ─────────────────────── Pentacles 星币 ───────────────────────
  {
    id: 64,
    slug: "ace-of-pentacles",
    name: { en: "Ace of Pentacles", zh: "星币王牌" },
    arcana: "minor",
    suit: "pentacles",
    number: 1,
    uprightKeywords: {
      en: ["New opportunity", "Material beginnings", "Seed of prosperity", "Grounded start"],
      zh: ["新机遇", "物质起点", "富足的种子", "稳健开局"],
    },
    reversedKeywords: {
      en: ["Missed opportunity", "Shaky planning", "Scarcity thinking", "Delayed returns"],
      zh: ["机会错身", "规划不稳", "匮乏心态", "回报延迟"],
    },
    generalMeaning: {
      en: "The Ace of Pentacles often offers a seed — an opportunity with tangible, practical promise. It may suggest that conditions favor starting something with real-world roots: a job, a habit, an investment of effort. Seeds of this kind tend to reward steady tending over grand gestures.",
      zh: "星币王牌常常递来一颗种子：一个带着切实前景的机会。它可能提示，眼下的土壤适合开始一件“落地”的事——一份工作、一个习惯、一笔心力的投入。这类种子，偏爱细水长流的照料，胜过声势浩大的姿态。",
    },
    loveMeaning: {
      en: "A connection may be ready to grow practical roots — shared plans, steady presence. Small consistent gestures could matter more than declarations.",
      zh: "一段感情或许正待扎下现实的根——共同的计划、可靠的陪伴。细小而持续的行动，可能比郑重的宣言更有分量。",
    },
    careerMeaning: {
      en: "A tangible opportunity may be within reach — a role, project, or income stream. Assessing it on fundamentals, then committing properly, could set a strong base.",
      zh: "一个实实在在的机会也许就在手边：一个职位、一个项目，或一份新的收入来源。按基本面评估，再认真投入，或许能打下扎实的底子。",
    },
    growthMeaning: {
      en: "Consider what security means to you beyond numbers. Building one grounding habit may compound quietly over time.",
      zh: "想一想，数字之外，“安稳”对你意味着什么。建立一个让自己踏实的习惯，时间会让它悄悄复利。",
    },
    reflectionQuestion: {
      en: "What opportunity in front of you deserves patient, practical care?",
      zh: "眼前哪个机会，值得你用耐心和务实去浇灌？",
    },
    actionPrompt: {
      en: "Take the first concrete step on one practical goal — schedule it, save for it, or start it.",
      zh: "为一个务实的目标迈出具体的第一步：把它排上日程、存下第一笔，或直接动手。",
    },
    imagePath: "/images/tarot/ace-of-pentacles.svg",
  },
  {
    id: 65,
    slug: "two-of-pentacles",
    name: { en: "Two of Pentacles", zh: "星币二" },
    arcana: "minor",
    suit: "pentacles",
    number: 2,
    uprightKeywords: {
      en: ["Balance", "Juggling priorities", "Adaptability", "Flexible rhythm"],
      zh: ["平衡", "多头兼顾", "随机应变", "灵活的节奏"],
    },
    reversedKeywords: {
      en: ["Overcommitment", "Dropped balls", "Disorganization", "Strained juggling"],
      zh: ["承诺过多", "顾此失彼", "手忙脚乱", "难以为继"],
    },
    generalMeaning: {
      en: "The Two of Pentacles often shows life in juggle mode — resources, roles, and demands kept aloft through constant small adjustments. It may suggest that your balance is dynamic, not fixed, and that rhythm matters more than rigid control. Deciding what may safely drop could be part of the dance.",
      zh: "星币二常常呈现“抛接球”般的生活：资源、角色与需求，靠不断的微调保持在空中。它可能提示，平衡是动态的，而非一劳永逸；节奏感比死死掌控更重要。想清楚哪只球允许落地，或许也是这支舞的一部分。",
    },
    loveMeaning: {
      en: "Time and attention may feel stretched between love and everything else. Naming the busy season honestly and protecting small pockets of presence could keep the bond fed.",
      zh: "在感情与其他事务之间，时间与心力也许都被拉得很满。坦诚说明现阶段的忙碌，同时守住一些专心相处的小时段，关系就仍有养分。",
    },
    careerMeaning: {
      en: "Multiple demands may be competing for the same hours. Reviewing priorities weekly, and renegotiating one, could restore a workable rhythm.",
      zh: "多项任务可能正在争抢同一段时间。每周检视一次优先级，并就其中一项重新商量，节奏或许能重新变得可行。",
    },
    growthMeaning: {
      en: "Notice whether busyness has become your default identity. Choosing what not to juggle may be the more grown-up skill.",
      zh: "觉察“忙”是否已成为你默认的身份。学会选择不接哪只球，或许是更成熟的本事。",
    },
    reflectionQuestion: {
      en: "Which of the balls you are juggling actually needs you to hold it?",
      zh: "你抛接着的这些球里，哪些真的非你不可？",
    },
    actionPrompt: {
      en: "List everything currently demanding your energy and consciously deprioritize one item.",
      zh: "列出目前消耗你精力的所有事项，有意识地把其中一件往后排。",
    },
    imagePath: "/images/tarot/two-of-pentacles.svg",
  },
  {
    id: 66,
    slug: "three-of-pentacles",
    name: { en: "Three of Pentacles", zh: "星币三" },
    arcana: "minor",
    suit: "pentacles",
    number: 3,
    uprightKeywords: {
      en: ["Teamwork", "Craftsmanship", "Skill recognized", "Building together"],
      zh: ["协作", "匠心", "技能被认可", "共同建造"],
    },
    reversedKeywords: {
      en: ["Misaligned team", "Working in isolation", "Careless work", "Undervalued contribution"],
      zh: ["配合失调", "单打独斗", "敷衍了事", "贡献被低估"],
    },
    generalMeaning: {
      en: "The Three of Pentacles often celebrates skilled work done in concert — different crafts meeting around a shared build. It may suggest that collaboration, with roles respected, could take your work further than solo effort. Quality here tends to come from both pride in craft and openness to input.",
      zh: "星币三常常礼赞协同中的手艺：不同的专长，围绕同一件作品汇聚。它可能提示，在彼此尊重分工的前提下，协作或许能把事情带到单打独斗到不了的地方。这里的质量，往往同时来自对手艺的自重与对意见的敞开。",
    },
    loveMeaning: {
      en: "A relationship may benefit from being built like a shared project — each person's strengths named and used. Working on one small thing together could renew the sense of team.",
      zh: "感情或许可以像共同的作品一样经营——看见并善用彼此的长处。一起完成一件小事，可能重新唤起“我们是一队”的感觉。",
    },
    careerMeaning: {
      en: "Your skill may be gaining notice, or a collaboration may be forming. Clarifying roles early and inviting feedback could raise the whole build.",
      zh: "你的专业能力也许正被看见，或一次合作正在成形。尽早明确分工、主动邀请反馈，整件事的水准或许都会提升。",
    },
    growthMeaning: {
      en: "Consider where you default to doing everything alone. Letting one person contribute to your project may improve both it and the bond.",
      zh: "想想你在哪些事上习惯了一个人扛。允许一个人参与进来，作品和情谊或许都会更好。",
    },
    reflectionQuestion: {
      en: "Whose skills would complement yours on what you are building now?",
      zh: "你正在建造的事情上，谁的专长恰好能补上你的短板？",
    },
    actionPrompt: {
      en: "Ask one person for specific input on something you are working on.",
      zh: "就手头的一件事，向一个人请教具体的意见。",
    },
    imagePath: "/images/tarot/three-of-pentacles.svg",
  },
  {
    id: 67,
    slug: "four-of-pentacles",
    name: { en: "Four of Pentacles", zh: "星币四" },
    arcana: "minor",
    suit: "pentacles",
    number: 4,
    uprightKeywords: {
      en: ["Security", "Holding on", "Conserving resources", "Control"],
      zh: ["安全感", "紧握不放", "节制守成", "掌控"],
    },
    reversedKeywords: {
      en: ["Loosening the grip", "Reexamining security", "Sharing more freely", "Fear of loss"],
      zh: ["松开手", "重审安全感", "更愿分享", "害怕失去"],
    },
    generalMeaning: {
      en: "The Four of Pentacles often shows security held tightly — savings guarded, control maintained, change kept at bay. It may suggest asking whether your holding is prudence, or fear wearing prudence's clothes. What is gripped too hard, including comfort, can be hard to enjoy.",
      zh: "星币四常常呈现被紧紧攥住的安全感：守住积蓄、维持掌控、把变化挡在门外。它可能提示你分辨：这份紧握是审慎，还是披着审慎外衣的恐惧。攥得太紧的东西——包括安稳本身——往往也难以享受。",
    },
    loveMeaning: {
      en: "Holding a relationship too tightly may squeeze the ease out of it. Experimenting with a little more trust could let warmth circulate.",
      zh: "把感情攥得太紧，轻松感或许会被挤走。试着多给出一点信任，温度也许才能流动起来。",
    },
    careerMeaning: {
      en: "Caution with resources or territory may be serving you — up to a point. Reviewing what your guardedness protects, and what it blocks, could refine the strategy.",
      zh: "对资源或领地的谨慎，也许一直在保护你——但有其限度。审视这份防守护住了什么、又挡住了什么，策略或许能更精准。",
    },
    growthMeaning: {
      en: "Consider your relationship with enough. Practicing one small act of loosening — sharing, delegating, spending mindfully — may show you where your security really lives.",
      zh: "想想你与“足够”的关系。练习一次小小的松手——分享、放权，或一笔想清楚的花费——或许能让你看见安全感真正的来处。",
    },
    reflectionQuestion: {
      en: "What are you holding so tightly that it has begun to hold you?",
      zh: "你紧握不放的东西里，哪一样已经反过来握住了你？",
    },
    actionPrompt: {
      en: "Choose one small resource — time, money, or control — and share a little of it today.",
      zh: "从时间、金钱或掌控感中选一样，今天小小地分出去一点。",
    },
    imagePath: "/images/tarot/four-of-pentacles.svg",
  },
  {
    id: 68,
    slug: "five-of-pentacles",
    name: { en: "Five of Pentacles", zh: "星币五" },
    arcana: "minor",
    suit: "pentacles",
    number: 5,
    uprightKeywords: {
      en: ["Hardship", "Feeling left out", "Lean times", "Help nearby"],
      zh: ["困顿", "被排除在外的感觉", "拮据时期", "援手在侧"],
    },
    reversedKeywords: {
      en: ["Recovery", "Accepting help", "Conditions improving", "Confidence returning"],
      zh: ["境况好转", "接受帮助", "走出低谷", "信心回归"],
    },
    generalMeaning: {
      en: "The Five of Pentacles often depicts a lean, cold stretch — materially, physically, or in the feeling of being left outside. It may suggest that the hardship is real, and also that support may be closer than it appears from out in the snow. Asking for help could be the door this card gestures toward.",
      zh: "星币五常常描绘一段清冷拮据的路程——可能在物质上、身体上，或是那种被关在门外的感觉。它可能提示，眼下的艰难是真实的；同时，支援或许比雪地里看起来的更近。开口求助，也许正是这张牌指向的那扇门。",
    },
    loveMeaning: {
      en: "Someone in the relationship may be feeling shut out in some way. Saying plainly that you need warmth, or offering it first, could reopen the door.",
      zh: "关系中或许有人正感到某种被冷落。直接说出“我需要一点温暖”，或先递出温暖，那扇门可能会重新打开。",
    },
    careerMeaning: {
      en: "A lean season — financially or in morale — may be testing you. Tapping your network and accepting practical help could shorten the winter.",
      zh: "一段清淡的时期——无论收入还是士气——也许正在考验你。动用人脉、接受实际的帮助，寒冬或许会短一些。",
    },
    growthMeaning: {
      en: "Notice the beliefs that keep you from asking for help. Letting one person support you may revise an old story about worth.",
      zh: "看看是什么信念让你难以开口求助。允许一个人帮你一次，或许能改写一段关于“配得”的旧故事。",
    },
    reflectionQuestion: {
      en: "What support might already exist that you have not yet asked for?",
      zh: "有哪些现成的支持，只是你还没有开口？",
    },
    actionPrompt: {
      en: "Name one current need and ask one trusted person or resource for help with it.",
      zh: "写下一个当下的需要，向一位信得过的人或一个可靠渠道求助。",
    },
    imagePath: "/images/tarot/five-of-pentacles.svg",
  },
  {
    id: 69,
    slug: "six-of-pentacles",
    name: { en: "Six of Pentacles", zh: "星币六" },
    arcana: "minor",
    suit: "pentacles",
    number: 6,
    uprightKeywords: {
      en: ["Generosity", "Giving and receiving", "Support flowing", "Fair exchange"],
      zh: ["慷慨", "施与受", "支持流动", "公平往来"],
    },
    reversedKeywords: {
      en: ["Strings attached", "Imbalanced giving", "Power in charity", "Difficulty receiving"],
      zh: ["附带条件", "给予失衡", "施舍中的权力", "难以接受"],
    },
    generalMeaning: {
      en: "The Six of Pentacles often studies the flow of resources — who gives, who receives, and on what terms. It may suggest a moment to be generous within your means, or to receive gracefully for once. Healthy exchange tends to leave both hands and dignity intact.",
      zh: "星币六常常审视资源的流动：谁在给，谁在受，以何种条件。它可能提示，此刻适合量力而行地慷慨，或者，破例练习一次坦然的接受。健康的往来，往往既不空手，也不折损体面。",
    },
    loveMeaning: {
      en: "Notice the balance of giving between you. Small recalibrations — asking for more, or offering differently — could restore a fairer flow.",
      zh: "留意你们之间付出的天平。小小的校准——多提一点需求，或换一种方式给予——或许能让流动更公平。",
    },
    careerMeaning: {
      en: "Mentorship, resources, or opportunities may be moving toward you or through you. Sharing knowledge freely could build the kind of credit that returns.",
      zh: "指点、资源或机会，可能正流向你，或经由你流向他人。不吝分享所知，或许会积下日后回流的情分。",
    },
    growthMeaning: {
      en: "Consider which side of giving you find harder. Practicing the difficult side, in small doses, may balance more than your ledger.",
      zh: "想想施与受，哪一端对你更难。小剂量地练习难的那一端，平衡的或许不只是账面。",
    },
    reflectionQuestion: {
      en: "Is your giving and receiving in balance — and if not, which way does it lean?",
      zh: "你的给予和接受平衡吗？若不平衡，偏向了哪一边？",
    },
    actionPrompt: {
      en: "Give one unconditional small kindness, or accept one offered favor without deflecting.",
      zh: "送出一份不求回报的小善意，或坦然接受一次别人的好意，不推辞。",
    },
    imagePath: "/images/tarot/six-of-pentacles.svg",
  },
  {
    id: 70,
    slug: "seven-of-pentacles",
    name: { en: "Seven of Pentacles", zh: "星币七" },
    arcana: "minor",
    suit: "pentacles",
    number: 7,
    uprightKeywords: {
      en: ["Patience", "Taking stock", "Long-term view", "Letting things grow"],
      zh: ["耐心", "阶段评估", "长线眼光", "静待生长"],
    },
    reversedKeywords: {
      en: ["Impatience", "Sunk-cost doubts", "Scattered effort", "Harvesting too early"],
      zh: ["急于收获", "怀疑投入", "心力分散", "过早采摘"],
    },
    generalMeaning: {
      en: "The Seven of Pentacles often shows the pause between planting and harvest — leaning on the hoe, judging how the vines are doing. It may suggest stepping back to assess where your effort is actually growing something. Patience is part of the answer, but so is honest pruning.",
      zh: "星币七常常呈现播种与收获之间的停顿：倚着锄头，端详藤蔓的长势。它可能提示你退后一步，评估自己的心血究竟在哪里真正长出了东西。答案的一半是耐心，另一半，是诚实的修剪。",
    },
    loveMeaning: {
      en: "A relationship may be in a slow-growth phase that rewards steadiness. Reviewing what you are cultivating together could renew shared purpose.",
      zh: "感情或许正处在缓慢生长、需要稳定浇灌的阶段。一起回顾你们正在培育什么，可能让共同的方向重新清晰。",
    },
    careerMeaning: {
      en: "Returns on your effort may be maturing rather than missing. Auditing which projects deserve continued investment could focus the next season.",
      zh: "你的付出也许不是没有回报，而是回报尚在成熟。盘点哪些项目值得继续投入，下个阶段的重心或许会更聚焦。",
    },
    growthMeaning: {
      en: "Consider how you judge progress on long arcs. Measuring growth against last year, not last week, may be fairer to yourself.",
      zh: "想想你如何衡量长期的进展。拿今天和去年比，而不是和上周比，对自己或许更公道。",
    },
    reflectionQuestion: {
      en: "Which of your investments of effort deserve more time, and which deserve pruning?",
      zh: "你投入的心血里，哪些值得再等等，哪些该修剪掉了？",
    },
    actionPrompt: {
      en: "Review one long-term effort and write down whether to persist, adjust, or prune.",
      zh: "检视一项长期投入，写下你的判断：继续、调整，还是收手。",
    },
    imagePath: "/images/tarot/seven-of-pentacles.svg",
  },
  {
    id: 71,
    slug: "eight-of-pentacles",
    name: { en: "Eight of Pentacles", zh: "星币八" },
    arcana: "minor",
    suit: "pentacles",
    number: 8,
    uprightKeywords: {
      en: ["Diligence", "Skill-building", "Craftsmanship", "Focused practice"],
      zh: ["勤勉", "精进技艺", "匠人精神", "专注练习"],
    },
    reversedKeywords: {
      en: ["Perfectionism", "Rote repetition", "Cut corners", "Misdirected effort"],
      zh: ["完美主义", "机械重复", "偷工减料", "用错力气"],
    },
    generalMeaning: {
      en: "The Eight of Pentacles often honors the apprentice's bench — skill built coin by coin through attentive repetition. It may suggest that mastery in your current pursuit comes from patient, focused practice rather than leaps. Care taken in small units of work could be quietly compounding.",
      zh: "星币八常常向“学徒的工作台”致意：技艺在专注的重复中，一枚一枚地积累。它可能提示，你眼下追求的精进，靠的是耐心的刻意练习，而非一步登天。花在每个小单元上的用心，或许正在悄悄复利。",
    },
    loveMeaning: {
      en: "Relationships, like crafts, may deepen through practiced attention. Refining one small habit of care could be felt more than grand gestures.",
      zh: "感情如手艺，或许也在日复一日的用心中变深。打磨一个小小的体贴习惯，可能比隆重的表示更让人有感。",
    },
    careerMeaning: {
      en: "Deliberate skill-building may pay more than visibility right now. Choosing one competency and practicing it seriously could set you apart later.",
      zh: "此刻，扎实练功或许比刷存在感更划算。选定一项能力认真打磨，日后可能正是它让你与众不同。",
    },
    growthMeaning: {
      en: "Consider what you would love to be truly good at. Twenty focused minutes a day may be the honest path there.",
      zh: "想想你真心希望擅长什么。每天二十分钟的专注练习，或许就是通往它最诚实的路。",
    },
    reflectionQuestion: {
      en: "What skill would future you thank present you for practicing?",
      zh: "未来的你，会感谢现在的你练习哪项本领？",
    },
    actionPrompt: {
      en: "Practice one skill deliberately for twenty minutes today, focusing on quality.",
      zh: "今天用二十分钟刻意练习一项技能，把注意力放在质量上。",
    },
    imagePath: "/images/tarot/eight-of-pentacles.svg",
  },
  {
    id: 72,
    slug: "nine-of-pentacles",
    name: { en: "Nine of Pentacles", zh: "星币九" },
    arcana: "minor",
    suit: "pentacles",
    number: 9,
    uprightKeywords: {
      en: ["Self-sufficiency", "Earned comfort", "Independence", "Refined enjoyment"],
      zh: ["自给自足", "应得的安逸", "独立", "有品质的享受"],
    },
    reversedKeywords: {
      en: ["Over-reliance", "Working without pause", "Hollow luxury", "Worth tied to output"],
      zh: ["依赖他人", "劳而不歇", "空洞的奢华", "以产出定义自我"],
    },
    generalMeaning: {
      en: "The Nine of Pentacles often portrays the garden of self-made comfort — independence, discipline, and the grace to enjoy what they built. It may suggest that you have earned more ease than you are letting yourself feel. Standing in your own garden, unhurried, could be the practice.",
      zh: "星币九常常描绘一座亲手建成的花园：独立、自律，以及安然享用成果的从容。它可能提示，你配得上的自在，比你允许自己感受的更多。不慌不忙地站在自己的园子里，或许就是这门功课。",
    },
    loveMeaning: {
      en: "Wholeness on your own may be shaping how you relate. A bond added to a full life, rather than filling a gap, could feel different in quality.",
      zh: "独自也完整的状态，或许正在改变你与人相处的方式。为丰盈的生活锦上添花的感情，和用来填补空缺的感情，质地可能很不一样。",
    },
    careerMeaning: {
      en: "Your discipline may have earned real standing or stability. Enjoying the position, while choosing next goals from desire rather than fear, could suit this season.",
      zh: "你的自律，也许已经换来实实在在的位置或底气。享受它，并让下一个目标源于渴望而非恐惧，或许正合这个阶段。",
    },
    growthMeaning: {
      en: "Consider whether you allow yourself to enjoy what you earn. Practicing unproductive pleasure, guilt-free, may be growth in disguise.",
      zh: "问问自己，是否允许自己享受劳动的成果。练习一点“无用”而不内疚的快乐，或许正是另一种成长。",
    },
    reflectionQuestion: {
      en: "What have you built that you have not yet allowed yourself to enjoy?",
      zh: "你亲手建立的东西里，哪些还没被你好好享受过？",
    },
    actionPrompt: {
      en: "Enjoy one fruit of your own labor today, slowly and without multitasking.",
      zh: "今天专心享用一件自己挣来的美好，慢慢来，不做别的事。",
    },
    imagePath: "/images/tarot/nine-of-pentacles.svg",
  },
  {
    id: 73,
    slug: "ten-of-pentacles",
    name: { en: "Ten of Pentacles", zh: "星币十" },
    arcana: "minor",
    suit: "pentacles",
    number: 10,
    uprightKeywords: {
      en: ["Legacy", "Long-term security", "Family wealth", "Roots and continuity"],
      zh: ["传承", "长久的保障", "家业", "根基与延续"],
    },
    reversedKeywords: {
      en: ["Family friction", "Short-term thinking", "Unstable foundations", "Questioning tradition"],
      zh: ["家事纷扰", "短视", "根基不稳", "重新审视传统"],
    },
    generalMeaning: {
      en: "The Ten of Pentacles often takes the long view — wealth as something woven across generations, systems, and shared roots. It may suggest thinking beyond this month toward what endures: family, foundations, things that outlast a single season. What you tend now could become part of someone else's inheritance, material or otherwise.",
      zh: "星币十常常把目光放得很远：财富是跨越世代、编织在体系与共同根基里的东西。它可能提示你越过眼前的这个月，去思考什么能长久——家庭、根基、比一个季节更耐久的事物。你此刻经营的东西，或许会成为他人日后的传承，无论是物质的，还是精神的。",
    },
    loveMeaning: {
      en: "Questions of long-term building may be present — family, home, shared futures. Talking openly about what lasting means to each of you could align the blueprint.",
      zh: "关于长远经营的课题也许正在浮现——家庭、居所、共同的未来。开诚布公地聊聊“长久”对彼此的含义，蓝图或许能对得更齐。",
    },
    careerMeaning: {
      en: "Stability, structures, and legacy may deserve weight in current decisions. Choosing options that compound over years could serve the larger arc.",
      zh: "稳定性、制度与长远积累，或许值得在当前决策中占更大权重。选择那些能以年为单位复利的选项，可能更契合人生的长线。",
    },
    growthMeaning: {
      en: "Consider what you have received from those before you, and what you want to pass on. Naming your own definition of wealth may reorder priorities.",
      zh: "想想你从前人那里继承了什么，又想传递什么。写下你自己对“富足”的定义，优先级或许会随之重排。",
    },
    reflectionQuestion: {
      en: "What are you building that could outlast you?",
      zh: "你正在建造的事物中，什么可能比你走得更远？",
    },
    actionPrompt: {
      en: "Take one small step for long-term security — review a plan, start a fund, or document something for family.",
      zh: "为长远保障做一件小事：检视一份规划、开始一笔积累，或为家人整理一份重要记录。",
    },
    imagePath: "/images/tarot/ten-of-pentacles.svg",
  },
  {
    id: 74,
    slug: "page-of-pentacles",
    name: { en: "Page of Pentacles", zh: "星币侍者" },
    arcana: "minor",
    suit: "pentacles",
    number: 11,
    uprightKeywords: {
      en: ["Eagerness to learn", "New skills", "Practical dreams", "Laying groundwork"],
      zh: ["好学", "新技能", "务实的梦想", "打基础"],
    },
    reversedKeywords: {
      en: ["Procrastination", "Dreams without plans", "Distraction", "Skipping the basics"],
      zh: ["拖延", "空想无计划", "分心", "轻视基本功"],
    },
    generalMeaning: {
      en: "The Page of Pentacles often gazes at a single coin with a student's eyes — a dream taken seriously enough to study. It may suggest that a practical ambition is ready for its apprenticeship phase: learning, planning, small first builds. Treating the dream as a curriculum could make it real.",
      zh: "星币侍者常常以学生的眼神端详手中的钱币：一个被认真对待、值得钻研的梦想。它可能提示，一份务实的抱负已进入“学徒期”——学习、规划、做出最小的雏形。把梦想当作一门课程来修，它或许就会成真。",
    },
    loveMeaning: {
      en: "A steady, sincere quality may be entering your connections. Showing interest through reliable small actions could speak convincingly.",
      zh: "一种踏实、诚恳的气质，或许正进入你的感情。用可靠的小行动表达心意，可能比言语更有说服力。",
    },
    careerMeaning: {
      en: "A course, certification, or new skill may deserve your investment now. Beginning as a humble student could be the strategic move.",
      zh: "一门课程、一个证书或一项新技能，此刻或许值得投入。甘当一名谦逊的学生，可能正是最有远见的策略。",
    },
    growthMeaning: {
      en: "Consider which dream you have been admiring instead of studying. Drafting its first lesson plan may shift it from wish to path.",
      zh: "想想哪个梦想你一直只在欣赏，而没有研习。为它拟出第一份“学习计划”，它或许就从愿望变成了路。",
    },
    reflectionQuestion: {
      en: "What would you study first if you treated your dream as a craft?",
      zh: "如果把梦想当作一门手艺来修习，你会先学什么？",
    },
    actionPrompt: {
      en: "Sign up for, or schedule, the first concrete learning step toward a practical goal.",
      zh: "为一个务实目标报名或排期第一步的学习安排。",
    },
    imagePath: "/images/tarot/page-of-pentacles.svg",
  },
  {
    id: 75,
    slug: "knight-of-pentacles",
    name: { en: "Knight of Pentacles", zh: "星币骑士" },
    arcana: "minor",
    suit: "pentacles",
    number: 12,
    uprightKeywords: {
      en: ["Steadiness", "Reliability", "Methodical progress", "Quiet dedication"],
      zh: ["稳健", "可靠", "按部就班", "默默耕耘"],
    },
    reversedKeywords: {
      en: ["Stagnation", "Boredom with routine", "Over-caution", "Stuck in a rut"],
      zh: ["停滞", "倦于常规", "过度谨慎", "陷入窠臼"],
    },
    generalMeaning: {
      en: "The Knight of Pentacles often travels the least glamorous road — routine, thoroughness, promises kept — and arrives anyway. It may suggest that your current goal yields to persistence more than brilliance. Trusting the unhurried pace, while checking it has not become a rut, could be the balance.",
      zh: "星币骑士常常走着最不起眼的那条路——按部就班、一丝不苟、言出必行——却终能抵达。它可能提示，眼下的目标更认坚持，而非灵光。信任这份不急不躁的步调，同时留意它是否已变成原地打转，或许正是要拿捏的平衡。",
    },
    loveMeaning: {
      en: "Dependability may be the love language of this season. Showing up consistently, in ordinary ways, could build something weatherproof.",
      zh: "这个阶段的爱，语言或许就是“靠得住”。在寻常日子里始终如一地出现，可能筑起经得起风雨的东西。",
    },
    careerMeaning: {
      en: "Methodical execution may be your edge right now. Finishing what is started, at consistent quality, could earn durable trust.",
      zh: "有条不紊的执行力，此刻或许正是你的优势。把开了头的事做完、把质量做扎实，可能赢得长久的信任。",
    },
    growthMeaning: {
      en: "Consider where routine serves your goals and where it merely repeats. Refreshing one stale routine may restore its meaning.",
      zh: "分辨哪些常规在成就目标，哪些只是惯性重复。更新一个陈旧的例行安排，它的意义或许会回来。",
    },
    reflectionQuestion: {
      en: "Where is slow and steady genuinely winning for you?",
      zh: "在哪些事情上，“慢而稳”正在真正为你赢得进展？",
    },
    actionPrompt: {
      en: "Complete one unglamorous but important task fully before starting anything new.",
      zh: "在开始任何新事之前，先把一件不起眼却重要的任务彻底完成。",
    },
    imagePath: "/images/tarot/knight-of-pentacles.svg",
  },
  {
    id: 76,
    slug: "queen-of-pentacles",
    name: { en: "Queen of Pentacles", zh: "星币王后" },
    arcana: "minor",
    suit: "pentacles",
    number: 13,
    uprightKeywords: {
      en: ["Nurturing practicality", "Resourcefulness", "Warm groundedness", "Generous care"],
      zh: ["务实的关怀", "善用资源", "温暖踏实", "慷慨照料"],
    },
    reversedKeywords: {
      en: ["Caretaking over self-care", "Work-home imbalance", "Scarcity worry", "Smothering care"],
      zh: ["照顾他人忘了自己", "家庭与工作失衡", "为匮乏担忧", "关怀过度"],
    },
    generalMeaning: {
      en: "The Queen of Pentacles often blends warmth with competence — a keeper of gardens, budgets, and people, all thriving under practical care. It may suggest tending your world in tangible ways: nourishment, order, comfort. Including yourself among those you look after could be the missing piece.",
      zh: "星币王后常常将温情与能干融于一身：园圃、账目与身边的人，都在她务实的照料下欣欣向荣。它可能提示你以具体可感的方式经营生活——饮食、秩序、舒适。把自己也列入照顾名单，或许正是缺失的那一块。",
    },
    loveMeaning: {
      en: "Care expressed practically — meals, comfort, remembered details — may be the language now. Receiving such care graciously could matter as much as giving it.",
      zh: "此刻的爱，或许正通过务实的方式表达：一餐饭、一份体贴、一个被记住的细节。除了给予，落落大方地接受这样的照顾，也同样重要。",
    },
    careerMeaning: {
      en: "Resourcefulness and steady management may be your quiet strengths now. Creating supportive conditions for others could also grow your standing.",
      zh: "善用资源、稳定周全，可能是你此刻低调的优势。为他人创造好的工作条件，或许也会同时提升你的分量。",
    },
    growthMeaning: {
      en: "Notice how much of your care flows outward versus inward. Scheduling your own wellbeing like an appointment may rebalance the books.",
      zh: "看看你的关怀有多少流向外面，多少留给自己。把自己的休养像正式约会一样排进日程，收支或许就能重新平衡。",
    },
    reflectionQuestion: {
      en: "Who tends the person who tends everyone else?",
      zh: "那个照顾所有人的人，由谁来照顾？",
    },
    actionPrompt: {
      en: "Do one practical act of care for yourself today, as diligently as you would for others.",
      zh: "今天为自己做一件实际的照顾，就像你平日照顾别人那样用心。",
    },
    imagePath: "/images/tarot/queen-of-pentacles.svg",
  },
  {
    id: 77,
    slug: "king-of-pentacles",
    name: { en: "King of Pentacles", zh: "星币国王" },
    arcana: "minor",
    suit: "pentacles",
    number: 14,
    uprightKeywords: {
      en: ["Material mastery", "Stability", "Stewardship", "Reliable abundance"],
      zh: ["物质上的成熟", "稳固", "善治善守", "可靠的富足"],
    },
    reversedKeywords: {
      en: ["Overwork", "Status fixation", "Stubborn conservatism", "Wealth without enjoyment"],
      zh: ["过度操劳", "执着于地位", "固步自封", "富而不乐"],
    },
    generalMeaning: {
      en: "The King of Pentacles often represents material life mastered and held in trust — wealth, skill, and stability used to steady others as well as oneself. It may suggest consolidating what you have built and managing it with a steward's calm. True abundance here tends to include the capacity to enjoy and to share.",
      zh: "星币国王常常代表被驾驭并善加托管的物质生活：财富、能力与稳定，既支撑自己，也让身边的人安心。它可能提示你巩固已有的成果，以管家般的沉稳打理它。这里所说的真正富足，往往包含享用与分享的能力。",
    },
    loveMeaning: {
      en: "Steadiness and provision may be how love is being offered or sought. Ensuring warmth accompanies reliability could keep security from feeling like furniture.",
      zh: "此刻的爱，或许正以“安稳”与“担当”的形式给出或被期待。让可靠始终伴着温度，安全感才不会变成一件冰冷的家具。",
    },
    careerMeaning: {
      en: "Consolidation may suit this chapter — strengthening finances, systems, and reputation. Advising or backing others could extend your influence naturally.",
      zh: "这个阶段或许适合巩固盘面：夯实财务、制度与声誉。为他人提供建议或支持，你的影响力可能自然延伸。",
    },
    growthMeaning: {
      en: "Consider what your accumulation is ultimately for. Defining the purpose behind the prosperity may turn management into meaning.",
      zh: "想想你的积累最终是为了什么。为富足找到它背后的目的，“打理”或许就升华成了“意义”。",
    },
    reflectionQuestion: {
      en: "What does being truly well-resourced mean to you beyond money?",
      zh: "对你而言，除了金钱，真正的“家底丰厚”还包括什么？",
    },
    actionPrompt: {
      en: "Review one area of your resources and make one improvement that benefits someone besides you.",
      zh: "检视你的一项资源，做一个也能惠及他人的小改进。",
    },
    imagePath: "/images/tarot/king-of-pentacles.svg",
  },
];
