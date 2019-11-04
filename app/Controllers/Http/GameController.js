'use strict'

const GameService = use('App/Services/GameService')
const GamesOptionsTransformer = use('App/Transformers/GamesOptionsTransformer')

class GameController {
  async create ({ request, response }) {
    let params = request.only(['name'])
    try {
      let data = await GameService.save(params)
      return response.status(200).send(data)
    } catch (error) {
      return response.status(400).send(error)
    }
  }

  async list ({ response, transform }) {
    let data = await GameService.get()
    let result = await transform.paginate(data, GamesOptionsTransformer)
    return response.status(200).send(result)
  }

  async options ({ response, transform }) {
    let data = await GameService.getOptions()
    let result = await transform.collection(data, GamesOptionsTransformer)
    return response.status(200).send(result)
  }
}

module.exports = GameController
