/* ============================================================
   PERSONALITY INSIGHT — SCRIPT
   10 personality types · 12 questions · Compare mode
   ============================================================ */

/* ---------- TYPE DEFINITIONS ---------- */

interface AnswerOption {
  text: string;
  scores: Record<string, number>;
}

interface Question {
  type: 'choice' | 'slider';
  text: string;
  options?: AnswerOption[];
  leftLabel?: string;
  rightLabel?: string;
  sliderMap?: (value: number) => Record<string, number>;
}

type PersonalityType =
  | 'leader' | 'creative' | 'calm' | 'social' | 'logical'
  | 'empath' | 'adventurer' | 'perfectionist' | 'visionary' | 'nurturer';

interface PersonalityResult {
  icon: string;
  title: string;
  description: string;
  color: string;
  positiveTraits: string[];
  cautionAreas: string[];
  improvementTips: string[];
  quote: string;
  quoteAuthor: string;
}

/* ============================================================
   QUESTIONS — 12 total
   ============================================================ */

const questions: Question[] = [
  {
    type: 'choice',
    text: 'A friend invites you to a large party where you barely know anyone. How do you feel?',
    options: [
      { text: 'Excited — new people, new stories!',                    scores: { social: 3, adventurer: 1 } },
      { text: 'Happy to go, but I\'ll stick close to my friend.',      scores: { nurturer: 2, calm: 1 } },
      { text: 'I\'ll observe quietly before joining in.',              scores: { calm: 2, logical: 1 } },
      { text: 'Uncomfortable — I\'d rather skip it.',                  scores: { perfectionist: 1, logical: 1, empath: 1 } },
      { text: 'I go to make sure everyone feels included.',            scores: { empath: 3, nurturer: 1 } },
    ],
  },
  {
    type: 'slider',
    text: 'When facing an important decision, where does your process sit?',
    leftLabel: '❤️ Pure Gut Feeling',
    rightLabel: '📊 Pure Data & Facts',
    sliderMap: (v) => {
      if (v < 20) return { empath: 3, nurturer: 1 };
      if (v < 40) return { social: 2, creative: 2 };
      if (v < 60) return { calm: 2, visionary: 1 };
      if (v < 80) return { logical: 2, perfectionist: 1 };
      return            { logical: 3, perfectionist: 1 };
    },
  },
  {
    type: 'choice',
    text: 'How do you typically approach a new project or goal?',
    options: [
      { text: 'I map out every detail before I begin.',                scores: { perfectionist: 3, logical: 1 } },
      { text: 'I set a bold vision and figure out the steps.',         scores: { visionary: 3, leader: 1 } },
      { text: 'I dive straight in and adapt on the fly.',              scores: { adventurer: 3, creative: 1 } },
      { text: 'I research thoroughly, then plan carefully.',           scores: { logical: 2, perfectionist: 1 } },
      { text: 'I discuss it with others to build excitement.',         scores: { social: 2, nurturer: 1 } },
    ],
  },
  {
    type: 'slider',
    text: 'How comfortable are you with uncertainty and risk?',
    leftLabel: '🛡️ I avoid risk',
    rightLabel: '🎲 I embrace it',
    sliderMap: (v) => {
      if (v < 20) return { perfectionist: 2, logical: 2 };
      if (v < 40) return { calm: 2, logical: 1 };
      if (v < 60) return { visionary: 2, leader: 1 };
      if (v < 80) return { adventurer: 2, creative: 2 };
      return            { adventurer: 3, leader: 1 };
    },
  },
  {
    type: 'choice',
    text: 'In a group working on a shared challenge, what role do you naturally fall into?',
    options: [
      { text: 'The commander — I take charge and set direction.',      scores: { leader: 3 } },
      { text: 'The dreamer — I generate bold, unconventional ideas.',  scores: { visionary: 2, creative: 2 } },
      { text: 'The connector — I keep people energised and united.',   scores: { social: 3 } },
      { text: 'The analyst — I dig into data and find flaws.',         scores: { logical: 2, perfectionist: 1 } },
      { text: 'The heart — I sense feelings and keep morale high.',    scores: { empath: 2, nurturer: 2 } },
      { text: 'The doer — I just want to get things moving.',          scores: { adventurer: 2, leader: 1 } },
    ],
  },
  {
    type: 'choice',
    text: 'When someone close to you is struggling, what is your first instinct?',
    options: [
      { text: 'I feel their pain almost as if it were my own.',        scores: { empath: 3 } },
      { text: 'I immediately want to fix or solve their problem.',     scores: { leader: 2, logical: 1 } },
      { text: 'I sit with them and offer a safe space to talk.',       scores: { nurturer: 3 } },
      { text: 'I suggest activities to lift their mood.',              scores: { adventurer: 2, social: 1 } },
      { text: 'I listen calmly and help them think it through.',       scores: { calm: 2, logical: 1 } },
    ],
  },
  {
    type: 'choice',
    text: 'Which environment helps you do your best work?',
    options: [
      { text: 'Total freedom — no rules, just imagination.',           scores: { creative: 3, adventurer: 1 } },
      { text: 'Clear structure with room for creative input.',         scores: { perfectionist: 2, leader: 1 } },
      { text: 'Quiet solitude where I can think deeply.',              scores: { calm: 2, logical: 1 } },
      { text: 'Lively collaboration with energetic people.',           scores: { social: 2, empath: 1 } },
      { text: 'A big-picture vision to chase without limits.',         scores: { visionary: 3 } },
    ],
  },
  {
    type: 'choice',
    text: 'You make a significant mistake at work or school. How do you respond?',
    options: [
      { text: 'I analyse it obsessively to ensure it never repeats.',  scores: { perfectionist: 3 } },
      { text: 'I own it, apologise, and focus on fixing the damage.',  scores: { leader: 2, nurturer: 1 } },
      { text: 'I feel bad, but I process quietly and move on.',        scores: { calm: 2, empath: 1 } },
      { text: 'I see it as useful data — mistakes teach us.',          scores: { logical: 2, adventurer: 1 } },
      { text: 'I reframe it as part of a bigger growth story.',        scores: { visionary: 2, creative: 1 } },
    ],
  },
  {
    type: 'slider',
    text: 'When you think about the future, where does your mind go?',
    leftLabel: '🕰️ I live in the present',
    rightLabel: '🚀 I dream of what\'s possible',
    sliderMap: (v) => {
      if (v < 20) return { calm: 3 };
      if (v < 40) return { social: 2, nurturer: 1 };
      if (v < 60) return { leader: 2, logical: 1 };
      if (v < 80) return { creative: 2, visionary: 1 };
      return            { visionary: 3 };
    },
  },
  {
    type: 'choice',
    text: 'After an exhausting week, how do you recharge?',
    options: [
      { text: 'An outdoor adventure or something physically thrilling.', scores: { adventurer: 3 } },
      { text: 'Spending quality time with people I love.',               scores: { social: 2, nurturer: 1 } },
      { text: 'Alone time — reading, music, or creative projects.',      scores: { calm: 2, creative: 1 } },
      { text: 'Diving into a problem or learning something new.',        scores: { logical: 2, visionary: 1 } },
      { text: 'Helping or caring for someone else — it fills me up.',    scores: { nurturer: 3, empath: 1 } },
      { text: 'Reviewing my goals and planning my next steps.',          scores: { perfectionist: 2, leader: 1 } },
    ],
  },
  {
    type: 'choice',
    text: 'Which value matters most to you in how you live your life?',
    options: [
      { text: 'Excellence — I always aim to do my best work.',          scores: { perfectionist: 3 } },
      { text: 'Freedom — I need space to explore and take risks.',      scores: { adventurer: 3 } },
      { text: 'Connection — relationships are everything.',             scores: { social: 2, empath: 1 } },
      { text: 'Truth — honesty, logic, and evidence always win.',       scores: { logical: 3 } },
      { text: 'Impact — I want to leave the world better.',            scores: { visionary: 2, nurturer: 1 } },
      { text: 'Harmony — peace and balance in everything.',             scores: { calm: 3 } },
    ],
  },
  {
    type: 'choice',
    text: 'Which of these sentences feels most like something you would say?',
    options: [
      { text: '"I am here to lead people toward something great."',           scores: { leader: 3 } },
      { text: '"I see possibilities that others can\'t imagine yet."',        scores: { visionary: 3 } },
      { text: '"I understand how people feel, even when they say nothing."',  scores: { empath: 3 } },
      { text: '"I want to protect and uplift everyone around me."',           scores: { nurturer: 3 } },
      { text: '"I need to push boundaries and discover what\'s next."',       scores: { adventurer: 3 } },
      { text: '"I won\'t rest until this is done perfectly."',                scores: { perfectionist: 3 } },
      { text: '"I create things the world hasn\'t seen before."',             scores: { creative: 3 } },
      { text: '"I find clarity where others find chaos."',                    scores: { logical: 3 } },
      { text: '"I bring people together and make them feel valued."',         scores: { social: 3 } },
      { text: '"I find peace in stillness and depth in silence."',            scores: { calm: 3 } },
    ],
  },
];

