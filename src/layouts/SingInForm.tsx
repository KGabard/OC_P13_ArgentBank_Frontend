import React, { useEffect } from 'react'
import { useForm } from '../scripts/hooks/useForm'
import userIcon from '../assets/icons/icon-circle-user.svg'
import { useNavigate } from 'react-router-dom'
import {
  fetchOrUpdateConnection,
  rememberLoginData,
  selectUser,
} from '../scripts/redux/user'
import { useAppDispatch, useAppSelector } from '../scripts/redux/hooks'

function SingInForm() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)

  // defining the initial state for the form
  const initialState = {
    email: {
      value: user.email,
      error: '',
    },
    password: {
      value: user.password,
      error: '',
    },
    rememberMe: {
      value: false,
      error: '',
    },
  }
  // getting the event handlers from our custom hook
  const { onChange, onSubmit, data } = useForm(loginUserCallback, initialState)

  // a submit function that will execute upon form submission
  function loginUserCallback() {
    // send "data" to database
    let rememberMeData = false
    let emailData = ''
    let passwordData = ''

    if (typeof data['rememberMe'].value === 'boolean')
      rememberMeData = data['rememberMe'].value
    if (typeof data['email'].value === 'string') emailData = data['email'].value
    if (typeof data['password'].value === 'string')
      passwordData = data['password'].value

    dispatch(rememberLoginData(rememberMeData, emailData, passwordData))

    dispatch(fetchOrUpdateConnection(emailData, passwordData))
  }

  useEffect(() => {
    if (user.connection.isConnected) {
      navigate('/profile')
    }
  }, [user.connection.isConnected, navigate])

  return (
    <section className="sign-in-form">
      <div className="sign-in-form__header">
        <img
          src={userIcon}
          alt="sign in logo"
          className="sign-in-form__header__logo"
        />
        <h1 className="sign-in-form__header__title">Sign In</h1>
      </div>
      <form className="sign-in-form__form" onSubmit={onSubmit}>
        <div className="sign-in-form__form__input-container sign-in-form__form__input-container--text">
          <label
            className="sign-in-form__form__input-container__label"
            htmlFor="email"
          >
            Username
          </label>
          <input
            className="sign-in-form__form__input-container__input"
            name="email"
            id="email"
            type="text"
            placeholder="Email"
            onChange={onChange}
            value={data.email.value.toString()}
          />
          {data['email'].error.length > 0 && (
            <p className="sign-in-form__form__input-container__error">
              {data['email'].error}
            </p>
          )}
        </div>

        <div className="sign-in-form__form__input-container sign-in-form__form__input-container--text">
          <label
            className="sign-in-form__form__input-container__label"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="sign-in-form__form__input-container__input"
            name="password"
            id="password"
            type="password"
            placeholder="Password"
            onChange={onChange}
            value={data.password.value.toString()}
          />
          {data['password'].error.length > 0 && (
            <p className="sign-in-form__form__input-container__error">
              {data['password'].error}
            </p>
          )}
        </div>

        <div className="sign-in-form__form__input-container sign-in-form__form__input-container--checkbox">
          <label
            className="sign-in-form__form__input-container__label"
            htmlFor="password"
          >
            Remember me
          </label>
          <input
            className="sign-in-form__form__input-container__input"
            name="rememberMe"
            id="rememberMe"
            type="checkbox"
            onChange={onChange}
          />
        </div>

        <button
          className="sign-in-form__form__submit-button"
          type="submit"
          style={
            user.connection.status === 'pending' ||
            user.connection.status === 'updating'
              ? { textDecoration: 'none' }
              : {}
          }
        >
          {user.connection.status === 'pending' ||
          user.connection.status === 'updating'
            ? 'Loading'
            : 'Sign In'}
        </button>

        {user.connection.error.length > 0 && (
          <p className="sign-in-form__form__login-error">
            {user.connection.error}
          </p>
        )}
      </form>
    </section>
  )
}

export default SingInForm
