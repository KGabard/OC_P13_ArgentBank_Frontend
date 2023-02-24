import { AnyAction, createSlice, ThunkDispatch } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit/dist/createAction'
import { RememberLoginDataType, UserType } from '../types/Types'
import { RootState } from './store'

export function fetchOrUpdateConnection(email: string, password: string) {
  // on retourne un thunk
  return async (
    dispatch: ThunkDispatch<RootState, unknown, AnyAction>,
    getState: () => RootState
  ) => {
    const status = selectUser(getState()).connection.status
    if (status === 'pending' || status === 'updating') return

    dispatch(actions.fetchingConnection())

    let data

    try {
      // on utilise fetch pour faire la requête
      const response = await fetch(
        process.env.REACT_APP_API_BASE_URL + '/user/login',
        {
          method: 'POST',
          body: JSON.stringify({
            email: email,
            password: password,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      data = await response.json()
      dispatch(actions.resolvedConnection(data.body.token))
    } catch (error) {
      dispatch(actions.rejectedConnection(data.message))
    }
  }
}

export function fetchOrUpdateUserData(token: string) {
  // on retourne un thunk
  return async (
    dispatch: ThunkDispatch<RootState, unknown, AnyAction>,
    getState: () => RootState
  ) => {
    const status = selectUser(getState()).userData.status
    if (status === 'pending' || status === 'updating') return

    dispatch(actions.fetchingUserData())

    let data

    try {
      // on utilise fetch pour faire la requête
      const response = await fetch(
        process.env.REACT_APP_API_BASE_URL + '/user/profile',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      data = await response.json()
      dispatch(actions.resolvedUserData(data.body))
    } catch (error) {
      console.log(error)
      console.log(data)

      dispatch(actions.rejectedUserData(data.message))
    }
  }
}

const initialState: UserType = {
  email: '',
  password: '',
  connection: {
    status: 'void',
    error: '',
    token: '',
    isConnected: false,
  },
  userData: {
    status: 'void',
    error: '',
    firstName: '',
    lastName: '',
  },
}

const { actions, reducer } = createSlice({
  name: 'user',
  initialState,
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

    fetchingConnection: (state) => {
      switch (state.connection.status) {
        case 'void':
          state.connection.status = 'pending'
          break
        case 'resolved':
          state.connection.status = 'updating'
          break
        case 'rejected':
          state.connection.status = 'pending'
          state.connection.error = ''
          break
      }
    },
    resolvedConnection: (state, action: PayloadAction<string>) => {
      if (
        state.connection.status === 'pending' ||
        state.connection.status === 'updating'
      ) {
        state.connection.status = 'resolved'
        state.connection.isConnected = true
        state.connection.token = action.payload
      }
    },
    rejectedConnection: (state, action: PayloadAction<any>) => {
      if (
        state.connection.status === 'pending' ||
        state.connection.status === 'updating'
      ) {
        state.connection.status = 'rejected'
        state.connection.isConnected = false
        state.connection.token = ''
        state.connection.error = action.payload
      }
    },

    fetchingUserData: (state) => {
      switch (state.userData.status) {
        case 'void':
          state.userData.status = 'pending'
          break
        case 'resolved':
          state.userData.status = 'updating'
          break
        case 'rejected':
          state.userData.status = 'pending'
          state.userData.error = ''
          break
      }
    },
    resolvedUserData: (
      state,
      action: PayloadAction<{ firstName: string; lastName: string }>
    ) => {
      if (
        state.userData.status === 'pending' ||
        state.userData.status === 'updating'
      ) {
        state.userData.status = 'resolved'
        state.userData.firstName = action.payload.firstName
        state.userData.lastName = action.payload.lastName
      }
    },
    rejectedUserData: (state, action: PayloadAction<any>) => {
      if (
        state.userData.status === 'pending' ||
        state.userData.status === 'updating'
      ) {
        state.userData.status = 'rejected'
        state.userData.firstName = ''
        state.userData.lastName = ''
        state.userData.error = action.payload
      }
    },

    signOut: (state) => {
      if (state.connection.isConnected === true) {
        state.connection.status = 'void'
        state.connection.isConnected = false
        state.connection.token = ''
        state.userData.status = 'void'
        state.userData.firstName = ''
        state.userData.lastName = ''
      }
    },
  },
})

export const { rememberLoginData, signOut } = actions

export const selectUser = (state: RootState) => state.user

export default reducer
