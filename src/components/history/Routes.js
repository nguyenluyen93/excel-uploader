import React from 'react'
import { Route } from 'react-router-dom'
import HistoryList from './List'
import HistoryDetail from './Detail'

const Router = () => {
  return (
    <>
      <Route exact path="/history" component={HistoryList} />
      <Route path="/history/:jobId" component={HistoryDetail} />
    </>
  )
}

export default Router
