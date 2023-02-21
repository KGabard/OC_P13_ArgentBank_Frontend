import AccountSection from "../components/AccountSection"
import EditButton from "../components/EditButton"

const Profile = () => {
  const name = 'Tony Jarvis'  

  return (
    <div className="profile">
      <h1 className="profile__title">{`Welcome back \n${name}!`}</h1>
      <EditButton />
      <AccountSection title="Argent Bank Checking (x8349)" amount={2082.79} subtitle='Available Balance' />
      <AccountSection title="Argent Bank Savings (x6712)" amount={10928.42} subtitle='Available Balance' />
      <AccountSection title="Argent Bank Credit Card (x8349)" amount={184.30} subtitle='Current Balance' />
    </div>
  )
}

export default Profile