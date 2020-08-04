import React, { useContext } from 'react'
import styled from 'styled-components/macro'
import { Redirect } from 'react-router-dom'
import { transparentize } from 'polished'
import { AuthContext } from '../contexts/auth'
import LoginForm from '../components/login/LoginForm'
//import LoginBackgroundImg from '../assets/images/login-background.jpg'
import LoginBackgroundImg from '../assets/images/login-background-new2.jpg'
import { colors } from '../constants'

const Wrapper = styled.div`
  background-image: ${`linear-gradient(to right bottom, ${transparentize(
    0.15,
    colors.indigo[700],
  )}, ${transparentize(
    0.15,
    colors.indigo[900],
  )}), url('${LoginBackgroundImg}')`};
  background-size: cover;
  background-position: center;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Copyright = styled.div`
  color: ${colors.gray[600]};
  font-weight: 1.3rem;
  margin-top: 1rem;
`

const Login = () => {
  const { auth } = useContext(AuthContext)
  return auth ? (
    <Redirect to="/uploader/" />
  ) : (
    <Wrapper>
      <LoginForm />
      <Copyright>©2019 IT Department | Saigon Newport Corp.</Copyright>
    </Wrapper>
  )
}

export default Login
