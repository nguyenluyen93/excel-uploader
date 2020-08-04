import React from 'react'
import StyledMainNav from './StyledMainNav'
import { AuthContext } from '../../contexts/auth'
import fetchJobs from './helpers/fetchJobs'

const initialState = {
  jobs: [],
  fetchError: null,
  fetching: false,
}

const actionTypes = {
  fetchBegin: 'fetchBegin',
  fetchSuccess: 'fetchSuccess',
  fetchFailure: 'fetchFailure',
}

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.fetchBegin:
      return {
        ...state,
        fetchError: null,
        fetching: true,
      }
    case actionTypes.fetchSuccess:
      return {
        ...state,
        fetchError: null,
        fetching: false,
        jobs: action.jobs,
      }
    case actionTypes.fetchFailure:
      return {
        ...state,
        fetchError: action.error,
        fetching: false,
      }
    default:
      break
  }
}

const MainNav = () => {
  const { auth } = React.useContext(AuthContext)
  const [state, dispatch] = React.useReducer(reducer, initialState)

  React.useEffect(() => {
    if (!auth) return

    dispatch({ type: actionTypes.fetchBegin })
    fetchJobs(auth)
      .then(json => {
        dispatch({ type: actionTypes.fetchSuccess, jobs: json })
      })
      .catch(error => {
        dispatch({ type: actionTypes.fetchFailure, error })
      })
  }, [auth, dispatch])

  return <StyledMainNav {...state} />
}

export default MainNav
