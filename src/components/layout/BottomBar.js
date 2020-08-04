import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import theme from 'styled-theming'
import { colors } from '../../constants'

const borderColor = theme('mode', {
  light: colors.gray[300],
  dark: colors.gray[700],
})

const fgColor = theme('mode', {
  light: colors.gray[700],
  dark: colors.gray[300],
})

const infoFgColor = theme('mode', {
  light: colors.indigo[600],
  dark: colors.indigo[500],
})

const successFgColor = theme('mode', {
  light: colors.teal[600],
  dark: colors.teal[500],
})

const dangerFgColor = theme('mode', {
  light: colors.pink[600],
  dark: colors.pink[500],
})

const disabledBgColor = theme('mode', {
  light: colors.gray[300],
  dark: colors.gray[800],
})

const hoverBgColor = theme('mode', {
  light: colors.gray[300],
  dark: colors.gray[800],
})

const activeBgColor = theme('mode', {
  light: colors.gray[200],
  dark: colors.gray[800],
})

const Wrapper = styled.nav`
  border-top: 1px solid ${borderColor};
  color: ${fgColor};
  width: 100%;

  display: flex;

  ul {
    display: flex;

    &:first-child {
      flex-grow: 1;
    }

    li {
      list-style: none;
      margin: 1rem;

      a {
        border-radius: 4px;
        height: 4rem;
        padding: 1rem;
        text-decoration: none;
        transition: all 0.8s ease-out;

        display: flex;
        align-items: center;

        span {
          margin-left: 1.5rem;
        }

        &:hover {
          background-color: ${hoverBgColor};
          cursor: pointer;
        }

        &.active {
          background-color: ${hoverBgColor};
        }
      }

      button {
        background-color: transparent;
        border-radius: 4px;
        border: none;
        height: 4rem;
        outline: none;
        padding: 1rem;
        transition: all 1s ease-out;

        justify-content: center;
        align-items: center;

        span {
          margin-left: 1rem;
        }

        &:disabled {
          background-color: ${disabledBgColor};

          &:hover {
            cursor: not-allowed;
          }
        }

        &:hover {
          background-color: ${hoverBgColor};

          cursor: pointer;
        }

        &.active {
          background-color: ${activeBgColor};
        }
      }

      &.status {
        padding: 0 1rem;

        display: flex;
        align-items: center;
      }
    }

    .info:not([disabled]) {
      color: ${infoFgColor};
    }

    .success:not([disabled]) {
      color: ${successFgColor};
    }

    .danger:not([disabled]) {
      color: ${dangerFgColor};
    }
  }
`

const BottomBar = ({ children }) => {
  return <Wrapper>{children}</Wrapper>
}

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
}

export default BottomBar
