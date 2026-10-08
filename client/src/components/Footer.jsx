import React from 'react';
import { MessageSquare, Terminal, Heart, Code2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand-col">
            <div className="brand-logo footer-logo">
              <div className="logo-badge-small">
                <img src="/logo.png" alt="AlgoZenith Logo" className="brand-img" />
              </div>
              <div className="brand-text">
                <div className="brand-title">
                  Algo<span>Zenith</span>
                </div>
                <div className="brand-subtitle">SRMCEM Chapter</div>
              </div>
            </div>
            <p className="footer-tagline">
              The student-driven tech community at Shri Ramswaroop Memorial College of Engineering and Management. Igniting passion for algorithms, competitive coding, and scalable software systems.
            </p>
            <div className="footer-social-links">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="GitHub">
                <GithubIcon size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="LinkedIn">
                <LinkedinIcon size={18} />
              </a>
              <a href="https://discord.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="Discord">
                <MessageSquare size={18} />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="footer-nav-col">
            <h4 className="footer-heading">Navigation</h4>
            <ul className="footer-links-list">
              <li><a href="#about">About Chapter</a></li>
              <li><a href="#domains">Club Domains</a></li>
              <li><a href="#events">Upcoming Contests</a></li>
              <li><a href="#roadmap">CP Roadmap</a></li>
              <li><a href="#team">Core Council</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="footer-nav-col">
            <h4 className="footer-heading">Coding Portals</h4>
            <ul className="footer-links-list">
              <li><a href="https://codeforces.com" target="_blank" rel="noreferrer">Codeforces Contests</a></li>
              <li><a href="https://leetcode.com" target="_blank" rel="noreferrer">LeetCode Practice</a></li>
              <li><a href="https://atcoder.jp" target="_blank" rel="noreferrer">AtCoder Rounds</a></li>
              <li><a href="https://cses.fi/problemset/" target="_blank" rel="noreferrer">CSES Problem Set</a></li>
            </ul>
          </div>

          {/* Campus Details */}
          <div className="footer-nav-col">
            <h4 className="footer-heading">Campus Node</h4>
            <p className="footer-campus-text">
              <strong>SRMCEM Lucknow</strong><br />
              Department of Computer Science & Engineering<br />
              Lucknow-Deva Road, Uttar Pradesh, India
            </p>
            <div className="tech-stack-tag">
              <Code2 size={14} />
              <span>Built with React + Vite + Node + MongoDB</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copy">
            © {new Date().getFullYear()} AlgoZenith SRMCEM Chapter. All rights reserved.
          </div>
          <div className="footer-credit">
            Developed with dedication for the coders of SRMCEM.
          </div>
        </div>
      </div>
    </footer>
  );
};
