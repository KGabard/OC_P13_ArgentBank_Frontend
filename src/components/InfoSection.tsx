import React from 'react'
import chatIcon from '../assets/icons/icon-chat.png'
import moneyIcon from '../assets/icons/icon-money.png'
import securityIcon from '../assets/icons/icon-security.png'

type Props = {
  title: string
  text: string
  version: 'chat' | 'money' | 'security'
}

function InfoSection({ title, text, version }: Props) {
  let logo = ''
  switch (version) {
    case 'chat':
      logo = chatIcon
      break
    case 'money':
      logo = moneyIcon
      break
    case 'security':
      logo = securityIcon
      break

    default:
      break
  }
  return (
    <section className="info-section">
      <img src={logo} alt="logo" className="info-section__logo" />
      <div className="info-section__content-wrapper">
        <h1 className="info-section__content-wrapper__title">{title}</h1>
        <p className="info-section__content-wrapper__text">{text}</p>
      </div>
    </section>
  )
}

export default InfoSection
