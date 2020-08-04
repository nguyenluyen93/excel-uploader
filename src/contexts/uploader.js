import React, { createContext, useReducer } from 'react'
import PropTypes from 'prop-types'
import {
  initialSheet,
  initialDataGrid,
  initialMasterData,
  initialUploader,
} from '../constants'
import reducer from '../reducers/uploader'
import tryParseJson from '../utils/tryParseJson'

const UploaderContext = createContext()

const initialState = {
  selectedRowId: null,
  showErrorsOnly: false,
  sheet: tryParseJson(window.localStorage.getItem('sheet')) || initialSheet,
  dataGrid: initialDataGrid,
  master: initialMasterData,
  uploader: initialUploader,
}

const UploaderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <UploaderContext.Provider value={{ state, dispatch }}>
      {children}
    </UploaderContext.Provider>
  )
}

UploaderProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { UploaderContext, UploaderProvider }
