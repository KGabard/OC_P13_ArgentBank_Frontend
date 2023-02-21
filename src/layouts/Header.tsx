import React from 'react'
import { Link } from 'react-router-dom'
import argentBankLogo from '../assets/logos/argent-bank-logo.png'
import userIcon from '../assets/icons/icon-circle-user.svg'
import signOutIcon from '../assets/icons/icon-sign-out.svg'

function Header() {
  //! Add sign out wrapper when User is connected
  const name = 'Tony'
  const isConnected = false

  return (
    <header className="header">
      <Link to={'/'}>
        <img src={argentBankLogo} alt="Logo" className="header__logo" />
      </Link>
      {isConnected ? (
        <div className="header__sign-out-wrapper">
          <img
            src={userIcon}
            alt="user icon"
            className="header__sign-out-wrapper__user-logo"
          />
          <Link
            to={'/profile'}
            className="header__sign-out-wrapper__user-link"
          >
            {name}
          </Link>
          <img
            src={signOutIcon}
            alt="sign out icon"
            className="header__sign-out-wrapper__sign-out-logo"
          />
          <Link to={'/'} className="header__sign-out-wrapper__sign-out-link">
            Sign Out
          </Link>
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
