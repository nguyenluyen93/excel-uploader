import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import theme from 'styled-theming'
import TopBar from '../layout/TopBar'
import { colors } from '../../constants'

import { Dashboard as AutoSizingIcon } from 'styled-icons/material/Dashboard'
import { Columns as AutoFitIcon } from 'styled-icons/boxicons-regular/Columns'
import { Pin as PinIcon } from 'styled-icons/typicons/Pin'
import { PinOutline as UnpinIcon } from 'styled-icons/typicons/PinOutline'
import { DockLeft as WiderIcon } from 'styled-icons/boxicons-regular/DockLeft'
import { DockLeft as NarrowerIcon } from 'styled-icons/boxicons-solid/DockLeft'
import { Download as DownloadIcon } from 'styled-icons/boxicons-solid/Download'

const activeFgColor = theme('mode', {
  light: colors.indigo[600],
  dark: colors.indigo[500],
})

const ActiveButton = styled.button`
  color: ${activeFgColor};
`

const StyledDetailTopBar = ({
  pinned,
  theme,
  togglePinColumns,
  toggleWideMode,
  autoSizing,
  autoFit,
  downloadExcel,
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
        <li>
          <button onClick={downloadExcel}>
            <DownloadIcon size="24" />
            <span>Download</span>
          </button>
        </li>
      </ul>
      <ul>
        <li>
          {pinned ? (
            <ActiveButton onClick={togglePinColumns}>
              <PinIcon size="24" />
              <span>Pin / Unpin</span>
            </ActiveButton>
          ) : (
            <button onClick={togglePinColumns}>
              <UnpinIcon size="24" />
              <span>Pin / Unpin</span>
            </button>
          )}
        </li>
        <li>
          <button onClick={autoSizing}>
            <AutoSizingIcon size="24" />
            <span>AutoSizing</span>
          </button>
        </li>
        <li>
          <button onClick={autoFit}>
            <AutoFitIcon size="24" />
            <span>AutoFit</span>
          </button>
        </li>
      </ul>
    </TopBar>
  )
}

StyledDetailTopBar.propTypes = {
  pinned: PropTypes.bool.isRequired,
  theme: PropTypes.object.isRequired,
  togglePinColumns: PropTypes.func.isRequired,
  toggleWideMode: PropTypes.func.isRequired,
  autoSizing: PropTypes.func.isRequired,
  autoFit: PropTypes.func.isRequired,
  downloadExcel: PropTypes.func.isRequired,
}

export default StyledDetailTopBar
