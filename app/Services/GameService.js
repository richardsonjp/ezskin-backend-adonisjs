'use strict'
const Game = use('App/Models/Child/Game')

class GameService {
  async save (params) {
    let addGame = await Game.create(params)
    return addGame
  }
  async getOptions () {
    return Game.all()
  }
  async get (params = {}, page, limit) {
    if (!page) {
      page = 1
    }
    if (!limit) {
      limit = 10
    }

    let Games = Game.query()
    if (params.status) {
      Games = Games.where('name', params.name)
    }
    Games = await Games
      .orderBy('created_at', 'desc')
      .paginate(page, limit)

    return Games
  }
}
module.exports = new GameService
