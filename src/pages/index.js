import React from "react"
import { Link } from "gatsby"

import classNames from "classnames"
import Layout from "../components/layout"

import style from "./index.module.css"

const IndexPage = props => (
  <Layout>
    <section
      id="slider"
      className={classNames(
        style.slider,
        style.sliderParallax,
        "full-screen",
        "dark"
      )}
    >
      <div className={style.sliderParallaxInner}>
        <div className="container vertical-middle clearfix">
          <div className={style.headingBlock}>
            <h1 className={style.pageTitleHeader}>
              {"The Data Nutrition Project"}
            </h1>
            <span className={style.pageTitleSpan}>
              {
                "Empowering data scientists and policymakers with practical tools to improve AI outcomes"
              }
            </span>
          </div>
          <div className="center bottommargin">
            <Link
              to="/page-2"
              className="button button-xlarge nobottommargin mod-aqua"
            >
              <i className="icon-play-circle"></i>prototype
            </Link>
            <a
              className="button button-xlarge nobottommargin mod-aqua"
              href="https://arxiv.org/abs/1805.03677"
              rel="noopener noreferrer"
              target="_blank"
            >
              <i className="icon-line-paper"></i>paper
            </a>
            <a
              href="mailto:nutrition@media.mit.edu"
              className="button    button-xlarge nobottommargin"
            >
              <i className="icon-line2-users"></i>Work with us
            </a>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)

export default IndexPage
