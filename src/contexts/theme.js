import React, { createContext, useReducer, useEffect } from 'react'
import PropTypes from 'prop-types'
import reducer from '../reducers/theme'

const ThemeContext = createContext()

const initialTheme = JSON.parse(
  window.localStorage.getItem('theme') ||
    JSON.stringify({
      mode: 'light',
      wide: false,
    }),
)

const ThemeProvider = ({ children }) => {
  const [theme, dispatch] = useReducer(reducer, initialTheme)

  useEffect(() => {
    window.localStorage.setItem('theme', JSON.stringify(theme))
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, dispatch }}>
      {children}
    </ThemeContext.Provider>
  )
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { ThemeContext, ThemeProvider }
