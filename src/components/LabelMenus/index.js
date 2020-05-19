import styles from "./styles.module.css"
import React, { Component } from "react"
import LabelTitle from "../LabelTitle/index"
import { connect } from "react-redux"

class LabelMenus extends Component {
  constructor() {
    super()
    this.state = {
      titleList: ["Use Cases and Alerts", "Overview", "Maintenance"],
    }
  }

  selectItem = item =>
    this.setState({
      selectedItem: item,
      showHighlight: false,
    })
  render() {
    return (
      <div>
        <LabelTitle />
        <div style={{ display: this.state.titleList }}>
          {this.state.titleList.map(title => {
            return (
              <div
                key={title.id}
                onClick={() => this.selectItem(title)}
                className={
                  this.state.selectedItem === title
                    ? `${styles.highlightLabel} ${styles.labelMenus}`
                    : styles.labelMenus
                }
              >
                <div
                  key={title.id}
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
                  Qui ut occaecat exercitation amet mollit excepteur do aliquip
                  et sunt sit aliqua consectetur. Sit minim voluptate aliqua id
                  do velit deserunt. Voluptate irure proident esse sint duis
                  mollit culpa eiusmod officia ullamco aliqua in magna dolore.
                </p>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    title: state.title,
  }
}
export default connect(mapState)(LabelMenus)
