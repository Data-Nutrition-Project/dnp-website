import React from "react"

import Accordion from "react-bootstrap/Accordion"
import Card from "react-bootstrap/Card"
import classNames from "classnames"
import PropTypes from "prop-types"
import ReactMarkdown from "react-markdown"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"
import { config } from "@fortawesome/fontawesome-svg-core"

import styles from "./styles.module.css"

config.autoAddCss = false

const Alert = props => {
  const severityMap = {
    fyi: "",
    low: "Severity: Low",
    medium: "Severity: Medium",
    high: "Severity: High",
  }

  return (
    <Accordion className={styles.accordionBody} defaultActiveKey="0">
      <h1 className={styles.alertsHeader}>25 Alerts</h1>
      <div className={styles.parentDiv}>
        <div className={styles.filter}>
          <span className={styles.boldHeader}>Filter:</span>
          <span className={styles.filteredContent}>filtered content</span>
          <FontAwesomeIcon
            className={styles.caretIcon}
            icon={faCaretDown}
            // size="1x"
            sx={{
              position: "relative",
              minHeight: "150vh",
              paddingLeft: "5vh",
            }}
          />
        </div>
        <div className={styles.severity}>
          <div className={styles.parentColors}>
            <span className={styles.boldHeader}>Severity:</span>
            <div className={styles.upperRight}>
              <div className={classNames(styles.box, styles.red)}></div>
              <div className={classNames(styles.box, styles.orange)}></div>
              <div className={classNames(styles.box, styles.yellow)}></div>
              <div className={classNames(styles.box, styles.green)}></div>
            </div>
          </div>
        </div>
      </div>
      <Card className={styles.card}>
        <Card.Header className={styles.columns}>
          <div
            className={classNames(
              styles.alertColumn,
              styles.rectangle,
              styles[props.severity]
            )}
          ></div>
          <div className={classNames(styles.alertColumn)}></div>
          <div className={classNames(styles.alertColumn, styles.spacerColumn)}>
            <p className={styles.titleText}>{props.title}</p>
            <p className={styles.subtitleText}>{props.type}</p>
          </div>
          <div className={classNames(styles.alertColumn, styles.rightColumn)}>
            <p className={classNames(styles.subtitleText)}>
              {severityMap[props.severity]}
            </p>
            <div className={styles.tagsRow}>
              <p>Affected:</p>
              {props.tags.map(tag => {
                return (
                  <p className={classNames(styles.subtitleText, styles.tag)}>
                    {tag}
                  </p>
                )
              })}
            </div>
          </div>
          <Accordion.Toggle className={styles.caret} eventKey="0">
            {/* <img
              className={styles.caretImg}
              src={require("../../images/caret.png")}
              alt="dropdown toggle"
            /> */}
            <p className={styles.moreButton}>MORE</p>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <div className={styles.content}>
            <ReactMarkdown source={props.content} />
          </div>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  )
}

Alert.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  contentType: PropTypes.oneOf(["text", "markdown", "vega-lite"]).isRequired,
  severity: PropTypes.oneOf(["fyi", "low", "medium", "high"]).isRequired,
  type: PropTypes.oneOf([
    "completeness",
    "accuracy",
    "timeliness",
    "consistenty",
    "accessibility",
  ]).isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
}

Alert.defaultProps = {
  title: "OH NOESSSS!!!!",
  content: "### Info ###\n\nAHHHHHHHHH!!!!",
  contentType: "markdown",
  severity: "high",
  type: "completeness",
  tags: ["age"],
}

export default Alert
