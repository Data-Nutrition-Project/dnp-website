import React from "React"
import { toggleHighlight } from "../../store/labelMenu"
import styles from "./styles.module.css"
const MenuItem = props => {
  //function should be from the redux store to setState to the name of the menuItem

  //take in variable highlighted and to add a className
  //then handle the css
  //each name should have a key use the key in the redux store
  //add PropTypes to check for bugs ,and default values
  const highlightMenu = ({ highlight, dispatch }) => {
    const newColor =
      props.color === "" ? '<div className="div-highlight"></div>' : ""
    props.updateBackground(newColor)
  }
  return (
    // props.highlighted
    //props.onClick() rename
    <div
      className={styles.regular}
      onClick={() => {
        props.dispatch(toggleHighlight(!highlight))
      }}
    >
      {/* onClick props  */}
      <h1>{props.name}</h1>
      {highlight ? (
        <div className={styles.highlightLabel} />
      ) : (
        <div className={styles.regular} />
      )}
      {props.key}
      {/* key  */}
    </div>
  )
}

export default MenuItem
