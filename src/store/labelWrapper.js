import axios from "axios"

const GET_DATA = "GET CART"

const initialCase = {
  data: [],
}

const getData = data => ({ type: GET_DATA, data })

export const getDataThunk = () => async dispatch => {
  try {
    const res = await axios.get("/json/index")
    dispatch(getData(res.data))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = initialCase, action) {
  switch (action.type) {
    case GET_DATA:
      return action.data
    default:
      return state
  }
}
