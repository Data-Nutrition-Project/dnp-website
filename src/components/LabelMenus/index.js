import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import classNames from "classnames"

import UseCasesDropdown from "../UseCasesDropdown"
import DatasetDropdown from "../DatasetDropdown"
import { sendBaseInfo } from "../../store/bases"

import styles from "./styles.module.css"

const menus = [
  {
    title: "OVERVIEW",
  },
  {
    title: "USE CASES/ALERTS",
  },
  {
    title: "DATASET INFO",
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
      open: item,
    })
    this.props.sendBaseInfo(item)
  }

  render() {
    return (
      <div className={styles.menuTop}>
        <div
          className={styles.labelMenu}
          style={{ display: this.state.titleList }}
        >
          {menus.map((menu, id) => {
            return (
              <div key={id}>
                <div id="selectButton" key={id}>
                  <span
                    className={classNames(styles.menuTitle, {
                      [styles.highlightMenuTitle]:
                        this.state.selectedItem === menu.title,
                    })}
                  >
                    <span onClick={() => this.selectItem(menu.title)}>
                      {menu.title}
                    </span>
                  </span>

                  {this.state.open === "USE CASES/ALERTS" &&
                  menu.title === "USE CASES/ALERTS" ? (
                    <UseCasesDropdown />
                  ) : null}
                  {this.state.open === "DATASET INFO" &&
                  menu.title === "DATASET INFO" ? (
                    <DatasetDropdown />
                  ) : null}
                </div>
              </div>
            )
          })}
        </div>
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
