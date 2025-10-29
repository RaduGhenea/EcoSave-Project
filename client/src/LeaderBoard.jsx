function Leaderboard() {
  const leaderboard = [
    {
      name: "Radu1",
      score: 120
    },
    {
      name: "Radu2",
      score: 69
    },
    {
      name: "Radu3",
      score: 67
    },
    {
      name: "Radu3",
      score: 67
    },
    {
      name: "Radu3",
      score: 67
    },
    {
      name: "Radu3",
      score: 67
    },
    {
      name: "Radu3",
      score: 67
    },
    {
      name: "Radu3",
      score: 67
    },
    {
      name: "Radu3",
      score: 67
    },
    {
      name: "Radu3",
      score: 67
    },
    {
      name: "Radu3",
      score: 67
    },
    {
      name: "Radu3",
      score: 67
    },
    {
      name: "Radu3",
      score: 67
    },
  ]

  return(
   <div className="image-check-container">
     <ul className="list">
       {leaderboard.map((user, index) => (
         <li className="list-element" key={user.name}>
           <div className="list-div">
             <div className="rank-bg">
               <p className="rank-text">{index + 1}</p>
             </div>
             <div className="name-bg">
               <p className="username-text">{ user.name }</p>
             </div>
             <div className="score-bg">
              <p className="score-text">{ user.score }</p>
             </div>

           </div>
         </li>
       ))}
     </ul>
   </div>
  )
}

export default Leaderboard
