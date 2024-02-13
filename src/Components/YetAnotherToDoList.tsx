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

  let nextId = tasks.length;

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
    console.log({ tasks });
  }

  function handleCheckTask(taskId: number) {
    setTasks(
      tasks.map((task: TaskInterface) => {
        if (task.id === taskId) {
          task.done = !task.done;
          return task;
        } else {
          return task;
        }
      })
    );
  }

  return (
    <div className="another__wrapper">
      <TaskContext.Provider
        value={{
          addTask: handleAddTask,
          editTask: handleEditTask,
          deleteTask: handleDeleteTask,
          checkTask: handleCheckTask,
        }}
      >
        <AddTask />
        <TaskList tasks={tasks} />
      </TaskContext.Provider>
    </div>
  );
}
