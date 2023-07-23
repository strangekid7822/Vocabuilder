import React, { useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { WordContext } from '../WordContext';
import './WordForm.css';

const WordForm = () => {
    const [words, setWords] = useContext(WordContext);
    const [newWord, setNewWord] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setWords([...words, newWord]);
        setNewWord('');
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
