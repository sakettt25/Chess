// Logic.jsx

// Function to move a piece on the board
export const movePiece = (boardState, fromIndex, toIndex) => {
    const newBoardState = [...boardState];
  
    // Move the piece from the 'fromIndex' to the 'toIndex'
    newBoardState[toIndex] = newBoardState[fromIndex]; // Place the piece at the new position
    newBoardState[fromIndex] = null; // Remove the piece from the original position
  
    return newBoardState;
  };
  
  // Function to get valid moves for a piece (simplified for the example)
  export const getValidMoves = (index, piece, boardState) => {
    const moves = [];
    const row = Math.floor(index / 8);
    const col = index % 8;
  
    // Pawn movement: Can move 1 square forward, or 2 squares on the first move
    if (piece && piece.includes("pawn")) {
      const isWhitePawn = piece.startsWith("white");
      const direction = isWhitePawn ? -1 : 1; // White moves up (-1), Black moves down (+1)
      const startingRow = isWhitePawn ? 5 : 1; // White starts from row 6, Black from row 1
      const step1 = isWhitePawn ? -8 : 8; // Step 1: white moves up 8, black moves down 8
      const step2 = isWhitePawn ? -16 : 16; // Step 2: white moves up 16, black moves down 16
  
      // First move: Can move 2 squares forward
      if (row === startingRow) {
        // Check if the square 2 spaces ahead is empty
        if (!boardState[index + step1] && !boardState[index + step2]) {
          moves.push(index + step2); // Move two squares forward
        }
      }
  
      // Regular move: Can move 1 square forward
      if (row + direction >= 0 && row + direction < 8 && !boardState[index + step1]) {
        moves.push(index + step1); // Move one square forward
      }
  
      // Capture logic (diagonal moves)
      if (col > 0 && boardState[index + step1 - 1] && boardState[index + step1 - 1].startsWith(isWhitePawn ? "black" : "white")) {
        moves.push(index + step1 - 1); // Capture diagonally left
      }
      if (col < 7 && boardState[index + step1 + 1] && boardState[index + step1 + 1].startsWith(isWhitePawn ? "black" : "white")) {
        moves.push(index + step1 + 1); // Capture diagonally right
      }
    }
  
    // King movement: Can move one square in any direction
    if (piece && piece.includes("king")) {
      const kingMoves = [
        index - 1, index + 1, index - 8, index + 8, // Horizontal and vertical moves
        index - 9, index - 7, index + 7, index + 9 // Diagonal moves
      ];
      kingMoves.forEach(move => {
        if (move >= 0 && move < 64 && Math.abs(Math.floor(move / 8) - row) <= 1 && Math.abs(move % 8 - col) <= 1) {
          if (!boardState[move] || (boardState[move] && !boardState[move].startsWith(piece.split("-")[0]))) {
            moves.push(move);
          }
        }
      });
    }
  
    // Knight movement: Can move in "L" shape
    if (piece && piece.includes("knight")) {
      const knightMoves = [
        index - 17, index - 15, index - 10, index - 6, index + 6, index + 10, index + 15, index + 17
      ];
      knightMoves.forEach(move => {
        if (move >= 0 && move < 64 && Math.abs(Math.floor(move / 8) - row) <= 2 && Math.abs(move % 8 - col) <= 2) {
          if (!boardState[move] || (boardState[move] && !boardState[move].startsWith(piece.split("-")[0]))) {
            moves.push(move);
          }
        }
      });
    }
  
    // Rook movement: Can move vertically or horizontally any number of squares
    if (piece && piece.includes("rook")) {
      // Upward movement
      for (let i = 1; i < 8; i++) {
        const up = index - i * 8;
        if (row - i >= 0) {
          if (!boardState[up]) {
            moves.push(up); // Empty square
          } else if (boardState[up] && !boardState[up].startsWith(piece.split("-")[0])) {
            moves.push(up); // Capture opponent's piece
            break;
          } else {
            break; // Blocked by same color piece
          }
        }
      }
  
      // Downward movement
      for (let i = 1; i < 8; i++) {
        const down = index + i * 8;
        if (row + i < 8) {
          if (!boardState[down]) {
            moves.push(down); // Empty square
          } else if (boardState[down] && !boardState[down].startsWith(piece.split("-")[0])) {
            moves.push(down); // Capture opponent's piece
            break;
          } else {
            break; // Blocked by same color piece
          }
        }
      }
  
      // Left movement
      for (let i = 1; i < 8; i++) {
        const left = index - i;
        if (col - i >= 0) {
          if (!boardState[left]) {
            moves.push(left); // Empty square
          } else if (boardState[left] && !boardState[left].startsWith(piece.split("-")[0])) {
            moves.push(left); // Capture opponent's piece
            break;
          } else {
            break; // Blocked by same color piece
          }
        }
      }
  
      // Right movement
      for (let i = 1; i < 8; i++) {
        const right = index + i;
        if (col + i < 8) {
          if (!boardState[right]) {
            moves.push(right); // Empty square
          } else if (boardState[right] && !boardState[right].startsWith(piece.split("-")[0])) {
            moves.push(right); // Capture opponent's piece
            break;
          } else {
            break; // Blocked by same color piece
          }
        }
      }
    }
  
    // Bishop movement: Can move diagonally any number of squares
    if (piece && piece.includes("bishop")) {
      // Up-left
      for (let i = 1; i < 8; i++) {
        const upLeft = index - i * 9;
        if (row - i >= 0 && col - i >= 0) {
          if (!boardState[upLeft]) {
            moves.push(upLeft);
          } else if (boardState[upLeft] && !boardState[upLeft].startsWith(piece.split("-")[0])) {
            moves.push(upLeft);
            break;
          } else {
            break;
          }
        }
      }
  
      // Up-right
      for (let i = 1; i < 8; i++) {
        const upRight = index - i * 7;
        if (row - i >= 0 && col + i < 8) {
          if (!boardState[upRight]) {
            moves.push(upRight);
          } else if (boardState[upRight] && !boardState[upRight].startsWith(piece.split("-")[0])) {
            moves.push(upRight);
            break;
          } else {
            break;
          }
        }
      }
  
      // Down-left
      for (let i = 1; i < 8; i++) {
        const downLeft = index + i * 7;
        if (row + i < 8 && col - i >= 0) {
          if (!boardState[downLeft]) {
            moves.push(downLeft);
          } else if (boardState[downLeft] && !boardState[downLeft].startsWith(piece.split("-")[0])) {
            moves.push(downLeft);
            break;
          } else {
            break;
          }
        }
      }
  
      // Down-right
      for (let i = 1; i < 8; i++) {
        const downRight = index + i * 9;
        if (row + i < 8 && col + i < 8) {
          if (!boardState[downRight]) {
            moves.push(downRight);
          } else if (boardState[downRight] && !boardState[downRight].startsWith(piece.split("-")[0])) {
            moves.push(downRight);
            break;
          } else {
            break;
          }
        }
      }
    }
  
    // Queen movement: Can move like both a rook and a bishop
    if (piece && piece.includes("queen")) {
      const rookMoves = getValidMoves(index, piece.replace("queen", "rook"), boardState);
      const bishopMoves = getValidMoves(index, piece.replace("queen", "bishop"), boardState);
      moves.push(...rookMoves, ...bishopMoves);
    }
  
    return moves;
  };
  
  // Function to check if the king is in check
  export const isKingInCheck = (kingPosition, boardState, isWhiteTurn) => {
    const opponentColor = isWhiteTurn ? "black" : "white";
    for (let i = 0; i < 64; i++) {
      const piece = boardState[i];
      if (piece && piece.startsWith(opponentColor)) {
        const validMoves = getValidMoves(i, piece, boardState);
        if (validMoves.includes(kingPosition)) {
          return true; // The king is in check
        }
      }
    }
    return false; // The king is not in check
  };
  
  // Function to check if the game is over (Checkmate or Stalemate)
  export const isGameOver = (kingPosition, boardState, isWhiteTurn) => {
    const opponentColor = isWhiteTurn ? "black" : "white";
    // Check if the king is in check
    if (isKingInCheck(kingPosition, boardState, isWhiteTurn)) {
      const kingPiece = isWhiteTurn ? "white-king" : "black-king";
      const validKingMoves = getValidMoves(kingPosition, kingPiece, boardState);
      
      // Check if the king can move to a valid position to escape check
      const canEscapeCheck = validKingMoves.some(move => {
        return !isKingInCheck(move, boardState, isWhiteTurn);
      });
  
      if (!canEscapeCheck) {
        // No valid move to escape the check, it's checkmate
        return true; // Game Over: Checkmate
      }
    }
  
    // If no checkmate condition, it might be a stalemate (no legal moves but no check)
    const hasValidMoves = boardState.some((piece, index) => {
      if (piece && piece.startsWith(opponentColor)) {
        const validMoves = getValidMoves(index, piece, boardState);
        return validMoves.length > 0;
      }
      return false;
    });
  
    if (!hasValidMoves) {
      // No valid moves for the opponent, game over: Stalemate
      return true; // Game Over: Stalemate
    }
  
    return false; // Game is not over yet
  };
  
  // Function to handle the game logic and check for checkmate or stalemate
  export const handleMove = (boardState, fromIndex, toIndex, isWhiteTurn) => {
    const newBoardState = movePiece(boardState, fromIndex, toIndex);
    const kingPosition = findKingPosition(isWhiteTurn ? "white" : "black", newBoardState);
  
    // Check if the game is over after this move (Checkmate or Stalemate)
    if (isGameOver(kingPosition, newBoardState, isWhiteTurn)) {
      // Display pop-up with game over message
      const winner = isWhiteTurn ? "Black" : "White";
      alert(`Game Over! ${winner} wins by Checkmate!`);
      return newBoardState; // Game over, return the final board state
    }
  
    return newBoardState; // Continue with the game
  };
  
  // Helper function to find the position of the king of the given color
  export const findKingPosition = (color, boardState) => {
    return boardState.findIndex(piece => piece === `${color}-king`);
  };
  