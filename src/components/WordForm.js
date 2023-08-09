import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './WordForm.css';

const WordForm = ({ setWords }) => {
  const [newWord, setNewWord] = useState('');
  const [wordClass, setWordClass] = useState(''); // New field for word class
  const [meaning, setMeaning] = useState(''); // New field for meaning
  const [library, setLibrary] = useState(''); // New field for library
  const [bookName, setBookName] = useState(''); // New field for book name
  const [unitName, setUnitName] = useState(''); // New field for unit name
  const [audioFilePath, setAudioFilePath] = useState(''); // New field for audio file path

  const handleSubmit = async (event) => {
    event.preventDefault();

    const wordData = {
      word: newWord,
      word_class: wordClass,
      meaning: meaning,
      library: library,
      book_name: bookName,
      unit_name: unitName,
      audio_file_path: audioFilePath
    };

    const response = await fetch('/words', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(wordData),
    });

    if (response.ok) {
      setNewWord('');
      setWordClass('');
      setMeaning('');
      setLibrary('');
      setBookName('');
      setUnitName('');
      setAudioFilePath('');

      // After adding a new word, fetch the updated word list from the server
      const response = await fetch('/words');
      const data = await response.json();
      setWords(data);

      alert('Word added successfully!');
    } else {
      alert('Failed to add word. Please try again.');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>新词</Form.Label>
        <Form.Control type="text" value={newWord} onChange={e => setNewWord(e.target.value)} placeholder="Enter new word" />
      </Form.Group>

      <Form.Group>
        <Form.Label>词性</Form.Label>
        <Form.Control type="text" value={wordClass} onChange={e => setWordClass(e.target.value)} placeholder="Enter word class" />
      </Form.Group>

      <Form.Group>
        <Form.Label>意思</Form.Label>
        <Form.Control type="text" value={meaning} onChange={e => setMeaning(e.target.value)} placeholder="Enter meaning" />
      </Form.Group>

      <Form.Group>
        <Form.Label>来源</Form.Label>
        <Form.Control type="text" value={library} onChange={e => setLibrary(e.target.value)} placeholder="Enter library" />
      </Form.Group>

      <Form.Group>
        <Form.Label>书名</Form.Label>
        <Form.Control type="text" value={bookName} onChange={e => setBookName(e.target.value)} placeholder="Enter book name (comma-separated if multiple)" />
      </Form.Group>

      <Form.Group>
        <Form.Label>单元名</Form.Label>
        <Form.Control type="text" value={unitName} onChange={e => setUnitName(e.target.value)} placeholder="Enter unit name (comma-separated if multiple)" />
      </Form.Group>

      <Form.Group>
        <Form.Label>音频文件路径</Form.Label>
        <Form.Control type="text" value={audioFilePath} onChange={e => setAudioFilePath(e.target.value)} placeholder="Enter audio file path" />
      </Form.Group>

      <Button variant="primary" type="submit">
        提交
      </Button>
    </Form>
  );
};

export default WordForm;
