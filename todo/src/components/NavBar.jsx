import React from 'react';

export default function NavBar({ setShowPopup, handleSignOut }) {
  return (
    <div className="flex justify-around items-center w-full">
      <button 
        onClick={() => setShowPopup(true)} // Zde jsme nastavili, aby se popup vždy otevřel při kliknutí na tlačítko
        className="p-2 bg-blue-500 rounded"
      >
        Add Quest
      </button>
      <button 
        onClick={handleSignOut} 
        className="p-2 bg-red-500 rounded"
      >
        Sign Out
      </button>
    </div>
  );
}
