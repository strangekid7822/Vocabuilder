// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import NewWordPage from './pages/NewWordPage';
import GamePage from './pages/GamePage';
import QuizPage from './pages/QuizPage';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<NewWordPage />} />
        <Route path="/new-word" element={<NewWordPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/quiz" element={<QuizPage />} />
      </Routes>
    </Router>
  );
}

export default App;
