import React, { useEffect, useState } from "react";
import "../Styles/AIMode.css";

function AIMode() {
  const [input, setInput] = useState("");
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = ""; /* Add your API key here */

  useEffect(() => {
    if (!prompt) return;

    const fetchAI = async () => {
      try {
        setLoading(true);
        setResponse("");

        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${API_KEY}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [{ text: prompt }],
                },
              ],
            }),
          }
        );

        const data = await res.json();

        if (data.error) {
          setResponse(`Error: ${data.error.message}`);
          return;
        }

        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI";
        setResponse(text);
      } catch (err) {
        console.error(err);
        setResponse("Something went wrong while fetching the AI response.");
      } finally {
        setLoading(false);
      }
    };

    fetchAI();
  }, [prompt]);

  const handleAsk = () => {
    if (!input.trim()) return;
    setPrompt(input);
  };

  return (
    <div className="ai-container page-shell">
      <section className="ai-card ai-intro page-fade page-fade-1">
        <div className="section-tag page-fade page-fade-1">AI Mode</div>
        <h2 className="ai-title page-fade page-fade-2">Turn rough ideas into clearer next steps.</h2>
        <p>
          Use AI Mode to brainstorm, refine concepts, or unblock yourself when
          you want a quick collaborator inside the app.
        </p>
      </section>

      <section className="ai-card page-fade page-fade-3">
        <div className="ai-input-box">
          <input
            className="ai-input"
            type="text"
            placeholder="Ask something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button className="ai-button" onClick={handleAsk}>
            Ask AI
          </button>
        </div>

        {loading && <p className="ai-loading">Thinking...</p>}

        {response && (
          <div className="ai-response">
            <strong>Response</strong>
            <p>{response}</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default AIMode;

