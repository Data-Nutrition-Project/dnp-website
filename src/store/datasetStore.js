const GET_DATASET = "GET_DATASET"

const getDataset = dataset => ({ type: GET_DATASET, dataset })

export const fetchDatasetThunk = () => async dispatch => {
  try {
    const dataset = await (
      await fetch("/datasetinfo.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
    ).json()
    dispatch(getDataset(dataset))
  } catch (err) {
    console.error(err)
  }
}

export default function datasetReducer(state = {}, action) {
  switch (action.type) {
    case GET_DATASET:
      return action.dataset
    default:
      return state
  }
}
