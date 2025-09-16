import React from 'react';
import axios from 'axios';

import './App.css';


function App() {

  const [letters, setLetters] = React.useState("");
  const [foundWords, setFoundWords] = React.useState([]);

  const handleInputChange = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/search', { letters: letters.toLowerCase() });
      setFoundWords(res.data.foundWords);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Group foundWords by word length
  const groupedWords = foundWords.reduce((acc, word) => {
    const len = word.length;
    if (!acc[len]) acc[len] = [];
    acc[len].push(word);
    return acc;
  }, {});

  const [error, setError] = React.useState("");

  return (
    <div className="App" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #a2cfff 0%, #e0ecff 100%)' }}>
      <div style={{ textAlign: 'center', marginTop: '0px' }}>
        <img
          src="../Boggle-iphone-logo.png"
          alt="Boggle iPhone Logo"
          style={{ width: '200px', height: '100px', marginBottom: '10px' }}
        />
      </div>
      <h1 style={{ textAlign: 'center' }}>Boggle Quick Search</h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (letters.length !== 6) {
            setError("Please enter exactly 6 letters.");
            setFoundWords([]);
            return;
          }
          setError("");
          handleInputChange(e);
        }}
        style={{ textAlign: 'center', marginBottom: '20px' }}
      >
        <input
          type="text"
          value={letters}
          onChange={(e) => setLetters(e.target.value)}
          maxLength={6}
          placeholder="Enter 6 letters"
          style={{ padding: '10px', fontSize: '16px', width: '200px' }}
          required
        />
        <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', marginLeft: '10px' }}>Search</button>
      </form>
      {error && (
        <div style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>
          {error}
        </div>
      )}

      <div style={{ textAlign: 'center' }}>
        <h2>Found Words:</h2>
        {foundWords.length > 0 ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: '30px',
            flexWrap: 'wrap',
            marginTop: '20px'
          }}>
            {[3, 4, 5, 6].map(len => (
              groupedWords[len] && groupedWords[len].length > 0 ? (
                <div key={len} style={{
                  background: 'rgba(255,255,255,0.85)',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                  padding: '20px',
                  minWidth: '180px'
                }}>
                  <h3 style={{ marginTop: 0 }}>{len}-letter words</h3>
                  <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                    {groupedWords[len].map((word, idx) => (
                      <li key={idx} style={{ margin: '5px 0' }}>{word}</li>
                    ))}
                  </ul>
                </div>
              ) : null
            ))}
          </div>
        ) : (
          <p>No words found. Try different letters!</p>
        )}
      </div>
    </div>
  );
}
export default App;
