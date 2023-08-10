import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './WordForm.css';

const WordForm = ({ setWords }) => {
  const [newWord, setNewWord] = useState('');
  const [wordClass, setWordClass] = useState('');
  const [meaning, setMeaning] = useState('');
  const [currentPhase, setCurrentPhase] = useState(1); // New state for tracking current input phase

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Based on the current phase, proceed to the next phase or save to database
    if (currentPhase === 1) {
      setCurrentPhase(2);
    } else if (currentPhase === 2) {
      setCurrentPhase(3);
    } else if (currentPhase === 3) {
      const wordData = {
        word: newWord,
        word_class: wordClass,
        meaning: meaning
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
        setCurrentPhase(1); // Reset the phase

        // Fetch the updated word list from the server
        const response = await fetch('/words');
        const data = await response.json();
        setWords(data);

        alert('Word added successfully!');
      } else {
        alert('Failed to add word. Please try again.');
      }
    }
  };

  // Depending on the current phase, render the appropriate input
  let inputLabel, inputValue, inputSetter, placeholder;
  if (currentPhase === 1) {
    inputLabel = "请输入这个新单词";
    inputValue = newWord;
    inputSetter = setNewWord;
    placeholder = "在这里输入";
  } else if (currentPhase === 2) {
    inputLabel = "请输入词性";
    inputValue = wordClass;
    inputSetter = setWordClass;
    placeholder = "在这里输入";
  } else if (currentPhase === 3) {
    inputLabel = "请输入汉意";
    inputValue = meaning;
    inputSetter = setMeaning;
    placeholder = "在这里输入";
  }

    return (
    <Form onSubmit={handleSubmit}>
        <Form.Group>
        <div className="label-container">
        <Form.Label className="form-label">{inputLabel}</Form.Label>
        </div>
        <Form.Control 
            type="text" 
            value={inputValue} 
            onChange={e => inputSetter(e.target.value)} 
            className='text-align-c'
            placeholder={placeholder} 
        />
        </Form.Group>

        {/* Wrap the buttons in a container */}
        <div className="buttons-container">
        {currentPhase !== 1 && (
            <Button variant="secondary" onClick={() => setCurrentPhase(currentPhase - 1)}>
            返回
            </Button>
        )}
        <Button variant="primary" type="submit">
            {currentPhase === 3 ? '保存' : '继续'}
        </Button>
        </div>
    </Form>
    );
};

export default WordForm;
