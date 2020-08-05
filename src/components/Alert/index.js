import React from "react"

import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import classNames from 'classnames'
import PropTypes from "prop-types"
import ReactMarkdown from 'react-markdown'

import styles from "./styles.module.css"

const Alert = props => {
    const severityMap = {
        fyi: '',
        low: 'Low Severity',
        medium: 'Moderate Severity',
        high: 'High Severity'
    }

    return (
        <Accordion defaultActiveKey="0">
            <Card className={styles.card}>
                <Card.Header className={styles.columns}>
                    <div className={classNames(styles.alertColumn, styles.circle, styles[props.severity])}></div>
                    <div className={classNames(styles.alertColumn)}>
                        <p className={classNames(styles.label, styles.titleText)}>Title</p>
                        <p className={classNames(styles.label, styles.subtitleText)}>Type</p>
                    </div>
                    <div className={classNames(styles.alertColumn, styles.spacerColumn)}>
                        <p className={styles.titleText}>{props.title}</p>
                        <p className={styles.subtitleText}>{props.type}</p>
                    </div>
                    <div className={classNames(styles.alertColumn, styles.rightColumn)}>
                        <p className={classNames(styles.bold, styles.subtitleText, styles[props.severity])}>
                            {severityMap[props.severity]}
                        </p>
                        <div className={styles.tagsRow}>
                            <p className={classNames(styles.subtitleText, styles.label)}>Who's impacted</p>
                            {props.tags.map((tag, i) => {
                                return (
                                    <p className={classNames(styles.subtitleText, styles.tag)} key={i}>{tag}</p>
                                )
                            })}
                        </div>
                    </div>
                    <Accordion.Toggle className={styles.caret} eventKey="0">
                        <img
                            className={styles.caretImg}
                            src={require("../../images/caret.png")}
                            alt="dropdown toggle"
                        />
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <div className={styles.content}>
                        <ReactMarkdown source={props.content} />
                    </div>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
}

Alert.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    contentType: PropTypes.oneOf(['text', 'markdown', 'vega-lite']).isRequired,
    severity: PropTypes.oneOf(['fyi', 'low', 'medium', 'high']).isRequired,
    type: PropTypes.oneOf(['completeness', 'accuracy', 'timeliness', 'consistenty', 'accessibility']).isRequired,
    tags: PropTypes.arrayOf(PropTypes.string)
}

Alert.defaultProps = {
    title: 'OH NOESSSS!!!!',
    content: '### Info ###\n\nAHHHHHHHHH!!!!',
    contentType: 'markdown',
    severity: 'high',
    type: 'completeness',
    tags: ['age']
}

export default Alert
