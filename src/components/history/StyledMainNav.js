import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import theme from 'styled-theming'
import { NavLink } from 'react-router-dom'
import { format } from 'date-fns'
import { colors } from '../../constants'
import { Note as DocumentIcon } from 'styled-icons/octicons/Note'

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

const dangerColor = theme('mode', {
  light: colors.pink[600],
  dark: colors.pink[500],
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

      &.heading {
        color: ${primeColor};
        height: 4rem;
        padding: 1rem;

        display: flex;
        align-items: center;
      }

      &.sub-heading {
        padding: 1rem;
      }

      &.error {
        padding: 1rem;
        color: ${dangerColor};
      }

      &.item {
        margin: 0;
        border-top: 1px solid ${borderColor};

        &:last-child {
          border-bottom: 1px solid ${borderColor};
        }

        a {
          font-size: 1.3rem;
          height: 6rem;
          padding: 1rem 2rem;
          text-decoration: none;

          display: flex;
          align-items: center;

          svg {
            margin-right: 1.5rem;
          }

          .primary {
            font-size: 1.4rem;
            font-weight: 500;
            margin-bottom: 0.4rem;
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
      }
    }
  }
`

const StyledMainNav = ({ jobs, fetchError, fetching }) => {
  return (
    <Wrapper>
      <ul style={{ width: '30rem' }}>
        <li className="heading">
          <h2>My Upload History</h2>
        </li>
        <li className="divider" />
        <li className="sub-heading">
          <span>List of {jobs.length} jobs upload recently.</span>
        </li>
        {!!fetchError && (
          <li className="error">
            Cannot fetch data from remote server. {fetchError.message}.
          </li>
        )}
        {jobs.map(job => (
          <li className="item" key={job.id}>
            <NavLink exact to={`/history/${job.id}`}>
              <DocumentIcon size="24" />
              <div>
                <div className="primary">— {job.id}</div>
                <div>
                  {format(new Date(job.createdAt), `DD-MM-YYYY HH:mm:ss`)} ·{' '}
                  {job.itemsCount} item(s)
                </div>
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
    </Wrapper>
  )
}

StyledMainNav.propTypes = {
  jobs: PropTypes.array.isRequired,
  fetching: PropTypes.bool.isRequired,
  fetchError: PropTypes.object,
}

export default StyledMainNav
