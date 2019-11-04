'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const UserService = use('App/Services/UserService')

class AuthorizeUser {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response }, next) {
    let headers = request.headers()
    if (headers.user) {
      let checkUser = await UserService.getUserByName(headers.user)
      if (!checkUser || !checkUser.active) {
        return response.status(401).send({message: 'Unauthorized User'})
      }
      if (checkUser.password !== headers.authorization) {
        return response.status(401).send({message: 'Unauthorized User'})
      }
    }
    await next()
  }
}

module.exports = AuthorizeUser


// 'use strict'

// const HelperService = use('App/Services/HelperService')

// class Role {
//   async handle ({ auth, response }, next, ...roles) {
//     try {
//       let user = await auth.getUser()
//       let role = await user.role
//       if (!roles[0].includes(role)) {
//         const error = HelperService.badRequestMessage('Role User Unauthorized')
//         return response.status(401).send(error)
//       }
//     } catch (error) {
//       console.log('============middleware role error===========')
//       console.log(error)
//     }

//     // call next to advance the request
//     await next()
//   }
// }

// module.exports = Role
