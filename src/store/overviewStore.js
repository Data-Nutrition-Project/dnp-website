import axios from "axios"

const GET_OVERVIEW = "GET OVERVIEW"

const initialCase = {
  overview: {},
}

const getOverview = overview => ({ type: GET_OVERVIEW, overview })

export const fetchOverviewThunk = () => async dispatch => {
  try {
    const { overview } = await axios.get("/json/overview")
    dispatch(getOverview(overview))
  } catch (err) {
    console.error(err)
  }
}

export default function overviewReducer(state = initialCase, action) {
  switch (action.type) {
    case GET_OVERVIEW:
      return action.overview
    default:
      return state
  }
}
