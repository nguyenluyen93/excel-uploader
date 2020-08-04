import React from 'react'
import styled from 'styled-components/macro'
import DataGrid from '../data-grid/DataGrid'
import DataGridStats from '../data-grid/DataGridStats'

const defaultColDef = {
  resizable: true,
  sortable: true,
}

const Wrapper = styled.div`
  padding: 2rem;
  flex-grow: 1;
`

const otmProcessFormater = params => {
  switch (params.value) {
    case 'Y':
      return '✓'
    case 'F':
      return '✕'
    case '':
      return '⏳'
    default:
      return params.value
  }
}

const otmProcessCellClass = params => {
  switch (params.value) {
    case 'Y':
      return 'fg-success'
    case 'F':
      return 'fg-danger'
    case '':
      return 'fg-info'
    default:
      return ''
  }
}

const createColumnDefs = () => {
  return [
    {
      field: 'OtmProcessStatus',
      filter: true,
      headerName: 'Feedback',
      valueFormatter: otmProcessFormater,
      cellClass: otmProcessCellClass,
    },
    { field: 'Ctnr_No', filter: true },
    { field: 'Ctnr_Type', filter: true },
    { field: 'Ctnr_Status', filter: true },
    { field: 'Booking_No', filter: true },
    { field: 'Seal_No', filter: true },
    { field: 'Gross_Weight', type: 'numericColumn' },
    { field: 'Vessel_CallSign', headerName: 'Vessel_CallSign', filter: true },
    { field: 'Vessel_Name', filter: true },
    { field: 'From_Site', filter: true },
    { field: 'Load_Port', filter: true },
    { field: 'Customs_Clr', filter: true },
    { field: 'IMO_Class', filter: true },
    { field: 'UN_No', filter: true },
    { field: 'OOG', filter: true },
    { field: 'Reefer_Flg', filter: true },
  ]
}

const DetailGrid = ({ rowData, setDataGrid }) => {
  const handleGridReady = evt => {
    setDataGrid({
      api: evt.api,
      columnApi: evt.columnApi,
    })

    setTimeout(() => {
      evt.columnApi.autoSizeAllColumns()
    }, 1000)
  }

  const getRowNodeId = data => data.id

  return (
    <Wrapper>
      <DataGridStats errorsCount={0} totalRows={rowData.length} />
      <DataGrid
        columnDefs={createColumnDefs()}
        defaultColDef={defaultColDef}
        rowData={rowData}
        onGridReady={handleGridReady}
        getRowNodeId={getRowNodeId}
      />
    </Wrapper>
  )
}

export default DetailGrid
