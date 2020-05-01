import React from "react"
import { shallow } from "enzyme"
import renderer from "react-test-renderer"
import SecondPage from "./page-2"
import { TestScheduler } from "jest"

test("Testing Page 2", () => {
  const component = renderer.create(<SecondPage />)
  let tree = component.toJSON()
  console.log("tree", tree)
  expect(tree).toMatchSnapshot()
})

// describe("page2", () => {
//   const renderer = new ShallowRenderer()
//   renderer.render(<SecondPage />)
//   const result = renderer.getRenderOutput()
//   console.log("result", result.props.children)
//   //one button
//   it("should have a button component", () => {
//     expect(result.props.children[1]("Click Me!")).toHaveLength(1)
//     //button should be of type button
//     expect(
//       result.props.children[1]("Click Me!").type().defaultProps.type
//     ).toEqual("button")
//     //Button should have text
//     // expect(result.props.children[1]("Click Me!").text()).toEqual("Click Me!")
//   })
// })
