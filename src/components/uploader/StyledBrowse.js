import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import theme from 'styled-theming'
import { transparentize } from 'polished'
import { colors } from '../../constants'

import { CloudUpload as DragDropIcon } from 'styled-icons/boxicons-solid/CloudUpload'

const fgColor = theme('mode', {
  light: colors.gray[600],
  dark: colors.gray[500],
})

const Wrapper = styled.div`
  padding: 2rem;
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  a {
    background-color: rgba(187, 239, 253, 0.3);
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    color: inherit;
    text-decoration: none;
    transition: all 0.8s ease-out;

    &:hover {
      background-color: #bbeffd;
      border-bottom-color: #1a1a1a;
    }
  }
`

const DropZone = styled.div`
  border: 4px dashed ${props => transparentize(0.4, fgColor(props))};
  border-radius: 14px;
  cursor: pointer;
  height: 90%;
  width: 95%;
  outline: none;

  display: flex;
  align-items: center;
  justify-content: center;

  .message {
    color: ${fgColor};
    text-align: center;

    svg {
      color: ${fgColor};
    }
  }
`

const StyledBrowse = ({ getRootProps, getInputProps, isDragActive }) => {
  return (
    <Wrapper>
      <DropZone {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <div className="message">Drop the files here ...</div>
        ) : (
          <div className="message">
            <DragDropIcon size="124" />
            <div>
              Drag 'n' drop your file here, or click to select your file
            </div>
          </div>
        )}
      </DropZone>
    </Wrapper>
  )
}

StyledBrowse.propTypes = {
  isDragActive: PropTypes.bool.isRequired,
  getRootProps: PropTypes.func.isRequired,
  getInputProps: PropTypes.func.isRequired,
}

export default StyledBrowse
