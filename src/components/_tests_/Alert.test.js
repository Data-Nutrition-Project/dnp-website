import React from "react"
import renderer from "react-test-renderer"
import AlertCard from "../AlertCard"

describe("Alert", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<AlertCard />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
