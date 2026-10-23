import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar, Clock, MapPin, Tag, ExternalLink, RefreshCw,
  Filter, Sparkles, ArrowRight, Award, Trophy, Users, Zap
} from 'lucide-react';
import { api } from '../services/api';

/* Live countdown hook for the active bootcamp */
function useCountdown(targetDate) {
  const calc = () => {
    const diff = new Date(targetDate) - Date.now();
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return t;
}

const BOOTCAMP_DATE = new Date(Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 60 * 14);

export const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [sourceInfo, setSourceInfo] = useState('');
  const cd = useCountdown(BOOTCAMP_DATE);

  const categories = ['All', 'Contest', 'Workshop', 'Bootcamp', 'Meetup'];

  const loadEvents = async (category = activeCategory) => {
    setLoading(true);
    try {
      const params = category !== 'All' ? { category } : {};
      const response = await api.getEvents(params);
      if (response && response.data) {
        setEvents(response.data);
        setSourceInfo(response.source === 'database' ? 'MongoDB' : 'Live API (Seed Data)');
      } else {
        setEvents([]);
      }
    } catch (err) {
      console.error('Error loading events:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents(activeCategory);
  }, [activeCategory]);

  const formatDate = (dateString) => {
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <section id="events" className="section events-section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Upcoming &amp; Past Engagements</div>
          <h2 className="section-title">
            Club Events &amp; <span className="gradient-text">Coding Sprints</span>
          </h2>
          <p className="section-desc">
            Participate in our weekly hack sessions, competitive programming leagues, and flagship bootcamps hosted at SRMCEM.
          </p>
        </div>

        {/* ── Wireframe Section 5: Active Event Spotlight Card ── */}
        <div className="card bootcamp-spotlight-card">
          <div className="spotlight-left">
            <div className="spotlight-badge-row">
              <span className="badge badge-cyan">
                <Sparkles size={12} /> Active Spotlight
              </span>
              <span className="event-status-pill status-upcoming">
                🔴 Registrations Live
              </span>
            </div>
            <h3 className="spotlight-title">
              7-Day Java &amp; Logic Building <span className="gradient-text">Bootcamp</span>
            </h3>
            <p className="spotlight-desc">
              Master Java fundamentals, problem-solving intuition, and algorithmic logic from scratch. Led by senior CP rankholders at SRMCEM. Ideal for 1st &amp; 2nd Year Juniors.
            </p>
            <div className="event-meta spotlight-meta">
              <div className="meta-row">
                <Calendar size={15} className="meta-icon" />
                <span>Oct 22 – Oct 28, 2026 (Daily 6:00 PM)</span>
              </div>
              <div className="meta-row">
                <MapPin size={15} className="meta-icon" />
                <span>Google Meet + Computer Lab 2 (Offline Grand Finale)</span>
              </div>
              <div className="meta-row">
                <Award size={15} className="meta-icon" />
                <span>100% Free · Certificate of Completion · AlgoZenith Swag &amp; Prizes</span>
              </div>
            </div>
            <div className="spotlight-actions">
              <Link to="/events/7-day-java-logic-bootcamp" className="btn btn-primary">
                <span>View Full Curriculum &amp; Register</span>
                <ArrowRight size={16} />
              </Link>
              <a href="#contact" className="btn btn-secondary">
                <span>Quick Inquiry</span>
              </a>
            </div>
          </div>

          <div className="spotlight-right">
            <div className="countdown-box">
              <span className="countdown-title">Registrations Close In</span>
              <div className="spotlight-countdown">
                <div className="sc-unit"><span className="sc-num">{String(cd.d).padStart(2,'0')}</span><span className="sc-label">Days</span></div>
                <div className="sc-unit"><span className="sc-num">{String(cd.h).padStart(2,'0')}</span><span className="sc-label">Hours</span></div>
                <div className="sc-unit"><span className="sc-num">{String(cd.m).padStart(2,'0')}</span><span className="sc-label">Mins</span></div>
                <div className="sc-unit"><span className="sc-num">{String(cd.s).padStart(2,'0')}</span><span className="sc-label">Secs</span></div>
              </div>
              <div className="spotlight-tags">
                <span className="event-tag-pill">#Java</span>
                <span className="event-tag-pill">#DSA</span>
                <span className="event-tag-pill">#Beginners</span>
                <span className="event-tag-pill">#Free</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Category Filter Pills ── */}
        <div className="event-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'filter-active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Content State */}
        {loading ? (
          <div className="events-loading">
            <RefreshCw size={24} className="spin-icon" />
            <span>Fetching events from backend...</span>
          </div>
        ) : events.length === 0 ? (
          <div className="events-empty card">
            <p>No events found for this category at the moment. Stay tuned!</p>
          </div>
        ) : (
          <div className="grid-3 event-grid">
            {events.map((event) => (
              <div key={event._id || event.title} className="card event-card">
                <div className="event-card-header">
                  <span className={`badge ${event.category === 'Contest' ? 'badge-blue' : event.category === 'Workshop' ? 'badge-purple' : 'badge-cyan'}`}>
                    {event.category}
                  </span>
                  <span className={`event-status-pill ${event.status === 'upcoming' ? 'status-upcoming' : 'status-past'}`}>
                    {event.status === 'upcoming' ? '● Upcoming' : 'Completed'}
                  </span>
                </div>

                <h3 className="event-title">{event.title}</h3>
                <p className="event-desc">{event.description}</p>

                <div className="event-meta">
                  <div className="meta-row">
                    <Calendar size={15} className="meta-icon" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="meta-row">
                    <Clock size={15} className="meta-icon" />
                    <span>{event.time}</span>
                  </div>
                  <div className="meta-row">
                    <MapPin size={15} className="meta-icon" />
                    <span>{event.venue}</span>
                  </div>
                </div>

                {/* Event Tags */}
                {event.tags && event.tags.length > 0 && (
                  <div className="event-tags-list">
                    {event.tags.map((t, idx) => (
                      <span key={idx} className="event-tag-pill">
                        #{t}
                      </span>
                    ))}
                  </div>
                )}

                <div className="event-card-footer">
                  <Link
                    to={`/events/${event.slug || event._id}`}
                    className="btn btn-secondary btn-full"
                  >
                    <span>{event.status === 'upcoming' ? 'View Details & RSVP' : 'View Summary'}</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Source connection pill */}
        {sourceInfo && (
          <div className="events-source-footer">
            <span className="source-dot"></span>
            <span>Live Data Source: {sourceInfo}</span>
          </div>
        )}
      </div>
    </section>
  );
};
