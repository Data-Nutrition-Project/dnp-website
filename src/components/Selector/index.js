import React, { Component } from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import styles from "./styles.module.css"
import classNames from "classnames"

class Selector extends Component {
  constructor(props) {
    super(props)
    const preds = []
    const useCases = this.props.useCases

    this.state = {
      preds,
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
<<<<<<< HEAD
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
                      const status = f
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
=======
            <span className={styles.datasetUnderlineBold}></span>
            <div onChange={this.onChange} className={styles.useCaseList}>
              <label for="bending-curve">
                <input
                  className={styles.please}
                  type="radio"
                  value="bending-curve"
                  checked={this.state.currentUseCase == "bending-curve"}
                />
                {this.props.useCases["bending-curve"].description}
              </label>

              <label>
                <input
                  type="radio"
                  value="prevalence-region"
                  checked={this.state.currentUseCase == "prevalence-region"}
                />
                {this.props.useCases["prevalence-region"].description}
              </label>

              <label>
                <input
                  type="radio"
                  value="hotspots"
                  checked={this.state.currentUseCase == "hotspots"}
                />
                {this.props.useCases["hotspots"].description}
              </label>

              <label>
                <input
                  type="radio"
                  value="exceed-capacity"
                  checked={this.state.currentUseCase == "exceed-capacity"}
                />
                {this.props.useCases["exceed-capacity"].description}
              </label>

              <label>
                <input
                  type="radio"
                  value="covid-impact"
                  checked={this.state.currentUseCase == "covid-impact"}
                />
                {this.props.useCases["covid-impact"].description}
              </label>

              <label>
                <input
                  type="radio"
                  value="safe-office"
                  checked={this.state.currentUseCase == "safe-office"}
                />
                {this.props.useCases["safe-office"].description}
              </label>

              <label>
                <input
                  type="radio"
                  value="next-peak"
                  checked={this.state.currentUseCase == "next-peak"}
                />
                {this.props.useCases["next-peak"].description}
              </label>

              <label>
                <input
                  type="radio"
                  value="lockdown-measures"
                  checked={this.state.currentUseCase == "lockdown-measures"}
                />
                {this.props.useCases["lockdown-measures"].description}
              </label>
            </div>
          </div>
          <div className={styles.childTwo}>
            <h1 className={styles.boldHeader}>Predictions:</h1>
            <p className={styles.datasetParagraph}>What is being predicted?</p>
            <span className={styles.predictionsUnderlineBold}></span>
            <div
              onChange={this.props.handleChange}
              className={styles.ulPredictions}
            >
              {this.state.filteredPreds.map((f, j) => {
                const status = f
                return (
                  <label htmlFor={f} key={j}>
                    <input
                      type="radio"
                      value={f}
                      checked={this.props.currentPrediction === f}
                    />
                    {this.props.predictions[f].description}
                  </label>
                )
              })}
>>>>>>> f7bdb5c7f4cea73c08a400c2d629efe595e487d7
            </div>
          </Col>
        </Row>
      </>
    )
  }
}

export default Selector
