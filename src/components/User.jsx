import React from "react";

export default function User({ user: { displayName, photoURL } }) {
  return (
    <div className="flex items-center gap-1">
      <img className="w-8 h-8 rounded-full" src={photoURL} alt={displayName} />
      <p className="text-lg font-bold">{displayName}</p>
    </div>
  );
}
