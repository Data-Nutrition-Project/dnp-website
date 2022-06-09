import React, { Component } from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import ReactMarkdown from "react-markdown"
import { VegaLite } from "react-vega"

import * as styles from "./styles.module.css"
import * as colors from "../../layout.css"

const COLOR_MAP = [
  '#fcda24',
  '#f5931e',
  '#f0190c'
]

const SEVERITY_MAP = [
  "Yes",
  "Maybe",
  "No"
]

const BINARY_BADGE_MAP = [
  {
    key: 'about-humans',
    alt: [
      'badge saying dataset is about humans',
      'badge saying dataset is not about humans'
    ],
    options: [
      'about-humans-y',
      'about-humans-n'
    ]
  },
  {
    key: 'individual-data',
    alt: [
      'badge saying dataset has individual data',
      'badge saying dataset does not have individual data'
    ],
    options: [
      'individual-data-y',
      'individual-data-n'
    ]
  },
  {
    key: 'subpopulations',
    alt: [
      'badge saying dataset identifies subpopulations',
      'badge saying dataset does not identify subpopulations'
    ],
    options: [
      'subpopulations-y',
      'subpopulations-n'
    ]
  },
  {
    key: 'quality-review',
    alt: [
      'badge saying dataset has been reviewed for quality',
      'badge saying dataset does not have quality review'
    ],
    options: [
      'quality-review-y',
      'quality-review-n'
    ]
  },
  {
    key: 'ethical-review',
    alt: [
      'badge saying dataset has been reviewed for ethical issues',
      'badge saying dataset does not have ethical review'
    ],
    options: [
      'ethical-review-y',
      'ethical-review-n'
    ]
  }
]

const MULTI_BADGE_MAP = [
  {
    key: 'data-license',
    alt: [
      'badge saying dataset license is non-commercial',
      'badge saying dataset license is commercial'
    ],
    options: [
      'data-license-nc',
      'data-license-c'
    ]
  },
  {
    key: 'funding',
    alt: [
      'badge saying dataset funding is multi-source',
      'badge saying dataset funding is for-profit funded',
      'badge saying dataset funding is not-for-profit funded',
      'badge saying dataset funding is government funded'
    ],
    options: [
      'funding-ms',
      'funding-fp',
      'funding-nfp',
      'funding-g'
    ]
  },
  {
    key: 'source',
    alt: [
      'badge saying dataset is from single source',
      'badge saying dataset is from multiple sources'
    ],
    options: [
      'source-ss',
      'source-ms'
    ]
  },
  {
    key: 'updates',
    alt: [
      'badge saying dataset is updated daily',
      'badge saying dataset is updated weekly',
      'badge saying dataset is updated annualy',
      'badge saying dataset is not updated'
    ],
    options: [
      'updates-d',
      'updates-w',
      'updates-a',
      'updates-na'
    ]
  }
]

class Overview extends Component {
  constructor(props) {
    super(props)

    let data = {
      byCategory: [],
      byMitigation: [],
      byPotentialHarm: [],
      categoryHarmMatrix: {
        Completeness: {count: 0, tags: {}},
        Provenance: {count: 0, tags: {}},
        Collection: {count: 0, tags: {}},
        Description: {count: 0, tags: {}},
        Composition: {count: 0, tags: {}},
      }
    }
    Object.entries(this.props.objectivesSection.alerts).map((alertInfo, i) => {
      const alert = alertInfo[1]
      const severity = parseInt(alert.severity)
      data.byCategory.push({
        category: alert.category,
        severity: severity,
        label: SEVERITY_MAP[severity - 1]
      })
      data.byMitigation.push({
        severity: severity,
        label: SEVERITY_MAP[severity - 1]
      })
      alert.tags.map(tag => {
        if (data.categoryHarmMatrix[alert.category].tags[tag] === undefined) {
          data.categoryHarmMatrix[alert.category].tags[tag] = 0
        }
        data.categoryHarmMatrix[alert.category].count++
        data.categoryHarmMatrix[alert.category].tags[tag]++
        data.byPotentialHarm.push({
          potentialHarm: tag,
          severity: severity,
          label: SEVERITY_MAP[severity - 1]
        })
      })
    })

    this.state = data
  }

