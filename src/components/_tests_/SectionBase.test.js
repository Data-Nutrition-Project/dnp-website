import React from "react"
import renderer from "react-test-renderer"
import SectionBase from "../SectionBase"

describe("SectionBase", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<SectionBase />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
