import React from 'react'
import PropTypes from 'prop-types'
import { ThemeContext } from '../../contexts/theme'
import { actionTypes } from '../../reducers/theme'
import StyledDetailTopBar from './StyledDetailTopBar'

const DetailTopBar = ({
  dataGrid,
  pinned,
  downloadExcel,
  togglePinColumns,
}) => {
  const { theme, dispatch } = React.useContext(ThemeContext)

  const autoFit = () => dataGrid.api && dataGrid.api.sizeColumnsToFit()
  const autoSizing = () =>
    dataGrid.columnApi && dataGrid.columnApi.autoSizeAllColumns()
  const toggleWideMode = () => dispatch({ type: actionTypes.toggleWideMode })

  return (
    <StyledDetailTopBar
      pinned={pinned}
      theme={theme}
      autoFit={autoFit}
      autoSizing={autoSizing}
      downloadExcel={downloadExcel}
      togglePinColumns={togglePinColumns}
      toggleWideMode={toggleWideMode}
    />
  )
}

DetailTopBar.propTypes = {
  dataGrid: PropTypes.object.isRequired,
  pinned: PropTypes.bool.isRequired,
  downloadExcel: PropTypes.func.isRequired,
  togglePinColumns: PropTypes.func.isRequired,
}

export default DetailTopBar
