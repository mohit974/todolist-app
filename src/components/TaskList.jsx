import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, editTask, toggleTask } from "../reducers/taskSlice";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks); // gets the tasks array from the Redux store
  const dispatch = useDispatch(); // initializes the dispatch hook from Redux
  const [editing, setEditing] = useState(null); // State to manage which task is currently being edited
  const [editText, setEditText] = useState(""); // State to manage the text input value for editing

  const handleEdit = (task) => {
    setEditing(task.id);
    setEditText(task.text);
  };

  const handleEditSubmit = (id) => {
    dispatch(editTask({ id, text: editText })); // dispatches the editTask action with the updated text
    setEditing(null); // resets the editing state
    setEditText(""); // clears the edit text input
  };

  return (
    <section className="w-full">
      <div className="flex flex-col justify-center items-center text-2xl text-sky-400 font-medium">
        {tasks.length === 0
          ? "No Tasks"
          : tasks.length === 1
          ? "Your Task"
          : "Your Tasks"}
      </div>
      <div className="mt-6">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex justify-between items-center mb-3 rounded-md py-2 px-1 bg-[#1F1B24] border-neutral-600 border"
          >
            <div className="w-3/5">
              {editing === task.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="py-2 px-2 bg-[#121212] rounded-md text-white outline-none w-full"
                />
              ) : (
                <span
                  className={`p-2 ${
                    task.completed
                      ? "line-through text-gray-200 cursor-pointer"
                      : "cursor-pointer "
                  }`}
                  onClick={() => dispatch(toggleTask(task.id))}
                >
                  {task.text}
                </span>
              )}
            </div>
            <div>
              {editing === task.id ? (
                <button
                  onClick={() => handleEditSubmit(task.id)}
                  className="bg-sky-400 py-2 px-4 rounded-md"
                >
                  Update Task
                </button>
              ) : (
                <div className="space-x-2">
                  <button onClick={() => handleEdit(task)} className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.25em"
                      height="1.25em"
                      viewBox="0 0 24 24"
                    >
                      <g
                        fill="none"
                        stroke="#38bdf8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      >
                        <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1l1-4Z"></path>
                      </g>
                    </svg>
                  </button>
                  <button
                    onClick={() => dispatch(deleteTask(task.id))}
                    className=""
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.25em"
                      height="1.25em"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#f83a3a"
                        d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"
                      ></path>
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TaskList;
