import styles from "./styles.module.css"
import React, { Component } from "react"
import { connect } from "react-redux"
import { sendBaseInfo } from "../../store/bases"
<<<<<<< HEAD
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
    title: "Dataset Info",
    desc:
      "Information about the ongoing management of the dataset, such as how the data will be maintained, updated, and the best contact for further inquiries.",
  },
]

=======
>>>>>>> 6e60ba3ae3467508eafa3c40f2c8c29d47f14a9d
class LabelMenus extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showHighlight: this.props.highlightValue,
<<<<<<< HEAD
=======
      titleList: ["Use Cases and Alerts", "Overview", "Maintenance"],
>>>>>>> 6e60ba3ae3467508eafa3c40f2c8c29d47f14a9d
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
<<<<<<< HEAD
}

LabelMenus.propTypes = {
  sendBaseInfo: PropTypes.func.isRequired,
=======
>>>>>>> 6e60ba3ae3467508eafa3c40f2c8c29d47f14a9d
}

const mapDispatch = dispatch => {
  return {
    sendBaseInfo: status => dispatch(sendBaseInfo(status)),
  }
}
export default connect(null, mapDispatch)(LabelMenus)
