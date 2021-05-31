import { AnchorLink } from "gatsby-plugin-anchor-links"

import classNames from "classnames"
import React, { useState } from "react"

import NavDropdown from "react-bootstrap/NavDropdown"
import Nav from 'react-bootstrap/Nav'

import styles from "./styles.module.css"

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
                                src={require("../../images/logo-s.png")}
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
                                <AnchorLink to="/#section-mission" className={styles.navLink}>
                                    <div>Mission</div>
                                </AnchorLink>
                            </Nav.Item>
                            <Nav.Item>
                                <AnchorLink to="/#section-problem" className={styles.navLink}>
                                    <div>Problem</div>
                                </AnchorLink>
                            </Nav.Item>
                            <NavDropdown title="Solutions" id="solutions" className={styles.navDropdown}>
                                <NavDropdown.Item className={styles.dropdownItem}>
                                    <AnchorLink to="/#section-solution-tool" className={classNames(styles.navLink, styles.dropdownLink)}>
                                        The Label
                                    </AnchorLink>
                                </NavDropdown.Item>
                                <NavDropdown.Item className={styles.dropdownItem}>
                                    <AnchorLink to="/#section-solution-research" className={classNames(styles.navLink, styles.dropdownLink)}>
                                        Our Research
                                    </AnchorLink>
                                </NavDropdown.Item>
                                <NavDropdown.Item className={styles.dropdownItem}>
                                    <AnchorLink to="/#section-solution-workshops" className={classNames(styles.navLink, styles.dropdownLink)}>
                                        Workshops
                                    </AnchorLink>
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Item>
                                <AnchorLink to="/#section-team" className={styles.navLink}>
                                    <div>Team</div>
                                </AnchorLink>
                            </Nav.Item>
                            <Nav.Item>
                                <AnchorLink to="/#section-faq" className={styles.navLink}>
                                    <div>Faq</div>
                                </AnchorLink>
                            </Nav.Item>
                            <Nav.Item>
                                <AnchorLink to="/#section-contact" className={styles.navLink}>
                                    <div>Contact</div>
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
