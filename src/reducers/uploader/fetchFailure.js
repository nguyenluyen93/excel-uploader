const fetchSuccess = (state, action) => {
  return {
    ...state,
    master: {
      ...state.master,
      fetching: false,
      error: action.error,
    },
  }
}

export { fetchSuccess as default }
