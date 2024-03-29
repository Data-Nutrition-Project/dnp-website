import React, { Component } from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import * as styles from "./styles.module.css"
import classNames from "classnames"

class Selector extends Component {
  constructor(props) {
    super(props)

    this.state = {
      objs: [],
      addedObjs: [],
    }
  }

  render() {
    return (
      <>
        <Row>
          <Col md={2}></Col>
          <Col md={10}>
            <h1 className={styles.useCasesHeader}>Objectives & Alerts</h1>
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <h1 className={styles.aboutHeader}>About</h1>
          </Col>
          <Col md={10}>
            <p>
              Relevant alerts for data practitioners who intend to use this
              dataset for specific use cases (types of analyses).
            </p>
          </Col>
        </Row>

        <Row>
          <Col md={2}>
            <h1 className={styles.selectHeader}>Selector</h1>
            <p className={styles.selectParagraph}>
              Click on a modeling objective to filter relevant alerts.
            </p>
          </Col>
          <Col md={10}>
            <div className={styles.selectorBody}>
              <div className={styles.onlyChild}>
                <h1 className={styles.boldHeader}>Modeling Objectives:</h1>
                <p className={styles.datasetParagraph}>
                  What is the objective?
                </p>
                <span className={styles.objectivesUnderlineBold}></span>
                <div
                  onChange={this.props.handleObjectiveChange}
                  className={styles.ulPredictions}
                >
                  {Object.entries(this.props.objectives).map(
                    ([key, value], j) => {
                      return (
                        <label
                          htmlFor={key}
                          key={j}
                          className={classNames(styles.please, {
                            [styles.pleaseBold]:
                              this.props.currentObjective === key,
                          })}
                        >
                          <input
                            type="radio"
                            value={key}
                            checked={this.props.currentObjective === key}
                          />
                          {value.description}
                        </label>
                      )
                    }
                  )}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </>
    )
  }
}

export default Selector
