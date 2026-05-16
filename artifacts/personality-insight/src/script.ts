/* ============================================================
   PERSONALITY INSIGHT — SCRIPT
   Pure vanilla TypeScript/JavaScript logic
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

type PersonalityType = 'leader' | 'creative' | 'calm' | 'social' | 'logical';

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

/* ---------- QUESTIONS ARRAY ---------- */

const questions: Question[] = [
  {
    type: 'choice',
    text: 'Do you enjoy social gatherings and meeting new people?',
    options: [
      { text: 'Yes, I love them — the more people the better!', scores: { social: 3, leader: 1 } },
      { text: 'I enjoy them, but I need recovery time afterwards.', scores: { calm: 2, creative: 1 } },
      { text: 'I prefer small, meaningful conversations.', scores: { logical: 2, calm: 1 } },
      { text: 'Not really — I find them draining.', scores: { calm: 3, logical: 1 } },
    ],
  },
  {
    type: 'slider',
    text: 'When making decisions, where do you lean?',
    leftLabel: '❤️ Pure Emotion',
    rightLabel: '🔬 Pure Logic',
    sliderMap: (v) => {
      if (v < 25)  return { social: 2, creative: 2 };
      if (v < 50)  return { creative: 2, social: 1 };
      if (v < 75)  return { logical: 2, calm: 1 };
      return            { logical: 3 };
    },
  },
  {
    type: 'choice',
    text: 'How do you approach planning and organisation?',
    options: [
      { text: 'Detailed plans — I map everything out.', scores: { leader: 3, logical: 2 } },
      { text: 'I plan loosely and adapt as I go.', scores: { leader: 1, creative: 2 } },
      { text: 'I prefer to stay spontaneous.', scores: { social: 2, creative: 2 } },
      { text: 'I avoid rigid plans — they stress me out.', scores: { calm: 2, creative: 1 } },
    ],
  },
  {
    type: 'choice',
    text: 'How do you respond to creative challenges?',
    options: [
      { text: 'I thrive — creativity is my natural element.', scores: { creative: 3 } },
      { text: 'I enjoy it and can come up with unique ideas.', scores: { creative: 2, social: 1 } },
      { text: 'I can do it, but I prefer structured problems.', scores: { logical: 2, leader: 1 } },
      { text: 'I tend to stick to proven methods.', scores: { logical: 2, calm: 1 } },
    ],
  },
  {
    type: 'slider',
    text: 'Under pressure, how do you typically react?',
    leftLabel: '🌊 Stay Calm',
    rightLabel: '🔥 Take Action',
    sliderMap: (v) => {
      if (v < 25)  return { calm: 3 };
      if (v < 50)  return { calm: 2, logical: 1 };
      if (v < 75)  return { leader: 2, social: 1 };
      return            { leader: 3 };
    },
  },
  {
    type: 'choice',
    text: 'When working in a group, what role do you naturally take?',
    options: [
      { text: 'The leader — I direct and motivate the team.', scores: { leader: 3 } },
      { text: 'The idea generator — I bring creative solutions.', scores: { creative: 3 } },
      { text: 'The connector — I keep everyone collaborating.', scores: { social: 3 } },
      { text: 'The analyst — I check details and catch errors.', scores: { logical: 3 } },
      { text: 'The mediator — I calm tension and find balance.', scores: { calm: 3 } },
    ],
  },
  {
    type: 'choice',
    text: 'Which of these best describes how you learn?',
    options: [
      { text: 'By doing and experimenting hands-on.', scores: { creative: 2, leader: 1 } },
      { text: "Through discussion and others's perspectives.", scores: { social: 3 } },
      { text: 'By reading, researching, and deep analysis.', scores: { logical: 3 } },
      { text: 'Through quiet reflection and my own pace.', scores: { calm: 3 } },
    ],
  },
  {
    type: 'slider',
    text: 'How much do external opinions influence your choices?',
    leftLabel: '🙅 I ignore them',
    rightLabel: '🫂 Highly important',
    sliderMap: (v) => {
      if (v < 25)  return { logical: 2, calm: 1 };
      if (v < 50)  return { leader: 2, logical: 1 };
      if (v < 75)  return { social: 2, creative: 1 };
      return            { social: 3 };
    },
  },
  {
    type: 'choice',
    text: 'How do you handle long-term goals?',
    options: [
      { text: 'I set bold ambitious goals and chase them relentlessly.', scores: { leader: 3 } },
      { text: 'I have flexible goals that evolve as I grow.', scores: { creative: 2, social: 1 } },
      { text: 'I take each day as it comes — goals feel restrictive.', scores: { calm: 2, social: 1 } },
      { text: 'I build measurable milestones and track progress.', scores: { logical: 3 } },
    ],
  },
  {
    type: 'choice',
    text: 'Which statement resonates with you most?',
    options: [
      { text: '"I inspire others to reach for their potential."', scores: { leader: 3, social: 1 } },
      { text: '"I see the world differently and create new things."', scores: { creative: 3 } },
      { text: '"I find peace in stillness and inner balance."', scores: { calm: 3 } },
      { text: '"I connect deeply with people everywhere I go."', scores: { social: 3 } },
      { text: '"I trust logic, data, and careful thinking."', scores: { logical: 3 } },
    ],
  },
];

