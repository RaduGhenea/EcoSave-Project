import { useState } from "react"
import { useAuth } from "./context"
import { useNavigate } from "react-router-dom"
const API_URL = import.meta.env.VITE_API_URL;
import './login.css'

function LoginContent() {

  const [emailInput, setEmailInput] = useState()
  const [passwordInput, setPasswordInput] = useState()
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()
    const data = new FormData()
    data.append("email", emailInput)
    data.append("password", passwordInput)
    console.log(data)
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      body: data
    })
    const result = await response.json()
    if(result.error == null) {
      login(result.access_token, result.username, result.streak)
      navigate('/dashboard')
    }

  }
  return(
    <div className="image-check-container">
      <div className="login-content">
        <form className="login-form" onSubmit={handleSubmit}>

          <div className="email-container">
            <div className="login-title">
              <label className="email-label" htmlFor="emailField">Enter email:</label> <br />
            </div>
            <input className="email-field" onInput={(e) => setEmailInput(e.target.value)} id="emailField" type="text" placeholder="email"></input> <br />
          </div>
          <div className="email-container">
            <div className="login-title">
              <label className="password-label" htmlFor="passwordField">Enter password:</label> <br />
            </div>
            <input className="password-field" onInput={(e) => setPasswordInput(e.target.value)} id="passwordField" type="password" placeholder="password"></input> <br />
          </div>
          <label className="signin-label" htmlFor="submitButton">Sign In</label> <br />
          <input id="submitButton" type="submit" value="login"></input>
        </form>
      </div>
    </div>
  )
}

export default LoginContent
