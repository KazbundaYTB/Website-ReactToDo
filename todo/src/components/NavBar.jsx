import React from 'react';
import { IoLogOutOutline } from "react-icons/io5";
import { FaRegFileAlt } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

export default function NavBar({ setShowPopup, handleSignOut, questArrayLength }) {
  return (
    <div className="flex justify-around items-center w-full">
      <div className="relative">
        <span className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/5 text-sm text-black font-bold px-2">
          {questArrayLength}
        </span>
        <button className="p-2 bg-white text-emerald-500 rounded-md ">
          <FaRegFileAlt /> {/* emerald-500 color */}
        </button>
      </div>
      <button 
        onClick={() => setShowPopup(true)} 
        className="p-2 text-2xl text-white bg-emerald-500 rounded-full"
      >
        <IoMdAdd style={{ fontSize: '135%' }}/>
      </button>
      <button 
        onClick={handleSignOut} 
        className="p-2 bg-white text-emerald-500 rounded-md"
      >
        <IoLogOutOutline />
      </button>
    </div>
  );
}
