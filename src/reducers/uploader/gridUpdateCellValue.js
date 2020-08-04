import { omit } from 'lodash'
import validators from '../../components/uploader/helpers/validators'

const gridUpdateCellValue = (state, action) => {
  const {
    data: updateRowData,
    valid: updateRowValid,
    errors: updateRowErrors,
  } = validators.containers.validateRow(action.data)
  const sheetData = state.sheet.data.map(row => {
    return row.id !== updateRowData.id ? row : updateRowData
  })

  const sheetErrors = updateRowValid
    ? omit(state.sheet.errors, [updateRowData.id])
    : { ...state.sheet.errors, [updateRowData.id]: updateRowErrors }

  const sheetValid = !Object.keys(sheetErrors).length

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
    sheet,
  }
}

export { gridUpdateCellValue as default }
