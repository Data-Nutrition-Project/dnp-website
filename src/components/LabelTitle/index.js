import React from "react"

import PropTypes from "prop-types"

import styles from "./styles.module.css"

const LabelTitle = props => {
  return (
    <div className={styles.labelTitle}>
      <h3 className={styles.headerTitle}>{props.datasetName}</h3>
      <div className={styles.pageSubHeaderRow}></div>
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
