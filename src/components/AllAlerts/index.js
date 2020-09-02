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
    const predictions = this.props.predictions
    const alerts = this.props.alerts
    let sevCount = {
      3: 0,
      2: 0,
      1: 0,
      0: 0,
    }

    for (const [prediction, info] of Object.entries(alerts)) {
      alerting.push(info)
    }
    for (const [alert, info] of Object.entries(alerts)) {
      let string = info.tags
      tags.push(string)
    }

    let selectedAlerts = []
    if (this.props.selectedAlerts.length === 0) {
      selectedAlerts = alerting
      alerting.map((alert, i) => {
        sevCount[alert.severity]++
      })
    } else {
      this.props.selectedAlerts.map((alert, i) => {
        let alertObj = { ...this.props.alerts[alert] }
        alertObj.severity = alert.severity
        sevCount[alert.severity]++
        selectedAlerts.push(alertObj)
      })
    }

    this.state = {
      preds,
      filtered: selectedAlerts,
      filterValue: "",
      selectedAlerts,
      tags,
      alerting,
      selectedItem: "",
      highCount: sevCount[3],
      midCount: sevCount[2],
      lowCount: sevCount[1],
      fyiCount: sevCount[0],
    }

    this.onChange = this.onChange.bind(this)
  }

  async onChange(e) {
    let sevCount = {
      3: 0,
      2: 0,
      1: 0,
      0: 0,
    }

    if (
      !e.target.value ||
      e.target.value === " " ||
      e.target.value === "" ||
      e.target.value === "All"
    )
      this.setState({
        filtered: [...this.state.selectedAlerts],
        filterValue: e.target.value,
      })
    else {
      let filtered = []

      filtered = this.state.selectedAlerts.filter(p =>
        p.tags.includes(e.target.value)
      )
      filtered.map(alert => {
        sevCount[alert.severity]++
      })
      console.log("filting", filtered)

      this.setState({
        filtered,
        filterValue: e.target.value,
        highCount: sevCount[3],
        midCount: sevCount[2],
        lowCount: sevCount[1],
        fyiCount: sevCount[0],
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(this.props.selectedAlerts) !==
      JSON.stringify(prevProps.selectedAlerts)
    ) {
      let sevCount = {
        3: 0,
        2: 0,
        1: 0,
        0: 0,
      }

      let selectedAlerts = []
      if (this.props.selectedAlerts.length === 0) {
        selectedAlerts = [...this.state.alerting]
      } else {
        this.props.selectedAlerts.map((alert, i) => {
          let alertObj = { ...this.props.alerts[alert.alert] }
          alertObj.severity = alert.severity
          selectedAlerts.push(alertObj)
        })
      }

      let filtered = []

      if (
        this.state.filterValue === " " ||
        this.state.filterValue === "" ||
        this.state.filterValue === "All"
      ) {
        filtered = [...selectedAlerts]
      } else {
        filtered = selectedAlerts.filter(p =>
          p.tags.includes(this.state.filterValue)
        )
      }

      filtered.map(alert => {
        sevCount[alert.severity]++
      })

      this.setState({
        selectedAlerts: selectedAlerts,
        filtered: filtered,
        highCount: sevCount[3],
        midCount: sevCount[2],
        lowCount: sevCount[1],
        fyiCount: sevCount[0],
      })
    }
  }

  render() {
    const alerts = this.props.alerts
    const predictions = this.props.predictions
    let pred
    var length = 0
    const filteredLength = this.state.filtered.length
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
        <h1 className={styles.alertsHeader}>{filteredLength} Alerts</h1>
        <div className={styles.parentDiv}>
          <div className={styles.filter}>
            <span className={styles.boldHeader}>Filter:</span>
            <select
              className={styles.selct}
              id="select"
              onChange={e => this.onChange(e)}
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
              <option default>All</option>

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
                          <p className={styles.sevParagraph}>
                            {this.state.highCount} High
                          </p>
                        </Col>

                        <Col sm={4} className={styles.flexCol}>
                          <div
                            className={classNames(styles.box, styles.orange)}
                          ></div>
                          <p className={styles.sevParagraph}>
                            {this.state.midCount} Mid
                          </p>
                        </Col>

                        <Col sm={4} className={styles.flexCol}>
                          <div
                            className={classNames(styles.box, styles.yellow)}
                          ></div>
                          <p className={styles.sevParagraph}>
                            {this.state.lowCount} Low
                          </p>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={12} className={styles.upperLeft}>
                      <Row>
                        <Col sm={12} className={styles.flexCol}>
                          <div
                            className={classNames(styles.box, styles.green)}
                          ></div>
                          <p className={styles.sevParagraph}>
                            {this.state.fyiCount} Fyi
                          </p>
                        </Col>
                      </Row>
                    </Col>
                  </div>
                </Row>
              </Container>
            </div>
          </div>
        </div>
        {!filteredLength ? (
          <h1>LOADING...</h1>
        ) : (
          <div>
            {this.state.filtered.map((alert, i) => {
              return (
                <AlertCard
                  key={i}
                  title={alert.title}
                  category={alert.category}
                  content={alert.content}
                  tags={alert.tags}
                  severity={alert.severity}
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
  }).isRequired,
  shape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number,
  }),
}

export default AllAlerts
