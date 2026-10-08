import React from 'react';
import { CheckCircle2, ChevronRight, Terminal, BookMarked, Code, Cpu } from 'lucide-react';

export const Roadmap = () => {
  const tiers = [
    {
      level: 'Phase 01',
      title: 'Foundational Problem Solving',
      subtitle: 'Target: Codeforces Newbie → Pupil / LeetCode 1200-1400',
      description: 'Master language syntax (C++/Java/Python), time and space complexities, bitwise operations, math fundamentals, and prefix sum arrays.',
      topics: ['Time Complexity & Asymptotics', 'Basic Math, GCD, Sieve', 'Prefix Sums & Two Pointers', 'Recursion Fundamentals', 'Sorting & Binary Search'],
      color: 'blue'
    },
    {
      level: 'Phase 02',
      title: 'Intermediate DSA & Search',
      subtitle: 'Target: Codeforces Pupil → Specialist / LeetCode 1400-1700',
      description: 'Diving deep into fundamental linear & non-linear structures, standard graph traversals, and greedy patterns.',
      topics: ['Stacks, Queues, Monotonic Stack', 'Binary Trees & BSTs', 'Breadth First Search (BFS)', 'Depth First Search (DFS)', 'Priority Queues & Heaps'],
      color: 'cyan'
    },
    {
      level: 'Phase 03',
      title: 'Dynamic Programming & Graphs',
      subtitle: 'Target: Codeforces Specialist → Expert / LeetCode 1700-2000',
      description: 'Demystifying state formulation, memoization, iterative DP tables, shortest path algorithms, and Disjoint Set Union.',
      topics: ['1D & 2D Dynamic Programming', 'Subsequence & Knapsack Variants', 'Dijkstra & Bellman-Ford', 'Disjoint Set Union (DSU)', 'Minimum Spanning Trees (Kruskal)'],
      color: 'purple'
    },
    {
      level: 'Phase 04',
      title: 'Advanced CP & Tree Queries',
      subtitle: 'Target: Candidate Master / ICPC Regional Qualification',
      description: 'Advanced range query structures, tree flattening, heavy-light decomposition, game theory, and string automata.',
      topics: ['Segment Trees & Lazy Propagation', 'Fenwick Trees (Binary Indexed Tree)', 'DP on Trees & Rerooting', 'Tries & Aho-Corasick', 'Combinatorics & Modular Arithmetic'],
      color: 'emerald'
    }
  ];

  return (
    <section id="roadmap" className="section roadmap-section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Structured Learning Path</div>
          <h2 className="section-title">
            The AlgoZenith <span className="gradient-text">CP Progression Roadmap</span>
          </h2>
          <p className="section-desc">
            Carefully structured by national CP mentors to take student engineers from syntax fundamentals to contest mastery and top-tier placement offers.
          </p>
        </div>

        <div className="grid-2 roadmap-grid">
          {tiers.map((tier, idx) => (
            <div key={idx} className={`card roadmap-card roadmap-card-${tier.color}`}>
              <div className="roadmap-header">
                <span className={`badge badge-${tier.color}`}>{tier.level}</span>
                <span className="roadmap-target">{tier.subtitle}</span>
              </div>

              <h3 className="roadmap-title">{tier.title}</h3>
              <p className="roadmap-desc">{tier.description}</p>

              <div className="roadmap-topics">
                <div className="topics-heading">Key Core Concepts:</div>
                <ul className="topics-list">
                  {tier.topics.map((top, tIdx) => (
                    <li key={tIdx} className="topic-item">
                      <CheckCircle2 size={15} className={`topic-check topic-check-${tier.color}`} />
                      <span>{top}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
