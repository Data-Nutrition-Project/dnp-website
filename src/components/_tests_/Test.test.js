import React from "react"
import { configure } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import { shallow } from "enzyme"
import Test from "../Test"

configure({ adapter: new Adapter() })

describe("React Bootstrap Test", () => {
  const wrapper = shallow(<Test />)

  it("should have a btn component", () => {
    expect(wrapper.find("Button")).toHaveLength(1)

    expect(wrapper.find("Button").type().defaultProps.type).toEqual("button")

    expect(wrapper.find("Button").text()).toEqual("TEST")
  })
})
