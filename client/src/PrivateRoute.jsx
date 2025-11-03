import { useAuth } from "./context"
import { Navigate } from "react-router-dom"
import { isTokenExpired } from "./utils/jwt"
import { useEffect } from "react"

function PrivateRoute({children}) {
  const { token, logout } = useAuth()

  useEffect(() => {
    if(!token || isTokenExpired(token)) {
      logout()
    }
  }, [token, logout])

  if(!token || isTokenExpired(token)) {
    return <Navigate to="/login" replace />
  }
  return children
}
export default PrivateRoute
