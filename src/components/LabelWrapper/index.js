import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import Col from 'react-bootstrap/Col'

import LabelMenus from "../LabelMenus/index"
import LabelTitle from "../LabelTitle/index"
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
        <div key={1} className={styles.flexComponents}>
          <Col
            className={styles.flexTitleMenus}
            xl={{ span: 2 }}
            md={{ span: 2 }}
          >
            <LabelTitle />
            <ShareButton />
            <LabelMenus />
          </Col>
          {this.props.base === "OVERVIEW" ? (
            <Overview />
          ) : this.props.base === "USE CASES/ALERTS" ? (
            <UseCases />
          ) : this.props.base === "DATASET INFO" ? (
            <DatasetInfo
              datasetInfo={this.props.label['dataset-info']}
            />
          ) : (
            <Overview />
          )}
        </div>
      </div>
    )
  }
}

LabelWrapper.propTypes = {
  base: PropTypes.string.isRequired,
  jsonFile: PropTypes.string.isRequired
}

const mapStateToProps = state => {
  return {
    label: state.label,
    data: state.data,
    base: state.base,
    overview: state.overview
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchLabel: dispatch(fetchLabelThunk(ownProps.jsonFile)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LabelWrapper)
