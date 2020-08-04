import React from 'react'
import styled from 'styled-components/macro'
import theme from 'styled-theming'
import { colors } from '../../constants'
import FoldingCubeLoader from '../../components/layout/FoldingCubeLoader'

const infoFgColor = theme('mode', {
  light: colors.indigo[600],
  dark: colors.indigo[500],
})

const Wrapper = styled.div`
  text-align: center;

  svg {
    color: ${infoFgColor};
  }

  h2 {
    color: ${infoFgColor};
    font-size: 3rem;
    margin-top: 1.5rem;
  }

  p {
    margin-top: 1rem;
    font-size: 1.5rem;
  }
`

const UploadProgress = () => {
  return (
    <Wrapper>
      <FoldingCubeLoader />
      <h2>Work in progress...</h2>
      <p>Please be patient while we get your work done...</p>
    </Wrapper>
  )
}

export default UploadProgress
