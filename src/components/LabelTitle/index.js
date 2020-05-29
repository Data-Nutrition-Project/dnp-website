import React from "react"
import styles from "./styles.module.css"
const LabelTitle = props => {
  return (
    <div className={styles.labelTitle}>
      <header>Data Nutrition Label</header>
      <h1 className={styles.datasetLabelHeader}>
        College Scoreboard Dataset 2020
      </h1>
      <div className={styles.link}>
        <h2 className={styles.datasetNameLink}></h2>
      </div>
      <div className={styles.link}>
        <a className={styles.datasetBoldLink} href="#">
          <img src="/linkimg.png" alt="" id="datasetLink" />
        </a>
      </div>
      <div className={styles.link}>
        <p className={styles.datasetOriginLink}>US Department of Education</p>
      </div>
      <div className={styles.link}>
        <a className={styles.datasetLink} href="#">
          <img src="/linkimg.png" alt="" id="datasetLink" />
        </a>
      </div>
      <span className={styles.weightedLine}> </span>
    </div>
  )
}

export default LabelTitle