/* ============================================================
   PERSONALITY RESULTS — 10 types
   ============================================================ */

const personalityResults: Record<PersonalityType, PersonalityResult> = {
  leader: {
    icon: '🏆', title: 'The Leader', color: '#f59e0b',
    description: 'You have a magnetic ability to inspire others and step up when it matters most. People look to you for direction instinctively, and you thrive on turning vision into action.',
    positiveTraits: ['Natural at motivating and uniting people', 'Decisive and composed under pressure', 'Big-picture thinker with actionable drive', 'Accountable — you own outcomes fully', 'Confident communicator others trust'],
    cautionAreas: ['Can slide into controlling behaviour', 'Struggles to delegate or let go', 'Prone to burnout from over-responsibility', 'Impatience with slower-paced collaborators'],
    improvementTips: ['Practise active listening — sometimes the best leadership is silence', 'Build genuine rest into your schedule; rest is strategy', 'Celebrate others\' wins loudly and your own quietly', 'Let vulnerability into your leadership — it builds real trust'],
    quote: 'The greatest leader is not the one who does the greatest things, but the one who gets people to do the greatest things.',
    quoteAuthor: '— Ronald Reagan',
  },
  creative: {
    icon: '🎨', title: 'The Creative Thinker', color: '#ec4899',
    description: 'Your mind is a kaleidoscope of ideas. You see connections others miss, think outside every box, and bring originality to whatever you touch.',
    positiveTraits: ['Wildly imaginative and truly original', 'Adaptable — you welcome change and chaos', 'Sees problems from angles no one else considered', 'Deep aesthetic and conceptual sensitivity', 'Contagiously curious and enthusiastic'],
    cautionAreas: ['May struggle to finish what you start', 'Routine drains you fast', 'Can be scattered across too many ideas at once', 'Tends to overthink and second-guess creative choices'],
    improvementTips: ['Use one trusted system to capture and organise your ideas', 'Partner with detail-oriented people to bring ideas to life', 'Commit to finishing one project before launching the next', 'Routine doesn\'t kill creativity — it gives it a launchpad'],
    quote: 'Creativity is intelligence having fun.',
    quoteAuthor: '— Albert Einstein',
  },
  calm: {
    icon: '🧘', title: 'The Calm Observer', color: '#34d399',
    description: 'You carry a quiet, grounding presence that others are drawn to. You observe before you act, listen before you speak, and process deeply before you decide.',
    positiveTraits: ['Unshakeable composure in stressful situations', 'A patient, thoughtful, and generous listener', 'Rich inner world with deep insight', 'Empathetic without being overwhelmed', 'Reliable, consistent, and deeply trustworthy'],
    cautionAreas: ['May appear distant or disengaged', 'Avoids necessary conflict for too long', 'Internalises emotions silently until they overflow', 'Prone to extended overthinking in solitude'],
    improvementTips: ['Share your thoughts more proactively — your voice has real weight', 'Schedule regular connection; even brief check-ins help', 'Practise assertiveness: your comfort isn\'t worth sacrificing your needs', 'Keep a journal to surface and process your rich inner world'],
    quote: 'The mind is everything. What you think, you become.',
    quoteAuthor: '— Buddha',
  },
  social: {
    icon: '🌍', title: 'The Social Explorer', color: '#fb923c',
    description: 'You are energised by people, places, and shared experiences. Your natural warmth makes strangers feel like old friends, and you thrive wherever there is variety and human connection.',
    positiveTraits: ['Charismatic and naturally magnetic', 'Excellent communicator and storyteller', 'Infectious energy that lifts any room', 'Highly attuned to the people around you', 'Adapts easily to new people and places'],
    cautionAreas: ['Deep solitary reflection gets neglected', 'Can over-promise in the excitement of the moment', 'Approval-seeking can cloud personal decisions', 'Risk of spreading yourself too thin'],
    improvementTips: ['Schedule quiet solo time — reflection adds depth to your warmth', 'Build a personal value system to anchor decisions when excitement fades', 'Practise saying no — your time and energy are precious', 'Cultivate a few deeply meaningful relationships alongside the broad ones'],
    quote: 'You can make more friends in two months by being genuinely interested in others than in two years trying to make them interested in you.',
    quoteAuthor: '— Dale Carnegie',
  },
  logical: {
    icon: '🔬', title: 'The Logical Analyzer', color: '#60a5fa',
    description: 'You see the world through a lens of patterns, evidence, and precision. Where others see confusion, you see systems waiting to be understood.',
    positiveTraits: ['Sharp, disciplined critical thinker', 'Precise and detail-oriented in everything you do', 'Objective — you follow the evidence, not the crowd', 'An excellent strategist and problem-solver', 'Intellectually honest and trustworthy with information'],
    cautionAreas: ['Can seem cold or dismissive of emotional concerns', 'Analysis paralysis — seeking perfect data before acting', 'May undervalue intuition and gut feeling', 'Ambiguity and uncertainty are genuinely unsettling'],
    improvementTips: ['Ask "how does this feel?" as often as "what does this mean?"', 'Set hard decision deadlines — perfect information never arrives', 'Practise calculated risk-taking; not all value is measurable', 'Share your reasoning openly — others grow from watching your mind work'],
    quote: 'Logic will get you from A to B. Imagination will take you everywhere.',
    quoteAuthor: '— Albert Einstein',
  },
  empath: {
    icon: '🫀', title: 'The Empath', color: '#f472b6',
    description: 'You feel the world deeply — sometimes other people\'s emotions more vividly than your own. People are drawn to your warmth because they feel genuinely understood in your presence.',
    positiveTraits: ['Deeply attuned to the emotions of others', 'Creates profound psychological safety for people', 'Excellent listener who makes people feel truly seen', 'Compassionate, non-judgemental, and open-hearted', 'Brings humanity and care into every space you enter'],
    cautionAreas: ['Absorbs others\' stress and pain too deeply', 'May neglect your own needs while caring for everyone else', 'Boundaries can be hard to enforce when someone is suffering', 'Susceptible to emotional exhaustion and burnout'],
    improvementTips: ['Establish clear emotional boundaries — you cannot pour from an empty cup', 'Schedule time that is fully and unapologetically yours', 'Learn to distinguish between empathising and absorbing others\' pain', 'Seek out spaces and people that replenish rather than drain you'],
    quote: 'Empathy is seeing with the eyes of another, listening with the ears of another, and feeling with the heart of another.',
    quoteAuthor: '— Alfred Adler',
  },
  adventurer: {
    icon: '🌄', title: 'The Adventurer', color: '#f97316',
    description: 'You were made for the edge of the map. Routine is your kryptonite and novelty is your fuel. You embrace the unknown with open arms and collect experiences with the same hunger others collect security.',
    positiveTraits: ['Fearless in the face of the unknown', 'Endlessly curious and open to new experiences', 'Brings spontaneity and excitement to those around you', 'Resilient — setbacks just become better stories', 'Highly adaptable; you figure it out as you go'],
    cautionAreas: ['Long-term planning and commitment can feel restrictive', 'Impulsive decisions sometimes lead to avoidable mistakes', 'May struggle with stability and consistent routines', 'Can burn bridges in the rush to the next thing'],
    improvementTips: ['Channel your boldness into one meaningful long-term pursuit', 'Pause before major decisions — brief reflection prevents costly detours', 'Build at least one anchor routine that grounds you daily', 'The biggest adventure is deep, lasting commitment — try it'],
    quote: 'Life is either a daring adventure or nothing at all.',
    quoteAuthor: '— Helen Keller',
  },
  perfectionist: {
    icon: '🎯', title: 'The Perfectionist', color: '#a78bfa',
    description: 'You hold yourself — and the things you care about — to an extraordinary standard. Details others overlook are glaring to you, and you find genuine satisfaction in work done with precision and care.',
    positiveTraits: ['Relentlessly high standards across everything you do', 'Exceptional attention to detail and quality', 'Thorough, reliable, and consistently delivers excellence', 'Self-motivated — external pressure is rarely needed', 'Others trust your work completely, because you check it twice'],
    cautionAreas: ['Paralysed by the fear of imperfection', 'Procrastinates when "good enough" feels like failure', 'Overly self-critical after inevitable mistakes', 'Can impose high standards on others, creating friction'],
    improvementTips: ['Reframe "done and good" as a genuine achievement — it often is', 'Set a clear "good enough" threshold before starting, not after', 'Practise self-compassion as you would comfort a friend who failed', 'Reserve your perfectionism for the things that truly matter'],
    quote: 'Have no fear of perfection — you\'ll never reach it. And that\'s perfectly fine.',
    quoteAuthor: '— Salvador Dalí (adapted)',
  },
  visionary: {
    icon: '🔭', title: 'The Visionary', color: '#818cf8',
    description: 'Your mind lives five steps ahead. You see the future with unusual clarity — not as a prediction, but as a destination worth building toward. You are energised by possibility and bored by the status quo.',
    positiveTraits: ['Sees opportunities long before others do', 'Inspires others with bold, compelling ideas', 'Thinks systemically — connects distant dots into clear pictures', 'Unafraid to challenge what is for the sake of what could be', 'Natural innovator with a long-range perspective'],
    cautionAreas: ['Gets frustrated by the slow pace of execution', 'May skip important details in pursuit of the big idea', 'Can seem detached or impractical to short-term thinkers', 'Starting is easy; sustained follow-through is the real challenge'],
    improvementTips: ['Pair with strong executors who love the details you find tedious', 'Break your vision into 90-day milestones to make it tangible', 'Listen to operational pushback — pragmatism sharpens great ideas', 'Communicate your vision in terms of others\' benefits, not just your excitement'],
    quote: 'The best way to predict the future is to create it.',
    quoteAuthor: '— Peter Drucker',
  },
  nurturer: {
    icon: '🌱', title: 'The Nurturer', color: '#4ade80',
    description: 'You are the quiet backbone of every relationship and community you are part of. Your greatest joy comes from watching the people you care about grow, succeed, and thrive.',
    positiveTraits: ['Deeply caring, warm, and unconditionally supportive', 'Creates safety and belonging wherever you go', 'Patient and consistent through others\' long seasons of struggle', 'Remembers the details — birthdays, worries, small victories', 'Brings out the best in people through quiet encouragement'],
    cautionAreas: ['Puts others\' needs so far above your own that you disappear', 'Saying "no" feels like personal failure or betrayal', 'Can attract people who take without giving back', 'Neglects your own dreams while championing everyone else\'s'],
    improvementTips: ['Your needs are not less important — act like it', 'Learn to identify people who reciprocate care, and invest there first', 'Practise asking for help — it models healthy interdependence', 'Set aside time to pursue something that is purely for you'],
    quote: 'To the world you may be one person, but to one person you may be the world.',
    quoteAuthor: '— Dr. Seuss',
  },
};

