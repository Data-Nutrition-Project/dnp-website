import React from "react"
// import SectionBase from "../../SectionBase/index.js"
import { connect } from "react-redux"
import AlertCard from "../../AlertCard/index.js"
import AllAlerts from "../../AllAlerts/index.js"
import Selector from "../../Selector/index.js"
import { fetchLabelThunk } from "../../../store/labelStore"
import styles from "./styles.module.css"

class UseCases extends React.Component {
  constructor(props) {
    super(props)
    const useCases = this.props.useCasesStuff["use-cases-section"]
    const thePreds = Object.keys(useCases.predictions)
    console.log("getitright", useCases.predictions)
    console.log("woah", thePreds)

    this.state = {
      addedPreds: [],
      thePreds,
      newPreds: [],
      currentPrediction: "",
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    let addedPreds = []
    let newPreds
    let useCases = this.props.useCasesStuff
    let predictions = useCases["use-cases-section"].predictions

    addedPreds = this.state.thePreds.filter(item => item === e.target.value)
    newPreds = this.state.addedPreds.map(item => {
      return predictions[item].alerts
    })
    this.setState({
      addedPreds,
      currentPrediction: e.target.value,
      newPreds,
    })
  }

  // componentDidMount() {
  //   this.setState({ addedPreds: [...this.state.thePreds] })
  // }
  // changeAddedPreds() {
  //   let newPred = []

  //   const useCases = this.props.useCasesStuff["use-cases-section"].predictions
  //   console.log("uuuu", useCases)
  //   console.log("added", this.state.addedPreds)
  //   newPred = this.state.addedPreds.filter(item => useCases[item].alerts)
  //   // newPred = newPred.join()

  //   console.log("newPred", newPred)
  //   newPred.map(item => {
  //     return useCases[item].alerts
  //   })

  //   // this.setState({ addedPreds: [...this.state.addedPreds] })
  // }
  render() {
    let useCases = this.props.useCasesStuff
    console.log("holo", useCases)
    console.log(this.state.currentPrediction)
    let predictions = useCases["use-cases-section"].predictions
    console.log("use", useCases)
    console.log("addedPredsPreds", predictions)
    const predAlerts = this.state.addedPreds.map(item => {
      // console.log("it", predictions[item].alerts)
      return predictions[item].alerts
    })

    return (
      // <SectionBase>

      <div>
        <p className={styles.useCaseInfo}>
          Relevant alerts for data practitioners who intend to use this dataset
          for specific use cases (types of analyses).
        </p>
        <span className={styles.datasetUnderlineBold}></span>
        <Selector
          handleChange={this.handleChange}
          predictions={useCases["use-cases-section"]["use-cases"]}
          addedPreds={this.state.addedPreds}
          thePreds={this.state.thePreds}
          currentPrediction={this.state.currentPrediction}
        />
        <AllAlerts
          predictions={useCases["use-cases-section"].predictions}
          alerts={useCases["use-cases-section"].alerts}
          addedPreds={this.state.addedPreds}
          predAlerts={predAlerts}
          newPreds={this.newPreds}
        />
      </div>
    )
  }
}

{
  /* </SectionBase> */
}

// const mapStateToProps = state => {
//   return {
//     usecases: state.usecases,
//   }
// }

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     fetchLabel: dispatch(fetchLabelThunk(ownProps.jsonFile)),
//   }
// }
export default UseCases
