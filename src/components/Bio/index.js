import React from "react"

import classNames from "classnames"
import Col from 'react-bootstrap/Col'
import PropTypes from "prop-types"
import Row from 'react-bootstrap/Row'

import * as styles from "./styles.module.css"

const Bio = props => (
    <Row className={styles.bioRow}>
    {props.alum ? (
        <Col xl={12}>
            <div className={styles.teamDesc}>
                <div className={styles.teamTitle}>
                    <h4 className={styles.teamTitleName}>{props.name}</h4>
                    <span className={styles.teamTitleRole}>{props.role}</span>
                </div>
                <div className={styles.teamContent}>{props.bio}</div>
                {props.socialMedia.map((mediaSource) => (
                    <a
                        href={mediaSource.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={classNames(styles.socialIcon, mediaSource.className)}
                    >
                        <i className={mediaSource.icon}></i>
                    </a>
                ))}
            </div>
        </Col>
    ) : (
        <Row>
            <Col xl={3} lg={3} md={12}>
                <div className={classNames(styles.team, styles.teamList, styles.clearfix)}>
                    <div className={styles.teamImage}>
                        <img
                            className={classNames(styles.teamImageImg, props.imgClassName)}
                            src={props.imgPath}
                            alt={props.imgAlt}
                        />
                    </div>
                </div>
            </Col>
            <Col xl={8} lg={8} md={12} className={styles.teamDescCol}>
                <div className={styles.teamDesc}>
                    <div className={styles.teamTitle}>
                        <h4 className={styles.teamTitleName}>{props.name}</h4>
                        <span className={styles.teamTitleRole}>{props.role}</span>
                    </div>
                    <div className={styles.teamContent}>{props.bio}</div>
                    {props.socialMedia.map((mediaSource) => (
                        <a
                            href={mediaSource.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={classNames(styles.socialIcon, mediaSource.className)}
                        >
                            <i className={mediaSource.icon}></i>
                        </a>
                    ))}
                </div>
            </Col>
        </Row>
    )}
    </Row>
)

Bio.propTypes = {
    alum: PropTypes.bool,
    imgPath: PropTypes.string,
    imgAlt: PropTypes.string,
    imgClassName: PropTypes.string,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    bio: PropTypes.string,
    socialMedia: PropTypes.arrayOf(PropTypes.shape({
        href: PropTypes.string,
        icon: PropTypes.string,
        className: PropTypes.string
    }))
}

Bio.defaultProps = {
    alum: false,
    imgPath: "",
    imgAlt: ""
}

export default Bio
