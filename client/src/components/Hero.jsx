import React from 'react';
import { ArrowRight, Code2, Sparkles, Trophy, Users, Terminal, Cpu, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-ambient-glow"></div>
      <div className="container hero-container">
        {/* Left Column: Headlines & Call to Actions */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-pulse"></span>
            <Sparkles size={14} className="badge-icon" />
            <span>Official Student Chapter • SRMCEM Lucknow</span>
          </div>

          <h1 className="hero-title">
            Master <span className="gradient-text">DSA</span>. Crack Hackathons.{' '}
            <span className="hero-highlight">Land Tier-1 Placements.</span>
          </h1>

          <p className="hero-description">
            The official student developer and competitive programming chapter of <strong>SRMCEM</strong>. From your first line of code to your final interview.
          </p>

          <div className="hero-cta-group">
            <Link to="/events/7-day-java-logic-bootcamp" className="btn btn-primary">
              <span>Register for Day 1 Bootcamp</span>
              <ArrowRight size={18} />
            </Link>
            <Link to="/resources" className="btn btn-secondary">
              <Code2 size={18} />
              <span>Explore Club Resources</span>
            </Link>
          </div>

          {/* Social Proof Stats */}
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Community Coders</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">120+</div>
              <div className="stat-label">Bootcamp Registrations</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">35+</div>
              <div className="stat-label">Weekly Contests</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">15+</div>
              <div className="stat-label">Hackathon Wins</div>
            </div>
          </div>
        </div>

        {/* Right Column: High-tech Visual Card with Logo & CP Terminal */}
        <div className="hero-visual">
          <div className="visual-card">
            {/* Top Bar simulating a sleek code editor */}
            <div className="visual-card-header">
              <div className="mac-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="visual-tab">
                <Terminal size={14} />
                <span>algozenith_srmcem.cpp</span>
              </div>
              <div className="live-status">
                <span className="status-ping"></span>
                <span>Active</span>
              </div>
            </div>

            {/* Logo Emblem Display */}
            <div className="visual-logo-container">
              <div className="logo-halo"></div>
              <img
                src="/logo.png"
                alt="AlgoZenith SRMCEM"
                className="visual-logo-img animate-float"
              />
              <div className="visual-badge-overlay">
                <Trophy size={16} className="trophy-icon" />
                <span>ICPC • Codeforces • LeetCode</span>
              </div>
            </div>

            {/* Code Snippet Box */}
            <div className="code-snippet-box">
              <pre>
                <code>
                  <span className="c-keyword">#include</span> &lt;iostream&gt;{'\n'}
                  <span className="c-keyword">using namespace</span> std;{'\n\n'}
                  <span className="c-comment">// AlgoZenith SRMCEM Core Principle</span>{'\n'}
                  <span className="c-type">void</span> <span className="c-func">solve</span>() &#123;{'\n'}
                  {'  '}<span className="c-var">string</span> passion = <span className="c-str">"DSA + Competitive Coding"</span>;{'\n'}
                  {'  '}<span className="c-keyword">while</span> (opportunity) &#123;{'\n'}
                  {'    '}keepLearning();{'\n'}
                  {'    '}climbLeaderboard();{'\n'}
                  {'  '}&#125;{'\n'}
                  &#125;
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
