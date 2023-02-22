import {
  AnyAction,
  createSlice,
  PayloadAction,
  ThunkDispatch,
} from '@reduxjs/toolkit'
import { EditUserType } from '../types/Types'
import { RootState } from './store'

export function fetchOrUpdate(
  token: string,
  firstName: string,
  lastName: string
) {
  // on retourne un thunk
  return async (
    dispatch: ThunkDispatch<RootState, unknown, AnyAction>,
    getState: () => RootState
  ) => {
    const status = selectEditUser(getState()).status
    if (status === 'pending' || status === 'updating') return

    dispatch(actions.fetching())

    let data

    try {
      // on utilise fetch pour faire la requête
      const response = await fetch(
        'http://localhost:3001/api/v1/user/profile',
        {
          method: 'PUT',
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
          }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      data = await response.json()
      dispatch(actions.resolved())
    } catch (error) {
      dispatch(actions.rejected(data.message))
    }
  }
}

const initialState: EditUserType = {
  status: 'void',
  error: '',
}

const { actions, reducer } = createSlice({
  name: 'editUser',
  initialState,
  reducers: {
    fetching: (state) => {
      switch (state.status) {
        case 'void':
          state.status = 'pending'
          break
        case 'resolved':
          state.status = 'updating'
          break
        case 'rejected':
          state.status = 'pending'
          state.error = ''
          break
      }
    },
    resolved: (state) => {
      if (state.status === 'pending' || state.status === 'updating') {
        state.status = 'resolved'
      }
    },
    rejected: (state, action: PayloadAction<any>) => {
      if (state.status === 'pending' || state.status === 'updating') {
        state.status = 'rejected'
        state.error = action.payload
      }
    },
  },
})

export const selectEditUser = (state: RootState) => state.editUser

export default reducer
