import React from "react"
import renderer from "react-test-renderer"
import LabelMenus from "../LabelMenus"

describe("LabelMenus", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<LabelMenus />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
