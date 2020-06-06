/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import Helmet from 'react-helmet'
import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
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
          { name: 'description', content: data.site.siteMetadata.description },
          { name: 'keywords', content: 'AI,Data,Quality' },
        ]}
        bodyAttributes={{
            class: 'stretched'
        }}
      >
        <html lang="en" />
      </Helmet>
      <div id="wrapper" className="clearfix">
        <Header />
        {children}
        <footer id="footer" className="dark">
          <div className="copyrights">
            <div className="container clearfix">
              <div className="col_one_third nomargin">
                <a
                  href="https://twitter.com/makedatahealthy"
                  target="_blank"
                  className="social-icon si-rounded si-medium si-twitter"
                >
                  <i className="icon-twitter"></i>
                  <i className="icon-twitter"></i>
                </a>
              </div>
              <div className="col_half nomargin">
                Copyrights &copy; 2018 All Rights Reserved by The Data Nutrition Project.
                <br/>
              </div>
            </div>
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
