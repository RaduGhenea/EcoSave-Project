import { useAuth } from "./context"
import { Navigate } from "react-router-dom"
import { isTokenExpired } from "./utils/jwt"

function PrivateRoute({children}) {
  const { token, logout } = useAuth()
  if(!token || isTokenExpired(token)) {
    logout()
    return <Navigate to="/login" replace />
  }
  return children
}
export default PrivateRoute
