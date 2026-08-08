// Bilingual content for the twelve Sun-sign placements, Aries through Pisces.
// Tone: reflective, non-deterministic, kind. No predictions or guarantees.

export interface PlacementContent {
  slug: string; // "sun-in-aries"
  sign: string; // "Aries"
  sign_zh: string; // 白羊座
  title: { en: string; zh: string };
  overview: { en: string; zh: string }; // 3-4 sentences
  strengths: { en: string; zh: string }; // 2-3 sentences
  frictions: { en: string; zh: string }; // 2-3 sentences, kind tone
  reflection: { en: string; zh: string }; // one question
}

export const SUN_PLACEMENTS: PlacementContent[] = [
  {
    slug: "sun-in-aries",
    sign: "Aries",
    sign_zh: "白羊座",
    title: {
      en: "Sun in Aries — The First Spark",
      zh: "太阳白羊座——最初的火花",
    },
    overview: {
      en: "In astrology, the Sun describes the core of vitality and identity — the part of you that wants to become itself. In Aries, a cardinal fire sign, that engine starts fast: this placement often suggests a self organized around initiative, courage, and honesty. Beginnings may energize you more than maintenance does, and life can feel like a series of fresh starts. At heart, an Aries Sun may be learning to act — and to let others see the acting self.",
      zh: "在占星里，太阳描述生命力与自我认同的核心——那个想要“成为自己”的部分。落在白羊座这个本位火象星座，这台引擎起步很快：这个位置往往意味着一个以主动、勇气和坦率为轴心的自我。开始一件事可能比维持一件事更让你来电，人生也常常像一连串崭新的起点。太阳白羊的功课，或许就是去行动——并允许别人看见那个行动中的自己。",
    },
    strengths: {
      en: "Courage that shows up early, refreshing directness, and a willingness to go first often mark this placement. You may be the person who says the true thing, starts the project, or steps forward while everyone else is still deciding.",
      zh: "先人一步的勇气、令人耳目一新的直接、以及“我先来”的意愿，常常是这个位置的标志。你可能就是那个说出真话、启动项目、或在所有人还在犹豫时已经站出来的人。",
    },
    frictions: {
      en: "The middle of things — after the spark, before the finish — may test your patience, and quick words can occasionally land harder than intended. None of this is a flaw in the fire; follow-through is simply a muscle that may enjoy gentle training.",
      zh: "事情的“中段”——火花之后、完成之前——可能最考验你的耐心；脱口而出的话，偶尔也会落得比想象中重。这些都不是火的缺陷；坚持只是一块可以温和练习的肌肉。",
    },
    reflection: {
      en: "What might you gain by staying with something past the exciting part?",
      zh: "如果在新鲜感褪去之后再多留一会儿，你可能会收获什么？",
    },
  },
  {
    slug: "sun-in-taurus",
    sign: "Taurus",
    sign_zh: "金牛座",
    title: {
      en: "Sun in Taurus — The Steady Garden",
      zh: "太阳金牛座——安稳的花园",
    },
    overview: {
      en: "The Sun in Taurus, a fixed earth sign, often suggests an identity built on steadiness, patience, and the senses. You may define yourself by what you can build, keep, and genuinely enjoy: good food, lasting friendships, work that accumulates. Where others chase, this placement tends to cultivate, trusting that value grows slowly. Comfort and beauty are not luxuries here — they may be how you stay whole.",
      zh: "太阳落在金牛座——固定土象——往往意味着一种建立在安稳、耐心与感官之上的自我认同。你或许用“能建成什么、能守住什么、能真切享受什么”来定义自己：一顿好饭、经年的友谊、可以累积的事业。别人追逐时，这个位置更倾向于耕耘，相信价值是慢慢长出来的。舒适与美在这里不是奢侈品——它们可能正是你保持完整的方式。",
    },
    strengths: {
      en: "Reliability, calm, and a gift for making things last — projects, homes, relationships — often mark this placement. People may lean on your steadiness the way they lean on a wall that has always been there.",
      zh: "可靠、平和、以及让事物长久的天赋——无论是项目、家，还是关系——常常是这个位置的标志。人们依赖你的安稳，可能就像倚着一面一直都在的墙。",
    },
    frictions: {
      en: "Change may register as threat before it registers as possibility, and comfort can quietly become a fence. Being called stubborn may sting — often it is loyalty to what has worked, gently asked to update its evidence.",
      zh: "变化在成为“可能性”之前，或许先被你感知为“威胁”；舒适也可能在不知不觉中变成围栏。被说固执也许让你委屈——那常常只是对“曾经有效之物”的忠诚，只是需要温和地更新一下证据。",
    },
    reflection: {
      en: "Which comfort in your life is truly nourishing you, and which is only familiar?",
      zh: "你生活里的哪些舒适真的在滋养你，哪些只是熟悉而已？",
    },
  },
  {
    slug: "sun-in-gemini",
    sign: "Gemini",
    sign_zh: "双子座",
    title: {
      en: "Sun in Gemini — The Curious Messenger",
      zh: "太阳双子座——好奇的信使",
    },
    overview: {
      en: "The Sun in Gemini, a mutable air sign, often suggests an identity that lives in curiosity, language, and exchange. You may feel most yourself while learning, connecting, or translating one world to another. Variety is not distraction here — it can be how your mind breathes. The quieter Gemini project may be gathering all the scattered pieces into a voice that is recognizably yours.",
      zh: "太阳落在双子座——变动风象——往往意味着一个活在好奇、语言与交流之中的自我。学习、连接、在不同世界之间做翻译的时候，你可能最像你自己。多样在这里不是分心——它或许正是你的头脑呼吸的方式。双子更安静的功课，可能是把散落的碎片，收拢成一个明确属于你的声音。",
    },
    strengths: {
      en: "Quick synthesis, wit, and a talent for building bridges — between people, ideas, and languages — often mark this placement. You may make hard things feel light, and strangers feel like conversation partners.",
      zh: "敏捷的整合力、机智、以及搭桥的天赋——在人与人、想法与想法、语言与语言之间——常常是这个位置的标志。你可能让难懂的事变得轻盈，让陌生人变成聊得来的伙伴。",
    },
    frictions: {
      en: "Attention may scatter when everything is interesting, and depth can lose out to the next shiny question. Restlessness is not failure — it may simply be curiosity asking for a container worthy of it.",
      zh: "当一切都有趣时，注意力难免四散；深度有时会输给下一个闪闪发光的问题。坐不住并不是失败——那或许只是好奇心，在寻找一个配得上它的容器。",
    },
    reflection: {
      en: "What topic — or person — might reward a longer stay of your attention?",
      zh: "哪个话题、哪个人，或许值得你的注意力多停留一些时候？",
    },
  },
  {
    slug: "sun-in-cancer",
    sign: "Cancer",
    sign_zh: "巨蟹座",
    title: {
      en: "Sun in Cancer — The Tidal Heart",
      zh: "太阳巨蟹座——潮汐之心",
    },
    overview: {
      en: "The Sun in Cancer, a cardinal water sign, often suggests an identity rooted in feeling, memory, and belonging. You may know how a room feels the moment you enter it, and home — the people, places, and small rituals — may be less where you live than how you live. Like the tides this sign is linked to, your energy may move in cycles of reaching out and drawing in. Both movements belong to the same sea.",
      zh: "太阳落在巨蟹座——本位水象——往往意味着一个扎根于情感、记忆与归属的自我。走进一个房间的瞬间，你可能就知道它的温度；而“家”——那些人、地方与小小的仪式——与其说是你住的地方，不如说是你活着的方式。像与这个星座相连的潮汐一样，你的能量可能在“伸出去”与“收回来”之间循环。两种运动，都属于同一片海。",
    },
    strengths: {
      en: "Emotional attunement, loyalty, and a rare ability to make people feel safe often mark this placement. You may remember what matters to others long after they have forgotten mentioning it.",
      zh: "对情绪的敏锐、忠诚、以及让人感到安全的稀有能力，常常是这个位置的标志。别人随口提过就忘的在意之事，你可能记得很久很久。",
    },
    frictions: {
      en: "When hurt, the shell may close before words arrive, and needs can travel sideways as hints. Holding the past close is a form of care — it may simply deserve the same gentleness you offer everyone else's history.",
      zh: "受伤的时候，壳可能先于语言合上；需求也常常侧着身子、以暗示的方式出场。把过去抱得很紧是一种深情——它或许只是也值得你用对待别人往事的那份温柔来对待。",
    },
    reflection: {
      en: "What would it feel like to ask directly for the care you so freely give?",
      zh: "把你惯常慷慨给出的照顾，直接开口向别人要一次，会是什么感觉？",
    },
  },
  {
    slug: "sun-in-leo",
    sign: "Leo",
    sign_zh: "狮子座",
    title: {
      en: "Sun in Leo — The Warm Center",
      zh: "太阳狮子座——温暖的中心",
    },
    overview: {
      en: "The Sun in Leo — the sign it traditionally rules — often suggests an identity organized around warmth, expression, and heart. You may feel most alive when creating something and letting it be seen: a performance, a project, a well-hosted table. Generosity tends to be the default setting, and attention the natural currency. The deeper Leo question may be discovering that your shine does not depend on the size of the audience.",
      zh: "太阳落在狮子座——它传统上守护的星座——往往意味着一个以温暖、表达与心为轴的自我。当你创造出什么并让它被看见时——一场演出、一个作品、一桌招待得宜的饭——你可能感到自己最有生命力。慷慨常常是你的默认设置，注意力则是自然流通的货币。狮子更深的课题，或许是发现：你的光，并不取决于观众的多少。",
    },
    strengths: {
      en: "Big-hearted generosity, the courage to be visible, and a loyalty that makes people feel chosen often mark this placement. Your praise may genuinely change how someone sees themselves.",
      zh: "大方的心、敢于站到光下的勇气、以及让人感到“被选中”的忠诚，常常是这个位置的标志。你的一句真心夸奖，可能真的会改变一个人看待自己的方式。",
    },
    frictions: {
      en: "Going unnoticed may ache more than you admit, and pride can make “I was wrong” feel like a fall on stage. Applause is lovely — it may just not be the same thing as love, and you deserve to know the difference.",
      zh: "不被注意到的失落，可能比你承认的更疼；自尊有时让“我错了”三个字，像在台上当众摔了一跤。掌声很美好——只是它或许并不等于爱，而你值得分清这两者。",
    },
    reflection: {
      en: "Where do you shine even when no one is watching?",
      zh: "没有人看的时候，你在哪里依然发着光？",
    },
  },
  {
    slug: "sun-in-virgo",
    sign: "Virgo",
    sign_zh: "处女座",
    title: {
      en: "Sun in Virgo — The Craftsman's Eye",
      zh: "太阳处女座——匠人之眼",
    },
    overview: {
      en: "The Sun in Virgo, a mutable earth sign, often suggests an identity expressed through craft, discernment, and service. You may see, almost automatically, how anything could work a little better — a sentence, a system, a day. Usefulness can feel like love made practical. The quiet Virgo art may be turning that improving eye kind, especially when it looks at you.",
      zh: "太阳落在处女座——变动土象——往往意味着一个通过手艺、辨析与服务来表达的自我。你可能几乎是自动地看见任何事物“还可以更好一点”的空间——一句话、一套流程、一天的安排。“有用”，对你来说或许就是爱的实用形态。处女座安静的艺术，可能在于让那双挑剔的眼睛学会温柔——尤其当它看向你自己的时候。",
    },
    strengths: {
      en: "Precision, humility, and follow-through often mark this placement: you may be the one who actually reads the instructions, catches the error, and quietly saves the project. Your help tends to be concrete rather than performative.",
      zh: "精确、谦逊、有始有终，常常是这个位置的标志：你可能就是那个真的会读说明书、发现错误、默默救下整个项目的人。你的帮助往往是具体的，而不是姿态性的。",
    },
    frictions: {
      en: "The inner critic may speak loudest about your own work, and perfectionism can postpone “done” indefinitely. Noticing flaws first is a skill — it may simply want “noticing what works” as a companion practice.",
      zh: "你心里那位批评家，对你自己的作品嗓门最大；完美主义也可能让“完成”被无限期推迟。先看到瑕疵是一种能力——它或许只是需要“也看到好的部分”来作伴。",
    },
    reflection: {
      en: "What would “good enough” make possible for you this week?",
      zh: "这一周，“足够好”能为你腾出什么可能性？",
    },
  },
  {
    slug: "sun-in-libra",
    sign: "Libra",
    sign_zh: "天秤座",
    title: {
      en: "Sun in Libra — The Art of Balance",
      zh: "太阳天秤座——平衡的艺术",
    },
    overview: {
      en: "The Sun in Libra, a cardinal air sign, often suggests an identity that comes alive in relationship, fairness, and beauty. You may instinctively weigh every side, smooth every room, and notice the moment something — a design, a decision, a friendship — tips out of balance. Harmony here is not superficial; it can be a genuine ethic. The Libra path may include discovering that your own preference is also a legitimate weight on the scale.",
      zh: "太阳落在天秤座——本位风象——往往意味着一个在关系、公平与美之中活起来的自我。你可能本能地掂量每一方的道理，抚平每个房间的气氛，并在某样东西——一个设计、一个决定、一段友谊——失去平衡的瞬间立刻察觉。这里的和谐并不肤浅，它可以是一种真正的伦理。天秤的路，或许包括发现：你自己的偏好，也是天平上一枚正当的砝码。",
    },
    strengths: {
      en: "Diplomacy, aesthetic intelligence, and the ability to make people feel heard often mark this placement. You may broker a peace others thought impossible, and make fairness feel graceful rather than dutiful.",
      zh: "外交的手腕、审美的智慧、以及让人感到被听见的能力，常常是这个位置的标志。你可能促成别人以为不可能的和解，也让公平这件事显得优雅，而不是刻板。",
    },
    frictions: {
      en: "Weighing can quietly become waiting, and keeping the peace may sometimes cost you your own. If your preferences fall silent in company, they have not vanished — they may just be waiting for an invitation.",
      zh: "掂量太久，会悄悄变成等待；维持和平，有时是拿你自己的安宁去付账。如果你的偏好一到人群里就沉默，它们并没有消失——或许只是在等一份邀请。",
    },
    reflection: {
      en: "If no one else's opinion counted for an hour, what would you choose?",
      zh: "如果有一个小时，谁的意见都不算数，你会选择什么？",
    },
  },
  {
    slug: "sun-in-scorpio",
    sign: "Scorpio",
    sign_zh: "天蝎座",
    title: {
      en: "Sun in Scorpio — The Deep Current",
      zh: "太阳天蝎座——静水流深",
    },
    overview: {
      en: "The Sun in Scorpio, a fixed water sign, often suggests an identity oriented toward depth, truth, and transformation. Surfaces rarely satisfy you; you may sense the current beneath every conversation and prefer real answers to comfortable ones. Emotional intensity here is not drama — it can be devotion. The Scorpio arc often involves learning that being fully seen may be survivable, even sweet.",
      zh: "太阳落在天蝎座——固定水象——往往意味着一个朝向深度、真相与蜕变的自我。表面的东西很难满足你；你可能感觉得到每段对话底下的暗流，也宁要真实的答案，不要舒服的答案。这里的情感浓度不是戏剧化——它可以是一种深沉的投入。天蝎的弧线，常常是慢慢了解：被完整地看见，或许是可以承受的，甚至是甜的。",
    },
    strengths: {
      en: "Emotional courage, penetrating insight, and ride-or-die loyalty often mark this placement. You may be the one people trust with what they have never said aloud — and you can rebuild yourself after losses that would end other stories.",
      zh: "情感上的勇气、看透事物的洞察、以及同进退共患难式的忠诚，常常是这个位置的标志。你可能是别人愿意托付“从未说出口之事”的人——而经历过足以让别的故事就此终结的失去之后，你也能重建自己。",
    },
    frictions: {
      en: "Guardedness may run ahead of trust, and loved ones can find themselves quietly tested rather than simply asked. Carrying all that intensity alone is a habit, not a requirement — sharing the weight may be the braver move.",
      zh: "防备常常跑在信任前面；对亲近的人，你可能悄悄地考验，而不是直接地询问。独自扛住所有浓烈是一种习惯，不是一种义务——把重量分出去一些，或许才是更勇敢的那一步。",
    },
    reflection: {
      en: "What might become lighter if you let one trusted person truly see it?",
      zh: "如果让一个信得过的人真正看见它，什么会变轻一些？",
    },
  },
  {
    slug: "sun-in-sagittarius",
    sign: "Sagittarius",
    sign_zh: "射手座",
    title: {
      en: "Sun in Sagittarius — The Open Road",
      zh: "太阳射手座——通往远方的路",
    },
    overview: {
      en: "The Sun in Sagittarius, a mutable fire sign, often suggests an identity fueled by meaning, horizon, and honest laughter. You may organize life as a series of quests — places, ideas, philosophies — trusting that the point of the road is the widening view. Optimism here is not naivety; it can be a discipline of looking up. The Sagittarian riddle may be how to stay free while still staying somewhere long enough to harvest.",
      zh: "太阳落在射手座——变动火象——往往意味着一个由意义、远方与坦荡笑声驱动的自我。你可能把人生过成一连串远征——地方、思想、人生哲学——并相信道路的意义在于视野的展开。这里的乐观不是天真，它可以是一种“抬头看”的修行。射手的谜题或许是：如何既保持自由，又在一个地方停得足够久，久到能等来收获。",
    },
    strengths: {
      en: "Vision, candor, and an infectious faith that things can be bigger often mark this placement. You may hand people back their sense of possibility — usually with a joke attached.",
      zh: "远见、直言、以及那种有感染力的“事情可以更大”的信念，常常是这个位置的标志。你可能会把“可能性”重新递回别人手里——而且通常附赠一个玩笑。",
    },
    frictions: {
      en: "Promises can outrun calendars, and truths delivered at full gallop may bruise on landing. When life asks for detail and repetition, restlessness may visit — the far mountain is real, but so is the trail under your feet.",
      zh: "承诺有时跑得比日程表快；全速奔驰中说出的真话，落地时也可能撞疼别人。当生活开始要求细节与重复，倦怠或许会来造访——远山是真的，脚下这段路也是。",
    },
    reflection: {
      en: "What adventure might be available exactly where you already are?",
      zh: "就在你此刻所在的地方，可能藏着什么样的冒险？",
    },
  },
  {
    slug: "sun-in-capricorn",
    sign: "Capricorn",
    sign_zh: "摩羯座",
    title: {
      en: "Sun in Capricorn — The Long Climb",
      zh: "太阳摩羯座——漫长的攀登",
    },
    overview: {
      en: "The Sun in Capricorn, a cardinal earth sign, often suggests an identity built through mastery, responsibility, and time. You may measure yourself by what you have made real — not talked about, made. Mountains organize the inner landscape here: the point is not the difficulty but the honest view from higher ground. The Capricorn work may be remembering that the climber deserves provisions, rest, and company along the way.",
      zh: "太阳落在摩羯座——本位土象——往往意味着一个由专业、责任与时间砌成的自我。你可能用“真正做成了什么”来衡量自己——不是说过什么，而是做成了什么。这里的内心地形由群山构成：重点从来不是辛苦本身，而是更高处那片诚实的视野。摩羯的功课，或许是记得：登山的人，也值得干粮、休息，和同路的人。",
    },
    strengths: {
      en: "Discipline, follow-through, and a quiet authority that is earned rather than claimed often mark this placement. In a crisis you may be the one who keeps walking, and people learn that your word can be built on.",
      zh: "自律、有始有终、以及一种靠积累而非宣称得来的沉静权威，常常是这个位置的标志。危机之中，你可能是那个继续往前走的人；时间久了，人们知道你的话可以奠基。",
    },
    frictions: {
      en: "The inner examiner may grade you harshly, and joy can keep getting postponed until after the next milestone — a line that keeps moving. Carrying everything alone can feel like duty; letting others take a corner may be the more advanced skill.",
      zh: "你心里那位主考官，打分可能过于严格；快乐也总被推迟到“下一个里程碑之后”——而那条线一直在后退。什么都自己扛，像是一种本分；让别人也抬起一角，或许才是更高阶的能力。",
    },
    reflection: {
      en: "What have you already built that deserves acknowledgment today?",
      zh: "你已经建成的东西里，有什么值得今天就得到承认？",
    },
  },
  {
    slug: "sun-in-aquarius",
    sign: "Aquarius",
    sign_zh: "水瓶座",
    title: {
      en: "Sun in Aquarius — The Different Angle",
      zh: "太阳水瓶座——不同的角度",
    },
    overview: {
      en: "The Sun in Aquarius, a fixed air sign, often suggests an identity anchored in perspective, principle, and the group's bigger picture. You may see systems where others see situations, and question defaults simply because they are defaults. Belonging matters to you — and so does the freedom to differ, which can make life an interesting negotiation. The Aquarian gift may be showing that caring deeply and thinking clearly were never opposites.",
      zh: "太阳落在水瓶座——固定风象——往往意味着一个以视角、原则与群体的大图景为锚的自我。别人看到的是一件件事，你看到的可能是一套套系统；你质疑默认设置，常常只因为它们是默认的。归属对你重要——与众不同的自由也同样重要，于是人生就成了一场有意思的谈判。水瓶的礼物，或许是证明：深切地关心与清晰地思考，从来不是反义词。",
    },
    strengths: {
      en: "Independent thought, fairness at scale, and ease with being unconventional often mark this placement. You may defend an unpopular truth calmly, and your friendships tend to ignore the usual boundaries of background and age.",
      zh: "独立的头脑、面向众人的公平感、以及对“不合常规”的自在，常常是这个位置的标志。你可能会平静地为一个不受欢迎的真相辩护；你的友谊，也往往无视出身与年龄的种种惯例。",
    },
    frictions: {
      en: "Feelings — your own especially — may get filed under “to be processed later,” and the contrarian reflex can occasionally argue against something good. Your head is a fine home; it may simply enjoy the occasional visit from your heart.",
      zh: "情绪——尤其是你自己的——可能常被归档进“稍后处理”；唱反调的反射，偶尔也会反对到好东西头上。头脑是个很好的住处；它或许只是欢迎心偶尔来串门。",
    },
    reflection: {
      en: "Where might your head welcome a visit from your heart?",
      zh: "在哪些事情上，你的头脑或许愿意请心来做一回客？",
    },
  },
  {
    slug: "sun-in-pisces",
    sign: "Pisces",
    sign_zh: "双鱼座",
    title: {
      en: "Sun in Pisces — The Dreaming Sea",
      zh: "太阳双鱼座——梦境之海",
    },
    overview: {
      en: "The Sun in Pisces, a mutable water sign, often suggests an identity with permeable edges — imaginative, empathic, tuned to what others feel before they say it. You may live partly in the visible world and partly in an inner sea of images, music, and moods. That porousness is both gift and task: it can make you an artist of compassion, and it can leave you carrying feelings that were never yours. The Pisces practice may be learning where you end and the weather begins.",
      zh: "太阳落在双鱼座——变动水象——往往意味着一个边界柔软的自我：富于想象、易于共情，别人还没开口，你可能已经接收到了。你或许一半住在看得见的世界，一半住在由图像、音乐与情绪组成的内海里。这份通透既是天赋也是功课：它能让你成为慈悲的艺术家，也可能让你背着从来不属于你的情绪。双鱼的练习，或许是分清：哪里是你，哪里只是天气。",
    },
    strengths: {
      en: "Compassion without conditions, creative imagination, and an intuitive read of rooms and hearts often mark this placement. You may forgive in ways that genuinely set people free, and make beauty out of what others discard.",
      zh: "不设条件的慈悲、创造性的想象力、以及对空间与人心的直觉，常常是这个位置的标志。你的原谅可能真的能让人解脱；别人丢弃的东西，到你手里能变成美。",
    },
    frictions: {
      en: "Boundaries may dissolve exactly when you need them most, and overwhelm can make the exits glow — daydreams, screens, anything softer than now. Sensitivity is not the problem; like a river, it may simply need banks.",
      zh: "边界常常在你最需要的时候融化；不堪重负时，各种“出口”就会发亮——白日梦、屏幕、任何比“此刻”更柔软的东西。敏感本身不是问题；它或许只是像河流一样，需要两岸。",
    },
    reflection: {
      en: "Which feelings this week were truly yours, and which did you pick up along the way?",
      zh: "这一周的情绪里，哪些真正属于你，哪些是路上顺手捡来的？",
    },
  },
];
