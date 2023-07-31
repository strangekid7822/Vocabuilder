# Vocabuilder

Vocabuilder is a React application designed to help users expand their vocabulary. 

## Current Status

As of now, we have:

- Set up a basic project structure with components for the Navbar, WordForm, and WordList, as well as pages for NewWord, Game, and Quiz.
- Installed and set up `react-router-dom` for routing, and `react-bootstrap` for UI design.
- Resolved issues related to missing dependencies.
- Set up a basic navigation bar using `react-bootstrap`.
- Fixed routing issues in the `App.js` file.
- Installed and set up a local SQLite database for persisting user data.
- Created a server with Express.js to handle API requests to the database.
- Designed a comprehensive table structure in the SQLite database to store word data, including review and error counts.

## Next Steps

- Write API endpoints to interact with the SQLite database, allowing the application to create, read, update, and delete words.
- Connect the WordForm and WordList components to these API endpoints, allowing the user interface to interact with the stored data.
- Design and implement the Game and Quiz pages, which will utilize the stored word data.
- Develop a strategy for reviewing words based on their review and error counts, to optimize the user's learning.
