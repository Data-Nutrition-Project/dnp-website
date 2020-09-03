import React from "react"

import { Element } from "react-scroll"
import AllAlerts from "../../AllAlerts/index.js"
import Selector from "../../Selector/index.js"

import styles from "./styles.module.css"

class UseCases extends React.Component {
  constructor(props) {
    super(props)
    const useCases = this.props.useCasesStuff
    const thePreds = Object.keys(useCases.predictions)

    this.state = {
      thePreds,
      selectedAlerts: [],
      currentPrediction: "",
      newPreds: [],
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    let useCases = this.props.useCasesStuff
    let predictions = useCases.predictions

    this.setState({
      selectedAlerts: [...predictions[e.target.value].alerts],
      currentPrediction: e.target.value,
    })
  }

  render() {
    let useCases = this.props.useCasesStuff
    let predictions = useCases.predictions
    return (
      <div>
        <Element id={"Selector-title"}> </Element>
        <Selector
          handleChange={this.handleChange}
          useCases={useCases["use-cases"]}
          predictions={useCases["predictions"]}
          thePreds={this.state.thePreds}
          currentPrediction={this.state.currentPrediction}
        />
        <Element id={"Alerts-title"}> </Element>
        <AllAlerts
          predictions={useCases.predictions}
          alerts={useCases.alerts}
          selectedAlerts={this.state.selectedAlerts}
          currentPrediction={this.state.currentPrediction}
        />
      </div>
    )
  }
}

export default UseCases
