import { useState } from "react"
import { teachTopics } from "../data/teachTopics"
import { evaluateTeachBack } from "../services/azurepathAI"

function TeachItBack() {
  const [selectedTopicId, setSelectedTopicId] = useState(
    teachTopics[0].id
  )

  const [answer, setAnswer] = useState("")
  const [result, setResult] = useState(null)

  const [aiEvaluation, setAiEvaluation] =
    useState(null)

  const [isEvaluating, setIsEvaluating] =
    useState(false)

  const [aiError, setAiError] = useState("")

  const selectedTopic = teachTopics.find(
    (topic) => topic.id === selectedTopicId
  )

  function handleTopicChange(event) {
    setSelectedTopicId(event.target.value)
    setAnswer("")
    setResult(null)
    setAiEvaluation(null)
    setAiError("")
  }

  function evaluateExplanation() {
    const cleanedAnswer = answer.toLowerCase().trim()

    setAiEvaluation(null)
    setAiError("")

    if (cleanedAnswer.length < 20) {
      setResult({
        level: "too-short",
        score: 0,
        matchedIdeas: [],
        missingIdeas: selectedTopic.keyIdeas,
        message:
          "Give me a little more to work with. Try explaining the concept as if you were teaching a classmate.",
      })

      return
    }

    const matchedGroups = selectedTopic.keywords.map((group) =>
      group.some((keyword) =>
        cleanedAnswer.includes(keyword)
      )
    )

    const matchedIdeas = selectedTopic.keyIdeas.filter(
      (_, index) => matchedGroups[index]
    )

    const missingIdeas = selectedTopic.keyIdeas.filter(
      (_, index) => !matchedGroups[index]
    )

    const score = Math.round(
      (matchedIdeas.length /
        selectedTopic.keyIdeas.length) *
        100
    )

    let level = "needs-work"
    let message =
      "You're on the right path, but some important parts of the concept are still missing."

    if (score >= 75) {
      level = "strong"
      message =
        "Strong explanation. You've included most of the ideas that matter for this concept."
    } else if (score >= 50) {
      level = "developing"
      message =
        "Good start. You understand part of the concept, but your explanation can be more complete."
    }

    setResult({
      level,
      score,
      matchedIdeas,
      missingIdeas,
      message,
    })
  }

  async function handleAIEvaluation() {
    if (answer.trim().length < 20) {
      setAiError(
        "Explain the concept in a little more detail before asking AzurePath AI to evaluate it."
      )

      return
    }

    try {
      setIsEvaluating(true)
      setAiError("")
      setAiEvaluation(null)

      const evaluation =
        await evaluateTeachBack({
          topic: selectedTopic.name,
          learnerAnswer: answer,
          keyIdeas: selectedTopic.keyIdeas,
        })

      setAiEvaluation(evaluation)
    } catch (error) {
      console.error(error)

      setAiError(
        "AI evaluation is unavailable right now. Your built-in concept check still works."
      )
    } finally {
      setIsEvaluating(false)
    }
  }

  function resetExplanation() {
    setAnswer("")
    setResult(null)
    setAiEvaluation(null)
    setAiError("")
  }

  return (
    <main className="teach-page">
      <header className="teach-header">
        <div>
          <p className="eyebrow">ACTIVE RECALL</p>

          <h2>Teach It Back</h2>

          <p>
            If you can explain it clearly, you probably
            understand it. Teach AzurePath the concept in
            your own words.
          </p>
        </div>

        <div className="teach-symbol">◉</div>
      </header>

      <section className="teach-workspace">
        <div className="teach-input-panel">
          <div className="teach-step">
            <p className="eyebrow">STEP 01</p>

            <h3>Choose a concept</h3>

            <select
              className="teach-select"
              value={selectedTopicId}
              onChange={handleTopicChange}
            >
              {teachTopics.map((topic) => (
                <option
                  key={topic.id}
                  value={topic.id}
                >
                  {topic.name}
                </option>
              ))}
            </select>

            <span className="teach-category">
              {selectedTopic.category}
            </span>
          </div>

          <div className="teach-prompt">
            <span>?</span>

            <div>
              <strong>Your challenge</strong>
              <p>{selectedTopic.prompt}</p>
            </div>
          </div>

          <div className="teach-answer">
            <div className="answer-heading">
              <label htmlFor="teach-answer">
                Explain it in your own words
              </label>

              <span>
                {answer.length} characters
              </span>
            </div>

            <textarea
              id="teach-answer"
              value={answer}
              onChange={(event) => {
                setAnswer(event.target.value)
                setAiEvaluation(null)
                setAiError("")
              }}
              placeholder="Start teaching AzurePath..."
              rows="8"
            ></textarea>
          </div>

          <div className="teach-action-row">
            <button
              className="primary-button teach-submit"
              onClick={evaluateExplanation}
              disabled={!answer.trim()}
            >
              Concept check
              <span>→</span>
            </button>

            <button
              className="secondary-button teach-ai-button"
              onClick={handleAIEvaluation}
              disabled={
                !answer.trim() || isEvaluating
              }
            >
              {isEvaluating
                ? "Analysing..."
                : "Evaluate with AI"}

              {!isEvaluating && <span>✦</span>}
            </button>
          </div>

          {aiError && (
            <div className="ai-error-message">
              {aiError}
            </div>
          )}
        </div>

        <aside className="teach-guide">
          <p className="eyebrow">
            BEFORE YOU SUBMIT
          </p>

          <h3>Don't chase perfect wording.</h3>

          <p>
            Explain the concept naturally.
            AzurePath is looking for important
            ideas, not a memorised definition.
          </p>

          <div className="guide-items">
            <div>
              <span>01</span>
              <p>
                Explain what the concept means.
              </p>
            </div>

            <div>
              <span>02</span>
              <p>Describe why it matters.</p>
            </div>

            <div>
              <span>03</span>
              <p>Use an example if it helps.</p>
            </div>
          </div>
        </aside>
      </section>

      {result && (
        <section
          className={`teach-result ${result.level}`}
        >
          <div className="teach-result-top">
            <div>
              <p className="eyebrow">
                BUILT-IN CONCEPT CHECK
              </p>

              <h3>{result.message}</h3>
            </div>

            <div className="understanding-score">
              <strong>{result.score}%</strong>
              <span>CONCEPT COVERAGE</span>
            </div>
          </div>

          {result.level !== "too-short" && (
            <div className="idea-analysis">
              <div className="idea-column understood">
                <div className="idea-heading">
                  <span>✓</span>
                  <strong>
                    Ideas you covered
                  </strong>
                </div>

                {result.matchedIdeas.length >
                0 ? (
                  result.matchedIdeas.map(
                    (idea) => (
                      <div
                        className="idea-item"
                        key={idea}
                      >
                        <span>✓</span>
                        {idea}
                      </div>
                    )
                  )
                ) : (
                  <p>
                    No key ideas detected yet.
                  </p>
                )}
              </div>

              <div className="idea-column missing">
                <div className="idea-heading">
                  <span>◎</span>
                  <strong>
                    Ideas to strengthen
                  </strong>
                </div>

                {result.missingIdeas.length >
                0 ? (
                  result.missingIdeas.map(
                    (idea) => (
                      <div
                        className="idea-item"
                        key={idea}
                      >
                        <span>→</span>
                        {idea}
                      </div>
                    )
                  )
                ) : (
                  <p>
                    You covered all the key ideas
                    we're checking.
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="teach-result-footer">
            <p>
              This check uses transparent concept
              matching so you can see which expected
              ideas were detected.
            </p>

            <button
              className="secondary-button"
              onClick={resetExplanation}
            >
              Try again
            </button>
          </div>
        </section>
      )}

      {aiEvaluation && (
        <section className="ai-teach-result">
          <div className="ai-teach-header">
            <div>
              <p className="eyebrow">
                AI SEMANTIC EVALUATION
              </p>

              <h3>
                Understanding:{" "}
                {aiEvaluation.level}
              </h3>
            </div>

            <div className="ai-score">
              {aiEvaluation.score}%
            </div>
          </div>

          <div className="ai-feedback-grid">
            <div className="ai-feedback-card">
              <span>✓ UNDERSTOOD</span>

              <p>
                {aiEvaluation.understood}
              </p>
            </div>

            <div className="ai-feedback-card">
              <span>→ MISSING</span>

              <p>{aiEvaluation.missing}</p>
            </div>

            <div className="ai-feedback-card">
              <span>
                ! MISCONCEPTION CHECK
              </span>

              <p>
                {aiEvaluation.misconception}
              </p>
            </div>

            <div className="ai-feedback-card">
              <span>✦ COACH FEEDBACK</span>

              <p>{aiEvaluation.feedback}</p>
            </div>
          </div>

          <div className="teach-result-footer">
            <p>
              AI evaluates the meaning of your
              explanation, not just whether you used
              specific keywords.
            </p>

            <button
              className="secondary-button"
              onClick={resetExplanation}
            >
              Teach it again
            </button>
          </div>
        </section>
      )}
    </main>
  )
}

export default TeachItBack