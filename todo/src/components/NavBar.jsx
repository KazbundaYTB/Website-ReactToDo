import React from 'react';
import { IoLogOutOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";

export default function NavBar({ setShowPopup, handleSignOut }) {
  return (
    <div className="flex justify-around items-center w-full">
      <button 
        onClick={() => setShowPopup(true)} 
        className="p-2 text-2xl text-white bg-blue-500 rounded-full"
      >
        <IoMdAdd />
      </button>
      <button 
        onClick={handleSignOut} 
        className="p-2 bg-red-500 rounded"
      >
        <IoLogOutOutline />
      </button>
    </div>
  );
}
