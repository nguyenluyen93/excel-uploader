import React from 'react'
import TopBar from '../layout/TopBar'
import { ThemeContext } from '../../contexts/theme'
import { actionTypes } from '../../reducers/theme'
import { DockLeft as WiderIcon } from 'styled-icons/boxicons-regular/DockLeft'
import { DockLeft as NarrowerIcon } from 'styled-icons/boxicons-solid/DockLeft'

const ListTopBar = () => {
  const { theme, dispatch } = React.useContext(ThemeContext)

  const toggleWideMode = () => {
    dispatch({ type: actionTypes.toggleWideMode })
  }

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
    </TopBar>
  )
}

export default ListTopBar
