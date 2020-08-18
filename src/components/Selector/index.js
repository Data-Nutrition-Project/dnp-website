import React, { Component } from "react"
import styles from "./styles.module.css"

class Selector extends Component {
  constructor(props) {
    super(props)
    const preds = []
    const predictions = this.props.predictions
    console.log("predictions", [predictions])
    for (const [prediction, info] of Object.entries(predictions)) {
      preds.push(info.predictions)
    }
    this.state = {
      filteredPreds: [],
      preds,
      currentUseCase: "",
    }
    this.onChange = this.onChange.bind(this)
    console.log("prrrr", this.state.preds)
  }
  // componentDidMount() {
  //   this.setState({ filteredPreds: [...this.state.preds] })
  // }

  onChange(e) {
    console.log("e", e.target.value)

    if (!e.target.value || e.target.value === " " || e.target.value === "") {
      this.setState({ filteredPreds: [...this.state.preds] })
    } else {
      let filteredPreds = []

      filteredPreds = this.state.preds.filter(item =>
        item[0].includes(e.target.value)
      )

      this.setState({ filteredPreds, currentUseCase: e.target.value })
    }
  }

  // componentDidMount() {
  //   this.setState({ filteredPreds: [...this.state.preds] })
  // }
  render() {
    console.log("state", this.state.filteredPreds)
    console.log("cusecase", this.state.currentUseCase)
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
              <label for="current-r0">
                <input
                  className={styles.please}
                  type="radio"
                  value="current-r0"
                  checked={this.state.currentUseCase == "current-r0"}
                />
                Are we bending the curve?
              </label>

              <label>
                <input
                  type="radio"
                  value="icu-capita"
                  checked={this.state.currentUseCase == "icu-capita"}
                />
                What is the prevalence of COVID-19 / region?
              </label>

              <label>
                <input
                  type="radio"
                  value="forecasted-r0"
                  checked={this.state.currentUseCase == "forecasted-r0"}
                />
                When can we go back to no government interventions or mobility
                restrictions?
              </label>

              <label>
                <input
                  type="radio"
                  value="change-cases-region"
                  checked={this.state.currentUseCase == "change-cases-region"}
                />
                Where are clusters of outbreaks?
              </label>
            </div>
          </div>
          <div className={styles.childTwo}>
            <h1 className={styles.boldHeader}>Predictions:</h1>
            <p className={styles.datasetParagraph}>What is being predicted?</p>
            <span className={styles.predictionsUnderlineBold}></span>
            <div className={styles.ulPredictions}>
              {this.state.filteredPreds.map(fi => {
                return fi.map((f, j) => {
                  return (
                    <label key={j}>
                      <input type="checkbox" />
                      {f}
                    </label>
                  )
                })
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Selector
