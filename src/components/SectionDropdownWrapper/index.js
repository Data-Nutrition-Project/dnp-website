import React from "react"
import UseCasesDropdown from "../UseCasesDropdown"
import DatasetDropdown from "../DatasetDropdown"
import SectionBase from "../SectionBase"
import LabelMenus from "../LabelMenus"
import styles from "./styles.module.css"

const SectionDropdonwWrapper = () => {
  return (
    <div>
      <div className={styles.flexbox}>
        <LabelMenus />
        <UseCasesDropdown />
        <SectionBase />
      </div>
      <div className={styles.flexbox}>
        <LabelMenus />
        <DatasetDropdown />
        <SectionBase />
      </div>
    </div>
  )
}

export default SectionDropdonwWrapper
