import React from "react"
import { Element } from "react-scroll"
import PropTypes from "prop-types"
import ReactMarkdown from "react-markdown"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons"

import ScrollButton from "../../ScrollButton/index.js"

import styles from "./styles.module.css"

class DatasetInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = { opacity: 0 }
  }

  render() {
    const descriptions = this.props.datasetInfo.description || []
    const compositions = this.props.datasetInfo.composition || []
    const provenances = this.props.datasetInfo.provenance || []
    const collections = this.props.datasetInfo.collection || []
    const managements = this.props.datasetInfo.management || []

    return (
      <>
        <ScrollButton />
        <div className={styles.flexbox}>
          <h3 className={styles.datasetTitle}>Dataset Information</h3>
          <span className={styles.datasetUnderlineBold}></span>
        </div>
        <Element id={"Description-title"}> </Element>
        <p className={styles.datasetParagraph}>
          Information about the ongoing management of the dataset, such as how
          the data will be maintained, updated, and the best contact for
          further inquiries.
        </p>
        <p className={styles.datasetParagraph}>
          The categories and questions that comprise this section are drawn from 
          the terrific work of many teams; we have drawn heavily on the work of{' '}
          <a href="https://arxiv.org/abs/1803.09010" target="_blank" rel="noreferrer">
            Datasheets for Datasets <FontAwesomeIcon icon={faExternalLinkAlt} />
          </a>, 
          and supplemented that with work by{' '}
          <a href="https://ai-global.org/" target="_blank" rel="noreferrer">
            AI Global <FontAwesomeIcon icon={faExternalLinkAlt} />
          </a>,{' '}
          <a href="http://data.world/" target="_blank" rel="noreferrer">
            data.world <FontAwesomeIcon icon={faExternalLinkAlt} />
          </a>, and{' '}
          <a href="https://deon.drivendata.org/" target="_blank" rel="noreferrer">
            DrivenData <FontAwesomeIcon icon={faExternalLinkAlt} />
          </a>. 
          We further refined this section based on feedback from colleagues at the 
          Department of Education, AI Global, and Memorial Sloan Kettering.
        </p>

        <span className={styles.datasetUnderlineBold}></span>

        <h3 className={styles.datasetSubHeader}>Description</h3>
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

        <Element id={"Composition-title"}> </Element>
        <span className={styles.datasetUnderline}></span>

        <h3 className={styles.datasetSubHeader}>Composition</h3>

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
        <Element id={"Provenance-title"}> </Element>
        <span className={styles.datasetUnderline}></span>

        <h3 className={styles.datasetSubHeader}>Provenance</h3>

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
        <Element id={"Collection-title"}></Element>
        <span className={styles.datasetUnderline}></span>

        <h3 className={styles.datasetSubHeader}>Collection</h3>

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

        <Element id={"Management-title"}> </Element>
        <span className={styles.datasetUnderline}></span>
        <h3 className={styles.datasetSubHeader}>Management</h3>

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
      </>
    )
  }
}

DatasetInfo.propTypes = {
  datasetInfo: PropTypes.shape({
    description: PropTypes.object,
    composition: PropTypes.object,
    provenance: PropTypes.object,
    collection: PropTypes.object,
    management: PropTypes.object
  }).isRequired,
  shape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number,
  })
}

export default DatasetInfo
