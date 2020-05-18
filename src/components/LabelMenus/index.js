import styles from "./styles.module.css"
import React, { Component } from "react"
import { connect } from "react-redux"
import { toggleHighlight } from "../../store/labelMenu"
//TURN INTO A CLASS COMPONENT
//what does the menu item

class LabelMenus extends Component {
  constructor() {
    super()
    this.state = {
      activeItem: -1,
      showHighlight: false,
      titleList: ["Use Cases and Alerts", "Overview", "Maintenance"],
    }
    // this.highlightLabel = this.highlightLabel.bind(this)
  }

  //   highlightLabel(event) {
  //     console.log(event.target)
  //  event.
  //   }

  highlight = () => {
    this.setState(prevState => ({
      showHighlight: !prevState.showHighlight,
    }))
  }
  handleItemClick(index) {
    this.setState({
      activeItem: index,
    })
  }
  myFunction() {
    var x = document.getElementsByClassName("highlightLabel")
    if (x.style.display === "none") {
      x.style.display = "block"
    } else {
      x.style.display = "none"
    }
  }
  //   //create a function that changes the header text to the
  //   //create id from the props to change the text to the correct name
  // onClickFunction=this.props.dispatch(item.key)
  render() {
    return (
      <div>
        <div className={styles.sectionName}>
          {this.state.titleList.map((title, index) => {
            return (
              <div
                // style={{ background: color }}
                key={index}
                // onClick={() => {
                // setColor("black")
                // }}
                className={
                  this.state.activeItem === index
                    ? `  ${styles.highlightLabel}`
                    : styles.labelMenus
                }
                onClick={this.highlight}
                // onClick={this.myFunction.bind(this)}
                // onClick={this.handleItemClick.bind(this, index)}
                // onClick={this.highlightLabel}
              >
                <span
                  key={index}
                  className={`${
                    this.state.showHighlight ? styles.highlightLabel : ""
                  }`}
                ></span>
                <div
                  key={index}
                  style={{
                    display: this.state.showHighlight ? "block" : "none",
                  }}
                ></div>
                {/* <MenuItem name={title.name} key={title.key} /> */}
                <span className={styles.menuTitle}>{title}</span>
                <div className={styles.flexbox}>
                  <p className={styles.lorem}>Lorem</p>
                  <span className={styles.weightedLine}></span>
                </div>
                {/* <button onClick={this.highlightLabel}>HI THEREEEE</button> */}

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