  renderAlertsCategory = (alertsByCat) => {
    const spec = {
      layer: [
        {
          mark: "bar",
        },
        {
          mark: {
            type: "text",
            font: "Raleway",
            align: "left",
            baseline: "bottom",
            size: "11",
            dx: 8,
            dy: 3
          },
          encoding: {
            text: {
              field: "category"
            },
            color: {
              value: "black"
            }
          }
        }
      ],
      width: "container",
      encoding: {
        y: {
          field: "category",
          band: 0.75,
          axis: {
            labelFontSize: 0
          }
        },
        x: {
          aggregate: "count",
          field: "category",
          axis: {
            orient: "top",
            tickMinStep: 1
          }
        },
        color: {
          type: "nominal",
          field: "severity",
          scale: {
            domain: [1, 2, 3],
            range: COLOR_MAP
          },
          legend: false
        },
      },
      config: {
        view: {
          stroke: "transparent"
        },
        axis: {
          grid: false,
          tickBand: "extent",
          labelFont: "Raleway",
          labelFontSize: "12",
          titleFontSize: 0
        },
        legend: {
          titleFontSize: 0,
          padding: 12,
        }
      },
      data: { name: "alerts" },
    }

    return (
      <VegaLite
        className={styles.alertGraph}
        spec={spec}
        actions={false}
        data={{
          alerts: alertsByCat,
        }}
      />
    )
  }

  renderAlertsHarm = (alertsByHarm) => {
    console.log(alertsByHarm)
    console.log(COLOR_MAP)
    const spec = {
      layer: [
        {
          mark: "bar",
        },
        {
          mark: {
            type: "text",
            font: "Raleway",
            align: "left",
            baseline: "bottom",
            size: "11",
            dx: 5,
            dy: 3
          },
          encoding: {
            text: {
              field: "potentialHarm"
            },
            color: {
              value: "black"
            }
          }
        }
      ],
      width: "container",
      encoding: {
        y: {
          field: "potentialHarm",
          band: 0.75,
          axis: {
            labelFontSize: 0
          }
        },
        x: {
          aggregate: "count",
          field: "potentialHarm",
          axis: {
            orient: "top",
            tickMinStep: 1
          }
        },
        color: {
          type: "nominal",
          field: "severity",
          scale: {
            domain: [1, 2, 3],
            range: ['#5b8b92']
          },
          legend: false
        }
      },
      config: {
        view: {
          stroke: "transparent"
        },
        axis: {
          grid: false,
          tickBand: "extent",
          labelFont: "Raleway",
          labelFontSize: "12",
          titleFontSize: 0,
        },
        legend: {
          titleFontSize: 0,
          padding: 12,
        },
      },
      data: { name: "alerts" },
    }

    return (
      <VegaLite
        className={styles.alertGraph}
        spec={spec}
        actions={false}
        data={{
          alerts: alertsByHarm,
        }}
      />
    )
  }

  renderAlerts = (alerts) => {
    const spec = {
      layer: [
        {
          mark: "bar",
        },
        {
          mark: {
            type: "text",
            font: "Raleway",
            align: "left",
            baseline: "bottom",
            size: "11",
            dx: 8,
            dy: 3
          },
          encoding: {
            text: {
              field: "label"
            },
            color: {
              value: "black"
            }
          }
        }
      ],
      width: "container",
      encoding: {
        y: {
          field: "severity",
          type: "nominal",
          band: 0.75,
          axis: {
            labelFontSize: 0
          }
        },
        x: {
          aggregate: "count",
          field: "label",
          axis: {
            orient: "top",
            tickMinStep: 1
          }
        },
        color: {
          type: "nominal",
          field: "severity",
          scale: {
            domain: [1, 2, 3],
            range: COLOR_MAP
          },
          legend: false
        }
      },
      config: {
        view: {
          stroke: "transparent"
        },
        axis: {
          grid: false,
          tickBand: "extent",
          labelFont: "Raleway",
          labelFontSize: "12",
          titleFontSize: 0,
        },
        legend: {
          titleFontSize: 0,
          padding: 12,
        },
      },
      data: { name: "alerts" },
    }

    return (
      <VegaLite
        className={styles.alertGraph}
        spec={spec}
        actions={false}
        data={{
          alerts: alerts,
        }}
      />
    )
  }

