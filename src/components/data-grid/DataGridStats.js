import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import theme from 'styled-theming'
import { colors } from '../../constants'

import { CheckCircle as SuccessIcon } from 'styled-icons/fa-solid/CheckCircle'
import { Error as ErrorIcon } from 'styled-icons/boxicons-solid/Error'

const infoFgColor = theme('mode', {
  light: colors.indigo[600],
  dark: colors.indigo[500],
})

const errorFgColor = theme('mode', {
  light: colors.pink[600],
  dark: colors.pink[500],
})

const warnFgColor = theme('mode', {
  light: colors.orange[600],
  dark: colors.orange[500],
})

const successFgColor = theme('mode', {
  light: colors.teal[600],
  dark: colors.teal[500],
})

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  margin-bottom: 2rem;

  .message {
    display: flex;
    align-items: center;

    span {
      margin-left: 0.5rem;
    }

    &.info {
      color: ${infoFgColor};
    }

    &.error {
      color: ${errorFgColor};
    }

    &.warn {
      color: ${warnFgColor};
    }

    &.success {
      color: ${successFgColor};
    }
  }
`

const DataGridStats = ({ errorsCount, warnsCount, totalRows }) => {
  return (
    <Wrapper>
      {!!warnsCount && (
        <div className="message warn">
          <ErrorIcon size={14} />
          <span>{warnsCount} warn(s) found on this document.</span>
        </div>
      )}
      {!!errorsCount && (
        <div className="message error">
          <ErrorIcon size={14} />
          <span>{errorsCount} error(s) found on this document.</span>
        </div>
      )}
      {!warnsCount && !errorsCount && (
        <div className="message success">
          <SuccessIcon size={14} />
          <span>No error found.</span>
        </div>
      )}
      <div className="message info">Displaying {totalRows} records.</div>
    </Wrapper>
  )
}

DataGridStats.propTypes = {
  errorsCount: PropTypes.number,
  warnsCount: PropTypes.number,
  totalRows: PropTypes.number.isRequired,
}

export default DataGridStats
