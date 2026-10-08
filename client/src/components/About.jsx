import React from 'react';
import { Target, Zap, ShieldCheck, Award, BookOpen, GitBranch } from 'lucide-react';

export const About = () => {
  const pillars = [
    {
      icon: <Target className="pillar-icon" />,
      title: 'Algorithmic Mastery',
      description: 'Structured roadmaps covering Time Complexity, Arrays, Trees, Dynamic Programming, and Graph algorithms from scratch to expert level.',
    },
    {
      icon: <Zap className="pillar-icon" />,
      title: 'Weekly Contests & Sprints',
      description: 'Regular college-wide coding battles with post-contest video editorials, problem breakdowns, and rank ladders to foster healthy competition.',
    },
    {
      icon: <GitBranch className="pillar-icon" />,
      title: 'Real-World Engineering',
      description: 'Beyond DSA — we empower members to ship production-ready web apps, APIs, microservices, and compete in national hackathons.',
    },
    {
      icon: <Award className="pillar-icon" />,
      title: 'Placement & Internship Edge',
      description: 'Direct mentorship from seniors placed in top tech companies, mock technical rounds, resume reviews, and behavioral interview coaching.',
    },
  ];

  return (
    <section id="about" className="section about-section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">About Our Chapter</div>
          <h2 className="section-title">
            Empowering the Next Generation of <span className="gradient-text">Problem Solvers</span>
          </h2>
          <p className="section-desc">
            AlgoZenith SRMCEM is the official campus chapter of AlgoZenith at Shri Ramswaroop Memorial College of Engineering and Management. We are dedicated to cultivating computational thinking, speed coding, and engineering excellence.
          </p>
        </div>

        <div className="grid-2 about-grid">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="card pillar-card">
              <div className="pillar-icon-box">{pillar.icon}</div>
              <h3 className="pillar-title">{pillar.title}</h3>
              <p className="pillar-desc">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
