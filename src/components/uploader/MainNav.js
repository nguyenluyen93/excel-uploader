import React from 'react'
import { NavLink } from 'react-router-dom'
import SubNav from '../layout/SubNav'

import { FileFind as BrowseCreateIcon } from 'styled-icons/boxicons-solid/FileFind'
import { Edit as ModifyIcon } from 'styled-icons/boxicons-regular/Edit'
import { CheckShield as ReviewIcon } from 'styled-icons/boxicons-regular/CheckShield'
import { CloudUpload as UploadIcon } from 'styled-icons/boxicons-regular/CloudUpload'

const MainNav = () => {
  return (
    <SubNav>
      <ul style={{ width: '22rem' }}>
        <li>
          <div className="heading">
            <h2>Upload your file</h2>
          </div>
        </li>
        <li className="divider" />
        <li>
          <NavLink exact to="/uploader/">
            <BrowseCreateIcon size="24" />
            <span>Browse / Create</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/uploader/modify/">
            <ModifyIcon size="24" />
            <span>Modify</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/uploader/review/">
            <ReviewIcon size="24" />
            <span>Review</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/uploader/upload/">
            <UploadIcon size="24" />
            <span>Upload</span>
          </NavLink>
        </li>
      </ul>
    </SubNav>
  )
}

export default MainNav
