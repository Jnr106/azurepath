import { useState } from "react"
import { explanationTopics } from "../data/explanations"
import { generateExplanation } from "../services/azurepathAI"

const explanationModes = [
  {
    id: "simple",
    icon: "👶",
    name: "Simple",
    description: "Explain it like I'm new to cloud.",
  },
  {
    id: "examReady",
    icon: "🎓",
    name: "Exam Ready",
    description: "Use AZ-900 terminology.",
  },
  {
    id: "africanContext",
    icon: "🌍",
    name: "African Context",
    description: "Make it relatable with a local example.",
  },
  {
    id: "compare",
    icon: "🧠",
    name: "Compare It",
    description: "Separate concepts that are easy to confuse.",
  },
]

function ExplainItMyWay() {
  const [selectedTopicId, setSelectedTopicId] = useState(
    explanationTopics[0].id
  )

  const [selectedMode, setSelectedMode] = useState("simple")

  const selectedTopic = explanationTopics.find(
    (topic) => topic.id === selectedTopicId
  )

  const selectedModeInfo = explanationModes.find(
    (mode) => mode.id === selectedMode
  )

  const [aiExplanation, setAiExplanation] =
  useState("")

  const [isGenerating, setIsGenerating] =
  useState(false)

  const [aiError, setAiError] =
  useState("")

  async function handleGenerateAI() {
  try {
    setIsGenerating(true)
    setAiError("")

    const explanation =
      await generateExplanation(
        selectedTopic.name,
        selectedMode
      )

    setAiExplanation(explanation)
  } catch (error) {
    console.error(error)

    setAiError(
      "AI explanation unavailable. Your built-in explanation is still available."
    )
  } finally {
    setIsGenerating(false)
  }
}

function handleTopicChange(topicId) {
  setSelectedTopicId(topicId)
  setAiExplanation("")
  setAiError("")
}

function handleModeChange(modeId) {
  setSelectedMode(modeId)
  setAiExplanation("")
  setAiError("")
}

  return (
    <main className="explain-page">
      <header className="explain-header">
        <div>
          <p className="eyebrow">ADAPTIVE LEARNING</p>

          <h2>Explain It My Way</h2>

          <p>
            Same Azure concept. Different explanation.
            Choose the way that helps it click.
          </p>
        </div>

        <div className="explain-symbol">✦</div>
      </header>

      <section className="explain-builder">
        <div className="topic-selector">
          <p className="eyebrow">STEP 01</p>

          <h3>What do you want to understand?</h3>

          <div className="topic-buttons">
            {explanationTopics.map((topic) => (
              <button
                key={topic.id}
                className={`topic-button ${
                  selectedTopicId === topic.id ? "active" : ""
                }`}
                onClick={() => handleTopicChange(topic.id)}
              >
                <span>{topic.name}</span>
                <small>{topic.category}</small>
              </button>
            ))}
          </div>
        </div>

        <div className="mode-selector">
          <p className="eyebrow">STEP 02</p>

          <h3>How should AzurePath explain it?</h3>

          <div className="mode-grid">
            {explanationModes.map((mode) => (
              <button
                key={mode.id}
                className={`mode-card ${
                  selectedMode === mode.id ? "active" : ""
                }`}
                onClick={() => handleModeChange(mode.id)}
              >
                <span className="mode-icon">{mode.icon}</span>

                <strong>{mode.name}</strong>

                <small>{mode.description}</small>
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="ai-generate-row">
  <div>
    <span className="ai-status-dot"></span>

    <p>
      Built-in explanations are instant.
      AI can generate a fresh explanation for
      your selected learning style.
    </p>
  </div>

  <button
    className="primary-button"
    onClick={handleGenerateAI}
    disabled={isGenerating}
  >
    {isGenerating
      ? "Generating..."
      : "Generate with AI"}

    {!isGenerating && <span>✦</span>}
  </button>
</div>

      <section className="explanation-result">
        <div className="result-top">
          <div>
            <p className="eyebrow">YOUR EXPLANATION</p>

            <h3>{selectedTopic.name}</h3>
          </div>

          <div className="result-mode">
            <span>{selectedModeInfo.icon}</span>
            {selectedModeInfo.name}
          </div>
        </div>

        <div className="result-body">
          <div className="result-accent">
            {selectedModeInfo.icon}
          </div>

          {aiExplanation && (
  <div className="ai-generated-label">
    <span>✦</span>
    AI-generated explanation
  </div>
)}

{aiError && (
  <div className="ai-error-message">
    {aiError}
  </div>
)}

          <p>
  {aiExplanation ||
    selectedTopic[selectedMode]}
</p>
        </div>

        <div className="result-footer">
          <span>✦</span>

          <p>
            Switch explanation styles above until the concept
            makes sense to you.
          </p>
        </div>
      </section>

      <section className="learning-principle">
        <div>
          <span>◎</span>
        </div>

        <div>
          <p className="eyebrow">AZUREPATH PRINCIPLE</p>

          <h3>Understanding matters more than memorising.</h3>

          <p>
            If one explanation doesn't work, the learner shouldn't
            be forced to keep reading it. AzurePath changes the
            explanation while keeping the underlying concept the same.
          </p>
        </div>
      </section>
    </main>
  )
}

export default ExplainItMyWay