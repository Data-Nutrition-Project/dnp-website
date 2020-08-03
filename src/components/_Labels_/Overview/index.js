import React, { Component } from "react"
import PropTypes from "prop-types"
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import ReactMarkdown from "react-markdown"
import { VegaLite } from 'react-vega'

import SectionBase from "../../SectionBase"

import styles from "./styles.module.css"

const SEVERITY_MAP = {
    3: 'HIGH',
    2: 'MED',
    1: 'LOW',
    0: 'FYI'
}

// colors for severty in same order as above
const COLOR_MAP = ['#f0190c', '#f5931e', '#fcda24', 'green']

class Overview extends Component {
    renderAlertsChart = () => {
        const data = []
        for (const [prediction, info] of Object.entries(this.props.useCasesSection.predictions)) {
            info.alerts.map(alert => {
                data.push({
                    type: this.props.useCasesSection.alerts[alert.alert].category,
                    severity: SEVERITY_MAP[alert.severity]
                })
                this.props.useCasesSection.alerts[alert.alert].tags.map(tag => {
                    data.push({
                        type: tag,
                        severity: SEVERITY_MAP[alert.severity]
                    })
                })
            })
        }

        const spec = {
            mark: 'rect',
            width: 'container',
            encoding: {
                y: { field: 'severity', type: 'nominal', sort: ['HIGH', 'MED', 'LOW', 'FYI'] },
                x: { field: 'type', type: 'nominal' },
                opacity: {
                    aggregate: 'count',
                    field: 'severity',
                    scale: {
                        type: 'threshold',
                        domain: [1, 4],
                        range: [0.2, 0.5, 1.0]
                    },
                    legend: {
                        title: 'Number of Alerts',
                        titleFontSize: 14,
                        labelFontSize: 14
                    }
                },
                color: {
                    type: 'nominal',
                    field: 'severity',
                    scale: {
                        domain: ['HIGH', 'MED', 'LOW', 'FYI'],
                        range: COLOR_MAP
                    },
                    legend: {
                        disable: true
                    }
                }
            },
            config: {
                axis: {
                    grid: true,
                    tickBand: 'extent',
                    labelFontSize: '12',
                    titleFontSize: 0
                },
                legend: {
                    titleFontSize: 0,
                    padding: 16
                }

            },
            data: { name: 'alerts' }
        }

        return <VegaLite
            className={styles.alertGraph}
            spec={spec}
            actions={false}
            data={{
                alerts: data
            }} 
        />
    }

    render() {
        return (
            <SectionBase>
                <Container>
                    <Row className={styles.row}>
                        <Col md={4}>
                            <h2 className={styles.sectionTitle}>Summary</h2>
                            <span className={styles.datasetUnderline} />
                            <div className={styles.summaryCreationSection}>
                                <span><b>Creation Timeframe:</b> {this.props.summary.createdDate}</span>
                                <br/>
                                <span><b>Creation by:</b> {this.props.summary.createdBy}</span>
                            </div>
                            <ReactMarkdown source={this.props.summary.summaryText} />
                        </Col>
                        <Col md={{ span: 7, offset: 1 }}>
                            <h2 className={styles.sectionTitle}>Purpose</h2>
                            <span className={styles.datasetUnderline} />
                            <div className={styles.qAndA}>
                                <span className={styles.question}>
                                    {this.props.datasetInfoDescription[0].question}
                                </span>
                                <ReactMarkdown
                                    className={styles.answer}
                                    source={this.props.datasetInfoDescription[0].answer}
                                />
                            </div>
                            <div>
                                <span className={styles.question}>
                                    {this.props.datasetInfoDescription[1].question}
                                </span>
                                <ReactMarkdown
                                    className={styles.answer}
                                    source={this.props.datasetInfoDescription[1].answer}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <h2 className={styles.sectionTitle}>Top Use Cases</h2>
                            <span className={styles.datasetUnderline} />
                            {this.props.topUseCases.map((useCaseName, i) => (
                                <Row>
                                    <Col md={1} className={styles.listNumber}>
                                        { i + 1 }
                                    </Col>
                                    <Col md={{ span: 10 }}>
                                        {this.props.useCasesSection['use-cases'][useCaseName].description}
                                    </Col>
                                </Row>
                            ))}
                        </Col>
                        <Col md={{ span: 7, offset: 1 }}>
                            <h2 className={styles.sectionTitle}>Alerts</h2>
                            <span className={styles.datasetUnderline} />
                            {this.renderAlertsChart()}
                        </Col>
                    </Row>
                </Container>
            </SectionBase>
        )
    }
}

Overview.propTypes = {
    summary: PropTypes.shape({
        createdDate: PropTypes.string,
        createdBy: PropTypes.string,
        summaryText: PropTypes.string
    }).isRequired,
    // the dataset info section of the blob to pull out purpose questions
    datasetInfoDescription: PropTypes.array.isRequired,
    topUseCases: PropTypes.array.isRequired,
    // whole use cases section to do alerts data extraction
    useCasesSection: PropTypes.shape({
        alerts: PropTypes.object,
        predictions: PropTypes.object,
        'use-cases': PropTypes.object
    }).isRequired
}

Overview.defaultProps = {
    summary: {
        createdDate: "2020-07-27",
        createdBy: "MEEEEEEE",
        summaryText: "Check. it. OUT!!!!!"
    },
    datasetInfoDescription: [
        {
            "question": "Tell us about this dataset.",
            "help": "Please provide an overview of this dataset.",
            "type": "markdown",
            "answer": "If you don't already know, then you shouldn't be asking friend."
        },
        {
            "question": "Is there an intended purpose for the dataset? What domain was it designed for?",
            "help": "For example, is there a service or organization that leverages this dataset? Is this dataset made available for a certain use in mind?",
            "type": "markdown",
            "answer": "Um, WINNING OF COURSE."
        }
    ],
    topUseCases: [
        "winning-1",
        "winning-2",
        "i-win-3",
        "i-win-4"
    ],
    useCasesSection: {
        alerts: {
            "alert-1": {
                "category": "completeness",
                "tags": ["race"]
            },
            "alert-2": {
                "category": "accuracy",
                "tags": ["ability"]
            },
            "alert-3": {
                "category": "completeness",
                "tags": ["gender"]
            },
            "alert-4": {
                "category": "accessibility",
                "tags": ["race"]
            },
            "alert-5": {
                "category": "accuracy",
                "tags": ["socioeconomic"]
            },
            "alert-6": {
                "category": "completeness",
                "tags": ["gender"]
            }
        },
        predictions: {
            "prediction-1": {
                "alerts": [
                    {
                        "alert": "alert-1",
                        "severity": 3
                    },
                    {
                        "alert": "alert-4",
                        "severity": 2
                    },
                    {
                        "alert": "alert-6",
                        "severity": 3
                    }
                ]
            },
            "prediction-2": {
                "alerts": [
                    {
                        "alert": "alert-1",
                        "severity": 2
                    },
                    {
                        "alert": "alert-2",
                        "severity": 1
                    },
                    {
                        "alert": "alert-5",
                        "severity": 0
                    }
                ]
            },
            "prediction-3": {
                "alerts": [
                    {
                        "alert": "alert-3",
                        "severity": 0
                    },
                    {
                        "alert": "alert-6",
                        "severity": 3
                    }
                ]
            }
        },
        'use-cases': {
            "winning-1": {
                description: "Did we win?"
            },
            "winning-2": {
                description: "Did we win?"
            },
            "i-win-3": {
                description: "Did we win?"
            },
            "i-win-4": {
                description: "Did we win?"
            }
        }
    }
}

export default Overview
