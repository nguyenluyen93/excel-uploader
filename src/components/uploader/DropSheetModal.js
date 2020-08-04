import React from 'react'
import PropTypes from 'prop-types'
import StyledDropSheetModal from './StyledDropSheetModal'
import { UploaderContext } from '../../contexts/uploader'
import { actionTypes } from '../../reducers/uploader'

const DropSheetModal = ({ open, hideModal }) => {
  const { dispatch } = React.useContext(UploaderContext)

  const dropSheet = () => {
    dispatch({ type: actionTypes.dropSheet })
  }

  return (
    <StyledDropSheetModal
      open={open}
      dropSheet={dropSheet}
      hideModal={hideModal}
    />
  )
}

DropSheetModal.propTypes = {
  open: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired,
}

export default DropSheetModal
