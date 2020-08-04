import React from 'react'
import { toast, cssTransition } from 'react-toastify'
import StyledToastMessage from '../components/toast/StyledToastMessage'
import ToastErrorsTopCenter from '../components/toast/ToastErrorsTopCenter'

import { CheckShield as SuccessIcon } from 'styled-icons/boxicons-solid/CheckShield'
import { Error as ErrorIcon } from 'styled-icons/boxicons-solid/Error'
import { InfoCircle as InfoIcon } from 'styled-icons/boxicons-solid/InfoCircle'
import { Warning as WarnIcon } from 'styled-icons/typicons/Warning'

const Zoom = cssTransition({
  enter: 'zoomIn',
  exit: 'zoomOut',
  duration: [800, 100],
})

const toaster = {
  dismiss: toastId => {
    toast.dismiss(toastId)
  },
  success: (message, options = {}) => {
    return toast.success(
      <StyledToastMessage>
        <SuccessIcon size={30} />
        <span>{message}</span>
      </StyledToastMessage>,
      {
        containerId: 'top-right',
        ...options,
      },
    )
  },
  error: (message, options = {}) => {
    return toast.error(
      <StyledToastMessage>
        <ErrorIcon size={30} />
        <span>{message}</span>
      </StyledToastMessage>,
      {
        containerId: 'top-right',
        ...options,
      },
    )
  },
  info: (message, options = {}) => {
    return toast.info(
      <StyledToastMessage>
        <InfoIcon size={30} />
        <span>{message}</span>
      </StyledToastMessage>,
      {
        containerId: 'top-right',
        ...options,
      },
    )
  },
  warn: (message, options = {}) => {
    return toast.warn(
      <StyledToastMessage>
        <WarnIcon size={30} />
        <span>{message}</span>
      </StyledToastMessage>,
      {
        containerId: 'top-right',
        ...options,
      },
    )
  },
  showRowErrors: (errors = [], options = {}) => {
    return toast.error(<ToastErrorsTopCenter errors={errors} />, {
      containerId: 'top-center',
      autoClose: 8000,
      transition: Zoom,
      position: toast.POSITION.TOP_CENTER,
      className: 'Toastify__width--lg',
      ...options,
    })
  },
  updateRowErrors: (toastId, errors = [], options = {}) => {
    return toast.update(toastId, {
      ...options,
      containerId: 'top-center',
      render: <ToastErrorsTopCenter errors={errors} />,
    })
  },
  showRowWarns: (warns = [], options = {}) => {
    return toast.warn(<ToastErrorsTopCenter errors={warns} />, {
      containerId: 'top-center',
      autoClose: 8000,
      transition: Zoom,
      position: toast.POSITION.TOP_CENTER,
      className: 'Toastify__width--lg',
      ...options,
    })
  },
  updateRowWarns: (toastId, warns = [], options = {}) => {
    return toast.update(toastId, {
      ...options,
      containerId: 'top-center',
      render: <ToastErrorsTopCenter errors={warns} />,
    })
  },
}

const getToaster = () => toaster

export { getToaster as default }
