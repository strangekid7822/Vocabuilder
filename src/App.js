import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import NewWordPage from './pages/NewWordPage';
import GamePage from './pages/GamePage';
import QuizPage from './pages/QuizPage';
import './App.css';

function App() {
  // Moved the state of words to the App component
  const [words, setWords] = useState([]);

  // Moved the fetchWords function to the App component
  useEffect(() => {
    const fetchWords = async () => {
      const response = await fetch('/words');
      const data = await response.json();
      setWords(data);
    };

    fetchWords();
  }, []);

  return (
    <Router>
      <Navbar />
      <div className='main-container'>
        <Routes>
          {/* Passed down the words and setWords as props */}
          <Route path="/" element={<NewWordPage words={words} setWords={setWords} />} />
          <Route path="/new-word" element={<NewWordPage words={words} setWords={setWords} />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/quiz" element={<QuizPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
