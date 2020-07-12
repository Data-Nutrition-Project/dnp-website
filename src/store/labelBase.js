import axios from "axios"

const GET_DATA = "GET DATA"

const initialCase = {
  data: [],
}

const getData = data => ({ type: GET_DATA, data })

export const fetchDataThunk = () => async dispatch => {
  try {
    const { data } = await axios.get("/json/index")
    dispatch(getData(data))
  } catch (err) {
    console.error(err)
  }
}

export default function dataReducer(state = initialCase, action) {
  switch (action.type) {
    case GET_DATA:
      return [...action.data]
    default:
      return state
  }
}
