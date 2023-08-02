import classNames from "classnames"
import Linkify from 'react-linkify'
import React, { useState } from "react"
import PropTypes from "prop-types"

import * as styles from "./styles.module.css"

import CaretDownIcon from "../../../images/caret-down.inline.svg"
import CaretUpIcon from "../../../images/caret-up.inline.svg"

const PREVIEW_LENGTH = 30;

const AboutAccordion = props => {
    const [isOpen, setIsOpen] = useState(false)
    const toggleOpen = () => {
        setIsOpen(!isOpen)
    }

    let needsAccordion = false;
    if (props.description.length > PREVIEW_LENGTH) {
        needsAccordion = true;
    }

    return (
        <div className={styles.aboutSection}>
            <div className={styles.aboutTitle}>
                <p className={styles.aboutTitleText}>
                    {props.title}
                </p>
                {needsAccordion ? (
                    <>
                    {isOpen ? (
                        <span
                            className={styles.accordionCaret}
                            onClick={toggleOpen}
                            onKeyPress={toggleOpen}
                            role="button"
                            tabIndex={0}
                        >
                            <CaretUpIcon />
                        </span>
                    ) : (
                        <span
                            className={styles.accordionCaret}
                            onClick={toggleOpen}
                            onKeyPress={toggleOpen}
                            role="button"
                            tabIndex={0}
                        >
                            <span className={styles.aboutSubtitle}>
                                {props.description.slice(0,PREVIEW_LENGTH).concat('...')}
                            </span>
                            <CaretDownIcon />
                        </span>
                    )}
                    </>
                ) : (
                    <p className={styles.aboutSubtitle}>
                        <Linkify>{props.description}</Linkify>
                    </p>
                )}
            </div>
            {(isOpen && needsAccordion) && (
                <p className={styles.aboutDescription}>
                    <Linkify>{props.description}</Linkify>
                </p>
            )}
        </div>
    )
}

AboutAccordion.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
}

export default AboutAccordion
