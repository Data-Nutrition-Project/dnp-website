const initialState = {
  isHighlight: false,
}

const TOGGLE_HIGHLIGHT = "TOGGLE_HIGHLIGHT"

export const toggleHighlight = isHighlight => ({
  type: TOGGLE_HIGHLIGHT,
  isHighlight,
})

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_HIGHLIGHT:
      return { ...state, isHighlight: action.isHighlight }
    default:
      return state
  }
}
