const sheetReviewErrors = (state, action) => {
  const sheet = {
    ...state.sheet,
    reviewErrors: action.reviewErrors,
  }

  window.localStorage.setItem('sheet', JSON.stringify(sheet))
  return {
    ...state,
    sheet: {
      ...state.sheet,
      reviewErrors: action.reviewErrors,
    },
  }
}

export { sheetReviewErrors as default }