/* ============================================================
   COMPATIBILITY MATRIX (0–100 %)
   ============================================================ */

const compatibilityMatrix: Record<PersonalityType, Record<PersonalityType, number>> = {
  leader:        { leader:75, creative:70, calm:65, social:75, logical:80, empath:75, adventurer:70, perfectionist:75, visionary:88, nurturer:70 },
  creative:      { leader:70, creative:75, calm:65, social:72, logical:62, empath:70, adventurer:82, perfectionist:65, visionary:88, nurturer:65 },
  calm:          { leader:65, creative:65, calm:80, social:62, logical:82, empath:78, adventurer:58, perfectionist:75, visionary:70, nurturer:78 },
  social:        { leader:75, creative:72, calm:62, social:75, logical:65, empath:88, adventurer:82, perfectionist:65, visionary:70, nurturer:88 },
  logical:       { leader:80, creative:62, calm:82, social:65, logical:75, empath:65, adventurer:60, perfectionist:90, visionary:76, nurturer:60 },
  empath:        { leader:75, creative:70, calm:78, social:88, logical:65, empath:80, adventurer:65, perfectionist:70, visionary:70, nurturer:88 },
  adventurer:    { leader:70, creative:82, calm:58, social:82, logical:60, empath:65, adventurer:70, perfectionist:58, visionary:78, nurturer:65 },
  perfectionist: { leader:75, creative:65, calm:75, social:65, logical:90, empath:70, adventurer:58, perfectionist:70, visionary:70, nurturer:65 },
  visionary:     { leader:88, creative:88, calm:70, social:70, logical:76, empath:70, adventurer:78, perfectionist:70, visionary:75, nurturer:70 },
  nurturer:      { leader:70, creative:65, calm:78, social:88, logical:60, empath:88, adventurer:65, perfectionist:65, visionary:70, nurturer:80 },
};

