const uploadFailure = (state, action) => {
  return {
    ...state,
    uploader: {
      ...state.uploader,
      loading: false,
      error: action.error,
    },
  }
}

export { uploadFailure as default }
