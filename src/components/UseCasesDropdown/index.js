import React, { Component } from "react"
import { Link } from "gatsby"
import styles from "./styles.module.css"
import classNames from "classnames"

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
    console.log("target", e.target)
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
              <div>Selector </div>
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
              <div>Alerts</div>
            </Link>
          </ul>
        </div>
      </nav>
    )
  }
}

export default UseCasesDropdown
