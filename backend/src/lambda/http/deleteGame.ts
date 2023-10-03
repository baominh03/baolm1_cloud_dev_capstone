import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { cors, httpErrorHandler } from 'middy/middlewares'
import * as middy from 'middy'
import { deleteGame } from '../../businessLogic/games'
import { getUserId } from '../utils'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const gameId = event.pathParameters.gameId
    const userId = getUserId(event)

    await deleteGame(userId, gameId)

    return {
      statusCode: 202,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({})
    }
  }
)

handler.use(httpErrorHandler()).use(
  cors({
    credentials: true
  })
)