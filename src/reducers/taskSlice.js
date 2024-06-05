import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const State = localStorage.getItem("tasks");
    return State ? JSON.parse(State) : [];
  } catch (err) {
    console.error("Could not load tasks from localStorage", err);
    return [];
  }
};

const saveState = (state) => {
  try {
    const State = JSON.stringify(state);
    localStorage.setItem("tasks", State);
  } catch (err) {
    console.error("Could not save tasks to localStorage", err);
  }
};

const taskSlice = createSlice({
  name: "tasks",
  initialState: loadState(),
  reducers: {
    addTask: (state, action) => {
      state.push({ id: Date.now(), text: action.payload, completed: false });
      saveState(state);
    },
    deleteTask: (state, action) => {
      const newState = state.filter((task) => task.id !== action.payload);
      saveState(newState);
      return newState;
    },
    editTask: (state, action) => {
      const task = state.find((task) => task.id === action.payload.id);
      if (task) {
        task.text = action.payload.text;
        saveState(state);
      }
    },
    toggleTask: (state, action) => {
      const task = state.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        saveState(state);
      }
    },
  },
});

export const { addTask, deleteTask, editTask, toggleTask } = taskSlice.actions;

export default taskSlice.reducer;
