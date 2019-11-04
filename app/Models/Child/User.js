'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const ParentModel = use('App/Models/ParentModel')

class User extends ParentModel {
}

module.exports = User
