import React from "react"
import { connect } from "react-redux"
import styles from "./styles.module.css"
import SectionBase from "../../SectionBase/index.js"
import ReactMarkdown from "react-markdown"
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
      <SectionBase>
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
        <ol className={styles.datasetOl}>
          {descriptions.map(description => (
            <li className={styles.datasetLi}>
              {description.question}
              {description.type === "markdown" ? (
                <ReactMarkdown
                  className={styles.datasetMrkdwn}
                  source={description.answer || description.content}
                />
              ) : (
                ""
              )}
            </li>
          ))}
        </ol>
        <span className={styles.datasetUnderline}></span>
        <h2 className={styles.datasetSubHeader}>Composition</h2>
        <ol className={styles.datasetOl}>
          {compositions.map(composition => (
            <li className={styles.datasetLi}>
              {composition.question}
              {composition.type === "markdown" ? (
                <ReactMarkdown
                  className={styles.datasetMrkdwn}
                  source={composition.answer || composition.content}
                />
              ) : (
                ""
              )}
            </li>
          ))}
        </ol>
        <span className={styles.datasetUnderline}></span>
        <h2 className={styles.datasetSubHeader}>Provenance</h2>
        <ol className={styles.datasetOl}>
          {provenances.map(provenance => (
            <li className={styles.datasetLi}>
              {provenance.question}
              {provenance.type === "markdown" ? (
                <ReactMarkdown
                  className={styles.datasetMrkdwn}
                  source={provenance.answer || provenance.content}
                />
              ) : (
                ""
              )}
            </li>
          ))}
        </ol>
        <span className={styles.datasetUnderline}></span>

        <h2 className={styles.datasetSubHeader}>Collection</h2>
        <ol className={styles.datasetOl}>
          {collections.map(collection => (
            <li className={styles.datasetLi}>
              {collection.question}
              {collection.type === "markdown" ? (
                <ReactMarkdown
                  className={styles.datasetMrkdwn}
                  source={collection.answer || collection.content}
                />
              ) : (
                ""
              )}
            </li>
          ))}
        </ol>
        <span className={styles.datasetUnderline}></span>
        <h2 className={styles.datasetSubHeader}>Management</h2>
        <ol className={styles.datasetOl}>
          {managements.map(management => (
            <li className={styles.datasetLi}>
              {management.question}
              {management.type === "markdown" ? (
                <ReactMarkdown
                  className={styles.datasetMrkdwn}
                  source={management.answer || management.content}
                />
              ) : (
                ""
              )}
            </li>
          ))}
        </ol>
        <span className={styles.datasetUnderline}></span>
      </SectionBase>
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
