import React from "react"
import styles from "./styles.module.css"
const LabelTitle = props => {
  return (
    <div className={styles.labelTitle}>
      <header>Data Nutrition Label</header>
      {/* props.title */}
      <h1 className={styles.datasetLabelHeader}>
        College Scoreboard Dataset 2020
      </h1>

      <h2 className={styles.datasetNameLink}></h2>

      {/* {props.orginLink} */}
      <span className="link">
        <p className={styles.datasetOriginLink}>US Department of Education</p>
        <a className={styles.datasetLink} href="#">
          <img src="/linkimg.png" alt="" id="datasetLink" />
        </a>
      </span>
      <span className={styles.weightedLine}> </span>
    </div>
  )
}

// styles.module.css
// import {styles} from "./styles.module.css"
// styles.labelHeader
// className={styles.labelHeader}
export default LabelTitle
