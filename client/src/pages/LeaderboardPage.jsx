import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Trophy, Award, Flame, Users, ChevronLeft,
  ExternalLink, Sparkles, Star, TrendingUp,
  Code2, CheckCircle2, ShieldAlert
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

const CONTEST_STANDINGS = [
  { rank: 1, handle: 'algoknight_yr', name: 'Yashraj Rastogi', solved: '5/5', penalty: 124, delta: '+84', rating: 1680, collegeYear: '3rd Year' },
  { rank: 2, handle: 'aryan_codes',   name: 'Aryan Verma',    solved: '4/5', penalty: 98,  delta: '+52', rating: 1540, collegeYear: '3rd Year' },
  { rank: 3, handle: 'priya_kapoor',  name: 'Priya Kapoor',   solved: '4/5', penalty: 112, delta: '+45', rating: 1515, collegeYear: '3rd Year' },
  { rank: 4, handle: 'dev_shivam',    name: 'Shivam Tiwari',  solved: '4/5', penalty: 145, delta: '+38', rating: 1460, collegeYear: '2nd Year' },
  { rank: 5, handle: 'neha_az',       name: 'Neha Singh',     solved: '3/5', penalty: 82,  delta: '+29', rating: 1395, collegeYear: '2nd Year' },
  { rank: 6, handle: 'rohit_cp',      name: 'Rohit Kumar',    solved: '3/5', penalty: 95,  delta: '+22', rating: 1380, collegeYear: '2nd Year' },
  { rank: 7, handle: 'ananya_s',      name: 'Ananya Sharma',  solved: '3/5', penalty: 110, delta: '+18', rating: 1340, collegeYear: '1st Year' },
  { rank: 8, handle: 'ritik_dev',     name: 'Ritik Srivastava', solved: '2/5', penalty: 64,  delta: '+12', rating: 1290, collegeYear: '1st Year' },
];

const TOP_CODERS = [
  { name: 'Yashraj Rastogi', handle: 'yashraj_az', cfTitle: 'Candidate Master', cfRating: 1910, lcBadge: 'Knight (2080)', year: '3rd Year', color: '#a855f7' },
  { name: 'Aryan Verma',    handle: 'aryan_az',   cfTitle: 'Specialist',       cfRating: 1560, lcBadge: 'Knight (1940)', year: '3rd Year', color: '#06b6d4' },
  { name: 'Priya Kapoor',   handle: 'priya_k',    cfTitle: 'Specialist',       cfRating: 1515, lcBadge: 'Knight (1910)', year: '3rd Year', color: '#06b6d4' },
  { name: 'Akshat Gupta',   handle: 'akshat_g',   cfTitle: 'Expert',           cfRating: 1640, lcBadge: 'Knight (2010)', year: '4th Year', color: '#3b82f6' },
  { name: 'Rohan Mishra',   handle: 'rohan_m',    cfTitle: 'Specialist',       cfRating: 1480, lcBadge: 'Top 5%',        year: '3rd Year', color: '#06b6d4' },
];

const HACKATHON_WINNERS = [
  {
    event: 'Smart India Hackathon (SIH)',
    year: '2025',
    prize: '🏆 National 1st Runner-Up (₹75,000)',
    project: 'Smart Agri-Telemetry & Crop Disease Detector',
    team: 'Team AgroZenith (Aryan Verma, Priya Kapoor & members)',
    desc: 'Built an offline-first IoT + AI vision model to detect tomato leaf blight in under 2 seconds on edge devices.',
  },
  {
    event: 'HackSRMCEM Annual Hackathon',
    year: '2025',
    prize: '🥇 1st Place Overall',
    project: 'CampusConnect — Decentralized Event & Peer Tutoring Hub',
    team: 'Team DevSprint',
    desc: 'Web3 & Realtime chat system with collaborative code whiteboard connecting juniors with senior mentors.',
  },
  {
    event: 'Google Solution Challenge',
    year: '2024',
    prize: '⭐ Regional Top 5 Finalist',
    project: 'JalDrishti — Clean Water Access Map',
    team: 'Team AquaFlow',
    desc: 'Open-source crowdsourced water purity mapping for municipal wards utilizing Firebase and Google Cloud Run.',
  },
];

