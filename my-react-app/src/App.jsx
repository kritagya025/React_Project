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
import Loader from './components/Loader';

import JoinForm from './pages/JoinForm';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ProjectProvider } from './context/ProjectContext';

const routeTitles = {
  '/': 'Home',
  '/about': 'About',
  '/contact': 'Contact',
  '/login': 'Login',
  '/signup': 'Signup',
  '/explore': 'Explore',
  '/ai': 'AI Mode',
  '/join': 'Join',
};

function getRouteTitle(pathname) {
  if (pathname.startsWith('/explore/')) {
    return 'Project';
  }

  return routeTitles[pathname] ?? 'Next Page';
}

function AppShell() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isRouteTransitionActive, setIsRouteTransitionActive] = useState(false);
  const activeRouteTitle = getRouteTitle(location.pathname);

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
    }, 700);

    return () => {
      window.clearTimeout(transitionTimer);
    };
  }, [location.key]);

  return (
    <div className="container">
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
            <h1>Ideaforge</h1>
          </div>
          <nav className="header-nav">
            <Link to="/">Home</Link>
            <Link to="/explore">Explore</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>
          <div className="header-actions">
            <Link to="/ai" className="ai-btn">AI Mode</Link>
            <Link to="/login" className="login-btn">Login</Link>
            <Link to="/signup" className="signup-btn">Signup</Link>
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
            <Route path="/join" element={<JoinForm onClose={() => window.history.back()} />} />
          </Routes>
          <div
            className={`route-transition-overlay ${isRouteTransitionActive ? 'is-visible' : ''}`}
            aria-hidden={!isRouteTransitionActive}
          >
            <div className="route-transition-card">
              <span className="route-transition-kicker">Switching pages</span>
              <h2>{activeRouteTitle}</h2>
              <p>Preparing a smoother handoff for your next screen.</p>
              <Loader />
              <div className="route-transition-progress" />
            </div>
          </div>
        </div>
      </main>

      <footer className="site-footer">
        <div className="site-footer-inner">
          <div className="footer-brand">
            <h2>Ideaforge</h2>
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
    <ProjectProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </ProjectProvider>
  );
}

export default App;
