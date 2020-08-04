import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import theme from 'styled-theming'
import { colors } from '../../constants'

const bgColor = theme('mode', {
  light: colors.gray[300],
  dark: colors.gray[800],
})

const borderColor = theme('mode', {
  light: colors.gray[400],
  dark: colors.gray[700],
})

const hoverBgColor = theme('mode', {
  light: colors.indigo[600],
  dark: colors.gray[900],
})

const activeBgColor = theme('mode', {
  light: colors.indigo[600],
  dark: colors.gray[900],
})

const fgColor = theme('mode', {
  light: colors.gray[700],
  dark: colors.gray[300],
})

const hoverFgColor = theme('mode', {
  light: colors.gray[300],
  dark: colors.gray[300],
})

const activeFgColor = theme('mode', {
  light: colors.gray[300],
  dark: colors.gray[300],
})

const primeColor = theme('mode', {
  light: colors.indigo[600],
  dark: colors.indigo[500],
})

const Wrapper = styled.nav`
  background-color: ${bgColor};
  color: ${fgColor};
  height: 100vh;
  min-width: 22rem;

  float: left;
  position: fixed;
  left: 6rem;
  display: flex;
  flex-direction: column;

  ul {
    &:first-child {
      flex-grow: 1;
    }

    li {
      list-style: none;
      margin: 1rem;

      &.divider {
        background-color: ${borderColor};
        height: 1px;
        margin-left: 0;
        margin-right: 0;
      }

      .heading {
        color: ${primeColor};
        height: 4rem;
        padding: 1rem;

        display: flex;
        align-items: center;
      }

      a {
        border-radius: 4px;
        height: 4rem;
        padding: 1rem;
        text-decoration: none;

        display: flex;
        align-items: center;

        span {
          margin-left: 1.5rem;
        }

        &:hover {
          color: ${hoverFgColor};
          background-color: ${hoverBgColor};
          cursor: pointer;
        }

        &.active {
          color: ${activeFgColor};
          background-color: ${activeBgColor};
        }

        &.disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }
      }

      button {
        background-color: transparent;
        border-radius: 4px;
        border: none;
        display: block;
        height: 4rem;
        outline: none;
        padding: 1rem;
        text-align: left;
        width: 100%;

        justify-content: center;
        align-items: center;

        span {
          margin-left: 1rem;
        }

        &:hover {
          background-color: ${hoverBgColor};
          cursor: pointer;
        }

        &.disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }
      }
    }
  }
`

const SubNav = ({ children }) => {
  return <Wrapper>{children}</Wrapper>
}

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
}

export default SubNav
