import React from 'react'
import { omit } from 'lodash'
import DetailTopBar from './DetailTopBar'
import fetchJobDetail from './helpers/fetchJobDetail'
import fetchJobStatus from './helpers/fetchJobStatus'
import resolveJob from './helpers/resolveJob'
import resolveJobStatus from './helpers/resolveJobStatus'
import resolveJobItems from './helpers/resolveJobItems'
import DetailGrid from './DetailGrid'
import DetailBottomBar from './DetailBottomBar'
import writeXlsx from '../../utils/writeXlsx'

const initialState = {
  job: [],
  jobStatus: [],
  gridData: [],
  fetching: false,
  fetchError: null,
  pinned: false,
}

const actionTypes = {
  fetchJobBegin: 'fetchJobBegin',
  fetchJobSuccess: 'fetchJobSuccess',
  fetchJobFailure: 'fetchJobFailure',
  fetchJobStatusBegin: 'fetchJobStatusBegin',
  fetchJobStatusSuccess: 'fetchJobStatusSuccess',
  fetchJobStatusFailure: 'fetchJobStatusFailure',
  gridDataLoaded: 'gridDataLoaded',
  togglePinColumns: 'togglePinColumns',
}

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.fetchJobBegin:
      return {
        ...state,
        fetching: true,
        fetchError: null,
        job: [],
      }
    case actionTypes.fetchJobSuccess:
      return {
        ...state,
        fetching: false,
        fetchError: null,
        job: action.job,
      }
    case actionTypes.fetchJobFailure:
      return {
        ...state,
        fetching: false,
        fetchError: action.error,
        job: [],
      }
    case actionTypes.fetchJobStatusBegin:
      return {
        ...state,
        fetching: true,
        fetchError: null,
        jobStatus: [],
      }
    case actionTypes.fetchJobStatusSuccess:
      return {
        ...state,
        fetching: false,
        fetchError: null,
        jobStatus: action.jobStatus,
      }
    case actionTypes.fetchJobStatusFailure:
      return {
        ...state,
        fetching: false,
        fetchError: action.error,
        jobStatus: [],
      }
    case actionTypes.gridDataLoaded:
      return {
        ...state,
        gridData: action.data,
      }
    case actionTypes.togglePinColumns:
      return {
        ...state,
        pinned: !state.pinned,
      }
    default:
      return state
  }
}

const HistoryDetail = ({ match }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const [dataGrid, setDataGrid] = React.useState({})

  React.useEffect(() => {
    if (!match.params.jobId) return

    dispatch({ type: actionTypes.fetchJobBegin })
    fetchJobDetail(match.params.jobId)
      .then(json => {
        dispatch({ type: actionTypes.fetchJobSuccess, job: resolveJob(json) })
      })
      .catch(error => {
        dispatch({ type: actionTypes.fetchJobFailure, error })
      })
  }, [match.params.jobId])

  React.useEffect(() => {
    if (!state.job.length) return

    const jobItemIds = state.job.map(item => item.id)

    dispatch({ type: actionTypes.fetchJobStatusBegin })
    fetchJobStatus(jobItemIds)
      .then(json => {
        dispatch({
          type: actionTypes.fetchJobStatusSuccess,
          jobStatus: resolveJobStatus(json),
        })
      })
      .catch(error => {
        dispatch({ type: actionTypes.fetchJobFailure, error })
      })
  }, [state.job])

  React.useEffect(() => {
    if (!state.job.length || !state.jobStatus.length) return

    dispatch({
      type: actionTypes.gridDataLoaded,
      data: resolveJobItems(state.job, state.jobStatus),
    })
  }, [state.job, state.jobStatus])

  const togglePinColumns = () => {
    const isPinned = state.pinned
    dispatch({ type: actionTypes.togglePinColumns })

    if (!dataGrid.columnApi) return

    if (!isPinned) {
      return dataGrid.columnApi.setColumnPinned('Ctnr_No', 'left')
    }

    const allColumns = dataGrid.columnApi.getColumnState()
    allColumns.forEach(column => {
      dataGrid.columnApi.setColumnPinned(column.colId, null)
    })
  }

  const downloadExcel = () => {
    if (!state.job.length || !dataGrid.columnApi) return
    const allColumns = dataGrid.columnApi.getColumnState()
    const header = allColumns.map(col => col.colId)

    const json = state.job.map(doc => omit(doc, ['id']))

    writeXlsx(json, header)
  }

  return (
    <div>
      <DetailTopBar
        dataGrid={dataGrid}
        pinned={state.pinned}
        togglePinColumns={togglePinColumns}
        downloadExcel={downloadExcel}
      />
      <DetailGrid rowData={state.gridData} setDataGrid={setDataGrid} />
      <DetailBottomBar
        fetching={state.fetching}
        fetchError={state.fetchError}
      />
    </div>
  )
}

export default HistoryDetail
