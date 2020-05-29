import React from "react"
import renderer from "react-test-renderer"
import LabelMenus from "../LabelMenus"
import Adapter from "enzyme-adapter-react-16"
configure({ adapter: new Adapter() })
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
  })
})
