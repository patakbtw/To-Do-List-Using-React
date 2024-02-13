import { useContext, useState } from "react";
import { TaskContext } from "./AppContext";

export default function AddTask() {
  const [text, setText] = useState("");
  const { addTask } = useContext(TaskContext);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addTask(text);
    setText("");
  };

  return (
    <form className="another__form" onSubmit={handleSubmit}>
      <label htmlFor="add_item" className="another__label">
        New task
      </label>
      <input
        autoComplete="false"
        placeholder="Add task"
        type="text"
        id="add_item"
        value={text}
        className="another__input"
        onChange={(event) => setText(event.target.value)}
      />
      <button className="another__btn" type="submit">
        <p>Add</p>
      </button>
      <hr className="to-do-list__separator" />
    </form>
  );
}
