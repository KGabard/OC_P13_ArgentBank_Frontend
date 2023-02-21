import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import SignIn from '../pages/SignIn'
import Profile from '../pages/Profile'

/**
 * Router component for handling routing in the application.
 * @returns {JSX.Element} Routed components based on the path.
 */
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  )
}

export default Router
