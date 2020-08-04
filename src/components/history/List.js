import React from 'react'
import styled from 'styled-components/macro'
import theme from 'styled-theming'
import ListTopBar from './ListTopBar'
import { colors } from '../../constants'
import { Lightbulb as HintIcon } from 'styled-icons/fa-regular/Lightbulb'

const infoFgColor = theme('mode', {
  light: colors.indigo[600],
  dark: colors.indigo[500],
})

const Wrapper = styled.div`
  height: 100vh;

  .body {
    height: 100%;
    text-align: center;

    display: flex;
    align-items: center;
    justify-content: center;

    color: ${infoFgColor};

    h2 {
      color: ${infoFgColor};
      font-size: 3rem;
      margin-top: 1.5rem;
    }

    p {
      margin-top: 1rem;
      font-size: 1.5rem;
    }
  }
`

const HistoryList = () => {
  return (
    <Wrapper>
      <ListTopBar />
      <div className="body">
        <p>Click on an item on the left to see more detail...</p>
        <HintIcon size={180} />
      </div>
    </Wrapper>
  )
}

export default HistoryList
