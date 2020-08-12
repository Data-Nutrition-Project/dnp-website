import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { fetchLabelThunk } from "../../store/labelStore"
import AlertCard from "../AlertCard/index.js"

import styles from "./styles.module.css"
import { Route } from "react-router-dom"
class AllAlerts extends Component {
  constructor() {}

  render() {
    const alerts = this.props.useCases.alerts
    const predictions = this.props.useCases.predictions
    const forecasetedRo = this.props.useCases.forecaseted - ro
    const alertItem = alerts.filter(item => item)
    const alertLength = alertItem.length
    return (
      <div>
        <h1 className={styles.alertsHeader}>{alertLength} Alerts</h1>
        <div className={styles.parentDiv}>
          <div className={styles.filter}>
            <span className={styles.boldHeader}>Filter:</span>
            <span className={styles.filteredContent}>filtered content</span>
            <option default>
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
            </option>
            {alerts.tags.map((tag, i) => {
              return (
                <option value={i + 1} key={i}>
                  {tag}
                </option>
              )
            })}
          </div>

          {/* Severity  */}

          <div className={styles.severity}>
            <div className={styles.parentColors}>
              <Container>
                <Row>
                  <Col sm={1} className={styles.boldHeader}>
                    Severity:
                  </Col>
                  <Col sm={11} className={styles.upperRight}>
                    <Row>
                      <Col
                        sm={1}
                        className={classNames(styles.box, styles.red)}
                      />
                      <Col
                        sm={1}
                        style={{ width: "100%" }}
                        className={styles.severityLvls}
                      >
                        <p className={styles.sevParagraph}>10 High</p>
                      </Col>
                      <Col
                        sm={1}
                        className={classNames(styles.box, styles.orange)}
                      />
                      <Col md={1} className={styles.severityLvls}>
                        10 Mid
                      </Col>
                      <Col
                        sm={1}
                        className={classNames(styles.box, styles.yellow)}
                      />
                      <Col sm={1} className={styles.severityLvls}>
                        10 Low
                      </Col>
                      <Col
                        sm={1}
                        className={classNames(styles.box, styles.green)}
                      />
                      <Col sm={1} className={styles.severityLvls}>
                        10 Fy
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </div>

        {/* Alert Card */}
        {/* {alertLength ? (
          <h1>Select Prediction</h1>
        ) : (
          <div>
            {alerts.map(alert => {
              return <AlertCard key={alert} />
            })}
          </div>
        )} */}
      </div>
    )
  }
}

AllAlerts.propTypes = {
  useCases: PropTypes.shape({
    alerts: PropTypes.object,
    predictions: PropTypes.object,
    forecastedRO: PropTypes.object,
    currentPrevalance: PropTypes.object,
    forecastedInfectionsTimeSeries: PropTypes.object,
    forecastedDeathsTimeSeries: PropTypes.object,
  }).isRequired,
  shape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number,
  }),
}
// mapDispatch = dispatch => {
//   return {
//     fetchLabelThunk: () => dispatch(fetchLabelThunk()),
//   }
// }

export default AllAlerts
