import React from "react"
import Adapter from "enzyme-adapter-react-16"
import { Provider } from "react-redux"
import renderer from "react-test-renderer"

import LabelMenus from "../LabelMenus"
import store from "../../store/index"

configure({ adapter: new Adapter() })
import { shallow, configure } from "enzyme"

describe("LabelMenus", () => {
  it("renders correctly", () => {
    const tree = renderer.create(
      <Provider store={store}>
        <LabelMenus />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
