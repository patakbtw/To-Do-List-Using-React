import { useState } from 'react'
import './styles/TDL.scss'

function TDL() {
  const handleSubmit = (e) => {
    e.preventDefault();
    
  }
  function TDL_form(){
    return(
      <form className="tdl__form" name="task-form" onSubmit={handleSubmit}>
        <label htmlFor="item" className="tdl__label">New task</label>
        <input type="text" id="item" className="tdl__input"/>
        <button type="submit" className="tdl__btn">Add</button>
      </form>
    )
  }
  function TDL_li(){
    const newId = Math.random().toString(36);
    return(
      <li>
        <input type='checkbox' className='tdl__chkbox' id={newId}/>
        <label htmlFor={newId}></label>
      </li>
    )
  }
  return (
    <>
      <div className="tdl__wrapper">
        <TDL_form />
        <hr className="tdl__separator" />
        <ul className="tdl__list">
          <TDL_li/>
        </ul>
      </div>
    </>
  )
}

export default TDL
