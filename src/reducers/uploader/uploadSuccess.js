const uploadSuccess = state => {
  return {
    ...state,
    uploader: {
      ...state.uploader,
      loading: false,
      error: null,
    },
  }
}

export { uploadSuccess as default }
