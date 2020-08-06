import { createStore, combineReducers, applyMiddleware } from "redux"
import { createLogger } from "redux-logger"
import thunkMiddleware from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"

import labelMenuReducer from "./labelMenu"
import dataReducer from "./labelBase"
import baseReducer from "./bases"
import labelReducer from "./labelStore"

const reducer = combineReducers({
  data: dataReducer,
  labelMenu: labelMenuReducer,
  base: baseReducer,
  label: labelReducer,
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware)
export default store

export * from "./labelMenu"
export * from "./labelBase"
export * from "./bases"
export * from "./labelStore"
