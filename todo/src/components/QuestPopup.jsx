import React, { useState } from 'react';

export default function QuestPopup({ addQuest, setShowPopup }) {
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && name && date && time) {
      const dateTime = new Date(`${date}T${time}`).toISOString();
      addQuest(title, name, dateTime);
      setTitle('');
      setName('');
      setDate('');
      setTime('');
      setShowPopup(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"> {/* Přidáno z-index pro umístění nad vším */}
      <div className="bg-white p-6 rounded shadow-lg w-[320px] left-0"> {/* Třída left-0 pro posunutí do levé části obrazovky */}
        <h2 className="text-2xl mb-4">Add New Quest</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          <input
            type="text"
            placeholder="Quest Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="p-2 border rounded"
          />
          <div className="flex justify-between">
            <button type="button" onClick={() => setShowPopup(false)} className="p-2 bg-gray-300 rounded">Cancel</button>
            <button type="submit" className="p-2 bg-blue-500 rounded text-white">Add Quest</button>
          </div>
        </form>
      </div>
    </div>
  );
}
