import React from 'react'
import styled from 'styled-components/macro'
import { ThemeContext } from '../contexts/theme'
import MainNav from '../components/uploader/MainNav'
import Routes from '../components/uploader/Routes'
import { UploaderProvider } from '../contexts/uploader'

const Wrapper = styled.div`
  margin-left: ${props => (props.wide ? '6rem' : '28rem')};
  height: 100vh;
  overflow: hidden;

  display: flex;
  flex-direction: column;
`

const Uploader = () => {
  const { theme } = React.useContext(ThemeContext)

  return (
    <UploaderProvider>
      <Wrapper wide={theme.wide}>
        {!theme.wide && <MainNav />}
        <Routes />
      </Wrapper>
    </UploaderProvider>
  )
}

export default Uploader
