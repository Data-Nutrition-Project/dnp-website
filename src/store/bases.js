const SEND_BASE_INFO = "SEND_BASE_INFO"

export const setBase = status => ({
  type: SEND_BASE_INFO,
  status,
})

export const sendBaseInfo = status => {
  return dispatch => {
    try {
      dispatch(setBase(status))
    } catch (err) {
      console.log(err)
    }
  }
}

export default function baseReducer(state = "", action) {
  switch (action.type) {
    case SEND_BASE_INFO:
      return action.status
    default:
      return state
  }
}
