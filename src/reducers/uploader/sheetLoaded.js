import validators from '../../components/uploader/helpers/validators'

const sheetLoaded = (state, action) => {
  const {
    data: sheetData,
    valid: sheetValid,
    errors: sheetErrors,
  } = validators.containers.validateSheetData(action.data)

  const newSheet = {
    kind: action.kind,
    data: sheetData,
    valid: sheetValid,
    errors: sheetErrors,
    reviewErrors: {},
  }

  const sheet = {
    ...state.sheet,
    ...newSheet,
  }

  window.localStorage.setItem('sheet', JSON.stringify(sheet))
  return {
    ...state,
    sheet,
  }
}

export { sheetLoaded as default }
