import React from "react"

import classNames from "classnames"
import Col from 'react-bootstrap/Col'
import PropTypes from "prop-types"

import styles from "./styles.module.css"

const Bio = props => (
    <Col md={{ span: 6 }} className={styles.bottomMargin}>
        <div className={classNames(styles.team, styles.teamList, styles.clearfix, { [styles.modAlum]: props.alum })}>
            <div className={styles.teamImage}>
                <img
                    className={styles.teamImageImg}
                    src={props.imgPath}
                    alt={props.imgAlt}
                />
            </div>
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
        </div>
    </Col>
)

Bio.propTypes = {
    alum: PropTypes.bool,
    imgPath: PropTypes.string.isRequired,
    imgAlt: PropTypes.string.isRequired,
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
    alum: false
}

export default Bio
