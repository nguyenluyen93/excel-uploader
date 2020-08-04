import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import styled from 'styled-components/macro'
import theme from 'styled-theming'
import { colors } from '../../constants'

import { Close as CloseIcon } from 'styled-icons/material/Close'

const bgColor = theme('mode', {
  light: colors.gray[100],
  dark: colors.gray[900],
})

const fgColor = theme('mode', {
  light: colors.gray[700],
  dark: colors.gray[200],
})

const hoverBgColor = theme('mode', {
  light: colors.gray[300],
  dark: colors.gray[800],
})

const Content = styled.div`
  color: ${fgColor};
  background-color: ${bgColor};

  .heading {
    font-size: 2rem;
    font-weight: 500;
    padding: 2rem;
  }

  .message {
    margin-bottom: 1rem;
    padding: 1rem 2rem;
  }

  .footer {
    padding: 1rem 2rem;
  }

  .action {
    background-color: transparent;
    color: ${fgColor};
    border: none;
    border-radius: 3px;
    font-weight: 600;
    padding: 1rem 0rem;
    margin-right: 2rem;
    text-transform: uppercase;
    transition: all 0.4s ease-out;

    &:hover {
      background-color: ${hoverBgColor};
      padding: 1rem 0.8rem;
      cursor: pointer;
    }
  }
`

const CloseBtn = styled.button`
  background-color: transparent;
  border-radius: 9999px;
  color: ${fgColor};
  border: none;
  margin-top: 1rem;
  margin-right: 1rem;
  opacity: 0.7;
  outline: none;
  padding: 0.6rem;
  transition: all 0.8s ease-out;

  float: right;

  &:hover {
    background-color: ${hoverBgColor};
    cursor: pointer;
    opacity: 1;
  }
`

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    padding: '0',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: `1px solid ${colors.gray[700]}`,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
}

const StyledModal = ({ open, hideModal, children }) =>
  open ? (
    <Modal
      isOpen={open}
      onRequestClose={hideModal}
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
      style={modalStyles}
    >
      <CloseBtn onClick={hideModal}>
        <CloseIcon size={24} />
      </CloseBtn>
      <Content>{children}</Content>
    </Modal>
  ) : null

StyledModal.propTypes = {
  open: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default StyledModal
