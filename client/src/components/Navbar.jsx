import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Menu, X, ArrowUpRight, ArrowRight, Database, Sparkles, MessageSquare } from 'lucide-react';
import { api } from '../services/api';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [backendHealth, setBackendHealth] = useState(null);
  const [bannerOpen, setBannerOpen] = useState(() => {
    try {
      return localStorage.getItem('az-banner-dismissed') !== '1';
    } catch {
      return true;
    }
  });

  const dismissBanner = () => {
    try {
      localStorage.setItem('az-banner-dismissed', '1');
    } catch { /* */ }
    setBannerOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check backend & MongoDB status
    api.getHealth().then((data) => {
      setBackendHealth(data);
    }).catch(() => {
      setBackendHealth({ status: 'offline' });
    });
  }, []);

  return (
    <header className={`navbar-wrapper ${scrolled ? 'navbar-scrolled' : ''}`}>
      {/* ── Sticky Top FOMO Banner ── */}
      {bannerOpen && (
        <aside className="fomo-banner" role="banner">
          <div className="container fomo-banner-inner">
            <span className="fomo-pulse-dot" aria-hidden="true" />
            <p className="fomo-banner-text">
              🔴 Registrations Open: <strong>7-Day Java &amp; Logic Building Bootcamp!</strong>
              <span className="fomo-banner-date"> — Starts Oct 22</span>
            </p>
            <Link to="/events/7-day-java-logic-bootcamp" className="fomo-banner-cta">
              Register Now <ArrowRight size={13} />
            </Link>
            <button className="fomo-banner-close" onClick={dismissBanner} aria-label="Dismiss banner">
              <X size={15} />
            </button>
          </div>
        </aside>
      )}

      <div className="container nav-container">
        {/* Brand Logo & Name */}
        <Link to="/" className="brand-logo">
          <div className="logo-badge-small">
            <img src="/logo.png" alt="AlgoZenith Logo" className="brand-img" />
          </div>
          <div className="brand-text">
            <div className="brand-title">
              Algo<span>Zenith</span>
            </div>
            <div className="brand-subtitle">SRMCEM Chapter</div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <Link to="/events/7-day-java-logic-bootcamp" className="nav-link nav-link-bootcamp">
            <Sparkles size={13} className="nav-bootcamp-sparkle" />
            <span>Bootcamp</span>
          </Link>
          <a href="#about" className="nav-link">About</a>
          <a href="#domains" className="nav-link">Domains</a>
          <a href="#events" className="nav-link">Events</a>
          <a href="#roadmap" className="nav-link">Roadmaps</a>
          <Link to="/resources" className="nav-link">Resources</Link>
          <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
          <a href="#team" className="nav-link">Team</a>
          <a href="#contact" className="nav-link">Join Us</a>
        </nav>

        {/* Right Action & Backend Pill */}
        <div className="nav-actions">
          {backendHealth && (
            <div
              className={`db-indicator ${
                backendHealth.database?.connected ? 'db-connected' : 'db-warning'
              }`}
              title={`API: ${backendHealth.status} | DB: ${backendHealth.database?.status || 'Offline'}`}
            >
              <Database size={13} />
              <span>
                {backendHealth.database?.connected ? 'MongoDB Active' : 'API Running'}
              </span>
            </div>
          )}

          <a href="https://discord.gg/algozenith" target="_blank" rel="noreferrer" className="btn btn-secondary nav-discord-btn" title="Join Discord">
            <MessageSquare size={16} />
            <span>Discord</span>
          </a>

          <a href="#contact" className="btn btn-primary nav-cta">
            <span>Join Club</span>
            <ArrowUpRight size={16} />
          </a>

          {/* Mobile menu button */}
          <button
            className="mobile-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="mobile-drawer">
          <Link to="/events/7-day-java-logic-bootcamp" onClick={() => setIsOpen(false)} className="mobile-link mobile-link-highlight">
            🔥 7-Day Java Bootcamp
          </Link>
          <a href="#about" onClick={() => setIsOpen(false)} className="mobile-link">About</a>
          <a href="#domains" onClick={() => setIsOpen(false)} className="mobile-link">Domains</a>
          <a href="#events" onClick={() => setIsOpen(false)} className="mobile-link">Events</a>
          <a href="#roadmap" onClick={() => setIsOpen(false)} className="mobile-link">Roadmaps</a>
          <Link to="/resources" onClick={() => setIsOpen(false)} className="mobile-link">Resources</Link>
          <Link to="/leaderboard" onClick={() => setIsOpen(false)} className="mobile-link">Leaderboard</Link>
          <a href="#team" onClick={() => setIsOpen(false)} className="mobile-link">Team</a>
          <a href="#contact" onClick={() => setIsOpen(false)} className="mobile-link">Join Us</a>
          <a href="https://discord.gg/algozenith" target="_blank" rel="noreferrer" className="btn btn-secondary mobile-btn" style={{ marginBottom: 10 }}>
            Join Discord Community
          </a>
          <a href="#contact" onClick={() => setIsOpen(false)} className="btn btn-primary mobile-btn">
            Join AlgoZenith SRMCEM
          </a>
        </div>
      )}
    </header>
  );
};
