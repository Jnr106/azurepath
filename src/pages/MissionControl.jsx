function MissionControl({ learningHistory, onNavigate }) {
  const topicNames = [
    "Cloud Concepts",
    "Azure Architecture & Services",
    "Management & Governance",
  ]

  const totalQuestions = learningHistory.length

  const correctAnswers = learningHistory.filter(
    (answer) => answer.correct
  ).length

  const accuracy =
    totalQuestions === 0
      ? 0
      : Math.round((correctAnswers / totalQuestions) * 100)

  const topicResults = topicNames.map((topicName) => {
    const topicAnswers = learningHistory.filter(
      (answer) => answer.topic === topicName
    )

    const topicCorrect = topicAnswers.filter(
      (answer) => answer.correct
    ).length

    const score =
      topicAnswers.length === 0
        ? 0
        : Math.round(
            (topicCorrect / topicAnswers.length) * 100
          )

    let status = "Not started"

    if (topicAnswers.length > 0 && score >= 80) {
      status = "Strong"
    } else if (score >= 60) {
      status = "Improving"
    } else if (topicAnswers.length > 0) {
      status = "Needs Focus"
    }

    return {
      name: topicName,
      score,
      status,
      attempts: topicAnswers.length,
    }
  })

  const attemptedTopics = topicResults.filter(
    (topic) => topic.attempts > 0
  )

  const weakestTopic =
    attemptedTopics.length > 0
      ? [...attemptedTopics].sort(
          (a, b) => a.score - b.score
        )[0]
      : null

  const wrongAnswers = learningHistory.filter(
    (answer) => !answer.correct
  )

  const mistakeCounts = wrongAnswers.reduce(
    (counts, answer) => {
      if (!answer.mistakeType) return counts

      counts[answer.mistakeType] =
        (counts[answer.mistakeType] || 0) + 1

      return counts
    },
    {}
  )

  const mistakeDNA = Object.entries(mistakeCounts)
    .map(([type, count]) => ({
      type,
      count,
      percentage:
        wrongAnswers.length === 0
          ? 0
          : Math.round(
              (count / wrongAnswers.length) * 100
            ),
    }))
    .sort((a, b) => b.count - a.count)

  const dominantMistake = mistakeDNA[0]

  const readiness =
    totalQuestions === 0
      ? 0
      : Math.round(
          accuracy * 0.7 +
            ((attemptedTopics.length / topicNames.length) *
              100) *
              0.3
        )

  const weakAreas = topicResults.filter(
    (topic) =>
      topic.attempts > 0 && topic.score < 70
  ).length

  function getReadinessMessage() {
    if (totalQuestions === 0) {
      return {
        title: "Your mission starts here.",
        description:
          "Complete Smart Practice questions so AzurePath can begin measuring your readiness.",
      }
    }

    if (readiness >= 80) {
      return {
        title: "You're building strong exam readiness.",
        description:
          "Your current results show strong progress. Keep testing weaker areas so your performance stays balanced.",
      }
    }

    if (readiness >= 60) {
      return {
        title: "You're making solid progress.",
        description: weakestTopic
          ? `${weakestTopic.name} is currently your weakest measured domain and should receive more attention.`
          : "Keep practising across the AZ-900 domains.",
      }
    }

    return {
      title: "Your foundation is still developing.",
      description: weakestTopic
        ? `Focus next on ${weakestTopic.name}. Improving this area should strengthen your overall readiness.`
        : "Complete more practice so AzurePath can identify your weakest domain.",
    }
  }

  function getCoachInsight() {
    if (!dominantMistake) {
      return "Complete more practice and AzurePath will identify the learning patterns behind your mistakes."
    }

    const insights = {
      "Service Confusion":
        "You're mostly mixing up services with different purposes. Comparison practice should be your next move.",

      "Scenario Error":
        "Definitions may be making sense, but applying them to scenarios needs more work. Focus on identifying the requirement first.",

      "Concept Gap":
        "Some underlying concepts need reinforcement. Revisit them in simple language before attempting harder scenarios.",

      "Terminology Trap":
        "Exam terminology is creating confusion. Focus on key phrases and connect each term to its practical meaning.",
    }

    return (
      insights[dominantMistake.type] ||
      "Keep practising so AzurePath can refine your learning pattern."
    )
  }

  const readinessMessage = getReadinessMessage()

  return (
    <main className="mission-control">
      <header className="page-header">
        <div>
          <p className="eyebrow">MISSION CONTROL</p>

          <h2>Your AZ-900 learning picture.</h2>

          <p className="header-copy">
            Live progress calculated from your AzurePath
            practice history.
          </p>
        </div>

        <div className="streak">
          <span>◎</span>

          <div>
            <strong>{totalQuestions} answers tracked</strong>
            <small>Stored in your learner profile</small>
          </div>
        </div>
      </header>

      <section className="readiness-card">
        <div className="readiness-score">
          <div
            className="score-circle"
            style={{
              background: `
                radial-gradient(
                  circle,
                  #101528 59%,
                  transparent 61%
                ),
                conic-gradient(
                  #7b87ff 0deg ${
                    readiness * 3.6
                  }deg,
                  #242a3d ${readiness * 3.6}deg 360deg
                )
              `,
            }}
          >
            <span>{readiness}%</span>
            <small>READY</small>
          </div>
        </div>

        <div className="readiness-content">
          <p className="eyebrow">READINESS ESTIMATE</p>

          <h3>{readinessMessage.title}</h3>

          <p>{readinessMessage.description}</p>

          <div className="stats-row">
            <div>
              <strong>{totalQuestions}</strong>
              <span>Questions</span>
            </div>

            <div>
              <strong>{accuracy}%</strong>
              <span>Accuracy</span>
            </div>

            <div>
              <strong>{weakAreas}</strong>
              <span>Weak Areas</span>
            </div>
          </div>
        </div>
      </section>

      <section className="dashboard-grid">
        <div className="panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">PERFORMANCE</p>
              <h3>Your AZ-900 Topics</h3>
            </div>

            <span className="small-badge">
              {attemptedTopics.length}/3 measured
            </span>
          </div>

          <div className="topic-list">
            {topicResults.map((topic) => (
              <div className="topic" key={topic.name}>
                <div className="topic-info">
                  <div>
                    <strong>{topic.name}</strong>

                    <span>
                      {topic.status}
                      {topic.attempts > 0
                        ? ` • ${topic.attempts} attempts`
                        : ""}
                    </span>
                  </div>

                  <strong>
                    {topic.attempts > 0
                      ? `${topic.score}%`
                      : "—"}
                  </strong>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${topic.score}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel mistake-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">LEARNING PATTERN</p>
              <h3>Your Mistake DNA</h3>
            </div>

            <span className="dna-icon">🧬</span>
          </div>

          {mistakeDNA.length > 0 ? (
            <div className="dna-list">
              {mistakeDNA.map((mistake) => (
                <div
                  className="dna-row"
                  key={mistake.type}
                >
                  <span>{mistake.type}</span>
                  <strong>
                    {mistake.percentage}%
                  </strong>
                </div>
              ))}
            </div>
          ) : (
            <div className="dashboard-empty-state">
              No mistakes recorded yet.
            </div>
          )}

          <div className="coach-insight">
            <span>✦</span>

            <div>
              <strong>Coach Insight</strong>
              <p>{getCoachInsight()}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="next-step">
        <div className="next-step-icon">◎</div>

        <div className="next-step-content">
          <p className="eyebrow">
            RECOMMENDED NEXT STEP
          </p>

          <h3>
            {weakestTopic
              ? `Strengthen ${weakestTopic.name}`
              : "Build your learner profile"}
          </h3>

          <p>
            {weakestTopic
              ? `${weakestTopic.name} currently has your lowest measured score at ${weakestTopic.score}%.`
              : "Start Smart Practice so AzurePath can identify what you should study next."}
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() =>
            onNavigate(
              dominantMistake ? "rescue" : "practice"
            )
          }
        >
          {dominantMistake
            ? "Start 5-Minute Rescue"
            : "Start Smart Practice"}

          <span>→</span>
        </button>
      </section>

      <p className="unofficial">
        AzurePath is an unofficial AZ-900 study tool and is not
        affiliated with Microsoft.
      </p>
    </main>
  )
}

export default MissionControl