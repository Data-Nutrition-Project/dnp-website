import styles from "./styles.module.css"
import React, { Component } from "react"
import { connect } from "react-redux"
import { sendBaseInfo } from "../../store/bases"
class LabelMenus extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showHighlight: this.props.highlightValue,
      menus: [
        {
          title: "Overview",
          desc:
            "Overview information about the dataset including Description, Provenance, Composition, and Collection.",
        },
        {
          title: "Use Cases and Alerts",
          desc:
            "Relevant alerts for data practitioners who intent to use this dataset for specific use cases (types of analyses).",
        },
        {
          title: "Maintenance",
          desc:
            "Information about the ongoing management of the dataset, such as how the data will be maintained, updated, and the best contact for further inquiries.",
        },
      ],
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
      <div
        className={styles.labelMenu}
        style={{ display: this.state.titleList }}
      >
        {this.state.menus.map((menu, id) => {
          return (
            <div
              id="selectButton"
              onClick={() => this.selectItem(menu.title)}
              className={
                this.state.selectedItem === menu.title
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
              <span className={styles.menuTitle}>{menu.title}</span>
              <div className={styles.flexbox}>
                <span className={styles.weightedLine}></span>
              </div>
              <p className={styles.menuParagraph}>{menu.desc}</p>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    sendBaseInfo: status => dispatch(sendBaseInfo(status)),
  }
}
export default connect(null, mapDispatch)(LabelMenus)
