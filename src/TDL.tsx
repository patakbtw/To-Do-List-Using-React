import { useState } from 'react'
import './styles/TDL.scss'

function TDL() {
  function TDL_form(){
    return(
      <form className="tdl__form" name="task-form">
        <label htmlFor="item" className="tdl__label">New task</label>
        <input type="text" id="item" className="tdl__input"/>
        <button type='submit' className="tdl__btn">Add</button>
      </form>
    )
  }
  return (
    <>
      <div className="tdl__wrapper">
        <TDL_form />
        <hr className="tdl__separator" />
      </div>
    </>
  )
}

export default TDL
