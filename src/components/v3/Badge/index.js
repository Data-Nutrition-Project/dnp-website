import classNames from "classnames"
import React from "react"
import PropTypes from "prop-types"

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

const Badge = props => {
    return (
        <div className={props.className}>
            <div className={styles.badge}>
                <img
                    src={props.badgeIcon}
                    className={styles.badgeIcon}
                    alt={`${props.title} badge icon`}
                />
                <div className={classNames(styles.badgeRisk, styles[RISK_MAP[props.reference][props.badgeAnswer]])}>
                    <img
                        src={require(`../../../images/${RISK_MAP[props.reference][props.badgeAnswer]}.png`).default}
                        className={styles.badgeRiskIcon}
                        alt={`${RISK_MAP[props.reference][props.badgeAnswer]} level for ${props.title}`}
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
                    {props.description}
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
    description: PropTypes.string.isRequired,
    className: PropTypes.string,
    isOpen: PropTypes.bool.isRequired
}

export default Badge
