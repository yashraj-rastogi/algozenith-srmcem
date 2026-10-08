import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Sparkles, Mail, User, BookOpen, MessageSquare } from 'lucide-react';
import { api } from '../services/api';

export const JoinForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    studentId: '',
    year: '1st Year',
    domainInterest: 'Competitive Programming (DSA)',
    message: '',
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
    message: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null, message: '' });

    try {
      const response = await api.submitInquiry(formData);
      setStatus({
        submitting: false,
        success: true,
        error: null,
        message: response.message || 'Application submitted successfully to AlgoZenith SRMCEM database!',
      });
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        studentId: '',
        year: '1st Year',
        domainInterest: 'Competitive Programming (DSA)',
        message: '',
      });
    } catch (err) {
      setStatus({
        submitting: false,
        success: false,
        error: err.message || 'Failed to submit form. Please verify backend is active.',
        message: '',
      });
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Join The Movement</div>
          <h2 className="section-title">
            Become Part of <span className="gradient-text">AlgoZenith SRMCEM</span>
          </h2>
          <p className="section-desc">
            Whether you want to join our competitive coding batches, get mentored for hackathons, or become a student coordinator, send us your details below.
          </p>
        </div>

        <div className="contact-wrapper card">
          <div className="contact-info-panel">
            <div className="panel-badge">
              <Sparkles size={16} />
              <span>Campus Chapter Portal</span>
            </div>
            <h3 className="panel-title">Let's Build Something Exceptional Together</h3>
            <p className="panel-desc">
              AlgoZenith SRMCEM organizes closed training sessions, guest AMAs with industry software engineers, and internal mock contest simulations.
            </p>

            <div className="perks-list">
              <div className="perk-item">
                <CheckCircle2 className="perk-check" size={18} />
                <span>Weekly Problem-Setting & Codeforces editorials</span>
              </div>
              <div className="perk-item">
                <CheckCircle2 className="perk-check" size={18} />
                <span>Internal Hackathon teams & project incubators</span>
              </div>
              <div className="perk-item">
                <CheckCircle2 className="perk-check" size={18} />
                <span>Direct senior guidance for off-campus & on-campus jobs</span>
              </div>
            </div>

            <div className="campus-badge-box">
              <div className="campus-name">Shri Ramswaroop Memorial College of Engineering & Management</div>
              <div className="campus-loc">Faizabad Road, Tiwariganj, Lucknow, UP</div>
            </div>
          </div>

          <div className="contact-form-panel">
            {status.success ? (
              <div className="form-success-state">
                <div className="success-icon-box">
                  <CheckCircle2 size={44} />
                </div>
                <h3>Inquiry Successfully Recorded!</h3>
                <p>{status.message}</p>
                <button
                  className="btn btn-secondary"
                  onClick={() => setStatus((prev) => ({ ...prev, success: false }))}
                >
                  Submit Another Response
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                {status.error && (
                  <div className="form-alert-error">
                    <AlertCircle size={18} />
                    <span>{status.error}</span>
                  </div>
                )}

                <div className="grid-2 form-row">
                  <div className="input-group">
                    <label className="input-label" htmlFor="name">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Aryan Verma"
                      value={formData.name}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>

                  <div className="input-group">
                    <label className="input-label" htmlFor="email">
                      College / Personal Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      placeholder="aryan@srmcem.ac.in"
                      value={formData.email}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="grid-2 form-row">
                  <div className="input-group">
                    <label className="input-label" htmlFor="studentId">
                      College Roll No. / ID
                    </label>
                    <input
                      id="studentId"
                      type="text"
                      name="studentId"
                      placeholder="e.g. 2101220100..."
                      value={formData.studentId}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>

                  <div className="input-group">
                    <label className="input-label" htmlFor="year">
                      Current Year of Study
                    </label>
                    <select
                      id="year"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      className="select-field"
                    >
                      <option value="1st Year">1st Year (Freshers)</option>
                      <option value="2nd Year">2nd Year (Sophomore)</option>
                      <option value="3rd Year">3rd Year (Pre-Final)</option>
                      <option value="4th Year">4th Year (Final Year)</option>
                    </select>
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label" htmlFor="domainInterest">
                    Primary Domain of Interest
                  </label>
                  <select
                    id="domainInterest"
                    name="domainInterest"
                    value={formData.domainInterest}
                    onChange={handleChange}
                    className="select-field"
                  >
                    <option value="Competitive Programming (DSA)">Competitive Programming (DSA)</option>
                    <option value="Full Stack Web Development">Full Stack Web Development</option>
                    <option value="Machine Learning & AI">Machine Learning & AI</option>
                    <option value="Open Source & Git">Open Source & Git</option>
                    <option value="Club Membership / Core Team">Club Membership / Core Team</option>
                    <option value="Other Query">Other General Query</option>
                  </select>
                </div>

                <div className="input-group">
                  <label className="input-label" htmlFor="message">
                    Tell Us About Your Goals or Questions *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    placeholder="Share your current coding experience (e.g. LeetCode profile, coding language) or what you wish to learn..."
                    value={formData.message}
                    onChange={handleChange}
                    className="textarea-field"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status.submitting}
                  className="btn btn-primary btn-submit"
                >
                  {status.submitting ? (
                    <span>Submitting to Database...</span>
                  ) : (
                    <>
                      <span>Send Application / Inquiry</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
