import React, { useState, useEffect } from 'react';
import { Terminal, Menu, X, ArrowUpRight, Database, CheckCircle2, AlertCircle } from 'lucide-react';
import { api } from '../services/api';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [backendHealth, setBackendHealth] = useState(null);

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
      <div className="container nav-container">
        {/* Brand Logo & Name */}
        <a href="#" className="brand-logo">
          <div className="logo-badge-small">
            <img src="/logo.png" alt="AlgoZenith Logo" className="brand-img" />
          </div>
          <div className="brand-text">
            <div className="brand-title">
              Algo<span>Zenith</span>
            </div>
            <div className="brand-subtitle">SRMCEM Chapter</div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <a href="#about" className="nav-link">About</a>
          <a href="#domains" className="nav-link">Domains</a>
          <a href="#events" className="nav-link">Events</a>
          <a href="#roadmap" className="nav-link">Roadmaps</a>
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
          <a href="#about" onClick={() => setIsOpen(false)} className="mobile-link">About</a>
          <a href="#domains" onClick={() => setIsOpen(false)} className="mobile-link">Domains</a>
          <a href="#events" onClick={() => setIsOpen(false)} className="mobile-link">Events</a>
          <a href="#roadmap" onClick={() => setIsOpen(false)} className="mobile-link">Roadmaps</a>
          <a href="#team" onClick={() => setIsOpen(false)} className="mobile-link">Team</a>
          <a href="#contact" onClick={() => setIsOpen(false)} className="mobile-link">Join Us</a>
          <a href="#contact" onClick={() => setIsOpen(false)} className="btn btn-primary mobile-btn">
            Join AlgoZenith SRMCEM
          </a>
        </div>
      )}
    </header>
  );
};
