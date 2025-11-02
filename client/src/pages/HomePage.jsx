import Card from "../Card"
import ImageCheck from "../ImageCheck"
import LoginContent from "../LoginContent"
import { useAuth } from "../context"
import { Navigate, useNavigate } from "react-router-dom"

function HomePage() {
  const { token } = useAuth()
  if(token)
    return <Navigate to={'/dashboard'}></Navigate>

  const navigate = useNavigate()

  return (
    <div className="main-container">
      <Card title="Recycle">
        <ImageCheck />
      </Card>
      {/* <Card title="Sign In">
        <LoginContent />
      </Card>*/}
      <div className="About-Us-Card">
        <div className="card-title-container">
          <p className="card-title">About Us</p>
        </div>
        <div className="about-card-content-container">
          <div className="about-background">
            <p className="username-text">
              At EcoTrack, we believe that every small action counts. Our mission is to make recycling simple, rewarding, and fun for everyone. With just a quick photo, you can identify different types of waste, learn how to dispose of them properly, and contribute to a cleaner planet — one item at a time.
            </p>
            <p className="username-text">
              We’re not just an app — we’re a growing community of eco-conscious individuals building better habits together. Track your recycling streaks, compete on weekly leaderboards, and celebrate your progress as you make a real-world impact.
            </p>
            <p className="username-text">
              Join us on our journey toward a sustainable future. Together, let’s turn everyday recycling into a global movement. ♻️
            </p>
          </div>
          <div className="about-buttons">
            <button onClick={() => navigate('/login')} >Sign In</button>
            <button onClick={() => navigate('/register')} >Register</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
