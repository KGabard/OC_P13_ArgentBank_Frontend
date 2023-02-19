import React from 'react'
import bannerImage from '../assets/images/bank-tree.jpeg'

function Banner() {
  return (
    <section
      className="banner"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      <div className="banner__text-container">
        <p className="banner__text-container__title">No fees.</p>
        <p className="banner__text-container__title">No minimum deposit.</p>
        <p className="banner__text-container__title">High interest rates.</p>
        <p className="banner__text-container__text">
          Open a savings account with Argent Bank today!
        </p>
      </div>
    </section>
  )
}

export default Banner
