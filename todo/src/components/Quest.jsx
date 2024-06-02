import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { format, isValid, isBefore } from 'date-fns'; 

export default function Quest({ quest, deleteQuest }) {
  const { id, title, name, time } = quest;
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (time) {
      const parsedTime = new Date(time);
      if (!isValid(parsedTime)) {
        console.error('Invalid time value:', time);
        return;
      }
      const currentTime = new Date();
      if (isBefore(parsedTime, currentTime)) {
        setExpired(true);
      }
    }
  }, [time]);

  const handleDelete = () => {
    deleteQuest(id);
  };

  // Formátujeme čas, pokud je platný
  let formattedTime = '';
  if (time) {
    const parsedTime = new Date(time);
    formattedTime = isValid(parsedTime) ? format(parsedTime, 'HH:mm dd/MM/yyyy') : 'Invalid Time';
  }

  return (
    <div className={`p-5 whitespace-nowrap text-3xl text-white rounded-xl w-[300] m-3 relative ${expired ? 'bg-red-500' : 'bg-black'}`}>
      <div className="absolute top-0 right-0 mr-[10px] mt-[3px]">
        <button onClick={handleDelete} className="bg-transparent border-none outline-none cursor-pointer">
          <FaTrash style={{ fontSize: '0.8rem' }} className="text-red-600" />
        </button>
      </div>
      <p className="text-sm text-blue-800">{name}</p>
      <p>{title}</p>
      <p className="text-sm text-blue-800">{formattedTime}</p> {/* Zobrazujeme formátovaný čas */}
    </div>
  );
}
