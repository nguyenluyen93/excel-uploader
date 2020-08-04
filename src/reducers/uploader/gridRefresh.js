const gridRefresh = (state, action) => {
  if (state.dataGrid.api) {
    state.dataGrid.api.redrawRows(action.rowNodes)
  }
  return state
}

export { gridRefresh as default }
