import getToaster from '../../utils/getToaster'
import { initialSheet } from '../../constants'

const toaster = getToaster()

const dropSheet = state => {
  window.localStorage.setItem('sheet', JSON.stringify(initialSheet))
  toaster.info('Your sheet is dropped.')

  return {
    ...state,
    sheet: initialSheet,
  }
}

export { dropSheet as default }
