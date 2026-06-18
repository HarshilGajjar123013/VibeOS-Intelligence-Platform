"use client";

import React from "react";
import { 
  Check, 
  MessageSquare, 
  Sparkles 
} from 'lucide-react';
import "./Features.scss";

export default function Features() {
  return (
    <section className="feature">
      <div className="feature__container">
        
        {/* Methodology Header */}
        <div className="feature__header">
          <span className="feature__kicker">Methodology</span>
          <h2 className="feature__main-title">How VibeOS works</h2>
        </div>

        {/* Feature Bento/Grid */}
        <div className="feature__grid">
          
          {/* Card 1: Capture Signals */}
          <div className="feature__card feature__card--capture">
            <div className="feature__visual-area">
              <div className="visual-capture">
                {/* Floating Signal Waves & Bubbles */}
                <div className="signal-bubble bubble-1">
                  <span className="emoji">❤️</span>
                  <span className="label">Kudos</span>
                </div>
                <div className="signal-bubble bubble-2">
                  <span className="emoji">😊</span>
                  <span className="label">Pulse</span>
                </div>
                <div className="signal-bubble bubble-3">
                  <span className="emoji">💬</span>
                  <span className="label">Feedback</span>
                </div>
                
                {/* Receiver central hub */}
                <div className="receiver-node">
                  <div className="ripple ripple-1" />
                  <div className="ripple ripple-2" />
                  <div className="ripple ripple-3" />
                  <div className="node-core">
                    <MessageSquare size={22} className="node-icon" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="feature__content">
              <div className="feature__number">1</div>
              <h3 className="feature__title">Capture Signals</h3>
              <p className="feature__desc">
                Gather feedback, recognition, sentiment, and workplace experiences from across your organization.
              </p>
              <div className="feature__divider" />
              <p className="feature__secondary-desc">
                VibeOS continuously collects the human signals that reveal how people feel, collaborate, and perform.
              </p>
            </div>
          </div>

          {/* Card 2: Generate Intelligence */}
          <div className="feature__card feature__card--intelligence">
            <div className="feature__visual-area">
              <div className="visual-intelligence">
                {/* AI brain / chart widget */}
                <div className="intel-widget">
                  <div className="widget-header">
                    <span className="widget-badge"><Sparkles size={10} /> AI Agent</span>
                    <span className="widget-tag">Burnout Alert</span>
                  </div>
                  <div className="widget-body">
                    <div className="metric-row">
                      <div className="metric-info">
                        <span className="metric-title">Team Friction</span>
                        <span className="metric-subtitle">Marketing Dept</span>
                      </div>
                      <div className="metric-value text-red">High</div>
                    </div>
                    <div className="progress-track">
                      <div className="progress-bar bar-alert" style={{ width: "82%" }} />
                    </div>
                    
                    <div className="metric-row secondary">
                      <div className="metric-info">
                        <span className="metric-title">Cohesion Score</span>
                        <span className="metric-subtitle">Engineering Dept</span>
                      </div>
                      <div className="metric-value text-green">Stable</div>
                    </div>
                    <div className="progress-track">
                      <div className="progress-bar bar-stable" style={{ width: "91%" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="feature__content">
              <div className="feature__number">2</div>
              <h3 className="feature__title">Generate Intelligence</h3>
              <p className="feature__desc">
                Transform scattered feedback into clear organizational insights.
              </p>
              <div className="feature__divider" />
              <p className="feature__secondary-desc">
                Our AI identifies patterns, uncovers hidden risks, and surfaces opportunities leaders would otherwise miss.
              </p>
            </div>
          </div>

          {/* Card 3: Drive Change */}
          <div className="feature__card feature__card--change">
            <div className="feature__visual-area">
              <div className="visual-change">
                {/* Checklist action items */}
                <div className="action-widget">
                  <div className="widget-header">
                    <span className="action-title">Action Plan</span>
                    <span className="action-pct">1 of 2 Complete</span>
                  </div>
                  <div className="action-list">
                    <div className="action-item done">
                      <div className="check-box">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span className="item-text">Run Leadership Workshop</span>
                    </div>
                    <div className="action-item active">
                      <div className="check-box" />
                      <span className="item-text">Deploy Culture Pulse Check</span>
                    </div>
                  </div>
                  {/* Growth sparkline */}
                  <div className="sparkline-container">
                    <div className="sparkline-bar bar-1" />
                    <div className="sparkline-bar bar-2" />
                    <div className="sparkline-bar bar-3" />
                    <div className="sparkline-bar bar-4" />
                    <div className="sparkline-bar bar-5" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="feature__content">
              <div className="feature__number">3</div>
              <h3 className="feature__title">Drive Change</h3>
              <p className="feature__desc">
                Turn intelligence into measurable cultural outcomes.
              </p>
              <div className="feature__divider" />
              <p className="feature__secondary-desc">
                Receive recommendations, track progress, and build stronger teams through informed action.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}