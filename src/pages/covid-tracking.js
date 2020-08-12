import React from "react"
import LabelWrapper from "../components/LabelWrapper/index.js"
import Header from "../components/header/index.js"
import { Provider } from "react-redux"
import store from "../store/index"

const CovidTrackingPage = () => (
  <Provider store={store}>
    <Header />
    <LabelWrapper jsonFile="ctp-blob" />
  </Provider>
)

export default CovidTrackingPage
