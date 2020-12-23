import React from "react"

import { Element } from "react-scroll"
import AllAlerts from "../../AllAlerts/index.js"
import Selector from "../../Selector/index.js"

class Objectives extends React.Component {
  constructor(props) {
    super(props)
    const objectives = this.props.objectives

    console.log("alertsYou", alerts)

    this.state = {
      selectedAlerts: [],
      selectedFYIs: [],
      currentOverview: "",
      filteredObjs: [],
    }

    this.handleObjectiveChange = this.handleObjectiveChange.bind(this)
  }

  // handlePredictionChange(e) {
  //   let useCases = this.props.overviewStuff
  //   let predictions = useCases.predictions

  //   this.setState({
  //     selectedAlerts: [...predictions[e.target.value].alerts],
  //     selectedFYIs: [...predictions[e.target.value].fyis],
  //     currentPrediction: e.target.value,
  //   })
  // }
  handleObjectiveChange(e) {
    e.stopPropagation()
    console.log("value", e.target.value)
    if (!e.target.value || e.target.value === " " || e.target.value === "") {
      this.setState({ filteredObjs: [] })
    } else {
      let filteredObjs = []
      let objectives = objectives.objectives
      // filteredObjs = this.props.overviewStuff["objectives"][e.target.value][
      //   "class-state"
      // ]
      filteredObjs = this.props.objectives.objectives[e.target.value]
      this.setState({
        filteredObjs,
        currentObjective: e.target.value,
        // selectedFYIs: [...this.state.objectivesObject[e.target.value].alerts],
        selectedAlerts: [...objectives.objectives[e.target.value]],
      })
    }
  }
  render() {
    console.log("FILTSTATE", this.state.filteredObjs)
    console.log("propsObject", this.props.objectives.objectives["class-state"])
    // console.log("fyiprops", this.state.fyis)

    let objectives = this.props.objectives
    return (
      <div>
        <Element id={"Selector-title"}> </Element>
        <Selector
          handleObjectiveChange={this.handleObjectiveChange}
          // handlePredictionChange={this.handlePredictionChange}
          objectives={this.props.objectives.objectives}
          // predictions={useCases["predictions"]}
          // thePreds={this.state.thePreds}
          filteredObjs={this.state.filteredObjs}
          // currentPrediction={this.state.currentPrediction}
          currentObjective={this.state.currentObjective}
        />
        <Element id={"Alerts-title"}> </Element>
        <AllAlerts
          // predictions={useCases.predictions}
          objectives={this.props.objectives.objectives}
          alerts={objectives.alerts}
          fyis={objectives.fyis}
          selectedAlerts={this.state.selectedAlerts}
          selectedFYIs={this.state.selectedFYIs}
        />
      </div>
    )
  }
}

export default Objectives
