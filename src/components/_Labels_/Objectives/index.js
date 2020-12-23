import React from "react"

import { Element } from "react-scroll"
import AllAlerts from "../../AllAlerts/index.js"
import Selector from "../../Selector/index.js"

class Objectives extends React.Component {
  constructor(props) {
    super(props)
    const objectives = this.props.objectives
    const theObjs = Object.keys(objectives.objectives)

    this.state = {
      theObjs,
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
    console.log("value", e.target.value)
    let objectives = this.props.objectives.objectives
    console.log("OBJJJJ", objectives)
    this.setState({
      selectedAlerts: [...objectives[e.target.value].alerts],
      currentObjective: e.target.value,
    })
    e.stopPropagation()

    // filteredObjs = this.props.overviewStuff["objectives"][e.target.value][
    //   "class-state"
    // ]
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
          theObjs={this.state.theObjs}
          // predictions={useCases["predictions"]}
          // thePreds={this.state.thePreds}
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
        />
      </div>
    )
  }
}

export default Objectives
