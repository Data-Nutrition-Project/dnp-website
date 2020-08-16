import React from "react"
// import SectionBase from "../../SectionBase/index.js"
import { connect } from "react-redux"
import AlertCard from "../../AlertCard/index.js"
import AllAlerts from "../../AllAlerts/index.js"
import { fetchLabelThunk } from "../../../store/labelStore"

class UseCases extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let useCases = this.props.useCasesStuff

    return (
      // <SectionBase>
      <div>
        <AllAlerts
          predictions={useCases["use-cases-section"].predictions}
          alerts={useCases["use-cases-section"].alerts}
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
