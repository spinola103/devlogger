import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

export default function Landing() {
  useEffect(() => {
    // Navbar scroll effect
    const navbar = document.getElementById("navbar");
    const onScroll = () => {
      if (window.scrollY > 50) navbar.classList.add("scrolled");
      else navbar.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll);

    // Intersection Observer for fade-in elements
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.13, rootMargin: "0px 0px -50px 0px" }
    );
    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

    // Smooth scrolling for anchor links
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor) =>
      anchor.addEventListener("click", (e) => {
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      })
    );

    // Parallax mousemove effect for hero background
    const hero = document.querySelector(".hero");
    const onMouseMove = (e) => {
      if (!hero) return;
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      if (window.matchMedia("(pointer: fine)").matches) {
        hero.style.setProperty("--mouse-x", `${mouseX * 100}%`);
        hero.style.setProperty("--mouse-y", `${mouseY * 100}%`);
        hero.style.setProperty(
          "background",
          `radial-gradient(ellipse at ${mouseX * 100}% ${mouseY * 100}%, rgba(139,92,246,0.10) 0%, transparent 80%)`
        );
      }
    };
    document.addEventListener("mousemove", onMouseMove);

    // Dark/Light theme toggle
    const themeToggle = document.getElementById("theme-toggle");
    const setTheme = (mode) => {
      document.body.classList.toggle("dark", mode === "dark");
      window.localStorage.setItem("devlogger-theme", mode);
      if (themeToggle) themeToggle.checked = mode === "dark";
    };
    const onThemeToggleChange = () => {
      setTheme(themeToggle.checked ? "dark" : "light");
    };
    if (themeToggle) {
      themeToggle.addEventListener("change", onThemeToggleChange);
    }

    // On load - set theme from localStorage or OS preference
    (() => {
      let saved = window.localStorage.getItem("devlogger-theme");
      if (!saved) {
        saved = window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      }
      setTheme(saved);
    })();

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousemove", onMouseMove);
      if (themeToggle) {
        themeToggle.removeEventListener("change", onThemeToggleChange);
      }
    };
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="navbar" id="navbar">
        <div className="navbar-container">
          <div className="logo">DevLogger</div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#about">About</a>
            <a href="./Login">Login</a>
            <Link to="/Signup">
            <button className="cta-button">Get Started</button>
            </Link>

            <label className="toggle-theme" title="Toggle light/dark mode">
              <input type="checkbox" id="theme-toggle" />
              <span className="theme-slider">
                <span className="toggle-thumb" aria-hidden="true">
                  {/* SVG icons for sun and moon */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="sun-moon-icon"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="6"
                      fill="#FFD76A"
                      className="sun"
                    />
                    <path
                      className="moon"
                      fill="#a7a7fa"
                      d="M19 12.5a7.5 7.5 0 01-7.5 7.5 7.49 7.49 0 01-7.06-5.09A7.48 7.48 0 0012.5 5a7.509 7.509 0 016.5 7.5z"
                    />
                  </svg>
                </span>
              </span>
            </label>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Developer growth, simplified.</h1>
          <p className="hero-subtitle">
            Track your progress. Log daily work. Stay consistent. Visualize
            your journey with powerful analytics that actually matter.
          </p>
          <div className="hero-buttons">
            <a href="./Signup" className="btn-primary">
              Start Your Journey
            </a>
          </div>
          <div className="dashboard-preview">
            <div className="dashboard-card">
              <div className="dashboard-placeholder">
                📊 Dashboard Preview Image
                <br />
                Recommended: 900x500px PNG/JPG
                <br />
                Dark or light theme with graphs & metrics
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="features-header fade-in">
          <h2 className="features-title">Everything you need</h2>
          <p className="features-subtitle">
            Powerful tools designed specifically for developers who want to
            level up their skills and track meaningful progress.
          </p>
        </div>
        <div className="features-grid">
          <div className="feature-card fade-in">
            <span className="feature-icon">📝</span>
            <h3 className="feature-title">Smart Daily Logs</h3>
            <p className="feature-description">
              Capture your learning, breakthroughs, and challenges. Our AI helps
              categorize and analyze your development patterns over time.
            </p>
          </div>
          <div className="feature-card fade-in">
            <span className="feature-icon">📊</span>
            <h3 className="feature-title">Advanced Analytics</h3>
            <p className="feature-description">
              Beautiful visualizations of your productivity, mood patterns,
              technology usage, and skill development trends.
            </p>
          </div>
          <div className="feature-card fade-in">
            <span className="feature-icon">🔥</span>
            <h3 className="feature-title">Streak Tracking</h3>
            <p className="feature-description">
              Build consistency with our gamified streak system. Don't break
              the chain and watch your skills compound over time.
            </p>
          </div>
          <div className="feature-card fade-in">
            <span className="feature-icon">🏷️</span>
            <h3 className="feature-title">Intelligent Tagging</h3>
            <p className="feature-description">
              Auto-classify your entries with smart tags. Track technologies,
              projects, and learning topics effortlessly.
            </p>
          </div>
          <div className="feature-card fade-in">
            <span className="feature-icon">⚡</span>
            <h3 className="feature-title">Quick Capture</h3>
            <p className="feature-description">
              Lightning-fast entry system. Capture thoughts and progress without
              breaking your flow state or development momentum.
            </p>
          </div>
          <div className="feature-card fade-in">
            <span className="feature-icon">🎯</span>
            <h3 className="feature-title">Goal Setting</h3>
            <p className="feature-description">
              Set meaningful development goals and track your progress with milestone
              celebrations and achievement badges.
            </p>
          </div>
        </div>
      </section>

      {/* Bento Grid Section */}
      <section className="bento-section">
        <div className="bento-container">
          <div className="bento-header fade-in">
            <h2 className="bento-title">Built for developers</h2>
          </div>
          <div className="bento-grid">
            <div className="bento-item large fade-in">
              <div className="bento-placeholder">
                📈 Analytics Dashboard
                <br />
                600x400px
                <br />
                Show graphs & metrics
              </div>
            </div>
            <div className="bento-item fade-in">
              <div className="bento-placeholder">🏆 Achievements<br />280x240px<br />Badge collection</div>
            </div>
            <div className="bento-item fade-in">
              <div className="bento-placeholder">
                📱 Mobile App
                <br />
                280x240px
                <br />
                Phone mockup
              </div>
            </div>
            <div className="bento-item wide fade-in">
              <div className="bento-placeholder">
                ⚡ Quick Entry Interface
                <br />
                580x240px
                <br />
                Input form design
              </div>
            </div>
            <div className="bento-item tall fade-in">
              <div className="bento-placeholder">
                🔥 Streak Counter
                <br />
                280x490px
                <br />
                Vertical progress
              </div>
            </div>
            <div className="bento-item fade-in">
              <div className="bento-placeholder">
                🏷️ Smart Tags
                <br />
                280x240px
                <br />
                Tag cloud
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-bottom">
          <p>© 2025 DevLogger. Built by developers, for developers.</p>
        </div>
      </footer>
    </>
  );
}
