import { useState } from "react"
import { questions } from "../data/questions"

function SmartPractice({ onAnswer }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(0)

  const question = questions[currentQuestion]
  const answered = selectedAnswer !== null
  const isCorrect = selectedAnswer === question.correctAnswer

  function handleAnswer(option) {
  if (answered) return

  const correct = option === question.correctAnswer

  setSelectedAnswer(option)

  if (correct) {
    setScore((previousScore) => previousScore + 1)
  }

  onAnswer({
    questionId: question.id,
    topic: question.topic,
    correct,
    mistakeType: correct ? null : question.mistakeType,
  })
}

  function handleNextQuestion() {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((previousQuestion) => previousQuestion + 1)
      setSelectedAnswer(null)
    }
  }

  return (
    <main className="practice-page">
      <header className="practice-header">
        <div>
          <p className="eyebrow">SMART PRACTICE</p>
          <h2>Learn from every answer.</h2>
          <p>
            Don't just find out whether you're right. Understand why.
          </p>
        </div>

        <div className="practice-score">
          <span>SESSION SCORE</span>
          <strong>
            {score}/{questions.length}
          </strong>
        </div>
      </header>

      <div className="practice-progress">
        <div>
          <span>
            Question {currentQuestion + 1} of {questions.length}
          </span>

          <span>{question.topic}</span>
        </div>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      <section className="question-card">
        <div className="question-meta">
          <span>{question.topic}</span>
          <span>{question.difficulty}</span>
        </div>

        <h3>{question.question}</h3>

        <div className="answer-grid">
          {question.options.map((option, index) => {
            let answerClass = "answer-option"

            if (answered && option === question.correctAnswer) {
              answerClass += " correct"
            }

            if (
              answered &&
              option === selectedAnswer &&
              option !== question.correctAnswer
            ) {
              answerClass += " incorrect"
            }

            return (
              <button
                className={answerClass}
                key={option}
                onClick={() => handleAnswer(option)}
              >
                <span className="answer-letter">
                  {String.fromCharCode(65 + index)}
                </span>

                <span>{option}</span>
              </button>
            )
          })}
        </div>
      </section>

      {answered && (
        <section
          className={`feedback-card ${isCorrect ? "success" : "needs-work"}`}
        >
          <div className="feedback-heading">
            <div className="feedback-icon">{isCorrect ? "✓" : "!"}</div>

            <div>
              <p className="eyebrow">
                {isCorrect ? "NICE WORK" : "LEARNING MOMENT"}
              </p>

              <h3>
                {isCorrect
                  ? "You got it."
                  : `This looks like a ${question.mistakeType}.`}
              </h3>
            </div>
          </div>

          <p className="feedback-explanation">{question.explanation}</p>

          {!isCorrect && (
            <div className="mistake-tag">
              <span>🧬 Mistake DNA</span>
              <strong>{question.mistakeType}</strong>
            </div>
          )}

          <div className="explanation-preview">
            <div>
              <span>👶</span>

              <div>
                <strong>Simple explanation</strong>
                <p>{question.simpleExplanation}</p>
              </div>
            </div>

            <div>
              <span>🌍</span>

              <div>
                <strong>African context</strong>
                <p>{question.localExample}</p>
              </div>
            </div>
          </div>

          {currentQuestion < questions.length - 1 ? (
            <button className="primary-button" onClick={handleNextQuestion}>
              Next question
              <span>→</span>
            </button>
          ) : (
            <div className="session-complete">
              <span>✦</span>
              <div>
                <strong>Practice complete</strong>
                <p>
                  You scored {score} out of {questions.length}. Your learning
                  patterns are ready to be analysed.
                </p>
              </div>
            </div>
          )}
        </section>
      )}
    </main>
  )
}

export default SmartPractice