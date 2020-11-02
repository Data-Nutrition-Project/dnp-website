import React from "react"
import { Provider } from "react-redux"

import LabelWrapper from "../../components/LabelWrapper/index.js"
import Header from "../../components/header/index.js"
import store from "../../store/index"

const NopvNycPage = () => (
  <Provider store={store}>
    <Header />
    <LabelWrapper jsonFile="nopv-nyc-blob" />
  </Provider>
)

export default NopvNycPage
