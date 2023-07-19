// src/WordContext.js

import React, { createContext, useState } from 'react';

export const WordContext = createContext();

export const WordProvider = (props) => {
    const [words, setWords] = useState([]);

    return (
        <WordContext.Provider value={[words, setWords]}>
            {props.children}
        </WordContext.Provider>
    );
};