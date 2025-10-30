import { useEffect } from "react"
import Card from "./Card"
import ImageCheck from "./ImageCheck"
import Leaderboard from "./LeaderBoard"
import ProfileContent from "./ProfileContent"
import { useAuth } from "./context"
import { useState } from "react"

function App() {
  const { token } = useAuth()
  const [streak, setStreak] = useState()
  const [name, setName] = useState()
  const [rank, setRank] = useState()
  const [leaderboard, setLeaderboard] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/getuserdata', {
      method: "GET",
      headers: {Authorization: `Bearer ${token}`},
    })
    .then((res) => {
      if(!res.ok) throw new Error("invalid token")
      return res.json()
    })
    .then((data) => {
      setStreak(data.streak)
      setName(data.username)
      setRank(data.placement)
    })

    fetch('http://localhost:3000/getleaderboard', {
      method: "GET",
      headers: {Authorization: `Bearer ${token}`},
    })
    .then((res) => {
      if(!res.ok) throw new Error("invalid token")
      return res.json()
    })
    .then((data) => {
      setLeaderboard(data.leaderboard)
    })

  }, [token])


  return (
    <>
      <div className="main-container">
        <Card title="Recycle">
          <ImageCheck />
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
