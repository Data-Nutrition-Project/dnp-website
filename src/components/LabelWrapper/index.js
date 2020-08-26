import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

import LabelMenus from "../LabelMenus/index"
import ShareButton from "../ShareButton/index"
import DatasetInfo from "../_Labels_/DatasetInfo/index"
import Overview from "../_Labels_/Overview/index"
import UseCases from "../_Labels_/UseCases/index"
import { fetchLabelThunk } from "../../store/labelStore"

import styles from "./styles.module.css"

class LabelWrapper extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div key={0} className={styles.labelWrapper}>
        {this.props.label.overview === undefined ? (
          []
        ) : (
          <div key={1}>
            <Col
              className={styles.flexTitleMenus}
              xl={{ span: 2, offset: 1 }}
              md={{ span: 2, offset: 1 }}
              sm={{ span: 12 }}
            >
              <LabelMenus />     
            </Col>
            <Col
              className={styles.sectionBase}
              xl={{ span: 8, offset: 3 }}
              md={{ span: 8, offset: 3 }}
              sm={{ span: 12 }}
            >
              <div className={styles.labelHeader}>
                <h1>Dataset Nutrition Label</h1>
                <div>
                  <h4>{this.props.label.overview.summary.datasetName}</h4>
                  <p>{this.props.label.overview.summary.createdBy}</p>
                </div>
                <ShareButton />
              </div>
              {this.props.base === "OVERVIEW" ? (
                <Overview
                  summary={this.props.label.overview.summary}
                  datasetInfoDescription={
                    this.props.label["dataset-info"].description
                  }
                  topUseCases={this.props.label.overview["top-use-cases"]}
                  useCasesSection={this.props.label["use-cases-section"]}
                />
              ) : this.props.base === "USE CASES/ALERTS" ? (
                <UseCases
                  useCasesStuff={this.props.label["use-cases-section"]}
                />
              ) : this.props.base === "DATASET INFO" ? (
                <DatasetInfo datasetInfo={this.props.label["dataset-info"]} />
              ) : (
                []
              )}
            </Col>
          </div>
        )}
      </div>
    )
  }
}

LabelWrapper.propTypes = {
  base: PropTypes.string.isRequired,
  jsonFile: PropTypes.string.isRequired,
}

const mapStateToProps = state => {
  return {
    label: state.label,
    data: state.data,
    base: state.base,
    overview: state.overview,
    usecases: state.usecases,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchLabel: dispatch(fetchLabelThunk(ownProps.jsonFile)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LabelWrapper)
