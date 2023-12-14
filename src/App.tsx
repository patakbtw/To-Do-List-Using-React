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

const ToDoList_delete = () => {

  const handleDelete = () => {
    console.log('yuppie')

  }

  return(
    <button className="to-do-list__dlt" onClick={handleDelete}>
      <img src={trash} alt="" />
    </button>
  );
}

const ToDoList_li = (task: string, index: number): JSX.Element => {
  return (
    <li className="to-do-list__item" key={index}>
      <input type="checkbox" className="to-do-list__chkbox" id={`${index}`} />
      <label htmlFor={`${index}`} className="to-do-list__task">
        {task}
      </label>
      <ToDoList_delete />
    </li>
  );
};

function App() {
  const [someList, setSomeList] = useState<string[]>([]);

  return (
    <>
      <div className="to-do-list__wrapper">
        <ToDoList_form onHandleSubmit={setSomeList} />
        <hr className="to-do-list__separator" />
        <ul className="to-do-list__list">
          {
            someList.map(ToDoList_li)
          }
        </ul>
      </div>
    </>
  );
}

export default App;
