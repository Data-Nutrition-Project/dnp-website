import React from "react"

const LabelTitle = props => {
  return (
    <div className="Label-Title">
      <h1 className="dataset-label-header">{props.title}</h1>
      <span className="light-line">
        <h2 className="dataset-name-link"></h2>
      </span>
      <span className="weighted-line">
        <p className="dataset-origin-link"></p>
      </span>
    </div>
  )
}

// styles.module.css
// import {styles} from "./styles.module.css"
// styles.labelHeader
// className={styles.labelHeader}
export default LabelTitle
