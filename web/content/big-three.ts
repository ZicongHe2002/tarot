import type { BigThreeEntry } from "./big-three-types";

// The "Big Three": Sun (core identity), Moon (inner emotional world),
// Rising/Ascendant (how you meet the world). role × 12 signs, Aries→Pisces = 36.
export const BIG_THREE: BigThreeEntry[] = [
  // ─────────────────────────────  SUN  ─────────────────────────────
  {
    role: "sun",
    sign: "Aries",
    sign_zh: "白羊座",
    headline: { en: "The spark that starts things", zh: "率先点火" },
    body: {
      en: "Your Sun in Aries lends you the courage to go first, to move before the map is finished. You tend to feel most alive at the beginning of things, when the energy is raw and the outcome uncertain. Growing into yourself may mean learning that patience is its own kind of bravery.",
      zh: "你的太阳落在白羊座，赋予你率先出发的勇气——地图还没画完，你就已经上路了。你往往在事情的开端最有活力，那时能量最原始、结果最不确定。真正长成自己的过程里，你或许会明白，耐心也是一种勇敢。",
    },
  },
  {
    role: "sun",
    sign: "Taurus",
    sign_zh: "金牛座",
    headline: { en: "Rooted and unhurried", zh: "稳稳生长" },
    body: {
      en: "Your Sun in Taurus draws its strength from steadiness — you are nourished by what is real, tangible, and built to last. You often find yourself energized not by novelty but by depth, by returning to the things and people you love. The self you're growing into knows the difference between stubbornness and true devotion.",
      zh: "你的太阳落在金牛座，力量源自稳定——真实、可触、经得起时间的东西最能滋养你。让你充满能量的常常不是新鲜，而是深度，是一次次回到你所爱的人与物身边。你正在长成的自己，懂得固执与真正的忠诚之间的分别。",
    },
  },
  {
    role: "sun",
    sign: "Gemini",
    sign_zh: "双子座",
    headline: { en: "A mind always in motion", zh: "万象好奇" },
    body: {
      en: "Your Sun in Gemini lights up in conversation, in the crackle of a new idea passed between two people. You tend to collect the world in fragments — a phrase, a fact, a face — and weave them into something quicker than the rest of us can follow. Coming into your own may mean trusting that curiosity is not the same as distraction.",
      zh: "你的太阳落在双子座，会在交谈里、在两人之间传递新念头的火花里被点亮。你往往把世界收集成碎片——一句话、一个事实、一张脸——再把它们编织成别人跟不上的速度。真正成为自己，或许意味着相信好奇并不等于分心。",
    },
  },
  {
    role: "sun",
    sign: "Cancer",
    sign_zh: "巨蟹座",
    headline: { en: "The keeper of the hearth", zh: "心之港湾" },
    body: {
      en: "Your Sun in Cancer glows brightest in the places where you feel held. You tend to draw your vitality from belonging — from making a home, remembering a birthday, holding space for someone's softer feelings. The self you're becoming may learn that caring for others and protecting your own tenderness are not opposites.",
      zh: "你的太阳落在巨蟹座，在让你感到被接住的地方最为明亮。你往往从归属里汲取活力——布置一个家、记住一个生日、为别人柔软的情绪腾出空间。你正在成为的自己，或许会懂得，照顾他人与守护自己的温柔并不矛盾。",
    },
  },
  {
    role: "sun",
    sign: "Leo",
    sign_zh: "狮子座",
    headline: { en: "Warmth that wants to be seen", zh: "温暖发光" },
    body: {
      en: "Your Sun in Leo carries a natural radiance — you come alive when you're creating, performing, or simply loving out loud. You tend to give generously and to feel most yourself when your warmth lands somewhere. Growing into your fullness may mean learning that you shine just as brightly when no one is watching.",
      zh: "你的太阳落在狮子座，带着天然的光彩——创造、表演，或只是大声去爱时，你最为鲜活。你往往慷慨地付出，当你的温暖落到了某处，才最像自己。长成完整的你，或许要明白，无人注视时，你也一样闪耀。",
    },
  },
  {
    role: "sun",
    sign: "Virgo",
    sign_zh: "处女座",
    headline: { en: "Devotion in the details", zh: "精工细作" },
    body: {
      en: "Your Sun in Virgo finds meaning in the small, honest work of making things better. You are often energized by usefulness — by fixing, refining, tending to what others overlook. The self you're growing into may discover that you are already enough, even before the improvement is finished.",
      zh: "你的太阳落在处女座，在把事情做得更好的、朴素而诚实的劳作里找到意义。让你有活力的常是「被需要」——修补、打磨、照料那些被人忽略的角落。你正在长成的自己，或许会发现，在改进完成之前，你早已足够。",
    },
  },
  {
    role: "sun",
    sign: "Libra",
    sign_zh: "天秤座",
    headline: { en: "Seeking the fair and the beautiful", zh: "权衡之美" },
    body: {
      en: "Your Sun in Libra is drawn toward harmony — toward the pleasure of a balanced room, a fair agreement, a graceful exchange. You tend to feel most yourself in connection, weighing perspectives until something just clicks into place. Coming into your own may mean learning that your own voice belongs on the scale too.",
      zh: "你的太阳落在天秤座，被和谐吸引——一个平衡的房间、一份公道的约定、一次优雅的往来，都令你愉悦。你往往在联结里最像自己，不断权衡各种视角，直到某样东西恰好落定。真正成为自己，或许要学会：你自己的声音，也该放上天平。",
    },
  },
  {
    role: "sun",
    sign: "Scorpio",
    sign_zh: "天蝎座",
    headline: { en: "Depth beneath the surface", zh: "深水静流" },
    body: {
      en: "Your Sun in Scorpio moves toward what is hidden — you are energized by intensity, by truth that costs something to reach. You tend to feel half-alive in the shallows and fully awake when things matter. The self you're growing into may learn that vulnerability, offered by choice, is a kind of power.",
      zh: "你的太阳落在天蝎座，朝着隐藏之处走去——你被强烈的东西点燃，被那些需要付出代价才能触及的真相点燃。浅水里你往往只活了一半，事情有分量时你才彻底清醒。你正在长成的自己，或许会懂得：主动交出的脆弱，本身就是一种力量。",
    },
  },
  {
    role: "sun",
    sign: "Sagittarius",
    sign_zh: "射手座",
    headline: { en: "The far horizon calls", zh: "远方在望" },
    body: {
      en: "Your Sun in Sagittarius reaches for the bigger picture — for meaning, distance, the next belief worth chasing. You tend to feel most alive in motion, whether that's across a country or across an idea. Growing into yourself may mean learning that freedom and commitment can travel the same road.",
      zh: "你的太阳落在射手座，伸手去够更大的图景——意义、远方，以及下一个值得追寻的信念。你往往在移动中最鲜活，无论是穿越一个国度，还是穿越一个想法。长成自己，或许意味着明白：自由与承诺可以走在同一条路上。",
    },
  },
  {
    role: "sun",
    sign: "Capricorn",
    sign_zh: "摩羯座",
    headline: { en: "The long patient climb", zh: "步步登高" },
    body: {
      en: "Your Sun in Capricorn is built for the long view — you draw strength from purpose, from building something that will still be standing years from now. You often feel most yourself when you are responsible for something real. The self you're becoming may learn that rest is not a reward you have to earn.",
      zh: "你的太阳落在摩羯座，天生适合远望——你从目标里获得力量，去建造多年后仍会屹立的东西。当你为某件真实的事负起责任时，往往最像自己。你正在成为的自己，或许会懂得：休息，并不是必须挣来的奖赏。",
    },
  },
  {
    role: "sun",
    sign: "Aquarius",
    sign_zh: "水瓶座",
    headline: { en: "A future-facing mind", zh: "未来之眼" },
    body: {
      en: "Your Sun in Aquarius is tuned to what could be — you come alive around ideas that break the mold and communities that dare to imagine differently. You tend to feel most yourself a little apart from the crowd, seeing the pattern others miss. Coming into your own may mean letting people close enough to know the person behind the vision.",
      zh: "你的太阳落在水瓶座，调频对准「本可以如何」——那些打破常规的想法、那些敢于另作想象的群体，最能让你鲜活。你往往在离人群稍远一点的地方最像自己，看见别人错过的图案。真正成为自己，或许是让人靠得够近，看见愿景背后的那个人。",
    },
  },
  {
    role: "sun",
    sign: "Pisces",
    sign_zh: "双鱼座",
    headline: { en: "Where all edges soften", zh: "心随潮汐" },
    body: {
      en: "Your Sun in Pisces lives close to the tide of feeling — you are nourished by beauty, imagination, and the quiet dissolving of boundaries between self and world. You tend to sense what others only later name. The self you're growing into may learn to keep a shoreline of your own, even as you drift so generously toward everyone else.",
      zh: "你的太阳落在双鱼座，贴着情感的潮水而居——美、想象，以及自我与世界之间边界的悄然消融，都在滋养你。你往往先一步感知到别人日后才说得出口的东西。你正在长成的自己，或许要在如此慷慨地漂向他人的同时，为自己留一道岸。",
    },
  },

  // ─────────────────────────────  MOON  ─────────────────────────────
  {
    role: "moon",
    sign: "Aries",
    sign_zh: "白羊座",
    headline: { en: "Feelings that arrive like fire", zh: "情绪来得快" },
    body: {
      en: "Your Moon in Aries feels first and reflects later — emotions arrive fast, hot, and honest. In private you may need room to react without being managed, to let the flare pass on its own. You tend to feel safest when you can act on what you feel rather than sitting with it too long.",
      zh: "你的月亮落在白羊座，总是先感受、后回味——情绪来得又快、又热、又诚实。私下里，你或许需要空间去反应，而不被人急着安抚，让那阵火自己烧过去。你往往在能对感受采取行动、而非久久与它对坐时，才最有安全感。",
    },
  },
  {
    role: "moon",
    sign: "Taurus",
    sign_zh: "金牛座",
    headline: { en: "Comfort you can touch", zh: "安于踏实" },
    body: {
      en: "Your Moon in Taurus is soothed by the physical world — warm food, familiar textures, a slow evening that asks nothing of you. You tend to need stability to feel safe, and change may unsettle you more than you let on. When life shakes, you often steady yourself through your senses.",
      zh: "你的月亮落在金牛座，被物质世界所抚慰——温热的食物、熟悉的触感、一个什么都不索求的缓慢夜晚。你往往需要稳定才觉得安心，变动对你的搅动，可能比你表现出来的更多。生活摇晃时，你常常靠感官把自己重新稳住。",
    },
  },
  {
    role: "moon",
    sign: "Gemini",
    sign_zh: "双子座",
    headline: { en: "Talking it into calm", zh: "说出来才安" },
    body: {
      en: "Your Moon in Gemini processes feeling through words — you often need to talk, write, or name a thing before it stops circling. In private your mind may stay busy even when your heart is tired. You tend to feel safest when someone will simply think out loud alongside you.",
      zh: "你的月亮落在双子座，透过语言来消化情绪——你常常需要说一说、写一写、给它命个名，它才肯停止打转。私下里，即使心累了，你的脑子或许仍在忙碌。有人愿意陪你把想法说出声，你往往就最安心。",
    },
  },
  {
    role: "moon",
    sign: "Cancer",
    sign_zh: "巨蟹座",
    headline: { en: "A tide of tenderness", zh: "情深似海" },
    body: {
      en: "Your Moon in Cancer feels everything at high volume and remembers it long after. You may need a nest — a person, a place, a ritual — that lets you be soft without explanation. In private you often care for others as instinctively as breathing, and you feel safest when that care is returned.",
      zh: "你的月亮落在巨蟹座，把一切都感受得很响，事后又记得很久。你或许需要一个巢——一个人、一处地方、一段仪式——让你无需解释地柔软下来。私下里，你照顾别人几乎像呼吸一样本能，而当这份照顾被回应，你才最有安全感。",
    },
  },
  {
    role: "moon",
    sign: "Leo",
    sign_zh: "狮子座",
    headline: { en: "A heart that needs warmth", zh: "渴望被看见" },
    body: {
      en: "Your Moon in Leo needs to feel cherished — to know, without guessing, that you matter to the people you love. In private you may crave a little tenderness performed out loud, a reassurance you can actually feel. You tend to be steadiest when your affection is met with the same generosity you give.",
      zh: "你的月亮落在狮子座，需要被珍惜——不必猜测，就知道自己在所爱之人心里有分量。私下里，你或许渴望一点大声表达出来的温柔，一句你真能感受到的安心话。当你的情感被同样慷慨地回应时，你往往最为安稳。",
    },
  },
  {
    role: "moon",
    sign: "Virgo",
    sign_zh: "处女座",
    headline: { en: "Order as a kind of calm", zh: "井然即安" },
    body: {
      en: "Your Moon in Virgo settles when things make sense — a tidy space, a clear plan, a small problem solved. In private you may soothe worry by being useful, turning care into something you can do. You tend to feel safest when you can quietly put one corner of the world back in order.",
      zh: "你的月亮落在处女座，在事情说得通时安定下来——一处整洁的空间、一份清楚的计划、一个被解决的小麻烦。私下里，你或许靠「做点有用的事」来安抚焦虑，把关心变成可以着手的行动。当你能悄悄把世界的一角重新归位，你往往就最踏实。",
    },
  },
  {
    role: "moon",
    sign: "Libra",
    sign_zh: "天秤座",
    headline: { en: "Peace between people", zh: "和则心安" },
    body: {
      en: "Your Moon in Libra is unsettled by discord and calmed by harmony restored. You may need fairness and gentle company to feel emotionally safe, and conflict can sit heavier in you than you show. In private you often reach instinctively for the middle, wanting everyone — yourself included — to be alright.",
      zh: "你的月亮落在天秤座，被不和搅乱，被重归的和谐抚平。你或许需要公平与温和的陪伴才觉得情绪安全，冲突压在你心里，往往比表面更沉。私下里，你常本能地伸手去够那个中间点，希望每个人——也包括你自己——都好好的。",
    },
  },
  {
    role: "moon",
    sign: "Scorpio",
    sign_zh: "天蝎座",
    headline: { en: "Feelings kept in the deep", zh: "情藏深处" },
    body: {
      en: "Your Moon in Scorpio feels with an intensity you rarely reveal all at once. You may need to trust completely before you let someone see the bottom of you, and safety, for you, is built slowly. In private your emotions run powerful and private, and loyalty — given and received — is what lets you finally exhale.",
      zh: "你的月亮落在天蝎座，感受强烈，却极少一次全然袒露。你或许要完全信任之后，才让人看见你的最深处，安全感于你，是慢慢筑起来的。私下里，你的情感深沉而私密，而忠诚——给出的与收到的——才是让你终于松一口气的东西。",
    },
  },
  {
    role: "moon",
    sign: "Sagittarius",
    sign_zh: "射手座",
    headline: { en: "Room to breathe", zh: "需要空间" },
    body: {
      en: "Your Moon in Sagittarius needs space and a sense of possibility to feel at ease. When feelings grow heavy, you may instinctively reach for movement, humor, or a change of scene. You tend to feel safest with people who love you without fencing you in.",
      zh: "你的月亮落在射手座，需要空间与一种「还有可能」的感觉，才觉得自在。情绪变重时，你或许本能地伸手去够移动、幽默，或换个环境。你往往和那些爱你却不把你圈起来的人在一起，才最有安全感。",
    },
  },
  {
    role: "moon",
    sign: "Capricorn",
    sign_zh: "摩羯座",
    headline: { en: "Steady when it counts", zh: "稳中自持" },
    body: {
      en: "Your Moon in Capricorn keeps a firm hand on its feelings, especially the tender ones. You may feel safest when you're composed and capable, and you often carry more than you admit. In private you might be learning that leaning on someone is not the same as losing control.",
      zh: "你的月亮落在摩羯座，对情绪——尤其是柔软的那些——握得很稳。你或许在沉着而能干时才最有安全感，也常常扛着比承认的更多。私下里，你或许正在学着明白：倚靠一个人，并不等于失去掌控。",
    },
  },
  {
    role: "moon",
    sign: "Aquarius",
    sign_zh: "水瓶座",
    headline: { en: "Feeling from a little distance", zh: "冷静观照" },
    body: {
      en: "Your Moon in Aquarius often understands emotion best with a bit of room around it. You may need the freedom to feel in your own way, without pressure to perform closeness on demand. In private you tend to steady yourself by making sense of things, and you feel safest where your independence is respected.",
      zh: "你的月亮落在水瓶座，常常要在情绪四周留出一点余地，才最懂它。你或许需要以自己的方式去感受的自由，而不被要求随叫随到地表演亲密。私下里，你往往靠把事情想明白来稳住自己，在独立被尊重的地方，你才最有安全感。",
    },
  },
  {
    role: "moon",
    sign: "Pisces",
    sign_zh: "双鱼座",
    headline: { en: "Porous to every mood", zh: "情感通透" },
    body: {
      en: "Your Moon in Pisces absorbs the emotional weather around you, sometimes before you notice it's not your own. You may need quiet, art, or solitude to wash the day off and find yourself again. In private your compassion runs deep, and you feel safest where you're allowed to be gentle.",
      zh: "你的月亮落在双鱼座，会吸收周遭的情绪天气，有时还没察觉那并不是你自己的。你或许需要安静、艺术或独处，把一天冲刷干净，重新找回自己。私下里，你的悲悯很深，而在被允许温柔的地方，你才最有安全感。",
    },
  },

  // ─────────────────────────────  RISING  ─────────────────────────────
  {
    role: "rising",
    sign: "Aries",
    sign_zh: "白羊座",
    headline: { en: "First through the door", zh: "率先破局" },
    body: {
      en: "Aries Rising tends to arrive with momentum — direct, quick to engage, ready to meet a new room head-on. Others may read you as bold or refreshingly straightforward before you've said much at all. You often instinctively lead with action, stepping toward the thing most people hesitate before.",
      zh: "白羊座上升的你，往往带着冲劲登场——直接、反应快，随时迎面走进一个新场合。别人还没听你说几句，可能就已觉得你大胆、爽快得让人舒服。你常本能地以行动打头阵，向大多数人还在犹豫的那件事迈出一步。",
    },
  },
  {
    role: "rising",
    sign: "Taurus",
    sign_zh: "金牛座",
    headline: { en: "Calm, grounded presence", zh: "从容不迫" },
    body: {
      en: "Taurus Rising meets the world at its own unhurried pace, radiating a steadiness others find easy to lean on. You may come across as composed and warm, someone who won't be rushed into anything. New situations tend to open for you slowly, as you take your time reading the room.",
      zh: "金牛座上升的你，以自己不慌不忙的节奏面对世界，散发出一种让人愿意依靠的稳。你或许给人沉着而温和的印象，是那种不会被催促的人。新场合往往在你缓缓打量四周之际，慢慢向你敞开。",
    },
  },
  {
    role: "rising",
    sign: "Gemini",
    sign_zh: "双子座",
    headline: { en: "Bright, quick, and curious", zh: "灵动善谈" },
    body: {
      en: "Gemini Rising tends to greet the world with questions and easy conversation, sparking connection through curiosity. Others may find you approachable, clever, quick to find the thread. You often meet a new situation by talking your way into it, gathering information as you go.",
      zh: "双子座上升的你，往往以提问和轻松的闲聊迎接世界，用好奇点燃联结。别人可能觉得你好接近、机灵、总能一下抓住话头。你常常靠「聊进去」来面对一个新场合，一边走一边收集信息。",
    },
  },
  {
    role: "rising",
    sign: "Cancer",
    sign_zh: "巨蟹座",
    headline: { en: "A gentle first impression", zh: "温柔以待" },
    body: {
      en: "Cancer Rising often meets people with a soft, attentive warmth, sensing the mood of a room before stepping fully into it. You may come across as caring and a little guarded at first, opening as trust grows. New situations tend to be approached feelingly, one careful step at a time.",
      zh: "巨蟹座上升的你，常以柔软而留心的温暖待人，在完全踏入一个房间之前，先感知它的气氛。你或许给人体贴、起初又有点防备的印象，随着信任加深才慢慢打开。新场合往往被你带着感受、一步一步小心地靠近。",
    },
  },
  {
    role: "rising",
    sign: "Leo",
    sign_zh: "狮子座",
    headline: { en: "Enters with warmth", zh: "自带光芒" },
    body: {
      en: "Leo Rising tends to arrive with a certain glow — generous, expressive, hard to overlook. Others may notice your presence before your words, drawn to a natural warmth you carry lightly. You often meet the world as if it might be glad to see you, and frequently, it is.",
      zh: "狮子座上升的你，往往自带一层光晕登场——慷慨、有表现力、让人难以忽视。别人也许先注意到你的存在，才听见你的话，被你举重若轻的温暖吸引。你常常像「世界或许乐于见到你」那样去面对它，而世界往往真的如此。",
    },
  },
  {
    role: "rising",
    sign: "Virgo",
    sign_zh: "处女座",
    headline: { en: "Observant and understated", zh: "细致内敛" },
    body: {
      en: "Virgo Rising tends to take in a new situation quietly, noticing details others walk right past. You may come across as modest, precise, and quietly attentive, offering help before you offer opinions. You often meet the world by first understanding how it works.",
      zh: "处女座上升的你，往往安静地打量一个新场合，留意到别人径直走过的细节。你或许给人谦逊、精确、默默留心的印象，先递上帮助，再递上意见。你常常先弄懂世界如何运作，再去与它相遇。",
    },
  },
  {
    role: "rising",
    sign: "Libra",
    sign_zh: "天秤座",
    headline: { en: "Grace on first meeting", zh: "优雅亲和" },
    body: {
      en: "Libra Rising tends to greet people with easy charm and a wish to put everyone at ease. You may come across as gracious, balanced, and pleasant to be around, attuned to the space between people. New situations are often met with tact, as you feel for what would make the moment go smoothly.",
      zh: "天秤座上升的你，往往以自然的魅力待人，想让每个人都自在。你或许给人优雅、平和、相处起来舒服的印象，敏锐于人与人之间的那段空隙。新场合常被你以圆融相待，你会去感觉：怎样才能让这一刻顺顺当当。",
    },
  },
  {
    role: "rising",
    sign: "Scorpio",
    sign_zh: "天蝎座",
    headline: { en: "Quiet magnetic reserve", zh: "深邃神秘" },
    body: {
      en: "Scorpio Rising tends to meet the world with a composed, watchful intensity that others can feel more than name. You may come across as private and magnetic, revealing little until you've decided to. New situations are often approached with caution and a keen read of who can be trusted.",
      zh: "天蝎座上升的你，往往以沉着而警觉的强度面对世界，那是别人能感觉到、却说不出名字的东西。你或许给人私密而有磁性的印象，不到你决定的时候，几乎不显露什么。新场合常被你谨慎地靠近，同时敏锐地判断谁值得信任。",
    },
  },
  {
    role: "rising",
    sign: "Sagittarius",
    sign_zh: "射手座",
    headline: { en: "Open road energy", zh: "开朗洒脱" },
    body: {
      en: "Sagittarius Rising tends to meet the world with optimism and an open, easygoing manner. Others may find you frank, funny, and game for whatever's next. You often approach new situations as an adventure, more curious about the possibilities than worried about the risks.",
      zh: "射手座上升的你，往往以乐观和一种开阔随和的态度面对世界。别人可能觉得你坦率、有趣、乐意迎接下一件事。你常把新场合当作一场冒险来对待，比起担心风险，你更好奇其中的种种可能。",
    },
  },
  {
    role: "rising",
    sign: "Capricorn",
    sign_zh: "摩羯座",
    headline: { en: "Composed and capable", zh: "沉稳可靠" },
    body: {
      en: "Capricorn Rising tends to present a calm, self-possessed front, someone who seems to have things handled. You may come across as reserved and quietly authoritative, earning trust before offering warmth. New situations are often met with care, as you gauge what's expected before you commit.",
      zh: "摩羯座上升的你，往往呈现出沉着、自持的一面，像是把事情都拿捏得住的人。你或许给人内敛、不动声色却有分量的印象，先赢得信任，再给出温暖。新场合常被你慎重相待，先估量清楚别人的期待，再决定投入。",
    },
  },
  {
    role: "rising",
    sign: "Aquarius",
    sign_zh: "水瓶座",
    headline: { en: "Familiar yet original", zh: "独特疏离" },
    body: {
      en: "Aquarius Rising tends to meet the world in its own key — friendly but a little apart, curious about people without quite blending in. Others may find you original, hard to categorize, memorable. You often approach new situations from an angle no one else thought to try.",
      zh: "水瓶座上升的你，往往以自己的调子面对世界——友善，却又有点疏离，对人好奇，却始终不完全融入。别人可能觉得你独特、难以归类、让人记得住。你常常从一个没人想到的角度去切入一个新场合。",
    },
  },
  {
    role: "rising",
    sign: "Pisces",
    sign_zh: "双鱼座",
    headline: { en: "A soft, dreamy first light", zh: "如梦似水" },
    body: {
      en: "Pisces Rising tends to meet the world with a gentle, receptive quality, seeming to blur softly into whatever mood surrounds you. Others may find you kind, elusive, easy to talk to and hard to pin down. New situations are often approached intuitively, as you feel your way toward what's really going on.",
      zh: "双鱼座上升的你，往往以柔软而善感的姿态面对世界，仿佛轻轻融进周遭的情绪里。别人可能觉得你善良、飘忽，好聊却又抓不太住。新场合常被你凭直觉靠近，一点点摸索出真正在发生的事。",
    },
  },
];
