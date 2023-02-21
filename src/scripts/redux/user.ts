import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction'

type RememberLoginDataType = {
  remember: boolean
  email: string
  password: string
}

const { actions, reducer } = createSlice({
  name: 'user',
  initialState: {
    email: '',
    password: '',
    token: {
      status: 'void',
      value: '',
    },
    data: {
      status: 'void',
      firstName: '',
      lastName: '',
    },
  },
  reducers: {
    rememberLoginData: {
      prepare: (remember: boolean, email: string, password: string) => ({
        payload: { remember, email, password },
      }),
      reducer: (state, action: PayloadAction<RememberLoginDataType>) => {
        if (action.payload.remember) {
          state.email = action.payload.email
          state.password = action.payload.password
        } else {
          state.email = ''
          state.password = ''
        }
      },
    },
  },
})

export const { rememberLoginData } = actions
export default reducer
