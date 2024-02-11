import { useState } from "react";
import "../styles/YetAnotherToDoList.scss";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import { TaskContext } from "./AppContext";

export interface TaskInterface {
  id: number;
  text: string;
  done: boolean;
}

export default function YetAnotherToDoList() {
  const [tasks, setTasks] = useState<TaskInterface[]>([]);

  let nextId = 0;

  function handleAddTask(text: string) {
    setTasks([
      ...tasks,
      {
        id: nextId++,
        text: text,
        done: false,
      },
    ]);
  }

  function handleEditTask(task: TaskInterface) {
    setTasks(
      tasks.map((t: TaskInterface) => {
        if (t.id == task.id) {
          return task;
        } else {
          return t;
        }
      })
    );
  }

  function handleDeleteTask(taskId: number) {
    setTasks(tasks.filter((t) => t.id !== taskId));
  }

  return (
    <TaskContext.Provider
      value={{
        addTask: handleAddTask,
        editTask: handleEditTask,
        deleteTask: handleDeleteTask,
      }}
    >
      <div className="another__wrapper">
        <AddTask />
        <TaskList tasks={tasks} />
      </div>
    </TaskContext.Provider>
  );
}
