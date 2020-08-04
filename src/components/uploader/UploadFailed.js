import React from 'react'
import PropTypes from 'prop-types'
import { SmsFailed as UploadFailedIcon } from 'styled-icons/material/SmsFailed'
import styled from 'styled-components/macro'
import theme from 'styled-theming'
import { colors } from '../../constants'

const dangerFgColor = theme('mode', {
  light: colors.pink[600],
  dark: colors.pink[500],
})

const Wrapper = styled.div`
  text-align: center;

  svg {
    color: ${dangerFgColor};
  }

  h2 {
    color: ${dangerFgColor};
    font-size: 3rem;
    margin-top: 1.5rem;
  }

  p {
    margin-top: 1rem;
    font-size: 1.5rem;
  }
`

const UploadFailed = (error = {}) => {
  return (
    <Wrapper>
      <UploadFailedIcon size={180} />
      <h2>Upload Failed</h2>
      <p>Please try again later or contact the admin for help</p>
    </Wrapper>
  )
}

UploadFailed.propTypes = {
  error: PropTypes.object,
}

export default UploadFailed
