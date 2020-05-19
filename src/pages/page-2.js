import React from "react"
import { Link } from "gatsby"
import { Button } from "react-bootstrap"
import LabelMenus from "../components/LabelMenus/index.js"
import LabelTitle from "../components/LabelTitle/index.js"
import Layout from "../components/layout"
import SEO from "../components/seo"

const SecondPage = () => (
  <LabelMenus />

  // <Layout>
  //   <LabelMenus />
  //   <SEO title="Page two" />

  //   {/* <h1>Hi from the second page</h1>
  //   <p>Welcome to page 2</p>
  //   <Button>Click Me!</Button>
  //   <Link to="/">Go back to the homepage</Link> */}
  //   <div></div>
  // </Layout>
)

export default SecondPage
