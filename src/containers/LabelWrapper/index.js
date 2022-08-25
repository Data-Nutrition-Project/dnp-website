import axios from "axios"
import classNames from "classnames"
import { formatBlobForLabel } from "../../utils/jsonFormatter.js"
import { Grid } from  'react-loader-spinner'
import Linkify from 'react-linkify';
import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

import RisksAccordion from "../../components/v3/RisksAccordion/index.js"
import UsageAccordion from "../../components/v3/UsageAccordion/index.js"

import * as layout from "../../components/layout.css"
import * as styles from "./styles.module.css"

const LabelWrapper = (props) => {
    const [labelBlob, setLabelBlob] = useState(null)
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const getLabelBlob = () => {
        axios
            .get(`${process.env.BACKEND_URL}/label?id=${props.labelId}`)
            .then((response) => {
                setLabelBlob(formatBlobForLabel(response.data.questionnaire))
            })
            .catch((err) => {
                setError(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }
    
    useEffect(() => {
        getLabelBlob()
    }, [])

    const handleErrorMessage = (status) => {
        switch (status) {
            case 404:
                return 'We could not find the label requested.'
                break
            case 403:
                return 'That label is not ready yet.'
                break
            case 500:
                return 'There is an issue with our servers, we will check on that.'
                break
        }
    }
    
    return (
        <div className={styles.label}>
        {loading ? (
            <Row>
                <Grid
                    height="80"
                    width="80"
                    color={layout.darkSlateBlue}
                    ariaLabel="grid-loading"
                    radius="12.5"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </Row>
        ) : error !== null ? (
            <Row>
                <h1>{'Sorry, something went wrong!'}</h1>
            </Row>
        ) : (
            <div>
                <Row>
                    <h1>{labelBlob.title}</h1>
                    <div></div>
                </Row>
                <Row className={styles.labelRow}>
                    <Col md={4}>
                        <div className={styles.labelSectionHeader}>
                            <h2 className={styles.labelSectionHeaderText}>Description</h2>
                        </div>
                        <div>
                            <p>{labelBlob.description.about}</p>
                            <h3>Keywords</h3>
                            <div className={styles.keywordList}>
                            {(labelBlob.description.keywordList).map(keyword => (
                                <div className={styles.keywordListItem}>{keyword}</div>
                            ))}
                            </div>
                        </div>
                    </Col>
                    <Col md={8}>
                        <div className={classNames(styles.labelSectionHeader, styles.modHowToUse)}>
                            <h2 className={styles.labelSectionHeaderText}>How to use it?</h2>
                            <div className={styles.usageDescriptionLabels}>
                                <div className={styles.usageDescriptionLabelsItem}>
                                    <img
                                        className={styles.usageLabelIcon}
                                        src={require('../../images/safe.png').default}
                                        alt={'Icon safe'}
                                    />
                                    <span className={classNames(styles.usageLabelColor, styles.green)}></span>
                                    <span className={styles.usageLabelText}>Safe</span>
                                </div>
                                <div className={styles.usageDescriptionLabelsItem}>
                                    <img
                                        className={styles.usageLabelIcon}
                                        src={require('../../images/caution.png').default}
                                        alt={'Icon caution'}
                                    />
                                    <span className={classNames(styles.usageLabelColor, styles.yellow)}></span>
                                    <span className={styles.usageLabelText}>Caution</span>
                                </div>
                                <div className={styles.usageDescriptionLabelsItem}>
                                    <img
                                        className={styles.usageLabelIcon}
                                        src={require('../../images/risky.png').default}
                                        alt={'Icon Risk'}
                                    />
                                    <span className={classNames(styles.usageLabelColor, styles.red)}></span>
                                    <span className={styles.usageLabelText}>Risky</span>
                                </div>
                            </div>
                        </div>
                        <Row className={styles.usageRow}>
                            <div className={classNames(styles.usageDescription, styles.greenBorder)}>
                                <UsageAccordion
                                    header={'Intended Use'}
                                    text={labelBlob.howToUseIt.intended}
                                    icon={require('../../images/safe.png').default}
                                />
                            </div>
                            <div className={classNames(styles.usageDescription, styles.yellowBorder)}>
                                <UsageAccordion
                                    header={'Restrictions on Use'}
                                    text={labelBlob.howToUseIt.restrictions}
                                    icon={require('../../images/caution.png').default}
                                />
                            </div>
                            <div className={classNames(styles.usageDescription, styles.blueBorder)}>
                                <UsageAccordion
                                    header={'Known Uses'}
                                    text={labelBlob.howToUseIt.known}
                                    icon={require('../../images/known-use.png').default}
                                />
                            </div>
                            <div className={classNames(styles.usageDescription, styles.redBorder)}>
                                <UsageAccordion
                                    header={'Do Not Use'}
                                    text={labelBlob.howToUseIt.doNot}
                                    icon={require('../../images/risky.png').default}
                                />
                            </div>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Linkify>
                            <div className={styles.labelSectionHeader}>
                                <h2 className={styles.labelSectionHeaderText}>About the dataset</h2>
                            </div>
                            <div>
                                <h4>People</h4>
                                {labelBlob.aboutTheDataset.people.map(item => (
                                    <div className={styles.aboutRow}>
                                        <p className={styles.aboutRowTitle}>{item.title}</p>
                                        <p className={styles.aboutRowContent}>{item.description}</p>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <h4>Technical information</h4>
                                {labelBlob.aboutTheDataset.technical.map(item => (
                                    <div className={styles.aboutRow}>
                                        <p className={styles.aboutRowTitle}>{item.title}</p>
                                        <p className={styles.aboutRowContent}>{item.description}</p>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <h4>Useful links</h4>
                                {labelBlob.aboutTheDataset.usefulLinks.map(item => (
                                    <div className={styles.aboutRow}>
                                        <p className={styles.aboutRowTitle}>{item.title}</p>
                                        <p className={styles.aboutRowContent}>{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </Linkify>
                    </Col>
                    <Col md={8}>
                        <div className={styles.labelSectionHeader}>
                            <h2 className={styles.labelSectionHeaderText}>Inference risks</h2>
                        </div>
                        <div className={styles.risksAtAGlance}>
                        </div>
                        <RisksAccordion
                            title={'Data values'}
                            subtitle={'What values are in each column?'}
                            risks={labelBlob.inferenceRisks.dataValues}
                            icon={require('../../images/data-values.png').default}
                        />
                        <RisksAccordion
                            title={'Feature selection'}
                            subtitle={'Which columns were chosen and why?'}
                            risks={labelBlob.inferenceRisks.featureSelection}
                            icon={require('../../images/feature-selection.png').default}
                        />
                        <RisksAccordion
                            title={'Representation'}
                            subtitle={'Which rows were included and why?'}
                            risks={labelBlob.inferenceRisks.representation}
                            icon={require('../../images/representation.png').default}
                        />
                        <RisksAccordion
                            title={'Upstream sources'}
                            subtitle={'Are there known risks in datasets upstream?'}
                            risks={labelBlob.inferenceRisks.upstream}
                            icon={require('../../images/upstream-sources.png').default}
                        />
                        <RisksAccordion
                            title={'General risks'}
                            subtitle={'Any additional risks?'}
                            risks={labelBlob.inferenceRisks.general}
                            icon={require('../../images/general-risks.png').default}
                        />
                    </Col>
                </Row>
            </div>
        )}
        </div>    
    )
}

LabelWrapper.propTypes = {
    labelId: PropTypes.string.isRequired
}

export default LabelWrapper
