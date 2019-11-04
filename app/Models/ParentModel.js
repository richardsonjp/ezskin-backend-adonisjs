'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ParentModel extends Model {
  static boot () {
    super.boot()
    this.addHook('beforeCreate', 'Uuid.setPrimaryKey')
    this.addHook('beforeSave', 'User.hashPassword')
  }

  static get primaryKey () {
    return 'id'
  }

  static get incrementing () {
    return false
  }
}

module.exports = ParentModel
