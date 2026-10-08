import React, { useState, useEffect } from 'react';
import { ExternalLink, Code2, Users, Award } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { api } from '../services/api';

export const Team = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await api.getMembers();
        if (res && res.data) {
          setMembers(res.data);
        }
      } catch (err) {
        console.error('Failed to load team:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  return (
    <section id="team" className="section team-section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Leadership & Mentors</div>
          <h2 className="section-title">
            Meet the <span className="gradient-text">Core Team</span>
          </h2>
          <p className="section-desc">
            Passionate student leaders dedicated to mentoring peers, organizing flagship hackathons, and fostering tech culture at SRMCEM.
          </p>
        </div>

        {loading ? (
          <div className="team-loading">
            <span>Loading team profiles...</span>
          </div>
        ) : (
          <div className="grid-4 team-grid">
            {members.map((member) => (
              <div key={member._id || member.name} className="card team-card">
                {/* Avatar Placeholder / Photo */}
                <div className="team-avatar-wrapper">
                  <div className="avatar-circle">
                    {member.avatarUrl ? (
                      <img src={member.avatarUrl} alt={member.name} className="avatar-img" />
                    ) : (
                      <div className="avatar-initials">
                        {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                      </div>
                    )}
                  </div>
                  <div className="team-role-pill">{member.role}</div>
                </div>

                <div className="team-info">
                  <h3 className="team-name">{member.name}</h3>
                  <div className="team-dept">{member.department} • {member.year}</div>
                  <p className="team-bio">{member.bio}</p>

                  {/* Social Handles */}
                  <div className="team-socials">
                    {member.socials?.github && (
                      <a
                        href={member.socials.github}
                        target="_blank"
                        rel="noreferrer"
                        className="social-icon-btn"
                        title="GitHub"
                      >
                        <GithubIcon size={16} />
                      </a>
                    )}
                    {member.socials?.linkedin && (
                      <a
                        href={member.socials.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="social-icon-btn"
                        title="LinkedIn"
                      >
                        <LinkedinIcon size={16} />
                      </a>
                    )}
                    {member.socials?.codeforces && (
                      <a
                        href={member.socials.codeforces}
                        target="_blank"
                        rel="noreferrer"
                        className="social-icon-btn"
                        title="Codeforces"
                      >
                        <Code2 size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
