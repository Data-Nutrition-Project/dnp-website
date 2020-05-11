import React, { useState } from "react"
import MenuItem from "./MenuItem"
//what does the menu item
const LabelMenus = props => {
  const [MenuTitle, setText] = useState("UseCases and Alerts")
  const [itemList, setList] = useState([
    "Use Cases and Alerts",
    "Overview",
    "Maintenance",
  ])
  function clickMenu() {
    //create a function that changes the header text to the
    //create id from the props to change the text to the correct name
    setText("")
  }
  return (
    <div className="Label-Menus" onClick={clickMenu}>
      <div className="section-name">
        {itemList.map(item => {
          return (
            <div key={item.id} className="menu-div">
              <MenuItem name={item} />
              <span className="weighted-line">
                <p>Lorem Ipsum</p>
              </span>
              <p className="menu-paragraph">
                Qui ut occaecat exercitation amet mollit excepteur do aliquip et
                sunt sit aliqua consectetur. Sit minim voluptate aliqua id do
                velit deserunt. Voluptate irure proident esse sint duis mollit
                culpa eiusmod officia ullamco aliqua in magna dolore.
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default LabelMenus
