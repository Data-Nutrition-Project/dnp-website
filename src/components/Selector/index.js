import React, { Component } from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import styles from "./styles.module.css"
import classNames from "classnames"

class Selector extends Component {
  constructor(props) {
    super(props)

    this.state = {
      preds: [],
      addedPreds: [],
    }
  }

  render() {
    return (
      <>
        <Row>
          <Col md={2}></Col>
          <Col md={10}>
            <h1 className={styles.useCasesHeader}>Use Cases & Alerts</h1>
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
              Click on a use case and predictor to filter relevant alerts.
            </p>
          </Col>
          <Col md={10}>
            <div className={styles.selectorBody}>
              <div className={styles.flexContainer}>
                <div className={styles.childOne}>
                  {/* USE CASE */}
                  <h1 className={styles.boldHeader}>Use Case:</h1>
                  <p className={styles.datasetParagraph}>
                    How is the dataset being applied?
                  </p>
                  <span className={styles.datasetUnderlineBold}></span>
                  <div
                    onChange={this.props.handleUseCaseChange}
                    className={styles.useCaseList}
                  >
                    {Object.keys(this.props.useCases).map((f, j) => {
                      return (
                        <label
                          htmlFor={f}
                          key={j}
                          className={classNames(styles.please, {
                            [styles.pleaseBold]:
                              this.props.currentUseCase === f,
                          })}
                        >
                          <input
                            type="radio"
                            value={f}
                            checked={this.props.currentUseCase === f}
                          />
                          {this.props.useCases[f].description}
                        </label>
                      )
                    })}
                  </div>
                </div>
                <div className={styles.childTwo}>
                  {/* PREDICTIONS */}
                  <h1 className={styles.boldHeader}>Predictions:</h1>
                  <p className={styles.datasetParagraph}>
                    What is being predicted?
                  </p>
                  <span className={styles.predictionsUnderlineBold}></span>
                  <div
                    onChange={this.props.handlePredictionChange}
                    className={styles.ulPredictions}
                  >
                    {this.props.filteredPreds.map((f, j) => {
                      return (
                        <label
                          htmlFor={f}
                          key={j}
                          className={classNames(styles.please, {
                            [styles.pleaseBold]:
                              this.props.currentPrediction === f,
                          })}
                        >
                          <input
                            type="radio"
                            value={f}
                            checked={this.props.currentPrediction === f}
                          />
                          {this.props.predictions[f].description}
                        </label>
                      )
                    })}
                  </div>
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
