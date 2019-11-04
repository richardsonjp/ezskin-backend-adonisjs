'use strict'

const SalesService = use('App/Services/SalesService')
const SalesTransformer = use('App/Transformers/SalesTransformer')
const Config = use('Config')
const apiConfig = Config.get('apiConfig')

class SalesController {
  async list ({ request, response, transform }) {
    let params = Object.assign({}, request.qs)
    try {
      if (request.qs.status) {
        delete params.status
        params.status = request.qs.status
      }
      if (request.qs.gameId) {
        delete params.game_id
        params.game_id = request.qs.gameId
      }
      if (request.qs.name) {
        delete params.name
        params.name = request.qs.name
      }
      if (request.qs.bought_by) {
        delete params.bought_by
        params.bought_by = request.qs.bought_by
      }
      if (request.qs.buyer) {
        delete params.buyer
        params.buyer = request.qs.buyer
      }
    let data = await SalesService.get(params, request.qs.page, request.qs.limit)
    const result = await transform.paginate(data, SalesTransformer)
    return response.status(200).send(result)
    } catch (error) {
      console.log(error)
      return response.status(400).send(error)
    }
  }

  async post ({ request, response }) {
    let params = request.only(['name','exterior','float','buy','sell','game_id','bought_by','tradeable_at', 'note'])
    try {
      let data = await SalesService.save(params)
      return response.status(200).send(data)
    } catch (error) {
      return response.status(400).send(error)
    }
  }

  async update ({ request, response }) {
    let params = request.body
    try {
      const CurrentStatus = await SalesService.getById(request.params.id)
      if (CurrentStatus.status === apiConfig.sales.status.sold) {
        return response.status(400).send({message: 'status is final, update not allowed'})
      }
      await SalesService.update(request.params.id, params)
      return response.status(204).send('')
    } catch (error) {
      return response.status(400).send(error)
    }
  }

  async logintemp ({ request, response }) {
    let params = request.only(['user', 'password'])
    if (params.user == 'kenny' && params.password == '1234') {
      return response.status(200).send({message: 'successful'})
    } else if (params.user == 'dwiki' && params.password == '1234') {
      return response.status(200).send({message: 'successful'})
    }
    return response.status(401).send({message: 'User not recognized'})
  }
}
module.exports = SalesController
