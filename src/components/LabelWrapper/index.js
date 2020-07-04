import React, { Component } from "react"
import { connect } from "react-redux"
import styles from "./styles.module.css"
import LabelMenus from "../LabelMenus/index"
import LabelTitle from "../LabelTitle/index"
import DatasetInfo from "../_Labels_/DatasetInfo/index"
import Overview from "../_Labels_/Overview/index"
import UseCases from "../_Labels_/UseCases/index"
import PropTypes from "prop-types"

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
          {this.props.base === "OVERVIEW" ? (
            <Overview />
          ) : this.props.base === "USE CASES/ALERTS" ? (
            <UseCases />
          ) : this.props.base === "DATASET INFO" ? (
            <DatasetInfo />
          ) : (
            <Overview />
          )}
        </div>
      </div>
    )
  }
}

LabelWrapper.propTypes = {
  base: PropTypes.string.isRequired,
}

LabelWrapper.defaultProps = {
  base: "Overview",
}

const mapState = state => {
  return {
    data: state.data,
    base: state.base,
  }
}

export default connect(mapState, null)(LabelWrapper)
