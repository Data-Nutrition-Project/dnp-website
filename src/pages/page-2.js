import React from "react"
import { Link } from "gatsby"
import { Button } from "react-bootstrap"
<<<<<<< HEAD
import LabelWrapper from "../components/LabelWrapper/index.js"
import Layout from "../components/layout"

const SecondPage = () => (
  <Layout>
    <LabelWrapper />
  </Layout>
=======
import LabelMenus from "../components/LabelMenus/index.js"
import LabelWrapper from "../components/LabelWrapper/index.js"
import LabelTitle from "../components/LabelTitle/index.js"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Provider } from "react-redux"
import store from "../store/index"
const SecondPage = () => (
  <Provider store={store}>
    <LabelWrapper />
  </Provider>
>>>>>>> 6e60ba3ae3467508eafa3c40f2c8c29d47f14a9d
)

export default SecondPage
