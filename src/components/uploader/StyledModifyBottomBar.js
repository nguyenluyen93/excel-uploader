import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import BottomBar from '../layout/BottomBar'

import { PlaylistAdd as NewRowIcon } from 'styled-icons/material/PlaylistAdd'
import { Delete as DeleteRowIcon } from 'styled-icons/typicons/Delete'
import { RightArrowSquare as NextIcon } from 'styled-icons/boxicons-solid/RightArrowSquare'

const StyledModifyBottomBar = ({
  fetching,
  fetchError,
  selectedRowId,
  sheetValid,
  createNewRow,
  removeSelectedRow,
}) => {
  return (
    <BottomBar>
      <ul>
        <li>
          <button className="success" onClick={createNewRow}>
            <NewRowIcon size="24" />
            <span>New row</span>
          </button>
        </li>
        <li>
          <button
            className={selectedRowId ? 'danger' : ''}
            disabled={!selectedRowId}
            onClick={removeSelectedRow}
          >
            <DeleteRowIcon size="24" />
            <span>Remove selected</span>
          </button>
        </li>
        <li className={`status ${fetchError ? 'danger' : ''}`}>
          {fetching && <span>Fetching master data...</span>}
          {fetchError && (
            <span>Failed to fetch master data: {fetchError.message}.</span>
          )}
        </li>
      </ul>
      <ul>
        <li>
          {sheetValid ? (
            <NavLink className="success" to="/uploader/review/">
              <NextIcon size="24" />
              <span>Review</span>
            </NavLink>
          ) : (
            <button disabled>
              <NextIcon size="24" />
              <span>Review</span>
            </button>
          )}
        </li>
      </ul>
    </BottomBar>
  )
}

StyledModifyBottomBar.propTypes = {
  fetching: PropTypes.bool.isRequired,
  fetchError: PropTypes.object,
  selectedRowId: PropTypes.string,
  sheetValid: PropTypes.bool.isRequired,
  createNewRow: PropTypes.func.isRequired,
  removeSelectedRow: PropTypes.func.isRequired,
}

export default StyledModifyBottomBar
