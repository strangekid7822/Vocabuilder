import React, { useState } from 'react'; // Removed useContext and WordContext as they are not needed now
import { Form, Button } from 'react-bootstrap';
import './WordForm.css';

const WordForm = () => {
    const [newWord, setNewWord] = useState('');

    const handleSubmit = async (event) => { // Made the function async
        event.preventDefault();

        // Create an object to hold the word data
        const wordData = {
            word: newWord, // You can add other fields here as needed (word_class, meaning, etc.)
        };

        // Send a POST request to the server with the word data
        const response = await fetch('/words', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(wordData),
        });

        // Handle the response (e.g., show a success message, clear the form, etc.)
        if (response.ok) {
            setNewWord(''); // Clear the form input
            alert('Word added successfully!'); // Show a success message (you can replace this with a more user-friendly UI)
        } else {
            alert('Failed to add word. Please try again.'); // Show an error message
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
