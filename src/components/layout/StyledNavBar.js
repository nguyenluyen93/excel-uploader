import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { NavLink } from 'react-router-dom'
import { MediumOld as HomeIcon } from 'styled-icons/boxicons-logos/MediumOld'
import { BrightnessMedium as ToggleDarkModeIcon } from 'styled-icons/material/BrightnessMedium'
import { Upload as UploadIcon } from 'styled-icons/typicons/Upload'
import { ViewList as HistoryIcon } from 'styled-icons/material/ViewList'
import { PowerOff as LogoutIcon } from 'styled-icons/fa-solid/PowerOff'
import theme from 'styled-theming'
import { colors } from '../../constants'



const bgColor = theme('mode', {
  light: colors.indigo[600],
  dark: colors.gray[900],
})

const fgColor = theme('mode', {
  light: colors.gray[100],
  dark: colors.gray[200],
})

const primeColor = theme('mode', {
  light: colors.gray[200],
  dark: colors.indigo[500],
})

const hoverBgColor = theme('mode', {
  light: colors.indigo[500],
  dark: colors.gray[800],
})




const Wrapper = styled.nav`
  background-color: ${bgColor};
  color: ${fgColor};
  height: 100vh;

  float: left;
  position: fixed;
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
        height: 1px;
        background-color: ${fgColor};
        opacity: 0.2;
      }

      a {
        border-radius: 9999px;
        color: ${fgColor};
        height: 4rem;
        opacity: 0.5;
        transition: all 0.8s ease-out;
        width: 4rem;

        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
          background-color: ${hoverBgColor};
          cursor: pointer;
        }

        &.active {
          color: ${primeColor};
          opacity: 1;
        }

        &.primary {
          color: ${primeColor};
          opacity: 1;
        }

        &.heading {
          opacity: 1;
        }
      }

      button {
        background-color: transparent;
        border: none;
        border-radius: 9999px;
        color: ${fgColor};
        height: 4rem;
        opacity: 0.5;
        outline: none;
        transition: all 1s ease-out;
        width: 4rem;

        justify-content: center;
        align-items: center;

        &:hover {
          background-color: ${hoverBgColor};
          cursor: pointer;
          opacity: 1;
        }
      }
    }
  }
`

const StyledNavBar = ({ theme, onLogout, onToggleDarkMode }) => {
  return (
    <Wrapper>
      <ul>
        <li>
          <NavLink className="primary heading" exact to="/">
            <HomeIcon size="24" title="Home" />
          </NavLink>
        </li>
        <li className="divider" />
        <li>
          <NavLink to="/uploader/">
            <UploadIcon size="24" title="Upload" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/history/">
            <HistoryIcon size="24" title="History" />
          </NavLink>
        </li>
        <li>
          <button onClick={onToggleDarkMode}>
            <ToggleDarkModeIcon
              size="24"
              title={theme.mode === 'light' ? 'Dark Mode' : 'Light Mode'}s
            />
          </button>
        </li>
      </ul>
      <ul>
        <li>
          <button onClick={onLogout}>
            <LogoutIcon size="20" title="Logout" />
          </button>
        </li>
      </ul>
    </Wrapper>
  )
}

StyledNavBar.propTypes = {
  theme: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired,
  onToggleDarkMode: PropTypes.func.isRequired,
}

export default StyledNavBar
