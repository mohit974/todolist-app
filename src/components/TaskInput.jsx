import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../reducers/taskSlice";

const TaskInput = () => {
  const [value, setValue] = useState(""); // State to manage the input value
  const inputRef = useRef(null); // Ref to access the input element
  const dispatch = useDispatch(); // initializes the dispatch hook from Redux

  useEffect(() => {
    inputRef.current.focus(); // focus the input field when the component mounts
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); // prevents the page reloading on the form being submitted

    if (value.trim()) {
      // to disallow submitting empty tasks
      dispatch(addTask(value)); // dispatches the addTask action with the input value
      // console.log(value);
      setValue(""); // clears the input field after submitting
    }
  };

  return (
    <div className="flex flex-row justify-center items-center w-full">
      {" "}
      <form
        onSubmit={handleSubmit}
        className="space-y-2 space-x-0 md:space-x-4 md:space-y-0 w-full flex justify-center items-center flex-col md:flex-row "
      >
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="rounded-md bg-[#1F1B24] py-2 pl-2 placeholder:text-neutral-600 outline-none border border-neutral-600 text-white md:w-3/5 w-full"
          placeholder="Buy groceries"
          ref={inputRef}
        />
        <button
          type="submit"
          className="bg-sky-400 py-2 px-4 rounded-md md:w-1/4 w-full"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskInput;
