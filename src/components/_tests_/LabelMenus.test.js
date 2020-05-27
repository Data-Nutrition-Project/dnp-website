import React from "react"
import renderer from "react-test-renderer"
import LabelMenus from "../LabelMenus"
import Adapter from "enzyme-adapter-react-16"
configure({ adapter: new Adapter() })
import { Provider } from "react-redux"
// import createStore from "./createReduxStore"
// const store = createStore()
import ShallowRenderer from "react-test-renderer/shallow"
import { mount } from "enzyme"
const sinon = require("sinon")
import { shallow, configure } from "enzyme"
describe("LabelMenus", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<LabelMenus />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  test("selectItem should be called", () => {
    const props = {
      highlightValue: jest.fn(),
    }
    afterEach(() => {
      props.highlightValue.mockReset()
    })

    let wrapper = shallow(<LabelMenus {...props} />)
    wrapper.instance().selectItem = jest.fn()
    let { selectItem } = wrapper.instance()
    expect(selectItem).toHaveBeenCalledTimes(0)
    wrapper.find("#selectButton").forEach(node => {
      node.simulate("click")
    })
    expect(selectItem).toHaveBeenCalledTimes(3)

    // const title = wrapper.find({ state: props.highlightValue })
    // expect(title.to.have.lengthOf(1))
    // expect(wrapper.state().showHighlight).toBe(false)
    // title.simulate("click")
    // expect(wrapper.state().showHighlight).toBe(true)
  })
})
