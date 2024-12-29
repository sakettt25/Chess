import React, { useState } from "react";
import Header from "./assets/Header";
import Footer from "./assets/Footer";
import ChessBoard from "./assets/ChessBoard"; 
const App = () => {
  // State to track the chessboard's pieces
  const initialBoard = [
    "black-rook", "black-knight", "black-bishop", "black-queen", "black-king", "black-bishop", "black-knight", "black-rook",
    "black-pawn", "black-pawn", "black-pawn", "black-pawn", "black-pawn", "black-pawn", "black-pawn", "black-pawn",
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    "white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn",
    "white-rook", "white-knight", "white-bishop", "white-queen", "white-king", "white-bishop", "white-knight", "white-rook",
  ];

  const [boardState, setBoardState] = useState(initialBoard);

  // Function to reset the game by refreshing the page
  const resetGame = () => {
    window.location.reload(); 
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-repeat relative sm:bg-fixed sm:bg-center"
      style={{
        backgroundImage: `url(/background.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center", 
      }}
    >
      <Header />

      {/* Chessboard */}
      <div className="relative z-10 mt-10 w-[600px] sm:w-[90vw]">
        <ChessBoard boardState={boardState} setBoardState={setBoardState} />
      </div>

      {/* Reset Button */}
      <button
        id="reset-btn"
        className="bg-green-600 text-white px-5 py-2 rounded mt-4 hover:bg-green-700"
        onClick={resetGame}
      >
        Reset Game
      </button>

      <Footer />
    </div>
  );
};

export default App;
