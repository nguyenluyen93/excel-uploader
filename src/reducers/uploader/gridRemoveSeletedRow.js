import validators from '../../components/uploader/helpers/validators'

const gridRemoveSeletedRow = state => {
  if (!state.selectedRowId) return state

  const newSheetData = state.sheet.data.filter(
    row => row.id !== state.selectedRowId,
  )
  const {
    data: sheetData,
    valid: sheetValid,
    errors: sheetErrors,
  } = validators.containers.validateSheetData(newSheetData)

  const newSheet = {
    kind: state.sheet.kind,
    data: sheetData,
    valid: sheetValid,
    errors: sheetErrors,
  }

  const sheet = {
    ...state.sheet,
    ...newSheet,
  }

  window.localStorage.setItem('sheet', JSON.stringify(sheet))
  return {
    ...state,
    sheet: {
      ...state.sheet,
      ...sheet,
    },
    selectedRowId: null,
  }
}

export { gridRemoveSeletedRow as default }
