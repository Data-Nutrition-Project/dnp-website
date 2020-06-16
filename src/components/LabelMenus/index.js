import React, { Component } from "react"

import LabelTitle from "../LabelTitle"
import SectionBase from "../SectionBase"

import styles from "./styles.module.css"

class LabelMenus extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showHighlight: this.props.highlightValue,
            titleList: ["Use Cases and Alerts", "Overview", "Maintenance"],
        }
    }

    selectItem = item =>
        this.setState({
            selectedItem: item,
            showHighlight: false,
        })
    render() {
        return (
            <div>
                <LabelTitle />
                <div className={styles.flexComponents}>
                    <div
                        className={styles.labelMenu}
                        style={{ display: this.state.titleList }}
                    >
                        {this.state.titleList.map((title, i) => {
                            return (
                                <div
                                    className={
                                        this.state.selectedItem === title
                                            ? `${styles.highlightLabel} ${styles.labelMenus}`
                                            : styles.labelMenus
                                    }
                                    id="selectButton"
                                    key={title.id}
                                    onClick={() => this.selectItem(title)}
                                    onKeyPress={() => this.selectItem(title)}
                                    role="button"
                                    tabIndex={i+1}
                                >
                                    <div
                                        key={title.id}
                                        style={{
                                            display: this.state.showHighlight ? "block" : "none",
                                        }}
                                    ></div>
                                    <span className={styles.menuTitle}>{title}</span>
                                    <div className={styles.flexbox}>
                                        <p className={styles.labelMenuDescription}>Lorem</p>
                                        <span className={styles.weightedLine}></span>
                                    </div>
                                    <p className={styles.menuParagraph}>
                                        Qui ut occaecat exercitation amet mollit excepteur do
                                        aliquip et sunt sit aliqua consectetur. Sit minim voluptate
                                        aliqua id do velit deserunt. Voluptate irure proident esse
                                        sint duis mollit culpa eiusmod officia ullamco aliqua in
                                        magna dolore.
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                    <SectionBase />
                </div>
            </div>
        )
    }
}

export default LabelMenus
