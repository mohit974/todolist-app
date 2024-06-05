import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const State = localStorage.getItem("tasks");
    return State ? JSON.parse(State) : []; // parse stored state from localStorage
  } catch (err) {
    console.error("Could not load tasks from localStorage", err);
    return [];
  }
};

const saveState = (state) => {
  try {
    const State = JSON.stringify(state);
    localStorage.setItem("tasks", State); // Store state in localStorage
  } catch (err) {
    console.error("Could not save tasks to localStorage", err);
  }
};

const taskSlice = createSlice({
  name: "tasks",
  initialState: loadState(),  // Load initial state from localStorage
  reducers: {
    addTask: (state, action) => {
      state.push({ id: Date.now(), text: action.payload, completed: false });  // Add new task to state
      saveState(state);  // Save updated state to localStorage
    },
    deleteTask: (state, action) => {
      const newState = state.filter((task) => task.id !== action.payload); // Filter out deleted task
      saveState(newState);  // Save updated state to localStorage
      return newState;
    },
    editTask: (state, action) => {
      const task = state.find((task) => task.id === action.payload.id);  // Find task to edit
      if (task) {
        task.text = action.payload.text; // Update task text
        saveState(state); // Save updated state to localStorage

      }
    },
    toggleTask: (state, action) => {
      const task = state.find((task) => task.id === action.payload); // Find task to toggle
      if (task) {
        task.completed = !task.completed; // Toggle task completion
        saveState(state); // Save updated state to localStorage
      }
    },
  },
});

export const { addTask, deleteTask, editTask, toggleTask } = taskSlice.actions;

export default taskSlice.reducer;
