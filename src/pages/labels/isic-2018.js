import React from "react"
import { Provider } from "react-redux"

import LabelWrapper from "../../components/LabelWrapper/index.js"
import Header from "../../components/header/index.js"
import store from "../../store/index"

const Isic2018Page = () => (
  <Provider store={store}>
    <Header />
    <LabelWrapper jsonFile="isic-2018-blob" />
  </Provider>
)

export default Isic2018Page
