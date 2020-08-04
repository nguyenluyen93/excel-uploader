const gridSelectRow = (state, action) => {
  return {
    ...state,
    selectedRowId: action.selectedRowId,
  }
}

export { gridSelectRow as default }
