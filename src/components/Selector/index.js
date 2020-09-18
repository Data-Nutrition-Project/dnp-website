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
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Selector
