import React from 'react'
import { useForm } from '../scripts/hooks/useForm'
import userIcon from '../assets/icons/icon-circle-user.svg'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { rememberLoginData } from '../scripts/redux/user'
import { selectUser } from '../scripts/redux/selectors'

function SingInForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

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
  async function loginUserCallback() {
    // send "values" to database
    console.log(data)

    let rememberMeData = false
    let emailData = ''
    let passwordData = ''

    if (typeof data['rememberMe'].value === 'boolean')
      rememberMeData = data['rememberMe'].value
    if (typeof data['email'].value === 'string') emailData = data['email'].value
    if (typeof data['password'].value === 'string')
      passwordData = data['password'].value

    dispatch(rememberLoginData(rememberMeData, emailData, passwordData))

    navigate('/profile')
  }

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

        <button className="sign-in-form__form__submit-button" type="submit">
          Sign In
        </button>
      </form>
    </section>
  )
}

export default SingInForm
