import React from "react"
import { shallow } from "enzyme"
import renderer from "react-test-renderer"
import ShallowRenderer from "react-test-renderer/shallow"
import SecondPage from "../page-2"
import { TestScheduler } from "jest"

describe("Test second page render", () => {
  it("renders correctly", () => {
    const renderer = new ShallowRenderer()
    const tree = renderer.render(<SecondPage />)

    expect(tree).toMatchSnapshot()
  })
})
