
import ImageCheck from "./ImageCheck"

function Card(props) {


  return(
    <div className="card-container">
      <div className="card-title-container">
        <p className="card-title">{props.title}</p>
      </div>
      <div className="card-content-container">
        {props.children}
      </div>
    </div>
  )
}

export default Card
