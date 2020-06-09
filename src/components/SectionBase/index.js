import React from "react"
import styles from "./styles.module.css"
import Overview from "../_Labels_/Overview/index"
// import { getDataThunk } from "../../store/labelBase"
// import { connect } from "react-redux"
const SectionBase = ({ children }) => {
  // componentDidMount() {
  //   this.props.getDataThunk()
  // }

  return (
    <div className={styles.sectionBase}>
      {children}
      {/* <h1 className={styles.sectionBaseHeader}></h1>
      <span className={styles.weightedLine}>
        <h2></h2>
      </span>
      <span className={styles.lightLine}>
        <h1></h1>
      </span>
      <span className={styles.lightLine}>
        <h1></h1>
      </span> */}
    </div>
  )
}
// const mapState = state => {
//   return {
//     data: state.data,
//   }
// }
// const mapDispatch = dispatch => {
//   return {
//     getData: () => dispatch(getDataThunk()),
//   }
// }

export default SectionBase
