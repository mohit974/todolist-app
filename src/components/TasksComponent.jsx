import React from "react";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";

const TasksComponent = () => {
  return (
    <div className="bg-[#121212] m-20 rounded-xl border border-neutral-800 p-10 sm:w-1/3">
      <div className="flex flex-col justify-center items-center space-y-10">
        <h1 className="text-sky-400 text-4xl font-bold">Get Tasks Done!</h1>
        <TaskInput />
        <TaskList />
      </div>
    </div>
  );
};

export default TasksComponent;
