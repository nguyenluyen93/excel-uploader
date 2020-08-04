const uploadBegin = state => {
  return {
    ...state,
    uploader: {
      ...state.uploader,
      loading: true,
      error: null,
    },
  }
}

export { uploadBegin as default }
