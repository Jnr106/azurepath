const navItems = [
  { icon: "⌂", label: "Mission Control", id: "mission" },
  { icon: "◎", label: "Smart Practice", id: "practice" },
  { icon: "◈", label: "Mistake DNA", id: "dna" },
  { icon: "◉", label: "Teach It Back", id: "teach" },
  { icon: "✦", label: "Explain It My Way", id: "explain" },
  { icon: "⚡", label: "5-Minute Rescue", id: "rescue" },
]

function Sidebar({ activePage, onNavigate, onReset }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">A</div>

        <div>
          <h1>AzurePath</h1>
          <span>AZ-900 Mission Control</span>
        </div>
      </div>

      <nav className="nav-menu">
        {navItems.map((item) => (
          <button
            className={`nav-item ${
              activePage === item.id ? "active" : ""
            }`}
            key={item.id}
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

<button
  className="reset-progress"
  onClick={onReset}
>
  <span>↻</span>
  Reset learning data
</button>

<div className="sidebar-footer"></div>

      <div className="sidebar-footer">
        <div className="learner-avatar">AZ</div>

        <div>
          <strong>AZ-900 Learner</strong>
          <span>Keep building your cloud skills</span>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar