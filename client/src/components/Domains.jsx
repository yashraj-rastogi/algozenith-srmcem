import React from 'react';
import { Terminal, Globe, BrainCircuit, GitPullRequest, ArrowRight } from 'lucide-react';

export const Domains = () => {
  const domains = [
    {
      title: 'Competitive Programming',
      badge: 'Core Division',
      icon: <Terminal size={28} />,
      color: 'blue',
      description:
        'Focusing on speed, mathematical intuition, and data structures. Tackling Codeforces Division rounds, LeetCode Biweekly/Weekly contests, and ICPC regionals.',
      skills: ['C++', 'STL', 'Number Theory', 'Graph Algorithms', 'DP', 'Greedy'],
    },
    {
      title: 'Full Stack Web Development',
      badge: 'Development Wing',
      icon: <Globe size={28} />,
      color: 'cyan',
      description:
        'Building scalable, interactive, and responsive web platforms. Master modern frontend architectures, Node.js microservices, databases, and REST/GraphQL APIs.',
      skills: ['React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Tailwind'],
    },
    {
      title: 'AI & Machine Learning',
      badge: 'Innovation Wing',
      icon: <BrainCircuit size={28} />,
      color: 'purple',
      description:
        'Exploring the frontiers of predictive modeling, Deep Learning, Natural Language Processing, Computer Vision, and integrating Large Language Models into applications.',
      skills: ['Python', 'PyTorch', 'TensorFlow', 'Scikit-Learn', 'LLM Agents', 'Data Analytics'],
    },
    {
      title: 'Open Source & Hackathons',
      badge: 'Community Wing',
      icon: <GitPullRequest size={28} />,
      color: 'emerald',
      description:
        'Collaborating on open-source repositories, Git workflows, participating in national hackathons (Smart India Hackathon, MLH, Hacktoberfest), and fast prototyping.',
      skills: ['Git & GitHub', 'CI/CD', 'Docker', 'Hackathon Sprints', 'System Design'],
    },
  ];

  return (
    <section id="domains" className="section domains-section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Club Divisions</div>
          <h2 className="section-title">
            Specialized Wings for <span className="gradient-text">Every Ambition</span>
          </h2>
          <p className="section-desc">
            Whether your goal is clearing Google/Amazon online assessments, building high-throughput web apps, or winning hackathons, we have a specialized division for you.
          </p>
        </div>

        <div className="grid-2 domain-grid">
          {domains.map((item, idx) => (
            <div key={idx} className={`card domain-card domain-${item.color}`}>
              <div className="domain-card-header">
                <div className="domain-icon-box">{item.icon}</div>
                <span className={`badge badge-${item.color}`}>{item.badge}</span>
              </div>
              <h3 className="domain-title">{item.title}</h3>
              <p className="domain-desc">{item.description}</p>
              
              <div className="domain-tags">
                {item.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="domain-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
