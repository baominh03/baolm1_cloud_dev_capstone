import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { editGame } from '../api/games-api'

const EditGame = ({ idToken }: { idToken: string }) => {
  const params = useParams<{ gameId: string }>()
  const [gameName, setGameName] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const history = useHistory()
  function handleEditGame() {
    setLoading(true)
    if (!gameName || !gameName.length)
      return alert('Please enter a game name')

    editGame(idToken, params.gameId, gameName)
      .then(() => {
        history.push('/')
      })
      .catch(() => {
        alert('Failed to edit game. Maybe the game name is too short')
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <div>
      <p>Rename the game</p>{' '}
      <input
        value={gameName}
        type="text"
        onChange={(e) => {
          setGameName(e.target.value)
        }}
      />
      <button disabled={loading} onClick={handleEditGame}>
        Confirm
      </button>
    </div>
  )
}

export default EditGame
