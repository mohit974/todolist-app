import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../reducers/taskSlice";

const TaskInput = () => {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (value.trim()) {
      dispatch(addTask(value));
      console.log(value);
      setValue("");
    }
  };

  return (
    <div className="flex flex-row justify-center items-center w-full">
      {" "}
      <form
        onSubmit={handleSubmit}
        className="space-x-4 w-full flex justify-center items-center"
      >
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="rounded-md bg-[#1F1B24] py-2 pl-2 placeholder:text-neutral-600 outline-none border border-neutral-600 text-white w-3/5"
          placeholder="Buy groceries"
          ref={inputRef}
        />
        <button type="submit" className="bg-sky-400 py-2 px-4 rounded-md w-1/4">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskInput;
