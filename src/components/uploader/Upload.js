import React from 'react'
import styled from 'styled-components/macro'
import { Redirect } from 'react-router-dom'
import { UploaderContext } from '../../contexts/uploader'
import UploadDone from './UploadDone'
import UploadFailed from './UploadFailed'
import UploadProgress from './UploadProgress'

const Wrapper = styled.div`
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`

const Upload = () => {
  const {
    state: {
      sheet,
      uploader: { loading, error },
    },
  } = React.useContext(UploaderContext)

  const hasNoData = !sheet.data.length
  const hasErrors = Object.keys(sheet.errors || {}).length > 0
  const hasWarns = Object.keys(sheet.reviewErrors || {}).length > 0

  if (hasNoData || hasErrors || hasWarns)
    return <Redirect to="/uploader/modify/" />

  return (
    <Wrapper>
      {loading && <UploadProgress />}
      {!loading && !error && <UploadDone />}
      
      {!loading && !!error && <UploadFailed />}
    </Wrapper>
  )
}

export default Upload
