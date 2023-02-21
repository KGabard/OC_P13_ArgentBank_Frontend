import React from 'react'

type Props = {
  title: string
  amount: number
  subtitle: string
}

function AccountSection({ title, amount, subtitle }: Props) {
  return (
    <section className="account-section">
      <h2 className="account-section__title">{title}</h2>
      <p className="account-section__amount">{amount}</p>
      <p className="account-section__subtitle">{subtitle}</p>
      <button className="account-section__view-button">
        View transactions
      </button>
    </section>
  )
}

export default AccountSection
