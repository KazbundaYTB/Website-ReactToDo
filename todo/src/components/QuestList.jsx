import React from "react";
import Quest from "./Quest";

export default function QuestList({ quests, deleteQuest }) {
  return (
    <div className="w-full h-full flex flex-col justify-start space-y-1 overflow-y-scroll">
      {quests.length === 0 ? (
          <div className="text-center text-red-600 text-xl font-bold">
            You don't have any tasks to do!
          </div>
        ) : (
          quests.map((quest) => (
            <Quest key={quest.id} quest={quest} deleteQuest={deleteQuest} />

          ))
        )}
    </div>
  );
}


