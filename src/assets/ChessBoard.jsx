import React, { useState } from "react";
import Square from "./Square"; // The square component to render each square of the board
import { getValidMoves, movePiece, isGameOver, } from "./Logic"; // Corrected the import for named exports
import Toggle from "./Toggle"; // Import the Toggle component to show whose turn it is


const ChessBoard = () => {
  const initialBoard = [
    "black-rook", "black-knight", "black-bishop", "black-queen", "black-king", "black-bishop", "black-knight", "black-rook",
    "black-pawn", "black-pawn", "black-pawn", "black-pawn", "black-pawn", "black-pawn", "black-pawn", "black-pawn",
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    "white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn",
    "white-rook", "white-knight", "white-bishop", "white-queen", "white-king", "white-bishop", "white-knight", "white-rook",
  ];

  const [boardState, setBoardState] = useState(initialBoard); // Stores the current board state
  const [selectedSquare, setSelectedSquare] = useState(null); // Tracks the selected square for a move
  const [highlightedSquares, setHighlightedSquares] = useState([]); // Stores the valid moves for the selected piece
  const [turn, setTurn] = useState("white"); // Tracks whose turn it is ("white" or "black")

  // Handle a square click
  const handleSquareClick = (index) => {
    const piece = boardState[index];

    if (selectedSquare === null) {
      // If no piece is selected, check if the player clicked on their piece
      if (piece && piece.split("-")[0] === turn) {
        setSelectedSquare(index); // Select the piece
        const validMoves = getValidMoves(index, piece, boardState); // Get valid moves for the selected piece
        setHighlightedSquares(validMoves); // Highlight the valid moves
      }
    } else {
      // A piece is selected, check if the move is valid
      if (highlightedSquares.includes(index)) {
        const newBoardState = movePiece(boardState, selectedSquare, index); // Move the piece
        setBoardState(newBoardState); // Update the board state

        // Check for game over (checkmate or stalemate)
        if (isGameOver(selectedSquare, newBoardState, turn)) {
          const winner = turn === "white" ? "White" : "Black";
          alert(`${winner} wins!`);
        }

        setTurn(turn === "white" ? "black" : "white"); // Switch turns
      }
      setSelectedSquare(null); // Deselect after move
      setHighlightedSquares([]); // Clear the highlights
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Add the Toggle component above the chess board */}
      <Toggle turn={turn} />

      {/* Chess board grid */}
      <div className="grid grid-cols-8 w-[50%] mx-auto gap-1 mt-6"> {/* Added margin top for spacing */}
        {boardState.map((piece, index) => {
          const isDarkSquare = Math.floor(index / 8) % 2 === index % 2; // Determine if the square is dark or light
          const isHighlighted = highlightedSquares.includes(index); // Check if the square should be highlighted
          return (
            <Square
              key={index}
              piece={piece}
              isDark={isDarkSquare}
              isHighlighted={isHighlighted}
              onClick={() => handleSquareClick(index)} // Handle click to move piece
            />
          );
        })}
      </div>
    </div>
  );
};

export default ChessBoard;

