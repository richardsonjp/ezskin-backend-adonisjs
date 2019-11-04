'use strict'
const UserService = use('App/Services/UserService')
const UserTransformer = use('App/Transformers/UserTransformer')

class UserController {
  async store ({ request, response, transform }) {
    try {
      let params = request.only(['name', 'password', 'active'])
      const data = await UserService.save(params)
      const result = await transform.item(data, UserTransformer)
      return response.status(201).send(result)
    } catch (error) {
      console.log(error)
      return response.status(400).send(error)
    }
  }

  async list ({ request, response, transform }) {
    let params = Object.assign({}, request.qs)
    try {
      if (request.qs.name) {
        delete params.name
        params.name = request.qs.name
      }
      if (request.qs.active) {
        delete params.active
        params.active = request.qs.active
      }
      let data = await UserService.get(params, request.qs.page, request.qs.limit)
      const result = await transform.paginate(data, UserTransformer)
      return response.status(200).send(result)
    } catch (error) {
      console.log(error)
      return response.status(400).send(error)
    }
  }
}

module.exports = UserController
