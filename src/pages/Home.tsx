import Banner from '../components/Banner'
import InfoSection from '../components/InfoSection'

const Home = () => {
  return (
    <div className="home">
      <Banner />
      <div className="home__info-sections-container">
        <InfoSection
          title="You are our #1 priority"
          text="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
          version="chat"
        />
        <InfoSection
          title="More savings means higher rates"
          text="The more you save with us, the higher your interest rate will be!"
          version="money"
        />
        <InfoSection
          title="Security you can trust"
          text="We use top of the line encryption to make sure your data and money is always safe."
          version="security"
        />
      </div>
    </div>
  )
}

export default Home
