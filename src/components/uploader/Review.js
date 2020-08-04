import React from 'react'
import { Redirect } from 'react-router-dom'
import { get } from 'lodash'
import styled from 'styled-components/macro'
import { UploaderContext } from '../../contexts/uploader'
import CmdGridTopBar from './CmdGridTopBar'
import ReviewGrid from './ReviewGrid'
import ReviewBottomBar from './ReviewBottomBar'

const Wrapper = styled.div`
  min-height: 100vh;

  display: flex;
  flex-direction: column;
`

const Review = () => {
  const { state } = React.useContext(UploaderContext)

  if (!get(state, 'sheet.data.length', 0)) return <Redirect to="/uploader/" />
  if (!get(state, 'sheet.valid', false))
    return <Redirect to="/uploader/modify" />

  return (
    <Wrapper>
      <CmdGridTopBar />
      <ReviewGrid />
      <ReviewBottomBar />
    </Wrapper>
  )
}

export default Review
