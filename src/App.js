import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './contexts/auth'
import { ThemeProvider } from './contexts/theme'
import { StyledProvider } from './contexts/styled'
import MainRoutes from './Routes'
import Layout from './components/layout/Layout'
import Toaster from './components/toast/Toaster'

import './App.css'

function App() {
  console.info('-- Version: 1.0.6')
  return (
    <Router>
      <ThemeProvider>
        <StyledProvider>
          <AuthProvider>
            <Layout>
              <MainRoutes />
            </Layout>
            <Toaster />
          </AuthProvider>
        </StyledProvider>
      </ThemeProvider>
    </Router>
  )
}

export default App
