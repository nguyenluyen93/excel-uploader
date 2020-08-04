const fetchBegin = state => {
  return {
    ...state,
    master: {
      ...state.master,
      fetching: true,
      error: null,
    },
  }
}

export { fetchBegin as default }
