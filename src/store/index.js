import { createStore, combineReducers, applyMiddleware } from "redux"
import { createLogger } from "redux-logger"
import thunkMiddleware from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import labelMenuReducer from "./labelMenu"
import dataReducer from "./labelBase"
import baseReducer from "./bases"
import overviewReducer from "./overviewStore"
const reducer = combineReducers({
  data: dataReducer,
  label: labelMenuReducer,
  base: baseReducer,
  overview: overviewReducer,
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware)
export default store

export * from "./labelMenu"
export * from "./labelBase"
export * from "./bases"
export * from "./overviewStore"
