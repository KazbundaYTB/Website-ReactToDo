import React from 'react';
import { IoLogInOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";

export default function NavBar({ setShowPopup, handleSignOut }) {
  return (
    <div className="flex justify-around items-center w-full">
      <button 
        onClick={() => setShowPopup(true)} // Zde jsme nastavili, aby se popup vždy otevřel při kliknutí na tlačítko
        className="p-2 text-2xl text-white bg-blue-500 rounded"
      >
        <FaPlus />
      </button>
      <button 
        onClick={handleSignOut} 
        className="p-2 bg-red-500 rounded"
      >
        <IoLogInOutline />
      </button>
    </div>
  );
}
