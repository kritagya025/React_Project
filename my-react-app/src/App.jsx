import React from 'react';
import './App.css';
import About from './components/about';
import Home from './components/Home';
import Contact from './components/Contact';
import { BrowserRouter, Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="container">
      <header className="header">
        <h1>DevConnect</h1>
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
