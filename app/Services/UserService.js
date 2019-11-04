'use strict'
const User = use('App/Models/Child/User')
const Config = use('Config')
const apiConfig = Config.get('apiConfig')
const Hash = use('Hash')

class UserService {
  async save (params) {
    params.active = apiConfig.user.active.true
    return User.create(params)
  }

  async validatePassword (password, hashedPassword) {
    return Hash.verify(password, hashedPassword)
  }

  async createToken (userId) {
    let token = await Hash.make(userId)
    // token = token.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
    return token
  }

  async get (params = {}, page, limit) {
    if (!page) {
      page = 1
    }
    if (!limit) {
      limit = 10
    }

    let Users = User.query()
    if (params.active) {
      Users = Users.where('active', params.active)
    }
    if (params.name) {
      Users = Users.where('name', params.name)
    }
    Users = await Users
      .orderBy('created_at', 'desc')
      .paginate(page, limit)

    return Users
  }

  async getUserByName(name) {
    return User.findBy('name', name)
  }
}
module.exports = new UserService
