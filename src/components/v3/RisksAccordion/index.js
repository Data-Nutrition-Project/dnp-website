import classNames from "classnames"
import Linkify from 'react-linkify'
import React, { useState } from "react"
import PropTypes from "prop-types"

import * as styles from "./styles.module.css"

const ISSUE_STYLE_MAP = [
    styles.safe,
    styles.unknown,
    styles.risky
]

const RisksAccordion = props => {
    const [isOpen, setIsOpen] = useState(false)
    const toggleOpen = () => {
        setIsOpen(!isOpen)
    }

    const riskyCount = props.risks.reduce((count, curRisk) => {
        if (curRisk.riskLabel === 2) {
            count = count + 1
        }
        return count
    }, 0)
    const safeCount = props.risks.reduce((count, curRisk) => {
        if (curRisk.riskLabel === 0) {
            count = count + 1
        }
        return count
    }, 0)
    const unknownCount = props.risks.reduce((count, curRisk) => {
        if (curRisk.riskLabel === 1) {
            count = count + 1
        }
        return count
    }, 0) 

    console.log(props.risks)

    return (
        <div className={styles.risksSection}>
            <div className={styles.risksDescription}>
                <div className={styles.risksDescriptionTitle}>
                    <div className={styles.risksDescriptionTitleText}>
                        <img
                            src={props.icon}
                            className={styles.icon}
                        />
                        <div>
                            <h3>{props.title}</h3>
                            <p className={styles.subTitle}>{props.subtitle}</p>
                        </div>
                    </div>
                    <span className={styles.accordionCaret} onClick={toggleOpen}>
                        {isOpen ? (
                            <img 
                                className={styles.accordionCaretIcon}
                                src={require('../../../images/caret-up.png').default}
                                alt='caret up' 
                            />
                        ) : (
                            <img 
                                className={styles.accordionCaretIcon}
                                src={require('../../../images/caret-down.png').default}
                                alt='caret down' 
                            />
                        )}
                    </span>
                </div>
                {isOpen ? (
                    <div className={styles.risksList}>
                    {props.risks.map(risk => (
                        <div className={styles.riskOpen}>
                            <span className={classNames(styles.riskIcon, ISSUE_STYLE_MAP[risk.riskLabel])}></span>
                            <div className={styles.riskOpenDescription}>
                                <p className={styles.riskOpenDescriptionHeader}>{risk.name}</p>
                                <p className={styles.riskOpenDescriptionDesc}><Linkify>{risk.description}</Linkify></p>
                            </div>
                        </div>
                    ))}
                    </div>
                ) : (
                    <div className={styles.risksList}>
                    {props.risks.map(risk => (
                        <div className={styles.riskClosed}>
                            <span className={classNames(styles.riskIcon, ISSUE_STYLE_MAP[risk.riskLabel])}></span>
                            <p>{risk.name}</p>
                        </div>
                    ))}
                    </div>
                )}
            </div>
            <div className={styles.risksCount}>
                <h4>Number of issues</h4>
                <div>
                    <div className={styles.issueRow}>
                        <p>Risky</p>
                        <span className={classNames(styles.countBg, styles.modRisky)}>{riskyCount}</span>
                    </div>
                    <div className={styles.issueRow}>
                        <p>Safe</p>
                        <span className={classNames(styles.countBg, styles.modSafe)}>{safeCount}</span>
                    </div>
                    <div className={styles.issueRow}>
                        <p>Unknown</p>
                        <span className={classNames(styles.countBg, styles.modUnknown)}>{unknownCount}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

RisksAccordion.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    risks: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        riskLabel: PropTypes.number.isRequired
    })).isRequired,
    icon: PropTypes.any.isRequired
}

export default RisksAccordion
