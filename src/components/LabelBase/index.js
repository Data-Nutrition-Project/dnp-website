import React from "react"
import styles from "./styles.module.css"
const LabelBase = () => {
  return (
    <div className={styles.labelBase}>
      <header className={styles.labelBaseHeader}></header>
      <span className={styles.weightedLine}>
        <h2></h2>
      </span>
      <span className={styles.lightLine}>
        <h1></h1>
      </span>
      <span className={styles.lightLine}>
        <h1></h1>
      </span>
    </div>
  )
}

export default LabelBase
