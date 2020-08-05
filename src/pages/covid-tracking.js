import React from "react"
import { Link } from "gatsby"
import { Button } from "react-bootstrap"
import LabelMenus from "../components/LabelMenus/index.js"
import LabelWrapper from "../components/LabelWrapper/index.js"
import Header from "../components/header/index.js"
import LabelTitle from "../components/LabelTitle/index.js"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Provider } from "react-redux"
import store from "../store/index"
const SecondPage = () => (
  <Provider store={store}>
    <Header />
    <LabelWrapper jsonFile="ctp-blob" />
  </Provider>
)

export default SecondPage
