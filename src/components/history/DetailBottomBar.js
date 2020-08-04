import React from 'react'
import PropTypes from 'prop-types'
import BottomBar from '../layout/BottomBar'

const DetailBottomBar = ({ fetching, fetchError }) => {
  return (
    <BottomBar>
      <ul>
        <li className={`status ${fetchError ? 'danger' : ''}`}>
          {fetching && <span>Fetching data from remote server...</span>}
          {fetchError && (
            <span>Failed to fetch master data: {fetchError.message}.</span>
          )}
          {!fetching && !fetchError && (
            <span>You cannot edit in this page (read-only mode).</span>
          )}
        </li>
      </ul>
    </BottomBar>
  )
}

DetailBottomBar.propTypes = {
  fetching: PropTypes.bool.isRequired,
  fetchError: PropTypes.object,
}

export default DetailBottomBar