/* Shared qualities a type brings to a relationship */
const typeContributions: Record<PersonalityType, string[]> = {
  leader:        ['clear direction and drive', 'decisiveness under pressure', 'accountability and ownership'],
  creative:      ['fresh unconventional ideas', 'adaptability and open-mindedness', 'imaginative problem-solving'],
  calm:          ['emotional stability and calm', 'patient, deep listening', 'thoughtful long-term perspective'],
  social:        ['warmth and inclusive energy', 'strong communication', 'enthusiasm and connection'],
  logical:       ['clear systematic analysis', 'objectivity and precision', 'evidence-based decisions'],
  empath:        ['emotional attunement', 'genuine understanding', 'compassion without judgement'],
  adventurer:    ['excitement and spontaneity', 'fearlessness and courage', 'resilience after setbacks'],
  perfectionist: ['attention to detail', 'high standards and quality', 'reliability and thoroughness'],
  visionary:     ['long-range thinking', 'inspiring ideas and direction', 'ability to see the big picture'],
  nurturer:      ['unconditional support', 'consistent care and warmth', 'encouragement and loyalty'],
};

/* Pairing dynamic descriptions */
function getPairingVerdict(score: number): { verdict: string; detail: string } {
  if (score >= 85) return { verdict: '✨ Exceptional Match', detail: 'You two are a rare, highly complementary pairing. Your strengths feed each other, your differences balance each other, and together you\'re stronger than either alone.' };
  if (score >= 75) return { verdict: '💫 Strong Match', detail: 'You\'re naturally well-aligned. You share enough common ground to connect deeply while bringing different strengths to the table — a solid, energising combination.' };
  if (score >= 65) return { verdict: '🤝 Good Pairing', detail: 'You complement each other well with some interesting contrasts. The key is appreciating how differently you each see the world — that difference is your superpower.' };
  if (score >= 55) return { verdict: '🌱 Growth Pairing', detail: 'You\'ll challenge each other in meaningful ways. This pairing takes understanding and communication to thrive, but the growth on both sides can be extraordinary.' };
  return { verdict: '⚡ Contrast Pairing', detail: 'You are very different people — and that\'s not a bad thing. Contrast pairings can be the most transformative, as long as you approach differences with curiosity, not conflict.' };
}

