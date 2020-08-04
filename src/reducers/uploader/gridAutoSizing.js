const gridAutoSizing = state => {
  if (state.dataGrid.columnApi) state.dataGrid.columnApi.autoSizeAllColumns()
  return state
}

export { gridAutoSizing as default }
