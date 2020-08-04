import getToaster from '../utils/getToaster'

const toaster = getToaster()

const actionTypes = {
  toggleDarkMode: 'toggleDarkMode',
  toggleWideMode: 'toggleWideMode',
}

const toggleDarkMode = state => {
  if (state.mode === 'dark') {
    toaster.info('Dark mode is off.')
  } else {
    toaster.success('Dark mode is on.')
  }
  return {
    ...state,
    mode: state.mode === 'light' ? 'dark' : 'light',
  }
}

const toggleWideMode = state => {
  if (!state.wide) {
    toaster.success('Wide mode is on.')
  } else {
    toaster.info('Wide mode is off.')
  }
  return {
    ...state,
    wide: !state.wide,

  } 
}

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.toggleDarkMode:
      return toggleDarkMode(state)
    case actionTypes.toggleWideMode:
      return toggleWideMode(state)
    default:
      return state
  }
}

export { reducer as default, actionTypes }
