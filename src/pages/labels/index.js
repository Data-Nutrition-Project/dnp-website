import React, { useState } from "react"
import { Link } from "gatsby"

import Accordion from "react-bootstrap/Accordion"
import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import ReactMarkdown from "react-markdown"

import Layout from "../../components/layout"

import styles from "./index.module.css"

const FAQ_QUESTIONS_1 = [
  {
    'q': 'What is the Dataset Nutrition Label and who created it?',
    'a': 'The Dataset Nutrition Label is a standard quality framework for assessing dataset quality. The Dataset Nutrition Label standard is a project of the Data Nutrition Project, a non-profit group that creates tools and practices around dataset quality that encourage responsible model development.'
  },
  {
    'q': 'What is the purpose of the Dataset Nutrition Label? ',
    'a': 'We believe that algorithm developers want to build responsible and smart statistical models, but that there is a key step missing in the standard way these models are built. This step is to interrogate the dataset for a variety of imbalances or problems it could have and ascertain if it is the right dataset for the model.\n\nSimilar to the FDA’s nutrition label for food, the Dataset Nutrition Label aims to highlight the key ingredients in a dataset in addition to qualitative information that describes the dataset and its composition, collection, and management. The Dataset Nutrition Label also includes Alerts about the dataset that are relevant for particular intended modeling objectives. Data scientists can leverage the Dataset Nutrition Label to make better, informed decisions about which datasets to use for their specific use cases, thus driving better statistical models and artificial intelligence.'
  },
  {
    'q': 'What are Use Cases and how do you determine these?',
    'a': 'The Dataset Nutrition Label highlights business and research questions, or Use Cases, for which the dataset may be relevant. The Use Cases included in our current prototypes were identified by the Data Nutrition Project alongside subject matter experts and the original dataset owners.'
  }
]

const FAQ_QUESTIONS_2 = [
  {
    'q': 'What is a Modeling Objective?',
    'a': 'On the Dataset Nutrition Label, a Modeling Objective indicates statistical approach that the data can be leveraged to address. For example, the [ISIC 2018 dataset](/labels/isic-2018) could be leveraged to train a statistical model to answer the Modeling Objective, ‘Identify diagnosis in lesion images’.'
  },
  {
    'q': 'If I want to investigate a Use Case or Modeling Objective not included in the list on the Dataset Nutrition Label, what does this mean?',
    'a': 'The Data Nutrition Project team worked closely with subject matter experts and dataset owners to identify the most relevant or common Use Cases and Modeling Objectives for each dataset. These are not meant to be exhaustive, but rather indicative of the most common known or intended uses for the data. We recommend that data practitioners consult with subject matter experts to investigate the best way to approach Use Cases and Objectives not included on the Label.'
  },
  {
    'q': 'What is an Alert?',
    'a': 'Alerts are dataset notifications that Label users may wish to take into account when they are using the dataset (or deciding whether to use the dataset). These highlight issues, restrictions, and other relevant information about the data that might not be obvious to someone unfamiliar with the dataset.'
  },
  {
    'q': 'What determines the color of an Alert?',
    'a': 'Each Alert is presented on a color scale to indicate whether there is a known and accessible method to mitigate the content of the Alert. For example, missing data cannot be mitigated (no known mitigation - red), but usage restrictions can be mitigated by following the rules of the license (mitigation known - yellow).'
  },
  {
    'q': 'Who created the Alerts and how were they created?',
    'a': 'There are two types of Alerts: FYI-only, which are generally auto-generated from answers to questions in the Dataset Info section, and Alerts with various mitigation strategies that are tied to specific Predictions. The creator of the Dataset Nutrition Label is responsible for identifying and documenting Alerts, Modeling Objectives, and Use Cases. For the prototype Labels, the Data Nutrition Project worked with the dataset owners to create this information.'
  },
  {
    'q': 'If there are Alerts on a Dataset Nutrition Label, does that mean I should not use the dataset?',
    'a': 'No. There’s no such thing as a perfect dataset! The purpose of the Alerts is to drive awareness of known issues so that data practitioners can address these issues as they see fit. Our hope is that users of the Label will leverage these Alerts to compare datasets in similar domains, make informed decisions about which dataset to use for which purpose, and help drive mitigation strategies to limit the harm of known issues on model quality and output.'
  },
  {
    'q': 'What does the ‘Potentials for Harm’ information mean?',
    'a': 'There are many types of Alerts. Some may be general (e.g. license information), while others are specific to particular communities of people (e.g. individual-level data including gender or race information). In the latter case, we leverage the terminology "Potentials for Harm" to categorize which communities or domains are particularly relevant for the Alert content. We hope that practitioners will pay special attention to these particular indicators when they are building statistical models that affect people. '
  },
  {
    'q': 'What is the purpose of the Dataset Info section? Why these particular questions?',
    'a': 'You can think of the Dataset Info section as the "ingredients" of the dataset. We believe this information can help data practitioners determine whether to leverage the dataset for a particular use case, and if so, how to use it (and ways it should not be used). The information is organized in several categories: *Description*, *Composition*, *Provenance*, *Collection*, and *Management*. The questions are drawn from the insightful work of many teams, most centrally [Datasheets for Datasets](https://arxiv.org/abs/1803.09010). We also drew from work published by [AI Global](https://ai-global.org/), [data.world](http://data.world), and [DrivenData](https://deon.drivendata.org/), and received feedback from colleagues at the Department of Education, AI Global, and Memorial Sloan Kettering.'
  },
  {
    'q': 'How can others create their own Labels?',
    'a': 'The Data Nutrition Project is working on building tools that will facilitate the process of creating a Label. In the meantime, we encourage you to read our paper about the methodology (so you can create your own or something similar!), or get in touch to talk about a possible collaboration.'
  },
  {
    'q': 'I have more questions, how can I get in touch?',
    'a': 'Please don’t be shy! You can contact us at <info@datanutrition.org>.'
  }
]

