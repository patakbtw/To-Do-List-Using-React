import { useState, useEffect } from "react";
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

  function handleEditTask(taskId: number, newText: string) {
    setTasks(
      tasks.map((task: TaskInterface) => {
        if (task.id === taskId) {
          task.text = newText;
        }
        return task;
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
        }
        return task;
      })
    );
  }

  const storageKey = "Yet another To-Do List tasks";
  const saveTasksToLocalStorage = () => {
    window.localStorage.setItem(storageKey, JSON.stringify(tasks));
    console.log("Saved tasks to local storage:", JSON.stringify(tasks));
  };

  const loadTasksFromLocalStorage = () => {
    const storedTasks = window.localStorage.getItem(storageKey);
    if (storedTasks) {
      setTasks(
        (prevTaskList: TaskInterface[]) => (prevTaskList = JSON.parse(storedTasks))
      );
      console.log("Loaded tasks from local storage:", JSON.parse(storedTasks));
    }
  };

  useEffect(() => {
    loadTasksFromLocalStorage();
  }, []);

  useEffect(() => {
    const saveTimer = setTimeout(() => {
      saveTasksToLocalStorage();
    }, 0);

    return () => clearTimeout(saveTimer);
  }, [tasks]);

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
