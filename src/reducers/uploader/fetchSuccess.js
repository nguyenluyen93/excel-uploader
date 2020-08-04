const fetchSuccess = (state, action) => {
  return {
    ...state,
    master: {
      ...state.master,
      fetching: false,
      fetched: true,
      error: null,
      data: {
        ...state.master.data,
        ...action.data,
      },
    },
  }
}

export { fetchSuccess as default }
