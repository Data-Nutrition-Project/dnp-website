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
// import { fetchLabelThunk } from "../../store/labelStore"
import AlertCard from "../AlertCard/index.js"

import { config } from "@fortawesome/fontawesome-svg-core"

config.autoAddCss = false

class AllAlerts extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    // const alerts = this.props.useCases.alerts
    // const predictions = this.props.useCases.predictions
    // const forecasetedRo = this.props.useCases.forecaseted - ro
    // const alertItem = alerts.filter(item => item)
    // const alertLength = alertItem.length
    return (
      <Accordion className={styles.accordionBody}>
        <h1 className={styles.alertsHeader}> Alerts</h1>
        <div className={styles.parentDiv}>
          <div className={styles.filter}>
            <span className={styles.boldHeader}>Filter:</span>
            <span className={styles.filteredContent}>filtered content</span>
            {/* <option default> */}
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
            {/* </option> */}
            {/* Will show up in the all alerts component */}
            {/* {props.alerts.tags.map((tag, i) => {
            return (
              <option value={i + 1} key={i}>
                {tag}
              </option>
            )
          })} */}
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
                          <p className={styles.sevParagraph}>10 High</p>
                        </Col>

                        <Col sm={4} className={styles.flexCol}>
                          <div
                            className={classNames(styles.box, styles.orange)}
                          ></div>
                          <p className={styles.sevParagraph}>10 Mid</p>
                        </Col>

                        <Col sm={4} className={styles.flexCol}>
                          <div
                            className={classNames(styles.box, styles.yellow)}
                          ></div>
                          <p className={styles.sevParagraph}> 10 Low</p>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={12} className={styles.upperLeft}>
                      <Row>
                        <Col sm={3} className={styles.flexCol}>
                          <div
                            className={classNames(styles.box, styles.green)}
                          ></div>
                          <p className={styles.sevParagraph}> 10 Fyi </p>
                        </Col>
                      </Row>
                    </Col>
                  </div>
                </Row>
              </Container>
            </div>
          </div>
        </div>
      </Accordion>
    )
  }
}

// AllAlerts.propTypes = {
//   useCases: PropTypes.shape({
//     alerts: PropTypes.object,
//     predictions: PropTypes.object,
//     forecastedRO: PropTypes.object,
//     currentPrevalance: PropTypes.object,
//     forecastedInfectionsTimeSeries: PropTypes.object,
//     forecastedDeathsTimeSeries: PropTypes.object,
//   }).isRequired,
//   shape: PropTypes.shape({
//     color: PropTypes.string,
//     fontSize: PropTypes.number,
//   }),
// }
// mapDispatch = dispatch => {
//   return {
//     fetchLabelThunk: () => dispatch(fetchLabelThunk()),
//   }
// }

export default AllAlerts
