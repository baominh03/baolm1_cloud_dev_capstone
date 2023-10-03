import * as AWS from 'aws-sdk'
const AWSXRay = require('aws-xray-sdk')
import { createLogger } from '../utils/logger'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { UserGame } from '../models/userGame'

const XAWS = AWSXRay.captureAWS(AWS)
const logger = createLogger('gameAccess')

export class GameAccess {
  constructor(
    private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
    private readonly gamesTable = process.env.GAMES_TABLE
  ) {}

  async getGames(userId: string): Promise<UserGame[]> {
    try {
      logger.info('Getting all games for user', userId)
      const result = await this.docClient
        .query({
          TableName: this.gamesTable,
          KeyConditionExpression: 'userId = :userId',
          ExpressionAttributeValues: {
            ':userId': userId
          }
        })
        .promise()
      logger.info('Getting all games for user successfully', userId, result)

      return result.Items as UserGame[]
    } catch (error) {
      logger.error('Failed to get all games for user', error, userId)
    }
  }

  async deleteGame(userId: string, gameId: string): Promise<void> {
    try {
      logger.info('Deleting a game for user', userId, gameId)
      await this.docClient
        .delete({
          TableName: this.gamesTable,
          Key: { userId, gameId }
        })
        .promise()
      logger.info(`game ${gameId} deleted for user`, userId)
    } catch (error) {
      logger.error('Failed to delete game', error, userId, gameId)
    }
  }

  async saveGame(uesrGameDto: UserGame): Promise<UserGame> {
    try {
      logger.info('Saving a game for user', uesrGameDto)

      await this.docClient
        .put({
          TableName: this.gamesTable,
          Item: uesrGameDto
        })
        .promise()
      logger.info('Saving a game for user successfully', uesrGameDto)

      return uesrGameDto
    } catch (error) {
      logger.error('Failed to save a game for user', error, uesrGameDto)
      return null
    }
  }

  async editGame(uesrGameDto: {
    userId: string
    gameId: string
    gameName: string
  }): Promise<{ userId: string; gameId: string; gameName: string }> {
    try {
      logger.info('Editing a game for user', uesrGameDto)

      await this.docClient
        .update({
          TableName: this.gamesTable,
          Key: {
            userId: uesrGameDto.userId,
            gameId: uesrGameDto.gameId
          },
          UpdateExpression: 'set #n = :n',
          ExpressionAttributeNames: { '#n': 'gameName' },
          ExpressionAttributeValues: {
            ':n': uesrGameDto.gameName
          }
        })
        .promise()
      logger.info('Editing a game for user successfully', uesrGameDto)

      return uesrGameDto
    } catch (error) {
      logger.error('Failed to save a game for user', error, uesrGameDto)
      return null
    }
  }
}
