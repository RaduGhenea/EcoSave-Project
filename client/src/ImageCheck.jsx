import { useState, useRef } from "react"

function ImageCheck() {



  const fileInput=useRef()
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
    alert(result)
  }

  return(
    <div className="image-check-container">
      <img className="recycle-image" src={displayImage ? displayImage : imageLink}></img>

      <form onSubmit={handleSubmit} className="image-check-form">
        <label
          htmlFor="garbageImage"
          className="custom-upload">{fileName ? fileName : "Upload Image"}
        </label>
          <input
            ref={fileInput}
            type="file"
            id="garbageImage"
            name="garbageImage"
            accept="image/png, image/jpeg"
            onChange={handleFileUpload}
          ></input>
        <input type="submit" value="Check"></input>
      </form>
    </div>
  )
}
export default ImageCheck
