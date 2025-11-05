import { useEffect } from "react"
import Card from "./Card"
import ImageCheck from "./ImageCheck"
import Leaderboard from "./LeaderBoard"
import ProfileContent from "./ProfileContent"
import { useAuth } from "./context"
import { useState } from "react"
const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const { token } = useAuth()
  const [streak, setStreak] = useState()
  const [name, setName] = useState()
  const [rank, setRank] = useState()
  const [leaderboard, setLeaderboard] = useState([])

  useEffect(() => {
    if (!token) return
    fetch(`${API_URL}/getuserdata`, {
      method: "GET",
      headers: {Authorization: `Bearer ${token}`},
    })
    .then((res) => {
      if(!res.ok) throw new Error("invalid token")
      // console.log(res.text())
      const contentType = res.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        // Probably an OPTIONS response or HTML; ignore it
        return null;
      }
      return res.json()
    })
    .then((data) => {
      if(!data) return
      setStreak(data.streak)
      setName(data.username)
      setRank(data.placement)
    })

    fetch(`${API_URL}/getleaderboard`, {
      method: "GET",
      headers: {Authorization: `Bearer ${token}`},
    })
    .then((res) => {
      if(!res.ok) throw new Error("invalid token")
      const contentType = res.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        // Probably an OPTIONS response or HTML; ignore it
        return null;
      }
      return res.json()
    })
    .then((data) => {
      if(data) setLeaderboard(data.leaderboard)
    })

  }, [token])

  function AddStreak() {
    setStreak(streak+1)
  }

  return (
    <>
      <div className="main-container">
        <Card title="Recycle">
          <ImageCheck OnStreakChange={AddStreak} />
        </Card>
        <Card title="Leaderboard">
          <Leaderboard leaderboard={leaderboard} />
        </Card>
        <Card title="Profile">
          <ProfileContent streak={streak} name={name} rank={rank}></ProfileContent>
        </Card>
      </div>
    </>
  )
}

export default App
