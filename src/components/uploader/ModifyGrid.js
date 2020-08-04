import React from 'react'
import styled from 'styled-components/macro'
import { uniqBy } from 'lodash'
import { UploaderContext } from '../../contexts/uploader'
import { actionTypes } from '../../reducers/uploader'
import DataGrid from '../data-grid/DataGrid'
import DataGridStats from '../data-grid/DataGridStats'
import getToaster from '../../utils/getToaster'
import SelectEditor from '../data-grid/SelectEditor'
import fetchContIsoMaps from './helpers/fetchContIsoMaps'
import fetchSites from './helpers/fetchSites'
import resolveContIsoMaps from './helpers/resolveContIsoMaps'
import resolveSites from './helpers/resolveSites'

const toaster = getToaster()

const defaultColDef = {
  resizable: true,
  sortable: true,
}

const suppressKeyboardEvent = params => {
  const KEY_ENTER = 13

  // Quick fix for react-select: return true (to suppress) if editing and user hit Enter keys
  var keyCode = params.event.keyCode
  var suppress = params.editing && keyCode === KEY_ENTER
  return suppress
}

const frameworkComponents = {
  selectEditor: SelectEditor,
}

const Wrapper = styled.div`
  padding: 2rem;
  flex-grow: 1;
`

const createColumnDefs = (masterData = {}) => {
  return [
    {
      field: 'Ctnr_No',
      editable: true,
      filter: true,
      rowDrag: true,
      checkboxSelection: true,
    },
    {
      field: 'Ctnr_Type',
      editable: true,
      filter: true,
      cellEditor: 'selectEditor',
      cellEditorParams: {
        values: uniqBy(masterData.contIsoMaps, 'value') || [],
        width: '120px',
      },
      suppressKeyboardEvent,
    },
    { field: 'Ctnr_Status', editable: true, filter: true },
    { field: 'Booking_No', editable: true, filter: true },
    { field: 'Seal_No', editable: true, filter: true },
    { field: 'Gross_Weight', editable: true, type: 'numericColumn' },
    {
      field: 'Vessel_CallSign',
      headerName: 'Vessel_CallSign',
      editable: true,
      filter: true,
    },
    { field: 'Vessel_Name', editable: true, filter: true },
    {
      field: 'From_Site',
      editable: true,
      filter: true,
      cellEditor: 'selectEditor',
      cellEditorParams: {
        values: masterData.sites || [],
        width: '200px',
      },
      suppressKeyboardEvent,
    },
    {
      field: 'Load_Port',
      editable: true,
      filter: true,
      cellEditor: 'selectEditor',
      cellEditorParams: {
        values: masterData.sites || [],
        width: '200px',
      },
      suppressKeyboardEvent,
    },
    { field: 'Customs_Clr', editable: true, filter: true },
    { field: 'IMO_Class', editable: true, filter: true },
    { field: 'UN_No', editable: true, filter: true },
    { field: 'OOG', editable: true, filter: true },
    { field: 'Reefer_Flg', editable: true, filter: true },
  ]
}

