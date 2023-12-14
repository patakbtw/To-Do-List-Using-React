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

type ToDoList_liProps = {
  task: string,
  index: number,
  items: string[],
  removeItem: (id: number) => void // Исправлено: указан тип параметра id
};

const ToDoList_li = (props: ToDoList_liProps): JSX.Element => {
  return (
    <>{props.items.map((item, index) => (  // Исправлено: добавлено указание на items из props
      <li className="toDoList__item" key={index}>
        <input type="checkbox" className="toDoList__chkbox" id={`${props.index}`} />
        <label htmlFor={`${props.index}`} className="toDoList__task">
          {item} {/* Исправлено: выводим значение item */}
        </label>
        <button className="toDoList__dlt" onClick={() => props.removeItem(props.index)}>
          {/* Исправлено: передаем props.index вместо item.id */}
          <img src={trash} alt="" />
        </button>
      </li>
    ))}
    </>
  );
};

function App() {
  const [someList, setSomeList] = useState<string[]>([]);

  const removeItem = (id: number) => {
    setSomeList((prevTaskList: string[]) => prevTaskList.filter((_, index) => index !== id));
    // Исправлено: используем filter для удаления элемента по индексу
  };

  return (
    <>
      <div className="toDoList__wrapper">
				<ToDoList_form onHandleSubmit={setSomeList} />
        <hr className="toDoList__separator" />
        <ul className="toDoList__list">
          <ToDoList_li items={someList} task="" index={0} removeItem={removeItem} />
          {/* Исправлено: передаем значения для task и index */}
        </ul>
      </div>
    </>
  );
}


export default App;

