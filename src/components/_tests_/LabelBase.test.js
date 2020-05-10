import React from "react"
import renderer from "react-test-renderer"
import LabelBase from "../LabelBase"

describe("LabelBase", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<LabelBase />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
