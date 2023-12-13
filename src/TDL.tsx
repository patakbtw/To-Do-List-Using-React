import "./styles/TDL.scss";
import React, { useState } from "react";
import trash from '../public/trash.svg'

type FormProps = {
  // You also can use type like this React.Dispatch<React.SetStateAction<string[]>>
  onHandleSubmit: (array: (state: string[]) => string[]) => void;
};

type ButtonProps = {
  funNumber: number;
}

const TDL_form = (props: FormProps) => {
  const [textInput, setTextInput] = useState<string>("");
  const { onHandleSubmit } = props;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textInput) {
      // the main issue is a different type of arguments in ptops and here\
      // in type definition in props (line 5) you have function file this function(array) {}
      // but here you have a function like this function(function(oldState) {...}){}
      onHandleSubmit((prevTaskList: string[]) => [...prevTaskList, textInput]);
    }
    setTextInput("");
  };

  return (
    <form className="tdl__form" name="task-form" onSubmit={handleSubmit}>
      <label htmlFor="item" className="tdl__label">
        New task
      </label>
      <input
        type="text"
        id="item"
        className="tdl__input"
        value={textInput}
        onChange={handleInput}
      />
      <button type="submit" className="tdl__btn">
        Add
      </button>
    </form>
  );
};

const TDL_delete = (props: FormProps, coolProps: ButtonProps) => {
  const {onHandleSubmit} = props;
  const {funNumber} = coolProps;

  const handleDelete = (index : number) => {
    onHandleSubmit((prevTaskList: string[]) =>  prevTaskList.splice(index, 1));
  }

  return(
    <button className="tdl__dlt" onClick={()=>{handleDelete(funNumber)}}>
      <img src={trash} alt="" />
    </button>
  );
}

const TDL_li = (task: string, index: number): JSX.Element => {
  // Line 50. key should be stable across renders https://react.dev/learn/rendering-lists#rules-of-keys
  const newId = Math.random().toString(36);


  return (
    <li className="tdl__item" key={task}>
      <input type="checkbox" className="tdl__chkbox" id={`${newId}_${index}`} />
      <label htmlFor={`${newId}_${index}`} className="tdl__task">
        {task}
      </label>
    <TDL_delete onHandleSubmit={}/>
    </li>
  );
};

function TDL() {
  // also it is better do not store JSX Elements in the state. Plain strings are better (and easier to maintain)
  const [someList, setSomeList] = useState<string[]>([]);

  return (
    <>
      <div className="tdl__wrapper">
        <TDL_form onHandleSubmit={setSomeList} />
        <hr className="tdl__separator" />
        <ul className="tdl__list">
          {
            // Look how you can do https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map#syntax
            // pass function as a callback
            someList.map(TDL_li)
          }
        </ul>
      </div>
    </>
  );
}

export default TDL;
