'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')

/**
 * GamesOptionsTransformer class
 *
 * @class GamesOptionsTransformer
 * @constructor
 */
class GamesOptionsTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  transform (model) {
    return {
      id: model.id,
      name: model.name,
      created_at: model.created_at
    }
  }
}

module.exports = GamesOptionsTransformer
