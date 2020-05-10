import React, { useState } from "react"
//what does the menu item
const LabelMenus = props => {
  const [MenuTitle, setText] = useState("UseCases and Alerts")
  function clickMenu() {
    //create a function that changes the header text to the
    //create id from the props to change the text to the correct name
    setText("")
  }
  return (
    <div className="Label-Menus" onClick={clickMenu}>
      <header className="section-name"></header>
      <span className="weighted-line">
        <p>Lorem Ipsum</p>
      </span>
      <p></p>
    </div>
  )
}

export default LabelMenus
