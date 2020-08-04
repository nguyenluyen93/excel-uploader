import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'

const AuthRoute = ({ component: Component, ...otherProps }) => {
  const { auth } = useContext(AuthContext)

  if (!auth) return <Redirect to="/login" />

  return <Route {...otherProps} render={props => <Component {...props} />} />
}

export default AuthRoute
