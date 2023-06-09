import classNames from "classnames"
import Linkify from 'react-linkify'
import PropTypes from "prop-types"
import React from "react"

import * as styles from "./styles.module.css"

import AboutHumansIcon from "../../../images/about-humans.inline.svg"
import UpstreamSourcesIcon from "../../../images/upstream-sources-big.inline.svg"
import TechnicalReviewIcon from "../../../images/technical-review.inline.svg"
import EthicalReviewIcon from "../../../images/ethical-review.inline.svg"
import UpdateFrequencyIcon from "../../../images/update-frequency.inline.svg"

import CautionIcon from "../../../images/caution.inline.svg"
import RiskyIcon from "../../../images/risky.inline.svg"
import SafeIcon from "../../../images/safe.inline.svg"

const RISKY_ICON = <RiskyIcon 
    style={{ 
        'margin-left': '-1.5rem',
        'margin-top': '1rem' 
    }} 
/>
const SAFE_ICON = <SafeIcon 
    style={{ 
        'margin-left': '-1.5rem', 
        'margin-top': '1rem' 
    }} 
/>

const RISK_MAP = {
    'about-humans': {
        yes: {
            icon: RISKY_ICON,
            style: 'risky'
        },
        no: {
            icon: SAFE_ICON,
            style: 'safe'
        },
        icon: <AboutHumansIcon />
    },
    'upstream-sources': {
        yes: {
            icon: RISKY_ICON,
            style: 'risky'
        },
        no: {
            icon: SAFE_ICON,
            style: 'safe'
        },
        icon: <UpstreamSourcesIcon />
    },
    'technical-review': {
        yes: {
            icon: SAFE_ICON,
            style: 'safe'
        },
        no: {
            icon: RISKY_ICON,
            style: 'risky'
        },
        icon: <TechnicalReviewIcon />
    },
    'ethical-review': {
        yes: {
            icon: SAFE_ICON,
            style: 'safe'
        },
        no: {
            icon: RISKY_ICON,
            style: 'risky'
        },
        icon: <EthicalReviewIcon />
    },
    'update-frequency': {
        yes: {
            icon: RISKY_ICON,
            style: 'risky'
        },
        no: {
            icon: SAFE_ICON,
            style: 'safe'
        },
        icon: <UpdateFrequencyIcon />
    }
}

const LinkedDescription = ({ source, i, length }) => {
    let validURL = false
    let trailingString = ''
    try {
        const url = new URL(source['Access Point'].answer)
        validURL = url.protocol === "http:" || url.protocol === "https:"
    } catch {
        validURL = false
    }

    if ((i + 1) < length) {
        trailingString = ', '
    }
    return (
        <>
        {validURL ? (
            <span>
                <a href={source['Access Point'].answer}>
                    {source['Source Name'].answer}
                </a>
                {trailingString}
            </span>
        ) : (
            <>{source['Source Name'].answer.concat(trailingString)}</>
        )}
        </>
    )
}

const Badge = props => {
    let riskImg = <CautionIcon />
    let riskLevel = 'caution'
    if (props.badgeAnswer === 'yes' || props.badgeAnswer === 'no') {
        riskImg = RISK_MAP[props.reference][props.badgeAnswer].icon
        riskLevel = RISK_MAP[props.reference][props.badgeAnswer].style
    }
    
    return (
        <div className={props.className}>
            <div className={styles.badge}>
                {RISK_MAP[props.reference].icon}
                <div className={classNames(styles.badgeRisk, styles[riskLevel])}>
                    {riskImg}
                </div>
            </div>
            <p className={styles.modCenter}>
                {props.title}
            </p>
            <p className={classNames(styles.badgeAnswer, styles.modCenter)}>
                {`${props.badgeAnswer.charAt(0).toUpperCase()}${props.badgeAnswer.slice(1)}`}
            </p>
            {props.isOpen &&
                <p className={styles.modCenter}>
                {(props.reference === 'upstream-sources' && Array.isArray(props.description)) ? (
                    <span className={styles.badgeDescription}>
                    {props.description.map((source, i, sources) => (
                        <LinkedDescription
                            source={source}
                            i={i}
                            length={sources.length}
                        />
                    ))}
                    </span>
                ) : (
                    <Linkify>
                        <span className={styles.badgeDescription}>
                            {props.description}
                        </span>
                    </Linkify>
                )}
                </p>
            }
        </div>
    )
}

Badge.propTypes = {
    title: PropTypes.string.isRequired,
    reference: PropTypes.string.isRequired,
    badgeAnswer: PropTypes.string.isRequired,
    badgeIcon: PropTypes.any.isRequired,
    description: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    className: PropTypes.string,
    isOpen: PropTypes.bool.isRequired
}

export default Badge
