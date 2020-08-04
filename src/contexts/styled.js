import { ThemeProvider } from 'styled-components'
import React, { useContext } from 'react'
import { ThemeContext } from './theme'

import PropTypes from 'prop-types'

const StyledProvider = ({ children }) => {
  const { theme } = useContext(ThemeContext)

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

StyledProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { StyledProvider }
