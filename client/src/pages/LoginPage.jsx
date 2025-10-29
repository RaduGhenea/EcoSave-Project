import { useState } from "react"
import { useAuth } from "../context"
import { useNavigate } from "react-router-dom"

function LoginPage() {

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
    const response = await fetch('http://localhost:3000/login', {
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
    <div>
      <h1>Log In:</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="emailField">Enter email:</label> <br />
        <input onInput={(e) => setEmailInput(e.target.value)} id="emailField" type="text" placeholder="email"></input> <br />
        <label htmlFor="passwordField">Enter password:</label> <br />
        <input onInput={(e) => setPasswordInput(e.target.value)} id="passwordField" type="text" placeholder="password"></input> <br />
        <label htmlFor="submitButton">Log In</label> <br />
        <input id="submitButton" type="submit" value="login"></input>
      </form>
    </div>
  )
}

export default LoginPage
