import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar, Clock, MapPin, ArrowRight, RefreshCw,
  ChevronLeft, Filter, Zap, Trophy, Code2, Cpu, Users
} from 'lucide-react';
import { api } from '../services/api';

/* ── Category colour mapping ── */
const CATEGORY_META = {
  Contest:  { color: '#2563eb', bg: 'rgba(37,99,235,0.12)',  icon: <Trophy   size={13} /> },
  Workshop: { color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)', icon: <Code2    size={13} /> },
  Bootcamp: { color: '#06b6d4', bg: 'rgba(6,182,212,0.12)',  icon: <Zap      size={13} /> },
  Hackathon:{ color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', icon: <Cpu      size={13} /> },
  Webinar:  { color: '#10b981', bg: 'rgba(16,185,129,0.12)', icon: <Users    size={13} /> },
  Meetup:   { color: '#f43f5e', bg: 'rgba(244,63,94,0.12)',  icon: <Users    size={13} /> },
};

/* ── Countdown hook ── */
function useCountdown(targetDate) {
  const calc = () => {
    const diff = new Date(targetDate) - Date.now();
    if (diff <= 0) return null;
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
  });
  return t;
}

/* ── Countdown display ── */
function Countdown({ date }) {
  const t = useCountdown(date);
  if (!t) return <span className="ep-countdown-done">Event started</span>;
  return (
    <div className="ep-countdown">
      {[['d', 'Days'], ['h', 'Hrs'], ['m', 'Min'], ['s', 'Sec']].map(([k, label]) => (
        <div className="ep-countdown-unit" key={k}>
          <span className="ep-countdown-num">{String(t[k]).padStart(2, '0')}</span>
          <span className="ep-countdown-label">{label}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Single event card ── */
function EventCard({ event }) {
  const meta   = CATEGORY_META[event.category] || CATEGORY_META.Workshop;
  const slug   = event.slug || event._id;
  const isLive = event.status === 'ongoing';
  const isUp   = event.status === 'upcoming';

  const formattedDate = (() => {
    try {
      return new Date(event.date).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric',
      });
    } catch { return event.date; }
  })();

  return (
    <article className="ep-card">
      {/* Header band */}
      <div className="ep-card-top">
        <span className="ep-cat-pill" style={{ color: meta.color, background: meta.bg }}>
          {meta.icon} {event.category}
        </span>
        <span className={`ep-status-pill ${isLive ? 'ep-live' : isUp ? 'ep-upcoming' : 'ep-past'}`}>
          {isLive ? '🔴 Live' : isUp ? '⚡ Upcoming' : '✓ Completed'}
        </span>
      </div>

      <h3 className="ep-card-title">{event.title}</h3>
      <p  className="ep-card-desc">{event.description}</p>

      {/* Meta rows */}
      <div className="ep-meta">
        <div className="ep-meta-row"><Calendar size={14} /><span>{formattedDate}</span></div>
        <div className="ep-meta-row"><Clock    size={14} /><span>{event.time}</span></div>
        <div className="ep-meta-row"><MapPin   size={14} /><span>{event.venue}</span></div>
      </div>

      {/* Countdown — only for upcoming */}
      {isUp && (
        <div className="ep-countdown-wrap">
          <Countdown date={event.date} />
        </div>
      )}

      {/* Tags */}
      {event.tags?.length > 0 && (
        <div className="ep-tags">
          {event.tags.slice(0, 4).map(t => (
            <span className="ep-tag" key={t}>#{t}</span>
          ))}
        </div>
      )}

      {/* Footer CTA */}
      <div className="ep-card-footer">
        <Link to={`/events/${slug}`} className="ep-detail-btn">
          {event.category === 'Bootcamp'
            ? 'View Bootcamp' : isUp
            ? 'View & Register' : 'View Details'}
          <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
}

/* ── Main page ── */
const CATEGORIES = ['All', 'Contest', 'Workshop', 'Bootcamp', 'Hackathon', 'Meetup'];

export default function EventsPage() {
  const [events,       setEvents]       = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [active,       setActive]       = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const loadEvents = async (cat, st) => {
    setLoading(true);
    try {
      const params = {};
      if (cat !== 'All') params.category = cat;
      if (st  !== 'All') params.status   = st;
      const res = await api.getEvents(params);
      setEvents(res?.data ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents(active, statusFilter);
  }, [active, statusFilter]);

  const upcoming = events.filter(e => e.status === 'upcoming' || e.status === 'ongoing');
  const past     = events.filter(e => e.status === 'completed');

  return (
    <div className="ep-root">

      {/* Page hero */}
      <section className="ep-hero">
        <Link to="/" className="ep-back-link">
          <ChevronLeft size={16} /> Back to home
        </Link>
        <div className="ep-hero-inner">
          <span className="ep-eyebrow"><span className="ep-eyebrow-dot" /> Mark your calendar</span>
          <h1 className="ep-h1">
            Club Events &amp; <em>Coding Sprints</em>
          </h1>
          <p className="ep-hero-desc">
            Contests, workshops, bootcamps, and hackathon prep — every week at SRMCEM.
            Show up, learn something real.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="ep-filter-bar">
        <div className="ep-filter-inner page-width">
          <div className="ep-filter-group">
            <Filter size={14} className="ep-filter-icon" />
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`ep-filter-btn${active === cat ? ' ep-filter-active' : ''}`}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="ep-filter-group">
            {['All', 'upcoming', 'completed'].map(st => (
              <button
                key={st}
                className={`ep-filter-btn ep-filter-sm${statusFilter === st ? ' ep-filter-active' : ''}`}
                onClick={() => setStatusFilter(st)}
              >
                {st === 'All' ? 'All Status' : st.charAt(0).toUpperCase() + st.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events grid */}
      <div className="ep-content page-width">
        {loading ? (
          <div className="ep-loading">
            <RefreshCw size={26} className="spin-icon" />
            <span>Loading events…</span>
          </div>
        ) : events.length === 0 ? (
          <div className="ep-empty">
            <p>No events found for this filter. Check back soon!</p>
          </div>
        ) : (
          <>
            {upcoming.length > 0 && (
              <div className="ep-group">
                <h2 className="ep-group-label">Upcoming &amp; Live</h2>
                <div className="ep-grid">
                  {upcoming.map(ev => <EventCard key={ev._id} event={ev} />)}
                </div>
              </div>
            )}
            {past.length > 0 && (
              <div className="ep-group">
                <h2 className="ep-group-label ep-group-past">Past Events</h2>
                <div className="ep-grid">
                  {past.map(ev => <EventCard key={ev._id} event={ev} />)}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
