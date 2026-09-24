import { useState } from 'react'

export default function Quiz() {
  const [answered, setAnswered] = useState(false)

  return (
    <div className="quiz-card">
      <span className="section-icon">🐻💌🐼</span>
      <p className="eyebrow">a very important question</p>
      <h2>Secret question<br /><em>for my Dudu</em></h2>
      <p className="quiz-question">What is my favorite thing to do with you?</p>
      <div className="quiz-options">
        {['Squish your cheeks nonstop', 'Listen to you talk about your day', 'Get cute, tight hugs'].map((choice) => (
          <button key={choice} onClick={() => setAnswered(true)}>🌸 {choice}</button>
        ))}
      </div>
      {answered && <div className="quiz-answer">🎉 Correct! It is all of them, plus one million more kisses!</div>}
    </div>
  )
}
