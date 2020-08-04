import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { isEmpty } from 'lodash'
import { transparentize } from 'polished'
import { colors } from '../../constants'
import { MediumOld as HomeIcon } from 'styled-icons/boxicons-logos/MediumOld'


const Wrapper = styled.form`
  z-index: 10;
  background: ${transparentize(0.5, colors.gray[900])};
  border-radius: 8px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  min-width: 32rem;
  height: 40rem;

  display: flex;
  flex-direction: column;

  .primary {
    color: ${colors.indigo[600]};
  }
`

const Header = styled.div`
  align-items: flex-end;
  background-color: ${transparentize(0.6, colors.gray[900])};
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 75%);
  color: ${colors.gray[400]};
  display: flex;
  justify-content: flex-end;
  padding: 2rem;
  padding-bottom: 3rem;

  h2 {
    font-size: 2.2rem;
    margin-left: 0.4rem;
    margin-bottom: 0.8rem;
  }
`

const Body = styled.div`
  flex-grow: 1;
  padding-top: 2rem;
  padding-left: 2rem;
  padding-right: 2rem;
`

const Footer = styled.div`
  height: 6rem;

  button[type='submit'] {
    background-color: ${colors.indigo[600]};
    border: none;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    color: ${colors.gray[400]};
    cursor: pointer;
    font-weight: bold;
    height: 100%;
    overflow: hidden;
    width: 100%;
    transition: background-color 1s ease-in-out;

    &:disabled {
      background-color: ${colors.gray[800]};
      cursor: not-allowed;
    }
  }
`

const ErrorMessage = styled.div`
  margin-top: 0.5rem;
`

const InfoMessage = styled.div`
  color: ${colors.indigo[500]};
  margin-top: 2rem;
`

const FormInput = styled.div`
  color: ${colors.gray[400]};
  margin-top: 1rem;
  margin-bottom: 1rem;

  display: flex;
  flex-direction: column;

  &.danger {
    color: ${colors.pink[500]};
  }

  label {
    color: inherit;
    margin-bottom: 0.4rem;
  }

  input {
    background-color: ${transparentize(0.6, colors.gray[900])};
    color: inherit;
    border: none;
    font-size: 1.4rem;
    padding-left: 1rem;
    padding-right: 1rem;

    height: 4rem;
    min-width: 14rem;
  }
`

const LoginForm = ({ email, password, fieldErrors, login, onFieldChanged }) => {
  return (
    <Wrapper>
      <Header>
        <HomeIcon className="primary" size={48} />
        <h2>ICRO</h2>
      </Header>
      <Body>
        <FormInput className={`${email && fieldErrors.email ? 'danger' : ''}`}>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            value={email}
            onChange={onFieldChanged}
          />
          {email && fieldErrors.email && (
            <ErrorMessage>{fieldErrors.email}</ErrorMessage>
          )}
        </FormInput>
        <FormInput
          className={`${password && fieldErrors.password ? 'danger' : ''}`}
        >
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={onFieldChanged}
          />
          {password && fieldErrors.password && (
            <ErrorMessage>{fieldErrors.password}</ErrorMessage>
          )}
        </FormInput>
        {isEmpty(fieldErrors) && (
          <InfoMessage>Enter your credentials to login</InfoMessage>
        )}
      </Body>
      <Footer>
        <button type="submit" onClick={login} disabled={isEmpty(fieldErrors)}>
          LOGIN
        </button>
      </Footer>
    </Wrapper>
  )
}

LoginForm.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  fieldErrors: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  onFieldChanged: PropTypes.func.isRequired,
}

export default LoginForm
