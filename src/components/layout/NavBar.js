import React, { useContext } from 'react'
import StyledNavBar from './StyledNavBar'
import { AuthContext } from '../../contexts/auth'
import { ThemeContext } from '../../contexts/theme'
import { actionTypes } from '../../reducers/theme'
import getToaster from '../../utils/getToaster'

const toaster = getToaster()

const NavBar = () => {
  const { auth, setAuth } = useContext(AuthContext)
  const { theme, dispatch } = useContext(ThemeContext)

  const logout = () => {
    setAuth(null)
    toaster.info('You are logged out. Bye :)')
  }

  const toggleDarkMode = () => {
    dispatch({ type: actionTypes.toggleDarkMode })
  }

  return (
    auth && (
      <StyledNavBar
        theme={theme}
        onLogout={logout}
        onToggleDarkMode={toggleDarkMode}
      />
    )
  )
}

export default NavBar
