import React from 'react'
import { UploaderContext } from '../../contexts/uploader'
import { actionTypes } from '../../reducers/uploader'
import StyledModifyBottomBar from './StyledModifyBottomBar'

const ModifyBottomBar = () => {
  const { state, dispatch } = React.useContext(UploaderContext)
  const {
    selectedRowId,
    sheet: { valid: sheetValid },
    master: { fetching, error: fetchError },
  } = state

  const createNewRow = () => {
    dispatch({ type: actionTypes.gridAddNewRow })

    setTimeout(() => {
      dispatch({ type: actionTypes.gridScrollToBottom })
    }, 500)
  }

  const removeSelectedRow = () => {
    dispatch({ type: actionTypes.gridRemoveSeletedRow })
  }

  return (
    <StyledModifyBottomBar
      fetching={fetching}
      fetchError={fetchError}
      selectedRowId={selectedRowId}
      sheetValid={sheetValid}
      createNewRow={createNewRow}
      removeSelectedRow={removeSelectedRow}
    />
  )
}

export default ModifyBottomBar
