import classNames from "classnames"
import React, { useState } from "react"
import PropTypes from "prop-types"

import * as styles from "./styles.module.css"

import EmailIcon from "../../../images/email.inline.svg"

const AuthorAccordion = props => {
    const [isOpen, setIsOpen] = useState(false)
    const toggleOpen = () => {
        setIsOpen(!isOpen)
    }

    let moreItemsCount = 0;
    let subtitle = '';

    if (props.answer.length > 0) {
        subtitle = props.answer[0].Name.answer;
    }
    if (props.answer.length > 1) {
        subtitle = subtitle.concat(`, ${props.answer[1].Name.answer}`);
    }
    if ((props.answer.length - 2) > 0) {
        moreItemsCount = props.answer.length - 2;
        subtitle = subtitle.concat(` & ${moreItemsCount} others`);
    }

    return (
        <div className={styles.aboutSection}>
            <div className={styles.aboutTitle}>
                <p className={styles.aboutTitleText}>
                    {props.title}
                </p>
                {isOpen ? (
                    <span
                        className={styles.accordionCaret}
                        onClick={toggleOpen}
                        onKeyPress={toggleOpen}
                        role="button"
                        tabIndex={0}
                    >
                        <img 
                            className={styles.accordionCaretIcon}
                            src={require('../../../images/caret-up.png').default}
                            alt='caret up' 
                        />
                    </span>
                ) : (
                    <span
                        className={styles.accordionCaret}
                        onClick={toggleOpen}
                        onKeyPress={toggleOpen}
                        role="button"
                        tabIndex={0}
                    >
                        <span className={styles.aboutListSubtitle}>
                            {subtitle}
                        </span>
                        <img 
                            className={styles.accordionCaretIcon}
                            src={require('../../../images/caret-down.png').default}
                            alt='caret down' 
                        />
                    </span>
                )}
            </div>
            {isOpen && (
                <ul className={styles.itemList}>
                {props.answer.map(item => (
                    <li className={styles.item}>
                        <div className={styles.aboutInfo}>
                            <p className={styles.aboutInfoName}>{item.Name.answer}</p>
                            <p className={styles.aboutInfoAffiliation}>{item.Affiliation.answer}</p>
                        </div>
                        {item.Email && (
                            <div className={styles.aboutLinks}>
                                <a href={'mailto:'.concat(item.Email.answer)}>
                                    <EmailIcon />
                                </a>
                            </div>
                        )}
                    </li>
                ))}
                </ul>
            )}
        </div>
    )
}

AuthorAccordion.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    answer: PropTypes.arrayOf(PropTypes.shape({
        Name: PropTypes.object.isRequired,
        Affiliation: PropTypes.object,
        Email: PropTypes.object,
        'Relationship to Dataset': PropTypes.object
    })).isRequired,
}

export default AuthorAccordion
