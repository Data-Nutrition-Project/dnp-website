import { Link } from "gatsby"

import classNames from "classnames"
import PropTypes from "prop-types"
import React, { useState } from "react"

import Nav from 'react-bootstrap/Nav';

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
          >
            <i className="icon-reorder"></i>
          </div>
          <div className={styles.logo}>
            <Link to="/" className={styles.standardLogo}>
              <img
                className={styles.logoImg}
                src={require("../../images/logo-s.png")}
                alt="logo"
              />
            </Link>
          </div>
          <nav className={styles.primaryMenu}>
            <Nav
              className={
                classNames("justify-content-end", styles.primaryNav, { [styles.show]: showMobileNav })
              }
              activeKey="/#section-mission"
            >
              <Nav.Item>
                <Link to="/#section-mission" className={styles.navLink}>
                  <div>Mission</div>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/#section-problem" className={styles.navLink}>
                  <div>Problem</div>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/#section-solution" className={styles.navLink}>
                  <div>Solutions</div>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/#section-team" className={styles.navLink}>
                  <div>Team</div>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/#section-faq" className={styles.navLink}>
                  <div>Faq</div>
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/#section-contact" className={styles.navLink}>
                  <div>Contact</div>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
