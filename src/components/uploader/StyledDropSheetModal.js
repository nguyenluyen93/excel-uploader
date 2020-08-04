import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import theme from 'styled-theming'
import StyledModal from '../layout/StyledModal'
import { colors } from '../../constants'

const dangerFgColor = theme('mode', {
  light: colors.pink[600],
  dark: colors.pink[500],
})

const DangerButton = styled.button`
  color: ${dangerFgColor} !important;
`

const StyledDropSheetModal = ({ open, dropSheet, hideModal }) => (
  <StyledModal open={open} hideModal={hideModal}>
    <div className="heading">Drop Sheet Confirmation</div>
    <div className="body">
      <div className="message">
        Please notice that any unsaved work will be lost. Do you wish to
        proceed?
      </div>
      <div className="footer">
        <DangerButton
          className="action"
          aria-label="Drop Sheet"
          onClick={dropSheet}
        >
          <span aria-hidden="true">Drop Sheet</span>
        </DangerButton>
        <button className="action" aria-label="Cancel" onClick={hideModal}>
          <span aria-hidden="true">Cancel</span>
        </button>
      </div>
    </div>
  </StyledModal>
)

StyledDropSheetModal.propTypes = {
  open: PropTypes.bool.isRequired,
  dropSheet: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
}

export default StyledDropSheetModal
