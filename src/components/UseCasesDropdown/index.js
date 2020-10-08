import React, { Component } from "react"
import { Link } from "gatsby"
import styles from "./styles.module.css"
import classNames from "classnames"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"

class UseCasesDropdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bold: "",
      selectBold: this.props.optionsState,
    }
    this.boldButton = this.boldButton.bind(this)
  }
  boldButton = e => {
    this.setState({
      bold: e,
      selectedLink: true,
    })
  }
  render() {
    return (
      // create a dropdown component and then add it to an onClick listener

      <nav className={styles.navbar}>
        <div>
          <ul className={styles.dropdownContent}>
            <Link
              spy={true}
              smooth={true}
              to={"#Selector-title"}
              onClick={() => {
                this.boldButton("Selector")
              }}
              className={classNames(styles.listSet, {
                [styles.listSetBold]: this.state.bold === "Selector",
              })}
            >
              <div>
                {this.state.bold === "Selector" ? (
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className={styles.selectorArrow}
                  />
                ) : (
                  ""
                )}
                Selector
              </div>
            </Link>

            <Link
              spy={true}
              smooth={true}
              to={"#Alerts-title"}
              onClick={() => {
                this.boldButton("Alerts")
              }}
              className={classNames(styles.listSet, {
                [styles.listSetBold]: this.state.bold === "Alerts",
              })}
            >
              <div>
                {this.state.bold === "Alerts" ? (
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className={styles.selectorArrow}
                  />
                ) : (
                  ""
                )}
                Alerts
              </div>
            </Link>
          </ul>
        </div>
      </nav>
    )
  }
}

export default UseCasesDropdown
