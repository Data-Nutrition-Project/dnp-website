import axios from "axios"
import classNames from "classnames"
import { formatBlobForLabel } from "../../../utils/jsonFormatter.js"
import { Grid } from  'react-loader-spinner'
import Linkify from 'react-linkify';
import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

import AboutAccordion from "../AboutAccordion/index.js"
import Badge from "../Badge/index.js"
import LabelHeader from "../../LabelHeader/index.js"
import RisksAccordion from "../RisksAccordion/index.js"
import UsageAccordion from "../UsageAccordion/index.js"

import * as layout from "../../layout.css"
import * as styles from "./styles.module.css"

import CaretDownIcon from "../../../images/caret-down.inline.svg"
import CaretUpIcon from "../../../images/caret-up.inline.svg"
import DataValuesIcon from "../../../images/data-values.inline.svg"
import FeatureSelectionIcon from "../../../images/feature-selection.inline.svg"
import GeneralRisksIcon from "../../../images/general-risks.inline.svg"
import RepresentationIcon from "../../../images/representation.inline.svg"
import UpstreamSourcesIcon from "../../../images/upstream-sources.inline.svg"

import CautionIcon from "../../../images/caution.inline.svg"
import KnownUseIcon from "../../../images/known-use.inline.svg"
import RiskyIcon from "../../../images/risky.inline.svg"
import SafeIcon from "../../../images/safe.inline.svg"

const LabelWrapper = (props) => {
    const { labelBlob, loading } = props
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
            />
            <div className={styles.label} key={1}>
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
                        </div>
                        <Row className={styles.usageRow}>
                            <div className={classNames(styles.usageDescription, styles.greenBorder)}>
                                <UsageAccordion
                                    header={'Intended Use'}
                                    text={labelBlob.howToUseIt.intended}
                                    icon={SafeIcon}
                                />
                            </div>
                            <div className={classNames(styles.usageDescription, styles.yellowBorder)}>
                                <UsageAccordion
                                    header={'Restrictions on Use'}
                                    text={labelBlob.howToUseIt.restrictions}
                                    icon={CautionIcon}
                                />
                            </div>
                            <div className={classNames(styles.usageDescription, styles.blueBorder)}>
                                <UsageAccordion
                                    header={'Known Uses'}
                                    text={labelBlob.howToUseIt.known}
                                    icon={KnownUseIcon}
                                />
                            </div>
                            <div className={classNames(styles.usageDescription, styles.redBorder)}>
                                <UsageAccordion
                                    header={'Do Not Use'}
                                    text={labelBlob.howToUseIt.doNot}
                                    icon={RiskyIcon}
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
                                    <AboutAccordion
                                        title={item.title}
                                        description={item.description}
                                    />
            
                                ))}
                            </div>
                            <div>
                                <h4>Technical information</h4>
                                {labelBlob.aboutTheDataset.technical.map(item => (
                                    <AboutAccordion
                                        title={item.title}
                                        description={item.description}
                                    />
                                ))}
                            </div>
                            <div>
                                <h4>Useful links</h4>
                                {labelBlob.aboutTheDataset.usefulLinks.map(item => (
                                    <AboutAccordion
                                        title={item.title}
                                        description={item.description}
                                    />
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
                                        <CaretUpIcon />
                                    ) : (
                                        <CaretDownIcon />
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
                            icon={DataValuesIcon}
                        />
                        <RisksAccordion
                            title={'Feature selection'}
                            subtitle={'Which columns were chosen and why?'}
                            risks={labelBlob.inferenceRisks.featureSelection}
                            icon={FeatureSelectionIcon}
                        />
                        <RisksAccordion
                            title={'Representation'}
                            subtitle={'Which rows were included and why?'}
                            risks={labelBlob.inferenceRisks.representation}
                            icon={RepresentationIcon}
                        />
                        <RisksAccordion
                            title={'Upstream sources'}
                            subtitle={'Are there known risks in datasets upstream?'}
                            risks={labelBlob.inferenceRisks.upstream}
                            icon={UpstreamSourcesIcon}
                        />
                        <RisksAccordion
                            title={'General risks'}
                            subtitle={'Any additional risks?'}
                            risks={labelBlob.inferenceRisks.general}
                            icon={GeneralRisksIcon}
                        />
                    </Col>
                </Row>
            </div>
        </div>
    )
}

LabelWrapper.propTypes = {
    labelBlob: PropTypes.object.isRequired,
    loading: PropTypes.bool
}

export default LabelWrapper
