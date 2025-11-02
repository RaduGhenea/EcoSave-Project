import LoginContent from "../LoginContent"
import Card from "../Card"
import { useNavigate } from "react-router-dom"
function LoginPage() {
  const navigate = useNavigate()

  return(
    <div className="main-container">
      <Card title="Sign In">
        <LoginContent />
      </Card>
      <button className="home-button" onClick={() => navigate('/')}> &larr; Home</button>
    </div>
  )
}

export default LoginPage
