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

    const r = 75;
    const circ = 2 * Math.PI * r;
    const strokePct = ((100 - props.percentage) * circ) / 100;

    return (
        <div className={styles.header}>
            <div className={classNames(styles.headerWrap, {[styles.modOpen] : isOpen})}>
                {props.children}
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
                                        <svg width={200} height={200}>
                                            <g transform={`rotate(-90 ${"100 100"})`}>
                                                <circle
                                                  r={r}
                                                  cx={100}
                                                  cy={100}
                                                  fill="transparent"
                                                  stroke={""}
                                                  strokeWidth={"1rem"}
                                                  strokeDasharray={circ}
                                                  strokeDashoffset={0}
                                                ></circle>
                                                <circle
                                                  r={r}
                                                  cx={100}
                                                  cy={100}
                                                  fill="transparent"
                                                  stroke={strokePct !== circ ? styles.teal : ""}
                                                  strokeWidth={"1rem"}
                                                  strokeDasharray={circ}
                                                  strokeDashoffset={strokePct}
                                                ></circle>
                                            </g>
                                            <text
                                              x="50%"
                                              y="45%"
                                              dominantBaseline="central"
                                              textAnchor="middle"
                                              fontSize={"2em"}
                                              stroke={"white"}
                                              fill={"white"}
                                            >
                                              {props.percentage.toFixed(0)}%
                                            </text>
                                            <text
                                              x="50%"
                                              y="60%"
                                              dominantBaseline="central"
                                              textAnchor="middle"
                                              fontSize={".5em"}
                                              stroke={"white"}
                                              fill={"white"}
                                              textLength={'50%'}
                                            >
                                              {'COMPLETENESS'}
                                            </text>
                                        </svg>
                                    </div>
                                    <div className={styles.labelDesc}>
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
                                            {props.labelAuthor.email ? (    
                                                <span className={styles.authorLink}>  
                                                    {props.labelAuthor.answer}          
                                                    <a href={`mailto:${props.labelAuthor.email}`}>
                                                        <img 
                                                            className={styles.emailIcon}
                                                            src={require('../../images/icon-email-white.png').default}
                                                            alt='email icon' 
                                                        />
                                                    </a>
                                                </span>
                                            ) : (<span>{props.labelAuthor.answer}</span>)}
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
                                            {Array.isArray(props.consulted.answer) ? (
                                                props.consulted.answer.reduce(
                                                    (accum, answerObj) => {
                                                        return accum.concat(', ', `${answerObj.Name} (${answerObj.affiliation})`)
                                                    }, '')
                                            ) : (
                                                props.consulted.answer
                                            )}
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
        </div>
    )
}

LabelHeader.propTypes = {
    loading: PropTypes.bool,
    percentage: PropTypes.number,
    labelAuthor: PropTypes.shape({
        title: PropTypes.string,
        answer: PropTypes.string,
        email: PropTypes.string,
        relationship: PropTypes.string
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
