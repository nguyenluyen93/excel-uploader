import React from 'react'
import { Redirect } from 'react-router-dom'
import { get } from 'lodash'
import { UploaderContext } from '../../contexts/uploader'
import BrowseOrCreateTopBar from './BrowseOrCreateTopBar'
import Browse from './Browse'

const BrowseOrCreate = () => {
  const { state } = React.useContext(UploaderContext)

  if (get(state, 'sheet.data.length', 0))
    return <Redirect to="/uploader/modify/" />

  return (
    <>
      <BrowseOrCreateTopBar />
      <Browse />
    </>
  )
}

export default BrowseOrCreate
