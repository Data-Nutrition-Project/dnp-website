import React, { Component } from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import styles from "./styles.module.css"
import classNames from "classnames"

class Selector extends Component {
  constructor(props) {
    super(props)
    const preds = []
    const useCases = this.props.useCases

    this.state = {
      bold: "",
      boldPredictions: "",
      filteredPreds: [],
      preds,
      currentUseCase: "",
      addedPreds: [],
    }
    this.onChange = this.onChange.bind(this)
    this.boldButton = this.boldButton.bind(this)
    this.boldPredButton = this.boldPredButton.bind(this)
  }

  onChange(e) {
    e.stopPropagation()

    if (!e.target.value || e.target.value === " " || e.target.value === "") {
      this.setState({ filteredPreds: [...this.state.preds] })
    } else {
      let filteredPreds = []
      filteredPreds = this.props.useCases[e.target.value].predictions
      this.setState({ filteredPreds, currentUseCase: e.target.value })
    }
  }

  boldButton = e => {
    this.setState({
      bold: e,
      selectedLink: true,
    })
  }
  boldPredButton = e => {
    console.log("e", e)
    this.setState({
      boldPredictions: e,
      selectedLink: true,
    })
  }

  render() {
    console.log("bold", this.state.boldPredictions)
    return (
      <Container>
        <Row>
          <Col md={2}></Col>
          <Col md={10}>
            <h1 className={styles.useCasesHeader}>Use Cases & Alerts</h1>
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <h1>About</h1>
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
                  <h1 className={styles.boldHeader}>Use Case:</h1>
                  <p className={styles.datasetParagraph}>
                    How is the dataset being applied?
                  </p>
                  <span className={styles.datasetUnderlineBold}></span>
                  <div onChange={this.onChange} className={styles.useCaseList}>
                    <label
                      onClick={() =>
                        this.boldButton(
                          this.props.useCases["bending-curve"].description
                        )
                      }
                      className={classNames(styles.please, {
                        [styles.pleaseBold]:
                          this.state.bold ===
                          this.props.useCases["bending-curve"].description,
                      })}
                    >
                      <input
                        type="radio"
                        value="bending-curve"
                        checked={this.state.currentUseCase == "bending-curve"}
                      />
                      {this.props.useCases["bending-curve"].description}
                    </label>

                    <label
                      onClick={() =>
                        this.boldButton(
                          this.props.useCases["point-prevalence"].description
                        )
                      }
                      className={classNames(styles.please, {
                        [styles.pleaseBold]:
                          this.state.bold ===
                          this.props.useCases["point-prevalence"].description,
                      })}
                    >
                      <input
                        type="radio"
                        value="point-prevalence"
                        checked={
                          this.state.currentUseCase == "point-prevalence"
                        }
                      />
                      {this.props.useCases["point-prevalence"].description}
                    </label>

                    <label
                      onClick={() =>
                        this.boldButton(
                          this.props.useCases["back-to-normal"].description
                        )
                      }
                      className={classNames(styles.please, {
                        [styles.pleaseBold]:
                          this.state.bold ===
                          this.props.useCases["back-to-normal"].description,
                      })}
                    >
                      <input
                        type="radio"
                        value="back-to-normal"
                        checked={this.state.currentUseCase == "back-to-normal"}
                      />
                      {this.props.useCases["back-to-normal"].description}
                    </label>

                    <label
                      onClick={() =>
                        this.boldButton(
                          this.props.useCases["outbreak-clusters"].description
                        )
                      }
                      className={classNames(styles.please, {
                        [styles.pleaseBold]:
                          this.state.bold ===
                          this.props.useCases["outbreak-clusters"].description,
                      })}
                    >
                      <input
                        type="radio"
                        value="outbreak-clusters"
                        checked={
                          this.state.currentUseCase == "outbreak-clusters"
                        }
                      />
                      {this.props.useCases["outbreak-clusters"].description}
                    </label>

                    <label
                      onClick={() =>
                        this.boldButton(
                          this.props.useCases["exceed-hospital-capacity"]
                            .description
                        )
                      }
                      className={classNames(styles.please, {
                        [styles.pleaseBold]:
                          this.state.bold ===
                          this.props.useCases["exceed-hospital-capacity"]
                            .description,
                      })}
                    >
                      <input
                        type="radio"
                        value="exceed-hospital-capacity"
                        checked={
                          this.state.currentUseCase ==
                          "exceed-hospital-capacity"
                        }
                      />
                      {
                        this.props.useCases["exceed-hospital-capacity"]
                          .description
                      }
                    </label>

                    <label
                      onClick={() =>
                        this.boldButton(
                          this.props.useCases["population-based-impact"]
                            .description
                        )
                      }
                      className={classNames(styles.please, {
                        [styles.pleaseBold]:
                          this.state.bold ===
                          this.props.useCases["population-based-impact"]
                            .description,
                      })}
                    >
                      <input
                        type="radio"
                        value="population-based-impact"
                        checked={
                          this.state.currentUseCase == "population-based-impact"
                        }
                      />
                      {
                        this.props.useCases["population-based-impact"]
                          .description
                      }
                    </label>
                  </div>
                </div>
                <div className={styles.childTwo}>
                  <h1 className={styles.boldHeader}>Predictions:</h1>
                  <p className={styles.datasetParagraph}>
                    What is being predicted?
                  </p>
                  <span className={styles.predictionsUnderlineBold}></span>
                  <div
                    onChange={this.props.handleChange}
                    className={styles.ulPredictions}
                  >
                    {this.state.filteredPreds.map((f, j) => {
                      const status = f
                      return (
                        <label
                          htmlFor={f}
                          key={j}
                          onClick={() =>
                            this.boldPredButton(
                              this.props.predictions[f].description
                            )
                          }
                          className={classNames(styles.please, {
                            [styles.pleaseBold]:
                              this.state.boldPredictions ===
                              this.props.predictions[f].description,
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
      </Container>
    )
  }
}

export default Selector
