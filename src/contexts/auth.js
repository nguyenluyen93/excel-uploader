import React, { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import getAxios from '../utils/getAxios'
import tryParseJson from '../utils/tryParseJson'
import jwtDecode from 'jwt-decode'

const axios = getAxios()
const AuthContext = createContext()

let initialAuth = tryParseJson(window.localStorage.getItem('auth'), null)

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialAuth)

  useEffect(() => {
    if (!auth || !auth.token)
      return window.localStorage.setItem('auth', JSON.stringify(auth))

    const decode = jwtDecode(auth.token)
    if (!decode || !decode.exp || Date.now() / 1000 >= decode.exp) {
      return setAuth(null)
    }

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + auth.token
    window.localStorage.setItem('auth', JSON.stringify({ ...auth, decode }))
  }, [auth])

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { AuthContext, AuthProvider }
