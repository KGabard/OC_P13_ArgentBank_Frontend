import React from 'react'
import { useForm } from '../scripts/hooks/useForm'
import userIcon from '../assets/icons/icon-circle-user.svg'
import { useNavigate } from 'react-router-dom'

function SingInForm() {
  // defining the initial state for the form
  const initialState = {
    email: {
      value: '',
      error: '',
    },
    password: {
      value: '',
      error: '',
    },
    rememberMe: {
      value: false,
      error: '',
    },
  }

  const navigate = useNavigate()

  // getting the event handlers from our custom hook
  const { onChange, onSubmit, data } = useForm(loginUserCallback, initialState)

  // a submit function that will execute upon form submission
  async function loginUserCallback() {
    // send "values" to database
    console.log(data)
    // navigate('/profile/1')
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
