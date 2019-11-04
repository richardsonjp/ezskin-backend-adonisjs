'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GameSchema extends Schema {
  up () {
    this.create('games', (table) => {
      table.uuid('id').primary()
      table.string('name').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('games')
  }
}

module.exports = GameSchema
