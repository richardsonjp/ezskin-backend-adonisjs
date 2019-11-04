'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')

/**
 * SalesTransformer class
 *
 * @class SalesTransformer
 * @constructor
 */
class SalesTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  transform (model) {
    return {
      id: model.id,
      name: model.name,
      exterior: model.exterior,
      float: model.float,
      buy: model.buy,
      sell: model.sell,
      profit: model.sell - model.buy,
      status: model.status,
      down_payment_at: model.down_payment_at,
      down_payment_amount: model.down_payment_amount,
      full_payment_at: model.full_payment_at,
      full_payment_amount: model.full_payment_amount,
      bought_by: model.bought_by,
      payment_to: model.payment_to,
      payment_by: model.payment_by,
      buyer: model.buyer,
      tradeable_at: model.tradeable_at,
      note: model.note,
      created_at: model.created_at
    }
  }
}

module.exports = SalesTransformer
