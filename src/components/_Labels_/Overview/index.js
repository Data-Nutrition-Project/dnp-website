import React, { Component } from "react"
import SectionBase from "../../SectionBase/index.js"
import { render } from "enzyme"
import styles from "./styles.module.css"
class Overview extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <SectionBase>
        <div clasName={styles.flexbox}>
          <h1 className={styles.overviewTitle}>Overview</h1>
          <span className={styles.overviewUnderline}></span>
        </div>
        <h2 className={styles.overviewSubHeader}>About</h2>
        <p className={styles.overviewParagraph}>dfsdfsdfdsf</p>
        <span className={styles.overviewUnderline}></span>
        <h2 className={styles.overviewSubHeader}>Motivation</h2>
        <p className={styles.overviewParagraph}>dfsdfsdfdsf</p>
        <span className={styles.overviewUnderline}></span>
        <ol className={styles.overviewList}>
          <li>sfsdfdsf</li>
          <li>sdfdsfdf</li>
        </ol>
      </SectionBase>
    )
  }
}

export default Overview
