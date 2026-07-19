import { Navigate } from 'react-router'
import { useAuth } from '../../context/AuthContext.jsx'

function RequireAuth({ children }) {
  const { isLoggedIn } = useAuth()
  return isLoggedIn ? children : <Navigate to="/" replace />
}

export default RequireAuth
