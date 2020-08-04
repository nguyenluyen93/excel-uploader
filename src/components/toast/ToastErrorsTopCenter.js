import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

import { Error as ErrorIcon } from 'styled-icons/boxicons-solid/Error'

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  ul {
    line-height: 1.8rem;
    margin-left: 2.6rem;
  }
`

const ToastErrorsTopCenter = ({ errors = [] }) => {
  return (
    <Wrapper>
      <ErrorIcon size={30} />
      <ul>
        {errors.map(e => (
          <li key={e.message}>{e.message}</li>
        ))}
      </ul>
    </Wrapper>
  )
}

ToastErrorsTopCenter.propTypes = {
  errors: PropTypes.array.isRequired,
}

export default ToastErrorsTopCenter
