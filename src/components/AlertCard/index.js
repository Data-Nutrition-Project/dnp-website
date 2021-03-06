import React, { useState } from "react"

import Accordion from "react-bootstrap/Accordion"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"

import Card from "react-bootstrap/Card"
import classNames from "classnames"
import PropTypes from "prop-types"
import ReactMarkdown from "react-markdown"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons"

import styles from "./styles.module.css"

const AlertCard = props => {
  const severityMap = {
    0: "Mitigation Possible: FYI",
    1: "Mitigation Possible: Yes",
    2: "Mitigation Possible: Maybe",
    3: "Mitigation Possible: No",
  }

  const [toggle, setToggle] = useState(false)
  const toggleCaret = () => setToggle(!toggle)
  const sevClassName = severityMap[props.severity].split(": ")[1].toLowerCase()

  return (
    <Accordion>
      <Card className={styles.card}>
        <Card.Header className={styles.columns}>
          <div
            className={classNames(styles.alertColumn, styles[sevClassName])}
          ></div>

          <div className={styles.flexGrow}>
            <p className={toggle ? styles.titleBold : styles.titleText}>
              {props.title}
            </p>
            <Accordion.Toggle
              onClick={toggleCaret}
              className={styles.caret}
              eventKey="0"
            >
              <span className={styles.moreButton}>
                {toggle ? (
                  <FontAwesomeIcon icon={faAngleDown} />
                ) : (
                  <FontAwesomeIcon icon={faAngleRight} />
                )}
              </span>
            </Accordion.Toggle>
          </div>
        </Card.Header>

        <Accordion.Collapse eventKey="0">
          <div className={styles.flexCollapse}>
            <span className={styles.content} />

            <div className={styles.childCollapse}>
              <Container>
                <Row>
                  <Col>
                    {props.severity != 0 && (
                      <p className={styles.subtitleText}>
                        Mitigation Possible:{" "}
                        <b className={styles.propertyValue}>{sevClassName}</b>
                      </p>
                    )}
                    <p className={styles.subtitleText}>
                      Category:{" "}
                      <b className={styles.propertyValue}>{props.category}</b>
                    </p>
                    {props.severity != 0 && (
                      <div className={styles.subtitleText}>
                        Potential for Harm:{" "}
                        {props.tags.map((tag, i) => {
                          return (
                            <b key={i} className={styles.propertyValue}>
                              {tag}
                            </b>
                          )
                        })}
                      </div>
                    )}
                  </Col>
                  <span className={styles.lineBreakOne}></span>
                </Row>

                <ReactMarkdown
                  className={styles.contentParagraph}
                  source={props.content}
                />
                {props.mitigation !== undefined && (
                  <div className={styles.subtitleText}>
                    <b>Possible Mitigations: </b>
                    <p className={styles.propertyValue}>{props.mitigation}</p>
                  </div>
                )}

                <span className={styles.lineBreakTwo}></span>
              </Container>
            </div>
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
  severity: PropTypes.oneOf([0, 1, 2, 3]).isRequired,
  type: PropTypes.oneOf([
    "completeness",
    "accuracy",
    "timeliness",
    "consistenty",
    "accessibility",
  ]).isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  mitigation: PropTypes.string,
}

AlertCard.defaultProps = {
  title: "OH NOESSSS!!!!",
  content: "### Info ###\n\nAHHHHHHHHH!!!!",
  contentType: "markdown",
  severity: 0,
  type: "completeness",
  tags: ["age"],
}

export default AlertCard
