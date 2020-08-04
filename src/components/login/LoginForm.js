import React, { useReducer, useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import StyledLoginForm from './StyledLoginForm'
import validate from './validateLoginFormInput'
import getToaster from '../../utils/getToaster'
import getAxios from '../../utils/getAxios'

const toaster = getToaster()
const axios = getAxios()

const actionTypes = {
  field: 'field',
  login: 'login',
  success: 'success',
  failure: 'failure',
}

const initialState = {
  email: '',
  password: '',
  loading: false,
  error: null,
  fieldErrors: {},
}

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.field:
      const fieldErrors = {
        ...state.fieldErrors,
        [action.field]: validate(action.field, action.value),
      }
      return {
        ...state,
        [action.field]: action.value,
        fieldErrors,
      }
    case actionTypes.login:
      return {
        ...state,
        loading: true,
        error: null,
        fieldErrors: {},
      }
    case actionTypes.success:
      return {
        ...state,
        loading: false,
        error: null,
        fieldErrors: {},
      }
    case actionTypes.failure:
      return {
        ...state,
        loading: false,
        error: action.error,
        fieldErrors: {},
      }
    default:
      return state
  }
}

const LoginForm = () => {
  const { setAuth } = useContext(AuthContext)
  const [state, dispatch] = useReducer(reducer, initialState)

  const login = e => {
    e.preventDefault()

    dispatch({ type: actionTypes.login })

    axios
      .post(`/auth/login`, {
        email: state.email,
        password: state.password,
      })
      .then(resp => resp.data)
      .then(data => {
        dispatch({ type: actionTypes.success })
        setAuth({ user: data.user, token: data.token })

        toaster.success('Login success. Welcome back!')
      })
      .catch(err => {
        dispatch({
          type: actionTypes.failure,
          error: err,
        })
        toaster.error('Email or password is incorrect. Please try again.')
      })
  }

  const handleFieldChanged = e => {
    dispatch({
      type: actionTypes.field,
      field: e.target.name,
      value: e.target.value,
    })
  }

  return (
    <StyledLoginForm
      {...state}
      login={login}
      onFieldChanged={handleFieldChanged}
    />
  )
}

export default LoginForm
