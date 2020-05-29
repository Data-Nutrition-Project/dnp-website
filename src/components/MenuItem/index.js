import React from "React"
import { toggleHighlight } from "../../store/labelMenu"
import styles from "./styles.module.css"
const MenuItem = props => {
  return (
    <div
      className={styles.regular}
      onClick={() => {
        props.dispatch(toggleHighlight(!highlight))
      }}
    >
      <h1>{props.name}</h1>
      {highlight ? (
        <div className={styles.highlightLabel} />
      ) : (
        <div className={styles.regular} />
      )}
      {props.key}
    </div>
  )
}

export default MenuItem
