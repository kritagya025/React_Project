import React, { useState, useEffect } from "react";
import "../Styles/AIMode.css";

function AIMode() {
  const [input, setInput] = useState("");
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = "API KEY YAHA DAALO"; /*DAALO APNI API KEY YAHAN*/

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
        console.log("API RESPONSE:", data);

        if (data.error) {
          setResponse("Error: " + data.error.message);
          return;
        }

        const text =
          data.candidates?.[0]?.content?.parts?.[0]?.text ||
          "No response from AI";

        setResponse(text);
      } catch (err) {
        console.error(err);
        setResponse("Something went wrong while fetching AI response");
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
  <div className="ai-container">
    <h2 className="ai-title">AI Mode</h2>

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
        <strong>Response:</strong>
        <p>{response}</p>
      </div>
    )}
  </div>
);
}

export default AIMode;