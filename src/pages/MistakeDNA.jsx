const mistakeInfo = {
  "Concept Gap": {
    icon: "🧩",
    description:
      "The underlying Azure concept needs a little more reinforcement.",
    advice:
      "Review the concept in simple terms before attempting more questions.",
  },

  "Service Confusion": {
    icon: "🔀",
    description:
      "You're mixing up Azure services that have different purposes.",
    advice:
      "Use side-by-side comparisons to separate similar Azure services.",
  },

  "Scenario Error": {
    icon: "🎯",
    description:
      "You may know the definition but struggled to apply it to a scenario.",
    advice:
      "Practise scenario questions and identify the requirement before choosing a service.",
  },

  "Terminology Trap": {
    icon: "📖",
    description:
      "Azure terminology or exam wording caused confusion.",
    advice:
      "Focus on key words and connect each term to a simple real-world meaning.",
  },
}

function MistakeDNA({ learningHistory }) {
  const wrongAnswers = learningHistory.filter(
    (answer) => !answer.correct
  )

  const mistakeCounts = wrongAnswers.reduce((counts, answer) => {
    const type = answer.mistakeType

    counts[type] = (counts[type] || 0) + 1

    return counts
  }, {})

  const mistakeResults = Object.entries(mistakeCounts)
    .map(([type, count]) => ({
      type,
      count,
      percentage: Math.round(
        (count / wrongAnswers.length) * 100
      ),
    }))
    .sort((a, b) => b.count - a.count)

  const dominantMistake = mistakeResults[0]

  return (
    <main className="dna-page">
      <header className="dna-page-header">
        <div>
          <p className="eyebrow">LEARNING INTELLIGENCE</p>
          <h2>Your Mistake DNA</h2>
          <p>
            Your score tells you how you performed. Your Mistake DNA
            helps explain why.
          </p>
        </div>

        <div className="dna-symbol">🧬</div>
      </header>

      {wrongAnswers.length === 0 ? (
        <section className="dna-empty">
          <div className="empty-icon">◎</div>

          <h3>No learning pattern yet.</h3>

          <p>
            Complete Smart Practice and AzurePath will analyse the
            mistakes you make.
          </p>
        </section>
      ) : (
        <>
          <section className="dna-summary">
            <div className="dna-summary-number">
              <strong>{wrongAnswers.length}</strong>
              <span>MISTAKES ANALYSED</span>
            </div>

            <div>
              <p className="eyebrow">DOMINANT PATTERN</p>

              <h3>
                {mistakeInfo[dominantMistake.type]?.icon}{" "}
                {dominantMistake.type}
              </h3>

              <p>
                {mistakeInfo[dominantMistake.type]?.description}
              </p>
            </div>
          </section>

          <section className="dna-layout">
            <div className="panel">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">BREAKDOWN</p>
                  <h3>How your mistakes are distributed</h3>
                </div>
              </div>

              <div className="dna-breakdown">
                {mistakeResults.map((mistake) => (
                  <div
                    className="dna-breakdown-item"
                    key={mistake.type}
                  >
                    <div className="dna-breakdown-heading">
                      <div>
                        <span>
                          {mistakeInfo[mistake.type]?.icon}
                        </span>

                        <strong>{mistake.type}</strong>
                      </div>

                      <strong>{mistake.percentage}%</strong>
                    </div>

                    <div className="progress-track">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${mistake.percentage}%`,
                        }}
                      ></div>
                    </div>

                    <small>
                      {mistake.count}{" "}
                      {mistake.count === 1
                        ? "mistake"
                        : "mistakes"}
                    </small>
                  </div>
                ))}
              </div>
            </div>

            <div className="dna-coach-card">
              <div className="coach-label">
                <span>✦</span>
                AZUREPATH COACH
              </div>

              <h3>
                Here's what I would work on next.
              </h3>

              <p>
                Your strongest mistake pattern is{" "}
                <strong>{dominantMistake.type}</strong>.
              </p>

              <div className="coach-recommendation">
                <span>→</span>

                <p>
                  {mistakeInfo[dominantMistake.type]?.advice}
                </p>
              </div>

              <div className="coach-note">
                This recommendation changes as your practice
                history changes.
              </div>
            </div>
          </section>

          <section className="dna-explanation">
            <p className="eyebrow">WHY THIS MATTERS</p>

            <h3>A score only shows the result.</h3>

            <p>
              Two learners can both score 60%, but for completely
              different reasons. One might confuse similar services
              while another struggles to apply concepts to scenarios.
              AzurePath identifies those patterns so revision can be
              more focused.
            </p>
          </section>
        </>
      )}
    </main>
  )
}

export default MistakeDNA