  render() {
    return (
      <>
        <Row className={styles.row}>
          <Col md={{ span: 5 }} sm={{ span: 12 }}>
            <Row className={styles.row}>
              <Col md={{ span: 12 }}>
                <h3 className={styles.sectionTitle}>About</h3>
                <div className={classNames(styles.qAndA, styles.pFontSize)}>
                  <ReactMarkdown
                    className={styles.answer}
                    children={this.props.datasetInfoDescription[0].answer}
                  />
                </div>
              </Col>
            </Row>
            <Row className={styles.row}>
              <Col md={12} className={styles.pFontSize}>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>
                    Data Creation Range:
                  </span>
                  <span>
                    <ReactMarkdown>
                      {this.props.summary['Data Collection Range']}
                    </ReactMarkdown>
                  </span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Created By:</span>
                  <span>
                    <ReactMarkdown>
                      {this.props.summary['Created By']}
                    </ReactMarkdown>
                  </span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Content:</span>
                  <span>
                    {this.props.summary['Content']}
                  </span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Source:</span>
                  <span>
                    <ReactMarkdown>{this.props.summary['Source']}</ReactMarkdown>
                  </span>
                </div>
              </Col>
            </Row>
            <span className={styles.datasetUnderline} />
            <Row>
              <Col md={12}>
                <h3 className={classNames(styles.sectionTitle, styles.alertsCategoryHeader)}>
                  <span>Alert Count</span>
                  <span>{
                    this.state.categoryHarmMatrix.Completeness.count +
                    this.state.categoryHarmMatrix.Provenance.count +
                    this.state.categoryHarmMatrix.Collection.count +
                    this.state.categoryHarmMatrix.Description.count +
                    this.state.categoryHarmMatrix.Composition.count
                  }*</span>
                </h3>
                <h4 className={styles.labelCategory}>
                  <span>Completeness</span>
                  <span>{this.state.categoryHarmMatrix.Completeness.count}</span>
                </h4>
                {Object.entries(this.state.categoryHarmMatrix.Completeness.tags).length > 0 && (
                  <ul className={classNames(styles.labelHarmList, styles.pFontSize)}>
                    {Object.entries(this.state.categoryHarmMatrix.Completeness.tags).map((values, i) => (
                      <li className={styles.labelHarmItem}>
                        <span className={styles.labelHarmItemName}>{values[0]}</span>
                        <span className={styles.labelHarmItemCount}>{values[1]}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <h4 className={styles.labelCategory}>
                  <span>Provenance</span>
                  <span>{this.state.categoryHarmMatrix.Provenance.count}</span>
                </h4>
                {Object.entries(this.state.categoryHarmMatrix.Provenance.tags).length > 0 && (
                  <ul className={classNames(styles.labelHarmList, styles.pFontSize)}>
                    {Object.entries(this.state.categoryHarmMatrix.Provenance.tags).map((values, i) => (
                      <li className={styles.labelHarmItem}>
                        <span className={styles.labelHarmItemName}>{values[0]}</span>
                        <span className={styles.labelHarmItemCount}>{values[1]}</span>
                      </li>
                    ))}
                  </ul>
                )}     
                <h4 className={styles.labelCategory}>
                  <span>Collection</span>
                  <span>{this.state.categoryHarmMatrix.Collection.count}</span>
                </h4>
                {Object.entries(this.state.categoryHarmMatrix.Collection.tags).length > 0 && (
                  <ul className={classNames(styles.labelHarmList, styles.pFontSize)}>
                    {Object.entries(this.state.categoryHarmMatrix.Collection.tags).map((values, i) => (
                      <li className={styles.labelHarmItem}>
                        <span className={styles.labelHarmItemName}>{values[0]}</span>
                        <span className={styles.labelHarmItemCount}>{values[1]}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <h4 className={styles.labelCategory}>
                  <span>Description</span>
                  <span>{this.state.categoryHarmMatrix.Description.count}</span>
                </h4>
                {Object.entries(this.state.categoryHarmMatrix.Description.tags).length > 0 && (
                  <ul className={classNames(styles.labelHarmList, styles.pFontSize)}>
                    {Object.entries(this.state.categoryHarmMatrix.Description.tags).map((values, i) => (
                      <li className={styles.labelHarmItem}>
                        <span className={styles.labelHarmItemName}>{values[0]}</span>
                        <span className={styles.labelHarmItemCount}>{values[1]}</span>
                      </li>
                    ))}
                  </ul>
                )}           
                <h4 className={styles.labelCategory}>
                  <span>Composition</span>
                  <span>{this.state.categoryHarmMatrix.Composition.count}</span>
                </h4>
                {Object.entries(this.state.categoryHarmMatrix.Composition.tags).length > 0 && (
                  <ul className={classNames(styles.labelHarmList, styles.pFontSize)}>
                    {Object.entries(this.state.categoryHarmMatrix.Composition.tags).map((values, i) => (
                      <li className={styles.labelHarmItem}>
                        <span className={styles.labelHarmItemName}>{values[0]}</span>
                        <span className={styles.labelHarmItemCount}>{values[1]}</span>
                      </li>
                    ))}
                  </ul>
                )} 
                <span className={styles.datasetUnderline} />
                <p className={styles.caption}>* Please refer to the Objectives and Alerts section for more details</p>
              </Col>
            </Row>
          </Col>
          <Col md={{ span: 6, offset: 1 }} sm={{ span: 12 }}>
            <Row className={styles.row}>
              <Col md={{ span: 12 }}>
                <h3 className={classNames(styles.sectionTitle, styles.hasSubtitle)}>Use Cases</h3>
                <p className={styles.caption}>Potential real-world applications of the dataset</p>
                {this.props.useCases.map((useCase, i) => (
                  <div className={classNames(styles.useCaseList, styles.pFontSize)}>
                    <p className={styles.useCaseListNumber}>
                      {i + 1}
                    </p>
                    <p md={{ span: 11 }} className={styles.useCaseQuestion}>
                      { useCase }
                    </p>
                  </div>
                ))}
              </Col>
            </Row>
            <div>
              <h3 className={styles.sectionTitle}>Badges</h3>
            </div>
            <Row className={styles.row}>
              <Col md={6} className={styles.badgeRows}>
                {BINARY_BADGE_MAP.map((object, i) => (
                  <img
                    className={styles.badge}
                    src={"/badges/" + object.options[this.props.badges[object.key] - 1] + ".png"}
                    alt={object.alt[this.props.badges[object.key] - 1]}
                  />
                ))}
              </Col>
              <Col md={6} className={styles.badgeRows}>
                {MULTI_BADGE_MAP.map((object, i) => (
                  <img
                    className={styles.badge}
                    src={"/badges/" + object.options[this.props.badges[object.key] - 1] + ".png"}
                    alt={object.alt[this.props.badges[object.key] - 1]}
                  />
                ))}
              </Col>
            </Row>
            <Row>
              <Col xl={{ span: 6 }} md={{ span: 12 }}>
                <div className={styles.alertSection}>
                  <p className={styles.graphHeader}>Alert Count by Category</p>
                  {this.renderAlertsCategory(this.state.byCategory)} 
                </div>
              </Col>
              <Col xl={{ span: 6 }} md={{ span: 12 }}>
                <div className={styles.alertSection}>
                  <p className={styles.graphHeader}>Alert Count by Mitigation Potential</p>
                  {this.renderAlerts(this.state.byMitigation)} 
                </div>
              </Col>
            </Row>
            <Row>
              <Col xl={{ span: 8 }} md={{ span: 12 }}>
                <div className={styles.alertSection}>
                  <p className={styles.graphHeader}>Alert Count by Potential Harm</p>
                  {this.renderAlertsHarm(this.state.byPotentialHarm)} 
                </div>
              </Col>
            </Row>
          </Col>  
        </Row>
      </>
    )
  }
}

Overview.propTypes = {
  summary: PropTypes.object.isRequired,
  // the dataset info section of the blob to pull out purpose questions
  datasetInfoDescription: PropTypes.array.isRequired,
  useCases: PropTypes.array.isRequired,
  badges: PropTypes.object.isRequired,
  // whole use cases section to do alerts data extraction
  objectivesSection: PropTypes.shape({
    alerts: PropTypes.object,
    objectives: PropTypes.object
  }).isRequired
}

export default Overview
