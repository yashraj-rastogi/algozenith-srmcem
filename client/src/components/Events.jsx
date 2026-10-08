import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Tag, ExternalLink, RefreshCw, Filter } from 'lucide-react';
import { api } from '../services/api';

export const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [sourceInfo, setSourceInfo] = useState('');

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
          <div className="section-badge">Upcoming & Past Engagements</div>
          <h2 className="section-title">
            Club Events & <span className="gradient-text">Coding Sprints</span>
          </h2>
          <p className="section-desc">
            Participate in our weekly hack sessions, competitive programming leagues, and industry guest lectures hosted at SRMCEM.
          </p>

          {/* Filter Pills */}
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
                  <a
                    href={event.registrationUrl || '#contact'}
                    target={event.registrationUrl?.startsWith('http') ? '_blank' : '_self'}
                    rel="noreferrer"
                    className="btn btn-secondary btn-full"
                  >
                    <span>{event.status === 'upcoming' ? 'Register Now' : 'View Editorial'}</span>
                    <ExternalLink size={15} />
                  </a>
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
