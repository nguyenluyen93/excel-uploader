import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import ToastCloseBtn from './ToastCloseBtn'

const Toaster = () => {
  return (
    <>
      <ToastContainer
        enableMultiContainer
        closeButton={<ToastCloseBtn />}
        containerId={'top-right'}
        position={toast.POSITION.TOP_RIGHT}
      />
      <ToastContainer
        className="Toastify__container--lg"
        enableMultiContainer
        closeButton={<ToastCloseBtn />}
        containerId={'top-center'}
        position={toast.POSITION.TOP_CENTER}
      />
    </>
  )
}

export default Toaster
