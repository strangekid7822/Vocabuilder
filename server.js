const express = require('express');
const sqlite3 = require('sqlite3').verbose(); // import sqlite3 package
const app = express();
const port = process.env.PORT || 3001;

// Connect to SQLite database
let db = new sqlite3.Database('./db/words.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the words database.');
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
});
