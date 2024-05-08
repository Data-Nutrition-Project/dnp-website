import { AnchorLink } from "gatsby-plugin-anchor-links"

import classNames from "classnames"
import React, { useState } from "react"

import NavDropdown from "react-bootstrap/NavDropdown"
import Nav from 'react-bootstrap/Nav'

import * as styles from "./styles.module.css"

const Header = () => {
    // updates the display class for the mobile nav
    const [showMobileNav, setShowMobileNav] = useState(false);

    return (
        <header className={styles.header}>
            <div className={styles.headerWrap}>
                <div className={classNames(styles.container, "clearfix")}>
                    <div
                        className={styles.primaryMenuTrigger}
                        onClick={() => setShowMobileNav(!showMobileNav)}
                        onKeyPress={() => setShowMobileNav(!showMobileNav)}
                        role="button"
                        tabIndex={0}
                    >
                        <i className="icon-reorder"></i>
                    </div>
                    <div className={styles.logo}>
                        <AnchorLink to="/" className={styles.standardLogo}>
                            <img
                                className={styles.logoImg}
                                src={require("../../images/logo-s.png").default}
                                alt="logo"
                            />
                        </AnchorLink>
                    </div>
                    <nav className={styles.primaryMenu}>
                        <Nav
                            className={
                                classNames("justify-content-end", styles.primaryNav, { [styles.show]: showMobileNav })
                            }
                            activeKey="/#section-mission"
                        >
                            <Nav.Item>
                                <a href={process.env.GATSBY_LABELMAKER_URL} className={styles.navLink}>
                                    Label
                                    <img 
                                        src={require('../../images/linkimg.png').default}
                                        alt="external link icon"
                                        className={styles.icon}
                                    />
                                </a>
                            </Nav.Item>
                            <Nav.Item>
                                <AnchorLink to="/#section-solution-research" className={styles.navLink}>
                                    Research
                                </AnchorLink>
                            </Nav.Item>
                            <Nav.Item>
                                <AnchorLink to="/#section-solution-services" className={styles.navLink}>
                                    Services
                                </AnchorLink>
                            </Nav.Item>
                            <NavDropdown title="About Us" id="about" className={styles.navDropdown}>
                                <NavDropdown.Item className={styles.dropdownItem}>
                                    <AnchorLink to="/#section-team" className={classNames(styles.navLink, styles.dropdownLink)}>
                                        Team
                                    </AnchorLink>
                                </NavDropdown.Item>
                                <NavDropdown.Item className={styles.dropdownItem}>
                                    <AnchorLink to="/#section-faq" className={classNames(styles.navLink, styles.dropdownLink)}>
                                        FAQ
                                    </AnchorLink>
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Item>
                                <AnchorLink to="/#section-contact" className={styles.navLink}>
                                    <div>Donate</div>
                                </AnchorLink>
                            </Nav.Item>
                        </Nav>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header
