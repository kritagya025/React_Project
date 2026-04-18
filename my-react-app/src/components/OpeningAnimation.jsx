import React from "react";
import "../Styles/OpeningAnimation.css";

const greetings = [
  { language: "Hindi", text: "नमस्ते" },
  { language: "German", text: "Hallo" },
  { language: "Japanese", text: "こんにちは" },
  { language: "French", text: "Bonjour" },
  { language: "Spanish", text: "Hola" },
];

function OpeningAnimation({ isExiting = false }) {
  return (
    <section
      className={`opening-animation ${isExiting ? "is-exiting" : ""}`}
      aria-label="Welcome animation"
    >
      <div className="opening-animation-bg" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="opening-animation-inner">
        <div className="opening-mark" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <div className="opening-greeting-stack">
          {greetings.map((greeting, index) => (
            <div
              className="opening-greeting"
              style={{ "--greeting-index": index }}
              key={greeting.language}
            >
              <span>{greeting.language}</span>
              <strong>{greeting.text}</strong>
            </div>
          ))}
        </div>

        <p className="opening-caption">IdeaForge</p>
      </div>
    </section>
  );
}

export default OpeningAnimation;
