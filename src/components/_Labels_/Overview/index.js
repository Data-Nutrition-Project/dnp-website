import React, { Component } from "react"
import SectionBase from "../../SectionBase/index.js"
import styles from "./styles.module.css"
import { connect } from "react-redux"
import { fetchOverviewThunk } from "../../../store/overviewStore"
class Overview extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const overviewInfo = this.props.overview
    const collection = overviewInfo.collection || []
    return (
      <SectionBase>
        <div className={styles.flexbox}>
          <h1 className={styles.overviewTitle}>Overview</h1>
          <span className={styles.overviewUnderline}></span>
        </div>
        <h2 className={styles.overviewSubHeader}>About</h2>
        <p className={styles.overviewParagraph}>
          Lorem Ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
          ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem lorem
          ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
          lorem ipsum lorem ipsum lorem ipsum lorem.
        </p>
        <span className={styles.overviewUnderline}></span>
        <div>
          <h2 className={styles.overviewSubHeader}>Motivation</h2>
          <p className={styles.overviewParagraph}>
            The questions in this section are primarily intended to encourage
            dataset creators to clearly articulate their reasons for creating
            the dataset and to promote transparency about funding interests.
          </p>
        </div>

        <span className={styles.overviewUnderline}></span>
        <ol className={styles.overviewList}>
          {collection.map(overview => (
            <li>{overview.question}</li>
          ))}
        </ol>
        <span className={styles.overviewUnderline}></span>
        <h2 className={styles.overviewSubHeader}>Composition</h2>
      </SectionBase>
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
