import React from 'react'
import { Redirect } from 'react-router-dom'
import { get } from 'lodash'
import styled from 'styled-components/macro'
import { UploaderContext } from '../../contexts/uploader'
import CmdGridTopBar from './CmdGridTopBar'
import ModifyGrid from './ModifyGrid'
import ModifyBottomBar from './ModifyBottomBar'

const Wrapper = styled.div`
  min-height: 100vh;

  display: flex;
  flex-direction: column;
`

const Modify = () => {
  const { state } = React.useContext(UploaderContext)

  if (!get(state, 'sheet.data.length', 0)) return <Redirect to="/uploader/" />

  return (
    <Wrapper>
      <CmdGridTopBar />
      <ModifyGrid />
      <ModifyBottomBar />
    </Wrapper>
  )
}

export default Modify
