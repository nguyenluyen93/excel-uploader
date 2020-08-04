const gridAutoFit = state => {
  if (state.dataGrid.api) state.dataGrid.api.sizeColumnsToFit()
  return state
}

export { gridAutoFit as default }
