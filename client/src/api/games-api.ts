import { apiEndpoint } from '../config'
import { Game } from '../types/Game'
import Axios from 'axios'

export async function getGames(idToken: string): Promise<Game[]> {
  console.log('Fetching todos')

  const response = await Axios.get(`${apiEndpoint}/games`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`
    }
  })
  console.log('Games:', response.data)
  return response.data
}

export async function deleteGame(
  idToken: string,
  gameId: string
): Promise<void> {
  await Axios.delete(`${apiEndpoint}/games/${gameId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`
    }
  })
}

export async function addGame(idToken: string): Promise<string> {
  const response = await Axios.post(`${apiEndpoint}/games`, '', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`
    }
  })
  return response.data.uploadUrl
}

export async function editGame(
  idToken: string,
  gameId: string,
  gameName: string
): Promise<void> {
  await Axios.put(
    `${apiEndpoint}/games/${gameId}`,
    { gameName },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`
      }
    }
  )
}

export async function uploadFile(
  uploadUrl: string,
  file: Buffer
): Promise<any> {
  const response = await Axios.put(uploadUrl, file)
  return response.data
}
