import React, { useState, useEffect } from "react";

function AIMode() {
  const [input, setInput] = useState("");
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  // ⚠️ Replace with your API key OR use .env
  const API_KEY = "AIzaSyCI4LSgpDCb53BGHdiPD-sRFxNAjPwZ59A";

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
  }, [prompt]); // 🔥 useEffect triggers API call

  const handleAsk = () => {
    if (!input.trim()) return;
    setPrompt(input); // triggers useEffect
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>AI Mode</h2>

      <input
        type="text"
        placeholder="Ask something..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "300px", marginRight: "10px" }}
      />

      <button onClick={handleAsk}>Ask AI</button>

      {loading && <p>Thinking...</p>}

      {response && (
        <div style={{ marginTop: "20px" }}>
          <strong>Response:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default AIMode;