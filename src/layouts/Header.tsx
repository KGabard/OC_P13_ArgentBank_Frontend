import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import argentBankLogo from '../assets/logos/argent-bank-logo.png'
import userIcon from '../assets/icons/icon-circle-user.svg'
import signOutIcon from '../assets/icons/icon-sign-out.svg'
import { useAppDispatch, useAppSelector } from '../scripts/redux/hooks'
import { selectUser, signOut } from '../scripts/redux/user'

function Header() {
  const user = useAppSelector(selectUser)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleSignOut = () => {
    dispatch(signOut())
    navigate('/')
  }

  return (
    <header className="header">
      <Link to={'/'}>
        <img src={argentBankLogo} alt="Logo" className="header__logo" />
      </Link>
      {user.connection.isConnected ? (
        <div className="header__sign-out-wrapper">
          <img
            src={userIcon}
            alt="user icon"
            className="header__sign-out-wrapper__user-logo"
          />
          <Link to={'/profile'} className="header__sign-out-wrapper__user-link">
            {user.userData.firstName}
          </Link>
          <img
            src={signOutIcon}
            alt="sign out icon"
            className="header__sign-out-wrapper__sign-out-logo"
          />
          <p
            onClick={handleSignOut}
            className="header__sign-out-wrapper__sign-out-link"
          >
            Sign Out
          </p>
        </div>
      ) : (
        <div className="header__sign-in-wrapper">
          <img
            src={userIcon}
            alt="user icon"
            className="header__sign-in-wrapper__logo"
          />
          <Link to={'/sign-in'} className="header__sign-in-wrapper__link">
            Sign In
          </Link>
        </div>
      )}
    </header>
  )
}

export default Header
