import React from "react"
import styles from "./styles.module.css"
const SectionBase = () => {
  return (
    <div className={styles.sectionBase}>
      <h1 className={styles.sectionBaseHeader}></h1>
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

export default SectionBase
