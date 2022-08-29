import classNames from "classnames"
import Linkify from 'react-linkify';
import React, { useState } from "react"
import PropTypes from "prop-types"

import * as styles from "./styles.module.css"

const UsageAccordion = props => {
    const [isReadMore, setIsReadMore] = useState(true)
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore)
    }

    const sampleText = `${props.text[0].title}. ${props.text[0].description.slice(0, 100)}`

    return (
        <div className={classNames(styles.usageInfo, props.className)}>
            <div className={styles.usageInfoHeader}>
                <div className={styles.usageHeaderTitle}>
                    <img 
                        className={styles.usageHeaderIcon}
                        src={props.icon}
                        alt={`${props.header} icon`}
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
                        <img 
                            className={styles.accordionCaretIcon}
                            src={require('../../../images/caret-down.png').default}
                            alt='caret down' 
                        />
                    ) : (
                        <img 
                            className={styles.accordionCaretIcon}
                            src={require('../../../images/caret-up.png').default}
                            alt='caret up' 
                        />
                    )}
                </span>
            </div>
            {isReadMore ? (
                <p>
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
                        <Linkify><b>{item.title}</b>{`. ${item.description}`}</Linkify>
                    </li>
                ))}
                </ul>
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
