import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SceneWrapper from '../components/layout/SceneWrapper'
import { Reveal, Eyebrow, Headline } from '../components/ui/CinematicText'
import { QUIZ_QUESTIONS, scoreQuiz, resultCopy } from '../data/quiz'
import { useExperience } from '../context/ExperienceContext'

export default function BabyQuizScene() {
  const [step, setStep] = useState(0) // -1 intro, 0..N-1 questions, N result
  const [answers, setAnswers] = useState([])
  const { setQuizScore, quizScore } = useExperience()

  const total = QUIZ_QUESTIONS.length
  const started = step >= 0
  const finished = step >= total

  const choose = (optionIndex) => {
    const next = [...answers, optionIndex]
    setAnswers(next)
    if (step + 1 >= total) {
      const pct = scoreQuiz(next)
      setQuizScore(pct)
    }
    setStep((s) => s + 1)
  }

  const restart = () => {
    setAnswers([])
    setStep(0)
  }

  if (!started) {
    return (
      <SceneWrapper theme="wrapped" sceneLabel="SCENE 4">
        <div className="flex flex-1 flex-col items-center justify-center gap-8 text-center">
          <Reveal><Eyebrow>a very official evaluation</Eyebrow></Reveal>
          <Reveal delay={200}><Headline>How well do you know Baby?</Headline></Reveal>
          <Reveal delay={400}>
            <p className="max-w-sm font-body text-sm text-ash">
              {total} questions. No pressure. (There is pressure.)
            </p>
          </Reveal>
          <Reveal delay={600}>
            <button
              onClick={() => setStep(0)}
              className="rounded-full bg-ember px-8 py-3 font-mono text-xs uppercase tracking-widest2 text-void transition hover:scale-105"
            >
              start the test
            </button>
          </Reveal>
        </div>
      </SceneWrapper>
    )
  }

  if (finished) {
    const pct = scoreQuiz(answers)
    const { headline, emoji } = resultCopy(pct)
    return (
      <SceneWrapper theme="wrapped" sceneLabel="RESULT">
        <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
          <Reveal><Eyebrow>final score</Eyebrow></Reveal>
          <Reveal delay={250}>
            <span className="font-display text-8xl font-semibold tabular-nums text-glow sm:text-9xl">
              {pct}%
            </span>
          </Reveal>
          <Reveal delay={600}>
            <Headline className="text-3xl sm:text-4xl">
              {headline} <span>{emoji}</span>
            </Headline>
          </Reveal>
          <Reveal delay={900} className="flex gap-3">
            <button
              onClick={restart}
              className="rounded-full border border-parchment/25 px-6 py-3 font-mono text-xs uppercase tracking-widest2 transition hover:border-ember"
            >
              retake
            </button>
            <Link
              to="/wrapped"
              className="rounded-full bg-ember px-6 py-3 font-mono text-xs uppercase tracking-widest2 text-void transition hover:scale-105"
            >
              your wrapped →
            </Link>
          </Reveal>
        </div>
      </SceneWrapper>
    )
  }

  const question = QUIZ_QUESTIONS[step]

  return (
    <SceneWrapper theme="wrapped" sceneLabel={`QUESTION ${step + 1} / ${total}`}>
      <div className="flex flex-1 flex-col items-center justify-center gap-10 text-center">
        <div className="h-1 w-full max-w-sm overflow-hidden rounded-full bg-parchment/10">
          <div
            className="h-full bg-ember transition-all duration-500"
            style={{ width: `${(step / total) * 100}%` }}
          />
        </div>

        <Reveal key={step}>
          <Headline className="max-w-xl text-3xl sm:text-4xl">{question.q}</Headline>
        </Reveal>

        <div className="grid w-full max-w-md grid-cols-1 gap-3">
          {question.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => choose(i)}
              className="rounded-xl border border-parchment/15 px-5 py-4 text-left font-body text-sm text-parchment transition hover:border-ember hover:bg-ember/10"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </SceneWrapper>
  )
}
