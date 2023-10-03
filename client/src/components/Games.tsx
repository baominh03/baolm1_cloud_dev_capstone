import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { deleteGame, getGames } from '../api/games-api'
import { Game } from '../types/Game'
interface Auth {
  idToken: string;
}
const Games = ({ auth }: { auth: Auth }) => {
  const history = useHistory()
  const [games, setGames] = React.useState<Game[]>([])
  const [loading, setLoading] = React.useState(true)
  const [count, setCount] = React.useState(0)
  useEffect(() => {
    getGames(auth.idToken).then((data) => {
      setLoading(false)
      setGames(data)
    })
  }, [auth.idToken, count])

  async function handleDeleteGame(key: string) {
    await deleteGame(auth.idToken, key).then(() => {
      setCount(count + 1)
    })
  }
  return (
    <div>
      <h1> Games:</h1>
      <h3>Add new game or Select Game to rename</h3>
      {!!loading && <p>Loading...</p>}
      <div>
        {games.map((game) => {
          return (
            <>
              <div
                key={game.gameId}
                style={{
                  cursor: 'pointer',
                  marginBottom: '3rem'
                }}
              >
                <img
                  onClick={() => {
                    history.push(`/games/edit/${game.gameId}`)
                  }}
                  width={300}
                  height={300}
                  src={game.gameUrl}
                  alt={game.gameName}
                />
                <button
                  onClick={() => {
                    handleDeleteGame(game.gameId)
                  }}
                >
                  Delete
                </button>
              </div>{' '}
              <p> {game.gameName}</p>
            </>
          )
        })}
      </div>
      <div>
        <button onClick={() => history.push('/games/add')}>Add a game</button>
      </div>
    </div>
  )
}

export default Games
