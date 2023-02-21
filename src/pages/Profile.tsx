import EditButton from "../components/EditButton"

const Profile = () => {
  const name = 'Tony Jarvis'

  return (
    <div className="profile">
      <h1 className="profile__title">Welcome back {name}</h1>
      <EditButton />
    </div>
  )
}

export default Profile