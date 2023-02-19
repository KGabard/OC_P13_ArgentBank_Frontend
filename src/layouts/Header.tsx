import React from 'react'
import { Link } from 'react-router-dom'
import argentBankLogo from '../assets/logos/argent-bank-logo.png'
import userIcon from '../assets/icons/icon-circle-user.svg'

function Header() {
  return (
    <header className="header">
      <Link to={'/'}>
        <img src={argentBankLogo} alt="Logo" className="header__logo" />
      </Link>
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
    </header>
  )
}

export default Header
