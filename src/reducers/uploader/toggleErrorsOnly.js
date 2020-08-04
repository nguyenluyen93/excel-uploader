const toggleErrorsOnly = state => {
  return {
    ...state,
    showErrorsOnly: !state.showErrorsOnly,
  }
}

export { toggleErrorsOnly as default }
