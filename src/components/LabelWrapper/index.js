import React, { Component } from "react"
import { connect } from "react-redux"
import styles from "./styles.module.css"
import LabelMenus from "../LabelMenus/index"
import LabelTitle from "../LabelTitle/index"
import Maintenance from "../_Labels_/Maintenance/index"
import Overview from "../_Labels_/Overview/index"
import UseCases from "../_Labels_/UseCases/index"

class LabelWrapper extends Component {
  constructor() {
    super()
    this.state = {}
  }

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
    overview: state.overview,
  }
}

export default connect(mapState, null)(LabelWrapper)
