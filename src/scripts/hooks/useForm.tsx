import { useState } from 'react'

type DataType = {
  [key: string]: {
    value: string | boolean
    error: string
  }
}

// useForm functional component
export const useForm = (callback: any, initialState = {}) => {
  const [data, setData] = useState<DataType>(initialState)

  function isInputValid() {
    const newData = { ...data }
    let validity = true

    for (let key of Object.keys(newData)) {
      switch (key) {
        case 'email':
          if (
            /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(
              newData[key].value.toString()
            )
          ) {
            newData[key].error = ''
          } else {
            newData[key].error = 'Please enter a valid email address.'
            validity = false
          }
          break
        case 'password':
          if (/^[a-zA-Z0-9]{5,15}$/.test(newData[key].value.toString())) {
            newData[key].error = ''
          } else {
            newData[key].error =
              'Please enter a password containing between 5 and 15 characters.'
            validity = false
          }
          break
        case 'firstName':
          if (/^[a-zA-Z0-9]{2,15}$/.test(newData[key].value.toString())) {
            newData[key].error = ''
          } else {
            newData[key].error =
              'Please enter a first name containing between 2 and 15 characters.'
            validity = false
          }
          break
        case 'lastName':
          if (/^[a-zA-Z0-9]{2,15}$/.test(newData[key].value.toString())) {
            newData[key].error = ''
          } else {
            newData[key].error =
              'Please enter a last name containing between 2 and 15 characters.'
            validity = false
          }
          break
      }
    }

    setData(newData)

    return validity
  }

  // onChange
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let currentValue: string | boolean

    if (event.target.type === 'checkbox') {
      currentValue = event.target.checked
    } else {
      currentValue = event.target.value
    }

    setData({
      ...data,
      [event.target.name]: {
        ...data[event.target.name],
        value: currentValue,
      },
    })
  }

  // onSubmit
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isInputValid()) {
      await callback() // triggering the callback
    }
  }

  // return values
  return {
    onChange,
    onSubmit,
    data,
  }
}
