import React, { Component } from 'react'
import Selector from '../layout/Selector'

const KEY_BACKSPACE = 8
const KEY_DELETE = 46
const KEY_F2 = 113
const KEY_ENTER = 13

export default class NumericEditor extends Component {
  constructor(props) {
    super(props)

    this.state = this.createInitialState(props)
    this.selectRef = React.createRef()
    this.stopEditing = props.stopEditing
    this.values = props.values || []
    this.width = props.width || '100px'
  }

  createInitialState(props) {
    let startValue
    let highlightAllOnFocus = true

    if (props.keyPress === KEY_BACKSPACE || props.keyPress === KEY_DELETE) {
      // if backspace or delete pressed, we clear the cell
      startValue = ''
    } else if (props.charPress) {
      // if a letter was pressed, we start with the letter
      startValue = props.charPress
      highlightAllOnFocus = false
    } else {
      // otherwise we start with the current value
      startValue = props.value
      if (props.keyPress === KEY_F2) {
        highlightAllOnFocus = false
      }
    }

    return {
      value: startValue,
      highlightAllOnFocus,
    }
  }

  afterGuiAttached() {
    if (this.selectRef.current) {
      this.selectRef.current.select.focus()
    }
  }

  getValue() {
    return this.state.value
  }

  isCancelBeforeStart() {
    return this.cancelBeforeStart
  }

  isPopup() {
    return true
  }

  // only allow values that is definded in values
  isCancelAfterEnd() {
    const allowedValues = this.values.map(option => option.value)

    return allowedValues.indexOf(this.state.value) < 0
  }

  onKeyDown = evt => {
    if (evt.keyCode !== KEY_ENTER) return

    setTimeout(() => {
      this.stopEditing()
    }, 300)
  }

  handleSelectChange = evt => {
    this.setState({ value: evt.value })
  }

  getCharCodeFromEvent(event) {
    event = event || window.event
    return typeof event.which === 'undefined' ? event.keyCode : event.which
  }

  isCharNumeric(charStr) {
    return !!/\d/.test(charStr)
  }

  isKeyPressedNumeric(event) {
    const charCode = this.getCharCodeFromEvent(event)
    const charStr = event.key ? event.key : String.fromCharCode(charCode)
    return this.isCharNumeric(charStr)
  }

  render() {
    return (
      <Selector
        style={{ boxShadow: `5px 5px 10px rgba(0, 0, 0, 0.3)` }}
        ref={this.selectRef}
        defaultInputValue={this.state.value}
        defaultValue={this.state.value}
        options={this.values}
        width={this.width}
        onChange={this.handleSelectChange}
        onKeyDown={this.onKeyDown}
      />
    )
  }

  deleteOrBackspace(event) {
    return [KEY_DELETE, KEY_BACKSPACE].indexOf(event.keyCode) > -1
  }
}
