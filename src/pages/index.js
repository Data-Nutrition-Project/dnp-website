import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"

import SEO from "../components/seo"

import style from "./index.module.css"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <section className={style.feature}>
      <h1>Using CSS Modules</h1>
    </section>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
