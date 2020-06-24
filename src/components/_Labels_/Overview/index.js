import React, { Component } from "react"
import SectionBase from "../../SectionBase/index.js"
import styles from "./styles.module.css"
import { connect } from "react-redux"
import { fetchOverviewThunk } from "../../../store/overviewStore"
import { Accordion, Card } from "react-bootstrap"

class Overview extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const overviewInfo = this.props.overview
    const description = overviewInfo.description || []
    return (
      <div>
        <div className={styles.flexbox}>
          <h1 className={styles.overviewTitle}>Overview</h1>
          <span className={styles.overviewUnderlineBold}></span>
        </div>
        <h2 className={styles.overviewSubHeader}>Description</h2>
        <ol className={styles.overviewList}>
          {description.map(overview => (
            <li>{overview.question}</li>
          ))}
        </ol>
        <span className={styles.overviewUnderline}></span>
        <h2 className={styles.overviewSubHeader}>Composition</h2>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    overview: state.overview,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOverview: dispatch(fetchOverviewThunk()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Overview)
