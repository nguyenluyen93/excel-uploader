import React from 'react'
import { Route } from 'react-router-dom'
import BrowseOrCreate from './BrowseOrCreate'
import Browse from './Browse'
import Modify from './Modify'
import Review from './Review'
import Upload from './Upload'

const Router = () => {
  return (
    <>
      <Route exact path="/uploader" component={BrowseOrCreate} />
      <Route path="/uploader/browse" component={Browse} />
      <Route path="/uploader/modify" component={Modify} />
      <Route path="/uploader/review" component={Review} />
      <Route path="/uploader/upload" component={Upload} />
    </>
  )
}

export default Router
