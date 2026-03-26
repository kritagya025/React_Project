import React from 'react';
import './App.css';
import About from './pages/about';
import Home from './pages/Home';
import Contact from './pages/Contact';
import { BrowserRouter, Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="container">
      <header className="header">
        <h1>Ideaforge</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
