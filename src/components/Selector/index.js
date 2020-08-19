import React, { Component } from "react"
import styles from "./styles.module.css"

class Selector extends Component {
  constructor(props) {
    super(props)
    const preds = []
    const useCases = this.props.useCases

    this.state = {
      filteredPreds: [],
      preds,
      currentUseCase: "",
      addedPreds: [],
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    e.stopPropagation()
    console.log("e", e.target.value)

    if (!e.target.value || e.target.value === " " || e.target.value === "") {
      this.setState({ filteredPreds: [...this.state.preds] })
    } else {
      let filteredPreds = []
      filteredPreds = this.props.useCases[e.target.value].predictions
      this.setState({ filteredPreds, currentUseCase: e.target.value })
    }
  }

  render() {
    return (
      <div className={styles.selectorBody}>
        <h1 className={styles.selectHeader}>Selector</h1>
        <div className={styles.flexContainer}>
          <div className={styles.childOne}>
            <h1 className={styles.boldHeader}>Use Case:</h1>
            <p className={styles.datasetParagraph}>
              How is the dataset being applied?
            </p>
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
                  value="point-prevalence"
                  checked={this.state.currentUseCase == "point-prevalence"}
                />
                {this.props.useCases["point-prevalence"].description}
              </label>

              <label>
                <input
                  type="radio"
                  value="back-to-normal"
                  checked={this.state.currentUseCase == "back-to-normal"}
                />
                {this.props.useCases["back-to-normal"].description}
              </label>

              <label>
                <input
                  type="radio"
                  value="outbreak-clusters"
                  checked={this.state.currentUseCase == "outbreak-clusters"}
                />
                {this.props.useCases["outbreak-clusters"].description}
              </label>

              <label>
                <input
                  type="radio"
                  value="exceed-hospital-capacity"
                  checked={this.state.currentUseCase == "exceed-hospital-capacity"}
                />
                {this.props.useCases["exceed-hospital-capacity"].description}
              </label>

              <label>
                <input
                  type="radio"
                  value="population-based-impact"
                  checked={this.state.currentUseCase == "population-based-impact"}
                />
                {this.props.useCases["population-based-impact"].description}
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
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Selector
