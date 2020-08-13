import React from "react"

import Accordion from "react-bootstrap/Accordion"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"

import Card from "react-bootstrap/Card"
import classNames from "classnames"
import PropTypes from "prop-types"
import ReactMarkdown from "react-markdown"

import styles from "./styles.module.css"

const AlertCard = props => {
  const severityMap = {
    fyi: "",
    low: "Severity: Low",
    medium: "Severity: Medium",
    high: "Severity: High",
  }

  // const alerts = props.alerts.filter(item => item)
  // const alertLength = alerts.length
  // const highSeverity = props.predictions.alerts.severity === 3
  // const midSeverity = props.predictions.alerts.severity === 2
  // const lowSeverity = props.predictions.alerts.severity === 1
  // const fyi = props.predictions.alerts.severity === 0
  const alertLength = 25
  // console.log("props", props.content)
  return (
    <Accordion className={styles.accordionBody}>
      {/* end */}
      <Card className={styles.card}>
        <Card.Header className={styles.columns}>
          <Container>
            <Row className="showGrid" style={{ height: 68 }}>
              <div
                className={classNames(
                  styles.alertColumn,
                  styles.rectangle,
                  styles[props.severity]
                )}
              ></div>
              <div className={classNames(styles.alertColumn)}></div>
              <Col
                xs={1}
                md={4}
                className={classNames(styles.alertColumn, styles.spacerColumn)}
              >
                <p className={styles.titleText}>{props.title}</p>
                <p className={styles.subtitleText}>{props.type}</p>
              </Col>
              {/* Second Col */}
              <Col xs={4} md={4}>
                <Accordion.Toggle className={styles.caret} eventKey="0">
                  <p className={styles.moreButton}>MORE</p>
                </Accordion.Toggle>
              </Col>
              {/* Third Col */}

              <Col
                xs={1}
                md={4}
                className={classNames(styles.alertColumn, styles.rightColumn)}
              >
                <div className={styles.severityRow}>
                  {/* <p className={classNames(styles.subtitleText)}> */}
                  <p className={classNames(styles.subtitleText, styles.tag)}>
                    {severityMap[props.severity]}
                  </p>
                  {/* </p> */}
                </div>
                <div className={styles.tagsRow}>
                  <p className={classNames(styles.subtitleText, styles.tag)}>
                    Affected:
                  </p>
                  {props.tags.map(tag => {
                    return (
                      <p
                        className={classNames(styles.subtitleText, styles.tag)}
                      >
                        {tag}
                      </p>
                    )
                  })}
                </div>
              </Col>
            </Row>
          </Container>
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

AlertCard.propTypes = {
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

AlertCard.defaultProps = {
  title: "OH NOESSSS!!!!",
  content: "### Info ###\n\nAHHHHHHHHH!!!!",
  contentType: "markdown",
  severity: "high",
  type: "completeness",
  tags: ["age"],
}

export default AlertCard
