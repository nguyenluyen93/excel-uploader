import React from 'react'
import PropTypes from 'prop-types'
import StyledDataGrid from './StyledDataGrid'

const DataGrid = ({
  columnDefs,
  defaultColDef,
  rowData,
  rowDragManaged,
  getRowClass,
  getRowNodeId,
  onCellValueChanged,
  onGridReady,
  onRowDragEnd,
  onRowSelected,
  ...other
}) => {
  return (
    <StyledDataGrid
      columnDefs={columnDefs}
      defaultColDef={defaultColDef}
      rowData={rowData}
      rowDragManaged={rowDragManaged}
      getRowClass={getRowClass}
      getRowNodeId={getRowNodeId}
      onCellValueChanged={onCellValueChanged}
      onGridReady={onGridReady}
      onRowDragEnd={onRowDragEnd}
      onRowSelected={onRowSelected}
      {...other}
    />
  )
}

DataGrid.propTypes = {
  columnDefs: PropTypes.array.isRequired,
  defaultColDef: PropTypes.object,
  rowData: PropTypes.array.isRequired,
  rowDragManaged: PropTypes.bool,
  getRowClass: PropTypes.func,
  getRowNodeId: PropTypes.func.isRequired,
  onCellValueChanged: PropTypes.func,
  onGridReady: PropTypes.func,
  onRowDragEnd: PropTypes.func,
  onRowSelected: PropTypes.func,
}

export default DataGrid
