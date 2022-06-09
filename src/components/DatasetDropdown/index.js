import React, { Component } from "react"
import * as styles from "./styles.module.css"
import classNames from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"

const dropdowns = [
  "Description",
  "Composition",
  "Provenance",
  "Collection",
  "Management",
]
class DatasetDropdown extends Component {
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
        <ul className={styles.dropdown}>
          {dropdowns.map(dropdown => {
            return (
              <a
                href={`#${dropdown}-title`}
                onClick={() => {
                  this.boldButton(dropdown)
                }}
                className={classNames(styles.listSet, {
                  [styles.listSetBold]: this.state.bold === dropdown,
                })}
              >
                <div>
                  {this.state.selectedLink && this.state.bold === dropdown ? (
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className={styles.dropdownArrow}
                    />
                  ) : (
                    ""
                  )}
                  {dropdown}
                </div>
              </a>
            )
          })}
        </ul>
      </nav>
    )
  }
}

export default DatasetDropdown
