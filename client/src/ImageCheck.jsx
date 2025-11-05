import { useState, useRef } from "react"
import canImage from './assets/recycle_screen.png'
import checkImage from './assets/Sign-check-icon.png'
import crossImage from './assets/redcross.png'
import { useAuth } from "./context"

function ImageCheck({ OnStreakChange }) {

  const fileInput=useRef()
  const { token } = useAuth()

  const [displayImage, setDisplayImage] = useState();
  const [fileName, setFileName] = useState()
  const [output, setOutput] = useState()
  const [resImage, setResImage] = useState(checkImage)

  function handleFileUpload(event) {
    setFileName(event.target.files[0].name)
    const reader = new FileReader()
    reader.onloadend = () => {
      setDisplayImage(reader.result)
    }
    reader.readAsDataURL(event.target.files[0])
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const file = fileInput.current.files[0]
    if(!file) {
      setOutput("No Image Uploaded")
      setResImage(crossImage)
      return
    }
    setResImage(checkImage)

    const formData = new FormData()
    formData.append("image", file)
    setOutput("loading")

    const response = await fetch('http://localhost:3000/upload-image', {
      method: "POST",
      headers: { Authorization: token ? `Bearer ${token}` : "" },
      body: formData,
    })
    console.log(response)
    const result = await response.json()
    if (!response.ok) {
      setResImage(crossImage)
      setOutput("Could Not Get result")
    }
    else {
      setResImage(checkImage)
      setOutput(result.response);
      if(result.streakchanged) {
        OnStreakChange()
      }
    }
  }

  return(
    <div className="image-check-container">
      <img className="recycle-image" src={displayImage ? displayImage : canImage}></img>

      <form onSubmit={handleSubmit} className="image-check-form">
        <label
          htmlFor="garbageImage"
          className="custom-upload"
        >
          {fileName ? fileName : "Browse Image"}
        </label>
          <input
            ref={fileInput}
            type="file"
            id="garbageImage"
            name="garbageImage"
            accept="image/png, image/jpeg"
            onChange={handleFileUpload}
          ></input>
        <label className="custom-submit" htmlFor="submitButton">Upload</label>
        <input id="submitButton" type="submit" value="Check"></input>
      </form>
      <div className={output ? "response" : "vanish"}>
        <img className={output != "loading" ? "check-mark" : "vanish"} src={resImage}></img>
        <div className={output=="loading" ? "loader" : "vanish"}></div>
        <p className="response-text">{output}</p>
      </div>
    </div>
  )
}
export default ImageCheck
