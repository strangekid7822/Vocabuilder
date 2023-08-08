import React from 'react';
import WordForm from '../components/WordForm';
import WordList from '../components/WordList';

// Receive words and setWords as props
const NewWordPage = ({ words, setWords }) => {
  return (
    <div>
      {/* Pass down the words and setWords to the WordForm and WordList components */}
      <WordForm setWords={setWords} />
      <WordList words={words} />
    </div>
  );
};

export default NewWordPage;
