import classNames from "classnames"
import Linkify from 'react-linkify'
import React, { useState } from "react"
import PropTypes from "prop-types"

import * as styles from "./styles.module.css"

import CaretDownIcon from "../../../images/caret-down.inline.svg"
import CaretUpIcon from "../../../images/caret-up.inline.svg"

const UsageAccordion = props => {
    const [isReadMore, setIsReadMore] = useState(true)
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore)
    }

    let sampleText = ''
    if (props.text.length > 0) {
        if (props.text[0].title.length > 0) {
            sampleText = `${props.text[0].title}. ${props.text[0].description.slice(0, 100)}`
        } else {
            sampleText = props.text[0].description.slice(0, 100)
        }
    }

    return (
        <div className={classNames(styles.usageInfo, props.className)}>
            <div className={styles.usageInfoHeader}>
                <div className={styles.usageHeaderTitle}>
                    <props.icon
                        style={{
                            'margin-right': '8px',
                        }}
                    />
                    <h3>{props.header}</h3>
                </div>
                <span
                    className={styles.accordionCaret}
                    onClick={toggleReadMore}
                    onKeyPress={toggleReadMore}
                    role="button"
                    tabIndex={0}
                >
                    {isReadMore ? (
                        <CaretDownIcon />
                    ) : (
                        <CaretUpIcon />
                    )}
                </span>
            </div>
            {sampleText.length > 0 ? (
                <>
                {isReadMore ? (
                    <p className={styles.readMoreSection}>
                        {sampleText}
                        <span
                            className={styles.readMore}
                            onClick={toggleReadMore}
                            onKeyPress={toggleReadMore}
                            role="button"
                            tabIndex={0}
                        >
                            {'...read more'}
                        </span>
                    </p>
                ) : (
                    <ul>
                    {props.text.map(item => (
                        <li className={styles.usageItem}>
                            <Linkify>
                                {item.title.length > 0 &&
                                    <b>
                                        {`${item.title}. `}
                                    </b>
                                }
                                {item.description}
                            </Linkify>
                        </li>
                    ))}
                    </ul>
                )}
                </>
            ) : (
                <p className={styles.readMoreSection}>
                    {sampleText}
                </p>
            )}
        </div> 
    )
}

UsageAccordion.propTypes = {
    className: PropTypes.string,
    header: PropTypes.string.isRequired,
    text: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string
    })).isRequired,
    icon: PropTypes.any.isRequired
}

export default UsageAccordion
