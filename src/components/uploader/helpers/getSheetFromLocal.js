import { initialSheet } from '../../../constants'

const getSheetDataFromLocal = (key = 'sheet') => {
  return JSON.parse(
    window.localStorage.getItem(key) || JSON.stringify(initialSheet),
  )
}

export { getSheetDataFromLocal as default }
