const gridUnpin = state => {
  if (!state.dataGrid.columnApi) return state

  const allColumns = state.dataGrid.columnApi.getColumnState()
  allColumns.forEach(column => {
    state.dataGrid.columnApi.setColumnPinned(column.colId, null)
  })

  return {
    ...state,
    dataGrid: {
      ...state.dataGrid,
      pinned: false,
    },
  }
}

export { gridUnpin as default }
