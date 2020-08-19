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
    const preds = this.props.predictions
    const tags = []
    const alerting = []
    const predAlerts = []
    const predictions = this.props.predictions
    const alerts = this.props.alerts

    for (const [prediction, info] of Object.entries(alerts)) {
      alerting.push(info)
    }
    // alerting.push(Object.entries(alerts))
    for (const [alert, info] of Object.entries(alerts)) {
      let string = info.tags
      tags.push(string)
    }

    this.state = {
      preds,
      filtered: [],
      tags,
      alerting,
      selectedItem: "",
      predAlerts,
      highCount: 0,
      midCount: 0,
      lowCount: 0,
      fyiCount: 0,
    }

    this.onChange = this.onChange.bind(this)
  }

  async onChange(predarray, e) {
    e.preventDefault()
    console.log("thisbethepreds", predarray)
    if (
      !e.target.value ||
      e.target.value === " " ||
      e.target.value === "" ||
      e.target.value === "Filtered Content:"
    )
      this.setState({ filtered: [...predarray] })
    else {
      console.log("propss", this.props.predictions)
      let filtered = []

      filtered = predarray.filter(p =>
        this.props.alerts[p.alert].tags.includes(e.target.value)
      )
      console.log("filtPP", predarray)
      console.log("filting", filtered)

      this.setState({ filtered })
    }
  }

  render() {
    // console.log("preds", for (const [prediction] of Object.entries(this.state.preds)) {

    // })
    const addedPreds = this.props.addedPreds
    const alerts = this.props.alerts
    const predictions = this.props.predictions
    console.log("opr", predictions)
    let pred
    var length = 0
    console.log("length", length)
    const filteredLength = this.state.filtered.length
    const alertLength = Object.keys(predictions).length
    let high = 0
    let mid = 0
    let low = 0
    let fyi = 0
    let items = []
    // const [prediction, info] of Object.entries(predictions)
    if (this.state.filtered < 5 && this.state.length > 0) {
      for (let i = 0; i < this.state.filtered.length; i++) {
        let alert = this.state.filtered[i]

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
      }
    }

    Object.keys(alerts).map(alert => alert)
    let sliced = this.state.tags.slice(0, 3)

    return (
      <Accordion className={styles.accordionBody}>
        <h1 className={styles.alertsHeader}>{20} Alerts</h1>
        <div className={styles.parentDiv}>
          <div className={styles.filter}>
            <span className={styles.boldHeader}>Filter:</span>
            <select
              className={styles.selct}
              id="select"
              onChange={e => this.onChange(pred, e)}
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
                          <p className={styles.sevParagraph}>{low} Low</p>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={12} className={styles.upperLeft}>
                      <Row>
                        <Col sm={12} className={styles.flexCol}>
                          <div
                            className={classNames(styles.box, styles.green)}
                          ></div>
                          <p className={styles.sevParagraph}>{fyi} Fyi</p>
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
            {addedPreds.map((item, i) => {
              pred = this.state.preds[item].alerts

              console.log("preeey", pred)
              console.log("mypreds", pred.length)
              console.log("filstate", this.state.filtered)
              console.log("predddd", pred)

              if (
                this.state.filtered.length < 5 &&
                this.state.filtered.length > 0
              ) {
                return this.state.filtered.map(fi => {
                  console.log("iffi", fi)
                  let theAlerts = this.props.alerts[fi.alert]
                  let title = theAlerts.title
                  let category = theAlerts.category
                  let content = theAlerts.content
                  let tags = theAlerts.tags
                  let severity = fi.severity

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
                })
              } else {
                return pred.map((p, i) => {
                  let theAlerts = this.props.alerts[p.alert]
                  let title = theAlerts.title
                  let category = theAlerts.category
                  let content = theAlerts.content
                  let tags = theAlerts.tags
                  let severity = p.severity
                  console.log("hellllp", severity)
                  if (severity === 3) {
                    sev = "high"
                    high++
                  } else if (severity === 2) {
                    sev = "medium"
                    mid++
                  } else if (severity === 1) {
                    sev = "low"
                    low++
                  } else if (severity === 0) {
                    sev = "fyi"
                    fyi++
                  } else {
                    sev = ""
                  }

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
                })
              }
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
