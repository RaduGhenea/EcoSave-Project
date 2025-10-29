import { jwtDecode } from 'jwt-decode'

export function isTokenExpired(token) {
  const decoded = jwtDecode(token)
  if(!decoded || !decoded.exp) return true
  const now = Date.now / 1000
  return decoded.exp < now
}
