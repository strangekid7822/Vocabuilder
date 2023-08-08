import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './WordForm.css';

// Receive setWords as a prop
const WordForm = ({ setWords }) => {
  const [newWord, setNewWord] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const wordData = {
      word: newWord,
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
      // After adding a new word, fetch the updated word list from the server
      const response = await fetch('/words');
      const data = await response.json();
      // Update the state with the updated word list
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

      <Button variant="primary" type="submit">
        提交
      </Button>
    </Form>
  );
};

export default WordForm;
