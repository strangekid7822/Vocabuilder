import React, { useContext } from 'react';
import { ListGroup } from 'react-bootstrap';
import { WordContext } from '../WordContext';

const WordList = () => {
    const [words, setWords] = useContext(WordContext);

    return (
        <ListGroup>
            {words.map((word, index) => (
                <ListGroup.Item key={index}>{word}</ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default WordList;