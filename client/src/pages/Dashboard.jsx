import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "./Dashboard.css";

// No static data: just prepare for future props/state/API fetching
// These should be set via useEffect or Redux or props/queries in future
const sampleStories = [];          // Replace with backend stories/logs
const achievements = [];           // Replace with backend achievements
const moods = [];                  // Replace with mood history from backend
const tags = [];                   // Replace with tags via backend/API
const aiInsight = "";              // Replace with AI insight string from backend

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Mood cycles or history will come from backend, for now show nothing if not loaded
  // You can implement your own hooks/useEffect for fetching when wiring backend

  // If you want, you can use placeholders here, but for a ready-to-wire blank state, just:
  const currentMood = moods.length > 0 ? moods[moods.length - 1] : null;

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div>
          <h1 className="dashboard-title">
            Hey <span className="dashboard-username">{user?.username || "Developer"}</span> 👋
          </h1>
          <div className="dashboard-slogan">
            Welcome back! Here’s your growth at a glance.
          </div>
        </div>
        <button
          className="add-log-btn"
          onClick={() => navigate("/add-log")}
        >
          ➕ <span>Add Today’s Log</span>
        </button>
      </header>

      <div className="dashboard-grid">
        {/* Mood Ring - dynamic */}
        <div className="glass-card mood-ring">
          <div className="mood-circle">
            <div className="mood-inner">{currentMood ? currentMood.emoji : ""}</div>
          </div>
          <div className="mood-label">{currentMood ? currentMood.label : ""}</div>
          <div className="mood-detail">
            {/* You can use average/last mood here in future */}
          </div>
        </div>

        {/* Recent Dev Stories */}
        <div className="glass-card dev-story">
          <h3 className="section-title">📖 Recent Dev Stories</h3>
          <div className="story-timeline">
            {sampleStories.length === 0 ?
              <div className="story-card" style={{opacity: 0.5}}>No logs yet</div>
              :
              sampleStories.map((story, idx) => (
                <div className="story-card" key={idx}>
                  <div className="story-date">{story.date}</div>
                  <div className="story-title">{story.title}</div>
                  <div className="story-mood">{story.mood}</div>
                  <div className="story-productivity">
                    <div className="productivity-bar" style={{ width: `${story.productivity}%` }}></div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>

        {/* Code Genome */}
        <div className="glass-card code-genome">
          <h3 className="section-title">🧬 Your Code Genome</h3>
          <div className="genome-orbit">
            {tags.length === 0
              ? <div className="gene-tag" style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)", opacity: 0.5 }}>No tags yet</div>
              : tags.map((tag, i) => (
                  <div
                    className="gene-tag"
                    key={tag + i}
                    // For now just stack, adjust orbit positions in future
                  >
                    {tag}
                  </div>
                ))
            }
          </div>
        </div>

        {/* Streak Reactor */}
        <div className="glass-card streak-reactor">
          <h3 className="section-title">🔥 Streak Reactor</h3>
          <div className="reactor-core">
            <div className="streak-count">{/* TODO: Insert actual streak value */}</div>
          </div>
          <div className="streak-label">
            {/* Days of Consistent Logging<br />
            <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>Longest: 28 days</span> */}
          </div>
        </div>

        {/* Productivity Sparkline */}
        <div className="glass-card productivity-panel">
          <h3 className="section-title">📈 Productivity Flow</h3>
          <div className="productivity-chart">
            <div className="chart-line"></div>
          </div>
          <div className="prod-detail">
            {/* 30-day trend • Peak: ... */}
          </div>
        </div>

        {/* Mood Cloud */}
        <div className="glass-card mood-cloud">
          <h3 className="section-title">🌈 Mood Universe</h3>
          {/* Show user's mood over time dynamically */}
          {moods.length === 0
            ? <div style={{ opacity: 0.5 }}>No moods logged yet</div>
            : moods.slice(-6).map((m, idx) => (
                <div className={`mood-bubble ${['large','medium','small','medium','small','large'][idx%6]}`} key={m.emoji+idx}>
                  {m.emoji}
                </div>
              ))
          }
        </div>

        {/* Achievements */}
        <div className="glass-card achievement-capsule">
          <h3 className="section-title">🏆 Recent Achievements</h3>
          <div className="achievements-grid">
            {achievements.length === 0
              ? <div className="achievement-badge" style={{ opacity: 0.5 }}>No achievements yet</div>
              : achievements.map((ach, i) => (
                  <div className="achievement-badge" key={i}>
                    <div className="badge-icon">{ach.icon}</div>
                    <div className="badge-title">{ach.title}</div>
                  </div>
                ))
            }
          </div>
        </div>

        {/* AI Insight Bubble */}
        <div className="glass-card ai-insight">
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div className="ai-avatar">🤖</div>
            <h3 className="section-title">💡 AI Insights</h3>
          </div>
          <div className="insight-content">
            {aiInsight
              ? <p style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>{aiInsight}</p>
              : <p style={{ opacity: 0.5 }}>No insights yet</p>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
