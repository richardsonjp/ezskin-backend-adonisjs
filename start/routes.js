'use strict'

const Route = use('Route')
Route.group(() => {
  Route.get('list', 'SalesController.list').middleware(['authorizeUser'])
  Route.post('post', 'SalesController.post').middleware(['authorizeUser'])
  Route.patch('update/:id', 'SalesController.update').middleware(['authorizeUser'])
})
.prefix('sales')

Route.group(() => {
  Route.get('options', 'GameController.options').middleware(['authorizeUser'])
  Route.get('list', 'GameController.list').middleware(['authorizeUser'])
  Route.post('save', 'GameController.create').middleware(['authorizeUser'])
})
.prefix('game')

Route.group(() => {
  Route.get('list', 'UserController.list').middleware(['authorizeUser'])
  Route.post('register', 'UserController.store').middleware(['authorizeUser'])
})
.prefix('user')

Route.group(() => {
  Route.post('login', 'AuthController.login')
})
.prefix('auth')
