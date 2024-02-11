import { useContext, useState } from "react";
import { TaskContext } from "./AppContext";

export default function AddTask() {
  const [text, setText] = useState("");
  const { addTask } = useContext(TaskContext);
  return (
    <div className="another__form">
      <input
        placeholder="Add task"
        type="text"
        value={text}
        className="another__input"
        onChange={(event) => setText(event.target.value)}
      />
      <button
        className="another__btn"
        onClick={() => {
          addTask(text);
          setText("");
        }}
      >
        <p>Add</p>
      </button>
    </div>
  );
}
