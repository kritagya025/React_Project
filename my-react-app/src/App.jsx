import React from 'react';
import './App.css';
import About from './pages/About';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="container">
      <header className="header">
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />  
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
