import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { useDropzone } from 'react-dropzone'
import { get } from 'lodash'
import cuid from 'cuid'
import getToaster from '../../utils/getToaster'
import { UploaderContext } from '../../contexts/uploader'
import { actionTypes } from '../../reducers/uploader'
import { sheetKinds } from '../../constants'
import StyledBrowse from './StyledBrowse'
import getSheetDataAsXlsx from './helpers/getSheetDataAsXlsx'
import parseSheetDataAsXlsx2Json from './helpers/parseSheetDataAsXlsx2Json'
import validateSheetData from './helpers/containers/validateSheetData'

const toaster = getToaster()

const Browse = ({ history }) => {
  const { dispatch } = React.useContext(UploaderContext)

  const onDrop = React.useCallback(
    async files => {
      const file = get(files, '[0]')

      if (file) {
        try {
          const rawSheet = await getSheetDataAsXlsx(file)
          const json = parseSheetDataAsXlsx2Json(rawSheet).map(row => ({
            ...row,
            id: cuid(),
          }))
          validateSheetData(json, { throwIfInvalidFile: true })

          dispatch({
            type: actionTypes.sheetLoaded,
            kind: sheetKinds.containers,
            data: json,
          })

          history.push('/uploader/modify/')

          toaster.success(
            `Your file is loaded successfully. (${json.length} rows)`,
          )
        } catch (e) {
          toaster.error('Error parsing file: ' + e.message)
        }
      }
    },
    [history, dispatch],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  })

  return (
    <StyledBrowse
      isDragActive={isDragActive}
      getRootProps={getRootProps}
      getInputProps={getInputProps}
    />
  )
}

Browse.propTypes = {
  history: PropTypes.object.isRequired,
}

export default withRouter(Browse)
