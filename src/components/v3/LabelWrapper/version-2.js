import axios from "axios"
import classNames from "classnames"
import { formatBlobForLabel } from "../../../utils/jsonFormatter.js"
import { Grid } from  'react-loader-spinner'
import Linkify from 'react-linkify';
import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

import AuthorAccordion from "../AuthorAccordion/index.js"
import Badge from "../Badge/index.js"
import LabelHeader from "../../LabelHeader/index.js"
import RisksAccordion from "../RisksAccordion/index.js"
import UsageAccordion from "../UsageAccordion/index.js"

import * as layout from "../../layout.css"
import * as styles from "./styles.module.css"

const STATUS_ENUM = {
    IN_PROGRESS: "IN PROGRESS",
    APPROVED: "APPROVED",
    IN_REVIEW: "IN REVIEW",
    CHANGES_REQUESTED: "CHANGES REQUESTED"
}

const LabelWrapper = (props) => {
    const { labelBlob, loading, status } = props
    const [glanceOpen, setGlanceOpen] = useState(false)

    const toggleGlanceOpen = () => {
        setGlanceOpen(!glanceOpen)
    }
    
    return (
        <div>
            <LabelHeader
                key={0}
                loading={loading}
                percentage={labelBlob.metadata.percentage}
                labelAuthor={labelBlob.metadata.labelAuthor}
                relationship={labelBlob.metadata.relationship}
                labelPublishDate={labelBlob.metadata.labelPublishDate}
                consulted={labelBlob.metadata.consulted}
                labelVersion={labelBlob.metadata.labelVersion}
            >
            {(status !== STATUS_ENUM.APPROVED) && (
                <div className={styles.draftHeader}>
                    <div className={styles.draftHeaderTitle}>
                        <img
                            className={styles.watermarkIcon}
                            src={require('../../../images/draft-icon.png').default}
                            alt="alert_icon"
                        />
                        <p className={styles.draftHeaderTitleText}>This label is a draft</p>
                    </div>
                    <p>The below is not a final, just a preview</p>
                </div>
            )}
            // {status === STATUS_ENUM.IN_REVIEW && (
            //     <div className={styles.underReviewHeader}>
            //         <div className={styles.underReviewHeaderTitle}>
            //             <img
            //                 className={styles.watermarkIcon}
            //                 src={require('../../../images/under-review-icon.png').default}
            //                 alt="alert_icon"
            //             />
            //             <p className={styles.underReviewHeaderTitleText}>This label is under review</p>
            //         </div>
            //         <p>The content of this label may change based on input from others.</p>
            //     </div>
            // )}
            </LabelHeader>
            <div 
                className={classNames(
                    styles.label,
                    {[styles.draftWatermark]: (status === STATUS_ENUM.IN_PROGRESS || status === STATUS_ENUM.CHANGES_REQUESTED)},
                    {[styles.reviewWatermark]: (status === STATUS_ENUM.IN_REVIEW)}
                )} 
                key={1}
            >
                {(status === STATUS_ENUM.IN_PROGRESS || status === STATUS_ENUM.CHANGES_REQUESTED) && (
                    <div className={styles.watermarkInner}>
                        <div className={styles.watermarkBody}>DRAFT</div>
                    </div>
                )}
                {status === STATUS_ENUM.IN_REVIEW && (
                    <div className={styles.watermarkInner}>
                        <div className={styles.watermarkBody}>UNDER REVIEW</div>
                    </div>
                )}
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
                            {(labelBlob.description.keywordList).map(keywordObj => (
                                <div className={styles.keywordListItem}>{keywordObj.Keyword.answer}</div>
                            ))}
                            </div>
                        </div>
                    </Col>
                    <Col md={8}>
                        <div className={classNames(styles.labelSectionHeader, styles.modHowToUse)}>
                            <h2 className={styles.labelSectionHeaderText}>How to use it?</h2>
                        </div>
                        <Row className={styles.usageRow}>
                            <div className={classNames(styles.usageDescription, styles.greenBorder)}>
                                <UsageAccordion
                                    header={'Intended Use'}
                                    text={labelBlob.howToUseIt.intended}
                                    icon={require('../../../images/safe.png').default}
                                />
                            </div>
                            <div className={classNames(styles.usageDescription, styles.yellowBorder)}>
                                <UsageAccordion
                                    header={'Restrictions on Use'}
                                    text={labelBlob.howToUseIt.restrictions}
                                    icon={require('../../../images/caution.png').default}
                                />
                            </div>
                            <div className={classNames(styles.usageDescription, styles.blueBorder)}>
                                <UsageAccordion
                                    header={'Known Uses'}
                                    text={labelBlob.howToUseIt.known}
                                    icon={require('../../../images/known-use.png').default}
                                />
                            </div>
                            <div className={classNames(styles.usageDescription, styles.redBorder)}>
                                <UsageAccordion
                                    header={'Do Not Use'}
                                    text={labelBlob.howToUseIt.doNot}
                                    icon={require('../../../images/risky.png').default}
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
                                    <AuthorAccordion
                                        title={item.title}
                                        answer={item.description}
                                    />
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
                            <div className={styles.atAGlanceHeader}>
                                <h3>{'At a Glance'}</h3>
                                <span
                                    className={styles.accordionCaret}
                                    onClick={toggleGlanceOpen}
                                    onKeyPress={toggleGlanceOpen}
                                    role="button"
                                    tabIndex={0}
                                >
                                    {glanceOpen ? (
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
                            <div className={styles.atAGlanceBadgeRow}>
                            {labelBlob.inferenceRisks.glance.map((badgeInfo, i) => {
                                return (
                                    <Badge
                                        className={styles.badgeColumn}
                                        title={badgeInfo.title}
                                        badgeAnswer={badgeInfo.badge}
                                        description={badgeInfo.description}
                                        reference={badgeInfo.reference}
                                        badgeIcon={require(`../../../images/${badgeInfo.reference}.png`).default}
                                        isOpen={glanceOpen}
                                    />
                                )
                            })}
                            </div>
                        </div>
                        <RisksAccordion
                            title={'Data values'}
                            subtitle={'What values are in each column?'}
                            risks={labelBlob.inferenceRisks.dataValues}
                            icon={require('../../../images/data-values.png').default}
                        />
                        <RisksAccordion
                            title={'Feature selection'}
                            subtitle={'Which columns were chosen and why?'}
                            risks={labelBlob.inferenceRisks.featureSelection}
                            icon={require('../../../images/feature-selection.png').default}
                        />
                        <RisksAccordion
                            title={'Representation'}
                            subtitle={'Which rows were included and why?'}
                            risks={labelBlob.inferenceRisks.representation}
                            icon={require('../../../images/representation.png').default}
                        />
                        <RisksAccordion
                            title={'Upstream sources'}
                            subtitle={'Are there known risks in datasets upstream?'}
                            risks={labelBlob.inferenceRisks.upstream}
                            icon={require('../../../images/upstream-sources.png').default}
                        />
                        <RisksAccordion
                            title={'General risks'}
                            subtitle={'Any additional risks?'}
                            risks={labelBlob.inferenceRisks.general}
                            icon={require('../../../images/general-risks.png').default}
                        />
                    </Col>
                </Row>
            </div>
        </div>
    )
}

LabelWrapper.propTypes = {
    labelBlob: PropTypes.object.isRequired,
    loading: PropTypes.bool,
    status: PropTypes.string.isRequired
}

export default LabelWrapper
