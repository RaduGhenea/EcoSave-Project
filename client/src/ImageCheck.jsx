import { useState, useRef } from "react"

function ImageCheck() {

  const fileInput=useRef()
  const imageLink="src/assets/can.png"

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
    if(!file) return alert("no image selected")

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
          {fileName ? fileName : "Upload Image"}
        </label>
          <input
            ref={fileInput}
            type="file"
            id="garbageImage"
            name="garbageImage"
            accept="image/png, image/jpeg"
            onChange={handleFileUpload}
          ></input>
        <label className="custom-submit" htmlFor="submitButton">Check</label>
        <input id="submitButton" type="submit" value="Check"></input>
      </form>
      <p>{output}</p>
    </div>
  )
}
export default ImageCheck
