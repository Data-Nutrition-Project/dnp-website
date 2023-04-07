import classNames from "classnames"
import PropTypes from "prop-types"
import React from "react"

import * as styles from "./styles.module.css"

const RISK_MAP = {
    'about-humans': {
        yes: 'risky',
        no: 'safe'
    },
    'upstream-sources': {
        yes: 'risky',
        no: 'safe'
    },
    'technical-review': {
        yes: 'safe',
        no: 'risky'
    },
    'ethical-review': {
        yes: 'safe',
        no: 'risky'
    },
    'update-frequency': {
        yes: 'risky',
        no: 'safe'
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
    let riskImg = 'caution'
    if (props.badgeAnswer === 'yes' || props.badgeAnswer === 'no') {
        riskImg = RISK_MAP[props.reference][props.badgeAnswer]
    }
    
    return (
        <div className={props.className}>
            <div className={styles.badge}>
                <img
                    src={props.badgeIcon}
                    className={styles.badgeIcon}
                    alt={`${props.title} badge icon`}
                />
                <div className={classNames(styles.badgeRisk, styles[riskImg])}>
                    <img
                        src={require(`../../../images/${riskImg}.png`).default}
                        className={styles.badgeRiskIcon}
                        alt={`${riskImg} level for ${props.title}`}
                    />
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
                    <span className={styles.badgeDescription}>
                        {props.description}
                    </span>
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
