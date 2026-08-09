// Swap any of these for your real inside jokes whenever you want —
// the games just pull randomly from these arrays.

export const REFLEX_WAITING = [
  "don't blink, ragebaiter.",
  'holding... holding...',
  "I'm watching you.",
  'any second now.',
]

export const REFLEX_EARLY = [
  'TOO SOON. typical.',
  'lmaooo you jumped.',
  'sit down.',
  'aaand you failed. classic.',
]

export const REFLEX_RESULT_FAST = [ // < 300ms
  'okay show off.',
  "didn't know you had reflexes for anything other than replying to my texts late.",
  'fine. impressive. still fuck off.',
]
export const REFLEX_RESULT_MID = [ // 300-500ms
  'mid. very mid.',
  "that's... acceptable I guess.",
  'not bad, birthday boy.',
]
export const REFLEX_RESULT_SLOW = [ // > 500ms
  'bro. BRO.',
  'this is why I do everything around here.',
  "we need to talk about this later.",
]

export const TAP_TAUNTS = [
  { at: 0, line: 'go on then.' },
  { at: 5, line: "that's it?" },
  { at: 10, line: 'okay showoff.' },
  { at: 20, line: "wow. didn't know you had it in you." },
  { at: 30, line: 'okay I take back everything I said about you being lazy.' },
  { at: 45, line: "you're unhinged. I love it." },
]

export const KISS_CAUGHT_LINES = ['mwaaahhh 💋', 'caught one!', 'good boy.', 'that one was real btw.']
export const KISS_MISSED_LINES = ['smh.', 'too slow.', 'I saw that miss.']
export const DISTRACTION_LINES = [
  'were you checking Samantha & Vijay again??',
  'put the phone DOWN.',
  "that wasn't for you, that was a distraction. focus.",
  'excuse me?? focus on ME.',
]

export const WOULD_RATHER_ROUNDS = [
  {
    prompt: 'Would Baby rather you...',
    a: { label: 'Text back in 3 seconds forever', reaction: "obviously this one, don't test me." },
    b: { label: 'Leave me on read for revenge', reaction: 'excuse me. we are FIGHTING now.' },
  },
  {
    prompt: 'Pick one, I\'m judging you either way:',
    a: { label: 'Ragebait me daily', reaction: 'ugh. fine. I secretly love it.' },
    b: { label: 'Never ragebait again', reaction: "boring. also lies, you'll do it in 5 minutes." },
  },
  {
    prompt: 'For your birthday, Baby would rather:',
    a: { label: 'Stalk Samantha & Vijay with you', reaction: 'the ONLY acceptable hobby of yours.' },
    b: { label: 'Watch literally anything else', reaction: "no. we don't do that here." },
  },
  {
    prompt: 'Late night, phone at 2%:',
    a: { label: 'Call anyway', reaction: 'correct answer. always call.' },
    b: { label: 'Text "charging, ttyl"', reaction: "unacceptable. I'm blocking you (I'm not)." },
  },
  {
    prompt: 'Last one:',
    a: { label: 'Admit you\'re obsessed with me', reaction: 'finally. some honesty.' },
    b: { label: 'Deny everything', reaction: "we both know it's a lie. cute try though." },
  },
]
