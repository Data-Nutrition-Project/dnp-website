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

const FAQ_QUESTIONS = [
  {
    'q': 'What is the Dataset Nutrition Label and who created it?',
    'a': 'The Dataset Nutrition Label is a standard quality framework for assessing dataset quality. The Dataset Nutrition Label standard is a project of the Data Nutrition Project, a non-profit group that creates tools and practices around dataset quality that encourage responsible model development.'
  },
  {
    'q': 'What is the purpose of the Dataset Nutrition Label? ',
    'a': 'We believe that algorithm developers want to build responsible and smart statistical models, but that there is a key step missing in the standard way these models are built. This step is to interrogate the dataset for a variety of imbalances or problems it could have and ascertain if it is the right dataset for the model.\n\nSimilar to the FDA’s nutrition label for food, the Dataset Nutrition Label aims to highlight the key ingredients in a dataset in addition to qualitative information that describes the dataset and its composition, collection, and management. The Dataset Nutrition Label also includes Alerts about the dataset that are relevant for particular intended use cases. Data scientists can leverage the Dataset Nutrition Label to make better, informed decisions about which datasets to use for their specific use cases, thus driving better statistical models and artificial intelligence.'
  },
  {
    'q': 'What are Use Cases and how do you determine these?',
    'a': 'The Dataset Nutrition Label highlights business and research questions, or Use Cases, for which the dataset may be relevant. The Use Cases included in our current prototypes were identified by the Data Nutrition Project alongside subject matter experts and the original dataset owners.'
  },
  {
    'q': 'If I want to investigate a Use Case not included in the list on the Dataset Nutrition Label, what does this mean?',
    'a': 'The Data Nutrition Project team worked closely with subject matter experts and dataset owners to identify the most relevant or common Use Cases for each dataset. The Use Cases are not meant to be exhaustive, but rather indicative of the most common known or intended Use Cases for the data. If a Use Case is not included, this may indicate that using the dataset to answer that particular business question is akin to "off-label" usage.'
  },
  {
    'q': 'What is a Prediction?',
    'a': 'On the Dataset Nutrition Label, a Prediction indicates the statistical approach taken to address the Use Case. For example, if a COVID dataset could be leveraged to train a statistical model to answer the Use Case, ‘What is the prevalence of COVID in a specific geography?’, there are a number of possible Predictions on which to optimize the model including: "Current Prevalence", "Current R0", "Infections in the region", among others.'
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
    'a': 'There are two types of Alerts: FYI-only, which are generally auto-generated from answers to questions in the Dataset Info section, and Alerts with various mitigation strategies that are tied to specific Predictions. The creator of the Dataset Nutrition Label is responsible for identifying and documenting Alerts, Predictions, and Use Cases. For the prototype Labels, the Data Nutrition Project worked with the dataset owners to create this information.'
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
  const [toggleStatus, setToggleStatus] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ])

  const toggleCaret = (key) => {
    toggleStatus[key] = (!toggleStatus[key])
    setToggleStatus(toggleStatus)
  }

  return (
    <Layout>
      <Container className={styles.labelLanding}>
        <Row className={styles.titleSection}>
          <Col md={12}>
            <h1>The Dataset Nutrition Label's Label</h1>
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
              <li><Link to="/labels/covid-tracking">Covid Tracking Project</Link></li>
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
              {FAQ_QUESTIONS.map((qa, i) => (
                <Card className={styles.card} key={i}>
                  <Accordion.Toggle
                    as={Card.Header}
                    eventKey={i.toString()}
                    className={styles.cardHeader}
                    onClick={() => {
                      toggleStatus[i] = (!toggleStatus[i])
                      setToggleStatus([...toggleStatus])
                    }}
                  >
                    {qa.q}
                    <span className={styles.moreButton}>
                      {toggleStatus[i] ? (
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
            </Accordion>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default LabelIndexPage