/* ---------- PERSONALITY RESULTS DATABASE ---------- */

const personalityResults: Record<PersonalityType, PersonalityResult> = {
  leader: {
    icon: '🏆',
    title: 'The Leader',
    description:
      'You have a magnetic ability to inspire others and take charge when it matters most. People naturally look to you for direction, and you rarely shy away from responsibility. You see the big picture while staying action-oriented.',
    color: '#f59e0b',
    positiveTraits: [
      'Natural motivator and team builder',
      'Decisive under pressure',
      'Visionary thinking with practical drive',
      'High emotional intelligence with groups',
      'Accountable and reliable',
    ],
    cautionAreas: [
      'Can become controlling or overbearing',
      'May struggle to delegate or trust others',
      'Risk of burnout from carrying too much',
      'Impatience with slower-paced people',
    ],
    improvementTips: [
      'Practice active listening — let others lead sometimes',
      'Build regular rest and recovery into your schedule',
      'Celebrate the wins of those around you',
      'Explore vulnerability — it builds deeper trust',
    ],
    quote: 'The greatest leader is not necessarily the one who does the greatest things, but the one who gets people to do the greatest things.',
    quoteAuthor: '— Ronald Reagan',
  },
  creative: {
    icon: '🎨',
    title: 'The Creative Thinker',
    description:
      'Your mind is a kaleidoscope of ideas. You see connections others miss, think outside every box, and bring an original perspective to every problem. You thrive in environments that reward imagination and exploration.',
    color: '#ec4899',
    positiveTraits: [
      'Wildly imaginative and original',
      'Adaptable and open to change',
      'Sees problems from unexpected angles',
      'Deep aesthetic and conceptual sensitivity',
      'Enthusiastic and contagiously curious',
    ],
    cautionAreas: [
      'May struggle to follow through on projects',
      'Gets bored with routine quickly',
      'Can be scattered or unfocused',
      'Overthinks and second-guesses ideas',
    ],
    improvementTips: [
      'Use a single trusted system to track your ideas',
      'Pair up with detail-oriented partners',
      'Commit to finishing one creative project before starting another',
      'Build structure into your day — even creative work needs rhythm',
    ],
    quote: 'Creativity is intelligence having fun.',
    quoteAuthor: '— Albert Einstein',
  },
  calm: {
    icon: '🧘',
    title: 'The Calm Observer',
    description:
      'You carry a quiet, steadying presence that others are drawn to. You observe deeply, process fully, and speak with intention. In a noisy world, your stillness is a superpower — it gives you clarity that reactive minds miss.',
    color: '#34d399',
    positiveTraits: [
      'Unshakeable composure under pressure',
      'Patient and thoughtful listener',
      'Deep thinker with rich inner world',
      'Empathetic without being overwhelmed',
      'Consistent and trustworthy',
    ],
    cautionAreas: [
      'Can appear detached or uninterested',
      'Avoids necessary confrontations',
      'May suppress emotions for too long',
      'Prone to overthinking in silence',
    ],
    improvementTips: [
      'Express your thoughts and feelings more proactively',
      'Schedule regular social connection — even brief check-ins help',
      'Practise assertiveness — your voice matters',
      'Journal to process your rich inner life',
    ],
    quote: 'In the midst of chaos, there is also opportunity. The mind is everything; what you think, you become.',
    quoteAuthor: '— Buddha',
  },
  social: {
    icon: '🌍',
    title: 'The Social Explorer',
    description:
      'You are energised by people, places, and experiences. Your warmth and curiosity make strangers feel like old friends, and you thrive in environments filled with variety and human connection. Life is an adventure — and you bring everyone along.',
    color: '#fb923c',
    positiveTraits: [
      'Charismatic and naturally likeable',
      'Excellent communicator and storyteller',
      'Brings energy and enthusiasm to groups',
      'Highly empathetic and tuned in to others',
      'Adapts easily to new environments',
    ],
    cautionAreas: [
      'May neglect deep solitary reflection',
      'Can overpromise in the moment',
      'Seeking approval can undermine decisions',
      'Risk of burnout from over-extension',
    ],
    improvementTips: [
      'Schedule quiet solo time to recharge and reflect',
      'Develop a core set of personal values to anchor your choices',
      'Practise saying no — your time is your most valuable resource',
      'Cultivate depth in a few close relationships, not just breadth',
    ],
    quote: 'You can make more friends in two months by becoming interested in other people than in two years by trying to get people interested in you.',
    quoteAuthor: '— Dale Carnegie',
  },
  logical: {
    icon: '🔬',
    title: 'The Logical Analyzer',
    description:
      'You approach the world with precision, curiosity, and a deep respect for evidence and systems. You find beauty in structure, truth in data, and satisfaction in solving complex problems that confound others.',
    color: '#60a5fa',
    positiveTraits: [
      'Sharp critical thinker',
      'Highly accurate and detail-oriented',
      'Objective and impartial in analysis',
      'Excellent problem-solver and strategist',
      'Values truth and intellectual honesty',
    ],
    cautionAreas: [
      'Can appear cold or dismissive of emotions',
      'Prone to analysis paralysis',
      'May underestimate intuitive insight',
      'Struggles with ambiguity and uncertainty',
    ],
    improvementTips: [
      "Practise emotional curiosity — ask \"how does this feel?\" as well as \"what does this mean?\"",
      "Set a decision deadline — perfect analysis doesn't exist",
      'Embrace calculated risk — not all value is measurable',
      'Share your thinking process — others learn from your mind',
    ],
    quote: 'Logic will get you from A to B. Imagination will take you everywhere.',
    quoteAuthor: '— Albert Einstein',
  },
};

