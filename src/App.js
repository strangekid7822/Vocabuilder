// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import NewWordPage from './pages/NewWordPage';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/new-word" element={<NewWordPage />} />
        <Route path="/game" element={<div>Game Page</div>} />
        <Route path="/quiz" element={<div>Quiz Page</div>} />
      </Routes>
    </Router>
  );
}

export default App;
