import React from 'react'
import styled from 'styled-components/macro'
import { ThemeContext } from '../contexts/theme'
import Routes from '../components/history/Routes'
import MainNav from '../components/history/MainNav'

const Wrapper = styled.div`
  margin-left: ${props => (props.wide ? '6rem' : '36rem')};
  height: 100vh;
  overflow: hidden;

  display: flex;
  flex-direction: column;
`

const History = () => {
  const { theme } = React.useContext(ThemeContext)

  return (
    <Wrapper wide={theme.wide}>
      {!theme.wide && <MainNav />}
      <Routes />
    </Wrapper>
  )
}

export default History