/* ============================================================
   STATE
   ============================================================ */

let currentIndex  = 0;
let compareMode   = false;
let currentPlayer: 1 | 2 = 1;
const answers: Array<number | null> = new Array(questions.length).fill(null);
const player1Answers: Array<number | null> = new Array(questions.length).fill(null);
let autoAdvanceTimer: ReturnType<typeof setTimeout> | null = null;

/* Stored scores after P1 finishes in compare mode */
let player1Scores: Record<PersonalityType, number> | null = null;

/* ============================================================
   DOM REFERENCES
   ============================================================ */

const startBtn          = document.getElementById('start-btn')          as HTMLButtonElement;
const startBtn2         = document.getElementById('start-btn-2')        as HTMLButtonElement;
const headerStartBtn    = document.getElementById('header-start-btn')   as HTMLButtonElement;
const compareBtn        = document.getElementById('compare-btn')        as HTMLButtonElement;
const compareBtn2       = document.getElementById('compare-btn-2')      as HTMLButtonElement;
const prevBtn           = document.getElementById('prev-btn')           as HTMLButtonElement;
const nextBtn           = document.getElementById('next-btn')           as HTMLButtonElement;
const restartBtn        = document.getElementById('restart-btn')        as HTMLButtonElement;
const exitQuizBtn       = document.getElementById('exit-quiz-btn')      as HTMLButtonElement;
const handoverNextBtn   = document.getElementById('handover-next-btn')  as HTMLButtonElement;
const handoverExitBtn   = document.getElementById('handover-exit-btn')  as HTMLButtonElement;
const compareRestartBtn = document.getElementById('compare-restart-btn') as HTMLButtonElement;

const welcomeScreen     = document.getElementById('welcome-screen')     as HTMLElement;
const quizScreen        = document.getElementById('quiz-screen')        as HTMLElement;
const resultsScreen     = document.getElementById('results-screen')     as HTMLElement;
const handoverScreen    = document.getElementById('handover-screen')    as HTMLElement;
const compareScreen     = document.getElementById('compare-screen')     as HTMLElement;

const allScreens        = [welcomeScreen, quizScreen, resultsScreen, handoverScreen, compareScreen];

const currentQEl        = document.getElementById('current-q')          as HTMLElement;
const totalQEl          = document.getElementById('total-q')            as HTMLElement;
const progressPct       = document.getElementById('progress-pct')       as HTMLElement;
const progressFill      = document.getElementById('progress-fill')      as HTMLElement;
const progressDots      = document.getElementById('progress-dots')      as HTMLElement;

