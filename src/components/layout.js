/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import Helmet from "react-helmet"
import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import classNames from "classnames"

import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

import Header from "./header"

import styles from "./footer.module.css"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Helmet
        title={data.site.siteMetadata.title}
        meta={[
          { name: "description", content: data.site.siteMetadata.description },
          { name: "keywords", content: "AI,Data,Quality" },
        ]}
        bodyAttributes={{
          class: "stretched",
        }}
      >
        <html lang="en" />
      </Helmet>
      <div id="wrapper" className="clearfix">
        <Header />
        {children}
        <footer id="footer" className={styles.dark}>
            <Container />
            <div className={styles.copyrights}>
                <Container style={{ display: 'flex', 'align-items': 'center' }}>
                    <Col md={4}>
                        <a
                            href="https://twitter.com/makedatahealthy"
                            target="_blank"
                            className={classNames(styles.socialIcon, styles.siTwitter)}
                        >
                            <i className="icon-twitter"></i>
                        </a>
                    </Col>
                    <Col md={6}>
                        Copyrights &copy; 2020 All Rights Reserved by The Data Nutrition Project.<br />
                    </Col>
                    <div />
                </Container>
            </div>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
