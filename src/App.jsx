import { useEffect, useState } from "react"
import "./App.css"
import Sidebar from "./components/Sidebar"
import MissionControl from "./pages/MissionControl"
import SmartPractice from "./pages/SmartPractice"
import MistakeDNA from "./pages/MistakeDNA"
import ExplainItMyWay from "./pages/ExplainItMyWay"
import TeachItBack from "./pages/TeachItBack"
import FiveMinuteRescue from "./pages/FiveMinuteRescue"

function App() {
  const [activePage, setActivePage] = useState("mission")
  const [learningHistory, setLearningHistory] = useState(() => {
  const savedHistory = localStorage.getItem("azurePathLearningHistory")

  return savedHistory ? JSON.parse(savedHistory) : []
})

useEffect(() => {
  localStorage.setItem(
    "azurePathLearningHistory",
    JSON.stringify(learningHistory)
  )
}, [learningHistory])

  function recordAnswer(result) {
    setLearningHistory((previousHistory) => [
      ...previousHistory,
      result,
    ])
  }

  function resetLearningData() {
  const confirmed = window.confirm(
    "Reset all AzurePath learning history?"
  )

  if (!confirmed) return

  setLearningHistory([])
  localStorage.removeItem("azurePathLearningHistory")
}

  function renderPage() {
    switch (activePage) {
      case "practice":
  return <SmartPractice onAnswer={recordAnswer} />

case "dna":
  return (
    <MistakeDNA learningHistory={learningHistory} />
  )

  case "teach":
  return <TeachItBack />

case "explain":
  return <ExplainItMyWay />

  case "rescue":
  return (
    <FiveMinuteRescue learningHistory={learningHistory} />
  )

case "mission":
default:
  return (
    <MissionControl
      learningHistory={learningHistory}
      onNavigate={setActivePage}
    />
  )
    }
  }

  return (
    <div className="app-shell">
      <Sidebar
  activePage={activePage}
  onNavigate={setActivePage}
  onReset={resetLearningData}
/>

      {renderPage()}
    </div>
  )
}

export default App