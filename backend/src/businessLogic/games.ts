import { GameAccess } from '../dataLayer/gameAccess'
import { createLogger } from '../utils/logger'
import { AttachmentUtils } from '../helpers/attachmentUtils'

const logger = createLogger('GameAccess')
const attachmentUtils = new AttachmentUtils()
const gameAccess = new GameAccess()

export const getGamesForUser = async (userId: string) => {
  return gameAccess.getGames(userId)
}

export const addGame = async (userId: string, gameId: string) => {
  logger.info(`adding a game with key: ${gameId}`)
  const gameUrl = attachmentUtils.getAttachmentUrl(gameId)
  return gameAccess.saveGame({ userId, gameId, gameUrl })
}

export const editGame = async (
  userId: string,
  gameId: string,
  gameName: string
) => {
  logger.info(`adding a game with key: ${gameId}`)
  return gameAccess.editGame({ userId, gameId, gameName })
}

export const deleteGame = async (userId: string, gameId: string) => {
  return gameAccess.deleteGame(userId, gameId)
}
