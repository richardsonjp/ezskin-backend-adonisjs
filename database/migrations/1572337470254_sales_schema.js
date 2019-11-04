'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const Config = use('Config')
const apiConfig = Config.get('apiConfig')

class SalesSchema extends Schema {
  up () {
    this.create('sales', (table) => {
      table.uuid('id').primary()
      table.string('name').notNullable()
      table.uuid('game_id').unsigned().references('id').inTable('games')
      table.string('exterior', 5)
      table.string('float', 5)
      table.integer('buy', 20).notNullable()
      table.integer('sell', 20).notNullable()
      table.string('status').defaultTo(apiConfig.sales.status.new)
      table.date('down_payment_at')
      table.date('full_payment_at')
      table.integer('down_payment_amount', 20)
      table.integer('full_payment_amount', 20)
      table.string('bought_by').notNullable()
      table.string('payment_to')
      table.string('payment_by')
      table.string('buyer')
      table.date('tradeable_at').notNullable()
      table.text('note')
      table.timestamps()
    })
  }

  down () {
    this.drop('sales')
  }
}

module.exports = SalesSchema