const ModifyGrid = () => {
  const { state, dispatch } = React.useContext(UploaderContext)
  const toastIdRef = React.useRef(null)
  const invalidRowIdsRef = React.useRef([])
  const warnRowIdsRef = React.useRef([])
  const sheetErrorsRef = React.useRef([])
  const sheetWarnsRef = React.useRef([])

  React.useEffect(() => {
    if (!state.dataGrid.api || state.master.fetched) return

    dispatch({ type: actionTypes.fetchBegin })
    Promise.all([fetchContIsoMaps(), fetchSites()])
      .then(result => ({
        contIsoMaps: resolveContIsoMaps(result[0]),
        sites: resolveSites(result[1]),
      }))
      .then(data => {
        dispatch({ type: actionTypes.fetchSuccess, data })
        state.dataGrid.api.setColumnDefs(createColumnDefs(data))
      })
      .catch(error => {
        console.error('Fetching master data error: ', error)
        dispatch({ type: actionTypes.fetchFailure, error })
      })
  }, [dispatch, state.dataGrid.api, state.master.fetched])

  React.useEffect(() => {
    if (!state.dataGrid.columnApi) return

    setTimeout(() => {
      state.dataGrid.columnApi.autoSizeAllColumns()
    }, 1000)
  }, [state.dataGrid.columnApi])

  const { selectedRowId, showErrorsOnly } = state
  sheetErrorsRef.current = state.sheet.errors
  invalidRowIdsRef.current = Object.keys(sheetErrorsRef.current)
  sheetWarnsRef.current = state.sheet.reviewErrors || {}
  warnRowIdsRef.current = Object.keys(sheetWarnsRef.current)

  const handleRowMouseEnter = params => {
    if (
      !sheetErrorsRef.current[params.node.id] &&
      !sheetWarnsRef.current[params.node.id]
    ) {
      if (toastIdRef.current) return toaster.dismiss(toastIdRef.current)
      return
    }

    if (sheetErrorsRef.current[params.node.id]) {
      if (toastIdRef.current) {
        toaster.updateRowErrors(
          toastIdRef.current,
          sheetErrorsRef.current[params.node.id],
        )
        return
      }

      toastIdRef.current = toaster.showRowErrors(
        sheetErrorsRef.current[params.node.id],
        {
          onClose: () => (toastIdRef.current = null),
        },
      )
      return
    }

    if (sheetWarnsRef.current[params.node.id]) {
      if (toastIdRef.current) {
        toaster.updateRowWarns(
          toastIdRef.current,
          sheetWarnsRef.current[params.node.id],
        )
        return
      }

      toastIdRef.current = toaster.showRowWarns(
        sheetWarnsRef.current[params.node.id],
        {
          onClose: () => (toastIdRef.current = null),
        },
      )
      return
    }
  }

  const handleGridReady = evt => {
    dispatch({
      type: actionTypes.gridReady,
      api: evt.api,
      columnApi: evt.columnApi,
    })

    // make sure no row is selected (fix bug when user navigate back from /review)
    dispatch({ type: actionTypes.gridSelectRow, selectedRowId: null })
  }

  const handleRowDataChanged = evt => {
    evt.api.forEachNode(node => {
      node.addEventListener('mouseEnter', handleRowMouseEnter)
    })
  }

  const handleRowSelected = params => {
    if (params.node.id === selectedRowId)
      return dispatch({ type: actionTypes.gridSelectRow, selectedRowId: null })

    dispatch({ type: actionTypes.gridSelectRow, selectedRowId: params.node.id })
  }

  const handleCellValueChanged = params => {
    dispatch({ type: actionTypes.gridUpdateCellValue, data: params.data })

    setTimeout(() => {
      dispatch({ type: actionTypes.gridRefesh })
    }, 500)
  }

  const handleCellEditingStopped = params => {
    if (['selectEditor'].indexOf(params.colDef.cellEditor) < 0) return

    // Quick fix for react-select cell editor: lost focus after stopEditting manually
    params.api.setFocusedCell(params.rowIndex, params.column.colId)
  }

  const handleRowDragEnd = params => {
    const newSheetData = []
    params.api.forEachNode(node => newSheetData.push(node.data))

    dispatch({ type: actionTypes.sheetLoaded, data: newSheetData })
  }

  const getRowNodeId = data => data.id

  const getRowClass = params => {
    if (invalidRowIdsRef.current.indexOf(params.data.id) >= 0)
      return 'grid-row-invalid'

    if (warnRowIdsRef.current.indexOf(params.data.id) >= 0)
      return 'grid-row-warn'
  }

  const rowData = showErrorsOnly
    ? state.sheet.data.filter(
        row => invalidRowIdsRef.current.indexOf(row.id) >= 0,
      )
    : state.sheet.data

  return (
    <Wrapper>
      <DataGridStats
        errorsCount={invalidRowIdsRef.current.length}
        totalRows={state.sheet.data.length}
      />
      <DataGrid
        columnDefs={createColumnDefs(state.master.data)}
        defaultColDef={defaultColDef}
        rowData={rowData}
        rowDragManaged={true}
        frameworkComponents={frameworkComponents}
        onGridReady={handleGridReady}
        onRowDataChanged={handleRowDataChanged}
        onRowSelected={handleRowSelected}
        onCellValueChanged={handleCellValueChanged}
        onCellEditingStopped={handleCellEditingStopped}
        onRowDragEnd={handleRowDragEnd}
        getRowClass={getRowClass}
        getRowNodeId={getRowNodeId}
        // Fix ag-Grid cell containing react-select dropdown menu is cut-off
        popupParent={document.querySelector('body')}
      />
    </Wrapper>
  )
}

export default ModifyGrid
