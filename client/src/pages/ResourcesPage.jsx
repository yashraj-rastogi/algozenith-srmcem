import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, BookOpen, Code2, Download, Copy, Check,
  ExternalLink, FileText, Sparkles, Terminal, Filter,
  ArrowRight, ChevronLeft, Zap, Star, ShieldCheck
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

const RESOURCES_DATA = [
  {
    id: 'res-1',
    title: '45-Day Beginner DSA Roadmap',
    category: 'DSA',
    type: 'Roadmap',
    badge: 'Flagship Guide',
    desc: 'Structured day-by-day study schedule from basic arrays and pointers to recursion, trees, and dynamic programming.',
    tags: ['DSA', 'Beginner', 'Roadmap', 'Java/C++'],
    link: 'https://algozenith.org',
    actionText: 'View Roadmap',
  },
  {
    id: 'res-2',
    title: 'Competitive Programming Java Boilerplate',
    category: 'Java',
    type: 'Template',
    badge: 'Fast I/O',
    desc: 'Custom FastScanner, pre-configured PrintWriter, and standard modulo arithmetic for Codeforces and LeetCode in Java.',
    tags: ['Java', 'Fast I/O', 'Template', 'Codeforces'],
    copyableCode: `import java.io.*;
import java.util.*;

public class Main {
    static class FastScanner {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer("");
        String next() {
            while (!st.hasMoreTokens()) {
                try { st = new StringTokenizer(br.readLine()); }
                catch (IOException e) { e.printStackTrace(); }
            }
            return st.nextToken();
        }
        int nextInt() { return Integer.parseInt(next()); }
        long nextLong() { return Long.parseLong(next()); }
    }

    public static void main(String[] args) {
        FastScanner fs = new FastScanner();
        PrintWriter out = new PrintWriter(System.out);
        int t = fs.nextInt();
        while (t-- > 0) {
            int n = fs.nextInt();
            // Solve problem
            out.println(n);
        }
        out.flush();
    }
}`,
    actionText: 'Copy Template',
  },
  {
    id: 'res-3',
    title: 'Modern C++ Contest Template (C++20)',
    category: 'C++',
    type: 'Template',
    badge: 'Fast I/O',
    desc: 'Ultra-fast sync_with_stdio(0), standard type aliases (ll, vll, pii), and debug macro kit for competitive programmers.',
    tags: ['C++', 'Competitive Programming', 'Fast I/O'],
    copyableCode: `#include <bits/stdc++.h>
using namespace std;

#define FAST_IO ios_base::sync_with_stdio(false); cin.tie(NULL);
using ll = long long;
using vll = vector<ll>;
const ll MOD = 1e9 + 7;

void solve() {
    ll n;
    if (!(cin >> n)) return;
    vll a(n);
    for (auto &x : a) cin >> x;
    cout << n << "\\n";
}

int main() {
    FAST_IO;
    int t = 1;
    if (cin >> t) {
        while (t--) solve();
    }
    return 0;
}`,
    actionText: 'Copy Template',
  },
  {
    id: 'res-4',
    title: 'Top 100 Interview DSA Problem Sheet',
    category: 'DSA',
    type: 'Sheet',
    badge: 'Must Do',
    desc: 'Curated 100 most frequent LeetCode & CodeChef interview questions grouped by pattern (Sliding Window, Two Pointers, Trees, Graphs).',
    tags: ['DSA', 'LeetCode', 'Interview Prep', 'Top 100'],
    link: 'https://leetcode.com',
    actionText: 'Open Problem Sheet',
  },
  {
    id: 'res-5',
    title: 'Full-Stack MERN Sprint Roadmap',
    category: 'Web Dev',
    type: 'Roadmap',
    badge: 'Web & App',
    desc: 'Step-by-step milestone guide to master React, Express, MongoDB Atlas, JWT authentication, and automated deployment on Vercel.',
    tags: ['Web Dev', 'React', 'NodeJS', 'MongoDB', 'MERN'],
    link: 'https://github.com',
    actionText: 'Explore Syllabus',
  },
  {
    id: 'res-6',
    title: 'SRMCEM Senior Interview Archives (2024-2026)',
    category: 'Interviews',
    type: 'Archive',
    badge: 'Campus Special',
    desc: 'Real technical round questions, coding assessments, and HR experiences collected from seniors placed at Amazon, Cisco, Optum, and TCS Digital.',
    tags: ['Placements', 'SRMCEM', 'Archives', 'Off-Campus'],
    link: 'https://algozenith.org',
    actionText: 'Read Interview Experiences',
  },
  {
    id: 'res-7',
    title: 'Git & GitHub Collaboration Playbook',
    category: 'Web Dev',
    type: 'Guide',
    badge: 'Open Source',
    desc: 'Branching strategies, resolving merge conflicts, crafting professional PRs, and contributing to open-source college repositories.',
    tags: ['Git', 'GitHub', 'Open Source', 'Hackathons'],
    link: 'https://github.com',
    actionText: 'Read Playbook',
  },
];

