import React from 'react'
import { get } from 'lodash'
import styled from 'styled-components/macro'
import { UploaderContext } from '../../contexts/uploader'
import { actionTypes } from '../../reducers/uploader'
import DataGrid from '../data-grid/DataGrid'
import DataGridStats from '../data-grid/DataGridStats'
import getToaster from '../../utils/getToaster'
import fetchContIsoMaps from './helpers/fetchContIsoMaps'
import resolveContIsoMaps from './helpers/resolveContIsoMaps'
import fetchSites from './helpers/fetchSites'
import resolveSites from './helpers/resolveSites'
import fetchVesselInfos from './helpers/fetchVesselInfos'
import resolveVesselInfos from './helpers/resolveVesselInfos'
import resolveReviewErrors from './helpers/resolveReviewErrors'

import fetchStagingContExists from './helpers/fetchStagingContExists'
import resolveStagingContExists from './helpers/resolveStagingContExists'

const toaster = getToaster()

const defaultColDef = {
  resizable: true,
  sortable: true,
}

const Wrapper = styled.div`
  padding: 2rem;
  flex-grow: 1;
`

const createColumnDefs = () => {
  return [
    { field: 'Ctnr_No', filter: true },
    { field: 'Ctnr_Type', filter: true},
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

const ReviewGrid = () => {
  const { state, dispatch } = React.useContext(UploaderContext)
  const toastIdRef = React.useRef(null)
  const invalidRowIdsRef = React.useRef([])
  const sheetErrorsRef = React.useRef([])

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
    dispatch({ type: actionTypes.fetchBegin })

    Promise.all([
      fetchVesselInfos(state.sheet.data),
      fetchStagingContExists(state.sheet.data),
    ])
      .then(result => ({
        vesselInfos: resolveVesselInfos(result[0]),
        existsConts: resolveStagingContExists(result[1]),
      }))
      .then(payload =>
        dispatch({
          type: actionTypes.fetchSuccess,
          data: payload,
        }),
      )
      .catch(error => {
        console.error('Fetching vessel infos error: ', error)
        dispatch({ type: actionTypes.fetchFailure, error })
      })
  }, [dispatch, state.sheet.data])

  React.useEffect(() => {
    if (!state.dataGrid.columnApi) return

    setTimeout(() => {
      state.dataGrid.columnApi.autoSizeAllColumns()
    }, 1000)
  }, [state.dataGrid.columnApi])

  React.useEffect(() => {
    if (
      !state.sheet.data ||
      !state.sheet.data.length ||
      !state.master.data.contIsoMaps.length ||
      !state.master.data.sites.length ||
      !state.master.data.vesselInfos.length ||
      !state.master.data.existsConts.length
    )
      return

    const reviewErrors = resolveReviewErrors(
      state.sheet.data,
      state.master.data,
    )

    dispatch({ type: actionTypes.sheetReviewErrors, reviewErrors })
  }, [dispatch, state.sheet.data, state.master.data])

  const { showErrorsOnly } = state
  sheetErrorsRef.current = get(state, 'sheet.reviewErrors', {})
  invalidRowIdsRef.current = Object.keys(get(state, 'sheet.reviewErrors', {}))

  const handleRowMouseEnter = params => {
    if (!sheetErrorsRef.current[params.node.id]) {
      if (toastIdRef.current) return toaster.dismiss(toastIdRef.current)
      return
    }

    if (toastIdRef.current) {
      toaster.updateRowWarns(
        toastIdRef.current,
        sheetErrorsRef.current[params.node.id],
      )
      return
    }

    toastIdRef.current = toaster.showRowWarns(
      sheetErrorsRef.current[params.node.id],
      {
        onClose: () => (toastIdRef.current = null),
      },
    )
  }

  const handleGridReady = evt => {
    dispatch({
      type: actionTypes.gridReady,
      api: evt.api,
      columnApi: evt.columnApi,
    })
  }

  const handleRowDataChanged = evt => {
    evt.api.forEachNode(node => {
      node.addEventListener('mouseEnter', handleRowMouseEnter)
    })

    // Fix error not highlight on first reload
    setTimeout(() => {
      dispatch({ type: actionTypes.gridRefesh })
    }, 500)
  }

  const getRowNodeId = data => data.id

  const getRowClass = params => {
    if (invalidRowIdsRef.current.indexOf(params.data.id) >= 0)
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
        warnsCount={invalidRowIdsRef.current.length}
        totalRows={state.sheet.data.length}
      />
      <DataGrid
        columnDefs={createColumnDefs()}
        defaultColDef={defaultColDef}
        rowData={rowData}
        onGridReady={handleGridReady}
        onRowDataChanged={handleRowDataChanged}
        getRowClass={getRowClass}
        getRowNodeId={getRowNodeId}
      />
    </Wrapper>
  )
}

export default ReviewGrid
