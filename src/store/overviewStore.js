import axios from "axios"
import overviewInfo from "../../public/overview.json"
const GET_OVERVIEW = "GET_OVERVIEW"

// const initialCase = {
//   overview: {},
// }

const getOverview = overview => ({ type: GET_OVERVIEW, overview })

export const fetchOverviewThunk = () => async dispatch => {
  try {
    const overview = await (
      await fetch("/overview.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
    ).json()
    dispatch(getOverview(overview))
  } catch (err) {
    console.error(err)
  }
}

export default function overviewReducer(state = {}, action) {
  switch (action.type) {
    case GET_OVERVIEW:
      return action.overview
    default:
      return state
  }
}
