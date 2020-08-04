const gridPin = (state, action) => {
  if (!state.dataGrid.columnApi) return state
  state.dataGrid.columnApi.setColumnPinned(action.columnName, 'left')

  return {
    ...state,
    dataGrid: {
      ...state.dataGrid,
      pinned: true,
    },
  }
}

export { gridPin as default }
