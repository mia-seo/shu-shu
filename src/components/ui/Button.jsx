import { type } from "@testing-library/user-event/dist/type";
import React from "react";

export default function Button({ text, onClick, disabled }) {
  return (
    <button
      className="text-lg font-semibold bg-brand text-white px-3 py-1 rounded-sm hover:brightness-125 transition-all duration-150"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
