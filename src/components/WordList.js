import React from 'react';  // remove useContext
import { ListGroup } from 'react-bootstrap';
// remove WordContext

const WordList = ({ words }) => {  // accept words as a prop
    return (
        <ListGroup>
            {words.map((word) => (
                <ListGroup.Item key={word.id}>{word.word}</ListGroup.Item>  // use word.id as key and word.word as the item
            ))}
        </ListGroup>
    );
};

export default WordList;