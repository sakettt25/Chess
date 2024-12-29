CSS Chess Game

This is a chess game built using React and styled with Tailwind CSS. The game features a responsive design and is designed for an interactive chess-playing experience.

Features

Interactive chessboard with drag-and-drop functionality.

Styled with Tailwind CSS for a clean, responsive layout.

Reset functionality to restart the game.

Modular components for scalability and maintenance.

Getting Started

This project was bootstrapped with Create React App.

Prerequisites

Ensure you have the following installed:

Node.js (>= 14.x recommended)

npm (comes with Node.js)

Installation

Clone the repository:

git clone https://github.com/your-username/chess-game.git
cd chess-game

Install dependencies:

npm install

Start the development server:

npm start

The app will run in development mode at http://localhost:3000.

Building for Production

To create a production-ready build, run:

npm run build

This will generate optimized files in the build/ directory, ready for deployment.

Project Structure

.
├── public
│   ├── index.html
│   └── background.jpg   # Background image for the app
├── src
│   ├── assets
│   │   ├── ChessBoard.jsx  # Chessboard component
│   │   ├── Header.jsx      # Header component
│   │   ├── Footer.jsx      # Footer component
│   │   ├── Square.jsx      # Individual square logic
│   │   └── images/         # Chess piece images
│   ├── App.jsx             # Main app component
│   ├── index.css           # Tailwind CSS integration
│   └── index.js            # Entry point
└── tailwind.config.js      # Tailwind CSS configuration

Usage

Click on pieces to move them around the board.

Use the Reset Game button to restart the game.

Styling with Tailwind CSS

The project uses Tailwind CSS for utility-first styling. Make sure to:

Add Tailwind to your CSS:

@tailwind base;
@tailwind components;
@tailwind utilities;

Configure Tailwind in tailwind.config.js to scan all your components for classes:

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

Available Scripts

npm start

Runs the app in development mode at http://localhost:3000.

npm run build

Builds the app for production in the build/ directory.

npm test

Launches the test runner in interactive watch mode.

License

This project is licensed under the MIT License.

Enjoy playing chess with your beautifully styled app! If you encounter any issues or have suggestions for improvement, feel free to open an issue or submit a pull request.

