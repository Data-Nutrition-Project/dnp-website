import React from "react"
import styles from "./styles.module.css"
// import { getDataThunk } from "../../store/labelBase"
// import { connect } from "react-redux"
class LabelBase extends React.Component {
  // componentDidMount() {
  //   this.props.getDataThunk()
  // }
  render() {
    return (
      <div className={styles.labelBase}>
        <header className={styles.labelBaseHeader}></header>
        <span className={styles.weightedLine}>
          <h2></h2>
        </span>
        <span className={styles.lightLine}>
          <h1></h1>
        </span>
        <span className={styles.lightLine}>
          <h1></h1>
        </span>
      </div>
    )
  }
}
// const mapState = state => {
//   return {
//     data: state.data,
//   }
// }
// const mapDispatch = dispatch => {
//   return {
//     getData: () => dispatch(getDataThunk()),
//   }
// }

export default LabelBase
