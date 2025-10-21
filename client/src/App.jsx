import Card from "./Card"
import ImageCheck from "./ImageCheck"

function App() {

  return (
    <>
      <div className="main-container">
        <Card title="Recycle">
          <ImageCheck />
        </Card>
        <Card title="Leaderboard" />
        <Card title="Streak" />
      </div>
    </>
  )
}

export default App
