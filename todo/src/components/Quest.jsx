import React, { useEffect, useState } from 'react';
import { FaTrash, FaPen } from 'react-icons/fa';
import { LuFileText } from "react-icons/lu";
import { isValid, isBefore, differenceInMinutes, differenceInHours, differenceInDays, addDays } from 'date-fns';
import { db } from '../api/firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';

export default function Quest({ quest, deleteQuest, updateQuest }) {
  const { id, title, time } = quest;
  const [expired, setExpired] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [isExpiringSoon, setIsExpiringSoon] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editTime, setEditTime] = useState('');
  const [description, setDescription] = useState('');

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

  const handleEdit = async () => {
    setEditTitle(title);
    setEditTime(time);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setEditTitle('');
    setEditTime('');
    setDescription('');
  };

  const handleSave = async () => {
    if (!editTitle.trim() || !editTime.trim()) {
      // Check for empty title or time
      return;
    }
    
    const updatedQuest = {
      id,
      title: editTitle.trim(),
      time: editTime.trim(),
      description: description.trim(),
    };

    await updateDoc(doc(db, 'quests', id), updatedQuest);
    updateQuest(updatedQuest);
    setIsPopupOpen(false);
  };

  return (
    <div className={`p-5 whitespace-nowrap text-2xl text-black rounded-xl w-auto m-3 relative ${expired ? 'bg-red-500' : 'bg-white'}`}>
      <div className="absolute right-0 mr-[10px] flex flex-col space-y-2">
        <button onClick={handleDelete} className="bg-transparent border-none outline-none cursor-pointer">
          <FaTrash style={{ fontSize: '0.8rem' }} className="text-red-600" />
        </button>
        <button onClick={handleEdit} className="bg-transparent border-none outline-none cursor-pointer">
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

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-2xl mb-4">Edit Quest</h2>
            <div className="flex flex-col space-y-3">
              <label>
                Title:
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="border p-2 rounded w-[220px]"
                />
              </label>
              <label>
                Date:
                <input
                  type="date"
                  value={editTime.split('T')[0]}
                  onChange={(e) => setEditTime(`${e.target.value}T${editTime.split('T')[1]}`)}
                  className="border p-2 rounded"
                />
              </label>
              <label>
                Time:
                <input
                  type="time"
                  value={editTime.split('T')[1]}
                  onChange={(e) => setEditTime(`${editTime.split('T')[0]}T${e.target.value}`)}
                  className="border p-2 rounded"
                />
              </label>

            </div>
            <br />
            <div className="flex justify-center space-x-2">
              <button onClick={handleClosePopup} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
              <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
