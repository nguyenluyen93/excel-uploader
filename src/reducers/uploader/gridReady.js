const gridReady = (state, action) => {
  return {
    ...state,
    dataGrid: {
      ...state.dataGrid,
      api: action.api,
      columnApi: action.columnApi,
    },
  }
}

export { gridReady as default }
