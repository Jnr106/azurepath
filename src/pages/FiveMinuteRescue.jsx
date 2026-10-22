import { useState } from "react"

const rescuePlans = {
  "Service Confusion": {
    title: "Separate similar Azure services",
    description:
      "Your recent mistakes suggest that similar Azure services are blending together.",
    concept:
      "For AZ-900 questions, don't choose a service because its name sounds familiar. First identify what the scenario actually needs, then match that requirement to the service.",
    comparison: {
      left: {
        name: "Azure Policy",
        description:
          "Defines and enforces rules for Azure resources.",
      },
      right: {
        name: "Microsoft Entra ID",
        description:
          "Manages identities, authentication, and access.",
      },
    },
    question:
      "A company requires every newly created Azure resource to contain a department tag. Which service is the better choice?",
    options: ["Azure Policy", "Microsoft Entra ID"],
    correctAnswer: "Azure Policy",
    explanation:
      "The requirement is about enforcing a rule on Azure resources, so Azure Policy is the appropriate choice.",
  },

  "Concept Gap": {
    title: "Rebuild the cloud concept",
    description:
      "Your recent answers suggest that one or more underlying cloud concepts need reinforcement.",
    concept:
      "Start with the meaning before memorising terminology. Elasticity means resources can adjust as demand changes.",
    comparison: {
      left: {
        name: "Scaling",
        description:
          "Changes the amount of computing capacity available.",
      },
      right: {
        name: "Elasticity",
        description:
          "Adjusts resources as demand rises and falls.",
      },
    },
    question:
      "An online store automatically adds resources during a traffic spike and removes them after the spike. Which concept is being demonstrated?",
    options: ["Scaling only", "Elasticity"],
    correctAnswer: "Elasticity",
    explanation:
      "The key clue is that resources respond to changing demand and later reduce again. That is elasticity.",
  },

  "Scenario Error": {
    title: "Turn scenarios into requirements",
    description:
      "You appear to know some definitions but need more practice applying them to situations.",
    concept:
      "Before looking at the answer choices, reduce the scenario to one requirement. Ask: what problem is the organisation actually trying to solve?",
    comparison: {
      left: {
        name: "Requirement",
        description:
          "What the organisation needs to achieve.",
      },
      right: {
        name: "Service",
        description:
          "The Azure capability that best satisfies that need.",
      },
    },
    question:
      "An application must continue operating if one datacenter location inside its Azure region fails. What should you consider?",
    options: ["Availability Zones", "Resource Groups"],
    correctAnswer: "Availability Zones",
    explanation:
      "The requirement is resilience against a datacenter-location failure within a region, which points to Availability Zones.",
  },

  "Terminology Trap": {
    title: "Decode the exam language",
    description:
      "Your recent mistakes suggest that similar terms or wording are causing confusion.",
    concept:
      "Look for the key phrase in the scenario. Terms such as upfront investment, consumption, scale out, and geographic region point toward specific AZ-900 concepts.",
    comparison: {
      left: {
        name: "CapEx",
        description:
          "Large upfront investment in assets or infrastructure.",
      },
      right: {
        name: "OpEx",
        description:
          "Ongoing operational spending as services are consumed.",
      },
    },
    question:
      "A business avoids purchasing servers upfront and instead pays for cloud resources as they are consumed. Which financial model best matches this?",
    options: ["CapEx", "OpEx"],
    correctAnswer: "OpEx",
    explanation:
      "Paying for resources as they are consumed is associated with operational expenditure.",
  },
}

