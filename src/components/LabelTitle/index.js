import React from "react"

import PropTypes from "prop-types"

import styles from "./styles.module.css"

const LabelTitle = props => {
  return (
    <div className={styles.labelTitle}>
      <h1 className={styles.headerTitle}>{props.datasetName}</h1>
      <div className={styles.pageSubHeaderRow}></div>

      <div className={styles.datasetOrigin}>
        <p className={styles.datasetOriginLink}>Dataset Nutrition Label</p>
        <div className={styles.link}>
          <a className={styles.datasetLink} href={props.datasetOrgLink}>
            <img
              alt=""
              id="datasetLink"
              src={require("../../images/linkimg.png")}
            />
          </a>
        </div>
      </div>
    </div>
  )
}

LabelTitle.propTypes = {
  datasetName: PropTypes.string.isRequired,
  datasetOrgLink: PropTypes.string.isRequired,
}

LabelTitle.defaultProps = {
  datasetName: "Dataset Name"
}

export default LabelTitle
