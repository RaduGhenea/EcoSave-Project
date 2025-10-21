import { useState } from "react"

function ImageCheck() {

  const fileInput=<input
    type="file"
    id="garbageImage"
    name="garbageImage"
    accept="image/png, image/jpeg"
    onChange={handleFileUpload}
    />

  const imageLink="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNZrTy12yoy83gLwhX4dr9RoDdj7t_myuxag&s"

  const [displayImage, setDisplayImage] = useState();
  const [fileName, setFileName] = useState()

  function handleFileUpload(event) {
    setFileName(event.target.files[0].name)
    const reader = new FileReader()
    reader.onloadend = () => {
      setDisplayImage(reader.result)
    }
    reader.readAsDataURL(event.target.files[0])
  }

  return(
    <div className="image-check-container">
      <img className="recycle-image" src={displayImage ? displayImage : imageLink}></img>

      <form className="image-check-form">
        <label
          htmlFor="garbageImage"
          className="custom-upload">{fileName ? fileName : "Upload Image"}
        </label>
        {fileInput}
        {/* <input type="file" id="garbageImage" name="garbageImage"></input>*/}
        <input type="submit" value="Check"></input>
      </form>
    </div>
  )
}
export default ImageCheck
