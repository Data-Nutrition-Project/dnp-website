import React from "react"
import styles from "./styles.module.css"

const LabelTitle = props => {
  return (
    <div className={styles.labelTitle}>
      <h1 className={styles.headerTitle}>Data Nutrition Label</h1>
      <div className={styles.pageSubHeaderRow}>
        <h2 className={styles.datasetLabelHeader}>
          College Scoreboard Dataset 2020
        </h2>
        <a className={styles.iconLink} href="#">
          <img
            className={styles.iconLinkImg}
            src={require("../../images/linkimg.png")}
            alt="icon for link"
            id="datasetLink"
          />
        </a>
      </div>
      <div className={styles.pageSubHeaderRow}>
        <p className={styles.datasetOriginLink}>US Department of Education</p>
        <a className={styles.iconLink} href="#">
          <img
            className={styles.iconLinkImg}
            src={require("../../images/linkimg.png")}
            alt="icon for link"
            id="datasetLink"
          />
        </a>
      </div>
      <span className={styles.weightedLine}> </span>
    </div>
  )
}

export default LabelTitle