const CONSTRAINT_TABLE = [
  { limit: 'N ≤ 10',        complexity: 'O(N!) or O(N² · 2ᴺ)',  typical: 'Permutations, TSP, Brute force' },
  { limit: 'N ≤ 20',        complexity: 'O(2ᴺ)',                typical: 'Subsets, Bitmask Dynamic Programming' },
  { limit: 'N ≤ 500',       complexity: 'O(N³)',                typical: 'Floyd-Warshall, Matrix multiplication' },
  { limit: 'N ≤ 5,000',     complexity: 'O(N²)',                typical: 'Nested loops, 2D DP, Bubble / Insertion' },
  { limit: 'N ≤ 100,000',   complexity: 'O(N log N)',           typical: 'Merge Sort, Segment Tree, Disjoint Set' },
  { limit: 'N ≤ 1,000,000', complexity: 'O(N)',                 typical: 'Two Pointers, Sliding Window, Linear Sieve' },
  { limit: 'N ≥ 10⁹',       complexity: 'O(log N) or O(1)',     typical: 'Binary Search, Math, Modular Exponentiation' },
];

export default function ResourcesPage() {
  const [search, setSearch]       = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [copiedId, setCopiedId]   = useState(null);

  const tabs = ['All', 'DSA', 'Java', 'C++', 'Web Dev', 'Interviews'];

  const filtered = RESOURCES_DATA.filter(item => {
    const matchTab = activeTab === 'All' || item.category === activeTab;
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.desc.toLowerCase().includes(search.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchTab && matchSearch;
  });

  const handleCopy = (id, code) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

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
              <Sparkles size={13} /> Curated Stash
            </div>
            <h1 className="section-title">
              Coding Roadmaps &amp; <span className="gradient-text">Contest Vault</span>
            </h1>
            <p className="section-desc" style={{ maxWidth: 680 }}>
              DSA cheat sheets, fast I/O boilerplate codes, interview archives from SRMCEM seniors,
              and competitive programming guidelines.
            </p>
          </div>

          {/* ── Search & Filter Tabs ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 36 }}>
            <div style={{ position: 'relative', maxWidth: 480 }}>
              <Search size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search sheets, boilerplates, roadmaps, topics..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="input-field"
                style={{ paddingLeft: '42px' }}
              />
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`filter-btn ${activeTab === tab ? 'filter-active' : ''}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* ── Resource Cards Grid ── */}
          <div className="grid-3" style={{ marginBottom: '4rem' }}>
            {filtered.map(item => (
              <div key={item.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span className="badge badge-cyan">{item.badge}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.category}</span>
                  </div>

                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: 10 }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 16 }}>
                    {item.desc}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                    {item.tags.map(tag => (
                      <span key={tag} className="event-tag-pill">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {item.copyableCode ? (
                  <button
                    onClick={() => handleCopy(item.id, item.copyableCode)}
                    className="btn btn-secondary"
                    style={{ width: '100%' }}
                  >
                    {copiedId === item.id ? (
                      <><Check size={14} color="#34d399" /> Copied Boilerplate!</>
                    ) : (
                      <><Copy size={14} /> Copy Fast Boilerplate</>
                    )}
                  </button>
                ) : (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                  >
                    <span>{item.actionText}</span>
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* ── Interactive Constraint Cheat Sheet ── */}
          <div className="card" style={{ padding: '2.5rem' }}>
            <div style={{ marginBottom: 20 }}>
              <span className="badge badge-purple" style={{ marginBottom: 8 }}>Contest Quick Reference</span>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: 4 }}>
                Input Constraint vs Time Complexity Cheat Sheet
              </h2>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginTop: 4 }}>
                When reading a competitive programming problem statement, use the constraints on $N$ to immediately know the expected Big-O complexity!
              </p>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.92rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1.5px solid var(--az-navy-border)', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '12px 14px' }}>Input Size (N)</th>
                    <th style={{ padding: '12px 14px' }}>Acceptable Complexity</th>
                    <th style={{ padding: '12px 14px' }}>Typical Algorithms &amp; Patterns</th>
                  </tr>
                </thead>
                <tbody>
                  {CONSTRAINT_TABLE.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid rgba(59, 130, 246, 0.08)', background: idx % 2 === 0 ? 'rgba(59, 130, 246, 0.02)' : 'transparent' }}>
                      <td style={{ padding: '12px 14px', fontFamily: 'var(--font-mono)', color: 'var(--az-cyan-glow)', fontWeight: 600 }}>{row.limit}</td>
                      <td style={{ padding: '12px 14px', fontFamily: 'var(--font-mono)', color: '#fbbf24', fontWeight: 600 }}>{row.complexity}</td>
                      <td style={{ padding: '12px 14px', color: 'var(--text-main)' }}>{row.typical}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