/* ---------- STATE ---------- */

let currentIndex = 0;
const answers: Array<number | null> = new Array(questions.length).fill(null);

// Track any pending auto-advance timer so we can cancel it if needed
let autoAdvanceTimer: ReturnType<typeof setTimeout> | null = null;

/* ---------- DOM REFERENCES ---------- */

const startBtn        = document.getElementById('start-btn') as HTMLButtonElement;
const prevBtn         = document.getElementById('prev-btn') as HTMLButtonElement;
const nextBtn         = document.getElementById('next-btn') as HTMLButtonElement;
const restartBtn      = document.getElementById('restart-btn') as HTMLButtonElement;

const welcomeScreen   = document.getElementById('welcome-screen') as HTMLElement;
const quizScreen      = document.getElementById('quiz-screen') as HTMLElement;
const resultsScreen   = document.getElementById('results-screen') as HTMLElement;

const currentQEl      = document.getElementById('current-q') as HTMLElement;
const totalQEl        = document.getElementById('total-q') as HTMLElement;
const progressPct     = document.getElementById('progress-pct') as HTMLElement;
const progressFill    = document.getElementById('progress-fill') as HTMLElement;
const progressDots    = document.getElementById('progress-dots') as HTMLElement;

const questionCard    = document.getElementById('question-card') as HTMLElement;
const questionNumber  = document.getElementById('question-number') as HTMLElement;
const questionText    = document.getElementById('question-text') as HTMLElement;
const answersGrid     = document.getElementById('answers-grid') as HTMLElement;
const sliderContainer = document.getElementById('slider-container') as HTMLElement;
const sliderInput     = document.getElementById('slider-input') as HTMLInputElement;
const sliderLabelLeft = document.getElementById('slider-label-left') as HTMLElement;
const sliderLabelRight= document.getElementById('slider-label-right') as HTMLElement;
const sliderValueText = document.getElementById('slider-value-text') as HTMLElement;

/* ---------- HELPERS ---------- */

function showScreen(screen: HTMLElement) {
  [welcomeScreen, quizScreen, resultsScreen].forEach(s => {
    s.classList.remove('active');
    s.style.display = 'none';
  });
  screen.style.display = 'block';
  requestAnimationFrame(() => screen.classList.add('active'));
}

