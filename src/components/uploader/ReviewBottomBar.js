import React from 'react'
import { get } from 'lodash'
import { withRouter } from 'react-router-dom'
import getAxios from '../../utils/getAxios'
import { UploaderContext } from '../../contexts/uploader'
import { AuthContext } from '../../contexts/auth'
import { actionTypes as uploaderActTypes } from '../../reducers/uploader'
import { sheetKinds } from '../../constants'
import StyledReviewBottomBar from './StyledReviewBottomBar'
import getToaster from '../../utils/getToaster'

const toaster = getToaster()
const axios = getAxios()
const WAITING_TIME_BEFORE_START = 2000
const WAITING_TIME_BEFORE_REDIRECT = 2000
// const WAITING_TIME_BEFORE_TRIGGER = 1000

const ReviewBottomBar = ({ history }) => {
  const { auth } = React.useContext(AuthContext)
  const { state, dispatch: uploaderDp } = React.useContext(UploaderContext)
  const {
    sheet,
    master: {
      fetching,
      error: fetchError,
      data: { vesselInfos },
    },
  } = state

  const hasData = !!sheet.data.length
  const hasVesselInfos = !!vesselInfos.length
  const hasNoWarns = !Object.keys(sheet.reviewErrors || {}).length

  const sheetValid = hasData && hasNoWarns && hasVesselInfos

  const prepareUploadData = sheetData => {
    return sheetData.map(row => {
      if (row.From_Site === 'VNHPP') row.From_Site = 'VNTHP'

      return row
    })
  }

  const doUpload = () => {
    if (!sheetValid) return

    uploaderDp({ type: uploaderActTypes.uploadBegin })
    history.push('/uploader/upload/')
    setTimeout(() => {
      axios
        .post('/excel-upload/containers/pushStagingConts', {
          kind: sheetKinds.containers,
          uploadedBy: get(auth, 'user.email'),
          content: prepareUploadData(sheet.data),
        })
        .then(() => {
          uploaderDp({ type: uploaderActTypes.uploadSuccess })
          toaster.success('Your work is done!')

          // Trigger OTM process automatically
          // setTimeout(() => {
          //   axios
          //     .post('/excel-upload/triggers/triggerOtmProcessor')
          //     .catch(error => {
          //       toaster.error(
          //         'Failed to trigger OTM proccessor automatically. Please try manually trigger instead. ' +
          //           error.message,
          //       )
          //     })
          // }, WAITING_TIME_BEFORE_TRIGGER)

          setTimeout(() => {
            uploaderDp({
              type: uploaderActTypes.sheetLoaded,
              kind: null,
              data: [],
            })
          }, WAITING_TIME_BEFORE_REDIRECT)
        })
        .catch(error => {
          uploaderDp({ type: uploaderActTypes.uploadFailure, error })
          toaster.error('Upload failed. ' + error.message)
        })
    }, WAITING_TIME_BEFORE_START)
  }

  return (
    <StyledReviewBottomBar
      fetching={fetching}
      fetchError={fetchError}
      hasVesselInfos={hasVesselInfos}
      sheetValid={sheetValid}
      doUpload={doUpload}
    />
  )
}

export default withRouter(ReviewBottomBar)
