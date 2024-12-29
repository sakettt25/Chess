import React from "react";

const Toggle = ({ turn }) => {
  return (
    <div>
      <button
        className={`text-lg md:text-xl lg:text-2xl border-2 px-4 py-2 rounded ${
          turn === "white" ? "bg-white text-black font-bold" : "bg-black text-white font-semibold"
        }`}
      >
        {turn === "white" ? "White's Turn" : "Black's Turn"} {/* Display whose turn it is */}
      </button>
    </div>
  );
};

export default Toggle;
