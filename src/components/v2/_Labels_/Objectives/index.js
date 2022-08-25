import React from "react"

import { Element } from "react-scroll"
import AllAlerts from "../../AllAlerts/index.js"
import Selector from "../../Selector/index.js"

class Objectives extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedAlerts: [],
      selectedFYIs: [],
      currentOverview: "",
      filteredObjs: [],
    }

    this.handleObjectiveChange = this.handleObjectiveChange.bind(this)
  }

  handleObjectiveChange(e) {
    let objectives = this.props.objectives.objectives
    this.setState({
      selectedAlerts: [...objectives[e.target.value].alerts],
      currentObjective: e.target.value,
    })
    e.stopPropagation()
  }

  render() {
    return (
      <div>
        <Element id={"Selector-title"} />
        <Selector
          handleObjectiveChange={this.handleObjectiveChange}
          objectives={this.props.objectives.objectives}
          currentObjective={this.state.currentObjective}
        />
        <Element id={"Alerts-title"} />
        <AllAlerts
          objectives={this.props.objectives.objectives}
          alerts={this.props.objectives.alerts}
          fyis={this.props.objectives.fyis}
          selectedAlerts={this.state.selectedAlerts}
        />
      </div>
    )
  }
}

export default Objectives
