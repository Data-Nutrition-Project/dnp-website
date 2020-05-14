import React from "react"
import styles from "./styles.module.css"
const LabelTitle = props => {
  return (
    <div className={styles.labelTitle}>
      <header>Data Nutrition Label</header>
      <h1 className={styles.datasetLabelHeader}>{props.title}</h1>
      <span className={styles.lightLine}>
        <h2 className={styles.datasetNameLink}></h2>
      </span>
      <span className={styles.weightedLine}>
        <p className={styles.dataSetOriginLink}></p>
      </span>
    </div>
  )
}

// styles.module.css
// import {styles} from "./styles.module.css"
// styles.labelHeader
// className={styles.labelHeader}
export default LabelTitle
