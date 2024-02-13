import { useContext, useState } from "react";
import { TaskContext } from "./AppContext";

export default function AddTask() {
  const [text, setText] = useState("");
  const { addTask } = useContext(TaskContext);
  return (
    <div className="another__form">
      <label htmlFor="add_item" className="another__label">
        New task
      </label>
      <input
        placeholder="Add task"
        type="text"
        id="add_item"
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
      <hr className="to-do-list__separator" />
    </div>
  );
}
