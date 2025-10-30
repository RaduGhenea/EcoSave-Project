import LoginContent from "../LoginContent"
import Card from "../Card"
function LoginPage() {
  return(
    <div className="main-container">
      <Card title="Sign In">
        <LoginContent />
      </Card>
    </div>
  )
}

export default LoginPage
