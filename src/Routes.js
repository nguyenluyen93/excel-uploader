import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import AuthRoute from './components/layout/AuthRoute'
import LoginPage from './pages/Login'
import UploaderPage from './pages/Uploader'
import HistoryPage from './pages/History'

const Router = () => {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/" exact render={() => <Redirect to="/login" />} />
      <AuthRoute path="/uploader" component={UploaderPage} />
      <AuthRoute path="/history" component={HistoryPage} />
    </Switch>
  )
}

export default Router
