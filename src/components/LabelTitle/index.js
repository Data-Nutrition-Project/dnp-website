import React from "react"

import PropTypes from "prop-types"

import styles from "./styles.module.css"

const LabelTitle = props => {
    return (
        <div className={styles.labelTitle}>
            <h1 className={styles.headerTitle}>Data Nutrition Label</h1>
            <div className={styles.pageSubHeaderRow}>
                <h2 className={styles.datasetLabelHeader}>
                    {props.datasetName}
                </h2>
                <a className={styles.iconLink} href={props.datasetNameLink}>
                    <img
                        className={styles.iconLinkImg}
                        src={require("../../images/linkimg.png")}
                        alt="icon for link"
                        id="datasetLink"
                    />
                </a>
            </div>
            <div className={styles.link}>
                <p className={styles.datasetOriginLink}>{props.datasetOrg}</p>
            </div>
            <div className={styles.link}>
                <a className={styles.datasetLink} href={props.datasetOrgLink}>
                    <img src="/linkimg.png" alt="" id="datasetLink" />
                </a>
            </div>
            <span className={styles.weightedLine}> </span>
        </div>
    )
}

LabelTitle.propTypes = {
    datasetName: PropTypes.string.isRequired,
    datasetOrg: PropTypes.string.isRequired,
    datasetNameLink: PropTypes.string.isRequired,
    datasetOrgLink: PropTypes.string.isRequired
}

LabelTitle.defaultProps = {
    datasetName: 'College Scoreboard Dataset 2020',
    datasetOrg: 'US Department of Education',
    datasetNameLink: '#',
    datasetOrgLink: '#'
}

export default LabelTitle