const questionCard      = document.getElementById('question-card')      as HTMLElement;
const questionNumber    = document.getElementById('question-number')    as HTMLElement;
const questionText      = document.getElementById('question-text')      as HTMLElement;
const answersGrid       = document.getElementById('answers-grid')       as HTMLElement;
const sliderContainer   = document.getElementById('slider-container')   as HTMLElement;
const sliderInput       = document.getElementById('slider-input')       as HTMLInputElement;
const sliderLabelLeft   = document.getElementById('slider-label-left')  as HTMLElement;
const sliderLabelRight  = document.getElementById('slider-label-right') as HTMLElement;
const sliderValueText   = document.getElementById('slider-value-text')  as HTMLElement;

const playerIndicator   = document.getElementById('player-indicator')   as HTMLElement;
const playerBadge       = document.getElementById('player-badge')       as HTMLElement;

/* ============================================================
   HELPERS
   ============================================================ */

function showScreen(screen: HTMLElement) {
  allScreens.forEach(s => { s.classList.remove('active'); s.style.display = 'none'; });
  screen.style.display = 'block';
  requestAnimationFrame(() => screen.classList.add('active'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function buildProgressDots() {
  progressDots.innerHTML = '';
  questions.forEach(() => {
    const dot = document.createElement('div');
    dot.className = 'progress-dot';
    progressDots.appendChild(dot);
  });
}

function updateProgress(idx: number) {
  const pct = Math.round((idx / questions.length) * 100);
  currentQEl.textContent   = String(idx + 1);
  totalQEl.textContent     = String(questions.length);
  progressPct.textContent  = `${pct}%`;
  progressFill.style.width = `${pct}%`;

  const dots = progressDots.querySelectorAll('.progress-dot');
  dots.forEach((dot, i) => {
    dot.classList.remove('answered', 'current');
    if (i < idx)   dot.classList.add('answered');
    if (i === idx) dot.classList.add('current');
  });
}

const LETTERS = ['A','B','C','D','E','F','G','H','I','J'];

function sliderLabel(value: number): string {
  if (value < 15) return 'Strongly Left';
  if (value < 35) return 'Leaning Left';
  if (value < 65) return 'Balanced';
  if (value < 85) return 'Leaning Right';
  return 'Strongly Right';
}

function updateSliderFill(value: number) {
  const pct = value + '%';
  sliderInput.style.background =
    `linear-gradient(to right, var(--accent-1) 0%, var(--accent-2) ${pct}, var(--bg-surface) ${pct}, var(--bg-surface) 100%)`;
}

/* ============================================================
   QUIZ FLOW
   ============================================================ */

function startQuiz(isCompare: boolean, player: 1 | 2 = 1) {
  compareMode   = isCompare;
  currentPlayer = player;

  answers.fill(null);
  autoAdvanceTimer = null;
  currentIndex = 0;

  /* Player indicator */
  if (isCompare) {
    playerIndicator.style.display = 'flex';
    playerBadge.textContent = player === 1 ? '👤 Player 1' : '👥 Player 2';
  } else {
    playerIndicator.style.display = 'none';
  }

  buildProgressDots();
  showScreen(quizScreen);
  setTimeout(() => renderQuestion(0), 150);
}

function goToQuestion(idx: number) {
  if (autoAdvanceTimer !== null) { clearTimeout(autoAdvanceTimer); autoAdvanceTimer = null; }
  currentIndex = idx;
  renderQuestion(idx);
}

function advance() {
  if (currentIndex < questions.length - 1) {
    goToQuestion(currentIndex + 1);
  } else {
    finishQuiz();
  }
}

function finishQuiz() {
  const scores = calculateScores(answers);

  if (compareMode && currentPlayer === 1) {
    /* Save P1 scores and show handover */
    player1Scores = scores;
    player1Answers.splice(0, questions.length, ...answers);
    const winner = topType(scores);
    const result = personalityResults[winner];
    (document.getElementById('handover-icon') as HTMLElement).textContent = result.icon;
    (document.getElementById('handover-type-name') as HTMLElement).textContent = result.title;
    showScreen(handoverScreen);
  } else if (compareMode && currentPlayer === 2) {
    /* Both done — show compare results */
    showCompareResults(player1Scores!, scores);
  } else {
    /* Solo mode */
    showSoloResults(scores);
  }
}

/* ============================================================
   RENDER QUESTION
   ============================================================ */

function renderQuestion(idx: number) {
  const q = questions[idx];

  questionCard.classList.remove('entering');
  questionCard.classList.add('leaving');

  setTimeout(() => {
    questionCard.classList.remove('leaving');

    questionNumber.textContent = String(idx + 1).padStart(2, '0');
    questionText.textContent   = q.text;

    answersGrid.innerHTML         = '';
    answersGrid.style.display     = 'grid';
    sliderContainer.style.display = 'none';

    if (q.type === 'choice' && q.options) {
      q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.innerHTML = `<span class="answer-letter">${LETTERS[i]}</span><span>${opt.text}</span>`;
        if (answers[idx] === i) btn.classList.add('selected');

        btn.addEventListener('click', () => {
          answers[idx] = i;
          answersGrid.querySelectorAll('.answer-btn').forEach((b, bi) => b.classList.toggle('selected', bi === i));
          progressDots.querySelectorAll('.progress-dot')[idx]?.classList.add('answered');
          nextBtn.disabled = false;

          if (autoAdvanceTimer !== null) clearTimeout(autoAdvanceTimer);
          autoAdvanceTimer = setTimeout(() => { autoAdvanceTimer = null; advance(); }, 380);
        });

        answersGrid.appendChild(btn);
      });

      nextBtn.disabled = answers[idx] === null;

    } else if (q.type === 'slider') {
      answersGrid.style.display     = 'none';
      sliderContainer.style.display = 'block';

      sliderLabelLeft.textContent  = q.leftLabel  ?? '';
      sliderLabelRight.textContent = q.rightLabel ?? '';

      const initVal = answers[idx] !== null ? (answers[idx] as number) : 50;
      answers[idx]  = initVal;
      sliderInput.value           = String(initVal);
      sliderValueText.textContent = sliderLabel(initVal);
      updateSliderFill(initVal);

      sliderInput.oninput = () => {
        const v = Number(sliderInput.value);
        answers[idx]                = v;
        sliderValueText.textContent = sliderLabel(v);
        updateSliderFill(v);
      };

      nextBtn.disabled = false;
    }

    prevBtn.disabled  = idx === 0;
    nextBtn.innerHTML =
      idx === questions.length - 1
        ? `Finish <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`
        : `Next <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;

    updateProgress(idx);

    requestAnimationFrame(() => {
      questionCard.classList.add('entering');
      setTimeout(() => questionCard.classList.remove('entering'), 350);
    });
  }, 220);
}

/* ============================================================
   SCORE CALCULATION
   ============================================================ */

function calculateScores(ans: Array<number | null>): Record<PersonalityType, number> {
  const scores: Record<PersonalityType, number> = {
    leader: 0, creative: 0, calm: 0, social: 0, logical: 0,
    empath: 0, adventurer: 0, perfectionist: 0, visionary: 0, nurturer: 0,
  };

  questions.forEach((q, idx) => {
    const answer = ans[idx];
    if (answer === null) return;

    if (q.type === 'choice' && q.options) {
      const opt = q.options[answer as number];
      if (opt) for (const [t, p] of Object.entries(opt.scores)) scores[t as PersonalityType] += p;
    } else if (q.type === 'slider' && q.sliderMap) {
      const mapped = q.sliderMap(answer as number);
      for (const [t, p] of Object.entries(mapped)) scores[t as PersonalityType] += p;
    }
  });

  return scores;
}

function topType(scores: Record<PersonalityType, number>): PersonalityType {
  return (Object.entries(scores) as [PersonalityType, number][])
    .sort((a, b) => b[1] - a[1])[0][0];
}

/* ============================================================
   SOLO RESULTS
   ============================================================ */

const typeLabels: Record<PersonalityType, string> = {
  leader: '🏆 Leader', creative: '🎨 Creative', calm: '🧘 Calm Observer',
  social: '🌍 Social', logical: '🔬 Logical', empath: '🫀 Empath',
  adventurer: '🌄 Adventurer', perfectionist: '🎯 Perfectionist',
  visionary: '🔭 Visionary', nurturer: '🌱 Nurturer',
};

const typeColors: Record<PersonalityType, string> = {
  leader:'#f59e0b', creative:'#ec4899', calm:'#34d399', social:'#fb923c',
  logical:'#60a5fa', empath:'#f472b6', adventurer:'#f97316',
  perfectionist:'#a78bfa', visionary:'#818cf8', nurturer:'#4ade80',
};

function showSoloResults(scores: Record<PersonalityType, number>) {
  const winner = topType(scores);
  const result  = personalityResults[winner];
  const maxScore = Math.max(...Object.values(scores)) || 1;

  (document.getElementById('result-icon') as HTMLElement).textContent = result.icon;
  const titleEl = document.getElementById('result-title') as HTMLElement;
  titleEl.textContent = result.title;
  titleEl.style.color = result.color;
  (document.getElementById('result-desc') as HTMLElement).textContent = result.description;

  const scoreBars = document.getElementById('score-bars') as HTMLElement;
  scoreBars.innerHTML = '';
  (Object.entries(scores) as [PersonalityType, number][])
    .sort((a, b) => b[1] - a[1])
    .forEach(([type, score]) => {
      const pct = Math.round((score / maxScore) * 100);
      const row = document.createElement('div');
      row.className = 'score-row';
      row.innerHTML = `
        <span class="score-label">${typeLabels[type]}</span>
        <div class="score-track"><div class="score-bar" style="background:${typeColors[type]};" data-pct="${pct}"></div></div>
        <span class="score-num">${pct}%</span>`;
      scoreBars.appendChild(row);
    });

  (document.getElementById('positive-traits') as HTMLElement).innerHTML = result.positiveTraits.map(t => `<li>${t}</li>`).join('');
  (document.getElementById('caution-traits') as HTMLElement).innerHTML  = result.cautionAreas.map(t => `<li>${t}</li>`).join('');
  (document.getElementById('tips-list') as HTMLElement).innerHTML       = result.improvementTips.map(t => `<li>${t}</li>`).join('');
  (document.getElementById('quote-text') as HTMLElement).textContent    = result.quote;
  (document.getElementById('quote-author') as HTMLElement).textContent  = result.quoteAuthor;

  showScreen(resultsScreen);

  setTimeout(() => {
    document.querySelectorAll<HTMLElement>('#results-screen .score-bar').forEach(bar => {
      bar.style.width = `${bar.dataset.pct}%`;
    });
  }, 400);
}

/* ============================================================
   COMPARE RESULTS
   ============================================================ */

function showCompareResults(
  p1Scores: Record<PersonalityType, number>,
  p2Scores: Record<PersonalityType, number>,
) {
  const p1Type   = topType(p1Scores);
  const p2Type   = topType(p2Scores);
  const p1Result = personalityResults[p1Type];
  const p2Result = personalityResults[p2Type];

  /* Compatibility score */
  const compatScore = compatibilityMatrix[p1Type][p2Type];
  const { verdict, detail } = getPairingVerdict(compatScore);

  (document.getElementById('compat-pct') as HTMLElement).textContent    = `${compatScore}%`;
  (document.getElementById('compat-verdict') as HTMLElement).textContent = verdict;
  (document.getElementById('compat-detail') as HTMLElement).textContent  = detail;

  /* Animate circle */
  showScreen(compareScreen);
  setTimeout(() => {
    const circle = document.getElementById('compat-circle') as SVGCircleElement | null;
    if (circle) {
      const circumference = 314; // 2π × 50
      const offset = circumference - (compatScore / 100) * circumference;
      circle.style.strokeDashoffset = String(offset);

      /* Colour the circle by score quality */
      circle.style.stroke =
        compatScore >= 80 ? '#34d399' :
        compatScore >= 65 ? '#a78bfa' :
        compatScore >= 50 ? '#fb923c' : '#f472b6';
    }
  }, 300);

  /* P1 card */
  (document.getElementById('p1-icon') as HTMLElement).textContent  = p1Result.icon;
  (document.getElementById('p1-type') as HTMLElement).textContent  = p1Result.title;
  (document.getElementById('p1-type') as HTMLElement).style.color  = p1Result.color;
  (document.getElementById('p1-desc') as HTMLElement).textContent  = p1Result.description.slice(0, 120) + '…';
  (document.getElementById('p1-traits') as HTMLElement).innerHTML  = p1Result.positiveTraits.slice(0, 3).map(t => `<li>${t}</li>`).join('');

  /* P2 card */
  (document.getElementById('p2-icon') as HTMLElement).textContent  = p2Result.icon;
  (document.getElementById('p2-type') as HTMLElement).textContent  = p2Result.title;
  (document.getElementById('p2-type') as HTMLElement).style.color  = p2Result.color;
  (document.getElementById('p2-desc') as HTMLElement).textContent  = p2Result.description.slice(0, 120) + '…';
  (document.getElementById('p2-traits') as HTMLElement).innerHTML  = p2Result.positiveTraits.slice(0, 3).map(t => `<li>${t}</li>`).join('');

  /* Shared traits: combine contributions */
  const p1Contrib = typeContributions[p1Type];
  const p2Contrib = typeContributions[p2Type];

  /* Things they share (first trait from each, plus one combined) */
  const shared = [
    `Together you bring ${p1Contrib[0]} and ${p2Contrib[0]}`,
    `Both of you value personal growth and authentic relationships`,
    `Your combined perspective covers both ${p1Contrib[2]} and ${p2Contrib[2]}`,
  ];

  /* Where they differ */
  const differ = [
    `${p1Result.title} tends toward ${p1Contrib[1]}; ${p2Result.title} brings ${p2Contrib[1]}`,
    `You may occasionally see problems from very different angles — use this as a strength`,
    `Your pace and priorities can differ — open dialogue bridges the gap`,
  ];

  (document.getElementById('shared-traits') as HTMLElement).innerHTML = shared.map(t => `<li>${t}</li>`).join('');
  (document.getElementById('differ-traits') as HTMLElement).innerHTML = differ.map(t => `<li>${t}</li>`).join('');

  /* Animate score bars */
  setTimeout(() => {
    document.querySelectorAll<HTMLElement>('#compare-screen .score-bar').forEach(bar => {
      bar.style.width = `${bar.dataset.pct}%`;
    });
  }, 500);
}

/* ============================================================
   EVENT LISTENERS
   ============================================================ */

/* Solo quiz start buttons */
[startBtn, startBtn2, headerStartBtn].forEach(btn => {
  btn?.addEventListener('click', () => startQuiz(false));
});

/* Compare start buttons */
[compareBtn, compareBtn2].forEach(btn => {
  btn?.addEventListener('click', () => startQuiz(true, 1));
});

/* Quiz navigation */
prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) goToQuestion(currentIndex - 1);
});

nextBtn.addEventListener('click', () => {
  if (autoAdvanceTimer !== null) { clearTimeout(autoAdvanceTimer); autoAdvanceTimer = null; }
  advance();
});

/* Exit quiz */
exitQuizBtn.addEventListener('click', () => {
  if (autoAdvanceTimer !== null) { clearTimeout(autoAdvanceTimer); autoAdvanceTimer = null; }
  compareMode   = false;
  currentPlayer = 1;
  player1Scores = null;
  showScreen(welcomeScreen);
});

/* Handover: start P2 */
handoverNextBtn.addEventListener('click', () => startQuiz(true, 2));

/* Handover: exit without comparing */
handoverExitBtn.addEventListener('click', () => {
  compareMode   = false;
  currentPlayer = 1;
  player1Scores = null;
  showScreen(welcomeScreen);
});

/* Solo results restart */
restartBtn.addEventListener('click', () => {
  compareMode = false;
  showScreen(welcomeScreen);
});

/* Compare results play again */
compareRestartBtn.addEventListener('click', () => {
  compareMode   = false;
  currentPlayer = 1;
  player1Scores = null;
  showScreen(welcomeScreen);
});
