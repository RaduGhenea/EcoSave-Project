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
      // credentials: "include",
      headers: {Authorization: `Bearer ${token}`},
    })
      .then((res) => {
        if(!res.ok) console.log("AAAA")  // throw new Error("invalid token")
        const contentType = res.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
          // Probably an OPTIONS response or HTML; ignore it
          console.log(res.text())
          return null;
        }

        return res.json();
      })
      .then((data) => console.log(data))
      .catch((e) => logout())
  }, [token])

  return (
    <AuthContext.Provider value={{token, login, logout, setData, name, streak}}>
      {children}
    </AuthContext.Provider>
  )
}
export default AuthProvider
