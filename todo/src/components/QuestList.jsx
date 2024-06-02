import React from "react";
import Quest from "./Quest";

export default function QuestList({ quests, deleteQuest }) {
  return (
    <div className="w-full h-full flex flex-col justify-start space-y-1 overflow-y-scroll">
      {quests.map((quest) => (
        <Quest key={quest.id} quest={quest} deleteQuest={deleteQuest} />
      ))}
    </div>
  );
}


