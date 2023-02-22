import React from 'react'
import { useForm } from '../scripts/hooks/useForm'
import { useAppDispatch } from '../scripts/redux/hooks'

type Props = {
  setEnableEditing: (enable: boolean) => void
}

function EditName({ setEnableEditing }: Props) {
  const dispatch = useAppDispatch()

  // defining the initial state for the form
  const initialState = {
    firstName: {
      value: '',
      error: '',
    },
    lastName: {
      value: '',
      error: '',
    },
  }
  // getting the event handlers from our custom hook
  const { onChange, onSubmit, data } = useForm(editUserCallback, initialState)

  // a submit function that will execute upon form submission
  function editUserCallback() {
    // send "data" to database
    console.log(data)
  }

  return (
    <div className="edit-name">
      <form className="edit-name__form" onSubmit={onSubmit}>
        <div className="edit-name__form__input-container edit-name__form__input-container--text">
          <label
            className="edit-name__form__input-container__label"
            htmlFor="firstName"
          >
            First name
          </label>
          <input
            className="edit-name__form__input-container__input"
            name="firstName"
            id="firstName"
            type="text"
            placeholder="First name"
            onChange={onChange}
          />
          {data['firstName'].error.length > 0 && (
            <p className="edit-name__form__input-container__error">
              {data['firstName'].error}
            </p>
          )}
        </div>

        <div className="edit-name__form__input-container edit-name__form__input-container--text">
          <label
            className="edit-name__form__input-container__label"
            htmlFor="lastName"
          >
            Last name
          </label>
          <input
            className="edit-name__form__input-container__input"
            name="lastName"
            id="lastName"
            type="text"
            placeholder="Last name"
            onChange={onChange}
          />
          {data['lastName'].error.length > 0 && (
            <p className="edit-name__form__input-container__error">
              {data['lastName'].error}
            </p>
          )}
        </div>

        <button className="edit-name__form__save-button" type="submit">
          Save
        </button>

        <button
          className="edit-name__form__cancel-button"
          onClick={() => {
            setEnableEditing(false)
          }}
        >
          Cancel
        </button>

        {/* {user.connection.error.length > 0 && (
          <p className="edit-name__form__edit-name-error">
            {user.connection.error}
          </p>
        )} */}
      </form>
    </div>
  )
}

export default EditName
