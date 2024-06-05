import { configureStore } from "@reduxjs/toolkit";
import tasks from "./taskSlice";

export default configureStore({
  reducer: {
    tasks: tasks, // Set the tasks reducer under the "tasks" property(key)
  },
});
