import { useAuth } from "./context"

function ProfileContent() {

  const {logout, streak, name} = useAuth()

  return (
    <div className="image-check-container">
      <div className="streak-container">
        <img className="streak-image" src="src/assets/streak_screen.png" />
        <p className="response-text">{`${streak ? streak : 0} Days`}</p>
      </div>
      <div className="profile-container">
        <p className="profile-text">{`Name: ${name}`}</p>
        <p className="profile-text">Placement: #1</p>
      </div>
      <button className="signout-button" onClick={logout}>Sign Out</button>

    </div>
  )
}

export default ProfileContent
