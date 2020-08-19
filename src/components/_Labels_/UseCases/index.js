import React from "react"
import { connect } from "react-redux"
import AlertCard from "../../AlertCard/index.js"
import AllAlerts from "../../AllAlerts/index.js"
import Selector from "../../Selector/index.js"
import { fetchLabelThunk } from "../../../store/labelStore"
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
      newPreds: []
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
        <p className={styles.useCaseInfo}>
          Relevant alerts for data practitioners who intend to use this dataset
          for specific use cases (types of analyses).
        </p>
        <span className={styles.datasetUnderlineBold}></span>
        <Selector
          handleChange={this.handleChange}
          useCases={useCases["use-cases"]}
          predictions={useCases["predictions"]}
          thePreds={this.state.thePreds}
          currentPrediction={this.state.currentPrediction}
        />
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
