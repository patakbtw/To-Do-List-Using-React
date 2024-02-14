import { useContext, useState } from "react";
import { TaskInterface } from "./YetAnotherToDoList";
import { TaskContext } from "./AppContext";
import trash from "/public/trash.svg";
import edit from "/public/edit.svg";
import submit from "/public/submit.svg";

function Task({ text, id, done }: TaskInterface) {
  const { editTask, deleteTask, checkTask } = useContext(TaskContext);
  const [editing, setEditing] = useState(false);
  const [_text, setText] = useState(text);

  return (
    <>
      <input
        type="checkbox"
        id={id.toString()}
        checked={done}
        onChange={() => {
          checkTask(id);
        }}
      />
      {!editing ? (
        <label htmlFor={id.toString()} className="another__task">
          {text}
        </label>
      ) : (
        <form className="another__editing-form" onSubmit={(event) => {
          event.preventDefault();
          if (!_text) {
            deleteTask(id);
            return(null);
          }
          editTask(id, _text);
        }}>
          <input
            type="text"
            value={_text}
            onChange={(event) => {
              setText(event.target.value);
            }}
          />
          <button type="submit"><img src={submit} width="24px" height="24px"alt="Submit changes" /></button>
        </form>
      )}
      <button
        onClick={() => {
          setEditing(!editing);
        }}
        className="another__edit"
      >
        <img src={edit} alt="Edit icon" />
      </button>
      <button onClick={() => deleteTask(id)} className="another__delete">
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
        <li className="another__item" key={id + text}>
          <Task text={text} id={id} done={done} />
        </li>
      ))}
    </ul>
  );
}
