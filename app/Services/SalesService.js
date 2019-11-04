'use strict'
const Sale = use('App/Models/Child/Sale')

class SalesService {
  async get (params = {}, page, limit) {
    if (!page) {
      page = 1
    }
    if (!limit) {
      limit = 10
    }

    let Sales = Sale.query()
    if (params.status) {
      Sales = Sales.where('status', params.status)
    }
    if (params.game_id) {
      Sales = Sales.where('game_id', params.game_id)
    }
    if (params.name) {
      Sales = Sales.where('name', params.name)
    }
    if (params.bought_by) {
      Sales = Sales.where('bought_by', params.bought_by)
    }
    if (params.buyer) {
      Sales = Sales.where('buyer', params.buyer)
    }
    Sales = await Sales
      .orderBy('created_at', 'desc')
      .paginate(page, limit)

    return Sales
  }

  async save (params) {
    let addSale = await Sale.create(params)
    return addSale
  }

  async update (id, params) {
    return Sale.query()
    .where('id', id)
    .update(params)
  }

  async getById (id) {
    let sales = await Sale.findBy('id', id)
    if (!sales) {
      return sales
    }
    return sales
  }
}
module.exports = new SalesService
