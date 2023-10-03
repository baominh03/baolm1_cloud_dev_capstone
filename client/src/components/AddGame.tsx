import React from 'react'
import { useHistory } from 'react-router-dom'
import { addGame, uploadFile } from '../api/games-api'
interface Auth {
  idToken: string;
}
const AddGame = ({ auth }: { auth: Auth }) => {
  const [files, setFiles] = React.useState<any>()
  const history = useHistory()
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    setFiles(files)
  }
  const [isUploading, setIsUploading] = React.useState(false)
  async function handleUploadFile() {
    if (!files) return
    setIsUploading(true)

    const uploadUrl = await addGame(auth.idToken)
    console.log(uploadUrl)
    console.log(files[0])
    await uploadFile(uploadUrl, files[0])
    setIsUploading(false)
    history.push('/')
    alert('Added game, Click OK button and waiting for game image is shown')
  }

  return (
    <div>
      <button disabled={!files} onClick={handleUploadFile}>
        Upload
      </button>
      {isUploading ? <p>Uploading...</p> : null}
      <input
        type="file"
        accept="image/*"
        placeholder="upload game image"
        onChange={handleFileChange}
      />
    </div>
  )
}

export default AddGame
