import { AnchorLink } from "gatsby-plugin-anchor-links"

import classNames from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons"
    import PropTypes from "prop-types"
import React, { useState } from "react"

import * as styles from "./styles.module.css"

const LabelHeader = (props) => {
    // updates the display class for the mobile nav
    const [showMobileNav, setShowMobileNav] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const toggleOpen = () => {
        setIsOpen(!isOpen)
    }

    const r = 50;
    const circ = 2 * Math.PI * r;
    const strokePct = ((100 - props.percentage) * circ) / 100;

    return (
        <header className={styles.header}>
            <div className={classNames(styles.headerWrap, {[styles.modOpen] : isOpen})}>
                <div className={classNames(styles.headerContainer, {[styles.modOpen] : isOpen})}>
                    <div className={classNames(styles.logoSection, {[styles.modOpen] : isOpen})}>
                        <div className={styles.logo}>
                            <AnchorLink to="/" className={styles.standardLogo}>
                                <img
                                    className={styles.logoImg}
                                    src={require("../../images/logo-s.png").default}
                                    alt="logo"
                                />
                            </AnchorLink>
                        </div>
                    </div>
                    {!props.loading && (
                        <>
                        {isOpen ? (
                            <div className={styles.metaLabel}>
                                <div className={styles.metaLabelFYI}>
                                    <div className={styles.progressCircle}>
                                        <svg width={150} height={150}>
                                          <g transform={`rotate(-90 ${"75 75"})`}>
                                            <circle
                                              r={r}
                                              cx={75}
                                              cy={75}
                                              fill="transparent"
                                              stroke={""}
                                              strokeWidth={"1rem"}
                                              strokeDasharray={circ}
                                              strokeDashoffset={0}
                                            ></circle>
                                            <circle
                                              r={r}
                                              cx={75}
                                              cy={75}
                                              fill="transparent"
                                              stroke={strokePct !== circ ? styles.teal : ""}
                                              strokeWidth={"1rem"}
                                              strokeDasharray={circ}
                                              strokeDashoffset={strokePct}
                                            ></circle>
                                          </g>
                                          <text
                                              x="50%"
                                              y="50%"
                                              dominantBaseline="central"
                                              textAnchor="middle"
                                              fontSize={"1.5em"}
                                              stroke={"white"}
                                              fill={"white"}
                                            >
                                              {props.percentage.toFixed(0)}%
                                            </text>
                                        </svg>
                                    </div>
                                    <div>
                                        <b>{'What is this label?'}</b>
                                        <p>
                                            {'The Dataset Nutrition Label enhances context, contents, and legibility of datasets. Information about this Dataset Nutrition Label, a standard of documentation that describes how to understand and use this dataset.'}
                                        </p>
                                    </div>
                                </div>
                                <ul className={styles.metaLabelList}>
                                    <li className={styles.metaLabelListItem}>
                                        <span className={styles.metaLabelListItemTitle}>
                                            {props.labelAuthor.title}
                                        </span>
                                        <span className={styles.metaLabelListItemData}>
                                            {props.labelAuthor.answer}
                                        </span>
                                    </li>
                                    <li className={styles.metaLabelListItem}>
                                        <span className={styles.metaLabelListItemTitle}>
                                            {props.relationship.title}
                                        </span>
                                        <span className={styles.metaLabelListItemData}>
                                            {props.relationship.answer}
                                        </span>
                                    </li>
                                    <li className={styles.metaLabelListItem}>
                                        <span className={styles.metaLabelListItemTitle}>
                                            {props.labelPublishDate.title}
                                        </span>
                                        <span className={styles.metaLabelListItemData}>
                                            {props.labelPublishDate.answer}
                                        </span>
                                    </li>
                                    <li className={styles.metaLabelListItem}>
                                        <span className={styles.metaLabelListItemTitle}>
                                            {props.consulted.title}
                                        </span>
                                        <span className={styles.metaLabelListItemData}>
                                            {props.consulted.answer}
                                        </span>
                                    </li>
                                    <li className={styles.metaLabelListItem}>
                                        <span className={styles.metaLabelListItemTitle}>
                                            {props.labelVersion.title}
                                        </span>
                                        <span className={styles.metaLabelListItemData}>
                                            {props.labelVersion.answer}
                                        </span>
                                    </li>
                                </ul>
                                <div className={styles.metaLabelHideButton}>
                                    <div 
                                        className={classNames(styles.blueButton)}
                                        onClick={toggleOpen}
                                        onKeyPress={toggleOpen}
                                        role="button"
                                        tabIndex={0}
                                    >
                                        <span>Hide</span>
                                        <FontAwesomeIcon
                                            icon={faAngleUp}
                                            className={styles.accordionCaretIcon}
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div
                                className={styles.labelDropdown}
                                onClick={toggleOpen}
                                onKeyPress={toggleOpen}
                                role="button"
                                tabIndex={0}
                            >
                                <span className={styles.labelDropdownText}>What is this label?</span>
                                <FontAwesomeIcon
                                    icon={faAngleDown}
                                    className={styles.accordionCaretIcon}
                                />
                            </div>
                        )}
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}

LabelHeader.propTypes = {
    loading: PropTypes.bool,
    percentage: PropTypes.number,
    labelAuthor: PropTypes.shape({
        title: PropTypes.string,
        answer: PropTypes.string
    }),
    relationship: PropTypes.shape({
        title: PropTypes.string,
        answer: PropTypes.string
    }),
    labelPublishDate: PropTypes.shape({
        title: PropTypes.string,
        answer: PropTypes.string
    }),
    consulted: PropTypes.shape({
        title: PropTypes.string,
        answer: PropTypes.string
    }),
    labelVersion: PropTypes.shape({
        title: PropTypes.string,
        answer: PropTypes.number
    })
}

export default LabelHeader
