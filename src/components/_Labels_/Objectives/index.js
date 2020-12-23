import React from "react"

import { Element } from "react-scroll"
import AllAlerts from "../../AllAlerts/index.js"
import Selector from "../../Selector/index.js"

class Objectives extends React.Component {
  constructor(props) {
    super(props)
    const objectives = this.props.objectives
    const objectiveKeys = Object.keys(Object.values(objectives)[2])

    const objectivesObject = Object.values(objectives)[2]
    const description = Object.values(Object.values(objectives)[2]).map(
      object => object.description
    )
    const alerts = objectives.alerts

    console.log("alertsYou", alerts)
    console.log("keyss", objectiveKeys)
    console.log("theObjectives", objectivesObject["pred-icu"])

    const fyis = Object.values(Object.values(Object.values(objectives)[1]))
    // console.log(
    //   "theArr",
    //   Object.values(Object.values(objectives)[2]).map(
    //     object => object.description
    //   )
    // )
    this.state = {
      objectivesObject,
      objectiveKeys,
      description,
      alerts,
      fyis,
      selectedAlerts: [],
      selectedFYIs: [],
      // currentPrediction: "",
      currentOverview: "",
      filteredObjs: [],
      // newPreds: [],
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
      // filteredObjs = this.props.overviewStuff["objectives"][e.target.value][
      //   "class-state"
      // ]
      filteredObjs = this.state.objectivesObject[e.target.value]
      this.setState({
        filteredObjs,
        currentObjective: e.target.value,
        // selectedFYIs: [...this.state.objectivesObject[e.target.value].alerts],
        selectedAlerts: [...this.state.objectivesObject[e.target.value].alerts],
      })
    }
  }
  render() {
    console.log("FILTSTATE", this.state.filteredObjs)

    // console.log("fyiprops", this.state.fyis)
    return (
      <div>
        <Element id={"Selector-title"}> </Element>
        <Selector
          handleObjectiveChange={this.handleObjectiveChange}
          // handlePredictionChange={this.handlePredictionChange}
          objectives={this.props.objectives["objectives"]}
          objectiveKeys={this.state.objectiveKeys}
          objectivesObject={this.state.objectivesObject}
          description={this.state.description}
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
          alerts={this.state.alerts}
          fyis={this.state.fyis}
          selectedAlerts={this.state.selectedAlerts}
          selectedFYIs={this.state.selectedFYIs}
          currentPrediction={this.state.currentPrediction}
        />
      </div>
    )
  }
}

export default Objectives
