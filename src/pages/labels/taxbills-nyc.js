import React from "react"
import { Provider } from "react-redux"

import LabelWrapper from "../../components/LabelWrapper/index.js"
import Header from "../../components/header/index.js"
import store from "../../store/index"

const TaxBillsPage = () => (
  <Provider store={store}>
    <Header />
    <LabelWrapper jsonFile="justfix-blob-v2" />
  </Provider>
)

export default TaxBillsPage