const LabelIndexPage = props => {
  const [toggleStatus, setToggleStatus] = useState([-1, false])

  const toggleCaret = (key) => {
    if (key === toggleStatus[0]) {
      setToggleStatus([key, !toggleStatus[1]])
    } else {
      setToggleStatus([key, true])
    }
  }

  return (
    <Layout>
      <Container className={styles.labelLanding}>
        <Row className={styles.titleSection}>
          <Col md={12}>
            <h1>The Dataset Nutrition Label</h1>
            <h4 className={styles.titleSectionSubtitle}>
              Information on the purpose and functionality of the label
            </h4>
          </Col>
        </Row>
        <Row className={styles.descriptionSection}>
          <Col md={12}>
            <h5 className={styles.subSectionHeader}>Label Overview</h5>
            <p>
              The Dataset Nutrition Label enhances context, contents, and legibility of 
              datasets. Drawing from the analogy of the Nutrition Facts Label on food, 
              the Label highlights the ‘ingredients’ of a dataset to help shed light on 
              whether the dataset is healthy for a particular statistical use case. 
              The goal of the Label is to mitigate harms caused by statistical systems 
              (automated decision-making systems, artificial intelligence, advanced analytics) 
              by providing at-a-glance information about the dataset that is mapped to 
              a set of common use cases. 
            </p>
            <p>
              The Dataset Nutrition Label is intended to be leveraged by both dataset 
              owners and data practitioners to inform conversations about dataset quality. 
              For dataset owners, the Label provides standardized scaffolding in the 
              form of questions and processes to surface relevant information about a 
              dataset, particularly information about intended use or potential use. For 
              data practitioners, the Label acts as a framework that brings transparency 
              to a dataset along several axes, ultimately supporting the decision-making 
              process about whether to use a dataset and for what use. By bringing further 
              transparency to the dataset publishing and selection processes, we hope to 
              enable more intentional dataset usage, thus driving higher quality models.
            </p>
            <h5 className={styles.subSectionHeader}>Label Links</h5>
            <p>
              In late 2020, the Data Nutrition Project team published our most recent 
              methodology alongside a set of Label prototypes built in collaboration 
              with both dataset owners and subject matter experts:
            </p>
            <ul>
              <li><Link to="/labels/isic-2020">2020 SIIM-ISIC Melanoma Classification Challenge Dataset</Link></li>
              <li><Link to="/labels/isic-2018">2018 SIIM-ISIC Melanoma Classification Challenge Dataset</Link></li>
              <li><Link to="/labels/taxbills-nyc">taxbills.nyc Dataset</Link></li>
              <li><Link to="/labels/nopv-nyc">NYC's NoPV Dataset</Link></li>
            </ul>
          </Col>
        </Row>
        <span className={styles.datasetUnderline} />
        <Row className={styles.faqSection}>
          <Col md={12}>
            <h3 className={styles.subSectionHeader}>Frequently Asked Questions</h3>
            <Accordion>
              {FAQ_QUESTIONS_1.map((qa, i) => (
                <Card className={styles.card} key={i}>
                  <Accordion.Toggle
                    as={Card.Header}
                    eventKey={i.toString()}
                    className={styles.cardHeader}
                    onClick={() => {
                      toggleCaret(i)
                    }}
                  >
                    {qa.q}
                    <span className={styles.moreButton}>
                      {toggleStatus[0] === i && toggleStatus[1] ? (
                        <FontAwesomeIcon icon={faAngleDown} />
                      ) : (
                        <FontAwesomeIcon icon={faAngleRight} />
                      )}
                    </span>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={i.toString()}>
                    <Card.Body>
                      <ReactMarkdown source={qa.a} />
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              ))}
              <Card className={styles.card} key={3}>
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey={'3'}
                  className={styles.cardHeader}
                  onClick={() => {
                    toggleCaret(3)
                  }}
                >
                  On the Overview page, what do the badges stand for and how are they determined?
                  <span className={styles.moreButton}>
                    {toggleStatus[0] === 3 && toggleStatus[1] ? (
                      <FontAwesomeIcon icon={faAngleDown} />
                    ) : (
                      <FontAwesomeIcon icon={faAngleRight} />
                    )}
                  </span>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={'3'}>
                  <Card.Body className={styles.cardBody}>
                    <div>
                      <p>
                        The overview badges highlight a standard set of critical information about every dataset in a way that is immediately relevant and comprehensible. These icons indicate a short-hand way of highlighting binary and non-binary answers covered more deeply in the Dataset Info pane.
                      </p>
                      <p>The badges include:</p>
                      <ul className={styles.badgeQ}>
                        <li>
                          <Col md={4} sm={12}>1. Quality Review (Yes, No)</Col>
                          <Col md={9} sm={12} className={styles.badgeRow}>
                            <img
                                className={styles.badgeImg}
                                src={require("../../../static/badges/quality-review-y.png")}
                                alt="quality review yes badge"
                            />
                            <img
                                className={styles.badgeImg}
                                src={require("../../../static/badges/quality-review-n.png")}
                                alt="quality review no badge"
                            />
                          </Col>
                        </li>
                        <li>
                          <Col md={4} sm={12}>2. Individual Level Data (Yes, No)</Col>
                          <Col md={6} sm={12} className={styles.badgeRow}>
                            <img
                                className={styles.badgeImg}
                                src={require("../../../static/badges/individual-data-y.png")}
                                alt="individual level data yes badge"
                            />
                            <img
                                className={styles.badgeImg}
                                src={require("../../../static/badges/individual-data-n.png")}
                                alt="individual level data no badge"
                            />
                          </Col>
                        </li>
                        <li>
                          <Col md={4} sm={12}>3. Ethical Review (Yes, No)</Col>
                          <Col md={6} sm={12} className={styles.badgeRow}>
                            <img
                                className={styles.badgeImg}
                                src={require("../../../static/badges/ethical-review-y.png")}
                                alt="ethical review yes badge"
                            />
                            <img
                                className={styles.badgeImg}
                                src={require("../../../static/badges/ethical-review-n.png")}
                                alt="ethical review no badge"
                            />
                          </Col>
                        </li>
                        <li>
                          <Col md={4} sm={12}>4. Information about People (Yes, No)</Col>
                          <Col md={6} sm={12} className={styles.badgeRow}>
                            <img
                                className={styles.badgeImg}
                                src={require("../../../static/badges/about-humans-y.png")}
                                alt="about humans yes badge"
                            />
                            <img
                                className={styles.badgeImg}
                                src={require("../../../static/badges/about-humans-n.png")}
                                alt="about humans no badge"
                            />
                          </Col>
                        </li>
                        <li>
                          <Col md={4} sm={12}>5. Information about Subpopulations (Yes, No)</Col>
                          <Col md={6} sm={12} className={styles.badgeRow}>
                            <img
                                className={styles.badgeImg}
                                src={require("../../../static/badges/subpopulations-y.png")}
                                alt="info about subpopulations yes badge"
                            />
                            <img
                                className={styles.badgeImg}
                                src={require("../../../static/badges/subpopulations-n.png")}
                                alt="info about subpopulations no badge"
                            />
                          </Col>
                        </li>
                        <li>
                          <Col md={4} sm={12}>6. License (Commercial, Non-Commercial)</Col>
                          <Col md={6} sm={12} className={styles.badgeRow}>
                            <img
                                className={styles.badgeImg}
                                src={require("../../../static/badges/data-license-c.png")}
                                alt="license commercial badge"
                            />
                            <img
                                className={styles.badgeImg}
                                src={require("../../../static/badges/data-license-nc.png")}
                                alt="license non-commercial badge"
                            />
                          </Col>
                        </li>
                        <li>
                          <Col md={4} sm={12}>7. Funding Source (Single-source not for profit, Single-source for profit, Government, Multi-Source)</Col>
                          <Col md={6} sm={12} className={styles.badgeRow}>
                            <img
                                className={styles.badgeImg}
                                src={require("../../../static/badges/funding-nfp.png")}
                                alt="funding source not for profit"
                            />
                            <img
                                className={styles.badgeImg}
                                src={require("../../../static/badges/funding-fp.png")}
                                alt="funding source for profit"
                            />
                            <img
                                className={styles.badgeImg}
                                src={require("../../../static/badges/funding-g.png")}
                                alt="funding source government"
                            />
                            <img
                                className={styles.badgeImg}
                                src={require("../../../static/badges/funding-ms.png")}
                                alt="funding source multi-sourced"
                            />
                          </Col>
                        </li>
                        <li>
                          <Col md={4} sm={12}>8. Update Frequency (Daily, Weekly, Annually, Static)</Col>
                          <Col md={6} sm={12} className={styles.badgeRow}>
                            <img
                                className={styles.badgeImg}
                                src={require("../../../static/badges/updates-d.png")}
                                alt="updated daily badge"
                            />
                            <img
                                className={styles.badgeImg}
                                src={require("../../../static/badges/updates-w.png")}
                                alt="updated weekly badge"
                            />
                            <img
                                className={styles.badgeImg}
                                src={require("../../../static/badges/updates-a.png")}
                                alt="updated yearly badge"
                            />
                            <img
                                className={styles.badgeImg}
                                src={require("../../../static/badges/updates-na.png")}
                                alt="not updated/static badge"
                            />
                          </Col>
                        </li>
                        <li>
                          <Col md={4} sm={12}>9. Data Source (Single Source, Multi Source)</Col>
                          <Col md={6} sm={12} className={styles.badgeRow}>
                            <img
                                className={styles.badgeImg}
                                src={require("../../../static/badges/source-ss.png")}
                                alt="single source data badge"
                            />
                            <img
                                className={styles.badgeImg}
                                src={require("../../../static/badges/source-ms.png")}
                                alt="multi-source data badge"
                            />
                          </Col>
                        </li>
                      </ul>
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              {FAQ_QUESTIONS_2.map((qa, i) => (
                <Card className={styles.card} key={i+4}>
                  <Accordion.Toggle
                    as={Card.Header}
                    eventKey={(i+4).toString()}
                    className={styles.cardHeader}
                    onClick={() => {
                      toggleCaret((i+4))
                    }}
                  >
                    {qa.q}
                    <span className={styles.moreButton}>
                      {toggleStatus[0] === (i+4) && toggleStatus[1] ? (
                        <FontAwesomeIcon icon={faAngleDown} />
                      ) : (
                        <FontAwesomeIcon icon={faAngleRight} />
                      )}
                    </span>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={(i+4).toString()}>
                    <Card.Body>
                      <ReactMarkdown source={qa.a} />
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              ))}
            </Accordion>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default LabelIndexPage
