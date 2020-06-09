import styles from "./styles.module.css"
import React, { Component } from "react"
import LabelTitle from "../LabelTitle/index"
// import SectionBase from "../SectionBase/index.js"
import { connect } from "react-redux"
// import { withRouter } from "react-router-dom"
import { sendBaseInfo } from "../../store/bases"
class LabelMenus extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showHighlight: this.props.highlightValue,
      titleList: ["Use Cases and Alerts", "Overview", "Maintenance"],
    }
    this.selectItem = this.selectItem.bind(this)
  }

  selectItem = item => {
    this.setState({
      selectedItem: item,
      showHighlight: false,
    })
    console.log("item", item)
    this.props.sendBaseInfo(item)
  }

  render() {
    return (
      <div>
        <LabelTitle />
        <div className={styles.flexComponents}>
          {/* call labelbase label section */}
          {/* create a base component to gather all the child components */}

          <div
            className={styles.labelMenu}
            style={{ display: this.state.titleList }}
          >
            {this.state.titleList.map((title, id) => {
              return (
                <div
                  id="selectButton"
                  onClick={() => this.selectItem(title)}
                  className={
                    this.state.selectedItem === title
                      ? `${styles.highlightLabel} ${styles.labelMenus}`
                      : styles.labelMenus
                  }
                  key={id}
                >
                  <div
                    style={{
                      display: this.state.showHighlight ? "block" : "none",
                    }}
                  ></div>
                  <span className={styles.menuTitle}>{title}</span>
                  <div className={styles.flexbox}>
                    <p className={styles.lorem}>Lorem</p>
                    <span className={styles.weightedLine}></span>
                  </div>
                  <p className={styles.menuParagraph}>
                    Qui ut occaecat exercitation amet mollit excepteur do
                    aliquip et sunt sit aliqua consectetur. Sit minim voluptate
                    aliqua id do velit deserunt. Voluptate irure proident esse
                    sint duis mollit culpa eiusmod officia ullamco aliqua in
                    magna dolore.
                  </p>
                </div>
              )
            })}
          </div>
          {/* <SectionBase /> */}
        </div>
      </div>
    )
  }
}

// const mapState = state => {
//   return {
//     title: state.title,
//   }
// }

const mapDispatch = dispatch => {
  return {
    sendBaseInfo: status => dispatch(sendBaseInfo(status)),
  }
}
export default connect(null, mapDispatch)(LabelMenus)
