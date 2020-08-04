import cuid from 'cuid'
import validators from '../../components/uploader/helpers/validators'

const gridAddNewRow = state => {
  const { data: newRowData } = validators.containers.validateRow({ id: cuid() })
  const newSheetData = [...state.sheet.data, newRowData]

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
  }
}

export { gridAddNewRow as default }
