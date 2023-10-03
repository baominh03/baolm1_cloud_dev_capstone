import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { getUserId } from '../utils'
import { editGame } from '../../businessLogic/games'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userId = getUserId(event)
    const gameId = event.pathParameters.gameId
    const body: { gameName: string } = JSON.parse(event.body)

    const userGame = await editGame(userId, gameId, body.gameName)

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        userGame
      })
    }
  }
)
handler.use(
  cors({
    credentials: true
  })
)
