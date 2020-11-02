import React, { Component } from "react"
import { Link } from "gatsby"
import styles from "./styles.module.css"
import classNames from "classnames"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"

const usecases = ["Selector", "Alerts"]

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
      <nav className={styles.navbar}>
        <ul className={styles.dropdownContent}>
          {usecases.map(usecase => {
            return (
              <Link
                spy={true}
                smooth={true}
                to={`#${usecase}-title`}
                onClick={() => {
                  this.boldButton(usecase)
                }}
                className={classNames(styles.listSet, {
                  [styles.listSetBold]: this.state.bold === usecase,
                })}
              >
                <div>
                  {this.state.bold === usecase ? (
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className={styles.selectorArrow}
                    />
                  ) : (
                    ""
                  )}
                  {usecase}
                </div>
              </Link>
            )
          })}
        </ul>
      </nav>
    )
  }
}

export default UseCasesDropdown
