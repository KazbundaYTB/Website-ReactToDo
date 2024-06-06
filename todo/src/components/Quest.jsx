import React, { useEffect, useState } from 'react';
import { FaTrash, FaPen } from 'react-icons/fa';
import { LuFileText } from "react-icons/lu";
import { isValid, isBefore, differenceInMinutes, differenceInHours, differenceInDays, addDays } from 'date-fns';

export default function Quest({ quest, deleteQuest, updateQuest }) {
  
  const { id, title, time } = quest;
  const [expired, setExpired] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [isExpiringSoon, setIsExpiringSoon] = useState(false);

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
      } else {
        updateRemainingTime(parsedTime, currentTime);
        const oneWeekFromNow = addDays(currentTime, 7);
        if (isBefore(parsedTime, oneWeekFromNow)) {
          setIsExpiringSoon(true);
        }
      }
    }
  }, [time]);

  const updateRemainingTime = (parsedTime, currentTime) => {
    const days = differenceInDays(parsedTime, currentTime);
    const hours = differenceInHours(parsedTime, currentTime) % 24;
    const minutes = differenceInMinutes(parsedTime, currentTime) % 60;
    
    if (days > 0) {
      setTimeRemaining(`${days}d`);
    } else if (hours > 0) {
      setTimeRemaining(`${hours}h ${minutes}m`);
    } else {
      setTimeRemaining(`${minutes}m`);
    }
  };

  const handleDelete = () => {
    deleteQuest(id);
  };

  return (
    <div className={`p-5 whitespace-nowrap text-2xl text-black rounded-xl w-auto m-3 relative ${expired ? 'bg-red-500' : 'bg-white'}`}>
      <div className="absolute right-0 mr-[10px] flex flex-col space-y-2">
        <button onClick={handleDelete} className="bg-transparent border-none outline-none cursor-pointer">
          <FaTrash style={{ fontSize: '0.8rem' }} className="text-red-600" />
        </button>
        <button className="bg-transparent border-none outline-none cursor-pointer">
          <FaPen style={{ fontSize: '0.8rem' }} className="text-gray-600" />
        </button>
      </div>

      <div className="flex items-center">
        <div className="flex flex-col justify-center items-center mr-4">
          <LuFileText style={{ fontSize: '115%' }} />
        </div>
        <div>
          <p>{title}</p>
          <div className={`inline-block rounded-xl px-2 py-1 mt-2 ${isExpiringSoon ? 'bg-orange-500' : 'bg-emerald-400'}`}>
            {!expired && <p className="text-sm text-white">Ends in: {timeRemaining}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
