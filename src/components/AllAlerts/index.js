import React, { Component } from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Accordion from "react-bootstrap/Accordion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"
import classNames from "classnames"
import PropTypes from "prop-types"
import styles from "./styles.module.css"

import AlertCard from "../AlertCard/index.js"

import { config } from "@fortawesome/fontawesome-svg-core"

config.autoAddCss = false

var sev

class AllAlerts extends Component {
  constructor(props) {
    super(props)
    const preds = []
    const tags = []
    const predictions = this.props.predictions
    const alerts = this.props.alerts
    for (const [prediction, info] of Object.entries(predictions)) {
      info.alerts.map(alert => {
        preds.push(alert)
      })
    }
    for (const [alert, info] of Object.entries(alerts)) {
      let string = info.tags
      tags.push(string)
    }
    this.state = { preds, filtered: [], tags, selectedItem: "" }
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    this.setState({ filtered: [...this.state.preds] })
  }
  componentWillUnmount() {
    this.setState({ filtered: [...this.state.preds] })
  }

  onChange(e) {
    e.preventDefault()
    if (
      !e.target.value ||
      e.target.value === " " ||
      e.target.value === "" ||
      e.target.value === "Filtered Content:"
    )
      this.setState({ filtered: [...this.state.preds] })
    else {
      let filtered = []
      filtered = this.state.preds.filter(item =>
        this.props.alerts[item.alert].tags.includes(e.target.value)
      )
      this.setState({ filtered })
    }
    console.log("eee", e.target.value)
  }

  render() {
    const alerts = this.props.alerts
    const predictions = this.props.predictions
    const filteredLength = this.state.filtered.length
    console.log("filt", filteredLength)
    const alertLength = Object.keys(predictions).length

    let high = 0
    let mid = 0
    let low = 0
    let fyi = 0
    let items = []

    for (const [prediction, info] of Object.entries(predictions)) {
      info.alerts.map(alert => {
        if (alert.severity == 3) {
          sev = "high"
          high++
        } else if (alert.severity === 2) {
          sev = "medium"
          mid++
        } else if (alert.severity === 1) {
          sev = "low"
          low++
        } else if (alert.severity === 0) {
          sev = "fyi"
          fyi++
        } else {
          sev = ""
        }
      })
    }

    // var onChangeListener = document.getElementById("select")
    // onChangeListener.addEventListener("click", () => {
    //   console.log("click")
    // })
    Object.keys(alerts).map(alert => alert)
    let sliced = this.state.tags.slice(0, 3)
    return (
      <Accordion className={styles.accordionBody}>
        <h1 className={styles.alertsHeader}>{filteredLength} Alerts</h1>
        <div className={styles.parentDiv}>
          <div className={styles.filter}>
            <span className={styles.boldHeader}>Filter:</span>
            <select
              className={styles.selct}
              id="select"
              onChange={this.onChange}
            >
              {/* <FontAwesomeIcon
                className={styles.caretIcon}
                icon={faCaretDown}
                // size="1x"
                sx={{
                  position: "relative",
                  minHeight: "150vh",
                  paddingLeft: "5vh",
                }}
              /> */}
              <option default>Filtered Content:</option>

              {sliced.map((tag, i) => {
                return (
                  <option value={tag} key={i}>
                    {tag}
                  </option>
                )
              })}
            </select>
          </div>
          <div className={styles.severity}>
            <div className={styles.parentColors}>
              <Container>
                <Row>
                  <Col sm={2.5} className={styles.boldHeader}>
                    Severity:
                  </Col>
                  <div className={styles.flexCol}>
                    <Col md={11} className={styles.upperRight}>
                      <Row>
                        <Col sm={4} className={styles.flexCol}>
                          <div
                            className={classNames(styles.box, styles.red)}
                          ></div>
                          <p className={styles.sevParagraph}>{high} High</p>
                        </Col>

                        <Col sm={4} className={styles.flexCol}>
                          <div
                            className={classNames(styles.box, styles.orange)}
                          ></div>
                          <p className={styles.sevParagraph}>{mid} Mid</p>
                        </Col>

                        <Col sm={4} className={styles.flexCol}>
                          <div
                            className={classNames(styles.box, styles.yellow)}
                          ></div>
                          <p className={styles.sevParagraph}> {low} Low</p>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={12} className={styles.upperLeft}>
                      <Row>
                        <Col sm={12} className={styles.flexCol}>
                          <div
                            className={classNames(styles.box, styles.green)}
                          ></div>
                          <p className={styles.sevParagraph}> {fyi} Fyi </p>
                        </Col>
                      </Row>
                    </Col>
                  </div>
                </Row>
              </Container>
            </div>
          </div>
        </div>
        {!alertLength ? (
          <h1>LOADING...</h1>
        ) : (
          <div>
            {this.state.filtered.map((pred, i) => {
              const title = this.props.alerts[pred.alert].title
              const category = this.props.alerts[pred.alert].category
              const content = this.props.alerts[pred.alert].content
              const tags = this.props.alerts[pred.alert].tags
              const severity = pred.severity

              return (
                <AlertCard
                  key={i}
                  title={title}
                  category={category}
                  content={content}
                  tags={tags}
                  severity={severity}
                />
              )
            })}
          </div>
        )}
      </Accordion>
    )
  }
}

AllAlerts.propTypes = {
  alertsCase: PropTypes.shape({
    alerts: PropTypes.object,
    predictions: PropTypes.object,
    "use-cases": PropTypes.object,
    // predictions: PropTypes.object,
    // forecastedRO: PropTypes.object,
    // currentPrevalance: PropTypes.object,
    // forecastedInfectionsTimeSeries: PropTypes.object,
    // forecastedDeathsTimeSeries: PropTypes.object,
  }).isRequired,
  shape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number,
  }),
}

export default AllAlerts
