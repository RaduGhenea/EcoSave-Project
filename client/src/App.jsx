import Card from "./Card"
import ImageCheck from "./ImageCheck"
import Leaderboard from "./LeaderBoard"
import ProfileContent from "./ProfileContent"
import { useAuth } from "./context"

function App() {

  return (
    <>
      <div className="main-container">
        <Card title="Recycle">
          <ImageCheck />
        </Card>
        <Card title="Leaderboard">
          <Leaderboard />
        </Card>
        <Card title="Profile">
          <ProfileContent></ProfileContent>
        </Card>
      </div>
    </>
  )
}

export default App
