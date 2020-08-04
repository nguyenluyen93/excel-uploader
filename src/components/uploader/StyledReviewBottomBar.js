import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import BottomBar from '../layout/BottomBar'

import { LeftArrowSquare as PrevIcon } from 'styled-icons/boxicons-solid/LeftArrowSquare'
import { RightArrowSquare as NextIcon } from 'styled-icons/boxicons-solid/RightArrowSquare'

const StyledModifyBottomBar = ({
  fetching,
  fetchError,
  hasVesselInfos,
  sheetValid,
  doUpload,
}) => {
  return (
    <BottomBar>
      <ul>
        <li>
          <NavLink className="success" to="/uploader/modify/">
            <PrevIcon size="24" />
            <span>Modify</span>
          </NavLink>
        </li>
        <li
          className={`status ${fetchError || !hasVesselInfos ? 'danger' : ''}`}
        >
          {!fetching && !fetchError && hasVesselInfos && (
            <span>You cannot edit in this page (read-only mode).</span>
          )}
          {!fetching && !fetchError && !hasVesselInfos && (
            <span>Vessel infos are not available.</span>
          )}
          {fetching && <span>Fetching master data...</span>}
          {fetchError && (
            <span>Failed to fetch remote data: {fetchError.message}.</span>
          )}
        </li>
      </ul>
      <ul>
        <li>
          <button className="success" onClick={doUpload} disabled={!sheetValid}>
            <NextIcon size="24" />
            <span>Upload</span>
          </button>
        </li>
      </ul>
    </BottomBar>
  )
}

StyledModifyBottomBar.propTypes = {
  fetching: PropTypes.bool.isRequired,
  fetchError: PropTypes.object,
  hasVesselInfos: PropTypes.bool.isRequired,
  sheetValid: PropTypes.bool.isRequired,
  doUpload: PropTypes.func.isRequired,
}

export default StyledModifyBottomBar
