import dropSheet from './dropSheet'
import gridAddNewRow from './gridAddNewRow'
import gridAutoFit from './gridAutoFit'
import gridAutoSizing from './gridAutoSizing'
import gridPin from './gridPin'
import gridReady from './gridReady'
import gridRefresh from './gridRefresh'
import gridRemoveSeletedRow from './gridRemoveSeletedRow'
import gridScrollToBottom from './gridScrollToBottom'
import gridSelectRow from './gridSelectRow'
import gridUnpin from './gridUnpin'
import gridUpdateCellValue from './gridUpdateCellValue'
import sheetLoaded from './sheetLoaded'
import sheetReviewErrors from './sheetReviewErrors'
import toggleErrorsOnly from './toggleErrorsOnly'
import fetchBegin from './fetchBegin'
import fetchSuccess from './fetchSuccess'
import fetchFailure from './fetchFailure'
import uploadBegin from './uploadBegin'
import uploadSuccess from './uploadSuccess'
import uploadFailure from './uploadFailure'

const actionTypes = {
  dropSheet: 'dropSheet',
  gridAutoFit: 'gridAutoFit',
  gridAutoSizing: 'gridAutoSizing',
  gridPin: 'gridPin',
  gridReady: 'gridReady',
  gridUnpin: 'gridUnpin',
  gridUpdateCellValue: 'gridUpdateCellValue',
  gridRefesh: 'gridRefesh',
  gridRemoveSeletedRow: 'gridRemoveSeletedRow',
  gridScrollToBottom: 'gridScrollToBottom',
  gridSelectRow: 'gridSelectRow',
  gridAddNewRow: 'gridAddNewRow',
  sheetLoaded: 'sheetLoaded',
  sheetReviewErrors: 'sheetReviewErrors',
  toggleErrorsOnly: 'toggleErrorsOnly',
  fetchBegin: 'fetchBegin',
  fetchSuccess: 'fetchSuccess',
  fetchFailure: 'fetchFailure',
  uploadBegin: 'uploadBegin',
  uploadSuccess: 'uploadSuccess',
  uploadFailure: 'uploadFailure',
}

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.dropSheet:
      return dropSheet(state)
    case actionTypes.gridAddNewRow:
      return gridAddNewRow(state)
    case actionTypes.gridAutoFit:
      return gridAutoFit(state)
    case actionTypes.gridAutoSizing:
      return gridAutoSizing(state)
    case actionTypes.gridPin:
      return gridPin(state, action)
    case actionTypes.gridReady:
      return gridReady(state, action)
    case actionTypes.gridRefesh:
      return gridRefresh(state, action)
    case actionTypes.gridRemoveSeletedRow:
      return gridRemoveSeletedRow(state)
    case actionTypes.gridScrollToBottom:
      return gridScrollToBottom(state)
    case actionTypes.gridSelectRow:
      return gridSelectRow(state, action)
    case actionTypes.gridUnpin:
      return gridUnpin(state)
    case actionTypes.gridUpdateCellValue:
      return gridUpdateCellValue(state, action)
    case actionTypes.sheetLoaded:
      return sheetLoaded(state, action)
    case actionTypes.sheetReviewErrors:
      return sheetReviewErrors(state, action)
    case actionTypes.toggleErrorsOnly:
      return toggleErrorsOnly(state)
    case actionTypes.fetchBegin:
      return fetchBegin(state)
    case actionTypes.fetchSuccess:
      return fetchSuccess(state, action)
    case actionTypes.fetchFailure:
      return fetchFailure(state, action)
    case actionTypes.uploadBegin:
      return uploadBegin(state)
    case actionTypes.uploadSuccess:
      return uploadSuccess(state, action)
    case actionTypes.uploadFailure:
      return uploadFailure(state, action)
    default:
      return state
  }
}

export { reducer as default, actionTypes }
