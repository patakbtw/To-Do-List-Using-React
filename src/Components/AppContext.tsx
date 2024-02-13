import { createContext } from "react";
import { TaskInterface } from "./YetAnotherToDoList";

export const TaskContext = createContext<{
  addTask: (text: string) => void;
  editTask: (task: TaskInterface) => void;
  deleteTask: (taskId: number) => void;
  checkTask: (taskId: number) => void;
}>({
  addTask: () => {},
  editTask: () => {},
  deleteTask: () => {},
  checkTask: () => {},
});
 