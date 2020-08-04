import React from 'react'
import PropTypes from 'prop-types'
import { Close as CloseIcon } from 'styled-icons/material/Close'

const ToastCloseBtn = ({ closeToast }) => {
  return (
    <>
      <CloseIcon size="20" title="Upload" onClick={closeToast} />
    </>
  )
}

ToastCloseBtn.propTypes = {
  closeToast: PropTypes.func,
}

export default ToastCloseBtn
