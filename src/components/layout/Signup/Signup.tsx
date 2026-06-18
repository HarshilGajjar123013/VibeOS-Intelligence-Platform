"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import './Signup.scss';

export function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Auth logic
  };

  return (
    <main className="signup-page auth-page">
      <div className="auth-page__layout">
        {/* Left Visual Panel (Teal Panel) */}
        <aside className="auth-page__visual">
          <div className="auth-page__visual-copy">
            {/* VibeOS brand image logo */}
            <div className="auth-page__visual-logo">
              <img
                src="/assets/images/logo2.png"
                alt="VibeOS"
                className="auth-page__visual-logo-img"
              />
            </div>
            
            <h1 className="auth-page__visual-heading">Start Creating Impact Right Away</h1>
            <p className="auth-page__visual-desc">
              From pulse surveys to team collaboration, let's turn your employee ideas into measurable results.
            </p>
          </div>

          {/* Full Dashboard Mockup Visual */}
          <div className="auth-page__dashboard-visual auth-page__dashboard-visual--full">
            <div className="dashboard-fullscreen">
              {/* Sidebar list mock */}
              <div className="sidebar-mock">
                <div className="sidebar-brand">VibeOS</div>
                <div className="sidebar-link active">📊 Dashboard</div>
                <div className="sidebar-link">👥 Teams</div>
                <div className="sidebar-link">📂 Surveys</div>
                <div className="sidebar-link">⚙️ Settings</div>
              </div>

              {/* Main Content Area mock */}
              <div className="main-mock">
                <div className="main-header">
                  <div className="title">Dashboard</div>
                  <div className="user-pill">+ Add widget</div>
                </div>

                {/* Stats widgets */}
                <div className="stats-row">
                  <div className="stat-widget">
                    <span className="lbl">Surveys</span>
                    <strong>8,250</strong>
                  </div>
                  <div className="stat-widget">
                    <span className="lbl">Completed</span>
                    <strong>6.2k</strong>
                  </div>
                  <div className="stat-widget">
                    <span className="lbl">Participation</span>
                    <strong>94%</strong>
                  </div>
                </div>

                {/* Line graph section */}
                <div className="graph-widget">
                  <div className="graph-header">Participation Rate</div>
                  <div className="graph-line-area">
                    <svg viewBox="0 0 100 30" className="sparkline">
                      <path d="M0,25 Q20,10 40,20 T70,5 T100,15" fill="none" stroke="#0ea5e9" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating integration bubbles */}
            <div className="bubble bubble--robinhood">
              <span>Robin hood</span>
            </div>
            
            <div className="bubble bubble--marc">
              <span>Marc Allister</span>
            </div>
          </div>

          <div className="auth-page__visual-footer">
            <span>© VibeOS 2026. All Rights Reserved</span>
          </div>
        </aside>

        {/* Right Form Area (Hardware-riveted white card) */}
        <section className="auth-page__form-section">
          <div className="auth-card">
            {/* Rivets at 4 corners */}
            <span className="rivet top-left" />
            <span className="rivet top-right" />
            <span className="rivet bottom-left" />
            <span className="rivet bottom-right" />

            <div className="auth-card__brand-logo">
              <img
                src="/assets/images/logo2.png"
                alt="VibeOS"
                className="auth-card__logo-img"
              />
            </div>

            <h2 className="auth-card__heading">Create VibeOS Account</h2>
            <p className="auth-card__subheading">
              Drive performance with intelligent insights and effortless teamwork
            </p>

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="auth-form__group">
                <label htmlFor="fullname">Full name</label>
                <input
                  id="fullname"
                  type="text"
                  placeholder="Your Name"
                  autoComplete="name"
                  required
                />
              </div>

              <div className="auth-form__group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="auth-form__group">
                <label htmlFor="password">Password</label>
                <div className="password-wrapper">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create your password"
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(prev => !prev)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="submit-btn">
                Sign Up
              </button>
            </form>

            {/* Social Logins */}
            <div className="social-logins">
              <button className="social-btn">
                {/* Google Icon */}
                <svg className="social-icon" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                </svg>
                <span>Google</span>
              </button>

              <button className="social-btn">
                {/* Github Icon */}
                <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                <span>Github</span>
              </button>
            </div>

            {/* Divider & Toggle */}
            <div className="auth-card__footer">
              <div className="footer-toggle">
                <span>Already have an account?</span>
                <Link href="/signin" className="bold-link">
                  Sign In <span>&gt;</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="auth-page__back">
            <Link href="/" className="back-link">
              ← Back to Home
            </Link>
          </div>

          <p className="auth-page__terms">
            by signing up, you agree to our<br />
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
          </p>
        </section>
      </div>
    </main>
  );
}
