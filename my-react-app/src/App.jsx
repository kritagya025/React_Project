import React from 'react';
import './App.css';
import About from './components/about';

function App() {
  return (
    <div className="container">
      <header className="header">
        <h1>DevConnect</h1>
        <nav>
          <a href="#home">Home</a>
          <a href="about.jsx">About</a>
          <a href="#contact">Contact</a>
        </nav>
      
      </header>
<About />
    </div>
  );
}

export default App;
