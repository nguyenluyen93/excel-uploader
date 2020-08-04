import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import theme from 'styled-theming'
import NavBar from './NavBar'
import { colors } from '../../constants'

const bgColor = theme('mode', {
  light: colors.gray[100],
  dark: colors.gray[900],
})

const fgColor = theme('mode', {
  light: colors.gray[800],
  dark: colors.gray[300],
})

const Wrapper = styled.div`
  background-color: ${bgColor};
  color: ${fgColor};
  min-height: 100vh;

  button {
    font-size: 1.4rem;
  }
`

const Layout = ({ children }) => {
  return (
    <Wrapper spellCheck="false">
      <NavBar />
      <div>{children}</div>
    </Wrapper>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
