import React from 'react'
import cuid from 'cuid'
import { withRouter } from 'react-router'
import { ThemeContext } from '../../contexts/theme'
import { actionTypes as themeActTypes } from '../../reducers/theme'
import { UploaderContext } from '../../contexts/uploader'
import { sheetKinds } from '../../constants'
import { actionTypes as uploaderActTypes } from '../../reducers/uploader'
import StyledBrowseOrCreateTopBar from './StyledBrowseOrCreateTopBar'

const BrowseOrCreateTopBar = ({ history }) => {
  const { theme, dispatch: themeDp } = React.useContext(ThemeContext)
  const { dispatch: uploaderDp } = React.useContext(UploaderContext)

  const toggleWideMode = () => {
    themeDp({ type: themeActTypes.toggleWideMode })
  }

  const createNewDocument = () => {
    uploaderDp({
      type: uploaderActTypes.sheetLoaded,
      kind: sheetKinds.containers,
      data: [{ id: cuid() }],
    })
    setTimeout(() => {
      history.push('/uploader/modify/')
    }, 800)
  }

  return (
    <StyledBrowseOrCreateTopBar
      theme={theme}
      toggleWideMode={toggleWideMode}
      createNewDocument={createNewDocument}
    />
  )
}

export default withRouter(BrowseOrCreateTopBar)
