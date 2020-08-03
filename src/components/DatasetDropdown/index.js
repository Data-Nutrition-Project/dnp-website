import React, { Component } from "react"
import { Link } from "gatsby"
import styles from "./styles.module.css"
import classNames from "classnames"

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
      <div>
        <nav className={styles.navbar}>
          <ul className={styles.dropdown}>
            {dropdowns.map(dropdown => {
              return (
                <Link
                  spy={true}
                  smooth={true}
                  to={`#${dropdown}-title`}
                  onClick={() => {
                    this.boldButton(dropdown)
                  }}
                  className={classNames(styles.listSet, {
                    [styles.listSetBold]: this.state.bold === dropdown,
                  })}
                >
                  <div>{dropdown}</div>
                </Link>
              )
            })}
          </ul>
        </nav>
      </div>
    )
  }
}

export default DatasetDropdown
