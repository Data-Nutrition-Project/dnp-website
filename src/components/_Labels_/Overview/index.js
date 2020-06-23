import React, { Component } from "react"
import SectionBase from "../../SectionBase/index.js"
import styles from "./styles.module.css"
import { connect } from "react-redux"
import { fetchOverviewThunk } from "../../../store/overviewStore"
import { Accordion, Card } from "react-bootstrap"

class Overview extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const overviewInfo = this.props.overview
    const description = overviewInfo.description || []
    return (
      <Accordion defaultActiveKey="0">
        <Card.Header>
          <div className={styles.flexbox}>
            <h1 className={styles.overviewTitle}>Overview</h1>
            <span className={styles.overviewUnderline}></span>
            <h2 className={styles.overviewSubHeader}>Description</h2>
          </div>
          <Accordion.Toggle className={styles.overviewCaret}>
            <img
              className={styles.overviewCaretImg}
              src={require("../../../images/caret.png")}
              alt="dropdown toggle"
            />
          </Accordion.Toggle>
        </Card.Header>
        <SectionBase>
          <ol className={styles.overviewList}>
            {description.map(overview => (
              <li>{overview.question}</li>
            ))}
          </ol>
          <span className={styles.overviewUnderline}></span>
<<<<<<< HEAD
          <h2 className={styles.overviewSubHeader}>Composition</h2>
        </SectionBase>
      </Accordion>
=======
        </div>
        <h2 className={styles.overviewSubHeader}>About</h2>
        <p className={styles.overviewParagraph}>
          Lorem Ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
          ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem lorem
          ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
          lorem ipsum lorem ipsum lorem ipsum lorem.
        </p>
        <span className={styles.overviewUnderline}></span>
        <div>
          <h2 className={styles.overviewSubHeader}>Motivation</h2>
          <p className={styles.overviewParagraph}>
            The questions in this section are primarily intended to encourage
            dataset creators to clearly articulate their reasons for creating
            the dataset and to promote transparency about funding interests.
          </p>
        </div>

        <span className={styles.overviewUnderline}></span>
        <ol className={styles.overviewList}>
          {description.map(overview => (
            <li>{overview.question}</li>
          ))}
        </ol>
        <span className={styles.overviewUnderline}></span>
        <h2 className={styles.overviewSubHeader}>Composition</h2>
      </SectionBase>
>>>>>>> parent of b16e4f8... commit before switching branches
    )
  }
}

const mapStateToProps = state => {
  return {
    overview: state.overview,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOverview: dispatch(fetchOverviewThunk()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Overview)
