import React from "react"

import { Element } from "react-scroll"
import AllAlerts from "../../AllAlerts/index.js"
import Selector from "../../Selector/index.js"

class UseCases extends React.Component {
  constructor(props) {
    super(props)
    const useCases = this.props.useCasesStuff
    const thePreds = Object.keys(useCases.predictions)

    this.state = {
      thePreds,
      selectedAlerts: [],
      selectedFYIs: [],
      currentPrediction: "",
      currentUseCase: "",
      filteredPreds: [],
      newPreds: [],
    }
    this.handlePredictionChange = this.handlePredictionChange.bind(this)
    this.handleUseCaseChange = this.handleUseCaseChange.bind(this)
  }

  handlePredictionChange(e) {
    let useCases = this.props.useCasesStuff
    let predictions = useCases.predictions

    this.setState({
      selectedAlerts: [...predictions[e.target.value].alerts],
      selectedFYIs: [...predictions[e.target.value].fyis],
      currentPrediction: e.target.value,
    })
  }
  handleUseCaseChange(e) {
    e.stopPropagation()
    if (!e.target.value || e.target.value === " " || e.target.value === "") {
      this.setState({ filteredPreds: [] })
    } else {
      let filteredPreds = []
      filteredPreds = this.props.useCasesStuff["use-cases"][e.target.value]
        .predictions
      this.setState({ filteredPreds, currentUseCase: e.target.value })
    }
  }
  render() {
    let useCases = this.props.useCasesStuff

    return (
      <div>
        <Element id={"Selector-title"}> </Element>
        <Selector
          handleUseCaseChange={this.handleUseCaseChange}
          handlePredictionChange={this.handlePredictionChange}
          useCases={useCases["use-cases"]}
          predictions={useCases["predictions"]}
          thePreds={this.state.thePreds}
          filteredPreds={this.state.filteredPreds}
          currentPrediction={this.state.currentPrediction}
          currentUseCase={this.state.currentUseCase}
        />
        <Element id={"Alerts-title"}> </Element>
        <AllAlerts
          predictions={useCases.predictions}
          alerts={useCases.alerts}
          fyis={useCases.fyis}
          selectedAlerts={this.state.selectedAlerts}
          selectedFYIs={this.state.selectedFYIs}
          currentPrediction={this.state.currentPrediction}
        />
      </div>
    )
  }
}

export default UseCases
