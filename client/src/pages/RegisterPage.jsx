import { useNavigate } from "react-router-dom"
import Card from "../Card"
import RegisterContent from "../RegisterContent"
function RegisterPage() {
  const navigate = useNavigate()

  return(
    <div className="main-container">
      <Card title="Register">
        <RegisterContent />
      </Card>
      <button className="home-button" onClick={() => navigate('/')}>&larr; Home</button>
    </div>
  )
}

export default RegisterPage
