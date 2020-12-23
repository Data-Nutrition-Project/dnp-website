import React, { Component } from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

import AlertCard from "../AlertCard/index.js"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Tabs from "react-bootstrap/Tabs"
import Tab from "react-bootstrap/Tab"

import styles from "./styles.module.css"

import { config } from "@fortawesome/fontawesome-svg-core"

config.autoAddCss = false

const TAB_NAMES = {
  alerts: "alerts",
  fyis: "fyis",
}

class AllAlerts extends Component {
  constructor(props) {
    super(props)
    const objectives = this.props.objectives
    const tags = []
    const alerting = []
    const fyis = []

    let sevCount = {
      3: 0,
      2: 0,
      1: 0,
    }

    for (const [key, info] of Object.entries(this.props.alerts)) {
      alerting.push(info)
    }
    for (const [key, info] of Object.entries(this.props.fyis)) {
      fyis.push(info)
    }

    for (const [alert, info] of Object.entries(this.props.alerts)) {
      let string = info.tags
      tags.push(string)
    }
    for (const [fyi, info] of Object.entries(this.props.fyis)) {
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
      objectives,
      filtered: selectedAlerts,
      filterValue: "",
      selectedAlerts,
      tags,
      alerting,
      fyis,
      selectedTab: TAB_NAMES.alerts,
      highCount: sevCount[3],
      midCount: sevCount[2],
      lowCount: sevCount[1],
    }

    this.onChange = this.onChange.bind(this)
  }

  async onChange(e) {
    let sevCount = {
      3: 0,
      2: 0,
      1: 0,
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
      let filtered = this.state.selectedAlerts.filter(p =>
        p.tags[0].includes(e.target.value)
      )
      filtered.map(alert => {
        sevCount[alert.severity]++
      })
      this.setState({
        filtered,
        filterValue: e.target.value,
        highCount: sevCount[3],
        midCount: sevCount[2],
        lowCount: sevCount[1],
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
          p.tags[0].includes(this.state.filterValue)
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
      })
    }
  }

  render() {
    let countText
    this.state.filtered.length === 1
      ? (countText = `${this.state.filtered.length} Alert`)
      : (countText = `${this.state.filtered.length} Alerts`)

    if (this.state.selectedTab === TAB_NAMES.fyis) {
      countText = `${Object.keys(this.props.fyis).length} FYIs`
    }

    let sliced = this.state.tags.slice(0, alert.length - 1)
    let flattenedArray = sliced.flat()
    let uniqueArray = [...new Set(flattenedArray.flat())]
    return (
      <>
        <Row className={styles.alertsMargin}>
          <Col md={2}>
            <h1 className={styles.alertsHeader}>{countText}</h1>
            <p className={styles.alertsParagraph}>
              Click on the arrow next to an alert to see more information.
            </p>
          </Col>

          <Col md={10}>
            <Tabs
              defaultActiveKey={TAB_NAMES.alerts}
              transition={false}
              id="alertTabs"
              variant="pills"
              onSelect={tab => this.setState({ selectedTab: tab })}
            >
              <Tab
                eventKey={TAB_NAMES.alerts}
                title="Alerts"
                tabClassName={classNames({
                  [styles.alertPillsActive]:
                    this.state.selectedTab === TAB_NAMES.alerts,
                })}
              >
                <div className={styles.tabContent}>
                  <div className={styles.severity}>
                    <div className={styles.parentColors}>
                      <Container>
                        <Row className={styles.mitigationRow}>
                          <div className={styles.boldHeader}>
                            Mitigation Possible:
                          </div>
                          <div className={styles.parentAlerts}>
                            <img
                              className={styles.mitigationRefImg}
                              src={require("../AlertCard/high.svg")}
                            />
                            {this.state.highCount} No
                          </div>

                          <div className={styles.parentAlerts}>
                            <img
                              className={styles.mitigationRefImg}
                              src={require("../AlertCard/moderate.svg")}
                            />
                            {this.state.midCount} Maybe
                          </div>

                          <div className={styles.parentAlerts}>
                            <img
                              className={styles.mitigationRefImg}
                              src={require("../AlertCard/medium.svg")}
                            />
                            {this.state.lowCount} Yes
                          </div>
                        </Row>
                      </Container>
                    </div>
                  </div>
                  <span className={styles.alertUnderlineBold} />
                  <div className={styles.parentDiv}>
                    <div className={styles.filter}>
                      <span className={styles.boldHeader}>Filter: </span>{" "}
                      <select
                        className={styles.select}
                        id="select"
                        onChange={e => this.onChange(e)}
                      >
                        <option default>All</option>

                        {uniqueArray
                          .filter((tag, i) => {
                            return tag != "N/A"
                          })
                          .map((tag, i) => {
                            return (
                              <option value={tag} key={i}>
                                {tag}
                              </option>
                            )
                          })}
                      </select>
                    </div>
                  </div>
                  {this.state.alerting.length === 0 && <b>LOADING...</b>}
                  {this.state.alerting.length > 0 &&
                    this.state.filtered.length === 0 && (
                      <b>No alerts to show</b>
                    )}
                  {this.state.filtered.length > 0 && (
                    <div>
                      {this.state.filtered
                        .filter(alert => alert.severity != 0)
                        .map((alert, i) => {
                          return (
                            <AlertCard
                              key={i}
                              title={alert.title}
                              category={alert.category}
                              content={alert.content}
                              tags={alert.tags}
                              severity={alert.severity}
                              mitigation={alert.mitigation}
                            />
                          )
                        })}
                    </div>
                  )}
                </div>
              </Tab>
              <Tab
                eventKey={TAB_NAMES.fyis}
                title="FYIs"
                tabClassName={classNames({
                  [styles.alertPillsActive]:
                    this.state.selectedTab === TAB_NAMES.fyis,
                })}
              >
                <div className={styles.tabContent}>
                  <div className={styles.severity} />
                  <span className={styles.alertUnderlineBold} />
                  <div className={styles.parentDiv}>
                    <div className={styles.filter}>
                      <span className={styles.boldHeader}>Filter: </span>{" "}
                      <select
                        className={styles.select}
                        id="select"
                        onChange={e => this.onChange(e)}
                      >
                        <option default>All</option>

                        {uniqueArray.map((tag, i) => {
                          return (
                            <option value={tag} key={i}>
                              {tag}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                  </div>
                  {this.state.alerting.length === 0 && <b>LOADING...</b>}

                  {Object.entries(this.props.fyis).length > 0 && (
                    <div>
                      {Object.entries(this.props.fyis).map(([key, fyi], i) => {
                        return (
                          <AlertCard
                            key={i}
                            title={fyi.title}
                            category={fyi.category}
                            content={fyi.content}
                            tags={fyi.tags}
                            severity={0}
                          />
                        )
                      })}
                    </div>
                  )}
                </div>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </>
    )
  }
}

AllAlerts.propTypes = {
  alertsCase: PropTypes.shape({
    alerts: PropTypes.object,
    objectives: PropTypes.object,
    fyis: PropTypes.object,
  }).isRequired,
  shape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number,
  }),
}

export default AllAlerts
