import React, { useContext } from 'react'
import { omit } from 'lodash'
import useModal from '../../hooks/useModal'
import { ThemeContext } from '../../contexts/theme'
import { UploaderContext } from '../../contexts/uploader'
import { actionTypes as uploaderActTypes } from '../../reducers/uploader'
import { actionTypes as themeActTypes } from '../../reducers/theme'
import writeXlsx from '../../utils/writeXlsx'
import StyledCmdGridTopBar from './StyledCmdGridTopBar'
import DropSheetModal from './DropSheetModal'

const CmdGridTopBar = () => {
  const { theme, dispatch: themeDp } = useContext(ThemeContext)
  const { state, dispatch: uploaderDp } = useContext(UploaderContext)
  const { open: modalDropSheetOpen, toggle: toggleDropSheetModal } = useModal()

  const toggleWideMode = () => {
    themeDp({ type: themeActTypes.toggleWideMode })
  }
  const togglePinColumns = () => {
    if (state.dataGrid.pinned) uploaderDp({ type: uploaderActTypes.gridUnpin })
    else uploaderDp({ type: uploaderActTypes.gridPin, columnName: 'Ctnr_No' })
  }

  const toggleErrorsOnly = () =>
    uploaderDp({ type: uploaderActTypes.toggleErrorsOnly })

  const autoSizing = () => uploaderDp({ type: uploaderActTypes.gridAutoSizing })

  const autoFit = () => uploaderDp({ type: uploaderActTypes.gridAutoFit })

  const downloadExcel = () => {
    if (!state.sheet.data || !state.dataGrid.columnApi) return
    const allColumns = state.dataGrid.columnApi.getColumnState()
    const header = allColumns.map(col => col.colId)

    const json = state.sheet.data.map(doc => omit(doc, ['id']))

    writeXlsx(json, header)
  }

  return (
    <>
      <StyledCmdGridTopBar
        pinned={state.dataGrid.pinned}
        showErrorsOnly={state.showErrorsOnly}
        theme={theme}
        toggleDropSheetModal={toggleDropSheetModal}
        togglePinColumns={togglePinColumns}
        toggleErrorsOnly={toggleErrorsOnly}
        toggleWideMode={toggleWideMode}
        autoSizing={autoSizing}
        autoFit={autoFit}
        downloadExcel={downloadExcel}
  
      />
      <DropSheetModal
        open={modalDropSheetOpen}
        hideModal={toggleDropSheetModal}
      />
    </>
  )
}

export default CmdGridTopBar
