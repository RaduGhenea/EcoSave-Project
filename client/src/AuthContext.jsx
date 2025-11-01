import { useState } from "react"
import { AuthContext } from "./context";
import { useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL;


function AuthProvider({children}) {
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [streak, setStreak] = useState(0)
  const [name, setName] = useState("")


  const setData = (name, streak) => {
    setName(name)
    setStreak(streak)
  }

  const login = (new_token) => {
    setToken(new_token)
    localStorage.setItem("token", new_token)
  }
  const logout = () => {
    setToken(null)
    localStorage.removeItem("token")
  }
  useEffect(() => {
    if(!token) return
    fetch(`${API_URL}/verify`, {
      method: "GET",
      headers: {Authorization: `Bearer ${token}`},
    })
      .then((res) => {
        if(!res.ok) throw new Error("invalid token")
        return res.json()
      })
      .then((data) => setData(data.username, data.streak))
      .catch(() => logout())
  }, [token])

  return (
    <AuthContext.Provider value={{token, login, logout, setData, name, streak}}>
      {children}
    </AuthContext.Provider>
  )
}
export default AuthProvider
