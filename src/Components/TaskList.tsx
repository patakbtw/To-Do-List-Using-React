import { useContext } from "react";
import { TaskInterface } from "./YetAnotherToDoList";
import { TaskContext } from "./AppContext";
import trash from "/public/trash.svg";

function Task({ text, id, done }: TaskInterface) {
  const { editTask, deleteTask } = useContext(TaskContext);

  return (
    <>
      <input type="checkbox" id={id.toString()} checked={done} />
      <label htmlFor={id.toString()} className="another__task">
        {text}
      </label>
      <button
        onClick={() => {
          editTask;
        }}
        className="another__edit"
      >
        Edit
      </button>
      <button
        onClick={() => {
          deleteTask;
        }}
        className="another__delete"
      >
        <img src={trash} alt="" />
      </button>
    </>
  );
}

interface TaskListProps {
  tasks: TaskInterface[];
}

export default function TaskList({ tasks }: TaskListProps) {
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