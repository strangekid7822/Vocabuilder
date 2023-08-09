const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

let db = new sqlite3.Database('./db/words.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the words database.');
});

// Updated the table creation SQL to include new fields and changed the order as desired
db.run(`
  CREATE TABLE IF NOT EXISTS words (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    word TEXT NOT NULL,
    word_class TEXT,
    meaning TEXT,
    library TEXT,
    book_name TEXT,
    unit_name TEXT,
    audio_file_path TEXT,
    total_review_count INTEGER DEFAULT 0,
    total_error_count INTEGER DEFAULT 0,
    last_review_date TEXT,
    next_review_date TEXT,
    interval INTEGER DEFAULT 1,
    examples TEXT
  )
`);

app.get('/words', (req, res) => {
  db.all('SELECT * FROM words', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Updated to handle the new fields when adding a new word
app.post('/words', (req, res) => {
  const word = req.body;
  const sql = `
    INSERT INTO words (word, word_class, meaning, library, book_name, unit_name, audio_file_path) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [
    word.word, 
    word.word_class, 
    word.meaning, 
    word.library,
    word.book_name,
    word.unit_name,
    word.audio_file_path
  ];
  db.run(sql, params, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

// Updated to handle the new fields when updating a word
app.put('/words/:id', (req, res) => {
  const id = req.params.id;
  const word = req.body;
  const sql = `
    UPDATE words SET word = ?, word_class = ?, meaning = ?, library = ?, book_name = ?, unit_name = ?, audio_file_path = ? 
    WHERE id = ?
  `;
  const params = [
    word.word, 
    word.word_class, 
    word.meaning, 
    word.library,
    word.book_name,
    word.unit_name,
    word.audio_file_path,
    id
  ];
  db.run(sql, params, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: 'Word updated successfully' });
  });
});

app.get('/', (req, res) => {
  res.send('Hello from the root endpoint!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
});
