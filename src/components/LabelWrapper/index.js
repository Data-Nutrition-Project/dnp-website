import React from "react"
import styles from "./styles.module.css"
import LabelMenus from "../LabelMenus/index"
import LabelTitle from "../LabelTitle"

const LabelWrapper = props => {
  return (
    <div className={styles.labelWrapper}>
      <LabelMenus />
      {props.titleList == "Overview" ? (
        <OverviewComponent />
      ) : props.titleList == "Use Cases and Alerts" ? (
        <UseCases />
      ) : props.titleList == "Maintenance" ? (
        <Maintenaince />
      ) : (
        ""
      )}
    </div>
  )
}

export default LabelWrapper
