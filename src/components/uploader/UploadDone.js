import React from 'react'
import { CheckShield as UploadDoneIcon } from 'styled-icons/boxicons-solid/CheckShield'
import styled from 'styled-components/macro'
import theme from 'styled-theming'
import { colors } from '../../constants'
import FoldingCubeLoader from '../../components/layout/FoldingCubeLoader'

const successFgColor = theme('mode', {
  light: colors.teal[600],
  dark: colors.teal[500],
})

const Wrapper = styled.div`
  text-align: center;

  svg {
    color: ${successFgColor};
  }

  h2 {
    color: ${successFgColor};
    font-size: 3rem;
    margin-top: 1.5rem;
  }

  p {
    margin-top: 1rem;
    font-size: 1.5rem;
  }
`

const UploadDone = () => {
  return (
    <Wrapper>
      <UploadDoneIcon size={180} />
      <h2>Upload Complete</h2>
      <p>You will be redirected shortly...</p>
      <FoldingCubeLoader />
    </Wrapper>
  )
}

export default UploadDone
