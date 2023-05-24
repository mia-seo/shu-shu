import React from "react";

export default function Button({ text, onClick }) {
  return (
    <button
      className="text-lg font-semibold bg-brand text-white px-3 py-1 rounded-sm hover:bg-accent transition-all duration-150"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
