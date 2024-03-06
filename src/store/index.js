import { configureStore } from "@reduxjs/toolkit"

import labelMenuReducer from "./labelMenu"
import dataReducer from "./labelBase"
import baseReducer from "./bases"
import labelReducer from "./labelStore"

const store = configureStore({
  reducer: {
    data: dataReducer,
    labelMenu: labelMenuReducer,
    base: baseReducer,
    label: labelReducer,
  }
})
export default store

export * from "./labelMenu"
export * from "./labelBase"
export * from "./bases"
export * from "./labelStore"