function buildProgressDots() {
  progressDots.innerHTML = '';
  questions.forEach((_, i) => {
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

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

function sliderLabel(value: number): string {
  if (value < 15) return 'Strongly Left';
  if (value < 35) return 'Leaning Left';
  if (value < 65) return 'Balanced';
  if (value < 85) return 'Leaning Right';
  return 'Strongly Right';
}

/* ---------- ADVANCE / NAVIGATE ---------- */

/** Cancel any pending auto-advance and move to a specific question index */
function goToQuestion(idx: number) {
  // Cancel any pending auto-advance to prevent double-advancing
  if (autoAdvanceTimer !== null) {
    clearTimeout(autoAdvanceTimer);
    autoAdvanceTimer = null;
  }
  currentIndex = idx;
  renderQuestion(idx);
}

/** Move forward one question (or show results if on the last) */
function advance() {
  if (currentIndex < questions.length - 1) {
    goToQuestion(currentIndex + 1);
  } else {
    showResults();
  }
}

/* ---------- RENDER QUESTION ---------- */

function renderQuestion(idx: number) {
  const q = questions[idx];

  // Animate old card out, then swap content in
  questionCard.classList.remove('entering');
  questionCard.classList.add('leaving');

  setTimeout(() => {
    questionCard.classList.remove('leaving');

    // ---- Populate header ----
    questionNumber.textContent = String(idx + 1).padStart(2, '0');
    questionText.textContent   = q.text;

    // ---- Reset UI areas ----
    answersGrid.innerHTML      = '';
    answersGrid.style.display  = 'grid';
    sliderContainer.style.display = 'none';

    if (q.type === 'choice' && q.options) {
      // ---- Multiple choice ----
      q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.innerHTML = `<span class="answer-letter">${LETTERS[i]}</span><span>${opt.text}</span>`;

        // Restore previously selected answer
        if (answers[idx] === i) btn.classList.add('selected');

        btn.addEventListener('click', () => {
          // Mark answer
          answers[idx] = i;

          // Highlight selected button
          answersGrid.querySelectorAll('.answer-btn').forEach((b, bi) => {
            b.classList.toggle('selected', bi === i);
          });

          // Mark dot as answered
          progressDots.querySelectorAll('.progress-dot')[idx]?.classList.add('answered');

          // Enable next button immediately (user can also click it)
          nextBtn.disabled = false;

          // Auto-advance after a short delay for better UX
          // Store the timer reference so it can be cancelled if Next is clicked first
          if (autoAdvanceTimer !== null) clearTimeout(autoAdvanceTimer);
          autoAdvanceTimer = setTimeout(() => {
            autoAdvanceTimer = null;
            advance();
          }, 380);
        });

        answersGrid.appendChild(btn);
      });

      // Next is disabled until a choice is made (unless already answered)
      nextBtn.disabled = answers[idx] === null;

    } else if (q.type === 'slider') {
      // ---- Slider ----
      answersGrid.style.display  = 'none';
      sliderContainer.style.display = 'block';

      sliderLabelLeft.textContent  = q.leftLabel  ?? '';
      sliderLabelRight.textContent = q.rightLabel ?? '';

      // Default value is 50 (centre) if not yet answered
      const initValue = answers[idx] !== null ? (answers[idx] as number) : 50;
      answers[idx] = initValue;          // persist default so score calc works

      sliderInput.value           = String(initValue);
      sliderValueText.textContent = sliderLabel(initValue);

      // Rebuild the gradient fill for the slider track
      updateSliderFill(initValue);

      // Update value label and stored answer as user drags
      sliderInput.oninput = () => {
        const v = Number(sliderInput.value);
        answers[idx]                = v;
        sliderValueText.textContent = sliderLabel(v);
        updateSliderFill(v);
      };

      // Slider questions are always "answerable" — Next is enabled immediately
      nextBtn.disabled = false;
    }

    // ---- Nav buttons ----
    prevBtn.disabled = idx === 0;

    // Update next button label
    nextBtn.innerHTML =
      idx === questions.length - 1
        ? `See Results <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`
        : `Next <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;

    updateProgress(idx);

    // Animate new card in
    requestAnimationFrame(() => {
      questionCard.classList.add('entering');
      setTimeout(() => questionCard.classList.remove('entering'), 350);
    });

  }, 220);
}

/** Update the visual fill gradient on the range slider track */
function updateSliderFill(value: number) {
  const pct = value + '%';
  sliderInput.style.background = `linear-gradient(to right, var(--accent-1) 0%, var(--accent-2) ${pct}, var(--bg-surface) ${pct}, var(--bg-surface) 100%)`;
}

/* ---------- CALCULATE RESULTS ---------- */

function calculateResults(): Record<PersonalityType, number> {
  const scores: Record<PersonalityType, number> = {
    leader: 0, creative: 0, calm: 0, social: 0, logical: 0,
  };

  questions.forEach((q, idx) => {
    const answer = answers[idx];
    if (answer === null) return;

    if (q.type === 'choice' && q.options) {
      const opt = q.options[answer as number];
      if (opt) {
        for (const [type, pts] of Object.entries(opt.scores)) {
          scores[type as PersonalityType] += pts;
        }
      }
    } else if (q.type === 'slider' && q.sliderMap) {
      const mapped = q.sliderMap(answer as number);
      for (const [type, pts] of Object.entries(mapped)) {
        scores[type as PersonalityType] += pts;
      }
    }
  });

  return scores;
}

/* ---------- SHOW RESULTS ---------- */

function showResults() {
  const scores = calculateResults();

  const winner = (Object.entries(scores) as [PersonalityType, number][])
    .sort((a, b) => b[1] - a[1])[0][0];

  const result = personalityResults[winner];
  const maxScore = Math.max(...Object.values(scores)) || 1;

  // Hero
  (document.getElementById('result-icon') as HTMLElement).textContent  = result.icon;
  const titleEl = document.getElementById('result-title') as HTMLElement;
  titleEl.textContent   = result.title;
  titleEl.style.color   = result.color;
  (document.getElementById('result-desc') as HTMLElement).textContent  = result.description;

  // Score bars
  const scoreBars = document.getElementById('score-bars') as HTMLElement;
  scoreBars.innerHTML = '';

  const typeLabels: Record<PersonalityType, string> = {
    leader: '🏆 Leader', creative: '🎨 Creative', calm: '🧘 Calm Observer',
    social: '🌍 Social', logical: '🔬 Logical',
  };
  const typeColors: Record<PersonalityType, string> = {
    leader: '#f59e0b', creative: '#ec4899', calm: '#34d399', social: '#fb923c', logical: '#60a5fa',
  };

  (Object.entries(scores) as [PersonalityType, number][])
    .sort((a, b) => b[1] - a[1])
    .forEach(([type, score]) => {
      const pct = Math.round((score / maxScore) * 100);
      const row = document.createElement('div');
      row.className = 'score-row';
      row.innerHTML = `
        <span class="score-label">${typeLabels[type]}</span>
        <div class="score-track">
          <div class="score-bar" style="background:${typeColors[type]};" data-pct="${pct}"></div>
        </div>
        <span class="score-num">${pct}%</span>
      `;
      scoreBars.appendChild(row);
    });

  // Trait lists
  (document.getElementById('positive-traits') as HTMLElement).innerHTML =
    result.positiveTraits.map(t => `<li>${t}</li>`).join('');
  (document.getElementById('caution-traits') as HTMLElement).innerHTML =
    result.cautionAreas.map(t => `<li>${t}</li>`).join('');
  (document.getElementById('tips-list') as HTMLElement).innerHTML =
    result.improvementTips.map(t => `<li>${t}</li>`).join('');

  // Quote
  (document.getElementById('quote-text') as HTMLElement).textContent   = result.quote;
  (document.getElementById('quote-author') as HTMLElement).textContent = result.quoteAuthor;

  showScreen(resultsScreen);

  // Animate score bars after screen transition
  setTimeout(() => {
    document.querySelectorAll<HTMLElement>('.score-bar').forEach(bar => {
      bar.style.width = `${bar.dataset.pct}%`;
    });
  }, 400);
}

/* ---------- EVENT LISTENERS ---------- */

startBtn.addEventListener('click', () => {
  answers.fill(null);
  autoAdvanceTimer = null;
  buildProgressDots();
  showScreen(quizScreen);
  // Small delay to let the screen fade in before rendering the first question
  setTimeout(() => {
    currentIndex = 0;
    renderQuestion(0);
  }, 100);
});

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    goToQuestion(currentIndex - 1);
  }
});

nextBtn.addEventListener('click', () => {
  // Cancel any pending auto-advance — we are advancing manually right now
  if (autoAdvanceTimer !== null) {
    clearTimeout(autoAdvanceTimer);
    autoAdvanceTimer = null;
  }
  advance();
});

restartBtn.addEventListener('click', () => {
  answers.fill(null);
  autoAdvanceTimer = null;
  currentIndex = 0;
  showScreen(welcomeScreen);
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
