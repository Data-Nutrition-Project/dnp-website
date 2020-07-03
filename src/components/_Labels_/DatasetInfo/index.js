import React from "react"
import { connect } from "react-redux"
import styles from "./styles.module.css"
import { fetchDatasetThunk } from "../../../store/datasetStore"

class DatasetInfo extends React.Component {
  render() {
    const datasetInfo = this.props.dataset
    const descriptions = datasetInfo.description || []
    const compositions = datasetInfo.composition || []
    const provenances = datasetInfo.provenance || []
    const collections = datasetInfo.collection || []
    const managements = datasetInfo.management || []
    return (
      <div className={styles.datasetBase}>
        <div className={styles.flexbox}>
          <h1 className={styles.datasetTitle}>Dataset Information</h1>
          <span className={styles.datasetUnderlineBold}></span>
        </div>
        <p className={styles.datasetParagraph}>
          Information about the ongoing management of the dataset, such as how
          the data will be maintained, updated, and the best contact for further
          inquiries.
        </p>

        <span className={styles.datasetUnderline}></span>
        <h2 className={styles.datasetSubHeader}>Description</h2>
        <ol className={styles.datasetList}>
          {descriptions.map(description => (
            <li>{description.question}</li>
          ))}
        </ol>
        <span className={styles.datasetUnderline}></span>
        <h2 className={styles.datasetSubHeader}>Composition</h2>
        <ol className={styles.datasetList}>
          {compositions.map(composition => (
            <li>{composition.question}</li>
          ))}
        </ol>
        <span className={styles.datasetUnderline}></span>
        <h2 className={styles.datasetSubHeader}>Provenance</h2>
        <ol className={styles.datasetList}>
          {provenances.map(provenance => (
            <li>{provenance.question}</li>
          ))}
        </ol>
        <span className={styles.datasetUnderline}></span>

        <h2 className={styles.datasetSubHeader}>Collection</h2>
        <ol className={styles.datasetList}>
          {collections.map(collection => (
            <li>{collection.question}</li>
          ))}
        </ol>
        <span className={styles.datasetUnderline}></span>
        <h2 className={styles.datasetSubHeader}>Management</h2>
        <ol className={styles.datasetList}>
          {managements.map(management => (
            <li>{management.question}</li>
          ))}
        </ol>
        <span className={styles.datasetUnderline}></span>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    dataset: state.dataset,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDataset: dispatch(fetchDatasetThunk()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DatasetInfo)
