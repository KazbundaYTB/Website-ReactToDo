import React, { useState } from 'react';

export default function QuestPopup({ addQuest, setShowPopup }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Inicializace stavu s aktuálním datem a časem + 1 hodina a + 1 den
  const getDefaultDate = () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1); // Přidání jednoho dne
    return currentDate.toISOString().split('T')[0];
  };

  const getDefaultTime = () => {
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 1); // Přidání jedné hodiny
    return currentDate.toTimeString().split(':').slice(0, 2).join(':');
  };

  const [date, setDate] = useState(getDefaultDate());
  const [time, setTime] = useState(getDefaultTime());

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description && date && time) {
      const dateTime = new Date(`${date}T${time}`).toISOString();
      addQuest(title, description, dateTime);
      setTitle('');
      setDescription('');
      setDate(getDefaultDate());
      setTime(getDefaultTime());
      setShowPopup(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-[320px] left-0">
        <h2 className="text-2xl mb-4 text-center">Add New Quest</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          <label>Title:</label>
          <input
            type="text"
            placeholder="Quest Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border rounded"
          />
          <br />
          <label>Description:</label>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 border rounded h-[80px]"
          />
          <div className='space-x-2 flex flex-col text-center'>
            <label>Date & Time:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="p-2 border rounded"
            />
          </div>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="p-2 border rounded"
          />
          <div className="flex justify-between">
            <button type="button" onClick={() => setShowPopup(false)} className="p-2 bg-red-300 rounded">Close</button>
            <button type="submit" className="p-2 bg-blue-500 rounded text-white">Add Quest</button>
          </div>
        </form>
      </div>
    </div>
  );
}
