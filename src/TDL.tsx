import '/styles/TDL.scss'
import React, { useState } from 'react';
import trash from '/public/trash.svg';

type FormProps = {
  onHandleSubmit: (array: JSX.Element[]) => void;
}




const TDL_form = (props: FormProps) => {
  const [taskList, setTaskList] = useState<JSX.Element[]>([]);
  const [textInput, setTextInput] = useState<string>("");
  const {onHandleSubmit} = props;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value)
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textInput) {
      onHandleSubmit((prevTaskList:JSX.Element[]) => [
        ...prevTaskList,
        TDL_li(textInput) as JSX.Element,
      ])
    };
    setTextInput('');
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
        onChange = {handleInput}
      />
      <button type="submit" className="tdl__btn">
        Add
      </button>
    </form>
  );
};

const TDL_li = (task: string): JSX.Element => {
  const newId = Math.random().toString(36);
  return (
    <li className="tdl__item" key={newId}>
      <input type="checkbox" className="tdl__chkbox" id={newId} />
      <label htmlFor={newId} className="tdl__task">
        {task}
      </label>
      <button className="tdl__dlt">
        <img src={trash} alt="" />
      </button>
    </li>
  );
};

function TDL() {
  const [someList, setSomeList] = useState<JSX.Element[]>([]);


  return (
    <>
      <div className="tdl__wrapper">
        <TDL_form onHandleSubmit={setSomeList}/>
        <hr className="tdl__separator" />
        <ul className="tdl__list">{someList.map((task: any) => task)}</ul>
      </div>
    </>
  );
}

export default TDL;