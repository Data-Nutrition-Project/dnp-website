import React from "react"
import renderer from "react-test-renderer"
import LabelTitle from "../LabelTitle"

describe("LabelTitle", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<LabelTitle datasetOrgLink="" />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
