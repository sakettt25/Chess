import React from "react";

const Square = ({ isDark, piece, onClick, isHighlighted }) => {
  // Mapping pieces to image paths in the public folder
  const pieceImages = {
    "black-rook": "/Brook.png",
    "black-knight": "/Bknight.png",
    "black-bishop": "/Bbishop.png",
    "black-king": "/Bking.png",
    "black-queen": "/Bqueen.png",
    "black-pawn": "/Bpawn.png",
    "white-rook": "/Wrook.png",
    "white-knight": "/Wknight.png",
    "white-bishop": "/Wbishop.png",
    "white-king": "/Wking.png",
    "white-queen": "/Wqueen.png",
    "white-pawn": "/Wpawn.png",
  };

  const pieceImage = piece ? pieceImages[piece] : null;

  return (
    <div
      className={`flex items-center justify-center aspect-[1/1] w-full ${isDark ? "bg-gray-700" : "bg-gray-200"} ${isHighlighted ? "bg-green-500" : ""}`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      {pieceImage && (
        <img
          src={pieceImage}
          alt={piece}
          className="w-[65%] h-[65%]"
          onError={() => console.error(`Image not found for piece: ${piece}`)}
        />
      )}
    </div>
  );
};

export default Square;
