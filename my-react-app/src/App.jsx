import React from 'react';
import './App.css';

function App() {
  return (
    <div className="container">
      <header className="header">
        <h1>DevConnect</h1>
        <nav>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main className="main-content">
        <h2>Welcome to DevConnect</h2>
        <p>A simple place for developers to meet and share ideas.</p>
        <button className="primary-button">Join Now</button>
      </main>

    </div>
  );
}

export default App;
