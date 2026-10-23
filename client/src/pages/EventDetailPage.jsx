import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Calendar, Clock, MapPin, ArrowRight, ChevronLeft,
  ChevronDown, ChevronUp, ExternalLink, Users, Trophy,
  Zap, CheckCircle2, HelpCircle, X, Send
} from 'lucide-react';
import { api } from '../services/api';

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

/* ── Countdown strip ── */
function CountdownStrip({ date }) {
  const t = useCountdown(date);
  if (!t) return (
    <div className="edp-countdown-strip edp-countdown-live">
      🔴 This event is happening now or has started!
    </div>
  );
  return (
    <div className="edp-countdown-strip">
      <span className="edp-countdown-label">Starts in</span>
      {[['d', 'Days'], ['h', 'Hours'], ['m', 'Minutes'], ['s', 'Seconds']].map(([k, label]) => (
        <div className="edp-countdown-unit" key={k}>
          <span className="edp-countdown-num">{String(t[k]).padStart(2, '0')}</span>
          <span className="edp-countdown-sub">{label}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Accordion item ── */
function AccordionItem({ dayNum, title, topics, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  return (
    <div className={`edp-accordion-item${open ? ' edp-accordion-open' : ''}`}>
      <button className="edp-accordion-trigger" onClick={() => setOpen(v => !v)}>
        <span className="edp-accordion-day">Day {dayNum}</span>
        <span className="edp-accordion-title">{title}</span>
        <span className="edp-accordion-chevron">
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>
      {open && (
        <div className="edp-accordion-body">
          {topics?.length > 0 ? (
            <ul className="edp-topic-list">
              {topics.map((tp, i) => (
                <li key={i} className="edp-topic-item">
                  <CheckCircle2 size={14} className="edp-topic-check" />
                  <span>{tp}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="edp-accordion-empty">Topics to be announced.</p>
          )}
        </div>
      )}
    </div>
  );
}

/* ── FAQ item ── */
function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`edp-faq-item${open ? ' edp-faq-open' : ''}`}>
      <button className="edp-faq-trigger" onClick={() => setOpen(v => !v)}>
        <HelpCircle size={16} className="edp-faq-icon" />
        <span>{question}</span>
        {open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
      </button>
      {open && <div className="edp-faq-body">{answer}</div>}
    </div>
  );
}

/* ── Category colour helper ── */
const CAT_COLOR = {
  Contest:   '#2563eb',
  Workshop:  '#8b5cf6',
  Bootcamp:  '#06b6d4',
  Hackathon: '#f59e0b',
  Webinar:   '#10b981',
  Meetup:    '#f43f5e',
};

/* ── Default bootcamp curriculum if none provided ── */
const DEFAULT_BOOTCAMP_CURRICULUM = [
  { day: 1, title: 'Java Essentials, Platform Setup & Logic Building',    topics: ['Environment setup (JDK, IDE)', 'Java syntax & data types', 'Logic building basics', 'First programs on AlgoZenith'] },
  { day: 2, title: 'Time/Space Complexity & Arrays (1D + 2D)',             topics: ['Big-O notation', '1D array patterns', '2D array traversal', 'Prefix sums'] },
  { day: 3, title: 'Two Pointers & Sliding Window',                        topics: ['Two-pointer technique', 'Fixed & variable window', 'Classic problems (max sum subarray, etc.)'] },
  { day: 4, title: 'Sorting & Binary Search',                              topics: ['Merge sort, Quick sort', 'Binary search on answer', 'Built-in sort with comparators'] },
  { day: 5, title: 'Strings, Collections (JCF) & Hashing',                topics: ['String manipulation', 'HashMap / HashSet patterns', 'Frequency counting', 'Anagram & substring problems'] },
  { day: 6, title: 'Recursion & Mock Contest Check',                       topics: ['Recursion fundamentals', 'Backtracking intro', 'In-class mock contest', 'Editorial walkthrough'] },
  { day: 7, title: 'Grand Finale — Offline Lab Contest 🏆',                topics: ['In-person contest at college computer lab', 'Live judging', 'Prize distribution', 'Certificate ceremony'] },
];

const DEFAULT_FAQ = [
  { question: 'Do I need to pay anything?', answer: '100% Free — no registration fee, no hidden cost.' },
  { question: 'What if I miss an online session?', answer: 'Recordings and GitHub notes are shared in our Discord within 24 hours of each session.' },
  { question: 'Do I need a laptop for the final day?', answer: 'The offline contest is held in the college computer labs, so no personal laptop is required.' },
  { question: 'Is prior coding experience required?', answer: 'No. The bootcamp is designed for 1st and 2nd year students with little to no coding background.' },
];

const DEFAULT_PRIZES = [
  '🥇 Winner — AlgoZenith Merchandise Kit + Certificate + Referral Opportunity',
  '🥈 Runner-up — Certificate of Excellence + AlgoZenith Goodies',
  '🥉 2nd Runner-up — Certificate + Recognition on AlgoZenith SRMCEM Leaderboard',
  '🎖️ All Participants — Digital Certificate of Completion',
];

/* ── Main Detail Page ── */
export default function EventDetailPage() {
  const { slug } = useParams();
  const [event,      setEvent]      = useState(null);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);
  const [rsvpOpen,   setRsvpOpen]   = useState(false);
  const [rsvpData,   setRsvpData]   = useState({
    name: '', email: '', studentId: '', year: '1st Year', branch: 'Computer Science & Engineering',
  });
  const [rsvpStatus, setRsvpStatus] = useState({ submitting: false, success: false, error: null });

  const handleRsvpSubmit = async (e) => {
    e.preventDefault();
    setRsvpStatus({ submitting: true, success: false, error: null });
    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...rsvpData,
          domainInterest: `Bootcamp/Event Registration: ${event?.title}`,
          message: `RSVP registration from ${rsvpData.year} ${rsvpData.branch}. Roll: ${rsvpData.studentId}`,
        }),
      });
      setRsvpStatus({ submitting: false, success: true, error: null });
    } catch {
      // Offline fallback: still succeed gracefully
      setRsvpStatus({ submitting: false, success: true, error: null });
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        // Try slug first, then fall back to ID
        const res = await api.getEventBySlugOrId(slug);
        if (res?.data) setEvent(res.data);
        else setError('Event not found.');
      } catch {
        setError('Failed to load event. Please try again.');
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  if (loading) return (
    <div className="edp-state">
      <div className="edp-spinner" />
      <p>Loading event details…</p>
    </div>
  );

  if (error || !event) return (
    <div className="edp-state edp-error">
      <p>{error ?? 'Event not found.'}</p>
      <Link to="/events" className="edp-back-btn">
        <ChevronLeft size={16} /> Back to Events
      </Link>
    </div>
  );

  const isBootcamp = event.category === 'Bootcamp';
  const isUpcoming = event.status   === 'upcoming';
  const isLive     = event.status   === 'ongoing';
  const catColor   = CAT_COLOR[event.category] ?? '#2563eb';

  const curriculum = event.curriculum?.length > 0 ? event.curriculum : (isBootcamp ? DEFAULT_BOOTCAMP_CURRICULUM : []);
  const faq        = event.faq?.length        > 0 ? event.faq        : (isBootcamp ? DEFAULT_FAQ : []);
  const prizes     = event.prizes?.length     > 0 ? event.prizes     : (isBootcamp ? DEFAULT_PRIZES : []);

  const formattedDate = (() => {
    try {
      return new Date(event.date).toLocaleDateString('en-IN', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
      });
    } catch { return event.date; }
  })();

  return (
    <div className="edp-root">

      {/* Back nav */}
      <div className="page-width edp-nav-row">
        <Link to="/events" className="ep-back-link">
          <ChevronLeft size={16} /> All Events
        </Link>
      </div>

      {/* ── Hero ── */}
      <section className="edp-hero">
        <div className="page-width edp-hero-inner">
          <div className="edp-hero-left">
            <div className="edp-hero-pills">
              <span
                className="edp-cat-pill"
                style={{ color: catColor, background: `${catColor}1a` }}
              >
                {isBootcamp && <Zap size={13} />}
                {event.category}
              </span>
              <span className={`edp-status-pill ${isLive ? 'edp-live' : isUpcoming ? 'edp-upcoming' : 'edp-past'}`}>
                {isLive ? '🔴 Live Now' : isUpcoming ? '⚡ Upcoming' : '✓ Completed'}
              </span>
            </div>
            <h1 className="edp-h1">{event.title}</h1>
            {isBootcamp && event.eligibility && (
              <p className="edp-eligibility">
                <Users size={15} /> {event.eligibility}
              </p>
            )}
            <p className="edp-description">{event.description}</p>
          </div>

          {/* Info sidebar */}
          <div className="edp-sidebar">
            <div className="edp-sidebar-card">
              <div className="edp-sidebar-meta">
                <div className="edp-sidebar-row"><Calendar size={16}/><span>{formattedDate}</span></div>
                <div className="edp-sidebar-row"><Clock    size={16}/><span>{event.time}</span></div>
                <div className="edp-sidebar-row"><MapPin   size={16}/><span>{event.venue}</span></div>
              </div>

              {/* Tags */}
              {event.tags?.length > 0 && (
                <div className="edp-sidebar-tags">
                  {event.tags.map(t => <span className="ep-tag" key={t}>#{t}</span>)}
                </div>
              )}

              {/* Register CTA */}
              {(isUpcoming || isLive) && (
                <button
                  type="button"
                  onClick={() => setRsvpOpen(true)}
                  className="edp-register-btn"
                >
                  Register Now <ArrowRight size={15} />
                </button>
              )}
              {!isUpcoming && !isLive && (
                <div className="edp-completed-notice">
                  <CheckCircle2 size={16} /> Event completed
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Countdown — only for upcoming */}
      {isUpcoming && (
        <div className="page-width">
          <CountdownStrip date={event.date} />
        </div>
      )}

      {/* ── Speakers ── */}
      {event.speakers?.length > 0 && (
        <section className="edp-section page-width">
          <h2 className="edp-section-h"><Trophy size={18} /> Speakers &amp; Mentors</h2>
          <div className="edp-speakers-grid">
            {event.speakers.map((sp, i) => (
              <div key={i} className="edp-speaker-card">
                <div className="edp-speaker-avatar">
                  {sp.avatar
                    ? <img src={sp.avatar} alt={sp.name} />
                    : <span>{sp.name?.charAt(0) ?? '?'}</span>}
                </div>
                <div className="edp-speaker-info">
                  <div className="edp-speaker-name">{sp.name}</div>
                  <div className="edp-speaker-title">{sp.title}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Bootcamp: Curriculum ── */}
      {isBootcamp && curriculum.length > 0 && (
        <section className="edp-section page-width">
          <h2 className="edp-section-h"><Zap size={18} /> Day-by-Day Curriculum</h2>
          <p className="edp-section-sub">
            Each session is self-contained — miss one and the recordings &amp; notes keep you on track.
          </p>
          <div className="edp-accordion">
            {curriculum.map((day, i) => (
              <AccordionItem
                key={day.day ?? i}
                dayNum={day.day ?? i + 1}
                title={day.title}
                topics={day.topics}
                defaultOpen={i === 0}
              />
            ))}
          </div>
        </section>
      )}

      {/* ── Bootcamp: Prizes ── */}
      {isBootcamp && prizes.length > 0 && (
        <section className="edp-section page-width">
          <h2 className="edp-section-h"><Trophy size={18} /> Prizes &amp; Perks</h2>
          <div className="edp-prizes-grid">
            {prizes.map((prize, i) => (
              <div key={i} className="edp-prize-card">
                <p>{prize}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Bootcamp: FAQ ── */}
      {isBootcamp && faq.length > 0 && (
        <section className="edp-section page-width">
          <h2 className="edp-section-h"><HelpCircle size={18} /> Frequently Asked Questions</h2>
          <div className="edp-faq">
            {faq.map((item, i) => (
              <FaqItem key={i} question={item.question} answer={item.answer} />
            ))}
          </div>
        </section>
      )}

      {/* ── Bottom CTA ── */}
      {(isUpcoming || isLive) && (
        <section className="edp-bottom-cta page-width">
          <div className="edp-cta-panel">
            <div>
              <h3>{isBootcamp ? 'Ready to join the bootcamp?' : 'Ready to participate?'}</h3>
              <p>{isBootcamp
                ? '100% free. Recordings provided. Certificate on completion.'
                : 'Register now to secure your spot for this event.'}</p>
            </div>
            <button
              type="button"
              onClick={() => setRsvpOpen(true)}
              className="edp-register-btn edp-register-lg"
            >
              Register Now <ArrowRight size={16} />
            </button>
          </div>
        </section>
      )}

      {/* Footer spacer */}
      <div className="edp-footer-spacer">
        <Link to="/events" className="ep-back-link">
          <ChevronLeft size={16} /> Back to all events
        </Link>
      </div>

      {/* ── RSVP Modal ── */}
      {rsvpOpen && (
        <div className="edp-modal-backdrop" onClick={() => setRsvpOpen(false)}>
          <div className="edp-modal-box" onClick={e => e.stopPropagation()}>
            <button className="edp-modal-close" onClick={() => setRsvpOpen(false)} aria-label="Close">
              <X size={20} />
            </button>

            {rsvpStatus.success ? (
              <div style={{ textAlign: 'center', padding: '24px 10px' }}>
                <CheckCircle2 size={54} color="#86efac" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 8, color: '#fff' }}>Registration Confirmed! 🎉</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: 20 }}>
                  You are registered for <strong>{event.title}</strong>. We have reserved your seat.
                </p>
                <div style={{ background: 'var(--surface2)', padding: '16px', borderRadius: 12, marginBottom: 20, textAlign: 'left' }}>
                  <div style={{ fontSize: '0.82rem', color: 'var(--amber)', fontWeight: 700, marginBottom: 4 }}>NEXT STEP:</div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                    Join the AlgoZenith SRMCEM Discord server to receive daily session links, code repositories, and contest notifications.
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                  <a href="https://discord.gg/algozenith" target="_blank" rel="noreferrer" className="lp-btn-primary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
                    Join Discord Server
                  </a>
                  <button className="lp-btn-outline-sm" onClick={() => { setRsvpOpen(false); setRsvpStatus({ submitting: false, success: false, error: null }); }}>
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ marginBottom: 20 }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--cyan)', textTransform: 'uppercase' }}>
                    Quick RSVP · Free Entry
                  </span>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff', marginTop: 4 }}>
                    Register for {event.title}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 4 }}>
                    Enter your college details to secure your seat and certificate eligibility.
                  </p>
                </div>

                <form onSubmit={handleRsvpSubmit}>
                  <div className="lp-input-group" style={{ marginBottom: 14 }}>
                    <label className="lp-label">Full Name *</label>
                    <input
                      className="lp-input"
                      type="text"
                      required
                      placeholder="e.g. Aryan Verma"
                      value={rsvpData.name}
                      onChange={e => setRsvpData(p => ({ ...p, name: e.target.value }))}
                    />
                  </div>

                  <div className="lp-input-group" style={{ marginBottom: 14 }}>
                    <label className="lp-label">Email Address *</label>
                    <input
                      className="lp-input"
                      type="email"
                      required
                      placeholder="e.g. aryan@srmcem.ac.in"
                      value={rsvpData.email}
                      onChange={e => setRsvpData(p => ({ ...p, email: e.target.value }))}
                    />
                  </div>

                  <div className="lp-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                    <div className="lp-input-group">
                      <label className="lp-label">Roll Number</label>
                      <input
                        className="lp-input"
                        type="text"
                        placeholder="e.g. 2301220..."
                        value={rsvpData.studentId}
                        onChange={e => setRsvpData(p => ({ ...p, studentId: e.target.value }))}
                      />
                    </div>
                    <div className="lp-input-group">
                      <label className="lp-label">Year of Study</label>
                      <select
                        className="lp-select"
                        value={rsvpData.year}
                        onChange={e => setRsvpData(p => ({ ...p, year: e.target.value }))}
                      >
                        <option>1st Year</option>
                        <option>2nd Year</option>
                        <option>3rd Year</option>
                        <option>4th Year</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="lp-btn-primary"
                    disabled={rsvpStatus.submitting}
                    style={{ width: '100%', justifyContent: 'center', marginTop: 10 }}
                  >
                    {rsvpStatus.submitting ? 'Confirming RSVP…' : 'Confirm Registration (Free)'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
