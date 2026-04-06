import React, { useEffect, useState } from 'react';
import './App.css';
import About from './pages/about';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AIMode from './pages/AIMode';

import JoinForm from './pages/JoinForm';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';

function AppShell() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="container">
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/ai" element={<AIMode />} />
          <Route path="/join" element={<JoinForm onClose={() => window.history.back()} />} />
        </Routes>
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
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
