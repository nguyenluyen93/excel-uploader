const gridScrollToBottom = state => {
  if (state.dataGrid.api) {
    state.dataGrid.api.ensureIndexVisible(
      Math.max(state.sheet.data.length - 1, 0),
      'top',
    )
  }
  return state
}

export { gridScrollToBottom as default }
