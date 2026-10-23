import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import './App.css'
import App from './App.jsx'
import EventsPage from './pages/EventsPage.jsx'
import EventDetailPage from './pages/EventDetailPage.jsx'
import ResourcesPage from './pages/ResourcesPage.jsx'
import LeaderboardPage from './pages/LeaderboardPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/"              element={<App />} />
        <Route path="/events"        element={<EventsPage />} />
        <Route path="/events/:slug"  element={<EventDetailPage />} />
        <Route path="/bootcamp"      element={<Navigate to="/events/7-day-java-logic-bootcamp" replace />} />
        <Route path="/register"      element={<Navigate to="/events/7-day-java-logic-bootcamp" replace />} />
        <Route path="/resources"     element={<ResourcesPage />} />
        <Route path="/leaderboard"   element={<LeaderboardPage />} />
        <Route path="*"              element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
