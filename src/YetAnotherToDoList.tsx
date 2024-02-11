import { FormEvent, useState } from "react";
import "./styles/YetAnotherToDoList.scss";

export default function YetAnotherToDoList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  interface Task {
    id: number;
    text: string;
    done: boolean;
  }

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

  function handleEditTask(task: Task) {
    setTasks(
      tasks.map((t: Task) => {
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

  function AddTask({ onAddTask }) {
    const [text, setText] = useState("");

    return (
      <div className="another__form">
        <input placeholder="Add task" type="text" className="another__input" onChange={event => setText(event.target.value)}/>
        <button className="another__btn" onClick={ () => {
            setText('');
            onAddTask(text);
        }}>
          <p>Add</p>
        </button>
      </div>
    );
  }

  function Task({ text, id, done }: Task) {
    return (
      <>
        <input type="checkbox" id={id.toString()} checked={done} />
        <label htmlFor={id.toString()} className="another__task">
          {text}
        </label>
        <button
          onClick={() => {
            handleEditTask;
          }}
          className="another__edit"
        >
          Edit
        </button>
        <button
          onClick={() => {
            handleDeleteTask;
          }}
          className="another__delete"
        >
          Delete
        </button>
      </>
    );
  }

  function TaskList() {
    return (
      <ul className="another__list">
        {tasks.map(({ text, id, done }) => (
            <li className="another__item" key={id}>
                <Task text={text} id={id} done={done} />
            </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="another__wrapper">
      <AddTask onAddTask={handleAddTask}/>
      <TaskList />
    </div>
  );
}
