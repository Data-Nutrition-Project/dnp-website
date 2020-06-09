import React, { Component } from "react"
import { connect } from "react-redux"
import styles from "./styles.module.css"
import LabelMenus from "../LabelMenus/index"
import LabelTitle from "../LabelTitle/index"
// import { fetchDataThunk } from "../store/labelBase.js"
import Maintenance from "../_Labels_/Maintenance/index"
import Overview from "../_Labels_/Overview/index"
import UseCases from "../_Labels_/UseCases/index"
import SectionBase from "../SectionBase/index"
// import LabelTitle from "../LabelTitle"

class LabelWrapper extends Component {
  constructor() {
    super()
    this.state = {}
  }
  // componentDidMount() {
  //   this.props.fetchDataThunk()
  // }
  render() {
    return (
      <div className={styles.labelWrapper}>
        <LabelTitle />
        <div className={styles.flexComponents}>
          <LabelMenus />
          {this.props.base === "Overview" && <Overview />}
          {this.props.base === "Use Cases and Alerts" && <UseCases />}
          {this.props.base === "Maintenance" && <Maintenance />}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    data: state.data,
    base: state.base,
  }
}
// const mapDispatch = dispatch => {
//   return {
//     fetchDataThunk: () => dispatch(fetchDataThunk()),
//   }
// }
export default connect(mapState, null)(LabelWrapper)
