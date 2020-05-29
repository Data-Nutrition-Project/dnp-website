import React from "react"
import styles from "./styles.module.css"
import LabelMenus from "../LabelMenus/index"
import { getDataThunk } from "../../store/labelWrapper"
import { connect } from "react-redux"

const LabelWrapper = () => {
  return (
    <div className={styles.labelWrapper}>
      <LabelMenus />
    </div>
  )
}

const mapState = state => {
  return {
    data: state.data,
  }
}
const mapDispatch = dispatch => {
  return {
    getData: () => dispatch(getDataThunk()),
  }
}

export default connect(mapState, mapDispatch)(LabelWrapper)
