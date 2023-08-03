const express = require('express');
const sqlite3 = require('sqlite3').verbose(); // import sqlite3 package
const bodyParser = require('body-parser'); // import body-parser for handling JSON requests
const app = express();
const port = process.env.PORT || 3001;

// Use body-parser to handle JSON requests
app.use(bodyParser.json());

// Connect to SQLite database
let db = new sqlite3.Database('./db/words.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the words database.');
});

// Create the words table if not exists
db.run(`
  CREATE TABLE IF NOT EXISTS words (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    word TEXT NOT NULL,
    word_class TEXT,
    meaning TEXT,
    library TEXT,
    total_review_count INTEGER DEFAULT 0,
    total_error_count INTEGER DEFAULT 0,
    next_review_date TEXT,
    interval INTEGER DEFAULT 1,
    last_review_date TEXT,
    examples TEXT
  )
`);

// Implement GET /words to fetch all words for review
app.get('/words', (req, res) => {
  db.all('SELECT * FROM words', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Implement POST /words to add a new word to the database
app.post('/words', (req, res) => {
  const word = req.body;
  const sql = 'INSERT INTO words (word, word_class, meaning, library) VALUES (?, ?, ?, ?)';
  const params = [word.word, word.word_class, word.meaning, word.library];
  db.run(sql, params, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

// Implement PUT /words/:id to update a word in the database
app.put('/words/:id', (req, res) => {
  const id = req.params.id;
  const word = req.body;
  const sql = 'UPDATE words SET word = ?, word_class = ?, meaning = ?, library = ? WHERE id = ?';
  const params = [word.word, word.word_class, word.meaning, word.library, id];
  db.run(sql, params, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: 'Word updated successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
});
