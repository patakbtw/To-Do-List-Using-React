import "./styles/App.scss";
import React, { useState } from "react";
import trash from '../public/trash.svg'

type FormProps = {
  // You also can use type like this React.Dispatch<React.SetStateAction<string[]>>
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
      // the main issue is a different type of arguments in ptops and here
      // in type definition in props (line 5) you have function file this function(array) {}
      // but here you have a function like this function(function(oldState) {...}){}
      onHandleSubmit((prevTaskList: string[]) => [...prevTaskList, textInput]);
    }
    setTextInput("");
  };

  return (
    <form className="toDoList__form" name="task-form" onSubmit={handleSubmit}>
      <label htmlFor="item" className="toDoList__label">
        New task
      </label>
      <input
        type="text"
        id="item"
        className="toDoList__input"
        value={textInput}
        onChange={handleInput}
      />
      <button type="submit" className="toDoList__btn">
        Add
      </button>
    </form>
  );
};

const ToDoList_delete = (index:number, onHandleSubmit = 0) => {
  console.log(index)
  return(
    <button className="toDoList__dlt">
      <img src={trash} alt="" />
    </button>
  );
}

const ToDoList_li = (task: string, index: number): JSX.Element => {
  // Line 50. key should be stable across renders https://react.dev/learn/rendering-lists#rules-of-keys
  const newId = Math.random().toString(36);


  return (
    <li className="toDoList__item" key={task}>
      <input type="checkbox" className="toDoList__chkbox" id={`${newId}_${index}`} />
      <label htmlFor={`${newId}_${index}`} className="toDoList__task">
        {task}
      </label>
    <ToDoList_delete index={index}/>
    </li>
  );
};

function App() {
  const [someList, setSomeList] = useState<string[]>([]);

  return (
    <>
      <div className="toDoList__wrapper">
        <ToDoList_form onHandleSubmit={setSomeList} />
        <hr className="toDoList__separator" />
        <ul className="toDoList__list">
          {
            someList.map(ToDoList_li)
          }
        </ul>
      </div>
    </>
  );
}

export default App;
