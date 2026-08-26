// Edit freely — question, 3-4 options, and which index is correct.
// The quiz component only needs this shape to keep working.
export const QUIZ_QUESTIONS = [
  {
    q: "What's Baby's actual go-to comfort food?",
    options: ['Maggi', 'Pizza', 'Biryani', 'Cereal'],
    correct: 0,
  },
  {
    q: 'Who is Baby lowkey (highkey) obsessed with?',
    options: ['Herself', 'Some random YouTuber', 'Nobody, she has self control', 'Me, 24/7'],
    correct: 3,
  },
  {
    q: "What happens when Veer successfully ragebaits Baby?",
    options: [
      'She laughs it off immediately',
      'She goes silent for exactly 4 minutes, then curses me out',
      'She ragebaits back twice as hard',
      'She blocks me (jk... unless)',
    ],
    correct: 1,
  },
  {
    q: 'Our relationship anniversary date?',
    options: ['Feb 9, 2026', 'Sept 22, 2006', 'Jul 2, 2006', "I don't remember"],
    correct: 0,
  },
  {
    q: "What's the most-used word by both of us usually?",
    options: ['"Sorry"', '"Whatever"', '"Fuck off" (affectionately)', '"Fine."'],
    correct: 2,
  },
  {
    q: "What does baby do the SECOND she's called sweetheart?",
    options: ['Doesn\'t do anything', 'Hates it', 'Wants me to call her that most often', 'Sends a reel'],
    correct: 2,
  },
]

export function scoreQuiz(answers) {
  const correctCount = answers.reduce(
    (acc, ans, i) => acc + (ans === QUIZ_QUESTIONS[i]?.correct ? 1 : 0),
    0
  )
  return Math.round((correctCount / QUIZ_QUESTIONS.length) * 100)
}

export function resultCopy(pct) {
  if (pct <= 30) return { headline: 'Wow. We need to talk.', emoji: '💀' }
  if (pct <= 60) return { headline: "Okay... I'll allow it.", emoji: '' }
  if (pct <= 90) return { headline: 'Not bad, birthday boy.', emoji: '' }
  return { headline: 'Okay fine. You can keep me.', emoji: '❤️' }
}
