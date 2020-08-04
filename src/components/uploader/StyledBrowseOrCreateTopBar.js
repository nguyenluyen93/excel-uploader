import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import TopBar from '../layout/TopBar'

import { DockLeft as WiderIcon } from 'styled-icons/boxicons-regular/DockLeft'
import { DockLeft as NarrowerIcon } from 'styled-icons/boxicons-solid/DockLeft'
import { FileFind as BrowseIcon } from 'styled-icons/boxicons-regular/FileFind'
import { FilePlus as CreateIcon } from 'styled-icons/boxicons-solid/FilePlus'

const StyledBrowseOrCreateTopBar = ({
  theme,
  createNewDocument,
  toggleWideMode,
}) => {
  return (
    <TopBar>
      <ul>
        <li>
          <button onClick={toggleWideMode}>
            {theme.wide ? <NarrowerIcon size="24" /> : <WiderIcon size="24" />}
            <span>{theme.wide ? 'Narrow' : 'Widen'}</span>
          </button>
        </li>
      </ul>
      <ul>
        <li>
          <NavLink exact to="/uploader/">
            <BrowseIcon size="24" />
            <span>Browse</span>
          </NavLink>
        </li>
        <li>
          <button onClick={createNewDocument}>
            <CreateIcon size="24" />
            <span>Create new</span>
          </button>
        </li>
      </ul>
    </TopBar>
  )
}

StyledBrowseOrCreateTopBar.propTypes = {
  theme: PropTypes.object.isRequired,
  createNewDocument: PropTypes.func.isRequired,
  toggleWideMode: PropTypes.func.isRequired,
}

export default StyledBrowseOrCreateTopBar
