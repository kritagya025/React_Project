import React, { useEffect, useState } from 'react';
import './App.css';
import About from './pages/about';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AIMode from './pages/AIMode';
import Explore from './pages/Explore';
import ProjectDetail from './pages/ProjectDetail';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Works from './pages/Works';
import Loader from './components/Loader';
import OpeningAnimation from './components/OpeningAnimation';

import JoinForm from './pages/JoinForm';
import { BrowserRouter, Routes, Route, Link, NavLink, useLocation } from 'react-router-dom';
import { ProjectProvider } from './context/ProjectContext';
import { AuthProvider, useAuth } from './context/AuthContext';

function AppShell() {
  const location = useLocation();
  const { isAuthenticated, logout, loading: authLoading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isRouteTransitionActive, setIsRouteTransitionActive] = useState(false);
  const [openingPhase, setOpeningPhase] = useState('running');

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  useEffect(() => {
    setIsRouteTransitionActive(true);

    const transitionTimer = window.setTimeout(() => {
      setIsRouteTransitionActive(false);
    }, 500);

    return () => {
      window.clearTimeout(transitionTimer);
    };
  }, [location.key]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const holdDuration = prefersReducedMotion ? 900 : 3000;
    const exitDuration = prefersReducedMotion ? 60 : 400;

    const exitTimer = window.setTimeout(() => {
      setOpeningPhase('exiting');
    }, holdDuration);

    const doneTimer = window.setTimeout(() => {
      setOpeningPhase('done');
    }, holdDuration + exitDuration);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
    };
  }, []);

  return (
    <div className="container">
      {openingPhase !== 'done' && (
        <OpeningAnimation isExiting={openingPhase === 'exiting'} />
      )}
      <div className="mobile-brand" aria-hidden="true">
        <span>IdeaForge</span>
      </div>

      <button
        type="button"
        className="mobile-menu-toggle"
        aria-expanded={mobileMenuOpen}
        aria-controls="site-navigation"
        aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        onClick={() => setMobileMenuOpen((current) => !current)}
      >
        <span />
        <span />
        <span />
      </button>

      {mobileMenuOpen && (
        <button
          type="button"
          className="mobile-nav-backdrop"
          aria-label="Close navigation menu"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <header className={`header ${mobileMenuOpen ? 'header-open' : ''}`} id="site-navigation">
          <div className="header-logo">
            <h1>IdeaForge</h1>
          </div>
          <nav className="header-nav">
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : undefined)} end>Home</NavLink>
            <NavLink to="/explore" className={({ isActive }) => (isActive ? 'active-link' : undefined)}>Explore</NavLink>
            <NavLink to="/about" className={({ isActive }) => (isActive ? 'active-link' : undefined)}>About</NavLink>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active-link' : undefined)}>Contact</NavLink>
          </nav>
          <div className="header-actions">
            <Link to="/ai" className="ai-btn">AI Mode</Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="login-btn">Dashboard</Link>
                <Link to="/works" className="login-btn">Works</Link>
                <Link to="/profile" className="login-btn">Profile</Link>
                <button type="button" className="signup-btn logout-btn" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="login-btn">Login</Link>
                <Link to="/signup" className="signup-btn">Signup</Link>
              </>
            )}
          </div>
      </header>

      <main className="site-main">
        <div className={`route-stage ${isRouteTransitionActive ? 'route-stage-transitioning' : ''}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/explore/:id" element={<ProjectDetail />} />
            <Route path="/ai" element={<AIMode />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/works" element={<Works />} />
            <Route path="/join" element={<JoinForm onClose={() => window.history.back()} />} />
          </Routes>
          <div
            className={`route-transition-overlay ${isRouteTransitionActive ? 'is-visible' : ''}`}
            aria-hidden={!isRouteTransitionActive}
          >
            <Loader />
          </div>
        </div>
      </main>

      <footer className="site-footer">
        <div className="site-footer-inner">
          <div className="footer-brand">
            <h2>IdeaForge</h2>
            <p>
              A collaborative space for developers to connect, validate ideas,
              and ship together.
            </p>
          </div>

          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/ai">AI Mode</Link>
          </div>

          <div className="footer-meta">
            <span>Build in public</span>
            <span>Ship with people</span>
            <span>Grow with feedback</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ProjectProvider>
        <BrowserRouter>
          <AppShell />
        </BrowserRouter>
      </ProjectProvider>
    </AuthProvider>
  );
}

export default App;
