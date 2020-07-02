import React from "react"
import { connect } from "react-redux"
import styles from "./styles.module.css"
import { fetchOverviewThunk } from "../../../store/overviewStore"

class DatasetInfo extends React.Component {
  render() {
    const overviewInfo = this.props.overview
    const description = overviewInfo.description || []
    return (
      <div className={styles.overviewBase}>
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

export default connect(mapStateToProps, mapDispatchToProps)(DatasetInfo)
