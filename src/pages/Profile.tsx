import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AccountSection from '../components/AccountSection'
import EditButton from '../components/EditButton'
import { useAppDispatch, useAppSelector } from '../scripts/redux/hooks'
import { fetchOrUpdateUserData, selectUser } from '../scripts/redux/user'

const Profile = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchOrUpdateUserData(user.connection.token))
  }, [user.connection.token, dispatch])

  useEffect(() => {
    if (!user.connection.isConnected) {
      setTimeout(() => {
        navigate('/')
      }, 2000)
    }
  }, [user.connection.isConnected, navigate])

  return (
    <div className="profile">
      {user.connection.isConnected ? (
        <>
          <h1 className="profile__title">{`Welcome back \n${
            user.userData.firstName + ' ' + user.userData.lastName
          }!`}</h1>
          <EditButton />
          <AccountSection
            title="Argent Bank Checking (x8349)"
            amount={2082.79}
            subtitle="Available Balance"
          />
          <AccountSection
            title="Argent Bank Savings (x6712)"
            amount={10928.42}
            subtitle="Available Balance"
          />
          <AccountSection
            title="Argent Bank Credit Card (x8349)"
            amount={184.3}
            subtitle="Current Balance"
          />{' '}
        </>
      ) : (
        <h1 className="profile__title">
          {'You are not connected.\nRedirection to the home page...'}
        </h1>
      )}
    </div>
  )
}

export default Profile