function FiveMinuteRescue({ learningHistory }) {
  const [step, setStep] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  const wrongAnswers = learningHistory.filter(
    (answer) => !answer.correct
  )

  const mistakeCounts = wrongAnswers.reduce((counts, answer) => {
    const type = answer.mistakeType

    counts[type] = (counts[type] || 0) + 1

    return counts
  }, {})

  const dominantMistake =
    Object.entries(mistakeCounts).sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0] || null

  const plan = dominantMistake
    ? rescuePlans[dominantMistake]
    : null

  function handleAnswer(option) {
    if (selectedAnswer) return
    setSelectedAnswer(option)
  }

  function restartRescue() {
    setStep(0)
    setSelectedAnswer(null)
  }

  if (!plan) {
    return (
      <main className="rescue-page">
        <header className="rescue-header">
          <div>
            <p className="eyebrow">FOCUSED RECOVERY</p>
            <h2>5-Minute Rescue</h2>
            <p>
              A short revision mission built around the areas where
              you need the most help.
            </p>
          </div>

          <div className="rescue-symbol">⚡</div>
        </header>

        <section className="rescue-empty">
          <div>⚡</div>
          <h3>Your rescue mission isn't ready yet.</h3>
          <p>
            Complete some Smart Practice questions first. Once
            AzurePath detects a mistake pattern, it can build a
            focused rescue session.
          </p>
        </section>
      </main>
    )
  }

  const steps = [
    "Diagnosis",
    "Refresh",
    "Compare",
    "Challenge",
    "Debrief",
  ]

  return (
    <main className="rescue-page">
      <header className="rescue-header">
        <div>
          <p className="eyebrow">FOCUSED RECOVERY</p>
          <h2>5-Minute Rescue</h2>
          <p>
            One weakness. Five focused steps. No unnecessary revision.
          </p>
        </div>

        <div className="rescue-symbol">⚡</div>
      </header>

      <section className="rescue-mission-card">
        <div className="rescue-mission-top">
          <div>
            <p className="eyebrow">TODAY'S RESCUE MISSION</p>
            <h3>{plan.title}</h3>
            <p>{plan.description}</p>
          </div>

          <div className="rescue-time">
            <strong>5</strong>
            <span>MIN</span>
          </div>
        </div>

        <div className="rescue-target">
          <span>🧬</span>
          <div>
            <small>TARGETING YOUR MISTAKE DNA</small>
            <strong>{dominantMistake}</strong>
          </div>
        </div>
      </section>

      <div className="rescue-stepper">
        {steps.map((stepName, index) => (
          <div
            className={`rescue-step ${
              index === step ? "active" : ""
            } ${index < step ? "complete" : ""}`}
            key={stepName}
          >
            <span>
              {index < step ? "✓" : index + 1}
            </span>
            <small>{stepName}</small>
          </div>
        ))}
      </div>

      <section className="rescue-content">
        {step === 0 && (
          <div className="rescue-stage">
            <p className="eyebrow">STEP 01 — DIAGNOSIS</p>

            <h3>Why AzurePath chose this mission</h3>

            <p>
              Your most common mistake pattern is{" "}
              <strong>{dominantMistake}</strong>. Instead of giving
              you random revision, AzurePath is focusing this session
              on that specific learning problem.
            </p>

            <div className="rescue-insight">
              <span>✦</span>
              <p>
                Targeted revision is more useful when it responds to
                what the learner is actually getting wrong.
              </p>
            </div>

            <button
              className="primary-button"
              onClick={() => setStep(1)}
            >
              Start rescue
              <span>→</span>
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="rescue-stage">
            <p className="eyebrow">STEP 02 — QUICK REFRESH</p>

            <h3>Reset the idea.</h3>

            <p>{plan.concept}</p>

            <button
              className="primary-button"
              onClick={() => setStep(2)}
            >
              I understand
              <span>→</span>
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="rescue-stage">
            <p className="eyebrow">STEP 03 — COMPARE</p>

            <h3>Separate the ideas.</h3>

            <div className="rescue-comparison">
              <div>
                <strong>{plan.comparison.left.name}</strong>
                <p>{plan.comparison.left.description}</p>
              </div>

              <span>VS</span>

              <div>
                <strong>{plan.comparison.right.name}</strong>
                <p>{plan.comparison.right.description}</p>
              </div>
            </div>

            <button
              className="primary-button"
              onClick={() => setStep(3)}
            >
              Test me
              <span>→</span>
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="rescue-stage">
            <p className="eyebrow">STEP 04 — CHALLENGE</p>

            <h3>{plan.question}</h3>

            <div className="rescue-options">
              {plan.options.map((option) => {
                let className = "rescue-option"

                if (
                  selectedAnswer &&
                  option === plan.correctAnswer
                ) {
                  className += " correct"
                }

                if (
                  selectedAnswer === option &&
                  option !== plan.correctAnswer
                ) {
                  className += " incorrect"
                }

                return (
                  <button
                    key={option}
                    className={className}
                    onClick={() => handleAnswer(option)}
                  >
                    {option}
                  </button>
                )
              })}
            </div>

            {selectedAnswer && (
              <div className="rescue-feedback">
                <strong>
                  {selectedAnswer === plan.correctAnswer
                    ? "✓ Correct"
                    : "Learning moment"}
                </strong>

                <p>{plan.explanation}</p>

                <button
                  className="primary-button"
                  onClick={() => setStep(4)}
                >
                  Finish rescue
                  <span>→</span>
                </button>
              </div>
            )}
          </div>
        )}

        {step === 4 && (
          <div className="rescue-stage rescue-finish">
            <div className="rescue-complete-icon">✓</div>

            <p className="eyebrow">RESCUE COMPLETE</p>

            <h3>You just targeted your weakest pattern.</h3>

            <p>
              This session focused on{" "}
              <strong>{dominantMistake}</strong> instead of making
              you revise everything again.
            </p>

            <div className="rescue-final-message">
              <span>✦</span>

              <div>
                <strong>Next learning move</strong>
                <p>
                  Return to Smart Practice and see whether this
                  mistake pattern improves.
                </p>
              </div>
            </div>

            <button
              className="secondary-button"
              onClick={restartRescue}
            >
              Repeat rescue
            </button>
          </div>
        )}
      </section>
    </main>
  )
}

export default FiveMinuteRescue