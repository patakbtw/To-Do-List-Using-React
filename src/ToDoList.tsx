import "./styles/ToDoList.scss";
import React, { useState, useEffect } from "react";
import trash from "../public/trash.svg";

type FormProps = {
  onHandleSubmit: (array: (state: string[]) => string[]) => void;
};

const ToDoList_form = (props: FormProps) => {
  const [textInput, setTextInput] = useState<string>("");
  const { onHandleSubmit } = props;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textInput) {
      onHandleSubmit((prevTaskList: string[]) => [...prevTaskList, textInput]);
    }
    setTextInput("");
  };

  return (
    <form className="to-do-list__form" name="task-form" onSubmit={handleSubmit}>
      <label htmlFor="item" className="to-do-list__label">
        New task
      </label>
      <input
        type="text"
        id="item"
        className="to-do-list__input"
        value={textInput}
        onChange={handleInput}
      />
      <button type="submit" className="to-do-list__btn">
        Add
      </button>
    </form>
  );
};

type ToDoList_liProps = {
  task: string;
  items: string[];
  removeItem: (id: number) => void;
};

const ToDoList_li = (props: ToDoList_liProps): JSX.Element => {
  return (
    <>
      {props.items.map((item, index) => (
        <li className="to-do-list__item" key={index}>
          <input
            type="checkbox"
            className="to-do-list__chkbox"
            id={`${index}`}
             
          />
          <label htmlFor={`${index}`} className="to-do-list__task">
            {item}
          </label>
          <button
            className="to-do-list__dlt"
            onClick={() => props.removeItem(index)}
          >
            <img src={trash} alt="" />
          </button>
        </li>
      ))}
    </>
  );
};

function ToDoList() {
  const [someList, setSomeList] = useState<string[]>([]);
  const storageKey = 'To-Do List tasks';
  const saveTasksToLocalStorage = () => {
    window.localStorage.setItem(storageKey, JSON.stringify(someList));
    console.log('Saved tasks to local storage:', JSON.stringify(someList));
  };

  const loadTasksFromLocalStorage = () => {
    const storedTasks = window.localStorage.getItem(storageKey);
    if (storedTasks) {
      setSomeList(
        (prevTaskList: string[]) => (prevTaskList = JSON.parse(storedTasks))
      );
      console.log('Loaded tasks from local storage:', JSON.parse(storedTasks));
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
  }, [someList]);

  const removeItem = (id: number) => {
    setSomeList((prevTaskList: string[]) =>
      prevTaskList.filter((_, index) => index !== id)
    );
  };



  return (
    <>
      <div className="to-do-list__wrapper">
        <ToDoList_form onHandleSubmit={setSomeList} />
        <hr className="to-do-list__separator" />
        <ul className="to-do-list__list">
          <ToDoList_li items={someList} task="" removeItem={removeItem} />
        </ul>
      </div>
    </>
  );
}

export default ToDoList;
