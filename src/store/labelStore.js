const GET_LABEL = "GET_LABEL"

const getLabel = label => ({ type: GET_LABEL, label })

export const fetchLabelThunk = jsonFile => async dispatch => {
  try {
    const label = await (
      await fetch(process.env.SITE_URL + '/blobs/' + jsonFile + ".json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
    ).json()
    dispatch(getLabel(label))
  } catch (err) {
    console.error(err)
  }
}

export default function labelReducer(state = {}, action) {
  switch (action.type) {
    case GET_LABEL:
      return action.label
    default:
      return state
  }
}
