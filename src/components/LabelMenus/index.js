import React, { Component } from "react"
import { connect } from "react-redux"
import { sendBaseInfo } from "../../store/bases"
import PropTypes from "prop-types"
import styles from "./styles.module.css"
import classNames from "classnames"

const menus = [
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
]

class LabelMenus extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showHighlight: this.props.highlightValue,
    }
    this.selectItem = this.selectItem.bind(this)
  }

  selectItem = item => {
    this.setState({
      selectedItem: item,
      showHighlight: false,
    })
    this.props.sendBaseInfo(item)
  }

  render() {
    return (
      <div
        className={styles.labelMenu}
        style={{ display: this.state.titleList }}
      >
        {menus.map((menu, id) => {
          return (
            <div
              id="selectButton"
              onClick={() => this.selectItem(menu.title)}
              className={classNames(styles.labelMenus, {
                [styles.highlightLabel]: this.state.selectedItem === menu.title,
              })}
              key={id}
            >
              <div
                className={classNames(styles.hiddenDiv, {
                  [styles.blockDiv]: this.state.showHighlight === true,
                })}
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

LabelMenus.propTypes = {
  sendBaseInfo: PropTypes.func.isRequired,
}

const mapDispatch = dispatch => {
  return {
    sendBaseInfo: status => dispatch(sendBaseInfo(status)),
  }
}
export default connect(null, mapDispatch)(LabelMenus)