const PLACEMENT_SPOTLIGHTS = [
  {
    name: 'Siddharth Saxena',
    company: 'Amazon',
    role: 'Software Development Engineer (SDE-1)',
    batch: 'Batch of 2024',
    quote: 'AlgoZenith contest problem-solving speed and daily consistency on LeetCode made the OA and onsite system design rounds intuitive.',
  },
  {
    name: 'Tanvi Agarwal',
    company: 'Microsoft',
    role: 'Software Engineer',
    batch: 'Batch of 2024',
    quote: 'The mock coding rounds organized by the club simulated the high-pressure interview environment better than anything else.',
  },
  {
    name: 'Utkarsh Srivastava',
    company: 'Cisco',
    role: 'Software Engineer (Networks & Cloud)',
    batch: 'Batch of 2025',
    quote: 'Mastering graphs and trees through the senior mentorship sessions was the single best investment of my 2nd and 3rd year.',
  },
  {
    name: 'Aman Dubey',
    company: 'Oracle',
    role: 'Associate Applications Developer',
    batch: 'Batch of 2025',
    quote: 'Build projects that you can talk passionately about for 20 minutes, and keep your LeetCode streak alive every weekend.',
  },
];

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState('standings');

  return (
    <div className="algozenith-app">
      <Navbar />

      <main style={{ paddingTop: '110px', paddingBottom: '80px' }}>
        <div className="container">
          {/* Breadcrumb */}
          <div style={{ marginBottom: '24px' }}>
            <Link to="/" className="btn btn-secondary" style={{ display: 'inline-flex', padding: '0.45rem 1rem', fontSize: '0.85rem' }}>
              <ChevronLeft size={16} /> Back to Home
            </Link>
          </div>

          {/* ── Header ── */}
          <div className="section-header" style={{ textAlign: 'left', margin: '0 0 2.5rem 0', maxWidth: 'none' }}>
            <div className="section-badge">
              <Trophy size={13} /> Campus Rankings &amp; Glory
            </div>
            <h1 className="section-title">
              Campus <span className="gradient-text">Leaderboard &amp; Hall of Fame</span>
            </h1>
            <p className="section-desc" style={{ maxWidth: 680 }}>
              Celebrating our top contest performers, national hackathon podium winners, and tier-1 placement achievers at SRMCEM.
            </p>
          </div>

          {/* ── Stats Highlight ── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 16,
            marginBottom: 36,
          }}>
            {[
              { label: 'Ranked Coders', val: '500+' },
              { label: 'Contests Hosted', val: '25+' },
              { label: 'Hackathon Wins', val: '15+' },
              { label: 'Tier-1 Placements', val: '40+' },
            ].map(s => (
              <div key={s.label} className="card" style={{ padding: '1.25rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fbbf24', fontFamily: 'var(--font-display)' }}>
                  {s.val}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 4 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* ── Tabs ── */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
            {[
              { id: 'standings', label: '⚡ Contest Standings' },
              { id: 'halloffame', label: '🏆 Top Coders (CF/LC)' },
              { id: 'hackathons', label: '🚀 Hackathon Victories' },
              { id: 'placements', label: '🎓 Tier-1 Placements' },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`filter-btn ${activeTab === t.id ? 'filter-active' : ''}`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* ── Tab Content: Standings ── */}
          {activeTab === 'standings' && (
            <div className="card" style={{ padding: '1.8rem', overflowX: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, flexWrap: 'wrap', gap: 10 }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>AlgoSprint 2.0 Contest Standings</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Held on HackerEarth · SRMCEM Chapter</p>
                </div>
                <span className="badge badge-cyan">Updated Live</span>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.92rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1.5px solid var(--az-navy-border)', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '12px 14px' }}>Rank</th>
                    <th style={{ padding: '12px 14px' }}>Coder</th>
                    <th style={{ padding: '12px 14px' }}>Year</th>
                    <th style={{ padding: '12px 14px' }}>Score</th>
                    <th style={{ padding: '12px 14px' }}>Penalty</th>
                    <th style={{ padding: '12px 14px' }}>Rating Delta</th>
                  </tr>
                </thead>
                <tbody>
                  {CONTEST_STANDINGS.map((row) => (
                    <tr key={row.rank} style={{ borderBottom: '1px solid rgba(59, 130, 246, 0.08)', background: row.rank <= 3 ? 'rgba(37, 99, 235, 0.06)' : 'transparent' }}>
                      <td style={{ padding: '12px 14px', fontWeight: 700 }}>
                        {row.rank === 1 && '🥇 1'}
                        {row.rank === 2 && '🥈 2'}
                        {row.rank === 3 && '🥉 3'}
                        {row.rank > 3 && `#${row.rank}`}
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{row.name}</div>
                        <div style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--az-cyan-glow)' }}>@{row.handle}</div>
                      </td>
                      <td style={{ padding: '12px 14px', color: 'var(--text-muted)' }}>{row.collegeYear}</td>
                      <td style={{ padding: '12px 14px', fontFamily: 'var(--font-mono)', color: '#fbbf24', fontWeight: 600 }}>{row.solved}</td>
                      <td style={{ padding: '12px 14px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{row.penalty}m</td>
                      <td style={{ padding: '12px 14px', fontFamily: 'var(--font-mono)', color: '#34d399', fontWeight: 600 }}>{row.delta}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ── Tab Content: Hall of Fame (Top Coders) ── */}
          {activeTab === 'halloffame' && (
            <div className="grid-3">
              {TOP_CODERS.map((coder) => (
                <div key={coder.handle} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                      <span className="badge badge-purple" style={{ color: coder.color }}>
                        {coder.cfTitle}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{coder.year}</span>
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: 4 }}>
                      {coder.name}
                    </h3>
                    <div style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: 'var(--az-cyan-glow)', marginBottom: 16 }}>
                      @{coder.handle}
                    </div>
                  </div>

                  <div style={{ borderTop: '1px solid var(--az-navy-border)', paddingTop: 14, display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>CF Rating</div>
                      <div style={{ fontSize: '1.15rem', fontWeight: 800, color: coder.color, fontFamily: 'var(--font-mono)' }}>{coder.cfRating}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>LeetCode</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fbbf24' }}>{coder.lcBadge}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Tab Content: Hackathon Victories ── */}
          {activeTab === 'hackathons' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {HACKATHON_WINNERS.map((h, i) => (
                <div key={i} className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
                    <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fbbf24' }}>
                      {h.prize}
                    </span>
                    <span className="badge badge-cyan">{h.year}</span>
                  </div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: 6 }}>
                    {h.event}
                  </h3>
                  <h4 style={{ fontSize: '1.02rem', fontWeight: 600, color: 'var(--az-cyan-glow)', marginBottom: 10 }}>
                    Project: {h.project}
                  </h4>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 12 }}>
                    {h.desc}
                  </p>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>
                    <strong>Team:</strong> {h.team}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Tab Content: Placements ── */}
          {activeTab === 'placements' && (
            <div className="grid-3">
              {PLACEMENT_SPOTLIGHTS.map((p, i) => (
                <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <span className="badge badge-cyan">{p.company}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{p.batch}</span>
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: 4 }}>
                      {p.name}
                    </h3>
                    <div style={{ fontSize: '0.88rem', color: '#fbbf24', fontWeight: 600, marginBottom: 14 }}>
                      {p.role}
                    </div>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.6 }}>
                      "{p.quote}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
