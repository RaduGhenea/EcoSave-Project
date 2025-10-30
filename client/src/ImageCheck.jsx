import { useState, useRef } from "react"

function ImageCheck() {

  const fileInput=useRef()
  const imageLink="src/assets/recycle_screen.png"

  const [displayImage, setDisplayImage] = useState();
  const [fileName, setFileName] = useState()
  const [output, setOutput] = useState()

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
      setOutput("Glass")
      return
    }

    const formData = new FormData()
    formData.append("image", file)

    const response = await fetch('http://localhost:3000/upload-image', {
      method: "POST",
      body: formData,
    })
    const result = await response.json()
    setOutput(result);
  }

  return(
    <div className="image-check-container">
      <img className="recycle-image" src={displayImage ? displayImage : imageLink}></img>

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
        <img className="check-mark" src="src/assets/Sign-check-icon.png"></img>
        <p className="response-text">{output}</p>
      </div>
    </div>
  )
}
export default ImageCheck
