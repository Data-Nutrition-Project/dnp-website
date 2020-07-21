import { configure } from "enzyme"
const Enzyme = require("enzyme")
import Adapter from "enzyme-adapter-react-16"

Enzyme.configure({ adapter: new Adapter() })
