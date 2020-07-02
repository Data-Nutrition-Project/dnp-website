import React from "react"
import { connect } from "react-redux"
import styles from "./styles.module.css"
import { fetchOverviewThunk } from "../../../store/overviewStore"

class DatasetInfo extends React.Component {
  render() {
    const overviewInfo = this.props.overview
    const description = overviewInfo.description || []
    const collections = overviewInfo.collection || []
    return (
      <div className={styles.overviewBase}>
        <div className={styles.flexbox}>
          <h1 className={styles.overviewTitle}>Dataset Information</h1>
          <span className={styles.overviewUnderlineBold}></span>
        </div>
        <h2 className={styles.overviewSubHeader}>About</h2>
        <p className={styles.overviewParagraph}>Tell us about this dataset</p>
        <ol className={styles.overviewList}>
          {description.map(overview => (
            <li>{overview.question}</li>
          ))}
        </ol>
        <span className={styles.overviewUnderline}></span>
        <h2 className={styles.overviewSubHeader}>Motivation</h2>
        <p className={styles.overviewParagraph}>
          The questions in this section are primarily intended to encourage
          dataset creators to clearly articulate their reasons for creating the
          dataset and to promote transparency about funding interests.
        </p>
        <p className={styles.questionSubHeader}>Intended Purpose:</p>
        <p className={styles.overviewParagraph}>
          The College Scorecard project provides data to help students and
          families compare college costs and outcomes as they weight the
          tradeoffs of different colleges, accouting for their own needs and
          educational goals.
        </p>

        <span className={styles.overviewUnderline}></span>
        <h2 className={styles.overviewSubHeader}>Composition</h2>
        <span className={styles.overviewUnderline}></span>
        <h2 className={styles.overviewSubHeader}>Collection</h2>
        <ol className={styles.overviewList}>
          {collections.map(collection => (
            <li>{collection.question}</li>
          ))}
        </ol>
        <span className={styles.overviewUnderline}></span>
        <h2 className={styles.overviewSubHeader}>Management</h2>
        <span className={styles.overviewUnderline}></span>
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

export default connect(mapStateToProps, mapDispatchToProps)(DatasetInfo)
